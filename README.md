# JavaScript Express Multi Stack Lab <!-- omit in toc -->

> It's all about learning stuff :)

## Content <!-- omit in toc -->

- [1. Purpose of project](#1-purpose-of-project)
  - [The main stack](#the-main-stack)
  - [Security](#security)
  - [Real-time notification and communication](#real-time-notification-and-communication)
  - [Add-ons](#add-ons)
  - [Design](#design)
- [2. Prerequisites](#2-prerequisites)
- [3. Manage development](#3-manage-development)
- [4. UI Design](#4-ui-design)
- [5. References](#5-references)
  - [Project software](#project-software)
  - [Inspirational articles](#inspirational-articles)

## 1. Purpose of project

Create a secure, versatile, simple multi stack application with pure JavaScript code.

### The main stack

- `Node.js` _as JavaScript runtime environment_
- `Express` _as Node.js web and server framework_
- `MongoDB` _as document/NoSql database_

### Security

- `JWT` _as stateless authentication token generator_
- `Bcrypt` _as password hashing algoritm_
- `Passport` _as authentication tool_

### Real-time notification and communication

- `socket.io` _as real-time bi-directional event based communication library between web and server (todo...)_
- `Web Push` _as web browser notification library (todo...)_

### Add-ons

- `Handlebars` _as client template engine for using Express as frontend_
- `Mongoose` _as object modeling tool for MongoDB_

### Design

- `Bootstrap` _as UI kit_

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

### Project software

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
- <https://github.com/web-push-libs/web-push>

### Inspirational articles

- [Sessionless authentication in Express with JWT and Passport](https://blog.usejournal.com/sessionless-authentication-withe-jwts-with-node-express-passport-js-69b059e4b22c)
