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

interface FetchParams {
  input: string;
  options: RequestInit;
}

interface V3Action {
	action: string;
	item_id: string;
	tags?: string;
	time?: string;
}

export function actionFactory(params: URLSearchParams): V3Action[] {
	const starter = (actionName: string): V3Action => {
		const toDel = {
			action: actionName,
			item_id: '',
			time: '',
		};
		const toTag = {
			action: actionName,
			item_id: '',
			time: '',
			tags: ''
		}
		return actionName === Consts.ACT2 ? toDel : toTag;
	};
	const keysInit = Array.from(params.keys());
	const valsInit = Array.from(params.values());
	const index = keysInit.indexOf(Consts.ACT0);
	const actionName = valsInit[index];
	const keys = keysInit.filter(key => key !== Consts.ACT0);
	const vals = valsInit.filter((v, k) => k !== index);
	const toTags = (unixTime: string) => {
		const t = new Date(parseInt(unixTime) * 1e3);
		const cal = t.toDateString();
		const month = `${cal.slice(4, 7)} ${cal.slice(11)}`;
		return `${month},${t.toLocaleDateString()},${t.toLocaleTimeString()}`;
	};
	return keys.map((key, x) => {
		const obj = starter(actionName);
		obj.time = `${Math.floor(Date.now() * 1e-3)}`;
		obj.item_id = key;
		if (actionName === Consts.ACT1) {
			obj.tags = toTags(vals[x]);
		}
		return obj;
	});
};

interface V3Body {
	consumer_key?: string;
	redirect_uri?: string;
	code?: string;
	access_token?: string;
	sort?: string;
	since?: number;
	count?: string;
	offset?: string;
	total?: string;
	detailType?: string;
	actions?: V3Action[];
}

export function listParams(
	reqUrl: string,
	token: string = '',
	data: V3Body = {}
): FetchParams {
	const qpos = reqUrl.indexOf('?');
	const isRouteWithQuery = qpos > 0;
	const stop = isRouteWithQuery ? qpos + 1 : undefined;
	const name = reqUrl.replace('/', '').slice(0, stop);
	const names: string[] = [
		Consts.NEX1,
		Consts.NEX2,
		Consts.NEX3,
		`${Consts.NEX3}?`,
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
			redirect_uri: process.env.ADDR + Consts.NEX2
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
			count: Consts.PRF2,
			offset: data.offset,
			total: Consts.PRF3,
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
				const status = res.status;
				const xerr = res.headers.get("X-Error");
				vals[0] = `${Consts.ERR1} status ${status}, "${xerr}"`;
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
		const sanskey = cookie.slice(cookie.indexOf('=') + 1);
		const value = (sanskey.indexOf(';') >= 0 &&
				sanskey.slice(0, sanskey.indexOf(';')) || sanskey);
		return value;
	}

	static value(cookie: string) {
		const sanskey = cookie.slice(cookie.indexOf('=') + 1);
		const value = (sanskey.indexOf(';') >= 0 &&
				sanskey.slice(0, sanskey.indexOf(';')) || sanskey);
		return value;
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

interface StatusAndList {
	message: string;
	list: object[];
}

interface ResultsOfMod {
	action_results: boolean[];
	status: number;
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

	static async printList(params: FetchParams): Promise<StatusAndList> {
		const { input, options } = params;
		let res: any;
		let message: string = Consts.MSG4;
		let list: object[] = [];
		try {
			res = await fetch(input, options);
			if (res.ok === false) {
				const status = res.status;
				const xerr = res.headers.get("X-Error");
				message = `${Consts.ERR1} status ${status}, "${xerr}"`;
			} else {
				const jsn = await res.json();
				list = Object.values(JSON.parse(jsn).list);
			}
		} catch (err) {
		 	message = `${Consts.ERR1}: ${err.message}`;
		}
		return { message, list };
	}

	static async printResult(params: FetchParams): Promise<string> {
		const { input, options } = params;
		let response: any;
		let results: ResultsOfMod;
		let message: string = Consts.DONE;
		try {
			response = await fetch(input, options);
			if (response.ok === false) {
				const status = response.status;
				const xerr = response.headers.get("X-Error");
				return `${Consts.ERR1} status ${status}, "${xerr}"`;
			}
			const jsn = await response.json();
			results = JSON.parse(jsn);
			if (results.status == 0) {
				// We could sift through options.body and match its actions items
				// to the indices of false in results.action_results array,
				// but all you get is an item_id not a human-recognizable title,
				// so for now,
				message = Consts.SOME;
			}
		} catch (err) {
		 	return `${Consts.ERR1}: ${err.message}`;
		}
		return message;
	}
}

