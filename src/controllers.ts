// controllers.ts
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

import models from "./models";
import views from "./views";

const index = (route: string, errorMessage: string = ''): string => {
	return views.index.render(models.messaging(route, '', errorMessage));
};

const login = (route: string, token: string): string => {
	return views.login.render(models.messaging(route, token));
};

const auth = (route: string): string => {
	return views.auth.render(models.messaging(route));
};

const app1 = (route: string, data: any[]): string => {
    const list = models.dataRequest(route, data);
	return views.app1.render(models.messaging(route, '', err, suc, list));
};

export default { index, login, auth, app1, }
