// views.ts
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

import { PageData } from "./pageData";
import { Consts } from "./constan";

const index = {
	render: (data: PageData): string => {
		return [
			Consts.DOCH,
			Consts.STY1,
			Consts.BODH,
			'<main><p>' + data.message + '</p>',
			'<a href="' + data.nexRoute + '">' + Consts.BTN1 + '</a></main>',
			Consts.FOOT,
			Consts.DOCC,
		].join(' ');
	},
};

const login = {
	render: (data: PageData): string => {
		return [
			Consts.DOCH,
			Consts.STY1,
			Consts.BODH,
			'<main><p>' + data.message + '</p></main>',
			'<script>',
			Consts.COD1 + data.token + Consts.COD2 + data.nexRoute + Consts.COD3,
			'</script>',
			Consts.FOOT,
			Consts.DOCC,
		].join(' ');
	},
};

const auth = {
	render: (data: PageData): string => {
		return [
			Consts.DOCH,
			Consts.STY1,
			Consts.BODH,
			'<main><p>' + data.message + '</p></main>',
			'<script>' + Consts.COD4 + data.nexRoute + Consts.COD3 + '</script>',
			Consts.FOOT,
			Consts.DOCC,
		].join(' ');
	},
};

const app1 = {
	render: (data: PageData): string => {
		const uibod = (list: any[]): string => {
			console.log(Object.keys(list[0])); // I want to know if Pocket has a timestamp of when each item was saved. API Docs don't say.
			if (typeof list[0] === 'string') {
				// It's an error message.
				return '<p>' + list[0] + '</p>';
			}
			return list.map(item => {
				return ('<p id="' + item.item_id + '"><a href="' + item.given_url +
						'">' + item.given_title + '</a></p>');
			}).join(' ');
		};
		return [
			Consts.DOCH,
			Consts.STY1,
			Consts.BODH,
			'<main><p>' + data.message + '</p>',
			uibod(data.list) + ' </main>',
			Consts.FOOT,
			Consts.DOCC,
		].join(' ');
	},
};

const app2 = {
	render: (data: PageData): string => {
		return [
			Consts.DOCH,
			Consts.STY1,
			Consts.BODH,
			'<main><p>' + data.message + '</p>',
			'<a href="' + data.nexRoute + '">' + Consts.BTN2 + '</a></main>',
			Consts.FOOT,
			Consts.DOCC,
		].join(' ');
	},
};

export default { index, login, auth, app1, app2 };
