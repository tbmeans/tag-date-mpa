// authCookies.ts
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

import { Consts } from './constan';

export default class AuthCookies {
	req: Request;

	constructor(req: Request) {
		this.req = req;
	}

	parse() {
		const cookiesJoined = this.req.headers.get("Cookie");
		if (cookiesJoined == null) {
			return [ 'null' ];
		}
		return cookiesJoined.split(';');
	}

	isValid(parsed: string[]) {
		return parsed.map((cookie, x) => {
			const [ key, val ] = cookie.split('=');
			const word = x === 0 && Consts.KEY1 || Consts.KEY2;
			return key === word && val?.length > 0;
		});
	}

	ct1AndIsInvalid(): boolean {
		const cookies = this.parse();
		return cookies.length === 1 && this.isValid(cookies)[0] === false;
	}
	
	ct1AndIsValid(): boolean {
		const cookies = this.parse();
		return cookies.length === 1 && this.isValid(cookies)[0];
	}

	ct2AndIsInvalid(): boolean {
		const cookies = this.parse();
		return cookies.length === 2 && this.isValid(cookies).includes(false);
	}

	ct2AndIsValid(): boolean {
		const cookies = this.parse(); 
		return cookies.length === 2 && this.isValid(cookies).every(v => v);
	}
}


