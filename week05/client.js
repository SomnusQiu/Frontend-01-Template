const net = require('net');

class Request {
    constructor(options) {
        this.method = options.method || 'GET';
        this.host = options.host;
        this.path = options.path || '/';
        this.port = options.port || 80;
        this.body = options.body || {};
        this.headers = options.headers || {};
        if (!this.headers['Content-Type']) {
            this.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }

        if (this.headers['Content-Type'] === 'application/json') {
            this.bodyText = JSON.stringify(this.body);
        } else if (this.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
            this.bodyText = Object.keys(this.body)
                .map((key) => `${key}=${encodeURIComponent(this.body[key])}`)
                .join('&');
        }
        this.headers['Content-Length'] = this.bodyText.length;
    }
    toString() {
        return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers)
                .map((key) => `${key}: ${this.headers[key]}`)
                .join('\r\n')}\r
\r
${this.bodyText}`;
    }
    open(method, url) { }

    send(connection) {
        return new Promise((resolve, reject) => {
            if (connection) {
                connection.write(this.toString());
            } else {
                // 也可以主动创建connection来send
                connection = net.createConnection(
                    {
                        host: this.host,
                        port: this.port,
                    },
                    () => {
                        connection.write(this.toString());
                    }
                );
            }
            connection.on('data', (data) => {
                resolve(data.toString());
                connection.end();
            });
            connection.on('end', () => {
                reject('disconnected from server');
            });
        });
    }
}

class Response { }
class ResponseParser {
    constructor() {
        this.WATING_STATUS_LINE = 0
        this.WATING_STATUS_LINE_END = 1
        this.WATING_HEADER_NAME = 2
        this.WATING_HEADER_VALUE = 3
        this.WATING_HEADER_LINE_END = 4
        this.WATING_HEADER_BLOCK_END = 5
        this.currentStatus = this.WATING_STATUS_LINE
        this.statusLint = ''
        this.headers = {}
        this.headerName = ''
        this.headerValue = ''

    }
    receive(string) {
        for (let i = 0; i < string.length; i++) {
            this.receiveChar(string.charAt(i))
        }
    }
    receiveChar(char) {

    }
}

class ChunkedBodyParser {
    constructor() {
    }
    receive(string) {

    }
}