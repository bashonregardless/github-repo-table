// import dependencies
import React from 'react'

// import API mocking utilities from Mock Service Worker
import {rest} from 'msw'
import {setupServer} from 'msw/node'

// import react-testing methods
import {render, fireEvent, waitFor, screen} from '@testing-library/react'

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom'
import { unmountComponentAtNode } from 'react-dom';
import Table from './Table.js';

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

// declare which API requests to mock
const server = setupServer(
  // capture "GET /{user}/repos/" requests
  rest.get('/{user}/repos', (req, res, ctx) => {
	// respond using a mocked JSON body
	return res(ctx.json(fakeData));
  })
);

let container = null;
beforeAll(() => server.listen());
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

/* test(name, fn, timeout)
 * Also under the alias: it(name, fn, timeout)
 */
it("renders table data", async () => {
  // TODO Continue from here 
  // Refer https://reactjs.org/docs/testing-recipes.html#data-fetching
  // Refer https://testing-library.com/docs/react-testing-library/example-intro
  // Refer https://jestjs.io/docs/expect#expectextendmatchers
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

afterAll(() => server.close());

