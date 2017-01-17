var path = require('path');
var express = require('express');
var app = express();

var pageViews = {};
var ipViews = {};

app.use('/', express.static(path.resolve(__dirname, '../client')));

app.get('/pixel.gif', function(req, res) {
    if (req.query && req.query.page) {
        if (!pageViews[req.query.page]) pageViews[req.query.page] = 0;
        pageViews[req.query.page] += 1;
    }

    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    if (ip && ip.startsWith("::ffff:")) {
        ip = ip.replace("::ffff:", "")
    }
    if (ip === '::1') {
        ip = '127.0.0.1';
    }

    if (ip) {
        if (!ipViews[ip]) ipViews[ip] = 0;
        ipViews[ip] += 1;
    }

    res.sendFile(path.resolve(__dirname, 'pixel.gif'));
});

app.get('/stats', (req, res) => {
    res.json({
        pages: pageViews,
        ips: ipViews
    });
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});