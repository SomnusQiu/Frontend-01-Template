const http = require('http');
const fs = require('fs');
const unzip = require('unzipper');
const https = require('https');

// Create an HTTP server
const server = http.createServer((req, res) => {

    if(req.url.match(/^\/auth/))
        return auth(req, res);

    if(!req.url.match(/^\/\?/)) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('not found');
        return;
    }

    // let writeStream = fs.createWriteStream("../server/packages/package");

    const options = {
        hostname: 'api.github.com',
        port: 443,
        path: `/user`,
        method: 'GET',
        headers: {
            Authorization: "token " + req.headers.token,
            "User-Agent": "toy-publish-server"
        }
    };
    
    const request = https.request(options, (response) => {
        let body = "";
        response.on('data', (d) => {
            body += d.toString();
        });
        response.on('end', () => {
            let user = JSON.parse(body);
            console.log(user);
            //Authentication
            let writeStream = unzip.Extract({path: '../server/public'});
            req.pipe(writeStream);

            req.on('end', () => {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('okay');
            });
        });
    });

    request.on('error', (e) => {
        console.error(e);
    });
    request.end();

});

function auth(req, res) {
    let code = req.url.match(/code=([^&]+)/)[1];
    let state = "123abc";
    let client_secret = "5d5d7e90dec2c0134f87a535d1484e1f6cd70e71";
    let client_id = "Iv1.b5f768b47a8b7a88";
    let redirect_uri = encodeURIComponent("http://localhost:8081/auth");

    let params = `code=${code}&state=${state}&client_secret=${client_secret}&client_id=${client_id}&redirect_uri=${redirect_uri}`;
    let url = `https://github.com/login/oauth/access_token?${params}`;

    const options = {
        hostname: 'github.com',
        port: 443,
        path: `/login/oauth/access_token?${params}`,
        method: 'POST'
    }

    const request = https.request(options, (response) => {

        response.on('data', (d) => {
            let result = d.toString().match(/access_token=([^&]+)/);
            if(result) {
                let token = result[1];
                res.writeHead(200, {
                    'access_token': token,
                    'Content-Type': 'text/html'
                });
                res.end(`<a href="http://localhost:8080/publish?token=${token}">publish</a>`);
            } else {
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                res.end('error');
            }
        });
    });

    request.on('error', (e) => {
        console.error(e);
    });
    request.end();

    // res.writeHead(200, { 'Content-Type': 'text/plain' });
    // res.end('okay');
}

server.listen(8081)