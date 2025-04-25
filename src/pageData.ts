// pageData.ts
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

// should just make this the model, as a class, 
// and a fetch for a method like cookie class
// but then should this go to apirequests file?
// how about apirequests goes into model too?
export interface PageData {
	message: string;
    isButton: boolean;
    buttonLabel: string;
    isList: boolean;
    list: object[] | string[];
    isScript: boolean;
	nexRoute: string;
	token: string;
}
