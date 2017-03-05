***This is a draft, feel free to send a PR fixing issues/typos!***

**Goals**
* List all configs you need to set to have a minimum development Kin install
* List the gulp tasks used for a complete dev flow (building, testing ... )

**Requirements**
* Git, Node.js, Redis installed
* [SSL cert for a domain resolving to your local host](#local-cert).
* (some) understanding of [Kin's stack](architecture.md)

## Kin Server ##
1. Fork [KinToday/kin-api-server](https://github.com/KinToday/kin-api-server) and fetch your fork locally.
2. Follow the instructions in [`config.js`](https://github.com/KinToday/kin-api-server/blob/master/src/api_server/config.js) and [`secrets.js`](https://github.com/KinToday/kin-api-server/blob/master/src/api_server/secrets.js), to configure the API server for your particular setup.
3. Install Kin's dependencies via `npm`

    ~~~~~
    $ npm install
    ~~~~~

4. Build the server code (creates links in `servers/` pointing at sources in `src/`)

    ~~~~
    $ NODE_ENV=dev gulp servers
    ~~~~

5. Launch the application via `PM2`:

    ~~~~
    # Create the application file
    $ NODE_ENV=dev gulp pm
    # Launch it via pm2
    $ pm2 start pm.json
    ~~~~

6. If you want to gracefully reload the app when making changes, you can run:

    ~~~~
    $ NODE_ENV=dev gulp watch
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
    $ NODE_ENV=dev gulp webpack-dev-server
    ~~~~

## Misc. ##

### Tests ###

**this is available both for the client and the server**

Run tests one time:
~~~~
$ NODE_ENV=dev gulp test
~~~~
Auto-run tests when any test file or application file has been  updated:
~~~~
$ NODE_ENV=dev gulp test-watch
~~~~

### Local cert ###

**as a way to simplify Kin's codebase and reduce dev/prod mismatches in configuration, we require SSL everywhere**

#### Linux / Mac OS X ####

This uses `dev.kin.today` as a domain name.
~~~~
$ mkdir -p certs
$ openssl genrsa -out ./certs/localhost-key.pem 2048
$ openssl req -new -x509 -sha256 -days 365 -key ./certs/localhost-key.pem -out ./certs/localhost-cert.pem -nodes -subj '/CN=dev.kin.today'
$ echo "0.0.0.0 dev.kin.today" | sudo tee -a /etc/hosts
~~~~

#### Windows ####
TODO
