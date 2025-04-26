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

const printScript = function(
  route: string,
  isValidCookies: boolean,
  isCookiePair: boolean,
  token: string
): string {
  if (route.length === 0) {
    return '';
  }
  if (route === models.Consts.NEX1 && isValidCookies === false) {
    return [
      models.Consts.COD1,
      token,
      models.Consts.COD2,
      models.Consts.NEX2,
      models.Consts.COD3,
    ].join('');
  } else if (isValidCookies === false) {
    return [
      models.Consts.COD4,
      models.Consts.COD3,
    ].join('');
  } /* else if (route === models.Consts.NEX1 && isCookiePair) {
    // make a script that redirects to dash
    return [
      models.Consts.COD4,
      models.Consts.NEX3,
      models.Consts.COD3,
    ];
  } else if (route === models.Consts.NEX1) {
    // therefore this catches 'login' with 1 valid cookie
    // well we ... really should do same as first case
    // so that case shouldn't && isValidCOokies === false
    // but maybe isCookiePair === false
    // so then next changes to NOT 'login' and INValid cookies
    // or how bout just series of IFs?
  }
  */
  return '';
};

const auth = async function(req: Request): Promise<string[]> {
  const route: string = req.url.slice(1);  // remove leading '/'
  const cookies = models.AuthCookies.fromClient(req);
  const authReqHead1 = models.listParams(models.Consts.NEX1);
  const authReqHead2 = models.listParams(models.Consts.NEX2);
  let message: string, link: string, label: string, list: string, js: string;

  if (cookies.isValid() === false) {
    if (route.length === 0) {
      // index route
      message = models.Consts.MSG1;
      link = models.Consts.NEX1;
      label = cap1(models.Consts.NEX1);
      list = '[]';
      js = '';
    } else {
      let cookie = (route === models.Consts.NEX1 &&
          await models.AuthCookies.fromFetch(authReqHead1) ||
              new models.AuthCookies([]));
      /* Only fetch if route is 'login' otherwise send 'em
      back to index route to hit button and do process right. */
      message = (route === models.Consts.NEX1 && models.Consts.MSG2 ||
          models.Consts.MSG1); // BUT if cookie/token has error though, add error print-out to message and go back to index.
      link = '';
      label = '';
      list = '[]';
      js = printScript(route, false, false, cookie.value(0));      
    } 
  } else if (cookies.isPair() === false) {} else {}
/*
	if (cookieCt1AndIsInvalid && route !== Consts.NEX1 ||
			cookieCt2AndIsInvalid) {
		controller = controllers.index;
	} else if (cookieCt1AndIsInvalid && route === Consts.NEX1) {
		const data = api.toOAuthCookie(api.setOpts(route),
				{ consumer_key: process.env.CONSUMER_KEY });
		if (data[0].includes(Consts.ERR1)) {
			controller = controllers.index;
			params[1] = data[0] + '<br>';
		} else {
			controller = controllers[route];
			params[1] = api.extractValue(data[0]);
			res.setHeader('Set-Cookie', data);
		}
	} else if (cookieCt1AndIsValid && route !== Consts.NEX2) {
		controller = controllers.login;
		params[1] = cookies[0].split('=')[1];
	} else if (cookieCt1AndIsValid && route === Consts.NEX2) {
		const data = api.toOAuthCookie(api.setOpts(route), {
			consumer_key: process.env.CONSUMER_KEY,
			code: cookies[0].split('=')[1]
		});
		if (data[0].includes(Consts.ERR1)) {
			controller = controllers.index;
			params[1] = data[0] + '<br>';
		} else {
			controller = controllers[route];
			res.setHeader('Set-Cookie', data);
		}
	} else if (cookieCt2AndIsValid && route !== Consts.NEX3) {
		controller = controllers[Consts.NEX2];
		// a different message that says 'restarting app' instead of auth's message?
	} else if (cookieCt2AndIsValid && route === Consts.NEX3) {
		// api data request to fill app form etc.
		controller = controllers.app1;
	} */

	return [ "hello" ];
};

const apiq = async function(route: string, token: string): Promise<string[]> {
    // Use models classes to consume api endpoint
    return [ "world" ];
}

const resp = function(route: string, cookieList: string[]): string {
    // Given a route param and cookie in data param, 
    // put together script if nec.
    // JSON.parse the list param before plugging into PageData constructor
	return "!";
};

export default { auth, apiq, resp, }
