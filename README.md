kibana Authentication Proxy
============

A fork of [kibana-authentication-proxy](https://github.com/fangli/kibana-authentication-proxy).

Hosts the latest [Kibana 4 BETA](https://github.com/elasticsearch/kibana/) and elasticsearch behind Google OAuth2, Basic Authentication or CAS Authentication with NodeJS and Express.

- A proxy between Elasticsearch, Kibana 4 BETA and user client
- Support Elasticsearch which protected by basic authentication, only kibana-authentication-proxy knows the user/passwd
- Compatible with the latest Kibana 4 BETA
- Enhanced authentication methods. Now support Google OAuth2, BasicAuth(multiple users supported) and CAS Authentication for the clients
- Per-user kibana index supported. now you can use index kibana-int-userA for user A and kibana-int-userB for user B
- Inspired by and based on [kibana-proxy](https://github.com/hmalphettes/kibana-proxy), most of the proxy libraries were written by them, thanks:)

*We NO LONGER support third-party plugins such as `Bigdesk` or `Head` since it's hard to test and maintain*

Installation
=====

It's just a standard nodejs application, you could install it in the same server with ES, or not. Before run the following commands, please make sure you have [nodejs](http://nodejs.org/) and npm well installed.


```
# git clone https://github.com/fangli/kibana-authentication-proxy
# cd kibana-authentication-proxy/
# git submodule init
# git submodule update
# npm install

// You may want to update the built-in kibana3 to the latest version, just run
# cd kibana && git checkout master && git pull

// Then edit config.js, make sure you have everything checked in the config file
// and run!
# node app.js
```

Configuration
=============

All settings are placed in /config.js, hack it as you go.

### Elasticsearch backend configurations

- ``es_host``:  *The host of ElasticSearch*
- ``es_port``:  *The port of ElasticSearch*
- ``es_using_ssl``:  *If the ES is using SSL(https)?*
- ``es_username``:  *(optional) The basic authentication user of ES server, leave it blank if no basic auth applied*
- ``es_password``:  *(optional) The password of basic authentication of ES server, leave it blank if no basic auth applied*

### Kibana 4 BETA settings

- ``kibana_4_host``: *The host of Kibana 4 server*
- ``kibana_4_port``: *The port of Kibana 4 server*

### Client settings

- ``listen_port``:  *The listen port of this proxy*
- ``brower_cache_maxage``:  *The browser cache max-Age controll, for a better loading speed*
- ``enable_ssl_port``: *Enable SSL or not?*
- ``listen_port_ssl``: *If enable_ssl_port set to true, this is the port of SSL*
- ``ssl_key_file``: *Point to the ssl key file*
- ``ssl_cert_file``: *Point to the ssl certification file*
- ``cookie_secret``: *The secret token for cookies. replace it with a random string for security*

### Client authentication settings

We currently support 3 auth methods: Google OAuth2, BasicAuth and CAS, you can use one of them or all of them. it depends on the configuration you have.

***1. Google OAuth2***

- ``enable_google_oauth``: *Enable or not?*
- ``client_id``:  *The client ID of Google OAuth2, leave empty if you don't want to use it*
- ``client_secret``: *The client secret of Google OAuth2*
- ``allowed_emails``: *An emails list for the authorized users, should like `["a@b.com", "*@b.com", "*"]`*. All google users in the list will be allowed to access kibana.

**Important**

Google OAuth2 needs authorized redirect URIs for your app, please add it first as below, ``http://YOUR-KIBANA-SITE:[listen_port]/auth/google/callback`` in production or ``http://localhost:[listen_port]/auth/google/callback`` for local test

***2. Basic Authentication***

- ``enable_basic_auth``: *Enable or not?*
- ``basic_auth_users``:  *A list of user/passwd, see the comments in config.js for help. leave empty if you won't use it*

***3. CAS Auth***

- ``enable_cas_auth``: *Enable or not?*
- ``cas_server_url``: *Point to the CAS server URL*

Resources
=========
- The original proxy project of [kibana-proxy](https://github.com/hmalphettes/kibana-proxy)
- [Kibana 3](http://www.elasticsearch.org/overview/kibana/) and [Elasticsearch](https://github.com/elasticsearch/elasticsearch)


Contributing
============
- Fork it
- Create your feature branch (git checkout -b my-new-feature)
- Commit your changes (git commit -am 'Add some feature')
- Push to the branch (git push origin my-new-feature)
- Create new Pull Request


Releases
========
- Per-user kibana index supported
- Fixed bug: Deprecated function alert of connect3
- Added basic auth
- Fixed bug: use new config for kibana3
- Initial


License
=======
kibana Authentication Proxy is freely distributable under the terms of the MIT license.

Copyright (c) 2013 Fang Li, Funplus Game

See LICENCE for details.
