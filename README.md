# rest-falcor-graphql

## Quick Summary

This repository holds the source code that supports a post made on my personal page. 

Please visit https://ivocosme.github.io/rest-falcor-graphql/ for more information on this post.

## Requirements

* Node - 8.4.0+
* npm - 5.4.2+

## Setting up everything

### Setup assumptions

You already have Node installed (see above the versions I've used).

* [Node download/installation guide](https://nodejs.org/en/download/package-manager/)

### Download the project

Open a terminal window inside and run:

```bash
git clone https://github.com/ivocosme/rest-falcor-graphql.git
```

If you enter the new folder, you should see two folders with the following structure

```bash
.
├── .eslintrc
├── .gitignore
├── .jshintrc
├── app
│   ├── index.js
│   └── public
├── package.json
├── servers
│   ├── common
│   ├── falcor-approach
│   └── graphql-approach
└── services
    ├── customers
    └── invoices
```

### Setting up the project

For the sake of simplicity, we will:

* Use [concurrently](https://www.npmjs.com/package/concurrently), a NodeJS library that allows us to run two commands in parallel.

To install concurrently, just run from the terminal

```bash
npm install -g concurrently
```

## Up and Running

### What will I run?

Executing the command from next topic will run:

* Run the customers (database) API in port 50000
* Run the invoices (database) API in port 50001
* Run the Falcor Router in port 40000
* Run the GraphQL Runtime in port 40001
* Run the Frontend page in port 3000

### Running the example

Open a terminal window and run

```bash
npm start
```

**Important:** Running this command is the same as running

```bash
CLIENT_PORT=3000 FALCOR_PORT=40000 GRAPHQL_PORT=40001 CUSTOMERS_PORT=50000 INVOICES_PORT=50001 concurrently \"node services/customers/index.js\" \"node services/invoices/index.js\"  \"node servers/falcor-approach/index.js\" \"node servers/graphql-approach/index.js\" \"node app/index.js\"
```

Then, open the browser [to see the result](http://localhost:3000).

## What am I seeing here?

You are currently seeing the result of making the request to see the user info (Id: 1) and its invoices (Ids: 10000/1/2).

If you look closely, you'll see that there are specific fields that should only be retrieved by the "web version" and some other fields that are retrieved by the "mobile version".
