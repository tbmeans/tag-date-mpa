// apiRequests.ts
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

const listParams = function(
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
};

const toOAuthCookie = async function(params: FetchParams): Promise<string[]> {
	const { input, options } = params;
	const keys = [ 'token', 'username' ];
	const vals: any[] = [];
	try {
		const res = await fetch(input, options);
		/* MDN does this in developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
		if (res.ok === false) {
			throw new Error(`Status: ${res.status}`);
		}
		*/
		const jsn = await res.json();
		const [ dat1, dat2 ] = Object.values(JSON.parse(jsn));
		vals[0] = dat1;
		if (dat2) {
			vals[1] = dat2;
		}
	} catch (err) {
		vals[0] = Consts.ERR1 + err.message;
	}
	return (vals[0].includes(Consts.ERR1) && vals ||
			vals.map((v, x) => keys[x] + '=' + v + Consts.OPTS));
};

const extractValue = (cookie: string) => {
	return cookie.slice(cookie.indexOf('=') + 1, cookie.indexOf(';'))
};

const toData = (params: FetchParams) => {};

