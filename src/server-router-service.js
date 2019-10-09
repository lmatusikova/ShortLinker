const shortid  = require("shortid");
const validUrl = require("valid-url");
const server   = global.server;

async function shorten(ctx)
{
    let request = ctx.request.body;
    server.core.log('=== REQUEST === ',request);
    if (!validUrl.isUri(request.url))
    {
        let response = {};
        response.message = "Invalid Base Url format";
        server.core.log('=== RESPONSE === ',response);
        ctx.status = 500
        return ctx.body = response;
    }

    let item = await server.model.UrlShorten.findOne({ 'originalUrl': request.url });
    if (item != null)
    {
        server.core.log('=== RESPONSE === ',item);
        return ctx.body = item;
    }
    else
    {
        let result = await saveToDb(request.url);
        server.core.log('=== RESPONSE === ',result);
        return ctx.body = result;
    }
}

async function saveToDb(url)
{
    let shortData = {};
    let urlCode = shortid.generate();
    shortData.originalUrl   = url;
    shortData.urlCode       = urlCode;
    shortData.shortUrl      = getShortUrl(urlCode)
    shortData.createdAt     = Date.now();
    let itemData = new server.model.UrlShorten(shortData);
    try
    {
        itemData.save()
    }
    catch (err)
    {
        return err;
    }
    return shortData;
}

async function redirect(ctx)
{
    let shortUrl = getShortUrl(ctx.params.id);
    let item = await server.model.UrlShorten.findOne({ 'shortUrl': shortUrl });
    server.core.log('=== REDIRECT === ',shortUrl,item.originalUrl);
    ctx.redirect(item.originalUrl);
}

async function state(ctx)
{
    let result = {};
    result.uptime = server.core.toHHMMSS(Math.round((new Date()-server.uptime)/1000));
    result.port = server.config.serverPort;
    ctx.body = result;
}

function getShortUrl(urlCode)
{
        return server.config.serverDomain + ':' + server.config.serverPort + '/' + urlCode;
}

module.exports =
{
    shorten,
    redirect,
    state
};
