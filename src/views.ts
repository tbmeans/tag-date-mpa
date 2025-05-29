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
import { PageData } from "./models";
import { Consts } from "./models";

export default {
	render(data: PageData): string {
		const btnOpt = (
      `<a href="${data.buttonLink}">
        <button type="button">${data.buttonLabel}</button>
      </a>`
    );
	
		const uibod = (list: any[]): string => {

			console.log(Object.keys(list[0])); 
			// I want to know if Pocket has a timestamp of when each item was saved. API Docs don't say.
			
			if (typeof list[0] === 'string') {
				// It's an error message.
				return `<p>${list[0]}</p>`;
			}

			const fill = list.map(item => {
				return (
          `<div class="cols">
            <input type="checkbox"
                   id="${item.item_id}"
                   name="${item.item_id}"
                   value="${item.time_added}" />
            <label for="${item.item_id}">
              <a href="${item.given_url}">
                ${item.given_title}
              </a>
            </label>
            <span>
              <i>${item.time_added}</i>
            </span>
          </div>`
        );
			});

			return (
        `<section>
          <div class="cols">
            <div>
              <input type="checkbox"
                    id="select-all"
                    name="select-all" />
              <label for="select-all">Select all</label>
            </div>
            <button form="app-ui"
                    type="submit"
                    name="action"
                    value="tags_add">Tag date</button>
            <button form="app-ui"
                    type="submit"
                    name="action"
                    value="delete">Delete</button> 
          </div>
        </section>
        <section>
          <form id="app-ui"
                action="${process.env.ADDR}${Consts.NEX3}">
            <fieldset>
              <legend>
                Select a subset of your saves and
                click one of the actions above.
              </legend> 
              ${fill}
            </fieldset>
          </form>
        </section>`
      );
		};
	
		return (
      `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Tag Pocket saves in bulk</title>
          <style>
            body {
              background-color:#272727;
              font-family: Segoe UI,Tahoma,Geneva,Verdana,sans-serif;
              font-family: Arial,Helvetica,sans-serif;
              color:#789;
              text-align:center;
            }
            h1, h2, h3 {
              margin: 2rem auto;
            }
            footer {
              padding-top: 2rem;
            }
            button {
              border: none;
              border-radius: .4rem;
              background-color: #204060;
              color: #a9a9a9;
              margin: .5rem;
              padding: .5rem 2rem;
            }
            button:active {
              background-color: #406080;
            }
            section {
              margin: 2rem;
            }
            .cols {
              display: flex;
              gap: 1rem;
              padding: 1rem;
            }
          </style>
        </head>
        <body>
          <header>
            <h2>
              Bulk tag your Pocket saves
              <br>
              with the year & month saved!
            </h2>
          </header>
          <main>
            <p>${data.message}</p>
            ${data.isButton && btnOpt || ''}
            ${data.isList && uibod(data.list) || ''}
          </main>
          <footer>
            2025, Tim Means. Makes use of the
            <a href="https://getpocket.com/developer/">Pocket API</a>.
          </footer>
          ${data.isScript && `<script>${data.jscript}</script>` || ''}
        </body>
      </html>`
    );
  }
}

