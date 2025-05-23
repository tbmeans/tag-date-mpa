// constan.ts
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

export enum Consts {
	MSG1 = "Login to connect with Pocket",
	MSG2 = "Preparing to login and obtain a request token from Pocket.",
	MSG3 = "Logging in and authorizing.",
	MSG4 = "Organize your saves with tags.",
	NEX1 = "login",
	NEX2 = "auth",
	NEX3 = "dash",
	ADDR = 'https://tag-date.netlify.app/',
	COD1 = 'const DEST = "https://getpocket.com/auth/authorize?request_token=',
	COD2 = '&redirect_uri=' + ADDR,
	COD3 = '"; const promcall = (res) => { setTimeout(() => res(DEST), 1000); ' +
			'}; const delay = () => new Promise(promcall); const redir = async ' +
					'function() { window.location.href = await delay(); }; redir();',
	COD4 = 'const DEST = "' + ADDR,
	KEY1 = 'token',
	KEY2 = 'username',
	DOCH = '<!DOCTYPE html> <html lang="en"> <head> <meta charset="utf-8"> ' +
			'<meta name="viewport" content="width=device-width, initial-scale=1">' +
					'<title>Tag Pocket saves in bulk</title>',
	STY1 = '<style> body{ background-color:#272727; font-family: Segoe UI,' +
			'Tahoma,Geneva,Verdana,sans-serif; font-family: Arial,Helvetica,' +
					'sans-serif; color:#789; text-align:center; } h1, h2, h3 { ' + 
							'margin: 2rem auto; } footer { padding-top: 2rem; } button { ' +
									'border: none; border-radius: .4rem; background-color: ' +
											'#204060; color: #a9a9a9; margin: .5rem; padding: ' +
													'.5rem 2rem; } button:active { background-color: ' +
															'#406080; }',
	STY2 = 'section { margin: 2rem; } .cols { display: flex; gap: 1rem; ' +
			'padding: 1rem; } </style> </head>',
	BODH = '<body> <header> <h2> Bulk tag your Pocket saves <br> with the ' + 
			'year & month saved! </h2> </header>',
	FOOT = '<footer> 2025, Tim Means. Makes use of the ' + 
			'<a href="https://getpocket.com/developer/">Pocket API</a>. </footer>',
	API1 = 'https://getpocket.com/v3',
	ERR1 = "Problem with API request: ",
	MSG5 = "User authenticated. Redirecting to your dashboard.",
	PRF1 = "oldest",
	PRF2 = "30",
	PRF3 = "1",
	PRF4 = "complete",
	ACT0 = "action",
	ACT1 = "tags_add",
	ACT2 = "delete",
	DONE = "Selected saves successfully modified.",
	SOME = "Some actions could not be completed.",
	BACK = "Return to dashboard",
	OPGR = '<div class="cols">',
	CLDV = '</div>',
	OPCK = '<input type="checkbox"',
	CLCK = '/>',
	PAN1 = '<section> ' + OPGR + ' <div> ' + OPCK + ' id="select-all" ' + 
			'name="select-all"' + CLCK + ' <label for="select-all">Select all' +
					'</label> ' + CLDV + ' <button form="app-ui" type="submit" name="' +
							'action" value="tags_add">Tag date</button> <button form="' +
									'app-ui" type="submit" name="action" value="delete">Delete' +
											'</button> ' + CLDV + ' </section>', 
	PAN2 = '<section> <form id="app-ui" action="' + ADDR + NEX3 + '"> ' +
			'<fieldset> <legend>Select a subset of your saves and click one of ' +
					'the actions above.</legend>', 
	PAN3 = '</fieldset> </form> </section>',
	COD5 = 'const sel = document.getElementById("select-all"); sel.addEvent' +
			'Listener("change", (e) => { const boxes = Array.from(document.query' +
					'SelectorAll("form input[type=' + `'checkbox'` + ']")); for (let i' +
							'= 0; i < boxes.length; i++) { boxes[i].checked = e.target.' +
									'checked; }});',
}
