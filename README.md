# This is fullstack application with using of GraphQL and React

Application provides CRUD for two entities: movie and director. Data displays as table with sorting field, search.
There was implemented lazy loading pages and dark-theme mode.

#### For server side Express-GraphQL and Apollo Client on the client side
- Express Framework for node server
- MongoDB with Mongoose as database
- React JS with TypeScript
- React JS with TypeScript
- Material UI
- Validation forms with react-hook-form
- Apollo Client for requests and graphql-codegen for typing data from server

***

## Get started

> cd server

Create file in root `.env.local` by boilerplate `.env` file

Install mandatory dependencies:

> npm i

### Start server

* insert environment variables

> npm run dev

### Start client

From root directory

> cd client

Create file in root `.env.local` by boilerplate `.env` file

Install mandatory dependencies:

> npm i

When the server is launching, get types for apollo clients from server:

> npm run compile

And in the directory `client/src/graphql` there is a file `.graphqlconfig` when launch GraphQL plugin for IDE. 
It'll be created new file `schema.qraphql`, where types data from server are.

After fulfilling all above actions, run client application, proceed to command below:

> npm run start

