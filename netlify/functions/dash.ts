// dash.ts
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
import controllers from "../../src/controllers";

export default async (req: Request, context: Context) => {
	const dat = await controllers.stateHandler(req);
	const res = controllers.respond(dat);
	return new Response(res.rendering, {
		status: 200,
		headers: res.headers
	});
}

export const config: Config = {
	path: "/dash"
}
