
const server          = global.server;
const Router          = require('koa-router');
const routerService   = require('./server-router-service.js');
let router            = new Router({});

router.get('/api/state', routerService.state);
router.post('/api/sl', routerService.shorten);
router.get('/:id', routerService.redirect);

module.exports = router;
