"use strict";

const Koa           = require('koa'); //middleware..
const Router        = require('koa-router'); //api, ktore chyta jsony
const logger        = require('koa-logger'); //logy
const bodyparser    = require('koa-bodyparser'); //na parsovanie jsonov
const mongoose      = require('mongoose'); // napojenie db
const serve         = require('koa-static');

const server        = {};
global.server       = server;
server.config       = require('../config.json');
server.routerStream = require('./server-router.js');
server.core         = require('./server-core.js');
server.model        = require('./server-model.js');

server.uptime       = new Date();

const app = new Koa();
mongoose.connect(server.config.mongoPath,  { useNewUrlParser: true });

app.use(bodyparser());
app.use(logger());
app.use(server.routerStream.routes());
app.use(server.routerStream.allowedMethods());
app.use(serve('public'))

app.listen(server.config.serverPort);
server.core.log(" ##### SERVER-SL STARTED ON PORT :",server.config.serverPort,'#####');
