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

const render = (message: string, nexRoute: string) => {
	return [
		Consts.DOCH,
		Consts.STY1,
		Consts.BODH,
		'<main><p>' + message + '</p>',
		'<a href="' + nexRoute + '">' + Consts.BTN1 + '</a></main>',
		Consts.FOOT,
		Consts.DOCC,
	].join(' ');
};

// In the Fetch API interface "Request", cookie-get looks like req.headers.get("Cookie")

export default async (req: Request, context: Context) => {
	return new Response(render(Consts.MSG1, Consts.NEX1), {
		status: 200,
		headers: { "Content-Type": "text/html" }
	});
}

export const config: Config = {
	path: "/"
};
