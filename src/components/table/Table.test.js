import { unmountComponentAtNode } from 'react-dom';

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

it("renders table data", async () => {
  const fakeData = {
	"id": 178470326,
	"node_id": "MDEwOlJlcG9zaXRvcnkxNzg0NzAzMjY=",
	"name": "Github-repo-search",
	"full_name": "landstrider/Github-repo-search",
	"private": false,
	"owner": {
		  "login": "landstrider",
		  "id": 25303479,
		  "owner": {
			  "login": "landstrider",
			  "id": 25303479,
			  "site_admin": false
		  },
		  "avatar_url": "https://avatars.githubusercontent.com/u/25303479?v=4",
		  "type": "User",
		  "site_admin": false
	},
	"html_url": "https://github.com/landstrider/Github-repo-search",
	"description": "Github Repo Search App",
	"fork": false,
  }

  jest.spyOn(global, "fetch").mockImplementation(() =>
	Promise.resolve({
	  json: () => Promise.resolve(fakeData)
	})
  );


});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});


