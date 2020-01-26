# JavaScript Express Multi Stack Lab <!-- omit in toc -->

> It's all about learning stuff :)

## Content <!-- omit in toc -->

- [1. Purpose of project](#1-purpose-of-project)
- [2. Prerequisites](#2-prerequisites)
- [3. Manage development](#3-manage-development)
- [4. UI Design](#4-ui-design)
- [5. References](#5-references)

## 1. Purpose of project

Create a JavaScript multi stack application using:

- `Node.js` _as JavaScript runtime environment_
- `Express` _as Node.js server framework_
- `Handlebars` _as client template engine_
- `MongoDB` _as database_
- `Mongoose` _as object modeling tool for MongoDB_
- `Bootstrap` _as UI kit_
- `Passport` _as authentication tool_
- `JWT` _as token generator_

and perhaps more...

## 2. Prerequisites

Install `Node.js` and `MongoDB` locally on your development machine.

## 3. Manage development

Install dependencies.

```bash
npm i
```

Start MongoDB as background process.

```bash
mongod --config /usr/local/etc/mongod.conf --fork
```

Start express application with server and browser live reload.

```bash
npm run start:dev
```

> Open a browser and navigate to <http://localhost:3000>

Add application debug to terminal.

```bash
DEBUG=app:* npm run start:dev
```

> You can also include more namespaces for more extended debug; e.g. app,express

## 4. UI Design

- [Bootstrap Components](https://getbootstrap.com/docs/4.4/components)
- [Fontawesome Icons](https://fontawesome.com/icons?d=gallery)

## 5. References

- <https://expressjs.com/en/starter/generator.html>
- <https://github.com/pillarjs/hbs>
- <https://handlebarsjs.com/>
- <https://docs.mongodb.com/manual/administration/install-community/>
- <https://docs.mongodb.com/compass/current/>
- <https://mongoosejs.com/>
- <https://getbootstrap.com/>
- <https://fontawesome.com/>
- <http://www.passportjs.org/>
- <https://jwt.io/>
