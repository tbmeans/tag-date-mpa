// controllers.ts
/*
   Copyright 2025 Timothy B. Means

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

import * as models from "./models";
import views from "./views";

const cap1 = (a: string): string => a[0].toUpperCase() + a.slice(1);

const stateHandler = async function(req: Request): Promise<string[]> {
  const route: string = req.url.slice(1);  // remove leading '/'
  const cookies = models.AuthCookies.fromClient(req);
  const authReq = models.listParams(models.Consts.NEX1);
  
  if (cookies.isValid() === false && route.length > 0 &&
      route !== models.Consts.NEX1) {
    // A controller consisting of a redirect to index serves as an alternative
    // controller for all routes when request reports no/invalid cookies.
    return [
      models.Consts.MSG1,
      '',
      '',
      '[]',
      [
        models.Consts.COD4,
        models.Consts.COD3,
      ].join(''),
    ];
  } else if (cookies.isValid() === false && route.length === 0) {
    // Handle index route controller for a fresh session.
    return [
      models.Consts.MSG1,
      models.Consts.ADDR + models.Consts.NEX1,
      cap1(models.Consts.NEX1),
      '[]',
      ''
    ];
  }

  if (cookies.isValid()) {
    return await stateHandler2(req);
  } // else the route is NEX1 'login'

  const token = await models.AuthCookies.fromFetch(authReq);

  // If error, 'login' route will show button to try again, like index.
  if (token[0].includes(models.Consts.ERR1)) {
    return [
      token[0],
      models.Consts.ADDR + models.Consts.NEX1,
      cap1(models.Consts.NEX1),
      '[]',
      ''
    ];
  }
  
  // For the proper 'login' route controls.
  return [
    models.Consts.MSG2,
    '',
    '',
    '[]',
    [
      models.Consts.COD1,
      token.value(0),
      models.Consts.COD2,
      models.Consts.NEX2,
      models.Consts.COD3,
    ].join(''),
    JSON.stringify(token) /* controller's responder needs this to Set-Cookie
    but this full string for Set-Cookie does not go in pageData, only the 
    hash value for script to redir to Pocket goes into pageData. */
  ];
};
 
const stateHandler2 = async function(req: Request): Promise<string[]> {
  const route: string = req.url.slice(1);  // remove leading '/'
  const cookies = models.AuthCookies.fromClient(req);
  const authReq = models.listParams(models.Consts.NEX2);

  // We should be here only because stateHandler
  // determined that the cookies set is valid.
  // Alt controls for whatever route was dialed: redirect to login route.
  // BUT HOLD UP NO WE DON'T WANT TO DO LOGIN'S PROCESS OF RE-COOKIE-ING
  // SO HOW ABOUT LET LOGIN'S CONTROLS APPEAR W/ REDIR TO POCKET, FOR WHATEVER
  // ROUTE WAS DIALED, AFTERALL. BUT DON'T GIVE A VALUE FOR SET-COOKIE AND
  // GET THE ONE EXISTING COOKIE'S VALUE FROM REQUEST.
  // you could only dial a route with one valid cookie if INTERRUPTING
  // the time delay on the proper login route, so this will make dialing
  // another route from 'login' look like it does nothin but change address bar
  if (cookies.isPair() === false && route !== models.Consts.NEX2) {
    return [
      models.Consts.MSG2,
      '',
      '',
      '[]',
      [
        models.Consts.COD1,
        models.AuthCookies.value(cookies[0]),
        models.Consts.COD2,
        models.Consts.NEX2,
        models.Consts.COD3,
      ].join(''),
    ];
  }

  if (cookies.isPair()) {
    return await stateHandler3(req);
  } // else route is NEX2 'auth'

  const tokens = await models.AuthCookies.fromFetch(authReq);

  // Auth route will show button to try again
  // Manually skipping pocket login by direct-dialing my app's
  // 'auth' route SHOULD generate an error per API design/docs.
  if (tokens[0].includes(models.Consts.ERR1)) {
    return [
      tokens[0],
      models.Consts.ADDR + models.Consts.NEX1,
      cap1(models.Consts.NEX1),
      '[]',
      '',
    ];
  }
  
  // The proper 'auth' route controls.
  return [
    models.Consts.MSG3,
    '',
    '',
    '[]',
    [
      models.Consts.COD4,
      models.Consts.NEX3,
      models.Consts.COD3,
    ].join(''),
    JSON.stringify(tokens), // Set-Cookie with these
  ];
};

const stateHandler3 = async function(req: Request): Promise<string[]> {
  const route: string = req.url.slice(1);  // remove leading '/'
  const dataReq = models.listParams(models.Consts.NEX3);

  // We should be here only because prior stateHandlers
  // determined that the cookies set is valid and count of 2.
  if (route !== models.Consts.NEX3) {
    // fully auth'd but requested route besides 'dash'
    // well then send them to dash where they belong
    return [
      models.Consts.MSG4,
      '',
      '',
      '[]',
      [
        models.Consts.COD4,
        models.Consts.NEX3,
        models.Consts.COD3,
      ].join(''),
    ];
  } /* else if (???) {
    The above is not appropriate return value for the confirm route.
    // TO-DO: FIT INTO RETURN DATA HREF FOR BUTTONS TO USE V3/SEND ENDPOINT
    // THE HREFS WILL INCLUDE X-WWW-URLENCODED ENDPOINT REQ PARAMS.
    // AND UNIX TIMESTAMP WIDGET FOR V3/GET ENDPOINT.
		// BUT JUST MARKUP BUTTONS HERE. CALCULATING THE HREF IS CONTROLLER CONCERN.
  } */

  // regular 'dash' route response
  const list = await models.PageData.printList(dataReq);
  return [
    models.Consts.MSG4,
    '',
    '',
    JSON.stringify(list),
    '',
  ];
}

interface ForResponse {
	rendering: string;
	headers: Headers;
}

const respond = function(data: string[]): ForResponse {
  const [ message, link, label ] = data;
  const list = JSON.parse(data[3]);
  const js = data[4];
  const pageData = new models.PageData(message, link, label, list, js);
  const rendering = views.render(pageData);
  const headers = new Headers({ "Content-Type": "text/html" });

  if (data[5]) {
    const tokens = JSON.parse(data[5]);

    for (let x = 0; x < tokens.length; x++) {
      headers.append("Set-Cookie", tokens[x]);
    }
  }

  return { rendering, headers };
};

export default { stateHandler, respond, }
