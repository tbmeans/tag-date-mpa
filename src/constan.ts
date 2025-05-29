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
	KEY1 = 'token',
	KEY2 = 'username',
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
	DEST = 'const DEST = "',
  NDES = '";',
  PDES = 'https://getpocket.com/auth/authorize?request_token=',
	SELA = `
		const sel = document.getElementById("select-all");
    sel.addEventListener("change", (e) => {
      const boxes = Array.from(document.querySelectorAll(
          "form input[type='checkbox']"));
      for (let i= 0; i < boxes.length; i++) {
        boxes[i].checked = e.target.checked;
      }
    });
  `,
	RDIR = `
    (async function() {
      window.location.href = await (() => new Promise((res) => {
        setTimeout(() => res(DEST), 1000);
      }))();
    })();
  `,
}
