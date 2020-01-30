# JavaScript Express Multi Stack Lab <!-- omit in toc -->

## (: It's all about learning stuff :) <!-- omit in toc -->

## Table of contents <!-- omit in toc -->

- [1. Purpose of project](#1-purpose-of-project)
  - [The main stack](#the-main-stack)
  - [Security](#security)
  - [Real-time notification and communication](#real-time-notification-and-communication)
  - [Template engine](#template-engine)
  - [Database tools](#database-tools)
  - [Design](#design)
  - [Serve, build and deploy](#serve-build-and-deploy)
- [2. Prerequisites](#2-prerequisites)
- [3. How do I start](#3-how-do-i-start)
  - [3.1 Clone the project](#31-clone-the-project)
  - [3.2 Start MongoDB as background process (local installation only)](#32-start-mongodb-as-background-process-local-installation-only)
  - [3.3 Setup environment variables](#33-setup-environment-variables)
  - [3.4 Start development](#34-start-development)
  - [3.5 Build production](#35-build-production)
  - [3.6 Start production](#36-start-production)
- [4. UI Design](#4-ui-design)
- [5. References](#5-references)
  - [Project software](#project-software)
  - [Inspirational articles](#inspirational-articles)
- [6. Present simplifications and future improvements](#6-present-simplifications-and-future-improvements)

## 1. Purpose of project

> Create a secure, versatile, simple multi stack application with pure JavaScript code, to act as a template for learning, further discussions and improvements.

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

### Template engine

- `Handlebars` _as client template engine for using Express as frontend_

### Database tools

- `Mongoose` _as object modeling tool for MongoDB_

### Design

- `Bootstrap` _as UI kit_
- `Fontawesome` _as icon kit_

### Serve, build and deploy

- `Babel` _as transpiler of modern ECMAScript to ES5_
- `Webpack` _as production build tool_
- `cssnano` _as CSS compression tool powered by PostCSS_
- `Nodemon` _as live reload tool for node server (dev)_
- `Browsersync` _as live reload tool for browser (dev)_
- `dotenv-safe` _as environment provider_
  
## 2. Prerequisites

Install `Node.js` (version 12). `MongoDB` could be installed locally on your development machine or e.g. provided by MongoDB Atlas in the cloud.

All other packages are installed isolated inside the project.

## 3. How do I start

### 3.1 Clone the project

```bash
cd to-your-working-folder
git clone https://github.com/hakalb/express-stack-lab.git
```

Install project dependencies to `node_modules`.

```bash
npm i
```

### 3.2 Start MongoDB as background process (local installation only)

```bash
mongod --config /usr/local/etc/mongod.conf --fork
```

### 3.3 Setup environment variables

Create an environment file from the provided example och edit with your settings.

```bash
cp .env.example .env
```

> Note! `.env` should be kept secret and not shared with anyone not trusted.

### 3.4 Start development

```bash
npm run dev
```

_Open a browser and navigate to <http://localhost:3000>._

Add application debug to terminal (optional).

```bash
DEBUG=app:* npm run dev
```

You can also include more namespaces for more extended debug; e.g. `app,express`.

### 3.5 Build production

```bash
npm run build
```

### 3.6 Start production

```bash
npm run server:prod
```

_Open a browser and navigate to <http://localhost:8000>._

Or build for production and start at once.

```bash
npm run prod
```

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
- <https://github.com/rolodato/dotenv-safe>

### Inspirational articles

- [Sessionless authentication in Express with JWT and Passport](https://blog.usejournal.com/sessionless-authentication-withe-jwts-with-node-express-passport-js-69b059e4b22c)

## 6. Present simplifications and future improvements

_Todo..._
