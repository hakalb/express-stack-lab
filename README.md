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
- [2. Server application structure](#2-server-application-structure)
- [3. Prerequisites](#3-prerequisites)
- [4. How do I start](#4-how-do-i-start)
  - [4.1 Clone the project](#41-clone-the-project)
  - [4.2 Start MongoDB as background process (local installation only)](#42-start-mongodb-as-background-process-local-installation-only)
  - [4.3 Setup environment variables](#43-setup-environment-variables)
  - [4.4 Start development](#44-start-development)
  - [4.5 Build production](#45-build-production)
  - [4.6 Start production](#46-start-production)
- [5. UI Design](#5-ui-design)
- [6. References](#6-references)
  - [Project software](#project-software)
  - [Inspirational articles](#inspirational-articles)
- [7. Present simplifications and future improvements](#7-present-simplifications-and-future-improvements)

## 1. Purpose of project

> Create a secure, versatile, simple multi stack application with pure JavaScript code, to act as a template for learning, further discussions and improvements.

### The main stack

- `Node.js` _as JavaScript runtime environment_
- `Express` _as Node.js server framework_
- `MongoDB` _as document/NoSql database_

### Security

- `JWT` _as stateless authentication token generator_
- `Bcrypt` _as password hashing algoritm_
- `Passport` _as authentication tool_

### Real-time notification and communication

- `socket.io` _as real-time bi-directional event based communication library between web and server (todo...)_
- `Web Push` _as web browser notification library (todo...)_

### Template engine

- `Handlebars` _as client template engine for using Express with server side rendering_

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
  
## 2. Server application structure

Description of the most important parts of the structure.

```bash
├── api             # Express route controllers for all endpoints
├── assets          # Static assets for server side rendered pages
├── config          # Configuration including environment variables
├── loaders         # Express startup process split into specific modules
├── models          # Moongoose database models
├── services        # Business logic services
└── views           # Handlebars templates used by server side redering
.env                # Environment variables
server.js           # Server entry point
```

## 3. Prerequisites

Install `Node.js` (version 12). `MongoDB` could be installed locally on your development machine or e.g. provided by MongoDB Atlas in the cloud.

All other packages are installed isolated inside the project.

## 4. How do I start

### 4.1 Clone the project

```bash
cd to-your-working-folder
git clone https://github.com/hakalb/express-stack-lab.git
```

Install project dependencies to `node_modules`.

```bash
npm i
```

### 4.2 Start MongoDB as background process (local installation only)

```bash
mongod --config /usr/local/etc/mongod.conf --fork
```

### 4.3 Setup environment variables

Create an environment file from the provided example och edit with your settings.

```bash
cp .env.example .env
```

> Note! `.env` should be kept secret and not shared with anyone not trusted.

### 4.4 Start development

```bash
npm run dev
```

_Open a browser and navigate to <http://localhost:3000>._

Add application debug to terminal (optional).

```bash
DEBUG=app:* npm run dev
```

You can also include more namespaces for more extended debug; e.g. `app,express`.

### 4.5 Build production

```bash
npm run build
```

### 4.6 Start production

```bash
npm run server:prod
```

_Open a browser and navigate to <http://localhost:8000>._

Or build for production and start at once.

```bash
npm run prod
```

## 5. UI Design

- [Bootstrap Components](https://getbootstrap.com/docs/4.4/components)
- [Fontawesome Icons](https://fontawesome.com/icons?d=gallery)

## 6. References

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

## 7. Present simplifications and future improvements

_Todo..._
