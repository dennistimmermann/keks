!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.keks=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"Focm2+":[function(_dereq_,module,exports){
"use strict";
/**
 *  keks - get, set and remove cookies
 *  Copyright 2014 Dennis Timmermann <dennis@tmrmn.com> License MIT
 */

var lib = {}

/**
 * build key/value pairs from document.cookie
 *
 * @return {Object} cookies as key/value pair
 * @api private
 */

function parse() {

	var cookies = {}
	var pairs = document.cookie ? document.cookie.split('; ') : []

	for (var i = pairs.length; i > 0; i--) {
		var pair = pairs[i-1]
		// http://jsperf.com/slice-vs-split-shift-join
		var index = pair.indexOf('=')

		var name = pair.slice(0, index)
		var body = pair.slice(index+1)

		cookies[name] = body
	}
	return cookies
}

/**
 * set cookie
 *
 * Example:
 *		cookies.set('mycookie', 'myvalue')
 *		// true
 *
 *		cookies.set('mycookie', 'myvalue', {expires: 24})
 *		// true
 *
 *		options = {
 *			expires: {Hours|Date Object},
 *			domain: {Url},
 *			path: {Uri},
 *			secure: {Boolean}
 *      }
 *
 * @param {String} name
 * @param {String|Number} value
 * @param {Object} [options]
 * @api public
 */

lib.set = function (name, value, options) {
	if (arguments.length < 2) throw new Error('too few arguments')

	options = options || {}
	if (typeof options.expires === 'number') {
		// < IE9
		options.expires = new Date(new Date().getTime() + options.expires * 36e+5)
	}

	document.cookie = name + '=' + value +
		(options.expires ? '; expires=' + options.expires.toUTCString() : '') +
		(options.domain  ? '; domain=' + options.domain : '') +
		(options.path    ? '; path=' + options.path : '') +
		(options.secure  ? '; secure' : '')

	this.cookies = parse()
	return this.get(name) == value
}

/**
 * get one or all cookies
 *
 * Example:
 *		cookies.get('mycookie')
 *		// 'myvalue'
 *
 *		cookies.get()
 *		// Object[...]
 *
 * @param {String} [name]
 * @return {String|Object}
 * @api public
 */

lib.get = function (name) {
	this.cookies = this.cookies || parse()
	return name !== undefined ? this.cookies[name] : this.cookies
}

/**
 * remove cookie
 *
 * @param {String} name
 * @param {Object} [options]
 * @return {Boolean}
 * @api public
 */

lib.remove = function (name, options) {
	if (this.get(name) === undefined) return false

	options = options || {}
	options.expire = -1;

	this.set(name, '', options)
	return !this.get(name)
}

// export
module.exports = lib

},{}],"keks":[function(_dereq_,module,exports){
module.exports=_dereq_('Focm2+');
},{}]},{},["Focm2+"])
("Focm2+")
});