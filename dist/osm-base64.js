(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["name"] = factory();
	else
		root["angular-osm"] = root["angular-osm"] || {}, root["angular-osm"]["name"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(4);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _api = __webpack_require__(2);

	var _api2 = _interopRequireDefault(_api);

	var _x2js = __webpack_require__(3);

	var _x2js2 = _interopRequireDefault(_x2js);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @module osm.api
	 */


	var osmAPIModule = angular.module('osm.api', [_x2js2.default.name]).provider('osmAPI', function osmAPIProvider() {
	    this.options = {
	        url: 'http://api.openstreetmap.org/api'
	    };
	    this.$get = function osmAPIFactory($http, $q, osmx2js) {
	        return new _api2.default($http, $q, osmx2js, this.options);
	    };
	    this.$get.$inject = ['$http', '$q', 'osmx2js'];
	});

	exports.default = osmAPIModule;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * @class
	 * Create the angular service instance.
	 * The main idea is to provide only object and hide the XML related stuf.
	 * This is achieve using XML2JS.
	 */

	var OSMAPI = function () {
	    /**
	     * @param  {Object} $http angular http
	     * @param  {Object} $q angular promise
	     * @param  {Object} osmx2js service
	     * @param  {Object} options to get set url of the API
	     */

	    function OSMAPI($http, $q, osmx2js, options) {
	        _classCallCheck(this, OSMAPI);

	        this.url = options.url;
	        this.$http = $http;
	        this.$q = $q;
	        this.osmx2js = osmx2js;
	        this._oauth = null;
	    }

	    /**
	     * Set the adapter to make authenticated request.
	     * @param {Object} adapter must provide xhr method.
	     * angular-osm provide two adapter: osmBase64 and osmAuthService
	    */


	    _createClass(OSMAPI, [{
	        key: 'setAuthAdapter',
	        value: function setAuthAdapter(adapter) {
	            this._oauth = adapter;
	        }

	        /**
	         * Get the adapter used to do authenticated xhr
	         * @return {Object}
	        */

	    }, {
	        key: 'getAuthAdapter',
	        value: function getAuthAdapter() {
	            return this._oauth;
	        }

	        // ------------------ INTERNAL CALL SERVER (API) -----------------

	        /**
	         * Call the API
	         * @param {Object} options
	         * ```
	            var options = {
	                method: 'GET', // POST, DELETE, PUT
	                path: '/0.6/changesets', //without the /api
	                data: content //if you need a payload
	            };
	            osmAPI.xhr(options);
	            ```
	         * @return {Promise} the adapter response
	        */

	    }, {
	        key: 'xhr',
	        value: function xhr(options) {
	            var deferred = this.$q.defer();
	            return this._oauth.xhr(options);
	        }

	        /**
	         * send a get request to OSM with
	         * @returns {Promise} $http response
	        */

	    }, {
	        key: 'getAuthenticated',
	        value: function getAuthenticated(method, config) {
	            var _config = angular.copy(config);
	            if (!_config) {
	                _config = {};
	            }
	            _config.method = 'GET';
	            _config.path = method;
	            return this.xhr(_config);
	        }
	        /**
	         * send a get request
	         * @param {string} method the api method
	         * @param {Object} config the $http.get config
	         * @returns {Promise} $http response with XML as string
	        */

	    }, {
	        key: 'get',
	        value: function get(method, config) {
	            var deferred = this.$q.defer();
	            var self = this;
	            var url = this.url + method;
	            this.$http.get(url, config).then(function (data) {
	                deferred.resolve(self.osmx2js.xml2js(data.data));
	            }, function (error) {
	                deferred.reject(error);
	            });
	            return deferred.promise;
	        }
	        /**
	         * send a put request
	         * @param {string} method the api method
	         * @param {Object} content payload
	         * @param {Object} config the $http.put config
	         * @returns {Promise} $http response
	        */

	    }, {
	        key: 'put',
	        value: function put(method, content, config) {
	            if (!config) {
	                config = {};
	            }
	            var _config = angular.copy(config);
	            _config.method = 'PUT';
	            _config.path = method;
	            _config.data = this.osmx2js.js2xml(content);
	            return this.xhr(_config);
	        }
	        /**
	         * send a delete request
	         * @param {string} method the api method
	         * @param {Object} config the $http.delete config
	         * @returns {Promise} $http response
	        */

	    }, {
	        key: 'delete',
	        value: function _delete(method, config) {
	            if (!config) {
	                config = {};
	            }
	            var _config = angular.copy(config);
	            _config.method = 'DELETE';
	            _config.path = method;
	            return this.xhr(_config);
	        }

	        // ------------------ CHANGESET -----------------

	        /**
	         * @param {string} comment the comment assiociated to the changeset
	         * @returns {Promise} $http response
	        */

	    }, {
	        key: 'createChangeset',
	        value: function createChangeset(comment) {
	            var self = this;
	            var deferred = this.$q.defer();
	            var changeset = { osm: {
	                    changeset: {
	                        tag: [{ _k: 'created_by', _v: 'Angular-OSM' }, { _k: 'comment', _v: comment }]
	                    }
	                } };
	            this.put('/0.6/changeset/create', changeset).then(function (data) {
	                deferred.resolve(data);
	            });
	            return deferred.promise;
	        }
	        /**
	         * @returns {Promise} $http response with the last changeset id
	         * or undefined if no changeset was opened
	        */

	    }, {
	        key: 'getLastOpenedChangesetId',
	        value: function getLastOpenedChangesetId() {
	            var self = this;
	            var deferred = this.$q.defer();
	            var config = {
	                params: { user: this._oauth.getUserID(), open: true }
	            };
	            this.get('/0.6/changesets', config).then(function (data) {
	                var changesets = data.osm.changeset;
	                if (changesets.length > 0) {
	                    deferred.resolve(changesets[0].id);
	                } else if (changesets._id) {
	                    deferred.resolve(changesets._id);
	                } else {
	                    deferred.resolve();
	                }
	            });
	            return deferred.promise;
	        }
	        /**
	         * @returns {Promise} $http.put response of
	         * /0.6/changeset/CHANGESET_ID/close
	        */

	    }, {
	        key: 'closeChangeset',
	        value: function closeChangeset(id) {
	            var self = this;
	            return this.put('/0.6/changeset/' + id + '/close').then(function (data) {
	                return data;
	            });
	        }

	        // ------------------ USER API -----------------

	        /**
	         * @param {string} id id of the user
	         * @returns {Promise} $http.get response
	         * /0.6/user/#id
	        */

	    }, {
	        key: 'getUserById',
	        value: function getUserById(id) {
	            return this.getAuthenticated('/0.6/user/' + id);
	        }

	        /**
	         * @returns {Promise} $http.get response
	         * /0.6/user/details
	        */

	    }, {
	        key: 'getUserDetails',
	        value: function getUserDetails() {
	            return this.getAuthenticated('/0.6/user/details');
	        }
	        /**
	         * @returns {Promise} $http.get response
	         * /0.6/user/preferences
	        */

	    }, {
	        key: 'getUserPreferences',
	        value: function getUserPreferences() {
	            return this.getAuthenticated('/0.6/user/preferences');
	        }

	        /**
	         * @param {string} key the preference key
	         * @param {string} value the preference value
	         * @returns {Promise} $http.get response
	         * /0.6/user/preferences
	        */

	    }, {
	        key: 'putUserPreferences',
	        value: function putUserPreferences(key, value) {
	            return this.put('/0.6/user/preferences/' + key, value);
	        }

	        //------------------ MAP DATA -------------------------

	        /**
	         * @param {string} bbox left,bottom,right,top
	         * where:
	            left is the longitude of the left (westernmost) side of the bounding box.
	            bottom is the latitude of the bottom (southernmost) side of the bounding box.
	            right is the longitude of the right (easternmost) side of the bounding box.
	            top is the latitude of the top (northernmost) side of the bounding box.
	         * @returns {Promise} $http.get response
	         * /0.6/map?bbox=bbox
	        */

	    }, {
	        key: 'getMap',
	        value: function getMap(bbox) {
	            return this.get('/0.6/map?bbox=' + bbox);
	        }

	        /**
	         * @param {string} bbox left,bottom,right,top
	         * where:
	            left is the longitude of the left (westernmost) side of the bounding box.
	            bottom is the latitude of the bottom (southernmost) side of the bounding box.
	            right is the longitude of the right (easternmost) side of the bounding box.
	            top is the latitude of the top (northernmost) side of the bounding box.
	         * @returns {Promise} $http.get response
	        */

	    }, {
	        key: 'getNotes',
	        value: function getNotes(bbox) {
	            var url = '/0.6/notes?bbox=' + bbox;
	            return this.get(url);
	        }

	        //------------------ ELEMENTS: Node ----------------

	        /**
	         * @param {Object/string} node
	             var node = {osm: {node: {
	                _changeset: '12', _lat: '...', _lon: '...',
	                tags: [
	                    {_k: '...', _v: '...'}
	                ]
	            }}};
	         * @returns {Promise} $http.put response
	         * PUT /0.6/node/create
	        */

	    }, {
	        key: 'createNode',
	        value: function createNode(node) {
	            return this.put('/0.6/node/create', node);
	        }

	        /**
	         * @param {string} id id
	         * @returns {Promise} $http.get response
	         * GET /0.6/node/#id
	        */

	    }, {
	        key: 'getNode',
	        value: function getNode(id) {
	            return this.get('/0.6/node/' + id);
	        }

	        /**
	         * @param {string} id id
	         * @returns {Promise} $http.get response
	         * GET /0.6/node/#id/relations
	        */

	    }, {
	        key: 'getNodeRelations',
	        value: function getNodeRelations(id) {
	            return this.get('/0.6/node/' + id + '/relations');
	        }

	        /**
	         * @param {string} id id
	         * @returns {Promise} $http.get response
	         * GET /0.6/node/#id/ways
	        */

	    }, {
	        key: 'getNodeWays',
	        value: function getNodeWays(id) {
	            return this.get('/0.6/node/' + id + '/ways');
	        }

	        /**
	         * @param {array} ids ids
	         * @returns {Promise} $http.get response
	         * GET /0.6/node/#id
	        */

	    }, {
	        key: 'getNodes',
	        value: function getNodes(ids) {
	            return this.get('/0.6/nodes?nodes=' + ids.join(','));
	        }

	        /**
	         * @param {string} id id
	         * @returns {Promise} $http.delete response
	         * DELETE /0.6/node/#id
	        */

	    }, {
	        key: 'deleteNode',
	        value: function deleteNode(id) {
	            return this.delete('/0.6/node/' + id);
	        }

	        //------------------ ELEMENTS: WAY ----------------

	        /**
	         * @param {Object/string} way
	            var way = {osm: {way: {
	                _changeset: '12', _lat: '...', _lon: '...',
	                tags: [
	                    {_k: '...', _v: '...'}
	                ],
	                nd: [
	                    {_ref: '123'},
	                    {_ref: '456'},
	                ]
	            }}};
	         * @returns {Promise} $http.put response
	         * PUT /0.6/way/create
	        */

	    }, {
	        key: 'createWay',
	        value: function createWay(way) {
	            return this.put('/0.6/way/create', way);
	        }

	        /**
	         * @param {string} id id
	         * @returns {Promise} $http.get response
	         * GET /0.6/way/#id
	        */

	    }, {
	        key: 'getWay',
	        value: function getWay(id) {
	            return this.get('/0.6/way/' + id);
	        }

	        /**
	         * @param {string} id id
	         * @returns {Promise} $http.get response
	         * GET /0.6/way/#id/relations
	        */

	    }, {
	        key: 'getWayRelations',
	        value: function getWayRelations(id) {
	            return this.get('/0.6/way/' + id + '/relations');
	        }

	        /**
	         * @param {string} id id
	         * @returns {Promise} $http.get response
	         * GET /0.6/way/#id/full
	        */

	    }, {
	        key: 'getWayFull',
	        value: function getWayFull(id) {
	            return this.get('/0.6/way/' + id + '/full');
	        }

	        /**
	         * @param {array} ids ids
	         * @returns {Promise} $http.get response
	         * GET /0.6/ways?ways=ids
	        */

	    }, {
	        key: 'getWays',
	        value: function getWays(ids) {
	            return this.get('/0.6/ways?ways=' + ids.join(','));
	        }

	        /**
	         * @param {string} id id
	         * @returns {Promise} $http.delete response
	         * DELETE /0.6/way/#id
	        */

	    }, {
	        key: 'deleteWay',
	        value: function deleteWay(id) {
	            return this.delete('/0.6/way/' + id);
	        }

	        //------------------ ELEMENTS: RELATION ----------------

	        /**
	         * @param {Object/string} relation
	            var relation = {osm: {relation: {
	                _changeset: '12', _lat: '...', _lon: '...',
	                tags: [
	                    {_k: '...', _v: '...'}
	                ],
	                member: [
	                    {_type: 'node', _role: 'stop', 'ref': '123'},
	                    {_type: 'way', 'ref': '234'}
	                ]
	            }}};
	         * @returns {Promise} $http.put response
	         * PUT /0.6/relation/create
	        */

	    }, {
	        key: 'createRelation',
	        value: function createRelation(relation) {
	            return this.put('/0.6/relation/create', relation);
	        }

	        /**
	         * @param {string} id id
	         * @returns {Promise} $http.get response
	         * GET /0.6/relation/#id
	        */

	    }, {
	        key: 'getRelation',
	        value: function getRelation(id) {
	            return this.get('/0.6/relation/' + id);
	        }
	        /**
	         * @param {string} id id
	         * @returns {Promise} $http.get response
	         * GET /0.6/relation/#id/relations
	        */

	    }, {
	        key: 'getRelationRelations',
	        value: function getRelationRelations(id) {
	            return this.get('/0.6/relation/' + id + '/relations');
	        }

	        /**
	         * @param {string} id id
	         * @returns {Promise} $http.get response
	         * GET /0.6/relation/#id/full
	        */

	    }, {
	        key: 'getRelationFull',
	        value: function getRelationFull(id) {
	            return this.get('/0.6/relation/' + id + '/full');
	        }

	        /**
	         * @param {array} ids ids
	         * @returns {Promise} $http.get response
	         * GET /0.6/relations?relations=ids
	        */

	    }, {
	        key: 'getRelations',
	        value: function getRelations(ids) {
	            return this.get('/0.6/relations?relations=' + ids.join(','));
	        }

	        /**
	         * @param {string} id id
	         * @returns {Promise} $http.delete response
	         * DELETE /0.6/relation/#id
	        */

	    }, {
	        key: 'deleteRelation',
	        value: function deleteRelation(id) {
	            return this.delete('/0.6/relation/' + id);
	        }
	    }]);

	    return OSMAPI;
	}();

	OSMAPI.$inject = ['$http', '$q', 'osmx2js'];
	exports.default = OSMAPI;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * @module osm.x2js
	 */
	var osmx2jsModule = angular.module('osm.x2js', []).provider('osmx2js', function osmx2jsProvider() {
	    this.options = {};
	    this.$get = function osmx2jsFactory() {
	        return new X2JS(this.options); //X2JS must be global
	    };
	});

	exports.default = osmx2jsModule;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _base = __webpack_require__(5);

	var _base2 = _interopRequireDefault(_base);

	var _api = __webpack_require__(1);

	var _api2 = _interopRequireDefault(_api);

	var _x2js = __webpack_require__(3);

	var _x2js2 = _interopRequireDefault(_x2js);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var osmBase64Module = angular.module('osm.base64', [_x2js2.default.name, _api2.default.name, 'base64']).provider('osmBase64', function osmBase64Provider() {
	    this.options = {
	        url: 'http://api.openstreetmap.org/api'
	    };
	    this.$get = function osmBase64Factory($base64, $http, $q, osmx2js) {
	        return new _base2.default($base64, $http, $q, osmx2js, this.options);
	    };
	    this.$get.$inject = ['$base64', '$http', 'osmx2js'];
	}); /**
	     * @module osm.base64
	     */


	exports.default = osmBase64Module;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * @class
	 * Create osmBase64 angular service instance.
	 * This can be used as osmAPI adapter.
	 */

	var Base64Adapter = function () {
	    /**
	     * the constructor
	     * @param {Object} $base64 service provided by angular-base64 module
	     * @param {Object} $http angular $http service
	     * @param {Object} osmx2js angular-osm service
	     * to transform response from xml to object
	     */

	    function Base64Adapter($base64, $http, osmx2js) {
	        _classCallCheck(this, Base64Adapter);

	        this.$base64 = $base64;
	        this.storage = {};
	        this.$http = $http;
	        this.url = 'http://api.openstreetmap.org/api';
	        this.osmx2js = osmx2js;
	    }
	    /**
	     * the main method used to do the call to the API
	     * @param {Object} options
	     * @returns {Promise} $http response
	     */


	    _createClass(Base64Adapter, [{
	        key: 'xhr',
	        value: function xhr(options) {
	            var self = this;
	            options.url = this.url + options.path;
	            options.headers = {
	                Authorization: this.getAuthorization()
	            };
	            return this.$http(options).then(function (data) {
	                var d = data.data;
	                if (!d) {
	                    return;
	                }
	                if (d.substr) {
	                    if (d.substr(0, 5) === '<?xml') {
	                        return self.osmx2js.xml2js(d);
	                    }
	                }
	                return d;
	            });
	        }
	        /**
	         * if you don't use oauth, you can save
	         * credentials here using base64 localstorage (completly unsecure)
	         * @param {string} username your username
	         * @param {string} password the user password.
	         * WARNING base64 is unsafe and the credentials are stored in the localstorage
	         * @returns {string} crendentials
	        */

	    }, {
	        key: 'setCredentials',
	        value: function setCredentials(username, password) {
	            this.storage.username = username;
	            var credentials = this.$base64.encode(username + ':' + password);
	            this.storage.credentials = credentials;
	            return credentials;
	        }
	        /**
	         * if you don't use oauth, you can manage
	         * credentials here using base64 headers
	         * @returns {string} crendentials from the last set
	        */

	    }, {
	        key: 'getCredentials',
	        value: function getCredentials() {
	            return this.storage.credentials;
	        }
	        /**
	         * compute authorization header from credentials
	         * @returns {string} HTTP Header 'Basic CREDENTIAL AS BASE64'
	        */

	    }, {
	        key: 'getAuthorization',
	        value: function getAuthorization() {
	            return 'Basic ' + this.storage.credentials;
	        }
	        /**
	         * remove credentials from the localstorage
	         * @returns {string} HTTP Header 'Basic CREDENTIAL AS BASE64'
	        */

	    }, {
	        key: 'clearCredentials',
	        value: function clearCredentials() {
	            if (this.storage.removeItem) {
	                this.storage.removeItem('credentials');
	            } else {
	                delete this.storage.credentials;
	            }
	        }
	    }]);

	    return Base64Adapter;
	}();

	Base64Adapter.$inject = ['$base64', '$http', 'osmx2js'];

	exports.default = Base64Adapter;

/***/ }
/******/ ])
});
;