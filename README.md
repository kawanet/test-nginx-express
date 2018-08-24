# test-nginx-express

```sh
node server.js &

nginx -p $PWD -c nginx/nginx.conf

curl -v 'http://127.0.0.1:3000/etag/foo'
# < HTTP/1.1 200 OK
# < X-Powered-By: Express
# < ETag: 6dbd548cc03e44b8b44b6e68e56255ce4273ae49

curl -v 'http://127.0.0.1:8000/etag/foo'
# < HTTP/1.1 200 OK
# < Server: nginx/1.8.1
# < ETag: 6dbd548cc03e44b8b44b6e68e56255ce4273ae49

curl -v -H 'If-None-Match: 6dbd548cc03e44b8b44b6e68e56255ce4273ae49' 'http://127.0.0.1:3000/etag/foo'
# < HTTP/1.1 304 Not Modified
# < X-Powered-By: Express
# < ETag: 6dbd548cc03e44b8b44b6e68e56255ce4273ae49

curl -v -H 'If-None-Match: 6dbd548cc03e44b8b44b6e68e56255ce4273ae49' 'http://127.0.0.1:8000/etag/foo'
# < HTTP/1.1 304 Not Modified
# < Server: nginx/1.8.1
# < ETag: 6dbd548cc03e44b8b44b6e68e56255ce4273ae49

nginx -p $PWD -c nginx/nginx.conf -s stop
```