// index.ts
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

import { Config, Context } from "@netlify/functions";
import { Consts } from "../../src/constan";
import AuthCookies from "../../src/authCookies";
import controllers from "../../src/controllers";

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

export default async (req: Request, context: Context) => {
	return new Response(controllers.index(req.url), {
		status: 200,
		headers: { "Content-Type": "text/html" }
	});
}

export const config: Config = {
	path: "/"
};
