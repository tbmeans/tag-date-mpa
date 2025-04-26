// models.ts
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

export { Consts }; 

export interface FetchParams {
  input: string;
  options: RequestInit;
}

export interface V3Action {
	action: string;
	item_id: string;
	tags?: string;
	time?: string;
}

export interface V3Body {
	consumer_key?: string;
	redirect_uri?: string;
	code?: string;
	access_token?: string;
	sort?: string;
	since?: number;
	tag?: string;
	count?: string; /* endpoint doc's table says integer but example uses stringified number */
	offset?: string; /* endpoint doc's table says integer but example uses stringified number */
	total?: string; /* endpoint doc's table says integer but example uses stringified number */
	detailType?: string;
	actions?: V3Action[];
}

export function listParams(
	route: string,
	token: string = '',
	data: V3Body = {}
): FetchParams {
	const name = route.replace('/', '');
	const names: string[] = [
		Consts.NEX1,
		Consts.NEX2,
		Consts.NEX3,
		Consts.NEX4,
	];
	const endpts: string[] = [
		'/oauth/request',
		'/oauth/authorize',
		'/get',
		'/send',
	];
	const bods: V3Body[] = [
		{
			consumer_key: process.env.CONSUMER_KEY,
			redirect_uri: Consts.ADDR + Consts.NEX2
		},
		{
			consumer_key: process.env.CONSUMER_KEY,
			code: token
		},
		{
			consumer_key: process.env.CONSUMER_KEY,
			access_token: token,
			sort: Consts.PRF1,
			since: data.since,
			tag: data.tag,
			count: Consts.PRF2,  /* if it turns out really do need int value just parseInt() the string in constants */
			offset: data.offset, /* parseint if really needs a number */
			total: Consts.PRF3, /* parseint if really needs a number */
			detailType: Consts.PRF4
		},
		{
			consumer_key: process.env.CONSUMER_KEY,
			access_token: token,
			actions: data.actions
		},
	];
	return {
		input: "https://getpocket.com/v3" + endpts[names.indexOf(name)],
		options: {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
				'X-Accept': 'application/json',
			},
			body: JSON.stringify(bods[names.indexOf(name)])
		}
	};
}

export class AuthCookies {
	list: string[];

	constructor(list: string[]) {
		this.list = list;
	}

	static fromClient(req: Request) {
		const cookiesJoined = req.headers.get("Cookie");
		if (cookiesJoined == null) {
			return new AuthCookies([ 'null' ]);
		}
		return new AuthCookies(cookiesJoined.split(';'));
	}

	static async fromFetch(params: FetchParams): Promise<AuthCookies> {
		const { input, options } = params;
		const keys = [ Consts.KEY1, Consts.KEY2 ];
		const vals: string[] = [];
		try {
			const res = await fetch(input, options);
			if (res.ok === false) {
				const errmsg: string = `${Consts.ERR1} status ${res.status}`;
				vals[0] = errmsg;
				throw new Error(errmsg);
			} else {
				const jsn = await res.json();
				const [ dat1, dat2 ]: string[] = Object.values(JSON.parse(jsn));
				vals[0] = dat1;
				vals[1] = dat2;
			}
		} catch (err) {
			vals[0] = `${Consts.ERR1} error ${err.message}`;
		}
		if (vals[1]) {
			vals.map((v, x) => `${keys[x]}=${v}; Secure; HttpOnly`);
		}
		return new AuthCookies(vals);
	}

	value(index: number) {
		if (this.isValid() === false) {
			return '';
		}
		const cookie = this.list[index] ?? '=;';
		return cookie.slice(cookie.indexOf('=') + 1, cookie.indexOf(';'))
	}

	isValid(): boolean {
		if (this.list.length === 0 || this.list.length > 2) {
			return false;
		}
		const results: boolean[] = this.list.map((cookie, x) => {
			const [ key, val ] = cookie.split('=');
			const word = [ Consts.KEY1, Consts.KEY2 ][x];
			return key === word && val?.length > 0;
		});
		return results.reduce((p, q) => p && q);
	}

	isPair(): boolean {
		return this.list.length === 2;
	}
}

export class PageData {
	message: string;
	buttonLink: string;
	buttonLabel: string;
	list: object[] | string[];
	jscript: string;
	isButton: boolean;
	isList: boolean;
	isScript: boolean;

	constructor(
		message: string,
		buttonLink: string,
		buttonLabel: string,
		list: object[] | string[],
		jscript: string
	) {
		this.message = message;
		this.buttonLink = buttonLink;
		this.buttonLabel = buttonLabel;
		this.list = list;
		this.jscript = jscript;
		this.isButton = buttonLink.length > 0 && buttonLabel.length > 0;
		this.isList = list.length > 0;
		this.isScript = jscript.length > 0;
	}

	static async printList(params: FetchParams): Promise<object[]> {
		// this truly belongs in model, it's sourcing data from api endpoints
		/* const { input, options } = params;
		let res: any;
		try {
			res = await fetch(input, options);
		} catch (err) {
		 	res = `{"status":0,"list":{"1234567":{"error":${err.message}}}}`;
		}
		 */
		const res = '{"status":1,"list":{"1234567":{}}}';
		return Object.values(JSON.parse(res).list);
	}
}
