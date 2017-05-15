***This is a draft, feel free to send a PR fixing issues/typos!***

**Goals**
* List all configs you need to set to have a minimum development Kin install
* List the gulp tasks used for a complete dev flow (building, testing ... )

**Requirements**
* Git, Node.js, [Redis](#docker-redis)
* [SSL cert for a domain resolving to your local host](#local-cert).
* (some) understanding of [Kin's stack](architecture.md)

## Kin Server ##
1. Fork [KinToday/kin-api-server](https://github.com/KinToday/kin-api-server) and fetch your fork locally.
2. Follow the instructions in [`config.js`](https://github.com/KinToday/kin-api-server/blob/master/src/api_server/config.js) and [`secrets.js`](https://github.com/KinToday/kin-api-server/blob/master/src/api_server/secrets.js), to configure the API server for your particular setup.
3. Install Kin's dependencies via `npm`

    ~~~~~
    $ npm install
    ~~~~~

4. Build the server code (creates links in `servers/` pointing at sources in `src/`, creates the [`PM2` process file](http://pm2.keymetrics.io/docs/usage/application-declaration/))

    ~~~~
    $ npm run build:dev
    ~~~~

5. Launch the application through `PM2`:

    ~~~~
    $ npm run start
    ~~~~

6. To gracefully reload the app when making file changes, you can run:

    ~~~~
    $ npm run watch:dev
    ~~~~

## Kin Client ##

1. Fork [KinToday/kin-web-client](https://github.com/KinToday/kin-web-client) and fetch your fork locally.
2. Follow the instructions in [`config.js`](https://github.com/KinToday/kin-web-client/blob/master/src/client/config.js), to configure the client for your particular setup
3. Install Kin's dependencies via `npm`

    ~~~~~
    $ npm install
    ~~~~~

4. Launch Webpack's dev server via:

    ~~~~
    $ npm run watch:dev
    ~~~~

## Misc. ##

### Tests ###

**this is available both for the client and the server**

Run tests one time:
~~~~
$ npm test
~~~~
Auto-run tests when any test file or application file has been  updated:
~~~~
$ npm test-watch
~~~~

### Docker Redis ###

~~~
$ docker pull redis
$ docker run -d -p 6390:6379 redis
~~~

### Local cert ###

**as a way to simplify Kin's codebase and reduce dev/prod mismatches in configuration, we require SSL everywhere**

#### Mac OS X ####

This uses `dev.kin.today` as a domain name.
~~~~
$ mkdir -p certs
$ cd certs
$ openssl req -nodes -newkey rsa:2048 -keyout localhost-key.pem -new -x509 -out localhost-cert.pem -subj /CN=dev.kin.today -reqexts SAN -extensions SAN -config <(cat /System/Library/OpenSSL/openssl.cnf <(printf '[SAN]\nsubjectAltName=DNS:dev.kin.today')) -sha256 -days 365
$ echo "0.0.0.0 dev.kin.today" | sudo tee -a /etc/hosts
~~~~

#### Linux ####

follow the same instructions as OSX, but you will need to use the relevant `-config` path to your OpenSSL installation default config template.

#### Windows ####
TODO
