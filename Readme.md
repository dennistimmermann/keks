# keks

get, set and remove cookies

## Installation
### [npm](http://npmjs.org)

```
$ npm install keks
```

### [bower](http://bower.io)

```
$ bower install keks
```

### manual

```html
<script src="/path/to/browser.js"></script>
```

## API

#### keks.get( [name] )

Get one or all cookies.

```javascript
@param {String} [name]
@return {String|Object}
```

##### Examples

Get the value of 'cookie_name'.

```javascript
keks.get('cookie_name');
// => cookie_value

keks.get('i_do_not_exist');
// => undefined
```

Get an Object with all cookies as key/value pair

```javascript
keks.get();
// => { "cookie_name": "cookie_value", "another_cookie": "another_value", ... }
```

#### keks.set( name, value, [options] )

Set cookie.

```javascript
@param {String} name
@param {String|Number} value
@param {Object} [options]
```

##### Examples

Create/set the value of 'cookie_name'. If no options are set, it will default to a session cookie.

```javascript
keks.set('cookie_name', 'cookie_value');
// => true
```

Create/set a cookie expiring 48 hours from now.

```javascript
keks.set('cookie_name', 'cookie_value', {expires: 48});
// => true
```

Create/set a cookie expiring at a given date.

```javascript
keks.set('cookie_name', 'cookie_value', {expires: new Date("March 9, 2019 03:24:00")});
// => true
```

#### keks.remove( name )

Removes cookie.

```javascript
@param {String} name
@return {Boolean}
```

##### Example

remove a cookie.

```javascript
keks.remove('the_cookie');
// => true
```

When deleting a cookie, the path, domain and secure option must match the options that were used to create the cookie.

```javascript
keks.remove('the_cookie', {secure: true});
// => true
```

#### options

An `Object` can be passed to keks.set() in order to change the cookie properties.

##### expires

Set the lifetime of the cookie.

If the value of expires is a `Number`, the expiration date is *value* hours from the time of creation.
```javascript
{ expires: 48 }
```

You can also pass a `Date` object
```javascript
{ expires: new Date(2016,03,31) }
```

If omitted, the cookie will default to a session cookie

##### domain

Set the domain where the cookie is valid.

```javascript
{ domain: '.example.com' }
```

If omitted, the domain will default to the page where the cookie was created.

##### path

Set the path where the cookie is valid.

```javascript
{ path: '/' }
```

If omitted, the path will default to the path of the page where the cookie was created.

##### secure

Set whether the cookie requires https to be transmitted.

```javascript
{ secure: true }
```

If omitted, it will default to false.

## License

MIT
