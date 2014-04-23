"use strict";
/**
 *  cookie - get, set and remove cookies
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
 * @return {Boolean}
 * @api public
 */

lib.remove = function (name) {
	if (this.get(name) === undefined) return false

	this.set(name, '', {expires: -1})
	return !this.get(name)
}

// export
module.exports = lib
