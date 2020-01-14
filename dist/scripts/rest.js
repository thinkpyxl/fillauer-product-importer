/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/base64-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "./node_modules/buffer/index.js":
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ "./node_modules/base64-js/index.js")
var ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/ieee754/index.js")
var isArray = __webpack_require__(/*! isarray */ "./node_modules/isarray/index.js")

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/core-util-is/lib/util.js":
/*!***********************************************!*\
  !*** ./node_modules/core-util-is/lib/util.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.

function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return objectToString(arg) === '[object Array]';
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = Buffer.isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/csv-parse/lib/ResizeableBuffer.js":
/*!********************************************************!*\
  !*** ./node_modules/csv-parse/lib/ResizeableBuffer.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {

class ResizeableBuffer{
  constructor(size=100){
    this.size = size
    this.length = 0
    this.buf = Buffer.alloc(size)
  }
  prepend(val){
    const length = this.length++
    if(length === this.size){
      this.resize()
    }
    const buf = this.clone()
    this.buf[0] = val
    buf.copy(this.buf,1, 0, length)
  }
  append(val){
    const length = this.length++
    if(length === this.size){
      this.resize()
    }
    this.buf[length] = val
  }
  clone(){
    return Buffer.from(this.buf.slice(0, this.length))
  }
  resize(){
    const length = this.length
    this.size = this.size * 2
    const buf = Buffer.alloc(this.size)
    this.buf.copy(buf,0, 0, length)
    this.buf = buf
  }
  toString(){
    return this.buf.slice(0, this.length).toString()
  }
  toJSON(){
    return this.toString()
  }
  reset(){
    this.length = 0
  }
}

module.exports = ResizeableBuffer

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/csv-parse/lib/index.js":
/*!*********************************************!*\
  !*** ./node_modules/csv-parse/lib/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {
/*
CSV Parse

Please look at the [project documentation](https://csv.js.org/parse/) for additional
information.
*/

const { Transform } = __webpack_require__(/*! stream */ "./node_modules/stream-browserify/index.js")
const ResizeableBuffer = __webpack_require__(/*! ./ResizeableBuffer */ "./node_modules/csv-parse/lib/ResizeableBuffer.js")

const cr = 13
const nl = 10
const space = 32
const tab = 9
const bom_utf8 = Buffer.from([239, 187, 191])

class Parser extends Transform {
  constructor(opts = {}){
    super({...{readableObjectMode: true}, ...opts})
    const options = {}
    // Merge with user options
    for(let opt in opts){
      options[underscore(opt)] = opts[opt]
    }
    // Normalize option `bom`
    if(options.bom === undefined || options.bom === null || options.bom === false){
      options.bom = false
    }else if(options.bom !== true){
      throw new Error(`Invalid Option: bom must be true, got ${JSON.stringify(options.bom)}`)
    }
    // Normalize option `cast`
    let fnCastField = null
    if(options.cast === undefined || options.cast === null || options.cast === false || options.cast === ''){
      options.cast = undefined
    }else if(typeof options.cast === 'function'){
      fnCastField = options.cast
      options.cast = true
    }else if(options.cast !== true){
      throw new Error('Invalid Option: cast must be true or a function')
    }
    // Normalize option `cast_date`
    if(options.cast_date === undefined || options.cast_date === null || options.cast_date === false || options.cast_date === ''){
      options.cast_date = false
    }else if(options.cast_date === true){
      options.cast_date = function(value){
        const date = Date.parse(value)
        return !isNaN(date) ? new Date(date) : value
      }
    }else if(typeof options.cast_date !== 'function'){
      throw new Error('Invalid Option: cast_date must be true or a function')
    }
    // Normalize option `columns`
    let fnFirstLineToHeaders = null
    if(options.columns === true){
      // Fields in the first line are converted as-is to columns
      fnFirstLineToHeaders = undefined
    }else if(typeof options.columns === 'function'){
      fnFirstLineToHeaders = options.columns
      options.columns = true
    }else if(Array.isArray(options.columns)){
      options.columns = normalizeColumnsArray(options.columns)
    }else if(options.columns === undefined || options.columns === null || options.columns === false){
      options.columns = false
    }else{
      throw new Error(`Invalid Option columns: expect an object or true, got ${JSON.stringify(options.columns)}`)
    }
    // Normalize option `comment`
    if(options.comment === undefined || options.comment === null || options.comment === false || options.comment === ''){
      options.comment = null
    }else{
      if(typeof options.comment === 'string'){
        options.comment = Buffer.from(options.comment)
      }
      if(!Buffer.isBuffer(options.comment)){
        throw new Error(`Invalid Option: comment must be a buffer or a string, got ${JSON.stringify(options.comment)}`)
      }
    }
    // Normalize option `delimiter`
    if(options.delimiter === undefined || options.delimiter === null || options.delimiter === false){
      options.delimiter = Buffer.from(',')
    }else if(Buffer.isBuffer(options.delimiter)){
      if(options.delimiter.length === 0){
        throw new Error(`Invalid Option: delimiter must be a non empty buffer`)
      }
      // Great, nothing to do
    }else if(typeof options.delimiter === 'string'){
      if(options.delimiter.length === 0){
        throw new Error(`Invalid Option: delimiter must be a non empty string`)
      }
      options.delimiter = Buffer.from(options.delimiter)
    }else{
      throw new Error(`Invalid Option: delimiter must be a string or a buffer, got ${options.delimiter}`)
    }
    // Normalize option `escape`
    if(options.escape === undefined || options.escape === null){
      options.escape = Buffer.from('"')
    }else if(typeof options.escape === 'string'){
      options.escape = Buffer.from(options.escape)
    }
    if(!Buffer.isBuffer(options.escape)){
      throw new Error(`Invalid Option: escape must be a buffer or a string, got ${JSON.stringify(options.escape)}`)
    }else if(options.escape.length !== 1){
      throw new Error(`Invalid Option Length: escape must be one character, got ${options.escape.length}`)
    }else{
      options.escape = options.escape[0]
    }
    // Normalize option `from`
    if(options.from === undefined || options.from === null){
      options.from = 1
    }else{
      if(typeof options.from === 'string' && /\d+/.test(options.from)){
        options.from = parseInt(options.from)
      }
      if(Number.isInteger(options.from)){
        if(options.from < 0){
          throw new Error(`Invalid Option: from must be a positive integer, got ${JSON.stringify(opts.from)}`)
        }
      }else{
        throw new Error(`Invalid Option: from must be an integer, got ${JSON.stringify(options.from)}`)
      }
    }
    // Normalize option `from_line`
    if(options.from_line === undefined || options.from_line === null){
      options.from_line = 1
    }else{
      if(typeof options.from_line === 'string' && /\d+/.test(options.from_line)){
        options.from_line = parseInt(options.from_line)
      }
      if(Number.isInteger(options.from_line)){
        if(options.from_line <= 0){
          throw new Error(`Invalid Option: from_line must be a positive integer greater than 0, got ${JSON.stringify(opts.from_line)}`)
        }
      }else{
        throw new Error(`Invalid Option: from_line must be an integer, got ${JSON.stringify(opts.from_line)}`)
      }
    }
    // Normalize option `info`
    if(options.info === undefined || options.info === null || options.info === false){
      options.info = false
    }else if(options.info !== true){
      throw new Error(`Invalid Option: info must be true, got ${JSON.stringify(options.info)}`)
    }
    // Normalize option `max_record_size`
    if(options.max_record_size === undefined || options.max_record_size === null || options.max_record_size === false){
      options.max_record_size = 0
    }else if(Number.isInteger(options.max_record_size) && options.max_record_size >= 0){
      // Great, nothing to do
    }else if(typeof options.max_record_size === 'string' && /\d+/.test(options.max_record_size)){
      options.max_record_size = parseInt(options.max_record_size)
    }else{
      throw new Error(`Invalid Option: max_record_size must be a positive integer, got ${JSON.stringify(options.max_record_size)}`)
    }
    // Normalize option `objname`
    if(options.objname === undefined || options.objname === null || options.objname === false){
      options.objname = undefined
    }else if(Buffer.isBuffer(options.objname)){
      if(options.objname.length === 0){
        throw new Error(`Invalid Option: objname must be a non empty buffer`)
      }
      options.objname = options.objname.toString()
    }else if(typeof options.objname === 'string'){
      if(options.objname.length === 0){
        throw new Error(`Invalid Option: objname must be a non empty string`)
      }
      // Great, nothing to do
    }else{
      throw new Error(`Invalid Option: objname must be a string or a buffer, got ${options.objname}`)
    }
    // Normalize option `quote`
    if(options.quote === null || options.quote === false || options.quote === ''){
      options.quote = null
    }else{
      if(options.quote === undefined || options.quote === true){
        options.quote = Buffer.from('"')
      }else if(typeof options.quote === 'string'){
        options.quote = Buffer.from(options.quote)
      }
      if(!Buffer.isBuffer(options.quote)){
        throw new Error(`Invalid Option: quote must be a buffer or a string, got ${JSON.stringify(options.quote)}`)
      }else if(options.quote.length !== 1){
        throw new Error(`Invalid Option Length: quote must be one character, got ${options.quote.length}`)
      }else{
        options.quote = options.quote[0]
      }
    }
    // Normalize option `raw`
    if(options.raw === undefined || options.raw === null || options.raw === false){
      options.raw = false
    }else if(options.raw !== true){
      throw new Error(`Invalid Option: raw must be true, got ${JSON.stringify(options.raw)}`)
    }
    // Normalize option `record_delimiter`
    if(!options.record_delimiter){
      options.record_delimiter = []
    }else if(!Array.isArray(options.record_delimiter)){
      options.record_delimiter = [options.record_delimiter]
    }
    options.record_delimiter = options.record_delimiter.map( function(rd){
      if(typeof rd === 'string'){
        rd = Buffer.from(rd)
      }
      return rd
    })
    // Normalize option `relax`
    if(typeof options.relax === 'boolean'){
      // Great, nothing to do
    }else if(options.relax === undefined || options.relax === null){
      options.relax = false
    }else{
      throw new Error(`Invalid Option: relax must be a boolean, got ${JSON.stringify(options.relax)}`)
    }
    // Normalize option `relax_column_count`
    if(typeof options.relax_column_count === 'boolean'){
      // Great, nothing to do
    }else if(options.relax_column_count === undefined || options.relax_column_count === null){
      options.relax_column_count = false
    }else{
      throw new Error(`Invalid Option: relax_column_count must be a boolean, got ${JSON.stringify(options.relax_column_count)}`)
    }
    // Normalize option `skip_empty_lines`
    if(typeof options.skip_empty_lines === 'boolean'){
      // Great, nothing to do
    }else if(options.skip_empty_lines === undefined || options.skip_empty_lines === null){
      options.skip_empty_lines = false
    }else{
      throw new Error(`Invalid Option: skip_empty_lines must be a boolean, got ${JSON.stringify(options.skip_empty_lines)}`)
    }
    // Normalize option `skip_lines_with_empty_values`
    if(typeof options.skip_lines_with_empty_values === 'boolean'){
      // Great, nothing to do
    }else if(options.skip_lines_with_empty_values === undefined || options.skip_lines_with_empty_values === null){
      options.skip_lines_with_empty_values = false
    }else{
      throw new Error(`Invalid Option: skip_lines_with_empty_values must be a boolean, got ${JSON.stringify(options.skip_lines_with_empty_values)}`)
    }
    // Normalize option `skip_lines_with_error`
    if(typeof options.skip_lines_with_error === 'boolean'){
      // Great, nothing to do
    }else if(options.skip_lines_with_error === undefined || options.skip_lines_with_error === null){
      options.skip_lines_with_error = false
    }else{
      throw new Error(`Invalid Option: skip_lines_with_error must be a boolean, got ${JSON.stringify(options.skip_lines_with_error)}`)
    }
    // Normalize option `rtrim`
    if(options.rtrim === undefined || options.rtrim === null || options.rtrim === false){
      options.rtrim = false
    }else if(options.rtrim !== true){
      throw new Error(`Invalid Option: rtrim must be a boolean, got ${JSON.stringify(options.rtrim)}`)
    }
    // Normalize option `ltrim`
    if(options.ltrim === undefined || options.ltrim === null || options.ltrim === false){
      options.ltrim = false
    }else if(options.ltrim !== true){
      throw new Error(`Invalid Option: ltrim must be a boolean, got ${JSON.stringify(options.ltrim)}`)
    }
    // Normalize option `trim`
    if(options.trim === undefined || options.trim === null || options.trim === false){
      options.trim = false
    }else if(options.trim !== true){
      throw new Error(`Invalid Option: trim must be a boolean, got ${JSON.stringify(options.trim)}`)
    }
    // Normalize options `trim`, `ltrim` and `rtrim`
    if(options.trim === true && opts.ltrim !== false){
      options.ltrim = true
    }else if(options.ltrim !== true){
      options.ltrim = false
    }
    if(options.trim === true && opts.rtrim !== false){
      options.rtrim = true
    }else if(options.rtrim !== true){
      options.rtrim = false
    }
    // Normalize option `to`
    if(options.to === undefined || options.to === null){
      options.to = -1
    }else{
      if(typeof options.to === 'string' && /\d+/.test(options.to)){
        options.to = parseInt(options.to)
      }
      if(Number.isInteger(options.to)){
        if(options.to <= 0){
          throw new Error(`Invalid Option: to must be a positive integer greater than 0, got ${JSON.stringify(opts.to)}`)
        }
      }else{
        throw new Error(`Invalid Option: to must be an integer, got ${JSON.stringify(opts.to)}`)
      }
    }
    // Normalize option `to_line`
    if(options.to_line === undefined || options.to_line === null){
      options.to_line = -1
    }else{
      if(typeof options.to_line === 'string' && /\d+/.test(options.to_line)){
        options.to_line = parseInt(options.to_line)
      }
      if(Number.isInteger(options.to_line)){
        if(options.to_line <= 0){
          throw new Error(`Invalid Option: to_line must be a positive integer greater than 0, got ${JSON.stringify(opts.to_line)}`)
        }
      }else{
        throw new Error(`Invalid Option: to_line must be an integer, got ${JSON.stringify(opts.to_line)}`)
      }
    }
    this.info = {
      comment_lines: 0,
      empty_lines: 0,
      invalid_field_length: 0,
      lines: 1,
      records: 0
    }
    this.options = options
    this.state = {
      bomSkipped: false,
      castField: fnCastField,
      commenting: false,
      enabled: options.from_line === 1,
      escaping: false,
      escapeIsQuote: options.escape === options.quote,
      expectedRecordLength: options.columns === null ? 0 : options.columns.length,
      field: new ResizeableBuffer(20),
      firstLineToHeaders: fnFirstLineToHeaders,
      info: Object.assign({}, this.info),
      previousBuf: undefined,
      quoting: false,
      stop: false,
      rawBuffer: new ResizeableBuffer(100),
      record: [],
      recordHasError: false,
      record_length: 0,
      recordDelimiterMaxLength: options.record_delimiter.length === 0 ? 2 : Math.max(...options.record_delimiter.map( (v) => v.length)),
      trimChars: [Buffer.from(' ')[0], Buffer.from('\t')[0]],
      wasQuoting: false,
      wasRowDelimiter: false
    }
  }
  // Implementation of `Transform._transform`
  _transform(buf, encoding, callback){
    if(this.state.stop === true){
      return
    }
    const err = this.__parse(buf, false)
    if(err !== undefined){
      this.state.stop = true
    }
    callback(err)
  }
  // Implementation of `Transform._flush`
  _flush(callback){
    if(this.state.stop === true){
      return
    }
    const err = this.__parse(undefined, true)
    callback(err)
  }
  // Central parser implementation
  __parse(nextBuf, end){
    const {bom, comment, escape, from_line, info, ltrim, max_record_size, quote, raw, relax, rtrim, skip_empty_lines, to, to_line} = this.options
    let {record_delimiter} = this.options
    const {bomSkipped, previousBuf, rawBuffer, escapeIsQuote} = this.state
    let buf
    if(previousBuf === undefined){
      if(nextBuf === undefined){
        // Handle empty string
        this.push(null)
        return
      }else{
        buf = nextBuf
      }
    }else if(previousBuf !== undefined && nextBuf === undefined){
      buf = previousBuf
    }else{
      buf = Buffer.concat([previousBuf, nextBuf])
    }
    // Handle UTF BOM
    if(bomSkipped === false){
      if(bom === false){
        this.state.bomSkipped = true
      }else if(buf.length < 3){
        // No enough data
        if(end === false){
          // Wait for more data
          this.state.previousBuf = buf
          return
        }
        // skip BOM detect because data length < 3
      }else{
        if(bom_utf8.compare(buf, 0, 3) === 0){
          // Skip BOM
          buf = buf.slice(3)
        }
        this.state.bomSkipped = true
      }
    }
    const bufLen = buf.length
    let pos
    for(pos = 0; pos < bufLen; pos++){
      // Ensure we get enough space to look ahead
      // There should be a way to move this out of the loop
      if(this.__needMoreData(pos, bufLen, end)){
        break
      }
      if(this.state.wasRowDelimiter === true){
        this.info.lines++
        if(info === true && this.state.record.length === 0 && this.state.field.length === 0 && this.state.wasQuoting === false){
          this.state.info = Object.assign({}, this.info)
        }
        this.state.wasRowDelimiter = false
      }
      if(to_line !== -1 && this.info.lines > to_line){
        this.state.stop = true
        this.push(null)
        return
      }
      // Auto discovery of record_delimiter, unix, mac and windows supported
      if(this.state.quoting === false && record_delimiter.length === 0){
        const record_delimiterCount = this.__autoDiscoverRowDelimiter(buf, pos)
        if(record_delimiterCount){
          record_delimiter = this.options.record_delimiter
        }
      }
      const chr = buf[pos]
      if(raw === true){
        rawBuffer.append(chr)
      }
      if((chr === cr || chr === nl) && this.state.wasRowDelimiter === false ){
        this.state.wasRowDelimiter = true
      }
      // Previous char was a valid escape char
      // treat the current char as a regular char
      if(this.state.escaping === true){
        this.state.escaping = false
      }else{
        // Escape is only active inside quoted fields
        if(this.state.quoting === true && chr === escape && pos + 1 < bufLen){
          // We are quoting, the char is an escape chr and there is a chr to escape
          if(escapeIsQuote){
            if(buf[pos+1] === quote){
              this.state.escaping = true
              continue
            }
          }else{
            this.state.escaping = true
            continue
          }
        }
        // Not currently escaping and chr is a quote
        // TODO: need to compare bytes instead of single char
        if(this.state.commenting === false && chr === quote){
          if(this.state.quoting === true){
            const nextChr = buf[pos+1]
            const isNextChrTrimable = rtrim && this.__isCharTrimable(nextChr)
            // const isNextChrComment = nextChr === comment
            const isNextChrComment = comment !== null && this.__compareBytes(comment, buf, pos+1, nextChr)
            const isNextChrDelimiter = this.__isDelimiter(nextChr, buf, pos+1)
            const isNextChrRowDelimiter = record_delimiter.length === 0 ? this.__autoDiscoverRowDelimiter(buf, pos+1) : this.__isRecordDelimiter(nextChr, buf, pos+1)
            // Escape a quote
            // Treat next char as a regular character
            // TODO: need to compare bytes instead of single char
            if(chr === escape && nextChr === quote){
              pos++
            }else if(!nextChr || isNextChrDelimiter || isNextChrRowDelimiter || isNextChrComment || isNextChrTrimable){
              this.state.quoting = false
              this.state.wasQuoting = true
              continue
            }else if(relax === false){
              const err = this.__error(
                new CsvError('CSV_INVALID_CLOSING_QUOTE', [
                  'Invalid Closing Quote:',
                  `got "${String.fromCharCode(nextChr)}"`,
                  `at line ${this.info.lines}`,
                  'instead of delimiter, row delimiter, trimable character',
                  '(if activated) or comment',
                ], this.__context())
              )
              if(err !== undefined) return err
            }else{
              this.state.quoting = false
              this.state.wasQuoting = true
              // continue
              this.state.field.prepend(quote)
            }
          }else{
            if(this.state.field.length !== 0){
              // In relax mode, treat opening quote preceded by chrs as regular
              if( relax === false ){
                const err = this.__error(
                  new CsvError('INVALID_OPENING_QUOTE', [
                    'Invalid Opening Quote:',
                    `a quote is found inside a field at line ${this.info.lines}`,
                  ], this.__context(), {
                    field: this.state.field,
                  })
                )
                if(err !== undefined) return err
              }
            }else{
              this.state.quoting = true
              continue
            }
          }
        }
        if(this.state.quoting === false){
          let recordDelimiterLength = this.__isRecordDelimiter(chr, buf, pos)
          if(recordDelimiterLength !== 0){
            // Do not emit comments which take a full line
            const skipCommentLine = this.state.commenting && (this.state.wasQuoting === false && this.state.record.length === 0 && this.state.field.length === 0)
            if(skipCommentLine){
              this.info.comment_lines++
              // Skip full comment line
            }else{
              // Skip if line is empty and skip_empty_lines activated
              if(skip_empty_lines === true && this.state.wasQuoting === false && this.state.record.length === 0 && this.state.field.length === 0){
                this.info.empty_lines++
                pos += recordDelimiterLength - 1
                continue
              }
              // Activate records emition if above from_line
              if(this.state.enabled === false && this.info.lines + (this.state.wasRowDelimiter === true ? 1: 0 ) >= from_line){
                this.state.enabled = true
                this.__resetField()
                this.__resetRow()
                pos += recordDelimiterLength - 1
                continue
              }else{
                const errField = this.__onField()
                if(errField !== undefined) return errField
                const errRecord = this.__onRow()
                if(errRecord !== undefined) return errRecord
              }
              if(to !== -1 && this.info.records >= to){
                this.state.stop = true
                this.push(null)
                return
              }
            }
            this.state.commenting = false
            pos += recordDelimiterLength - 1
            continue
          }
          if(this.state.commenting){
            continue
          }
          const commentCount = comment === null ? 0 : this.__compareBytes(comment, buf, pos, chr)
          if(commentCount !== 0){
            this.state.commenting = true
            continue
          }
          let delimiterLength = this.__isDelimiter(chr, buf, pos)
          if(delimiterLength !== 0){
            const errField = this.__onField()
            if(errField !== undefined) return errField
            pos += delimiterLength - 1
            continue
          }
        }
      }
      if(this.state.commenting === false){
        if(max_record_size !== 0 && this.state.record_length + this.state.field.length > max_record_size){
          const err = this.__error(
            new CsvError('CSV_MAX_RECORD_SIZE', [
              'Max Record Size:',
              'record exceed the maximum number of tolerated bytes',
              `of ${max_record_size}`,
              `at line ${this.info.lines}`,
            ], this.__context())
          )
          if(err !== undefined) return err
        }
      }

      const lappend = ltrim === false || this.state.quoting === true || this.state.field.length !== 0 || !this.__isCharTrimable(chr)
      // rtrim in non quoting is handle in __onField
      const rappend = rtrim === false || this.state.wasQuoting === false
      if( lappend === true && rappend === true ){
        this.state.field.append(chr)
      }else if(rtrim === true && !this.__isCharTrimable(chr)){
        const err = this.__error(
          new CsvError('CSV_NON_TRIMABLE_CHAR_AFTER_CLOSING_QUOTE', [
            'Invalid Closing Quote:',
            'found non trimable byte after quote',
            `at line ${this.info.lines}`,
          ], this.__context())
        )
        if(err !== undefined) return err
      }
    }
    if(end === true){
      if(this.state.quoting === true){
        const err = this.__error(
          new CsvError('CSV_QUOTE_NOT_CLOSED', [
            'Quote Not Closed:',
            `the parsing is finished with an opening quote at line ${this.info.lines}`,
          ], this.__context())
        )
        if(err !== undefined) return err
      }else{
        // Skip last line if it has no characters
        if(this.state.wasQuoting === true || this.state.record.length !== 0 || this.state.field.length !== 0){
          const errField = this.__onField()
          if(errField !== undefined) return errField
          const errRecord = this.__onRow()
          if(errRecord !== undefined) return errRecord
        }else if(this.state.wasRowDelimiter === true){
          this.info.empty_lines++
        }else if(this.state.commenting === true){
          this.info.comment_lines++
        }
      }
    }else{
      this.state.previousBuf = buf.slice(pos)
    }
    if(this.state.wasRowDelimiter === true){
      this.info.lines++
      this.state.wasRowDelimiter = false
    }
  }
  // Helper to test if a character is a space or a line delimiter
  __isCharTrimable(chr){
    return chr === space || chr === tab || chr === cr || chr === nl
  }
  __onRow(){
    const {columns, info, from, relax_column_count, raw, skip_lines_with_empty_values} = this.options
    const {enabled, record} = this.state
    // Convert the first line into column names
    if(columns === true){
      return this.__firstLineToColumns(record)
    }
    const recordLength = record.length
    if(columns === false && this.info.records === 0){
      this.state.expectedRecordLength = recordLength
    }else if(enabled === true){
      if(recordLength !== this.state.expectedRecordLength){
        if(relax_column_count === true){
          this.info.invalid_field_length++
        }else{
          if(columns === false){
            const err = this.__error(
              new CsvError('CSV_INVALID_RECORD_LENGTH_DONT_PREVIOUS_RECORDS', [
                'Invalid Record Length:',
                `expect ${this.state.expectedRecordLength},`,
                `got ${recordLength} on line ${this.info.lines}`,
              ], this.__context(), {
                record: record,
              })
            )
            if(err !== undefined) return err
          }else{
            const err = this.__error(
              new CsvError('CSV_INVALID_RECORD_LENGTH_DONT_MATCH_COLUMNS', [
                'Invalid Record Length:',
                `header length is ${columns.length},`,
                `got ${recordLength} on line ${this.info.lines}`,
              ], this.__context(), {
                record: record,
              })
            )
            if(err !== undefined) return err
          }
        }
      }
    }
    if(enabled === false){
      return this.__resetRow()
    }
    if(skip_lines_with_empty_values === true){
      if(record.every( (field) => field == null || field.toString && field.toString().trim() === '' )){
        this.__resetRow()
        return
      }
    }
    if(this.state.recordHasError === true){
      this.__resetRow()
      this.state.recordHasError = false
      return
    }
    this.info.records++
    if(from === 1 || this.info.records >= from){
      if(columns !== false){
        const obj = {}
        // Transform record array to an object
        for(let i in record){
          if(columns[i] === undefined || columns[i].disabled) continue
          obj[columns[i].name] = record[i]
        }
        const {objname} = this.options
        if(objname === undefined){
          if(raw === true || info === true){
            this.push(Object.assign(
              {record: obj},
              (raw === true ? {raw: this.state.rawBuffer.toString()}: {}),
              (info === true ? {info: this.state.info}: {})
            ))
          }else{
            this.push(obj)
          }
        }else{
          if(raw === true || info === true){
            this.push(Object.assign(
              {record: [obj[objname], obj]},
              raw === true ? {raw: this.state.rawBuffer.toString()}: {},
              info === true ? {info: this.state.info}: {}
            ))
          }else{
            this.push([obj[objname], obj])
          }
        }
      }else{
        if(raw === true || info === true){
          this.push(Object.assign(
            {record: record},
            raw === true ? {raw: this.state.rawBuffer.toString()}: {},
            info === true ? {info: this.state.info}: {}
          ))
        }else{
          this.push(record)
        }
      }
    }
    this.__resetRow()
  }
  __firstLineToColumns(record){
    const {firstLineToHeaders} = this.state
    try{
      const headers = firstLineToHeaders === undefined ? record : firstLineToHeaders.call(null, record)
      if(!Array.isArray(headers)){
        return this.__error(
          new CsvError('CSV_INVALID_COLUMN_MAPPING', [
            'Invalid Column Mapping:',
            'expect an array from column function,',
            `got ${JSON.stringify(headers)}`
          ], this.__context(), {
            headers: headers,
          })
        )
      }
      const normalizedHeaders = normalizeColumnsArray(headers)
      this.state.expectedRecordLength = normalizedHeaders.length
      this.options.columns = normalizedHeaders
      this.__resetRow()
      return
    }catch(err){
      return err
    }
  }
  __resetRow(){
    if(this.options.raw === true){
      this.state.rawBuffer.reset()
    }
    this.state.record = []
    this.state.record_length = 0
  }
  __onField(){
    const {cast, rtrim, max_record_size} = this.options
    const {enabled, wasQuoting} = this.state
    // Deal with from_to options
    if(this.options.columns !== true && enabled === false){
      return this.__resetField()
    }
    let field = this.state.field.toString()
    if(rtrim === true && wasQuoting === false){
      field = field.trimRight()
    }
    if(cast === true){
      const [err, f] = this.__cast(field)
      if(err !== undefined) return err
      field = f
    }
    this.state.record.push(field)
    // Increment record length if record size must not exceed a limit
    if(max_record_size !== 0 && typeof field === 'string'){
      this.state.record_length += field.length
    }
    this.__resetField()
  }
  __resetField(){
    this.state.field.reset()
    this.state.wasQuoting = false
  }
  // Return a tuple with the error and the casted value
  __cast(field){
    const {columns, relax_column_count} = this.options
    const isColumns = Array.isArray(columns)
    // Dont loose time calling cast
    // because the final record is an object
    // and this field can't be associated to a key present in columns
    if( isColumns === true && relax_column_count && this.options.columns.length <= this.state.record.length ){
      return [undefined, undefined]
    }
    const context = this.__context()
    if(this.state.castField !== null){
      try{
        return [undefined, this.state.castField.call(null, field, context)]
      }catch(err){
        return [err]
      }
    }
    if(this.__isFloat(field)){
      return [undefined, parseFloat(field)]
    }else if(this.options.cast_date !== false){
      return [undefined, this.options.cast_date.call(null, field, context)]
    }
    return [undefined, field]
  }
  // Keep it in case we implement the `cast_int` option
  // __isInt(value){
  //   // return Number.isInteger(parseInt(value))
  //   // return !isNaN( parseInt( obj ) );
  //   return /^(\-|\+)?[1-9][0-9]*$/.test(value)
  // }
  __isFloat(value){
    return (value - parseFloat( value ) + 1) >= 0 // Borrowed from jquery
  }
  __compareBytes(sourceBuf, targetBuf, pos, firtByte){
    if(sourceBuf[0] !== firtByte) return 0
    const sourceLength = sourceBuf.length
    for(let i = 1; i < sourceLength; i++){
      if(sourceBuf[i] !== targetBuf[pos+i]) return 0
    }
    return sourceLength
  }
  __needMoreData(i, bufLen, end){
    if(end){
      return false
    }
    const {comment, delimiter} = this.options
    const {quoting, recordDelimiterMaxLength} = this.state
    const numOfCharLeft = bufLen - i - 1
    const requiredLength = Math.max(
      // Skip if the remaining buffer smaller than comment
      comment ? comment.length : 0,
      // Skip if the remaining buffer smaller than row delimiter
      recordDelimiterMaxLength,
      // Skip if the remaining buffer can be row delimiter following the closing quote
      // 1 is for quote.length
      quoting ? (1 + recordDelimiterMaxLength) : 0,
      // Skip if the remaining buffer can be delimiter
      delimiter.length,
      // Skip if the remaining buffer can be escape sequence
      // 1 is for escape.length
      1
    )
    return numOfCharLeft < requiredLength
  }
  __isDelimiter(chr, buf, pos){
    const {delimiter} = this.options
    const delLength = delimiter.length
    if(delimiter[0] !== chr) return 0
    for(let i = 1; i < delLength; i++){
      if(delimiter[i] !== buf[pos+i]) return 0
    }
    return delimiter.length
  }
  __isRecordDelimiter(chr, buf, pos){
    const {record_delimiter} = this.options
    const recordDelimiterLength = record_delimiter.length
    loop1: for(let i = 0; i < recordDelimiterLength; i++){
      const rd = record_delimiter[i]
      const rdLength = rd.length
      if(rd[0] !== chr){
        continue
      }
      for(let j = 1; j < rdLength; j++){
        if(rd[j] !== buf[pos+j]){
          continue loop1
        }
      }
      return rd.length
    }
    return 0
  }
  __autoDiscoverRowDelimiter(buf, pos){
    const chr = buf[pos]
    if(chr === cr){
      if(buf[pos+1] === nl){
        this.options.record_delimiter.push(Buffer.from('\r\n'))
        this.state.recordDelimiterMaxLength = 2
        return 2
      }else{
        this.options.record_delimiter.push(Buffer.from('\r'))
        this.state.recordDelimiterMaxLength = 1
        return 1
      }
    }else if(chr === nl){
      this.options.record_delimiter.push(Buffer.from('\n'))
      this.state.recordDelimiterMaxLength = 1
      return 1
    }
    return 0
  }
  __error(msg){
    const {skip_lines_with_error} = this.options
    const err = typeof msg === 'string' ? new Error(msg) : msg
    if(skip_lines_with_error){
      this.state.recordHasError = true
      this.emit('skip', err)
      return undefined
    }else{
      return err
    }
  }
  __context(){
    const {columns} = this.options
    const isColumns = Array.isArray(columns)
    return {
      column: isColumns === true ?
        ( columns.length > this.state.record.length ?
          columns[this.state.record.length].name :
          null
        ) :
        this.state.record.length,
      empty_lines: this.info.empty_lines,
      header: columns === true,
      index: this.state.record.length,
      invalid_field_length: this.info.invalid_field_length,
      quoting: this.state.wasQuoting,
      lines: this.info.lines,
      records: this.info.records
    }
  }
}

const parse = function(){
  let data, options, callback
  for(let i in arguments){
    const argument = arguments[i]
    const type = typeof argument
    if(data === undefined && (typeof argument === 'string' || Buffer.isBuffer(argument))){
      data = argument
    }else if(options === undefined && isObject(argument)){
      options = argument
    }else if(callback === undefined && type === 'function'){
      callback = argument
    }else{
      throw new Error(`Invalid argument: got ${JSON.stringify(argument)} at index ${i}`)
    }
  }
  const parser = new Parser(options)
  if(callback){
    const records = options === undefined || options.objname === undefined ? [] : {}
    parser.on('readable', function(){
      let record
      while((record = this.read()) !== null){
        if(options === undefined || options.objname === undefined){
          records.push(record)
        }else{
          records[record[0]] = record[1]
        }
      }
    })
    parser.on('error', function(err){
      callback(err, undefined, parser.info)
    })
    parser.on('end', function(){
      callback(undefined, records, parser.info)
    })
  }
  if(data !== undefined){
    parser.write(data)
    parser.end()
  }
  return parser
}

class CsvError extends Error {
  constructor(code, message, ...contexts) {
    if(Array.isArray(message)) message = message.join(' ')
    super([message])
    Error.captureStackTrace(this, CsvError)
    this.code = code
    for(const context of contexts){
      for(const key in context){
        const value = context[key]
        this[key] = Buffer.isBuffer(value) ? value.toString() : value == null ? value : JSON.parse(JSON.stringify(value))
      }
    }
  }
}

parse.Parser = Parser

parse.CsvError = CsvError

module.exports = parse

const underscore = function(str){
  return str.replace(/([A-Z])/g, function(_, match){
    return '_' + match.toLowerCase()
  })
}

const isObject = function(obj){
  return (typeof obj === 'object' && obj !== null && !Array.isArray(obj))
}

const normalizeColumnsArray = function(columns){
  const normalizedColumns = [];

  for(let i=0; i< columns.length; i++){
    const column = columns[i]
    if(column === undefined || column === null || column === false){
      normalizedColumns[i] = { disabled: true }
    }else if(typeof column === 'string'){
      normalizedColumns[i] = { name: column }
    }else if(isObject(column)){
      if(typeof column.name !== 'string'){
        throw new Error(`Invalid Option columns: property "name" is required at position ${i} when column is an object literal`)
      }
      normalizedColumns[i] = column
    }else{
      throw new Error(`Invalid Option columns: expect a string or an object, got ${JSON.stringify(column)} at position ${i}`)
    }
  }
  return normalizedColumns;
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = $getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  var args = [];
  for (var i = 0; i < arguments.length; i++) args.push(arguments[i]);
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    ReflectApply(this.listener, this.target, args);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      if (typeof listener !== 'function') {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      if (typeof listener !== 'function') {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}


/***/ }),

/***/ "./node_modules/ieee754/index.js":
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "./node_modules/inherits/inherits_browser.js":
/*!***************************************************!*\
  !*** ./node_modules/inherits/inherits_browser.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}


/***/ }),

/***/ "./node_modules/isarray/index.js":
/*!***************************************!*\
  !*** ./node_modules/isarray/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "./node_modules/object-hash/dist/object_hash.js":
/*!******************************************************!*\
  !*** ./node_modules/object-hash/dist/object_hash.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var require;var require;!function(e){if(true)module.exports=e();else { var t; }}(function(){return function o(i,u,a){function f(n,e){if(!u[n]){if(!i[n]){var t="function"==typeof require&&require;if(!e&&t)return require(n,!0);if(s)return s(n,!0);throw new Error("Cannot find module '"+n+"'")}var r=u[n]={exports:{}};i[n][0].call(r.exports,function(e){var t=i[n][1][e];return f(t||e)},r,r.exports,o,i,u,a)}return u[n].exports}for(var s="function"==typeof require&&require,e=0;e<a.length;e++)f(a[e]);return f}({1:[function(w,b,m){(function(e,t,s,n,r,o,i,u,a){"use strict";var f=w("crypto");function c(e,t){return function(e,t){var n;n="passthrough"!==t.algorithm?f.createHash(t.algorithm):new y;void 0===n.write&&(n.write=n.update,n.end=n.update);g(t,n).dispatch(e),n.update||n.end("");if(n.digest)return n.digest("buffer"===t.encoding?void 0:t.encoding);var r=n.read();return"buffer"!==t.encoding?r.toString(t.encoding):r}(e,t=h(e,t))}(m=b.exports=c).sha1=function(e){return c(e)},m.keys=function(e){return c(e,{excludeValues:!0,algorithm:"sha1",encoding:"hex"})},m.MD5=function(e){return c(e,{algorithm:"md5",encoding:"hex"})},m.keysMD5=function(e){return c(e,{algorithm:"md5",encoding:"hex",excludeValues:!0})};var l=f.getHashes?f.getHashes().slice():["sha1","md5"];l.push("passthrough");var d=["buffer","hex","binary","base64"];function h(e,t){t=t||{};var n={};if(n.algorithm=t.algorithm||"sha1",n.encoding=t.encoding||"hex",n.excludeValues=!!t.excludeValues,n.algorithm=n.algorithm.toLowerCase(),n.encoding=n.encoding.toLowerCase(),n.ignoreUnknown=!0===t.ignoreUnknown,n.respectType=!1!==t.respectType,n.respectFunctionNames=!1!==t.respectFunctionNames,n.respectFunctionProperties=!1!==t.respectFunctionProperties,n.unorderedArrays=!0===t.unorderedArrays,n.unorderedSets=!1!==t.unorderedSets,n.unorderedObjects=!1!==t.unorderedObjects,n.replacer=t.replacer||void 0,n.excludeKeys=t.excludeKeys||void 0,void 0===e)throw new Error("Object argument required.");for(var r=0;r<l.length;++r)l[r].toLowerCase()===n.algorithm.toLowerCase()&&(n.algorithm=l[r]);if(-1===l.indexOf(n.algorithm))throw new Error('Algorithm "'+n.algorithm+'"  not supported. supported values: '+l.join(", "));if(-1===d.indexOf(n.encoding)&&"passthrough"!==n.algorithm)throw new Error('Encoding "'+n.encoding+'"  not supported. supported values: '+d.join(", "));return n}function p(e){if("function"!=typeof e)return!1;return null!=/^function\s+\w*\s*\(\s*\)\s*{\s+\[native code\]\s+}$/i.exec(Function.prototype.toString.call(e))}function g(u,t,a){a=a||[];function f(e){return t.update?t.update(e,"utf8"):t.write(e,"utf8")}return{dispatch:function(e){u.replacer&&(e=u.replacer(e));var t=typeof e;return null===e&&(t="null"),this["_"+t](e)},_object:function(t){var e=Object.prototype.toString.call(t),n=/\[object (.*)\]/i.exec(e);n=(n=n?n[1]:"unknown:["+e+"]").toLowerCase();var r;if(0<=(r=a.indexOf(t)))return this.dispatch("[CIRCULAR:"+r+"]");if(a.push(t),void 0!==s&&s.isBuffer&&s.isBuffer(t))return f("buffer:"),f(t);if("object"===n||"function"===n){var o=Object.keys(t);u.unorderedObjects&&(o=o.sort()),!1===u.respectType||p(t)||o.splice(0,0,"prototype","__proto__","constructor"),u.excludeKeys&&(o=o.filter(function(e){return!u.excludeKeys(e)})),f("object:"+o.length+":");var i=this;return o.forEach(function(e){i.dispatch(e),f(":"),u.excludeValues||i.dispatch(t[e]),f(",")})}if(!this["_"+n]){if(u.ignoreUnknown)return f("["+n+"]");throw new Error('Unknown object type "'+n+'"')}this["_"+n](t)},_array:function(e,t){t=void 0!==t?t:!1!==u.unorderedArrays;var n=this;if(f("array:"+e.length+":"),!t||e.length<=1)return e.forEach(function(e){return n.dispatch(e)});var r=[],o=e.map(function(e){var t=new y,n=a.slice();return g(u,t,n).dispatch(e),r=r.concat(n.slice(a.length)),t.read().toString()});return a=a.concat(r),o.sort(),this._array(o,!1)},_date:function(e){return f("date:"+e.toJSON())},_symbol:function(e){return f("symbol:"+e.toString())},_error:function(e){return f("error:"+e.toString())},_boolean:function(e){return f("bool:"+e.toString())},_string:function(e){f("string:"+e.length+":"),f(e.toString())},_function:function(e){f("fn:"),p(e)?this.dispatch("[native]"):this.dispatch(e.toString()),!1!==u.respectFunctionNames&&this.dispatch("function-name:"+String(e.name)),u.respectFunctionProperties&&this._object(e)},_number:function(e){return f("number:"+e.toString())},_xml:function(e){return f("xml:"+e.toString())},_null:function(){return f("Null")},_undefined:function(){return f("Undefined")},_regexp:function(e){return f("regex:"+e.toString())},_uint8array:function(e){return f("uint8array:"),this.dispatch(Array.prototype.slice.call(e))},_uint8clampedarray:function(e){return f("uint8clampedarray:"),this.dispatch(Array.prototype.slice.call(e))},_int8array:function(e){return f("uint8array:"),this.dispatch(Array.prototype.slice.call(e))},_uint16array:function(e){return f("uint16array:"),this.dispatch(Array.prototype.slice.call(e))},_int16array:function(e){return f("uint16array:"),this.dispatch(Array.prototype.slice.call(e))},_uint32array:function(e){return f("uint32array:"),this.dispatch(Array.prototype.slice.call(e))},_int32array:function(e){return f("uint32array:"),this.dispatch(Array.prototype.slice.call(e))},_float32array:function(e){return f("float32array:"),this.dispatch(Array.prototype.slice.call(e))},_float64array:function(e){return f("float64array:"),this.dispatch(Array.prototype.slice.call(e))},_arraybuffer:function(e){return f("arraybuffer:"),this.dispatch(new Uint8Array(e))},_url:function(e){return f("url:"+e.toString())},_map:function(e){f("map:");var t=Array.from(e);return this._array(t,!1!==u.unorderedSets)},_set:function(e){f("set:");var t=Array.from(e);return this._array(t,!1!==u.unorderedSets)},_blob:function(){if(u.ignoreUnknown)return f("[blob]");throw Error('Hashing Blob objects is currently not supported\n(see https://github.com/puleos/object-hash/issues/26)\nUse "options.replacer" or "options.ignoreUnknown"\n')},_domwindow:function(){return f("domwindow")},_process:function(){return f("process")},_timer:function(){return f("timer")},_pipe:function(){return f("pipe")},_tcp:function(){return f("tcp")},_udp:function(){return f("udp")},_tty:function(){return f("tty")},_statwatcher:function(){return f("statwatcher")},_securecontext:function(){return f("securecontext")},_connection:function(){return f("connection")},_zlib:function(){return f("zlib")},_context:function(){return f("context")},_nodescript:function(){return f("nodescript")},_httpparser:function(){return f("httpparser")},_dataview:function(){return f("dataview")},_signal:function(){return f("signal")},_fsevent:function(){return f("fsevent")},_tlswrap:function(){return f("tlswrap")}}}function y(){return{buf:"",write:function(e){this.buf+=e},end:function(e){this.buf+=e},read:function(){return this.buf}}}m.writeToStream=function(e,t,n){return void 0===n&&(n=t,t={}),g(t=h(e,t),n).dispatch(e)}}).call(this,w("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},w("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/fake_8fc94e7b.js","/")},{buffer:3,crypto:5,lYpoI2:10}],2:[function(e,t,s){(function(e,t,n,r,o,i,u,a,f){!function(e){"use strict";var s="undefined"!=typeof Uint8Array?Uint8Array:Array,n="+".charCodeAt(0),r="/".charCodeAt(0),o="0".charCodeAt(0),i="a".charCodeAt(0),u="A".charCodeAt(0),a="-".charCodeAt(0),f="_".charCodeAt(0);function c(e){var t=e.charCodeAt(0);return t===n||t===a?62:t===r||t===f?63:t<o?-1:t<o+10?t-o+26+26:t<u+26?t-u:t<i+26?t-i+26:void 0}e.toByteArray=function(e){var t,n,r,o,i;if(0<e.length%4)throw new Error("Invalid string. Length must be a multiple of 4");var u=e.length;o="="===e.charAt(u-2)?2:"="===e.charAt(u-1)?1:0,i=new s(3*e.length/4-o),n=0<o?e.length-4:e.length;var a=0;function f(e){i[a++]=e}for(t=0;t<n;t+=4,3)f((16711680&(r=c(e.charAt(t))<<18|c(e.charAt(t+1))<<12|c(e.charAt(t+2))<<6|c(e.charAt(t+3))))>>16),f((65280&r)>>8),f(255&r);return 2==o?f(255&(r=c(e.charAt(t))<<2|c(e.charAt(t+1))>>4)):1==o&&(f((r=c(e.charAt(t))<<10|c(e.charAt(t+1))<<4|c(e.charAt(t+2))>>2)>>8&255),f(255&r)),i},e.fromByteArray=function(e){var t,n,r,o,i=e.length%3,u="";function a(e){return"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e)}for(t=0,r=e.length-i;t<r;t+=3)n=(e[t]<<16)+(e[t+1]<<8)+e[t+2],u+=a((o=n)>>18&63)+a(o>>12&63)+a(o>>6&63)+a(63&o);switch(i){case 1:u+=a((n=e[e.length-1])>>2),u+=a(n<<4&63),u+="==";break;case 2:u+=a((n=(e[e.length-2]<<8)+e[e.length-1])>>10),u+=a(n>>4&63),u+=a(n<<2&63),u+="="}return u}}(void 0===s?this.base64js={}:s)}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/base64-js/lib/b64.js","/node_modules/gulp-browserify/node_modules/base64-js/lib")},{buffer:3,lYpoI2:10}],3:[function(D,e,O){(function(e,t,f,n,r,o,i,u,a){var s=D("base64-js"),c=D("ieee754");function f(e,t,n){if(!(this instanceof f))return new f(e,t,n);var r,o,i,u=typeof e;if("base64"===t&&"string"==u)for(e=function(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")}(e);e.length%4!=0;)e+="=";if("number"==u)r=U(e);else if("string"==u)r=f.byteLength(e,t);else{if("object"!=u)throw new Error("First argument needs to be a number, array or string.");r=U(e.length)}if(f._useTypedArrays?o=f._augment(new Uint8Array(r)):((o=this).length=r,o._isBuffer=!0),f._useTypedArrays&&"number"==typeof e.byteLength)o._set(e);else if(function(e){return x(e)||f.isBuffer(e)||e&&"object"==typeof e&&"number"==typeof e.length}(e))for(i=0;i<r;i++)f.isBuffer(e)?o[i]=e.readUInt8(i):o[i]=e[i];else if("string"==u)o.write(e,0,t);else if("number"==u&&!f._useTypedArrays&&!n)for(i=0;i<r;i++)o[i]=0;return o}function l(e,t,n,r){return f._charsWritten=k(function(e){for(var t=[],n=0;n<e.length;n++)t.push(255&e.charCodeAt(n));return t}(t),e,n,r)}function d(e,t,n){var r="";n=Math.min(e.length,n);for(var o=t;o<n;o++)r+=String.fromCharCode(e[o]);return r}function h(e,t,n,r){r||(F("boolean"==typeof n,"missing or invalid endian"),F(null!=t,"missing offset"),F(t+1<e.length,"Trying to read beyond buffer length"));var o,i=e.length;if(!(i<=t))return n?(o=e[t],t+1<i&&(o|=e[t+1]<<8)):(o=e[t]<<8,t+1<i&&(o|=e[t+1])),o}function p(e,t,n,r){r||(F("boolean"==typeof n,"missing or invalid endian"),F(null!=t,"missing offset"),F(t+3<e.length,"Trying to read beyond buffer length"));var o,i=e.length;if(!(i<=t))return n?(t+2<i&&(o=e[t+2]<<16),t+1<i&&(o|=e[t+1]<<8),o|=e[t],t+3<i&&(o+=e[t+3]<<24>>>0)):(t+1<i&&(o=e[t+1]<<16),t+2<i&&(o|=e[t+2]<<8),t+3<i&&(o|=e[t+3]),o+=e[t]<<24>>>0),o}function g(e,t,n,r){if(r||(F("boolean"==typeof n,"missing or invalid endian"),F(null!=t,"missing offset"),F(t+1<e.length,"Trying to read beyond buffer length")),!(e.length<=t)){var o=h(e,t,n,!0);return 32768&o?-1*(65535-o+1):o}}function y(e,t,n,r){if(r||(F("boolean"==typeof n,"missing or invalid endian"),F(null!=t,"missing offset"),F(t+3<e.length,"Trying to read beyond buffer length")),!(e.length<=t)){var o=p(e,t,n,!0);return 2147483648&o?-1*(4294967295-o+1):o}}function w(e,t,n,r){return r||(F("boolean"==typeof n,"missing or invalid endian"),F(t+3<e.length,"Trying to read beyond buffer length")),c.read(e,t,n,23,4)}function b(e,t,n,r){return r||(F("boolean"==typeof n,"missing or invalid endian"),F(t+7<e.length,"Trying to read beyond buffer length")),c.read(e,t,n,52,8)}function m(e,t,n,r,o){o||(F(null!=t,"missing value"),F("boolean"==typeof r,"missing or invalid endian"),F(null!=n,"missing offset"),F(n+1<e.length,"trying to write beyond buffer length"),M(t,65535));var i=e.length;if(!(i<=n))for(var u=0,a=Math.min(i-n,2);u<a;u++)e[n+u]=(t&255<<8*(r?u:1-u))>>>8*(r?u:1-u)}function v(e,t,n,r,o){o||(F(null!=t,"missing value"),F("boolean"==typeof r,"missing or invalid endian"),F(null!=n,"missing offset"),F(n+3<e.length,"trying to write beyond buffer length"),M(t,4294967295));var i=e.length;if(!(i<=n))for(var u=0,a=Math.min(i-n,4);u<a;u++)e[n+u]=t>>>8*(r?u:3-u)&255}function _(e,t,n,r,o){o||(F(null!=t,"missing value"),F("boolean"==typeof r,"missing or invalid endian"),F(null!=n,"missing offset"),F(n+1<e.length,"Trying to write beyond buffer length"),N(t,32767,-32768)),e.length<=n||m(e,0<=t?t:65535+t+1,n,r,o)}function E(e,t,n,r,o){o||(F(null!=t,"missing value"),F("boolean"==typeof r,"missing or invalid endian"),F(null!=n,"missing offset"),F(n+3<e.length,"Trying to write beyond buffer length"),N(t,2147483647,-2147483648)),e.length<=n||v(e,0<=t?t:4294967295+t+1,n,r,o)}function I(e,t,n,r,o){o||(F(null!=t,"missing value"),F("boolean"==typeof r,"missing or invalid endian"),F(null!=n,"missing offset"),F(n+3<e.length,"Trying to write beyond buffer length"),Y(t,34028234663852886e22,-34028234663852886e22)),e.length<=n||c.write(e,t,n,r,23,4)}function A(e,t,n,r,o){o||(F(null!=t,"missing value"),F("boolean"==typeof r,"missing or invalid endian"),F(null!=n,"missing offset"),F(n+7<e.length,"Trying to write beyond buffer length"),Y(t,17976931348623157e292,-17976931348623157e292)),e.length<=n||c.write(e,t,n,r,52,8)}O.Buffer=f,O.SlowBuffer=f,O.INSPECT_MAX_BYTES=50,f.poolSize=8192,f._useTypedArrays=function(){try{var e=new ArrayBuffer(0),t=new Uint8Array(e);return t.foo=function(){return 42},42===t.foo()&&"function"==typeof t.subarray}catch(e){return!1}}(),f.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"raw":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},f.isBuffer=function(e){return!(null==e||!e._isBuffer)},f.byteLength=function(e,t){var n;switch(e+="",t||"utf8"){case"hex":n=e.length/2;break;case"utf8":case"utf-8":n=j(e).length;break;case"ascii":case"binary":case"raw":n=e.length;break;case"base64":n=C(e).length;break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":n=2*e.length;break;default:throw new Error("Unknown encoding")}return n},f.concat=function(e,t){if(F(x(e),"Usage: Buffer.concat(list, [totalLength])\nlist should be an Array."),0===e.length)return new f(0);if(1===e.length)return e[0];var n;if("number"!=typeof t)for(n=t=0;n<e.length;n++)t+=e[n].length;var r=new f(t),o=0;for(n=0;n<e.length;n++){var i=e[n];i.copy(r,o),o+=i.length}return r},f.prototype.write=function(e,t,n,r){if(isFinite(t))isFinite(n)||(r=n,n=void 0);else{var o=r;r=t,t=n,n=o}t=Number(t)||0;var i,u=this.length-t;switch(n?u<(n=Number(n))&&(n=u):n=u,r=String(r||"utf8").toLowerCase()){case"hex":i=function(e,t,n,r){n=Number(n)||0;var o=e.length-n;r?o<(r=Number(r))&&(r=o):r=o;var i=t.length;F(i%2==0,"Invalid hex string"),i/2<r&&(r=i/2);for(var u=0;u<r;u++){var a=parseInt(t.substr(2*u,2),16);F(!isNaN(a),"Invalid hex string"),e[n+u]=a}return f._charsWritten=2*u,u}(this,e,t,n);break;case"utf8":case"utf-8":i=function(e,t,n,r){return f._charsWritten=k(j(t),e,n,r)}(this,e,t,n);break;case"ascii":i=l(this,e,t,n);break;case"binary":i=function(e,t,n,r){return l(e,t,n,r)}(this,e,t,n);break;case"base64":i=function(e,t,n,r){return f._charsWritten=k(C(t),e,n,r)}(this,e,t,n);break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":i=function(e,t,n,r){return f._charsWritten=k(function(e){for(var t,n,r,o=[],i=0;i<e.length;i++)t=e.charCodeAt(i),n=t>>8,r=t%256,o.push(r),o.push(n);return o}(t),e,n,r)}(this,e,t,n);break;default:throw new Error("Unknown encoding")}return i},f.prototype.toString=function(e,t,n){var r,o=this;if(e=String(e||"utf8").toLowerCase(),t=Number(t)||0,(n=void 0!==n?Number(n):n=o.length)===t)return"";switch(e){case"hex":r=function(e,t,n){var r=e.length;(!t||t<0)&&(t=0);(!n||n<0||r<n)&&(n=r);for(var o="",i=t;i<n;i++)o+=S(e[i]);return o}(o,t,n);break;case"utf8":case"utf-8":r=function(e,t,n){var r="",o="";n=Math.min(e.length,n);for(var i=t;i<n;i++)e[i]<=127?(r+=T(o)+String.fromCharCode(e[i]),o=""):o+="%"+e[i].toString(16);return r+T(o)}(o,t,n);break;case"ascii":r=d(o,t,n);break;case"binary":r=function(e,t,n){return d(e,t,n)}(o,t,n);break;case"base64":r=function(e,t,n){return 0===t&&n===e.length?s.fromByteArray(e):s.fromByteArray(e.slice(t,n))}(o,t,n);break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":r=function(e,t,n){for(var r=e.slice(t,n),o="",i=0;i<r.length;i+=2)o+=String.fromCharCode(r[i]+256*r[i+1]);return o}(o,t,n);break;default:throw new Error("Unknown encoding")}return r},f.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}},f.prototype.copy=function(e,t,n,r){if(n=n||0,r||0===r||(r=this.length),t=t||0,r!==n&&0!==e.length&&0!==this.length){F(n<=r,"sourceEnd < sourceStart"),F(0<=t&&t<e.length,"targetStart out of bounds"),F(0<=n&&n<this.length,"sourceStart out of bounds"),F(0<=r&&r<=this.length,"sourceEnd out of bounds"),r>this.length&&(r=this.length),e.length-t<r-n&&(r=e.length-t+n);var o=r-n;if(o<100||!f._useTypedArrays)for(var i=0;i<o;i++)e[i+t]=this[i+n];else e._set(this.subarray(n,n+o),t)}},f.prototype.slice=function(e,t){var n=this.length;if(e=L(e,n,0),t=L(t,n,n),f._useTypedArrays)return f._augment(this.subarray(e,t));for(var r=t-e,o=new f(r,void 0,!0),i=0;i<r;i++)o[i]=this[i+e];return o},f.prototype.get=function(e){return console.log(".get() is deprecated. Access using array indexes instead."),this.readUInt8(e)},f.prototype.set=function(e,t){return console.log(".set() is deprecated. Access using array indexes instead."),this.writeUInt8(e,t)},f.prototype.readUInt8=function(e,t){if(t||(F(null!=e,"missing offset"),F(e<this.length,"Trying to read beyond buffer length")),!(e>=this.length))return this[e]},f.prototype.readUInt16LE=function(e,t){return h(this,e,!0,t)},f.prototype.readUInt16BE=function(e,t){return h(this,e,!1,t)},f.prototype.readUInt32LE=function(e,t){return p(this,e,!0,t)},f.prototype.readUInt32BE=function(e,t){return p(this,e,!1,t)},f.prototype.readInt8=function(e,t){if(t||(F(null!=e,"missing offset"),F(e<this.length,"Trying to read beyond buffer length")),!(e>=this.length))return 128&this[e]?-1*(255-this[e]+1):this[e]},f.prototype.readInt16LE=function(e,t){return g(this,e,!0,t)},f.prototype.readInt16BE=function(e,t){return g(this,e,!1,t)},f.prototype.readInt32LE=function(e,t){return y(this,e,!0,t)},f.prototype.readInt32BE=function(e,t){return y(this,e,!1,t)},f.prototype.readFloatLE=function(e,t){return w(this,e,!0,t)},f.prototype.readFloatBE=function(e,t){return w(this,e,!1,t)},f.prototype.readDoubleLE=function(e,t){return b(this,e,!0,t)},f.prototype.readDoubleBE=function(e,t){return b(this,e,!1,t)},f.prototype.writeUInt8=function(e,t,n){n||(F(null!=e,"missing value"),F(null!=t,"missing offset"),F(t<this.length,"trying to write beyond buffer length"),M(e,255)),t>=this.length||(this[t]=e)},f.prototype.writeUInt16LE=function(e,t,n){m(this,e,t,!0,n)},f.prototype.writeUInt16BE=function(e,t,n){m(this,e,t,!1,n)},f.prototype.writeUInt32LE=function(e,t,n){v(this,e,t,!0,n)},f.prototype.writeUInt32BE=function(e,t,n){v(this,e,t,!1,n)},f.prototype.writeInt8=function(e,t,n){n||(F(null!=e,"missing value"),F(null!=t,"missing offset"),F(t<this.length,"Trying to write beyond buffer length"),N(e,127,-128)),t>=this.length||(0<=e?this.writeUInt8(e,t,n):this.writeUInt8(255+e+1,t,n))},f.prototype.writeInt16LE=function(e,t,n){_(this,e,t,!0,n)},f.prototype.writeInt16BE=function(e,t,n){_(this,e,t,!1,n)},f.prototype.writeInt32LE=function(e,t,n){E(this,e,t,!0,n)},f.prototype.writeInt32BE=function(e,t,n){E(this,e,t,!1,n)},f.prototype.writeFloatLE=function(e,t,n){I(this,e,t,!0,n)},f.prototype.writeFloatBE=function(e,t,n){I(this,e,t,!1,n)},f.prototype.writeDoubleLE=function(e,t,n){A(this,e,t,!0,n)},f.prototype.writeDoubleBE=function(e,t,n){A(this,e,t,!1,n)},f.prototype.fill=function(e,t,n){if(e=e||0,t=t||0,n=n||this.length,"string"==typeof e&&(e=e.charCodeAt(0)),F("number"==typeof e&&!isNaN(e),"value is not a number"),F(t<=n,"end < start"),n!==t&&0!==this.length){F(0<=t&&t<this.length,"start out of bounds"),F(0<=n&&n<=this.length,"end out of bounds");for(var r=t;r<n;r++)this[r]=e}},f.prototype.inspect=function(){for(var e=[],t=this.length,n=0;n<t;n++)if(e[n]=S(this[n]),n===O.INSPECT_MAX_BYTES){e[n+1]="...";break}return"<Buffer "+e.join(" ")+">"},f.prototype.toArrayBuffer=function(){if("undefined"==typeof Uint8Array)throw new Error("Buffer.toArrayBuffer not supported in this browser");if(f._useTypedArrays)return new f(this).buffer;for(var e=new Uint8Array(this.length),t=0,n=e.length;t<n;t+=1)e[t]=this[t];return e.buffer};var B=f.prototype;function L(e,t,n){return"number"!=typeof e?n:t<=(e=~~e)?t:0<=e?e:0<=(e+=t)?e:0}function U(e){return(e=~~Math.ceil(+e))<0?0:e}function x(e){return(Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)})(e)}function S(e){return e<16?"0"+e.toString(16):e.toString(16)}function j(e){for(var t=[],n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<=127)t.push(e.charCodeAt(n));else{var o=n;55296<=r&&r<=57343&&n++;for(var i=encodeURIComponent(e.slice(o,n+1)).substr(1).split("%"),u=0;u<i.length;u++)t.push(parseInt(i[u],16))}}return t}function C(e){return s.toByteArray(e)}function k(e,t,n,r){for(var o=0;o<r&&!(o+n>=t.length||o>=e.length);o++)t[o+n]=e[o];return o}function T(e){try{return decodeURIComponent(e)}catch(e){return String.fromCharCode(65533)}}function M(e,t){F("number"==typeof e,"cannot write a non-number as a number"),F(0<=e,"specified a negative value for writing an unsigned value"),F(e<=t,"value is larger than maximum value for type"),F(Math.floor(e)===e,"value has a fractional component")}function N(e,t,n){F("number"==typeof e,"cannot write a non-number as a number"),F(e<=t,"value larger than maximum allowed value"),F(n<=e,"value smaller than minimum allowed value"),F(Math.floor(e)===e,"value has a fractional component")}function Y(e,t,n){F("number"==typeof e,"cannot write a non-number as a number"),F(e<=t,"value larger than maximum allowed value"),F(n<=e,"value smaller than minimum allowed value")}function F(e,t){if(!e)throw new Error(t||"Failed assertion")}f._augment=function(e){return e._isBuffer=!0,e._get=e.get,e._set=e.set,e.get=B.get,e.set=B.set,e.write=B.write,e.toString=B.toString,e.toLocaleString=B.toString,e.toJSON=B.toJSON,e.copy=B.copy,e.slice=B.slice,e.readUInt8=B.readUInt8,e.readUInt16LE=B.readUInt16LE,e.readUInt16BE=B.readUInt16BE,e.readUInt32LE=B.readUInt32LE,e.readUInt32BE=B.readUInt32BE,e.readInt8=B.readInt8,e.readInt16LE=B.readInt16LE,e.readInt16BE=B.readInt16BE,e.readInt32LE=B.readInt32LE,e.readInt32BE=B.readInt32BE,e.readFloatLE=B.readFloatLE,e.readFloatBE=B.readFloatBE,e.readDoubleLE=B.readDoubleLE,e.readDoubleBE=B.readDoubleBE,e.writeUInt8=B.writeUInt8,e.writeUInt16LE=B.writeUInt16LE,e.writeUInt16BE=B.writeUInt16BE,e.writeUInt32LE=B.writeUInt32LE,e.writeUInt32BE=B.writeUInt32BE,e.writeInt8=B.writeInt8,e.writeInt16LE=B.writeInt16LE,e.writeInt16BE=B.writeInt16BE,e.writeInt32LE=B.writeInt32LE,e.writeInt32BE=B.writeInt32BE,e.writeFloatLE=B.writeFloatLE,e.writeFloatBE=B.writeFloatBE,e.writeDoubleLE=B.writeDoubleLE,e.writeDoubleBE=B.writeDoubleBE,e.fill=B.fill,e.inspect=B.inspect,e.toArrayBuffer=B.toArrayBuffer,e}}).call(this,D("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},D("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/buffer/index.js","/node_modules/gulp-browserify/node_modules/buffer")},{"base64-js":2,buffer:3,ieee754:11,lYpoI2:10}],4:[function(l,d,e){(function(e,t,u,n,r,o,i,a,f){u=l("buffer").Buffer;var s=4,c=new u(s);c.fill(0);d.exports={hash:function(e,t,n,r){return u.isBuffer(e)||(e=new u(e)),function(e,t,n){for(var r=new u(t),o=n?r.writeInt32BE:r.writeInt32LE,i=0;i<e.length;i++)o.call(r,e[i],4*i,!0);return r}(t(function(e,t){if(e.length%s!=0){var n=e.length+(s-e.length%s);e=u.concat([e,c],n)}for(var r=[],o=t?e.readInt32BE:e.readInt32LE,i=0;i<e.length;i+=s)r.push(o.call(e,i));return r}(e,r),8*e.length),n,r)}}}).call(this,l("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},l("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/helpers.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{buffer:3,lYpoI2:10}],5:[function(w,e,b){(function(e,t,a,n,r,o,i,u,f){a=w("buffer").Buffer;var s=w("./sha"),c=w("./sha256"),l=w("./rng"),d={sha1:s,sha256:c,md5:w("./md5")},h=64,p=new a(h);function g(e,r){var o=d[e=e||"sha1"],i=[];return o||y("algorithm:",e,"is not yet supported"),{update:function(e){return a.isBuffer(e)||(e=new a(e)),i.push(e),e.length,this},digest:function(e){var t=a.concat(i),n=r?function(e,t,n){a.isBuffer(t)||(t=new a(t)),a.isBuffer(n)||(n=new a(n)),t.length>h?t=e(t):t.length<h&&(t=a.concat([t,p],h));for(var r=new a(h),o=new a(h),i=0;i<h;i++)r[i]=54^t[i],o[i]=92^t[i];var u=e(a.concat([r,n]));return e(a.concat([o,u]))}(o,r,t):o(t);return i=null,e?n.toString(e):n}}}function y(){var e=[].slice.call(arguments).join(" ");throw new Error([e,"we accept pull requests","http://github.com/dominictarr/crypto-browserify"].join("\n"))}p.fill(0),b.createHash=function(e){return g(e)},b.createHmac=function(e,t){return g(e,t)},b.randomBytes=function(e,t){if(!t||!t.call)return new a(l(e));try{t.call(this,void 0,new a(l(e)))}catch(e){t(e)}},function(e,t){for(var n in e)t(e[n],n)}(["createCredentials","createCipher","createCipheriv","createDecipher","createDecipheriv","createSign","createVerify","createDiffieHellman","pbkdf2"],function(e){b[e]=function(){y("sorry,",e,"is not implemented yet")}})}).call(this,w("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},w("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/index.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{"./md5":6,"./rng":7,"./sha":8,"./sha256":9,buffer:3,lYpoI2:10}],6:[function(w,b,e){(function(e,t,n,r,o,i,u,a,f){var s=w("./helpers");function c(e,t){e[t>>5]|=128<<t%32,e[14+(t+64>>>9<<4)]=t;for(var n=1732584193,r=-271733879,o=-1732584194,i=271733878,u=0;u<e.length;u+=16){var a=n,f=r,s=o,c=i;r=g(r=g(r=g(r=g(r=p(r=p(r=p(r=p(r=h(r=h(r=h(r=h(r=d(r=d(r=d(r=d(r,o=d(o,i=d(i,n=d(n,r,o,i,e[u+0],7,-680876936),r,o,e[u+1],12,-389564586),n,r,e[u+2],17,606105819),i,n,e[u+3],22,-1044525330),o=d(o,i=d(i,n=d(n,r,o,i,e[u+4],7,-176418897),r,o,e[u+5],12,1200080426),n,r,e[u+6],17,-1473231341),i,n,e[u+7],22,-45705983),o=d(o,i=d(i,n=d(n,r,o,i,e[u+8],7,1770035416),r,o,e[u+9],12,-1958414417),n,r,e[u+10],17,-42063),i,n,e[u+11],22,-1990404162),o=d(o,i=d(i,n=d(n,r,o,i,e[u+12],7,1804603682),r,o,e[u+13],12,-40341101),n,r,e[u+14],17,-1502002290),i,n,e[u+15],22,1236535329),o=h(o,i=h(i,n=h(n,r,o,i,e[u+1],5,-165796510),r,o,e[u+6],9,-1069501632),n,r,e[u+11],14,643717713),i,n,e[u+0],20,-373897302),o=h(o,i=h(i,n=h(n,r,o,i,e[u+5],5,-701558691),r,o,e[u+10],9,38016083),n,r,e[u+15],14,-660478335),i,n,e[u+4],20,-405537848),o=h(o,i=h(i,n=h(n,r,o,i,e[u+9],5,568446438),r,o,e[u+14],9,-1019803690),n,r,e[u+3],14,-187363961),i,n,e[u+8],20,1163531501),o=h(o,i=h(i,n=h(n,r,o,i,e[u+13],5,-1444681467),r,o,e[u+2],9,-51403784),n,r,e[u+7],14,1735328473),i,n,e[u+12],20,-1926607734),o=p(o,i=p(i,n=p(n,r,o,i,e[u+5],4,-378558),r,o,e[u+8],11,-2022574463),n,r,e[u+11],16,1839030562),i,n,e[u+14],23,-35309556),o=p(o,i=p(i,n=p(n,r,o,i,e[u+1],4,-1530992060),r,o,e[u+4],11,1272893353),n,r,e[u+7],16,-155497632),i,n,e[u+10],23,-1094730640),o=p(o,i=p(i,n=p(n,r,o,i,e[u+13],4,681279174),r,o,e[u+0],11,-358537222),n,r,e[u+3],16,-722521979),i,n,e[u+6],23,76029189),o=p(o,i=p(i,n=p(n,r,o,i,e[u+9],4,-640364487),r,o,e[u+12],11,-421815835),n,r,e[u+15],16,530742520),i,n,e[u+2],23,-995338651),o=g(o,i=g(i,n=g(n,r,o,i,e[u+0],6,-198630844),r,o,e[u+7],10,1126891415),n,r,e[u+14],15,-1416354905),i,n,e[u+5],21,-57434055),o=g(o,i=g(i,n=g(n,r,o,i,e[u+12],6,1700485571),r,o,e[u+3],10,-1894986606),n,r,e[u+10],15,-1051523),i,n,e[u+1],21,-2054922799),o=g(o,i=g(i,n=g(n,r,o,i,e[u+8],6,1873313359),r,o,e[u+15],10,-30611744),n,r,e[u+6],15,-1560198380),i,n,e[u+13],21,1309151649),o=g(o,i=g(i,n=g(n,r,o,i,e[u+4],6,-145523070),r,o,e[u+11],10,-1120210379),n,r,e[u+2],15,718787259),i,n,e[u+9],21,-343485551),n=y(n,a),r=y(r,f),o=y(o,s),i=y(i,c)}return Array(n,r,o,i)}function l(e,t,n,r,o,i){return y(function(e,t){return e<<t|e>>>32-t}(y(y(t,e),y(r,i)),o),n)}function d(e,t,n,r,o,i,u){return l(t&n|~t&r,e,t,o,i,u)}function h(e,t,n,r,o,i,u){return l(t&r|n&~r,e,t,o,i,u)}function p(e,t,n,r,o,i,u){return l(t^n^r,e,t,o,i,u)}function g(e,t,n,r,o,i,u){return l(n^(t|~r),e,t,o,i,u)}function y(e,t){var n=(65535&e)+(65535&t);return(e>>16)+(t>>16)+(n>>16)<<16|65535&n}b.exports=function(e){return s.hash(e,c,16)}}).call(this,w("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},w("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/md5.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{"./helpers":4,buffer:3,lYpoI2:10}],7:[function(e,s,t){(function(e,t,n,r,o,i,u,a,f){!function(){var e,t;e=function(e){for(var t,n=new Array(e),r=0;r<e;r++)0==(3&r)&&(t=4294967296*Math.random()),n[r]=t>>>((3&r)<<3)&255;return n},this.crypto&&crypto.getRandomValues&&(t=function(e){var t=new Uint8Array(e);return crypto.getRandomValues(t),t}),s.exports=t||e}()}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/rng.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{buffer:3,lYpoI2:10}],8:[function(l,d,e){(function(e,t,n,r,o,i,u,a,f){var s=l("./helpers");function c(e,t){e[t>>5]|=128<<24-t%32,e[15+(t+64>>9<<4)]=t;for(var n,r=Array(80),o=1732584193,i=-271733879,u=-1732584194,a=271733878,f=-1009589776,s=0;s<e.length;s+=16){for(var c=o,l=i,d=u,h=a,p=f,g=0;g<80;g++){r[g]=g<16?e[s+g]:m(r[g-3]^r[g-8]^r[g-14]^r[g-16],1);var y=b(b(m(o,5),w(g,i,u,a)),b(b(f,r[g]),(n=g)<20?1518500249:n<40?1859775393:n<60?-1894007588:-899497514));f=a,a=u,u=m(i,30),i=o,o=y}o=b(o,c),i=b(i,l),u=b(u,d),a=b(a,h),f=b(f,p)}return Array(o,i,u,a,f)}function w(e,t,n,r){return e<20?t&n|~t&r:e<40?t^n^r:e<60?t&n|t&r|n&r:t^n^r}function b(e,t){var n=(65535&e)+(65535&t);return(e>>16)+(t>>16)+(n>>16)<<16|65535&n}function m(e,t){return e<<t|e>>>32-t}d.exports=function(e){return s.hash(e,c,20,!0)}}).call(this,l("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},l("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/sha.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{"./helpers":4,buffer:3,lYpoI2:10}],9:[function(l,d,e){(function(e,t,n,r,o,i,u,a,f){function B(e,t){var n=(65535&e)+(65535&t);return(e>>16)+(t>>16)+(n>>16)<<16|65535&n}function L(e,t){return e>>>t|e<<32-t}function U(e,t){return e>>>t}function s(e,t){var n,r,o,i,u,a,f,s,c,l,d,h,p,g,y,w,b,m,v=new Array(1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298),_=new Array(1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225),E=new Array(64);e[t>>5]|=128<<24-t%32,e[15+(t+64>>9<<4)]=t;for(var I=0;I<e.length;I+=16){n=_[0],r=_[1],o=_[2],i=_[3],u=_[4],a=_[5],f=_[6],s=_[7];for(var A=0;A<64;A++)E[A]=A<16?e[A+I]:B(B(B((m=E[A-2],L(m,17)^L(m,19)^U(m,10)),E[A-7]),(b=E[A-15],L(b,7)^L(b,18)^U(b,3))),E[A-16]),c=B(B(B(B(s,L(w=u,6)^L(w,11)^L(w,25)),(y=u)&a^~y&f),v[A]),E[A]),l=B(L(g=n,2)^L(g,13)^L(g,22),(d=n)&(h=r)^d&(p=o)^h&p),s=f,f=a,a=u,u=B(i,c),i=o,o=r,r=n,n=B(c,l);_[0]=B(n,_[0]),_[1]=B(r,_[1]),_[2]=B(o,_[2]),_[3]=B(i,_[3]),_[4]=B(u,_[4]),_[5]=B(a,_[5]),_[6]=B(f,_[6]),_[7]=B(s,_[7])}return _}var c=l("./helpers");d.exports=function(e){return c.hash(e,s,32,!0)}}).call(this,l("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},l("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/sha256.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{"./helpers":4,buffer:3,lYpoI2:10}],10:[function(e,c,t){(function(e,t,n,r,o,i,u,a,f){function s(){}(e=c.exports={}).nextTick=function(){var e="undefined"!=typeof window&&window.setImmediate,t="undefined"!=typeof window&&window.postMessage&&window.addEventListener;if(e)return function(e){return window.setImmediate(e)};if(t){var n=[];return window.addEventListener("message",function(e){var t=e.source;t!==window&&null!==t||"process-tick"!==e.data||(e.stopPropagation(),0<n.length&&n.shift()())},!0),function(e){n.push(e),window.postMessage("process-tick","*")}}return function(e){setTimeout(e,0)}}(),e.title="browser",e.browser=!0,e.env={},e.argv=[],e.on=s,e.addListener=s,e.once=s,e.off=s,e.removeListener=s,e.removeAllListeners=s,e.emit=s,e.binding=function(e){throw new Error("process.binding is not supported")},e.cwd=function(){return"/"},e.chdir=function(e){throw new Error("process.chdir is not supported")}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/process/browser.js","/node_modules/gulp-browserify/node_modules/process")},{buffer:3,lYpoI2:10}],11:[function(e,t,s){(function(e,t,n,r,o,i,u,a,f){s.read=function(e,t,n,r,o){var i,u,a=8*o-r-1,f=(1<<a)-1,s=f>>1,c=-7,l=n?o-1:0,d=n?-1:1,h=e[t+l];for(l+=d,i=h&(1<<-c)-1,h>>=-c,c+=a;0<c;i=256*i+e[t+l],l+=d,c-=8);for(u=i&(1<<-c)-1,i>>=-c,c+=r;0<c;u=256*u+e[t+l],l+=d,c-=8);if(0===i)i=1-s;else{if(i===f)return u?NaN:1/0*(h?-1:1);u+=Math.pow(2,r),i-=s}return(h?-1:1)*u*Math.pow(2,i-r)},s.write=function(e,t,n,r,o,i){var u,a,f,s=8*i-o-1,c=(1<<s)-1,l=c>>1,d=23===o?Math.pow(2,-24)-Math.pow(2,-77):0,h=r?0:i-1,p=r?1:-1,g=t<0||0===t&&1/t<0?1:0;for(t=Math.abs(t),isNaN(t)||t===1/0?(a=isNaN(t)?1:0,u=c):(u=Math.floor(Math.log(t)/Math.LN2),t*(f=Math.pow(2,-u))<1&&(u--,f*=2),2<=(t+=1<=u+l?d/f:d*Math.pow(2,1-l))*f&&(u++,f/=2),c<=u+l?(a=0,u=c):1<=u+l?(a=(t*f-1)*Math.pow(2,o),u+=l):(a=t*Math.pow(2,l-1)*Math.pow(2,o),u=0));8<=o;e[n+h]=255&a,h+=p,a/=256,o-=8);for(u=u<<o|a,s+=o;0<s;e[n+h]=255&u,h+=p,u/=256,s-=8);e[n+h-p]|=128*g}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/ieee754/index.js","/node_modules/ieee754")},{buffer:3,lYpoI2:10}]},{},[1])(1)});

/***/ }),

/***/ "./node_modules/process-nextick-args/index.js":
/*!****************************************************!*\
  !*** ./node_modules/process-nextick-args/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

if (typeof process === 'undefined' ||
    !process.version ||
    process.version.indexOf('v0.') === 0 ||
    process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
  module.exports = { nextTick: nextTick };
} else {
  module.exports = process
}

function nextTick(fn, arg1, arg2, arg3) {
  if (typeof fn !== 'function') {
    throw new TypeError('"callback" argument must be a function');
  }
  var len = arguments.length;
  var args, i;
  switch (len) {
  case 0:
  case 1:
    return process.nextTick(fn);
  case 2:
    return process.nextTick(function afterTickOne() {
      fn.call(null, arg1);
    });
  case 3:
    return process.nextTick(function afterTickTwo() {
      fn.call(null, arg1, arg2);
    });
  case 4:
    return process.nextTick(function afterTickThree() {
      fn.call(null, arg1, arg2, arg3);
    });
  default:
    args = new Array(len - 1);
    i = 0;
    while (i < args.length) {
      args[i++] = arguments[i];
    }
    return process.nextTick(function afterTick() {
      fn.apply(null, args);
    });
  }
}


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/readable-stream/duplex-browser.js":
/*!********************************************************!*\
  !*** ./node_modules/readable-stream/duplex-browser.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/_stream_duplex.js */ "./node_modules/readable-stream/lib/_stream_duplex.js");


/***/ }),

/***/ "./node_modules/readable-stream/lib/_stream_duplex.js":
/*!************************************************************!*\
  !*** ./node_modules/readable-stream/lib/_stream_duplex.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.



/*<replacement>*/

var pna = __webpack_require__(/*! process-nextick-args */ "./node_modules/process-nextick-args/index.js");
/*</replacement>*/

/*<replacement>*/
var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }return keys;
};
/*</replacement>*/

module.exports = Duplex;

/*<replacement>*/
var util = __webpack_require__(/*! core-util-is */ "./node_modules/core-util-is/lib/util.js");
util.inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js");
/*</replacement>*/

var Readable = __webpack_require__(/*! ./_stream_readable */ "./node_modules/readable-stream/lib/_stream_readable.js");
var Writable = __webpack_require__(/*! ./_stream_writable */ "./node_modules/readable-stream/lib/_stream_writable.js");

util.inherits(Duplex, Readable);

{
  // avoid scope creep, the keys array can then be collected
  var keys = objectKeys(Writable.prototype);
  for (var v = 0; v < keys.length; v++) {
    var method = keys[v];
    if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
  }
}

function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);

  Readable.call(this, options);
  Writable.call(this, options);

  if (options && options.readable === false) this.readable = false;

  if (options && options.writable === false) this.writable = false;

  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

  this.once('end', onend);
}

Object.defineProperty(Duplex.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function () {
    return this._writableState.highWaterMark;
  }
});

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended) return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  pna.nextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

Object.defineProperty(Duplex.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined || this._writableState === undefined) {
      return false;
    }
    return this._readableState.destroyed && this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (this._readableState === undefined || this._writableState === undefined) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
    this._writableState.destroyed = value;
  }
});

Duplex.prototype._destroy = function (err, cb) {
  this.push(null);
  this.end();

  pna.nextTick(cb, err);
};

/***/ }),

/***/ "./node_modules/readable-stream/lib/_stream_passthrough.js":
/*!*****************************************************************!*\
  !*** ./node_modules/readable-stream/lib/_stream_passthrough.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.



module.exports = PassThrough;

var Transform = __webpack_require__(/*! ./_stream_transform */ "./node_modules/readable-stream/lib/_stream_transform.js");

/*<replacement>*/
var util = __webpack_require__(/*! core-util-is */ "./node_modules/core-util-is/lib/util.js");
util.inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js");
/*</replacement>*/

util.inherits(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);

  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};

/***/ }),

/***/ "./node_modules/readable-stream/lib/_stream_readable.js":
/*!**************************************************************!*\
  !*** ./node_modules/readable-stream/lib/_stream_readable.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



/*<replacement>*/

var pna = __webpack_require__(/*! process-nextick-args */ "./node_modules/process-nextick-args/index.js");
/*</replacement>*/

module.exports = Readable;

/*<replacement>*/
var isArray = __webpack_require__(/*! isarray */ "./node_modules/isarray/index.js");
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;

/*<replacement>*/
var EE = __webpack_require__(/*! events */ "./node_modules/events/events.js").EventEmitter;

var EElistenerCount = function (emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/
var Stream = __webpack_require__(/*! ./internal/streams/stream */ "./node_modules/readable-stream/lib/internal/streams/stream-browser.js");
/*</replacement>*/

/*<replacement>*/

var Buffer = __webpack_require__(/*! safe-buffer */ "./node_modules/readable-stream/node_modules/safe-buffer/index.js").Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}

/*</replacement>*/

/*<replacement>*/
var util = __webpack_require__(/*! core-util-is */ "./node_modules/core-util-is/lib/util.js");
util.inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js");
/*</replacement>*/

/*<replacement>*/
var debugUtil = __webpack_require__(/*! util */ 1);
var debug = void 0;
if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function () {};
}
/*</replacement>*/

var BufferList = __webpack_require__(/*! ./internal/streams/BufferList */ "./node_modules/readable-stream/lib/internal/streams/BufferList.js");
var destroyImpl = __webpack_require__(/*! ./internal/streams/destroy */ "./node_modules/readable-stream/lib/internal/streams/destroy.js");
var StringDecoder;

util.inherits(Readable, Stream);

var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') return emitter.prependListener(event, fn);

  // This is a hack to make sure that our error handler is attached before any
  // userland ones.  NEVER DO THIS. This is here only because this code needs
  // to continue to work with older versions of Node.js that do not include
  // the prependListener() method. The goal is to eventually remove this hack.
  if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
}

function ReadableState(options, stream) {
  Duplex = Duplex || __webpack_require__(/*! ./_stream_duplex */ "./node_modules/readable-stream/lib/_stream_duplex.js");

  options = options || {};

  // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.
  var isDuplex = stream instanceof Duplex;

  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;

  if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  var hwm = options.highWaterMark;
  var readableHwm = options.readableHighWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;

  if (hwm || hwm === 0) this.highWaterMark = hwm;else if (isDuplex && (readableHwm || readableHwm === 0)) this.highWaterMark = readableHwm;else this.highWaterMark = defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()
  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;

  // a flag to be able to tell if the event 'readable'/'data' is emitted
  // immediately, or on a later tick.  We set this to true at first, because
  // any actions that shouldn't happen until "later" should generally also
  // not happen before the first read call.
  this.sync = true;

  // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;

  // has it been destroyed
  this.destroyed = false;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // the number of writers that are awaiting a drain event in .pipe()s
  this.awaitDrain = 0;

  // if true, a maybeReadMore has been scheduled
  this.readingMore = false;

  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    if (!StringDecoder) StringDecoder = __webpack_require__(/*! string_decoder/ */ "./node_modules/string_decoder/lib/string_decoder.js").StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  Duplex = Duplex || __webpack_require__(/*! ./_stream_duplex */ "./node_modules/readable-stream/lib/_stream_duplex.js");

  if (!(this instanceof Readable)) return new Readable(options);

  this._readableState = new ReadableState(options, this);

  // legacy
  this.readable = true;

  if (options) {
    if (typeof options.read === 'function') this._read = options.read;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;
  }

  Stream.call(this);
}

Object.defineProperty(Readable.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined) {
      return false;
    }
    return this._readableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._readableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
  }
});

Readable.prototype.destroy = destroyImpl.destroy;
Readable.prototype._undestroy = destroyImpl.undestroy;
Readable.prototype._destroy = function (err, cb) {
  this.push(null);
  cb(err);
};

// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function (chunk, encoding) {
  var state = this._readableState;
  var skipChunkCheck;

  if (!state.objectMode) {
    if (typeof chunk === 'string') {
      encoding = encoding || state.defaultEncoding;
      if (encoding !== state.encoding) {
        chunk = Buffer.from(chunk, encoding);
        encoding = '';
      }
      skipChunkCheck = true;
    }
  } else {
    skipChunkCheck = true;
  }

  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
};

// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function (chunk) {
  return readableAddChunk(this, chunk, null, true, false);
};

function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
  var state = stream._readableState;
  if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else {
    var er;
    if (!skipChunkCheck) er = chunkInvalid(state, chunk);
    if (er) {
      stream.emit('error', er);
    } else if (state.objectMode || chunk && chunk.length > 0) {
      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
        chunk = _uint8ArrayToBuffer(chunk);
      }

      if (addToFront) {
        if (state.endEmitted) stream.emit('error', new Error('stream.unshift() after end event'));else addChunk(stream, state, chunk, true);
      } else if (state.ended) {
        stream.emit('error', new Error('stream.push() after EOF'));
      } else {
        state.reading = false;
        if (state.decoder && !encoding) {
          chunk = state.decoder.write(chunk);
          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);
        } else {
          addChunk(stream, state, chunk, false);
        }
      }
    } else if (!addToFront) {
      state.reading = false;
    }
  }

  return needMoreData(state);
}

function addChunk(stream, state, chunk, addToFront) {
  if (state.flowing && state.length === 0 && !state.sync) {
    stream.emit('data', chunk);
    stream.read(0);
  } else {
    // update the buffer info.
    state.length += state.objectMode ? 1 : chunk.length;
    if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);

    if (state.needReadable) emitReadable(stream);
  }
  maybeReadMore(stream, state);
}

function chunkInvalid(state, chunk) {
  var er;
  if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  return er;
}

// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state) {
  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
}

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
};

// backwards compatibility.
Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = __webpack_require__(/*! string_decoder/ */ "./node_modules/string_decoder/lib/string_decoder.js").StringDecoder;
  this._readableState.decoder = new StringDecoder(enc);
  this._readableState.encoding = enc;
  return this;
};

// Don't raise the hwm > 8MB
var MAX_HWM = 0x800000;
function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }
  return n;
}

// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;
  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  }
  // If we're asking for more than the current hwm, then raise the hwm.
  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n;
  // Don't have enough
  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }
  return state.length;
}

// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;

  if (n !== 0) state.emittedReadable = false;

  // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state);

  // if we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  }

  // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.

  // if we need a readable event, then we need to do some reading.
  var doRead = state.needReadable;
  debug('need readable', doRead);

  // if we currently have less than the highWaterMark, then also read some
  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  }

  // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.
  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true;
    // if the length is currently zero, then we *need* a readable event.
    if (state.length === 0) state.needReadable = true;
    // call internal read method
    this._read(state.highWaterMark);
    state.sync = false;
    // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.
    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = true;
    n = 0;
  } else {
    state.length -= n;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true;

    // If we tried to read() past the EOF, then emit end on the next tick.
    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);

  return ret;
};

function onEofChunk(stream, state) {
  if (state.ended) return;
  if (state.decoder) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;

  // emit 'readable' now to make sure it gets picked up.
  emitReadable(stream);
}

// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;
  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    if (state.sync) pna.nextTick(emitReadable_, stream);else emitReadable_(stream);
  }
}

function emitReadable_(stream) {
  debug('emit readable');
  stream.emit('readable');
  flow(stream);
}

// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    pna.nextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  var len = state.length;
  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length)
      // didn't get any data, stop spinning.
      break;else len = state.length;
  }
  state.readingMore = false;
}

// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function (n) {
  this.emit('error', new Error('_read() is not implemented'));
};

Readable.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;
    case 1:
      state.pipes = [state.pipes, dest];
      break;
    default:
      state.pipes.push(dest);
      break;
  }
  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;

  var endFn = doEnd ? onend : unpipe;
  if (state.endEmitted) pna.nextTick(endFn);else src.once('end', endFn);

  dest.on('unpipe', onunpipe);
  function onunpipe(readable, unpipeInfo) {
    debug('onunpipe');
    if (readable === src) {
      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
        unpipeInfo.hasUnpiped = true;
        cleanup();
      }
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  }

  // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.
  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);

  var cleanedUp = false;
  function cleanup() {
    debug('cleanup');
    // cleanup event handlers once the pipe is broken
    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', unpipe);
    src.removeListener('data', ondata);

    cleanedUp = true;

    // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.
    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  // If the user pushes more data while we're writing to dest then we'll end up
  // in ondata again. However, we only want to increase awaitDrain once because
  // dest will only emit one 'drain' event for the multiple writes.
  // => Introduce a guard on increasing awaitDrain.
  var increasedAwaitDrain = false;
  src.on('data', ondata);
  function ondata(chunk) {
    debug('ondata');
    increasedAwaitDrain = false;
    var ret = dest.write(chunk);
    if (false === ret && !increasedAwaitDrain) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', src._readableState.awaitDrain);
        src._readableState.awaitDrain++;
        increasedAwaitDrain = true;
      }
      src.pause();
    }
  }

  // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.
  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);
  }

  // Make sure our error handler is attached before userland ones.
  prependListener(dest, 'error', onerror);

  // Both close and finish should trigger unpipe, but only once.
  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }
  dest.once('close', onclose);
  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }
  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  }

  // tell the dest that it's being piped to
  dest.emit('pipe', src);

  // start the flow if it hasn't been started already.
  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function () {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;
    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}

Readable.prototype.unpipe = function (dest) {
  var state = this._readableState;
  var unpipeInfo = { hasUnpiped: false };

  // if we're not piping anywhere, then do nothing.
  if (state.pipesCount === 0) return this;

  // just one destination.  most common case.
  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;

    if (!dest) dest = state.pipes;

    // got a match.
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this, unpipeInfo);
    return this;
  }

  // slow case. multiple pipe destinations.

  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++) {
      dests[i].emit('unpipe', this, unpipeInfo);
    }return this;
  }

  // try to find the right one.
  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;

  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];

  dest.emit('unpipe', this, unpipeInfo);

  return this;
};

// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function (ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);

  if (ev === 'data') {
    // Start flowing on next tick if stream isn't explicitly paused
    if (this._readableState.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    var state = this._readableState;
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.emittedReadable = false;
      if (!state.reading) {
        pna.nextTick(nReadingNextTick, this);
      } else if (state.length) {
        emitReadable(this);
      }
    }
  }

  return res;
};
Readable.prototype.addListener = Readable.prototype.on;

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
}

// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function () {
  var state = this._readableState;
  if (!state.flowing) {
    debug('resume');
    state.flowing = true;
    resume(this, state);
  }
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    pna.nextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  if (!state.reading) {
    debug('resume read 0');
    stream.read(0);
  }

  state.resumeScheduled = false;
  state.awaitDrain = 0;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);
  if (false !== this._readableState.flowing) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);
  while (state.flowing && stream.read() !== null) {}
}

// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function (stream) {
  var _this = this;

  var state = this._readableState;
  var paused = false;

  stream.on('end', function () {
    debug('wrapped end');
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) _this.push(chunk);
    }

    _this.push(null);
  });

  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk);

    // don't skip over falsy values in objectMode
    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = _this.push(chunk);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });

  // proxy all the other methods.
  // important when wrapping filters and duplexes.
  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function (method) {
        return function () {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  }

  // proxy certain important events.
  for (var n = 0; n < kProxyEvents.length; n++) {
    stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
  }

  // when we try to consume some more bytes, simply unpause the
  // underlying stream.
  this._read = function (n) {
    debug('wrapped _read', n);
    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return this;
};

Object.defineProperty(Readable.prototype, 'readableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function () {
    return this._readableState.highWaterMark;
  }
});

// exposed for testing purposes only.
Readable._fromList = fromList;

// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;

  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = fromListPartial(n, state.buffer, state.decoder);
  }

  return ret;
}

// Extracts only enough buffered data to satisfy the amount requested.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromListPartial(n, list, hasStrings) {
  var ret;
  if (n < list.head.data.length) {
    // slice is the same for buffers and strings
    ret = list.head.data.slice(0, n);
    list.head.data = list.head.data.slice(n);
  } else if (n === list.head.data.length) {
    // first chunk is a perfect match
    ret = list.shift();
  } else {
    // result spans more than one buffer
    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
  }
  return ret;
}

// Copies a specified amount of characters from the list of buffered data
// chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBufferString(n, list) {
  var p = list.head;
  var c = 1;
  var ret = p.data;
  n -= ret.length;
  while (p = p.next) {
    var str = p.data;
    var nb = n > str.length ? str.length : n;
    if (nb === str.length) ret += str;else ret += str.slice(0, n);
    n -= nb;
    if (n === 0) {
      if (nb === str.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = str.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

// Copies a specified amount of bytes from the list of buffered data chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBuffer(n, list) {
  var ret = Buffer.allocUnsafe(n);
  var p = list.head;
  var c = 1;
  p.data.copy(ret);
  n -= p.data.length;
  while (p = p.next) {
    var buf = p.data;
    var nb = n > buf.length ? buf.length : n;
    buf.copy(ret, ret.length - n, 0, nb);
    n -= nb;
    if (n === 0) {
      if (nb === buf.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = buf.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;

  // If we get here before consuming all the bytes, then that is a
  // bug in node.  Should never happen.
  if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

  if (!state.endEmitted) {
    state.ended = true;
    pna.nextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  // Check that we didn't get one last unshift.
  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');
  }
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/readable-stream/lib/_stream_transform.js":
/*!***************************************************************!*\
  !*** ./node_modules/readable-stream/lib/_stream_transform.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.



module.exports = Transform;

var Duplex = __webpack_require__(/*! ./_stream_duplex */ "./node_modules/readable-stream/lib/_stream_duplex.js");

/*<replacement>*/
var util = __webpack_require__(/*! core-util-is */ "./node_modules/core-util-is/lib/util.js");
util.inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js");
/*</replacement>*/

util.inherits(Transform, Duplex);

function afterTransform(er, data) {
  var ts = this._transformState;
  ts.transforming = false;

  var cb = ts.writecb;

  if (!cb) {
    return this.emit('error', new Error('write callback called multiple times'));
  }

  ts.writechunk = null;
  ts.writecb = null;

  if (data != null) // single equals check for both `null` and `undefined`
    this.push(data);

  cb(er);

  var rs = this._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    this._read(rs.highWaterMark);
  }
}

function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);

  Duplex.call(this, options);

  this._transformState = {
    afterTransform: afterTransform.bind(this),
    needTransform: false,
    transforming: false,
    writecb: null,
    writechunk: null,
    writeencoding: null
  };

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;

    if (typeof options.flush === 'function') this._flush = options.flush;
  }

  // When the writable side finishes, then flush out anything remaining.
  this.on('prefinish', prefinish);
}

function prefinish() {
  var _this = this;

  if (typeof this._flush === 'function') {
    this._flush(function (er, data) {
      done(_this, er, data);
    });
  } else {
    done(this, null, null);
  }
}

Transform.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
};

// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform = function (chunk, encoding, cb) {
  throw new Error('_transform() is not implemented');
};

Transform.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

Transform.prototype._destroy = function (err, cb) {
  var _this2 = this;

  Duplex.prototype._destroy.call(this, err, function (err2) {
    cb(err2);
    _this2.emit('close');
  });
};

function done(stream, er, data) {
  if (er) return stream.emit('error', er);

  if (data != null) // single equals check for both `null` and `undefined`
    stream.push(data);

  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  if (stream._writableState.length) throw new Error('Calling transform done when ws.length != 0');

  if (stream._transformState.transforming) throw new Error('Calling transform done when still transforming');

  return stream.push(null);
}

/***/ }),

/***/ "./node_modules/readable-stream/lib/_stream_writable.js":
/*!**************************************************************!*\
  !*** ./node_modules/readable-stream/lib/_stream_writable.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, setImmediate, global) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.



/*<replacement>*/

var pna = __webpack_require__(/*! process-nextick-args */ "./node_modules/process-nextick-args/index.js");
/*</replacement>*/

module.exports = Writable;

/* <replacement> */
function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
}

// It seems a linked list but it is not
// there will be only 2 of these for each stream
function CorkedRequest(state) {
  var _this = this;

  this.next = null;
  this.entry = null;
  this.finish = function () {
    onCorkedFinish(_this, state);
  };
}
/* </replacement> */

/*<replacement>*/
var asyncWrite = !process.browser && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : pna.nextTick;
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Writable.WritableState = WritableState;

/*<replacement>*/
var util = __webpack_require__(/*! core-util-is */ "./node_modules/core-util-is/lib/util.js");
util.inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js");
/*</replacement>*/

/*<replacement>*/
var internalUtil = {
  deprecate: __webpack_require__(/*! util-deprecate */ "./node_modules/util-deprecate/browser.js")
};
/*</replacement>*/

/*<replacement>*/
var Stream = __webpack_require__(/*! ./internal/streams/stream */ "./node_modules/readable-stream/lib/internal/streams/stream-browser.js");
/*</replacement>*/

/*<replacement>*/

var Buffer = __webpack_require__(/*! safe-buffer */ "./node_modules/readable-stream/node_modules/safe-buffer/index.js").Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}

/*</replacement>*/

var destroyImpl = __webpack_require__(/*! ./internal/streams/destroy */ "./node_modules/readable-stream/lib/internal/streams/destroy.js");

util.inherits(Writable, Stream);

function nop() {}

function WritableState(options, stream) {
  Duplex = Duplex || __webpack_require__(/*! ./_stream_duplex */ "./node_modules/readable-stream/lib/_stream_duplex.js");

  options = options || {};

  // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.
  var isDuplex = stream instanceof Duplex;

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;

  if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  var hwm = options.highWaterMark;
  var writableHwm = options.writableHighWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;

  if (hwm || hwm === 0) this.highWaterMark = hwm;else if (isDuplex && (writableHwm || writableHwm === 0)) this.highWaterMark = writableHwm;else this.highWaterMark = defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // if _final has been called
  this.finalCalled = false;

  // drain event flag.
  this.needDrain = false;
  // at the start of calling end()
  this.ending = false;
  // when end() has been called, and returned
  this.ended = false;
  // when 'finish' is emitted
  this.finished = false;

  // has it been destroyed
  this.destroyed = false;

  // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.
  this.length = 0;

  // a flag to see when we're in the middle of a write.
  this.writing = false;

  // when true all writes will be buffered until .uncork() call
  this.corked = 0;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.
  this.bufferProcessing = false;

  // the callback that's passed to _write(chunk,cb)
  this.onwrite = function (er) {
    onwrite(stream, er);
  };

  // the callback that the user supplies to write(chunk,encoding,cb)
  this.writecb = null;

  // the amount that is being written when _write is called.
  this.writelen = 0;

  this.bufferedRequest = null;
  this.lastBufferedRequest = null;

  // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted
  this.pendingcb = 0;

  // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams
  this.prefinished = false;

  // True if the error was already emitted and should not be thrown again
  this.errorEmitted = false;

  // count buffered requests
  this.bufferedRequestCount = 0;

  // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two
  this.corkedRequestsFree = new CorkedRequest(this);
}

WritableState.prototype.getBuffer = function getBuffer() {
  var current = this.bufferedRequest;
  var out = [];
  while (current) {
    out.push(current);
    current = current.next;
  }
  return out;
};

(function () {
  try {
    Object.defineProperty(WritableState.prototype, 'buffer', {
      get: internalUtil.deprecate(function () {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
    });
  } catch (_) {}
})();

// Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.
var realHasInstance;
if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function (object) {
      if (realHasInstance.call(this, object)) return true;
      if (this !== Writable) return false;

      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function (object) {
    return object instanceof this;
  };
}

function Writable(options) {
  Duplex = Duplex || __webpack_require__(/*! ./_stream_duplex */ "./node_modules/readable-stream/lib/_stream_duplex.js");

  // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.

  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.
  if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
    return new Writable(options);
  }

  this._writableState = new WritableState(options, this);

  // legacy.
  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;

    if (typeof options.writev === 'function') this._writev = options.writev;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;

    if (typeof options.final === 'function') this._final = options.final;
  }

  Stream.call(this);
}

// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function () {
  this.emit('error', new Error('Cannot pipe, not readable'));
};

function writeAfterEnd(stream, cb) {
  var er = new Error('write after end');
  // TODO: defer error events consistently everywhere, not just the cb
  stream.emit('error', er);
  pna.nextTick(cb, er);
}

// Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.
function validChunk(stream, state, chunk, cb) {
  var valid = true;
  var er = false;

  if (chunk === null) {
    er = new TypeError('May not write null values to stream');
  } else if (typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  if (er) {
    stream.emit('error', er);
    pna.nextTick(cb, er);
    valid = false;
  }
  return valid;
}

Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;
  var isBuf = !state.objectMode && _isUint8Array(chunk);

  if (isBuf && !Buffer.isBuffer(chunk)) {
    chunk = _uint8ArrayToBuffer(chunk);
  }

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;

  if (typeof cb !== 'function') cb = nop;

  if (state.ended) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
  }

  return ret;
};

Writable.prototype.cork = function () {
  var state = this._writableState;

  state.corked++;
};

Writable.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;

    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = Buffer.from(chunk, encoding);
  }
  return chunk;
}

Object.defineProperty(Writable.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function () {
    return this._writableState.highWaterMark;
  }
});

// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
  if (!isBuf) {
    var newChunk = decodeChunk(state, chunk, encoding);
    if (chunk !== newChunk) {
      isBuf = true;
      encoding = 'buffer';
      chunk = newChunk;
    }
  }
  var len = state.objectMode ? 1 : chunk.length;

  state.length += len;

  var ret = state.length < state.highWaterMark;
  // we must ensure that previous needDrain will not be reset to false.
  if (!ret) state.needDrain = true;

  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = {
      chunk: chunk,
      encoding: encoding,
      isBuf: isBuf,
      callback: cb,
      next: null
    };
    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }
    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;

  if (sync) {
    // defer the callback if we are being called synchronously
    // to avoid piling up things on the stack
    pna.nextTick(cb, er);
    // this can emit finish, and it will always happen
    // after error
    pna.nextTick(finishMaybe, stream, state);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
  } else {
    // the caller expect this to happen before if
    // it is async
    cb(er);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
    // this can emit finish, but finish must
    // always follow error
    finishMaybe(stream, state);
  }
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;

  onwriteStateUpdate(state);

  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state);

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      /*<replacement>*/
      asyncWrite(afterWrite, stream, state, finished, cb);
      /*</replacement>*/
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
}

// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
}

// if there's something in the buffer waiting, then process it
function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;

  if (stream._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;

    var count = 0;
    var allBuffers = true;
    while (entry) {
      buffer[count] = entry;
      if (!entry.isBuf) allBuffers = false;
      entry = entry.next;
      count += 1;
    }
    buffer.allBuffers = allBuffers;

    doWrite(stream, state, true, state.length, buffer, '', holder.finish);

    // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite
    state.pendingcb++;
    state.lastBufferedRequest = null;
    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }
    state.bufferedRequestCount = 0;
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;

      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      state.bufferedRequestCount--;
      // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.
      if (state.writing) {
        break;
      }
    }

    if (entry === null) state.lastBufferedRequest = null;
  }

  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}

Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new Error('_write() is not implemented'));
};

Writable.prototype._writev = null;

Writable.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

  // .end() fully uncorks
  if (state.corked) {
    state.corked = 1;
    this.uncork();
  }

  // ignore unnecessary end() calls.
  if (!state.ending && !state.finished) endWritable(this, state, cb);
};

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}
function callFinal(stream, state) {
  stream._final(function (err) {
    state.pendingcb--;
    if (err) {
      stream.emit('error', err);
    }
    state.prefinished = true;
    stream.emit('prefinish');
    finishMaybe(stream, state);
  });
}
function prefinish(stream, state) {
  if (!state.prefinished && !state.finalCalled) {
    if (typeof stream._final === 'function') {
      state.pendingcb++;
      state.finalCalled = true;
      pna.nextTick(callFinal, stream, state);
    } else {
      state.prefinished = true;
      stream.emit('prefinish');
    }
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(state);
  if (need) {
    prefinish(stream, state);
    if (state.pendingcb === 0) {
      state.finished = true;
      stream.emit('finish');
    }
  }
  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);
  if (cb) {
    if (state.finished) pna.nextTick(cb);else stream.once('finish', cb);
  }
  state.ended = true;
  stream.writable = false;
}

function onCorkedFinish(corkReq, state, err) {
  var entry = corkReq.entry;
  corkReq.entry = null;
  while (entry) {
    var cb = entry.callback;
    state.pendingcb--;
    cb(err);
    entry = entry.next;
  }
  if (state.corkedRequestsFree) {
    state.corkedRequestsFree.next = corkReq;
  } else {
    state.corkedRequestsFree = corkReq;
  }
}

Object.defineProperty(Writable.prototype, 'destroyed', {
  get: function () {
    if (this._writableState === undefined) {
      return false;
    }
    return this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._writableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._writableState.destroyed = value;
  }
});

Writable.prototype.destroy = destroyImpl.destroy;
Writable.prototype._undestroy = destroyImpl.undestroy;
Writable.prototype._destroy = function (err, cb) {
  this.end();
  cb(err);
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js"), __webpack_require__(/*! ./../../timers-browserify/main.js */ "./node_modules/timers-browserify/main.js").setImmediate, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/readable-stream/lib/internal/streams/BufferList.js":
/*!*************************************************************************!*\
  !*** ./node_modules/readable-stream/lib/internal/streams/BufferList.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Buffer = __webpack_require__(/*! safe-buffer */ "./node_modules/readable-stream/node_modules/safe-buffer/index.js").Buffer;
var util = __webpack_require__(/*! util */ 2);

function copyBuffer(src, target, offset) {
  src.copy(target, offset);
}

module.exports = function () {
  function BufferList() {
    _classCallCheck(this, BufferList);

    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  BufferList.prototype.push = function push(v) {
    var entry = { data: v, next: null };
    if (this.length > 0) this.tail.next = entry;else this.head = entry;
    this.tail = entry;
    ++this.length;
  };

  BufferList.prototype.unshift = function unshift(v) {
    var entry = { data: v, next: this.head };
    if (this.length === 0) this.tail = entry;
    this.head = entry;
    ++this.length;
  };

  BufferList.prototype.shift = function shift() {
    if (this.length === 0) return;
    var ret = this.head.data;
    if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
    --this.length;
    return ret;
  };

  BufferList.prototype.clear = function clear() {
    this.head = this.tail = null;
    this.length = 0;
  };

  BufferList.prototype.join = function join(s) {
    if (this.length === 0) return '';
    var p = this.head;
    var ret = '' + p.data;
    while (p = p.next) {
      ret += s + p.data;
    }return ret;
  };

  BufferList.prototype.concat = function concat(n) {
    if (this.length === 0) return Buffer.alloc(0);
    if (this.length === 1) return this.head.data;
    var ret = Buffer.allocUnsafe(n >>> 0);
    var p = this.head;
    var i = 0;
    while (p) {
      copyBuffer(p.data, ret, i);
      i += p.data.length;
      p = p.next;
    }
    return ret;
  };

  return BufferList;
}();

if (util && util.inspect && util.inspect.custom) {
  module.exports.prototype[util.inspect.custom] = function () {
    var obj = util.inspect({ length: this.length });
    return this.constructor.name + ' ' + obj;
  };
}

/***/ }),

/***/ "./node_modules/readable-stream/lib/internal/streams/destroy.js":
/*!**********************************************************************!*\
  !*** ./node_modules/readable-stream/lib/internal/streams/destroy.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*<replacement>*/

var pna = __webpack_require__(/*! process-nextick-args */ "./node_modules/process-nextick-args/index.js");
/*</replacement>*/

// undocumented cb() API, needed for core, not for public API
function destroy(err, cb) {
  var _this = this;

  var readableDestroyed = this._readableState && this._readableState.destroyed;
  var writableDestroyed = this._writableState && this._writableState.destroyed;

  if (readableDestroyed || writableDestroyed) {
    if (cb) {
      cb(err);
    } else if (err && (!this._writableState || !this._writableState.errorEmitted)) {
      pna.nextTick(emitErrorNT, this, err);
    }
    return this;
  }

  // we set destroyed to true before firing error callbacks in order
  // to make it re-entrance safe in case destroy() is called within callbacks

  if (this._readableState) {
    this._readableState.destroyed = true;
  }

  // if this is a duplex stream mark the writable part as destroyed as well
  if (this._writableState) {
    this._writableState.destroyed = true;
  }

  this._destroy(err || null, function (err) {
    if (!cb && err) {
      pna.nextTick(emitErrorNT, _this, err);
      if (_this._writableState) {
        _this._writableState.errorEmitted = true;
      }
    } else if (cb) {
      cb(err);
    }
  });

  return this;
}

function undestroy() {
  if (this._readableState) {
    this._readableState.destroyed = false;
    this._readableState.reading = false;
    this._readableState.ended = false;
    this._readableState.endEmitted = false;
  }

  if (this._writableState) {
    this._writableState.destroyed = false;
    this._writableState.ended = false;
    this._writableState.ending = false;
    this._writableState.finished = false;
    this._writableState.errorEmitted = false;
  }
}

function emitErrorNT(self, err) {
  self.emit('error', err);
}

module.exports = {
  destroy: destroy,
  undestroy: undestroy
};

/***/ }),

/***/ "./node_modules/readable-stream/lib/internal/streams/stream-browser.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/readable-stream/lib/internal/streams/stream-browser.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! events */ "./node_modules/events/events.js").EventEmitter;


/***/ }),

/***/ "./node_modules/readable-stream/node_modules/safe-buffer/index.js":
/*!************************************************************************!*\
  !*** ./node_modules/readable-stream/node_modules/safe-buffer/index.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable node/no-deprecated-api */
var buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}


/***/ }),

/***/ "./node_modules/readable-stream/passthrough.js":
/*!*****************************************************!*\
  !*** ./node_modules/readable-stream/passthrough.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./readable */ "./node_modules/readable-stream/readable-browser.js").PassThrough


/***/ }),

/***/ "./node_modules/readable-stream/readable-browser.js":
/*!**********************************************************!*\
  !*** ./node_modules/readable-stream/readable-browser.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ./lib/_stream_readable.js */ "./node_modules/readable-stream/lib/_stream_readable.js");
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = __webpack_require__(/*! ./lib/_stream_writable.js */ "./node_modules/readable-stream/lib/_stream_writable.js");
exports.Duplex = __webpack_require__(/*! ./lib/_stream_duplex.js */ "./node_modules/readable-stream/lib/_stream_duplex.js");
exports.Transform = __webpack_require__(/*! ./lib/_stream_transform.js */ "./node_modules/readable-stream/lib/_stream_transform.js");
exports.PassThrough = __webpack_require__(/*! ./lib/_stream_passthrough.js */ "./node_modules/readable-stream/lib/_stream_passthrough.js");


/***/ }),

/***/ "./node_modules/readable-stream/transform.js":
/*!***************************************************!*\
  !*** ./node_modules/readable-stream/transform.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./readable */ "./node_modules/readable-stream/readable-browser.js").Transform


/***/ }),

/***/ "./node_modules/readable-stream/writable-browser.js":
/*!**********************************************************!*\
  !*** ./node_modules/readable-stream/writable-browser.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/_stream_writable.js */ "./node_modules/readable-stream/lib/_stream_writable.js");


/***/ }),

/***/ "./node_modules/safe-buffer/index.js":
/*!*******************************************!*\
  !*** ./node_modules/safe-buffer/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable node/no-deprecated-api */
var buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.prototype = Object.create(Buffer.prototype)

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}


/***/ }),

/***/ "./node_modules/setimmediate/setImmediate.js":
/*!***************************************************!*\
  !*** ./node_modules/setimmediate/setImmediate.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/stream-browserify/index.js":
/*!*************************************************!*\
  !*** ./node_modules/stream-browserify/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = Stream;

var EE = __webpack_require__(/*! events */ "./node_modules/events/events.js").EventEmitter;
var inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js");

inherits(Stream, EE);
Stream.Readable = __webpack_require__(/*! readable-stream/readable.js */ "./node_modules/readable-stream/readable-browser.js");
Stream.Writable = __webpack_require__(/*! readable-stream/writable.js */ "./node_modules/readable-stream/writable-browser.js");
Stream.Duplex = __webpack_require__(/*! readable-stream/duplex.js */ "./node_modules/readable-stream/duplex-browser.js");
Stream.Transform = __webpack_require__(/*! readable-stream/transform.js */ "./node_modules/readable-stream/transform.js");
Stream.PassThrough = __webpack_require__(/*! readable-stream/passthrough.js */ "./node_modules/readable-stream/passthrough.js");

// Backwards-compat with node 0.4.x
Stream.Stream = Stream;



// old-style streams.  Note that the pipe method (the only relevant
// part of this class) is overridden in the Readable class.

function Stream() {
  EE.call(this);
}

Stream.prototype.pipe = function(dest, options) {
  var source = this;

  function ondata(chunk) {
    if (dest.writable) {
      if (false === dest.write(chunk) && source.pause) {
        source.pause();
      }
    }
  }

  source.on('data', ondata);

  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }

  dest.on('drain', ondrain);

  // If the 'end' option is not supplied, dest.end() will be called when
  // source gets the 'end' or 'close' events.  Only dest.end() once.
  if (!dest._isStdio && (!options || options.end !== false)) {
    source.on('end', onend);
    source.on('close', onclose);
  }

  var didOnEnd = false;
  function onend() {
    if (didOnEnd) return;
    didOnEnd = true;

    dest.end();
  }


  function onclose() {
    if (didOnEnd) return;
    didOnEnd = true;

    if (typeof dest.destroy === 'function') dest.destroy();
  }

  // don't leave dangling pipes when there are errors.
  function onerror(er) {
    cleanup();
    if (EE.listenerCount(this, 'error') === 0) {
      throw er; // Unhandled stream error in pipe.
    }
  }

  source.on('error', onerror);
  dest.on('error', onerror);

  // remove all the event listeners that were added.
  function cleanup() {
    source.removeListener('data', ondata);
    dest.removeListener('drain', ondrain);

    source.removeListener('end', onend);
    source.removeListener('close', onclose);

    source.removeListener('error', onerror);
    dest.removeListener('error', onerror);

    source.removeListener('end', cleanup);
    source.removeListener('close', cleanup);

    dest.removeListener('close', cleanup);
  }

  source.on('end', cleanup);
  source.on('close', cleanup);

  dest.on('close', cleanup);

  dest.emit('pipe', source);

  // Allow for unix-like usage: A.pipe(B).pipe(C)
  return dest;
};


/***/ }),

/***/ "./node_modules/string_decoder/lib/string_decoder.js":
/*!***********************************************************!*\
  !*** ./node_modules/string_decoder/lib/string_decoder.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



/*<replacement>*/

var Buffer = __webpack_require__(/*! safe-buffer */ "./node_modules/safe-buffer/index.js").Buffer;
/*</replacement>*/

var isEncoding = Buffer.isEncoding || function (encoding) {
  encoding = '' + encoding;
  switch (encoding && encoding.toLowerCase()) {
    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
      return true;
    default:
      return false;
  }
};

function _normalizeEncoding(enc) {
  if (!enc) return 'utf8';
  var retried;
  while (true) {
    switch (enc) {
      case 'utf8':
      case 'utf-8':
        return 'utf8';
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return 'utf16le';
      case 'latin1':
      case 'binary':
        return 'latin1';
      case 'base64':
      case 'ascii':
      case 'hex':
        return enc;
      default:
        if (retried) return; // undefined
        enc = ('' + enc).toLowerCase();
        retried = true;
    }
  }
};

// Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings
function normalizeEncoding(enc) {
  var nenc = _normalizeEncoding(enc);
  if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
  return nenc || enc;
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.
exports.StringDecoder = StringDecoder;
function StringDecoder(encoding) {
  this.encoding = normalizeEncoding(encoding);
  var nb;
  switch (this.encoding) {
    case 'utf16le':
      this.text = utf16Text;
      this.end = utf16End;
      nb = 4;
      break;
    case 'utf8':
      this.fillLast = utf8FillLast;
      nb = 4;
      break;
    case 'base64':
      this.text = base64Text;
      this.end = base64End;
      nb = 3;
      break;
    default:
      this.write = simpleWrite;
      this.end = simpleEnd;
      return;
  }
  this.lastNeed = 0;
  this.lastTotal = 0;
  this.lastChar = Buffer.allocUnsafe(nb);
}

StringDecoder.prototype.write = function (buf) {
  if (buf.length === 0) return '';
  var r;
  var i;
  if (this.lastNeed) {
    r = this.fillLast(buf);
    if (r === undefined) return '';
    i = this.lastNeed;
    this.lastNeed = 0;
  } else {
    i = 0;
  }
  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
  return r || '';
};

StringDecoder.prototype.end = utf8End;

// Returns only complete characters in a Buffer
StringDecoder.prototype.text = utf8Text;

// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
StringDecoder.prototype.fillLast = function (buf) {
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
  this.lastNeed -= buf.length;
};

// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte. If an invalid byte is detected, -2 is returned.
function utf8CheckByte(byte) {
  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
  return byte >> 6 === 0x02 ? -1 : -2;
}

// Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.
function utf8CheckIncomplete(self, buf, i) {
  var j = buf.length - 1;
  if (j < i) return 0;
  var nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 1;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 2;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) {
      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
    }
    return nb;
  }
  return 0;
}

// Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function utf8CheckExtraBytes(self, buf, p) {
  if ((buf[0] & 0xC0) !== 0x80) {
    self.lastNeed = 0;
    return '\ufffd';
  }
  if (self.lastNeed > 1 && buf.length > 1) {
    if ((buf[1] & 0xC0) !== 0x80) {
      self.lastNeed = 1;
      return '\ufffd';
    }
    if (self.lastNeed > 2 && buf.length > 2) {
      if ((buf[2] & 0xC0) !== 0x80) {
        self.lastNeed = 2;
        return '\ufffd';
      }
    }
  }
}

// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
function utf8FillLast(buf) {
  var p = this.lastTotal - this.lastNeed;
  var r = utf8CheckExtraBytes(this, buf, p);
  if (r !== undefined) return r;
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, p, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, p, 0, buf.length);
  this.lastNeed -= buf.length;
}

// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.
function utf8Text(buf, i) {
  var total = utf8CheckIncomplete(this, buf, i);
  if (!this.lastNeed) return buf.toString('utf8', i);
  this.lastTotal = total;
  var end = buf.length - (total - this.lastNeed);
  buf.copy(this.lastChar, 0, end);
  return buf.toString('utf8', i, end);
}

// For UTF-8, a replacement character is added when ending on a partial
// character.
function utf8End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + '\ufffd';
  return r;
}

// UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.
function utf16Text(buf, i) {
  if ((buf.length - i) % 2 === 0) {
    var r = buf.toString('utf16le', i);
    if (r) {
      var c = r.charCodeAt(r.length - 1);
      if (c >= 0xD800 && c <= 0xDBFF) {
        this.lastNeed = 2;
        this.lastTotal = 4;
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
        return r.slice(0, -1);
      }
    }
    return r;
  }
  this.lastNeed = 1;
  this.lastTotal = 2;
  this.lastChar[0] = buf[buf.length - 1];
  return buf.toString('utf16le', i, buf.length - 1);
}

// For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.
function utf16End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) {
    var end = this.lastTotal - this.lastNeed;
    return r + this.lastChar.toString('utf16le', 0, end);
  }
  return r;
}

function base64Text(buf, i) {
  var n = (buf.length - i) % 3;
  if (n === 0) return buf.toString('base64', i);
  this.lastNeed = 3 - n;
  this.lastTotal = 3;
  if (n === 1) {
    this.lastChar[0] = buf[buf.length - 1];
  } else {
    this.lastChar[0] = buf[buf.length - 2];
    this.lastChar[1] = buf[buf.length - 1];
  }
  return buf.toString('base64', i, buf.length - n);
}

function base64End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
  return r;
}

// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
function simpleWrite(buf) {
  return buf.toString(this.encoding);
}

function simpleEnd(buf) {
  return buf && buf.length ? this.write(buf) : '';
}

/***/ }),

/***/ "./node_modules/timers-browserify/main.js":
/*!************************************************!*\
  !*** ./node_modules/timers-browserify/main.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(/*! setimmediate */ "./node_modules/setimmediate/setImmediate.js");
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/util-deprecate/browser.js":
/*!************************************************!*\
  !*** ./node_modules/util-deprecate/browser.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
/**
 * Module exports.
 */

module.exports = deprecate;

/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `console.trace()` instead of `console.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */

function deprecate (fn, msg) {
  if (config('noDeprecation')) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (config('throwDeprecation')) {
        throw new Error(msg);
      } else if (config('traceDeprecation')) {
        console.trace(msg);
      } else {
        console.warn(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
}

/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */

function config (name) {
  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
  try {
    if (!global.localStorage) return false;
  } catch (_) {
    return false;
  }
  var val = global.localStorage[name];
  if (null == val) return false;
  return String(val).toLowerCase() === 'true';
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/scripts/fields.js":
/*!*******************************!*\
  !*** ./src/scripts/fields.js ***!
  \*******************************/
/*! exports provided: f */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return f; });
// Globals to define spreadsheet column names,
//     in case something is changed later.
var f = {
  type: 'Type',
  name: 'Name',
  sku: 'SKU',
  pic: 'PIC',
  cat: 'tax:product_cat',
  tag: 'tax:product_tag',
  desc: 'Description',
  short_desc: 'Short Description',
  visibility: 'Visibility in catalog',
  package: 'Package',
  title: 'Title',
  // Used in packages
  attr: 'Attributes',
  // Used in packages
  model: 'Model',
  // Used in packages
  skus: 'SKUs',
  // Used in packages
  prod_info: 'Product Info',
  // Used in packages
  image: 'Image',
  indent: 'Indention',
  warrantyList: 'Warranty List',
  warrantyBody: 'Warranty Body',
  orderInfo: 'Ordering Information',
  feats: 'Product Features',
  related: 'Related Products',
  indict: 'Indications',
  downs: 'Downloads',
  main_model: 'Main Model',
  pnf: 'In Part Number Finder'
};


/***/ }),

/***/ "./src/scripts/filters.js":
/*!********************************!*\
  !*** ./src/scripts/filters.js ***!
  \********************************/
/*! exports provided: findSpecBounds, findSpecIcons, computeChecksum, filterExisting, compareHashesForPayload, keyByPIC, linkVariations, linkPackages, verifyFields, verifyFiles, buildSpec, variationSlice */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findSpecBounds", function() { return findSpecBounds; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findSpecIcons", function() { return findSpecIcons; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "computeChecksum", function() { return computeChecksum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterExisting", function() { return filterExisting; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compareHashesForPayload", function() { return compareHashesForPayload; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keyByPIC", function() { return keyByPIC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "linkVariations", function() { return linkVariations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "linkPackages", function() { return linkPackages; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "verifyFields", function() { return verifyFields; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "verifyFiles", function() { return verifyFiles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildSpec", function() { return buildSpec; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "variationSlice", function() { return variationSlice; });
/* harmony import */ var _fields_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fields.js */ "./src/scripts/fields.js");
/* harmony import */ var object_hash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! object-hash */ "./node_modules/object-hash/dist/object_hash.js");
/* harmony import */ var object_hash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(object_hash__WEBPACK_IMPORTED_MODULE_1__);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }


 //   The attribute column right before specifications start

var b_SpecsStart = 'Specification Start';
var b_SpecsEnd = 'Specification End';

function findSpecBounds(attrRow) {
  var started = false;
  return attrRow.map(function (val, ind) {
    if (val === b_SpecsStart) {
      started = true;
      return ind;
    }

    if (val === b_SpecsEnd && started) {
      return ind;
    }

    return false;
  }).filter(function (val) {
    if (false !== val) return true; // I know this looks silly, but what if val == 0?
  });
}

function findSpecIcons(attrRow, row) {
  var icons = {};

  if (!row.includes('ICON')) {
    window.alert('Are you sure your defining specification icons?');
  }

  row.map(function (val, ind) {
    if ('' !== val && 'ICON' !== val) {
      icons[attrRow[ind]] = val;
    }
  });
  return icons;
}

function computeChecksum(prods) {
  Object.values(prods).map(function (prod) {
    prods[prod[_fields_js__WEBPACK_IMPORTED_MODULE_0__["f"].pic]].checksum = object_hash__WEBPACK_IMPORTED_MODULE_1___default()(prod);
  });
  console.log('HASHed', prods);
  return prods;
}

function filterExisting(data) {
  var existingHashes = {};
  data.forEach(function (WPprod) {
    try {
      existingHashes[WPprod.meta.PIC[0]] = {
        id: WPprod.id,
        checksum: String(WPprod.meta.product_hash[0])
      };
    } catch (_unused) {
      console.log("ID:".concat(WPprod.id, " is not a legitimate product :("));
    }
  });
  return existingHashes;
}

function compareHashesForPayload(newProds, existing) {
  var forcing = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  if (!existing) return [[], Object.keys(newProds)];
  var toDelete = [];
  var toPost = [];
  var toUpdate = [];
  var newPics = Object.keys(newProds);
  var ignoringN = 0; // Ugh, just redo it

  newPics.forEach(function (pic) {
    if (!existing[pic]) {
      // Create new products
      toPost.push(pic);
    } else if (forcing || existing[pic].checksum !== newProds[pic].checksum) {
      // Update existing products
      existing[pic].pic = pic; // Lol

      toUpdate.push(existing[pic]);
    } else {
      // Ignore unchanged products, we're just incrementing a counter for stats
      ignoringN++;
    } // else, this product has not been updated

  });
  console.log("Creating : ".concat(toPost.length));
  console.log("Updating : ".concat(toUpdate.length));
  console.log("Ignoreing: ".concat(ignoringN));
  return [toDelete, toPost, toUpdate];
}

function keyByPIC(prods) {
  var ProdByPIC = {};
  prods.map(function (val) {
    if (!val) {
      return false;
    }

    if (!ProdByPIC[val[_fields_js__WEBPACK_IMPORTED_MODULE_0__["f"].pic]]) {
      ProdByPIC[val[_fields_js__WEBPACK_IMPORTED_MODULE_0__["f"].pic]] = [];
    }

    ProdByPIC[val[_fields_js__WEBPACK_IMPORTED_MODULE_0__["f"].pic]] = val;
    return val;
  });
  return ProdByPIC;
}

function splitAndVerify(commaSeparated) {
  if (!commaSeparated) return [];
  var rv = commaSeparated.split(',').map(function (val) {
    return val.trim();
  });

  if ('' === rv[0]) {
    return false;
  }

  return rv;
}

function buildPackageObj(packages) {
  var rv = {};
  var attr = packages[0].splice(1); // Ignore ID field since the rows are spliced too

  packages.splice(1).map(function (row) {
    var id = row[0];

    if (undefined !== rv[id]) {
      window.alert("Conflicting package ID's found: ".concat(id));
    }

    rv[id] = {};
    row.splice(1).map(function (val, ind) {
      rv[id][attr[ind]] = val;
    });
    rv[id][_fields_js__WEBPACK_IMPORTED_MODULE_0__["f"].attr] = splitAndVerify(rv[id][_fields_js__WEBPACK_IMPORTED_MODULE_0__["f"].attr]);
    rv[id][_fields_js__WEBPACK_IMPORTED_MODULE_0__["f"].skus] = splitAndVerify(rv[id][_fields_js__WEBPACK_IMPORTED_MODULE_0__["f"].skus]);
  });
  return rv;
}

function linkVariations(parents, varies) {
  // Give all parents an array first, and if prod.type is simple,
  //        copy the sku and name to make a basic variation
  Object.values(parents).map(function (prod) {
    parents[prod[_fields_js__WEBPACK_IMPORTED_MODULE_0__["f"].pic]].variations = [];

    if ('simple' === prod[_fields_js__WEBPACK_IMPORTED_MODULE_0__["f"].type]) {
      parents[prod[_fields_js__WEBPACK_IMPORTED_MODULE_0__["f"].pic]].variations.push({
        name: prod[_fields_js__WEBPACK_IMPORTED_MODULE_0__["f"].name],
        sku: prod[_fields_js__WEBPACK_IMPORTED_MODULE_0__["f"].sku],
        specs: prod.specs
      });
    }
  });
  varies.map(function (val) {
    if (undefined === parents[val[_fields_js__WEBPACK_IMPORTED_MODULE_0__["f"].pic]]) return false;
    var varN = parents[val[_fields_js__WEBPACK_IMPORTED_MODULE_0__["f"].pic]].variations.push({
      name: val[_fields_js__WEBPACK_IMPORTED_MODULE_0__["f"].name],
      sku: val[_fields_js__WEBPACK_IMPORTED_MODULE_0__["f"].sku],
      specs: val.specs // This is too heavy optimizeVariations transforms later

    }); // Undefined is better for payload size

    if (val[_fields_js__WEBPACK_IMPORTED_MODULE_0__["f"].image]) {
      parents[val[_fields_js__WEBPACK_IMPORTED_MODULE_0__["f"].pic]].variations[varN - 1].image = val[_fields_js__WEBPACK_IMPORTED_MODULE_0__["f"].image];
      console.log('has image');
    }

    ;

    if (val[_fields_js__WEBPACK_IMPORTED_MODULE_0__["f"].indent]) {
      parents[val[_fields_js__WEBPACK_IMPORTED_MODULE_0__["f"].pic]].variations[varN - 1].indent = val[_fields_js__WEBPACK_IMPORTED_MODULE_0__["f"].indent];
    }

    ;

    if (val[_fields_js__WEBPACK_IMPORTED_MODULE_0__["f"].package]) {
      parents[val[_fields_js__WEBPACK_IMPORTED_MODULE_0__["f"].pic]].variations[varN - 1].package = val[_fields_js__WEBPACK_IMPORTED_MODULE_0__["f"].package];
    }

    ;
  });
  return parents;
}

function linkPackages(parents, packs) {
  packs = buildPackageObj(packs); // Learn what you can from just variations

  Object.values(parents).map(function (prod) {
    var packages = {}; // Default package

    packages.drop = {
      label: '',
      //! This should pull from PIC by controller
      pic: prod[_fields_js__WEBPACK_IMPORTED_MODULE_0__["f"].pic],
      model: 'B',
      skus: [],
      specs: [],
      // This needs to be pulled from varying attributes
      product_info: ['name', 'description', 'image']
    };

    if (prod.variations) {
      prod.variations.map(function (vary) {
        if (undefined !== vary.package) {
          // Variation specifies a package to be in
          //   see if that package exists first
          if (!packages[vary.package]) {
            packages[vary.package] = {
              // Base package template
              label: vary.package,
              pic: prod[_fields_js__WEBPACK_IMPORTED_MODULE_0__["f"].pic],
              model: 'B',
              skus: [],
              specs: [],
              // Defined by pack sheet below
              product_info: [] // Defined by pack sheet below

            }; // if this is a 'list' package, ensure model A

            if ('list' === vary.package) {
              packages[vary.package].model = 'A';
              packages[vary.package].label = ''; //! PIC's name if on another product

              packages[vary.package].product_info = ['name', 'description', 'image'];
            }
          } // If any of the variations have images, upgrade that package model.


          if (vary.image) {
            packages[vary.package].model = 'C'; //   Make sure they're separate from the 'drop' first
            // Any other details should be defined by pack sheet
          } // Add variation to the package of its choice


          console.log(prod[_fields_js__WEBPACK_IMPORTED_MODULE_0__["f"].name], vary.package);
          packages[vary.package].skus.push(vary.sku); // If a package name isn't specified but the variation still uses an image, use a blank package name, similar to 'drop'
        } else if (vary.image) {
          // Check if there already isn't a package for unlabeled packages of variation images.
          if (!packages.varyImage) {
            packages.varyImage = {
              label: '',
              pic: prod[_fields_js__WEBPACK_IMPORTED_MODULE_0__["f"].pic],
              skus: [],
              specs: [],
              model: 'C',
              product_info: ['name', 'description', 'image']
            };
          }

          packages.varyImage.skus.push(vary.sku);
        } else {
          packages.drop.skus.push(vary.sku);
        }
      });
    } //   Remove default if every variation found a package


    if (0 === packages.drop.skus.length) {
      delete packages.drop;
    } // Now apply the package file for more packages and specs
    // All packages must have names by now, otherwise the variations wouldn't be able to save or they would be put in 'drop'


    if (prod[_fields_js__WEBPACK_IMPORTED_MODULE_0__["f"].package]) {
      prod[_fields_js__WEBPACK_IMPORTED_MODULE_0__["f"].package].split(',').map(function (id) {
        // This is a package who's name derives from PIC
        id = id.trim(); // Before making custom package, make sure the variations didn't already define it.

        if (packs[id][_fields_js__WEBPACK_IMPORTED_MODULE_0__["f"].title] & packages[packs[id][_fields_js__WEBPACK_IMPORTED_MODULE_0__["f"].title]]) {
          packages['custom' + id] = packages[packs[id][_fields_js__WEBPACK_IMPORTED_MODULE_0__["f"].title]];
          delete packages[packs[id][_fields_js__WEBPACK_IMPORTED_MODULE_0__["f"].title]];
        } else
          /* Otherwise, build the new package */
          {
            packages['custom' + id] = {
              label: '',
              pic: '',
              skus: [],
              model: 'B',
              specs: [],
              // This needs to be pulled from varying attributes
              product_info: []
            };
          } // For every field that is defined by the package sheet, confirm and re-specify.


        if (packs[id][_fields_js__WEBPACK_IMPORTED_MODULE_0__["f"].image]) {
          packages['custom' + id].model = 'D';
          packages['custom' + id].image = packs[id][_fields_js__WEBPACK_IMPORTED_MODULE_0__["f"].image];
        }

        if (packs[id][_fields_js__WEBPACK_IMPORTED_MODULE_0__["f"].pic]) {
          packages['custom' + id].pic = packs[id][_fields_js__WEBPACK_IMPORTED_MODULE_0__["f"].pic];
        }

        if (packs[id][_fields_js__WEBPACK_IMPORTED_MODULE_0__["f"].skus]) {
          var _packages$skus;

          (_packages$skus = packages['custom' + id].skus).push.apply(_packages$skus, _toConsumableArray(packs[id][_fields_js__WEBPACK_IMPORTED_MODULE_0__["f"].skus]));
        }

        if (packs[id][_fields_js__WEBPACK_IMPORTED_MODULE_0__["f"].attr]) {
          packages['custom' + id].specs = packs[id][_fields_js__WEBPACK_IMPORTED_MODULE_0__["f"].attr];
        }

        if (packs[id][_fields_js__WEBPACK_IMPORTED_MODULE_0__["f"].title]) {
          packages['custom' + id].label = packs[id][_fields_js__WEBPACK_IMPORTED_MODULE_0__["f"].title];
        } else {
          // If the title is not specified, this is a product blurb and the title and product_info should be pulled from the PIC.
          packages['custom' + id].product_info = ['name', 'description', 'image'];
        }

        if (packs[id][_fields_js__WEBPACK_IMPORTED_MODULE_0__["f"].prod_info]) {
          packages['custom' + id].product_info = packs[id][_fields_js__WEBPACK_IMPORTED_MODULE_0__["f"].prod_info].split(',').map(function (val) {
            return val.trim();
          });
        }

        if (packs[id][_fields_js__WEBPACK_IMPORTED_MODULE_0__["f"].model]) {
          packages['custom' + id].model = packs[id][_fields_js__WEBPACK_IMPORTED_MODULE_0__["f"].model];
        }
      });
    } // TODO: Test with Posterior Mounting Brackets with the art of linking via label and specify specs in sheet
    // TODO:  nevermind, but test anyways
    /// / : Confirm that the first package is the 'drop' package
    // TODO: Stop using the drop package...
    // if (Object.values(packages)[0] && '' !== Object.values(packages)[0].label) {
    //   window.alert(`${prod[f.name]} should be specifying main product variations first!`);
    // }
    // Packages makes up both packages implicitly defined in variations and explicitly from the sheet


    parents[prod[_fields_js__WEBPACK_IMPORTED_MODULE_0__["f"].pic]].packages = packages;
  });
  return parents;
} // confirm definition of properties that will be used in POST
//    used for cleaning taxonomies for now


function verifyFields(prod) {
  return prod;
}

function verifyFiles(parentFileHandler, variationFileHandler, packageFileHandler) {
  if (parentFileHandler === undefined) {
    window.alert('Specify a parent product file first');
    return false;
  }

  if (variationFileHandler === undefined) {
    window.alert('Specify a variations file first');
    return false;
  }

  if (packageFileHandler === undefined) {
    window.alert('Specify a package file first');
    return false;
  }

  return true;
}

function buildSpec(start, end, ind, val, icon) {
  if (start < ind && ind < end) {
    var spec = {}; // Value

    spec.val = val; // Icon

    spec.icon = icon; // Featured or Additional

    if (val.includes('*')) {
      spec.val = val.replace('*', '');
      spec.featured = true;
    } else {
      spec.featured = false;
    }

    return spec;
  }

  return false;
}

function variationSlice(varyPack, i) {
  var rv = {
    varies: varyPack.varies[i],
    labels: varyPack.labels
  };
  return rv;
}



/***/ }),

/***/ "./src/scripts/rest.js":
/*!*****************************!*\
  !*** ./src/scripts/rest.js ***!
  \*****************************/
/*! exports provided: deleteProducts, POSTproducts, getExistingProducts */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteProducts", function() { return deleteProducts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POSTproducts", function() { return POSTproducts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getExistingProducts", function() { return getExistingProducts; });
/* harmony import */ var _filters__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./filters */ "./src/scripts/filters.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./src/scripts/utils.js");
/* harmony import */ var _fields__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fields */ "./src/scripts/fields.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





function getExistingProducts() {
  return _getExistingProducts.apply(this, arguments);
} // Delete a product, ?force to ensure permanent deletion


function _getExistingProducts() {
  _getExistingProducts = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var pages, crntPage, pagesN;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            pages = [];
            crntPage = 1;
            pagesN = 20; // Fetch first page to find total pages

            _context.t0 = pages.push;
            _context.t1 = pages;
            _context.t2 = _toConsumableArray;
            _context.next = 8;
            return fetch("".concat(wpApiSettings.root, "wp/v2/product?per_page=100&page=1")).then(function (res) {
              pagesN = res.headers.get('x-wp-totalpages');
              console.log("Total Pages: ".concat(pagesN));
              return res.json();
            }).catch(console.error);

          case 8:
            _context.t3 = _context.sent;
            _context.t4 = (0, _context.t2)(_context.t3);

            _context.t0.apply.call(_context.t0, _context.t1, _context.t4);

          case 11:
            if (!(crntPage++ < pagesN)) {
              _context.next = 22;
              break;
            }

            _context.t5 = pages.push;
            _context.t6 = pages;
            _context.t7 = _toConsumableArray;
            _context.next = 17;
            return fetch("".concat(wpApiSettings.root, "wp/v2/product?per_page=100&page=").concat(crntPage)).then(function (res) {
              return res.json();
            }).catch(function (err) {
              return console.error(err, pages);
            });

          case 17:
            _context.t8 = _context.sent;
            _context.t9 = (0, _context.t7)(_context.t8);

            _context.t5.apply.call(_context.t5, _context.t6, _context.t9);

            _context.next = 11;
            break;

          case 22:
            return _context.abrupt("return", pages);

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getExistingProducts.apply(this, arguments);
}

function deleteProduct(postID) {
  var verbose = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return new Promise(function (resolve, reject) {
    if (!postID) {
      reject(postID);
    }

    fetch("".concat(wpApiSettings.root, "wp/v2/product/").concat(postID, "?force=true"), {
      method: 'delete',
      headers: {
        'X-WP-Nonce': wpApiSettings.nonce,
        'Content-Type': 'application/json'
      }
    }).then(function (res) {
      resolve(res);
      if (verbose) console.log(res);
    }).catch(console.error);
  });
}

function deleteProducts(_x, _x2) {
  return _deleteProducts.apply(this, arguments);
}

function _deleteProducts() {
  _deleteProducts = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(prods, statuseElm) {
    var responses, lastDelete;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            responses = [];

          case 1:
            if (!(0 < prods.length)) {
              _context2.next = 9;
              break;
            }

            statuseElm.textContent = "Deleting products. ".concat(prods.length, " remain...");
            _context2.next = 5;
            return deleteProduct(prods.splice(0, 1)[0], true);

          case 5:
            lastDelete = _context2.sent;
            responses.push(lastDelete);
            _context2.next = 1;
            break;

          case 9:
            return _context2.abrupt("return", responses);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _deleteProducts.apply(this, arguments);
}

function POSTproduct(_x3) {
  return _POSTproduct.apply(this, arguments);
}

function _POSTproduct() {
  _POSTproduct = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(val) {
    var updateID,
        payload,
        url,
        _args3 = arguments;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            updateID = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : false;
            // val = verifyFields(val);   // Until this is used... If this is used...
            payload = {
              title: val[_fields__WEBPACK_IMPORTED_MODULE_2__["f"].name],
              content: val[_fields__WEBPACK_IMPORTED_MODULE_2__["f"].desc],
              excerpt: val[_fields__WEBPACK_IMPORTED_MODULE_2__["f"].short_desc],
              status: val[_fields__WEBPACK_IMPORTED_MODULE_2__["f"].visibility],
              terms: val.terms,
              meta: {
                SKU: val[_fields__WEBPACK_IMPORTED_MODULE_2__["f"].sku],
                PIC: val[_fields__WEBPACK_IMPORTED_MODULE_2__["f"].pic],
                ordering_info: val[_fields__WEBPACK_IMPORTED_MODULE_2__["f"].orderInfo],
                product_type: val[_fields__WEBPACK_IMPORTED_MODULE_2__["f"].type],
                product_hash: val.checksum,
                // Used for finding changes between new imports and wp posts
                main_model: val[_fields__WEBPACK_IMPORTED_MODULE_2__["f"].main_model],
                part_number_finder: val[_fields__WEBPACK_IMPORTED_MODULE_2__["f"].pnf]
              },
              specs: val.specs,
              gallery: val.gallery,
              variations: val.variations ? Object(_filters__WEBPACK_IMPORTED_MODULE_0__["variationSlice"])(val.variations, 0) : [],
              // .splice(0, 40) : [],
              warranty: val.warranty,
              features: val.features,
              indications: val.indications,
              downloads: val.downloads,
              related: val.related,
              packages: Object.values(val.packages ? val.packages : {}) // Keys only used for construction

            }; // console.log('product payload', payload);

            url = "".concat(wpApiSettings.root, "wp/v2/product");

            if (updateID) {
              url = "".concat(wpApiSettings.root, "wp/v2/product/").concat(updateID);
            }

            return _context3.abrupt("return", Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["fetcher"])(url, {
              method: 'post',
              headers: {
                'X-WP-Nonce': wpApiSettings.nonce,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(payload)
            }).then(function (res) {
              console.log(res); // Confirm that the POST was ok before adding variations

              if (undefined !== res && val.variations && 1 < val.variations.varies.length) {
                return POSTvariations(res.id, val.variations, 1).then(function () {
                  Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["incrementProgress"])();
                });
              } else {
                Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["incrementProgress"])();
              }
            }).catch(console.error));

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _POSTproduct.apply(this, arguments);
}

function POSTvariations(_x4, _x5) {
  return _POSTvariations.apply(this, arguments);
}

function _POSTvariations() {
  _POSTvariations = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(POSTid, varies) {
    var depth,
        payload,
        _args4 = arguments;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            depth = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : 1;
            console.log("Posting more variations at a depth of ".concat(depth));
            payload = JSON.stringify({
              variations: Object(_filters__WEBPACK_IMPORTED_MODULE_0__["variationSlice"])(varies, depth)
            }); // console.log('variations payload: ', payload);

            return _context4.abrupt("return", Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["fetcher"])("".concat(wpApiSettings.root, "wp/v2/product/").concat(POSTid), {
              method: 'post',
              headers: {
                'X-WP-Nonce': wpApiSettings.nonce,
                'Content-Type': 'application/json'
              },
              body: payload
            }).then(function (res) {
              if (res && depth + 1 !== varies.varies.length && 16 > depth) {
                return POSTvariations(POSTid, varies, depth + 1);
              }
            }));

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _POSTvariations.apply(this, arguments);
}

function POSTproducts(_x6, _x7, _x8, _x9) {
  return _POSTproducts.apply(this, arguments);
}

function _POSTproducts() {
  _POSTproducts = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(prods, toCreate, toUpdate, statusElm) {
    var Nprod, currentProduct, prodData, prodID, finished;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            Nprod = toCreate.length + toUpdate.length;
            finished = 0;
            statusElm.textContent = "Uploading products: 0 of ".concat(Nprod, " received");
            console.log('POSTing...', toCreate, toUpdate); //  POST loop

          case 4:
            if (!(0 < toCreate.length)) {
              _context5.next = 12;
              break;
            }

            console.log('posting new product...');
            statusElm.textContent = "Uploading products: ".concat(finished++, " of ").concat(Nprod, " received");
            prodData = prods[toCreate.splice(0, 1)];
            _context5.next = 10;
            return POSTproduct(prodData);

          case 10:
            _context5.next = 4;
            break;

          case 12:
            if (!(0 < toUpdate.length)) {
              _context5.next = 22;
              break;
            }

            console.log('posting updates...');
            statusElm.textContent = "Uploading products: ".concat(finished++, " of ").concat(Nprod, " received");
            currentProduct = toUpdate.splice(0, 1)[0];
            prodData = prods[currentProduct.pic];
            prodID = currentProduct.id;
            _context5.next = 20;
            return POSTproduct(prodData, prodID);

          case 20:
            _context5.next = 12;
            break;

          case 22:
            return _context5.abrupt("return", Nprod);

          case 23:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _POSTproducts.apply(this, arguments);
}



/***/ }),

/***/ "./src/scripts/utils.js":
/*!******************************!*\
  !*** ./src/scripts/utils.js ***!
  \******************************/
/*! exports provided: fetcher, readFilePromise, testCall, incrementProgress */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetcher", function() { return fetcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readFilePromise", function() { return readFilePromise; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "testCall", function() { return testCall; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "incrementProgress", function() { return incrementProgress; });
/* harmony import */ var csv_parse__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! csv-parse */ "./node_modules/csv-parse/lib/index.js");
/* harmony import */ var csv_parse__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(csv_parse__WEBPACK_IMPORTED_MODULE_0__);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

 // Utitlity Functions

function fetcher(url, obj) {
  var forgiving = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  // Some boilerplate for fetch calls
  return fetch(url, obj).then(function (res) {
    if (500 === res.status) {
      if (forgiving) {
        console.error('Trying one more time');
        return fetcher(url, obj, false);
      } else {
        console.error('Second attempt failed as well');
      }
    } else if (!forgiving) {
      console.log('Second attempt success!');
    }

    return res.json();
  }).catch(function (err) {
    return console.error(err, obj);
  });
}

function readFilePromise(_x) {
  return _readFilePromise.apply(this, arguments);
}

function _readFilePromise() {
  _readFilePromise = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(fileHandler) {
    var reader;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // And another shoutout to this link https://blog.shovonhasan.com/using-promises-with-filereader/
            reader = new FileReader();
            reader.readAsText(fileHandler);
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              reader.onerror = function () {
                reader.abort();
                reject(new DOMException('Problem parsing input file.'));
              };

              reader.onload = function () {
                csv_parse__WEBPACK_IMPORTED_MODULE_0___default()(reader.result, {}, function (err, output) {
                  if (err) console.error('CSV parser failed: ', err);else resolve(output);
                });
              };
            }));

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _readFilePromise.apply(this, arguments);
}

function testCall(ev) {
  ev.preventDefault(); // Lance magic

  fetch("".concat(wpApiSettings.root, "wp/v2"), {
    method: 'get',
    headers: {
      'X-WP-Nonce': wpApiSettings.nonce,
      'Content-Type': 'application/json'
    } // body: JSON.stringify({
    //   title: 'Hello Moon',
    //   content: '',
    //   excerpt: '',
    //   status: 'publish',
    //   meta: { sku: 'asdf', product_type: 'simple', pic: '12452364' },
    // }),

  }).then(function (response) {
    return response.json().then(console.log);
  }).catch(console.log);
}

function incrementProgress(elm) {
  return elm;
}



/***/ }),

/***/ 1:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 6:
/*!***********************************!*\
  !*** multi ./src/scripts/rest.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/jake/local/fillauer/app/public/wp-content/plugins/fillauer-product-importer/src/scripts/rest.js */"./src/scripts/rest.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Jhc2U2NC1qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYnVmZmVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLXV0aWwtaXMvbGliL3V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzdi1wYXJzZS9saWIvUmVzaXplYWJsZUJ1ZmZlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3N2LXBhcnNlL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXZlbnRzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaWVlZTc1NC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaW5oZXJpdHMvaW5oZXJpdHNfYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaXNhcnJheS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvb2JqZWN0LWhhc2gvZGlzdC9vYmplY3RfaGFzaC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy1uZXh0aWNrLWFyZ3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhZGFibGUtc3RyZWFtL2R1cGxleC1icm93c2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFkYWJsZS1zdHJlYW0vbGliL19zdHJlYW1fZHVwbGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFkYWJsZS1zdHJlYW0vbGliL19zdHJlYW1fcGFzc3Rocm91Z2guanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWRhYmxlLXN0cmVhbS9saWIvX3N0cmVhbV9yZWFkYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhZGFibGUtc3RyZWFtL2xpYi9fc3RyZWFtX3RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhZGFibGUtc3RyZWFtL2xpYi9fc3RyZWFtX3dyaXRhYmxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFkYWJsZS1zdHJlYW0vbGliL2ludGVybmFsL3N0cmVhbXMvQnVmZmVyTGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhZGFibGUtc3RyZWFtL2xpYi9pbnRlcm5hbC9zdHJlYW1zL2Rlc3Ryb3kuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWRhYmxlLXN0cmVhbS9saWIvaW50ZXJuYWwvc3RyZWFtcy9zdHJlYW0tYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhZGFibGUtc3RyZWFtL25vZGVfbW9kdWxlcy9zYWZlLWJ1ZmZlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhZGFibGUtc3RyZWFtL3Bhc3N0aHJvdWdoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFkYWJsZS1zdHJlYW0vcmVhZGFibGUtYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhZGFibGUtc3RyZWFtL3RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhZGFibGUtc3RyZWFtL3dyaXRhYmxlLWJyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NhZmUtYnVmZmVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zZXRpbW1lZGlhdGUvc2V0SW1tZWRpYXRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHJlYW0tYnJvd3NlcmlmeS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3RyaW5nX2RlY29kZXIvbGliL3N0cmluZ19kZWNvZGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90aW1lcnMtYnJvd3NlcmlmeS9tYWluLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91dGlsLWRlcHJlY2F0ZS9icm93c2VyLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZmllbGRzLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2ZpbHRlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvcmVzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy91dGlscy5qcyIsIndlYnBhY2s6Ly8vdXRpbCAoaWdub3JlZCkiLCJ3ZWJwYWNrOi8vL3V0aWwgKGlnbm9yZWQpPzM2ZDYiXSwibmFtZXMiOlsiZiIsInR5cGUiLCJuYW1lIiwic2t1IiwicGljIiwiY2F0IiwidGFnIiwiZGVzYyIsInNob3J0X2Rlc2MiLCJ2aXNpYmlsaXR5IiwicGFja2FnZSIsInRpdGxlIiwiYXR0ciIsIm1vZGVsIiwic2t1cyIsInByb2RfaW5mbyIsImltYWdlIiwiaW5kZW50Iiwid2FycmFudHlMaXN0Iiwid2FycmFudHlCb2R5Iiwib3JkZXJJbmZvIiwiZmVhdHMiLCJyZWxhdGVkIiwiaW5kaWN0IiwiZG93bnMiLCJtYWluX21vZGVsIiwicG5mIiwiYl9TcGVjc1N0YXJ0IiwiYl9TcGVjc0VuZCIsImZpbmRTcGVjQm91bmRzIiwiYXR0clJvdyIsInN0YXJ0ZWQiLCJtYXAiLCJ2YWwiLCJpbmQiLCJmaWx0ZXIiLCJmaW5kU3BlY0ljb25zIiwicm93IiwiaWNvbnMiLCJpbmNsdWRlcyIsIndpbmRvdyIsImFsZXJ0IiwiY29tcHV0ZUNoZWNrc3VtIiwicHJvZHMiLCJPYmplY3QiLCJ2YWx1ZXMiLCJwcm9kIiwiY2hlY2tzdW0iLCJoYXNoIiwiY29uc29sZSIsImxvZyIsImZpbHRlckV4aXN0aW5nIiwiZGF0YSIsImV4aXN0aW5nSGFzaGVzIiwiZm9yRWFjaCIsIldQcHJvZCIsIm1ldGEiLCJQSUMiLCJpZCIsIlN0cmluZyIsInByb2R1Y3RfaGFzaCIsImNvbXBhcmVIYXNoZXNGb3JQYXlsb2FkIiwibmV3UHJvZHMiLCJleGlzdGluZyIsImZvcmNpbmciLCJrZXlzIiwidG9EZWxldGUiLCJ0b1Bvc3QiLCJ0b1VwZGF0ZSIsIm5ld1BpY3MiLCJpZ25vcmluZ04iLCJwdXNoIiwibGVuZ3RoIiwia2V5QnlQSUMiLCJQcm9kQnlQSUMiLCJzcGxpdEFuZFZlcmlmeSIsImNvbW1hU2VwYXJhdGVkIiwicnYiLCJzcGxpdCIsInRyaW0iLCJidWlsZFBhY2thZ2VPYmoiLCJwYWNrYWdlcyIsInNwbGljZSIsInVuZGVmaW5lZCIsImxpbmtWYXJpYXRpb25zIiwicGFyZW50cyIsInZhcmllcyIsInZhcmlhdGlvbnMiLCJzcGVjcyIsInZhck4iLCJsaW5rUGFja2FnZXMiLCJwYWNrcyIsImRyb3AiLCJsYWJlbCIsInByb2R1Y3RfaW5mbyIsInZhcnkiLCJ2YXJ5SW1hZ2UiLCJ2ZXJpZnlGaWVsZHMiLCJ2ZXJpZnlGaWxlcyIsInBhcmVudEZpbGVIYW5kbGVyIiwidmFyaWF0aW9uRmlsZUhhbmRsZXIiLCJwYWNrYWdlRmlsZUhhbmRsZXIiLCJidWlsZFNwZWMiLCJzdGFydCIsImVuZCIsImljb24iLCJzcGVjIiwicmVwbGFjZSIsImZlYXR1cmVkIiwidmFyaWF0aW9uU2xpY2UiLCJ2YXJ5UGFjayIsImkiLCJsYWJlbHMiLCJnZXRFeGlzdGluZ1Byb2R1Y3RzIiwicGFnZXMiLCJjcm50UGFnZSIsInBhZ2VzTiIsImZldGNoIiwid3BBcGlTZXR0aW5ncyIsInJvb3QiLCJ0aGVuIiwicmVzIiwiaGVhZGVycyIsImdldCIsImpzb24iLCJjYXRjaCIsImVycm9yIiwiZXJyIiwiZGVsZXRlUHJvZHVjdCIsInBvc3RJRCIsInZlcmJvc2UiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIm1ldGhvZCIsIm5vbmNlIiwiZGVsZXRlUHJvZHVjdHMiLCJzdGF0dXNlRWxtIiwicmVzcG9uc2VzIiwidGV4dENvbnRlbnQiLCJsYXN0RGVsZXRlIiwiUE9TVHByb2R1Y3QiLCJ1cGRhdGVJRCIsInBheWxvYWQiLCJjb250ZW50IiwiZXhjZXJwdCIsInN0YXR1cyIsInRlcm1zIiwiU0tVIiwib3JkZXJpbmdfaW5mbyIsInByb2R1Y3RfdHlwZSIsInBhcnRfbnVtYmVyX2ZpbmRlciIsImdhbGxlcnkiLCJ3YXJyYW50eSIsImZlYXR1cmVzIiwiaW5kaWNhdGlvbnMiLCJkb3dubG9hZHMiLCJ1cmwiLCJmZXRjaGVyIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJQT1NUdmFyaWF0aW9ucyIsImluY3JlbWVudFByb2dyZXNzIiwiUE9TVGlkIiwiZGVwdGgiLCJQT1NUcHJvZHVjdHMiLCJ0b0NyZWF0ZSIsInN0YXR1c0VsbSIsIk5wcm9kIiwiZmluaXNoZWQiLCJwcm9kRGF0YSIsImN1cnJlbnRQcm9kdWN0IiwicHJvZElEIiwib2JqIiwiZm9yZ2l2aW5nIiwicmVhZEZpbGVQcm9taXNlIiwiZmlsZUhhbmRsZXIiLCJyZWFkZXIiLCJGaWxlUmVhZGVyIiwicmVhZEFzVGV4dCIsIm9uZXJyb3IiLCJhYm9ydCIsIkRPTUV4Y2VwdGlvbiIsIm9ubG9hZCIsImNzdiIsInJlc3VsdCIsIm91dHB1dCIsInRlc3RDYWxsIiwiZXYiLCJwcmV2ZW50RGVmYXVsdCIsInJlc3BvbnNlIiwiZWxtIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNB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QUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsVUFBVTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsWUFBWTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLHVDQUF1QyxTQUFTO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsaUJBQWlCO0FBQ2hDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxpQkFBaUI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELEVBQUU7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGVBQWU7QUFDdkM7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0Esd0JBQXdCLFFBQVE7QUFDaEM7QUFDQSxxQkFBcUIsZUFBZTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsWUFBWTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLFNBQVM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHFCQUFxQixTQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHFCQUFxQixTQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixrQkFBa0I7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLG1CQUFtQixjQUFjO0FBQ2pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQsT0FBTztBQUM5RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdURBQXVELE9BQU87QUFDOUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCO0FBQ2xCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCLFFBQVE7QUFDN0I7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLGVBQWUsU0FBUztBQUN4QjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixTQUFTO0FBQzVCO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGlCQUFpQjtBQUNoQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixZQUFZO0FBQzdCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUIsZ0JBQWdCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGdCQUFnQjtBQUNqQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsWUFBWTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzV2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtB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Q0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ3IvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLHNCQUFzQjtBQUN2Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxtQkFBbUIsU0FBUztBQUM1QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUIsc0JBQXNCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQSxpQ0FBaUMsUUFBUTtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGlCQUFpQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLHNDQUFzQyxRQUFRO0FBQzlDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUIsT0FBTztBQUN4QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxRQUFRLHlCQUF5QjtBQUNqQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQixnQkFBZ0I7QUFDakM7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQy9iQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUSxXQUFXOztBQUVuQjtBQUNBO0FBQ0E7QUFDQSxRQUFRLFdBQVc7O0FBRW5CO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxRQUFRLFdBQVc7O0FBRW5CO0FBQ0E7QUFDQSxRQUFRLFVBQVU7O0FBRWxCO0FBQ0E7Ozs7Ozs7Ozs7OztBQ25GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMxQkEsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ0pBLHFDQUFhLEdBQUcsSUFBd0Isb0JBQW9CLEtBQUssVUFBMEwsQ0FBQyxZQUFZLHlCQUF5QixnQkFBZ0IsVUFBVSxVQUFVLDBDQUEwQyxnQkFBZ0IsT0FBQyxPQUFPLG9CQUFvQiw4Q0FBOEMsWUFBWSxZQUFZLG1DQUFtQyxpQkFBaUIsZUFBZSxzQkFBc0Isb0JBQW9CLGtEQUFrRCxXQUFXLFlBQVksU0FBUyxFQUFFLG1CQUFtQiw2QkFBNkIsYUFBYSxrQkFBa0IsZ0JBQWdCLHFCQUFxQixNQUFNLDhEQUE4RCxvREFBb0QsdUNBQXVDLHFFQUFxRSxlQUFlLHFEQUFxRCxhQUFhLGlDQUFpQyxZQUFZLG9CQUFvQixZQUFZLGlEQUFpRCxFQUFFLG1CQUFtQixZQUFZLCtCQUErQixFQUFFLHVCQUF1QixZQUFZLGdEQUFnRCxHQUFHLHVEQUF1RCxzQkFBc0IseUNBQXlDLGdCQUFnQixRQUFRLFNBQVMscWxCQUFxbEIsWUFBWSxXQUFXLHVFQUF1RSw4SEFBOEgsd0pBQXdKLFNBQVMsY0FBYyxpQ0FBaUMsMkNBQTJDLHNCQUFzQiw4Q0FBOEMsa0JBQWtCLFFBQVEsY0FBYyxxREFBcUQsT0FBTyxxQkFBcUIsOEJBQThCLGVBQWUsMkNBQTJDLHFCQUFxQixxRUFBcUUsNkNBQTZDLE1BQU0sZ0VBQWdFLDRFQUE0RSxpQ0FBaUMscUJBQXFCLHNKQUFzSix3QkFBd0IsNkJBQTZCLFdBQVcsNkJBQTZCLDhEQUE4RCxFQUFFLGlCQUFpQix1Q0FBdUMsK0NBQStDLGVBQWUsc0JBQXNCLHNDQUFzQyxXQUFXLHlFQUF5RSxxQkFBcUIsRUFBRSw2QkFBNkIsd0JBQXdCLDhFQUE4RSxFQUFFLGdEQUFnRCxtQkFBbUIsNkJBQTZCLHFCQUFxQixpQ0FBaUMsb0JBQW9CLGdDQUFnQyxzQkFBc0IsK0JBQStCLHFCQUFxQiwwQ0FBMEMsdUJBQXVCLDZMQUE2TCxxQkFBcUIsaUNBQWlDLGtCQUFrQiw4QkFBOEIsa0JBQWtCLGlCQUFpQix1QkFBdUIsc0JBQXNCLHFCQUFxQixnQ0FBZ0MseUJBQXlCLHFFQUFxRSxnQ0FBZ0MsNEVBQTRFLHdCQUF3QixxRUFBcUUsMEJBQTBCLHNFQUFzRSx5QkFBeUIsc0VBQXNFLDBCQUEwQixzRUFBc0UseUJBQXlCLHNFQUFzRSwyQkFBMkIsdUVBQXVFLDJCQUEyQix1RUFBdUUsMEJBQTBCLDBEQUEwRCxrQkFBa0IsOEJBQThCLGtCQUFrQixVQUFVLG9CQUFvQiwyQ0FBMkMsa0JBQWtCLFVBQVUsb0JBQW9CLDJDQUEyQyxrQkFBa0Isc0NBQXNDLDJLQUEySyx1QkFBdUIsc0JBQXNCLHFCQUFxQixvQkFBb0IsbUJBQW1CLGtCQUFrQixrQkFBa0IsaUJBQWlCLGlCQUFpQixnQkFBZ0IsaUJBQWlCLGdCQUFnQixpQkFBaUIsZ0JBQWdCLHlCQUF5Qix3QkFBd0IsMkJBQTJCLDBCQUEwQix3QkFBd0IsdUJBQXVCLGtCQUFrQixpQkFBaUIscUJBQXFCLG9CQUFvQix3QkFBd0IsdUJBQXVCLHdCQUF3Qix1QkFBdUIsc0JBQXNCLHFCQUFxQixvQkFBb0IsbUJBQW1CLHFCQUFxQixvQkFBb0IscUJBQXFCLHNCQUFzQixhQUFhLE9BQU8seUJBQXlCLFlBQVksaUJBQWlCLFlBQVksaUJBQWlCLGtCQUFrQixnQ0FBZ0MsNEJBQTRCLDZCQUE2QiwwRkFBMEYsaUdBQWlHLEVBQUUsNEJBQTRCLHFCQUFxQiw2QkFBNkIsYUFBYSxhQUFhLGtNQUFrTSxjQUFjLHNCQUFzQiwrRkFBK0YsMEJBQTBCLGNBQWMsa0ZBQWtGLGVBQWUsa0dBQWtHLFFBQVEsY0FBYyxTQUFTLFFBQVEsSUFBSSxtSUFBbUkseUpBQXlKLDZCQUE2Qiw4QkFBOEIsY0FBYyxtRkFBbUYscUJBQXFCLElBQUksdUZBQXVGLFVBQVUsd0RBQXdELE1BQU0seUZBQXlGLFVBQVUsNEJBQTRCLElBQUksMEZBQTBGLHNNQUFzTSxFQUFFLG1CQUFtQixxQkFBcUIsNkJBQTZCLG9DQUFvQyxrQkFBa0IsNENBQTRDLHFCQUFxQiwrQ0FBK0Msa0RBQWtELElBQUksY0FBYyxRQUFRLHNCQUFzQix3Q0FBd0MsS0FBSyx3RkFBd0YsY0FBYyxtSkFBbUosb0JBQW9CLDZFQUE2RSxZQUFZLElBQUksZ0RBQWdELG1DQUFtQyxvREFBb0QsSUFBSSxXQUFXLFNBQVMsb0JBQW9CLHFDQUFxQyxpQkFBaUIsV0FBVyxnQ0FBZ0MsU0FBUyxXQUFXLGtCQUFrQixTQUFTLHVCQUF1QixZQUFZLElBQUksaUNBQWlDLFNBQVMsb0JBQW9CLDBJQUEwSSxpQkFBaUIsb0ZBQW9GLG9CQUFvQiwwSUFBMEksaUJBQWlCLHdMQUF3TCxvQkFBb0IsNkpBQTZKLGtCQUFrQixpQ0FBaUMsb0JBQW9CLDZKQUE2SixrQkFBa0IsMkNBQTJDLG9CQUFvQix3SUFBd0ksb0JBQW9CLHdJQUF3SSxzQkFBc0IsaUxBQWlMLGVBQWUseUNBQXlDLElBQUksOENBQThDLHNCQUFzQixzTEFBc0wsZUFBZSx5Q0FBeUMsSUFBSSwrQkFBK0Isc0JBQXNCLGlPQUFpTyxzQkFBc0IsZ1BBQWdQLHNCQUFzQix5UEFBeVAsc0JBQXNCLDJQQUEyUCw4RkFBOEYsSUFBSSw2Q0FBNkMsd0JBQXdCLFVBQVUsNkNBQTZDLFNBQVMsVUFBVSw0QkFBNEIsZ0NBQWdDLDhJQUE4SSxrQkFBa0Isd0JBQXdCLCtCQUErQiw0QkFBNEIsTUFBTSx3QkFBd0IsdUJBQXVCLE1BQU0scUNBQXFDLE1BQU0sOENBQThDLE1BQU0sMkJBQTJCLE1BQU0saUVBQWlFLE1BQU0sNENBQTRDLFNBQVMsd0JBQXdCLDhHQUE4Ryw0QkFBNEIsTUFBTSxnQ0FBZ0MsV0FBVyxtQkFBbUIsbUJBQW1CLFFBQVEsV0FBVyxLQUFLLFdBQVcsd0JBQXdCLFNBQVMscUNBQXFDLDJDQUEyQyxLQUFLLFFBQVEsWUFBWSxlQUFlLHNCQUFzQix1RUFBdUUsOEJBQThCLGVBQWUsaUJBQWlCLDZCQUE2QixlQUFlLDhDQUE4QyxZQUFZLElBQUksS0FBSyxtQ0FBbUMsMkNBQTJDLDZCQUE2QixhQUFhLE1BQU0sMkNBQTJDLHFDQUFxQyxhQUFhLE1BQU0sNEJBQTRCLE1BQU0saUNBQWlDLGtCQUFrQixhQUFhLE1BQU0saUNBQWlDLHFDQUFxQyxhQUFhLE1BQU0sd0VBQXdFLHFDQUFxQyx1QkFBdUIsV0FBVyx5REFBeUQsU0FBUyxXQUFXLGFBQWEsTUFBTSw0Q0FBNEMsU0FBUyxzQ0FBc0MsYUFBYSxxR0FBcUcsVUFBVSw0QkFBNEIsZUFBZSxpQkFBaUIsc0JBQXNCLGlCQUFpQixJQUFJLGVBQWUsU0FBUyxRQUFRLE1BQU0seUNBQXlDLGNBQWMsdUJBQXVCLFlBQVksSUFBSSxnRkFBZ0YsY0FBYyxRQUFRLE1BQU0sdUJBQXVCLE1BQU0sK0JBQStCLGdCQUFnQixRQUFRLE1BQU0sK0JBQStCLDRFQUE0RSxRQUFRLE1BQU0sc0VBQXNFLGdDQUFnQyxXQUFXLDZDQUE2QyxTQUFTLFFBQVEsTUFBTSw0Q0FBNEMsU0FBUywrQkFBK0IsT0FBTyxrRUFBa0Usb0NBQW9DLGlGQUFpRix1UEFBdVAsVUFBVSx5Q0FBeUMsSUFBSSxxQkFBcUIscUNBQXFDLGlDQUFpQyxrQkFBa0IsaUZBQWlGLHVDQUF1QyxJQUFJLG1CQUFtQixTQUFTLDZCQUE2QixrR0FBa0csK0JBQStCLHFHQUFxRyxxQ0FBcUMsNEhBQTRILHdDQUF3QyxzQkFBc0Isd0NBQXdDLHNCQUFzQix3Q0FBd0Msc0JBQXNCLHdDQUF3QyxzQkFBc0Isb0NBQW9DLDJKQUEySix1Q0FBdUMsc0JBQXNCLHVDQUF1QyxzQkFBc0IsdUNBQXVDLHNCQUFzQix1Q0FBdUMsc0JBQXNCLHVDQUF1QyxzQkFBc0IsdUNBQXVDLHNCQUFzQix3Q0FBd0Msc0JBQXNCLHdDQUF3QyxzQkFBc0Isd0NBQXdDLHlKQUF5SiwyQ0FBMkMsaUJBQWlCLDJDQUEyQyxpQkFBaUIsMkNBQTJDLGlCQUFpQiwyQ0FBMkMsaUJBQWlCLHVDQUF1Qyw2TUFBNk0sMENBQTBDLGlCQUFpQiwwQ0FBMEMsaUJBQWlCLDBDQUEwQyxpQkFBaUIsMENBQTBDLGlCQUFpQiwwQ0FBMEMsaUJBQWlCLDBDQUEwQyxpQkFBaUIsMkNBQTJDLGlCQUFpQiwyQ0FBMkMsaUJBQWlCLGtDQUFrQyxpTEFBaUwseUZBQXlGLFlBQVksSUFBSSxlQUFlLGdDQUFnQywrQkFBK0IsSUFBSSxnREFBZ0QsYUFBYSxNQUFNLGlDQUFpQyxzQ0FBc0Msd0dBQXdHLCtDQUErQyxxREFBcUQsSUFBSSxrQkFBa0IsaUJBQWlCLGtCQUFrQixrQkFBa0IsNkRBQTZELGNBQWMsZ0NBQWdDLGNBQWMsa0NBQWtDLDJEQUEyRCxLQUFLLGNBQWMsOENBQThDLGNBQWMsaUJBQWlCLFdBQVcsS0FBSyxzQkFBc0Isa0NBQWtDLEtBQUssUUFBUSx3QkFBd0Isc0VBQXNFLFdBQVcsK0JBQStCLFNBQVMsY0FBYyx3QkFBd0Isb0JBQW9CLFlBQVksbUNBQW1DLGdCQUFnQixTQUFTLGNBQWMsSUFBSSw2QkFBNkIsU0FBUyxtQ0FBbUMsZ0JBQWdCLCtPQUErTyxrQkFBa0IsMk5BQTJOLGtCQUFrQixtS0FBbUssZ0JBQWdCLDZDQUE2Qyx1QkFBdUIsK2lDQUEraUMsMEZBQTBGLDBMQUEwTCxFQUFFLDRDQUE0QyxxQkFBcUIsNkJBQTZCLHFCQUFxQixtQkFBbUIsVUFBVSxXQUFXLHVCQUF1QixtREFBbUQseURBQXlELFdBQVcsMEJBQTBCLFNBQVMsaUJBQWlCLGtCQUFrQiw4QkFBOEIsb0JBQW9CLGlEQUFpRCxXQUFXLHlCQUF5QixTQUFTLHlCQUF5QiwwRkFBMEYsa05BQWtOLEVBQUUsbUJBQW1CLHFCQUFxQiw2QkFBNkIscUJBQXFCLGlEQUFpRCwrQkFBK0IsaUJBQWlCLGdCQUFnQiwwQkFBMEIsb0RBQW9ELG1CQUFtQiwyREFBMkQsb0JBQW9CLHNDQUFzQyw0R0FBNEcsa0NBQWtDLElBQUksOEJBQThCLHlCQUF5QiwwQkFBMEIsYUFBYSxrQ0FBa0MsYUFBYSx5Q0FBeUMsNEdBQTRHLG1DQUFtQyxZQUFZLDRCQUE0QixjQUFjLDZCQUE2QixrQ0FBa0MsSUFBSSxnQ0FBZ0MsU0FBUyxNQUFNLGVBQWUseUJBQXlCLGtLQUFrSyxnQkFBZ0Isd0NBQXdDLEVBQUUsMEZBQTBGLGdOQUFnTixFQUFFLDhEQUE4RCxxQkFBcUIsNkJBQTZCLHFCQUFxQixnQkFBZ0IseUNBQXlDLGdFQUFnRSxXQUFXLE9BQU8sb0JBQW9CLGtpRUFBa2lFLHNCQUFzQix3QkFBd0IsdUJBQXVCLHFCQUFxQix3QkFBd0IsMEJBQTBCLDZCQUE2QiwwQkFBMEIsNkJBQTZCLDBCQUEwQiwwQkFBMEIsMEJBQTBCLDZCQUE2QixnQkFBZ0IsMEJBQTBCLDBDQUEwQyxzQkFBc0IsdUJBQXVCLDBGQUEwRiw4TUFBOE0sRUFBRSxpQ0FBaUMscUJBQXFCLDZCQUE2QixZQUFZLFFBQVEsY0FBYyw2QkFBNkIsSUFBSSxtRUFBbUUsU0FBUyxxREFBcUQsd0JBQXdCLG1DQUFtQyxpQkFBaUIsR0FBRywwRkFBMEYsOE1BQThNLEVBQUUsbUJBQW1CLHFCQUFxQiw2QkFBNkIscUJBQXFCLGdCQUFnQiwyQ0FBMkMsNEZBQTRGLFdBQVcsT0FBTyxnQ0FBZ0MsS0FBSyxLQUFLLG9EQUFvRCwyR0FBMkcsMEJBQTBCLDZDQUE2Qyx3QkFBd0Isb0JBQW9CLHVEQUF1RCxnQkFBZ0IsMEJBQTBCLDBDQUEwQyxnQkFBZ0IscUJBQXFCLHNCQUFzQiwwQkFBMEIsMEZBQTBGLDhNQUE4TSxFQUFFLGlDQUFpQyxxQkFBcUIsNkJBQTZCLGdCQUFnQiwwQkFBMEIsMENBQTBDLGdCQUFnQixxQkFBcUIsZ0JBQWdCLGFBQWEsZ0JBQWdCLHkxQkFBeTFCLDJDQUEyQyxZQUFZLFdBQVcsT0FBTyx3REFBd0QsWUFBWSxLQUFLLGtSQUFrUix3SEFBd0gsU0FBUyxxQkFBcUIsc0JBQXNCLDBCQUEwQiwwRkFBMEYsaU5BQWlOLEVBQUUsaUNBQWlDLHNCQUFzQiw2QkFBNkIsY0FBYyxlQUFlLHNCQUFzQixnSUFBZ0ksd0JBQXdCLCtCQUErQixNQUFNLFNBQVMscURBQXFELGVBQWUsNkZBQTZGLGlCQUFpQixrREFBa0QsbUJBQW1CLGlCQUFpQiwwQ0FBMEMsNEhBQTRILG9EQUFvRCxrQkFBa0IsVUFBVSxxQkFBcUIsbURBQW1ELDBGQUEwRiw4TEFBOEwsRUFBRSxtQkFBbUIsc0JBQXNCLDZCQUE2QiwyQkFBMkIscUVBQXFFLG1DQUFtQyxJQUFJLDBCQUEwQiw4QkFBOEIsSUFBSSwwQkFBMEIsZUFBZSxLQUFLLG1DQUFtQyxzQkFBc0IsaUNBQWlDLCtCQUErQiw0SEFBNEgsbVJBQW1SLEtBQUssK0JBQStCLGtCQUFrQixJQUFJLCtCQUErQixpQkFBaUIsMEZBQTBGLGtJQUFrSSxFQUFFLG1CQUFtQixFQUFFLEdBQUcsU0FBUyxFOzs7Ozs7Ozs7Ozs7QUNBL3prQywrQ0FBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQixDQUFDO0FBQ0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUMzQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFDQUFxQzs7QUFFckM7QUFDQTtBQUNBOztBQUVBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsVUFBVTs7Ozs7Ozs7Ozs7O0FDdkx0QyxpQkFBaUIsbUJBQU8sQ0FBQyxxRkFBeUI7Ozs7Ozs7Ozs7Ozs7QUNBbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYjs7QUFFQSxVQUFVLG1CQUFPLENBQUMsMEVBQXNCO0FBQ3hDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLFdBQVcsbUJBQU8sQ0FBQyw2REFBYztBQUNqQyxnQkFBZ0IsbUJBQU8sQ0FBQyw2REFBVTtBQUNsQzs7QUFFQSxlQUFlLG1CQUFPLENBQUMsa0ZBQW9CO0FBQzNDLGVBQWUsbUJBQU8sQ0FBQyxrRkFBb0I7O0FBRTNDOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixpQkFBaUI7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEU7Ozs7Ozs7Ozs7OztBQ2xJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYjs7QUFFQSxnQkFBZ0IsbUJBQU8sQ0FBQyxvRkFBcUI7O0FBRTdDO0FBQ0EsV0FBVyxtQkFBTyxDQUFDLDZEQUFjO0FBQ2pDLGdCQUFnQixtQkFBTyxDQUFDLDZEQUFVO0FBQ2xDOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWI7O0FBRUEsVUFBVSxtQkFBTyxDQUFDLDBFQUFzQjtBQUN4Qzs7QUFFQTs7QUFFQTtBQUNBLGNBQWMsbUJBQU8sQ0FBQyxnREFBUztBQUMvQjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxTQUFTLG1CQUFPLENBQUMsK0NBQVE7O0FBRXpCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBYSxtQkFBTyxDQUFDLHdHQUEyQjtBQUNoRDs7QUFFQTs7QUFFQSxhQUFhLG1CQUFPLENBQUMscUZBQWE7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxXQUFXLG1CQUFPLENBQUMsNkRBQWM7QUFDakMsZ0JBQWdCLG1CQUFPLENBQUMsNkRBQVU7QUFDbEM7O0FBRUE7QUFDQSxnQkFBZ0IsbUJBQU8sQ0FBQyxhQUFNO0FBQzlCO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLG1CQUFPLENBQUMsd0dBQStCO0FBQ3hELGtCQUFrQixtQkFBTyxDQUFDLGtHQUE0QjtBQUN0RDs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlFQUF5RSw2RUFBNkU7QUFDdEo7O0FBRUE7QUFDQSxxQkFBcUIsbUJBQU8sQ0FBQyw4RUFBa0I7O0FBRS9DOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpREFBaUQsMEZBQTBGOztBQUUzSTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLG1CQUFPLENBQUMsNEVBQWlCO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EscUJBQXFCLG1CQUFPLENBQUMsOEVBQWtCOztBQUUvQzs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0dBQWtHO0FBQ2xHLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSw0RkFBNEY7QUFDNUYsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsZ0RBQWdEOztBQUVoRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNDQUFzQyxtQkFBTyxDQUFDLDRFQUFpQjtBQUMvRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRFQUE0RTtBQUM1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkRBQTZEO0FBQzdEO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQ0FBc0M7O0FBRXRDO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3REFBd0Q7QUFDeEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsNENBQTRDOztBQUU1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQkFBb0I7O0FBRXBCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLFNBQVM7QUFDNUI7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDRFQUE0RTs7QUFFNUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLHlCQUF5QjtBQUMxQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtREFBbUQ7QUFDbkQ7QUFDQSxtREFBbUQsaUVBQWlFO0FBQ3BIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnQ0FBZ0MsT0FBTztBQUN2QztBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7Ozs7O0FDMS9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLFlBQVk7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUVi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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTCxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQkFBcUIsbUJBQU8sQ0FBQyw4RUFBa0I7O0FBRS9DO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQ0FBaUM7O0FBRWpDOztBQUVBLDJDQUEyQztBQUMzQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1EO0FBQ25EO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLG9EQUFvRDtBQUNwRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtB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bUJBQU8sQ0FBQyxxRkFBZ0M7O0FBRTdEO0FBQ0E7Ozs7QUFJQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDOUhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWI7O0FBRUEsYUFBYSxtQkFBTyxDQUFDLHdEQUFhO0FBQ2xDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsc0NBQXNDLHNDQUFzQztBQUN6RztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7QUN2U0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBLG1CQUFPLENBQUMsaUVBQWM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQzdEQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCLFdBQVcsT0FBTztBQUNsQixhQUFhLFNBQVM7QUFDdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0Q0FBNEM7O0FBRTVDOzs7Ozs7Ozs7Ozs7O0FDbkJBO0FBQUE7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ZUcyRSxLQWZILENBZVM1RSxPQUFPLENBQUNDLEdBZmpCO0FBZ0JEOztBQUVELFNBQVNpSCxpQkFBVCxDQUEyQjZCLEdBQTNCLEVBQWdDO0FBQzlCLFNBQU9BLEdBQVA7QUFDRDs7Ozs7Ozs7Ozs7OztBQ2hFRCxlOzs7Ozs7Ozs7OztBQ0FBLGUiLCJmaWxlIjoicmVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA2KTtcbiIsIid1c2Ugc3RyaWN0J1xuXG5leHBvcnRzLmJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoXG5leHBvcnRzLnRvQnl0ZUFycmF5ID0gdG9CeXRlQXJyYXlcbmV4cG9ydHMuZnJvbUJ5dGVBcnJheSA9IGZyb21CeXRlQXJyYXlcblxudmFyIGxvb2t1cCA9IFtdXG52YXIgcmV2TG9va3VwID0gW11cbnZhciBBcnIgPSB0eXBlb2YgVWludDhBcnJheSAhPT0gJ3VuZGVmaW5lZCcgPyBVaW50OEFycmF5IDogQXJyYXlcblxudmFyIGNvZGUgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLydcbmZvciAodmFyIGkgPSAwLCBsZW4gPSBjb2RlLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gIGxvb2t1cFtpXSA9IGNvZGVbaV1cbiAgcmV2TG9va3VwW2NvZGUuY2hhckNvZGVBdChpKV0gPSBpXG59XG5cbi8vIFN1cHBvcnQgZGVjb2RpbmcgVVJMLXNhZmUgYmFzZTY0IHN0cmluZ3MsIGFzIE5vZGUuanMgZG9lcy5cbi8vIFNlZTogaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQmFzZTY0I1VSTF9hcHBsaWNhdGlvbnNcbnJldkxvb2t1cFsnLScuY2hhckNvZGVBdCgwKV0gPSA2MlxucmV2TG9va3VwWydfJy5jaGFyQ29kZUF0KDApXSA9IDYzXG5cbmZ1bmN0aW9uIGdldExlbnMgKGI2NCkge1xuICB2YXIgbGVuID0gYjY0Lmxlbmd0aFxuXG4gIGlmIChsZW4gJSA0ID4gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBzdHJpbmcuIExlbmd0aCBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNCcpXG4gIH1cblxuICAvLyBUcmltIG9mZiBleHRyYSBieXRlcyBhZnRlciBwbGFjZWhvbGRlciBieXRlcyBhcmUgZm91bmRcbiAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vYmVhdGdhbW1pdC9iYXNlNjQtanMvaXNzdWVzLzQyXG4gIHZhciB2YWxpZExlbiA9IGI2NC5pbmRleE9mKCc9JylcbiAgaWYgKHZhbGlkTGVuID09PSAtMSkgdmFsaWRMZW4gPSBsZW5cblxuICB2YXIgcGxhY2VIb2xkZXJzTGVuID0gdmFsaWRMZW4gPT09IGxlblxuICAgID8gMFxuICAgIDogNCAtICh2YWxpZExlbiAlIDQpXG5cbiAgcmV0dXJuIFt2YWxpZExlbiwgcGxhY2VIb2xkZXJzTGVuXVxufVxuXG4vLyBiYXNlNjQgaXMgNC8zICsgdXAgdG8gdHdvIGNoYXJhY3RlcnMgb2YgdGhlIG9yaWdpbmFsIGRhdGFcbmZ1bmN0aW9uIGJ5dGVMZW5ndGggKGI2NCkge1xuICB2YXIgbGVucyA9IGdldExlbnMoYjY0KVxuICB2YXIgdmFsaWRMZW4gPSBsZW5zWzBdXG4gIHZhciBwbGFjZUhvbGRlcnNMZW4gPSBsZW5zWzFdXG4gIHJldHVybiAoKHZhbGlkTGVuICsgcGxhY2VIb2xkZXJzTGVuKSAqIDMgLyA0KSAtIHBsYWNlSG9sZGVyc0xlblxufVxuXG5mdW5jdGlvbiBfYnl0ZUxlbmd0aCAoYjY0LCB2YWxpZExlbiwgcGxhY2VIb2xkZXJzTGVuKSB7XG4gIHJldHVybiAoKHZhbGlkTGVuICsgcGxhY2VIb2xkZXJzTGVuKSAqIDMgLyA0KSAtIHBsYWNlSG9sZGVyc0xlblxufVxuXG5mdW5jdGlvbiB0b0J5dGVBcnJheSAoYjY0KSB7XG4gIHZhciB0bXBcbiAgdmFyIGxlbnMgPSBnZXRMZW5zKGI2NClcbiAgdmFyIHZhbGlkTGVuID0gbGVuc1swXVxuICB2YXIgcGxhY2VIb2xkZXJzTGVuID0gbGVuc1sxXVxuXG4gIHZhciBhcnIgPSBuZXcgQXJyKF9ieXRlTGVuZ3RoKGI2NCwgdmFsaWRMZW4sIHBsYWNlSG9sZGVyc0xlbikpXG5cbiAgdmFyIGN1ckJ5dGUgPSAwXG5cbiAgLy8gaWYgdGhlcmUgYXJlIHBsYWNlaG9sZGVycywgb25seSBnZXQgdXAgdG8gdGhlIGxhc3QgY29tcGxldGUgNCBjaGFyc1xuICB2YXIgbGVuID0gcGxhY2VIb2xkZXJzTGVuID4gMFxuICAgID8gdmFsaWRMZW4gLSA0XG4gICAgOiB2YWxpZExlblxuXG4gIHZhciBpXG4gIGZvciAoaSA9IDA7IGkgPCBsZW47IGkgKz0gNCkge1xuICAgIHRtcCA9XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkpXSA8PCAxOCkgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldIDw8IDEyKSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAyKV0gPDwgNikgfFxuICAgICAgcmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAzKV1cbiAgICBhcnJbY3VyQnl0ZSsrXSA9ICh0bXAgPj4gMTYpICYgMHhGRlxuICAgIGFycltjdXJCeXRlKytdID0gKHRtcCA+PiA4KSAmIDB4RkZcbiAgICBhcnJbY3VyQnl0ZSsrXSA9IHRtcCAmIDB4RkZcbiAgfVxuXG4gIGlmIChwbGFjZUhvbGRlcnNMZW4gPT09IDIpIHtcbiAgICB0bXAgPVxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMikgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldID4+IDQpXG4gICAgYXJyW2N1ckJ5dGUrK10gPSB0bXAgJiAweEZGXG4gIH1cblxuICBpZiAocGxhY2VIb2xkZXJzTGVuID09PSAxKSB7XG4gICAgdG1wID1cbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDEwKSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAxKV0gPDwgNCkgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMildID4+IDIpXG4gICAgYXJyW2N1ckJ5dGUrK10gPSAodG1wID4+IDgpICYgMHhGRlxuICAgIGFycltjdXJCeXRlKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIGFyclxufVxuXG5mdW5jdGlvbiB0cmlwbGV0VG9CYXNlNjQgKG51bSkge1xuICByZXR1cm4gbG9va3VwW251bSA+PiAxOCAmIDB4M0ZdICtcbiAgICBsb29rdXBbbnVtID4+IDEyICYgMHgzRl0gK1xuICAgIGxvb2t1cFtudW0gPj4gNiAmIDB4M0ZdICtcbiAgICBsb29rdXBbbnVtICYgMHgzRl1cbn1cblxuZnVuY3Rpb24gZW5jb2RlQ2h1bmsgKHVpbnQ4LCBzdGFydCwgZW5kKSB7XG4gIHZhciB0bXBcbiAgdmFyIG91dHB1dCA9IFtdXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSArPSAzKSB7XG4gICAgdG1wID1cbiAgICAgICgodWludDhbaV0gPDwgMTYpICYgMHhGRjAwMDApICtcbiAgICAgICgodWludDhbaSArIDFdIDw8IDgpICYgMHhGRjAwKSArXG4gICAgICAodWludDhbaSArIDJdICYgMHhGRilcbiAgICBvdXRwdXQucHVzaCh0cmlwbGV0VG9CYXNlNjQodG1wKSlcbiAgfVxuICByZXR1cm4gb3V0cHV0LmpvaW4oJycpXG59XG5cbmZ1bmN0aW9uIGZyb21CeXRlQXJyYXkgKHVpbnQ4KSB7XG4gIHZhciB0bXBcbiAgdmFyIGxlbiA9IHVpbnQ4Lmxlbmd0aFxuICB2YXIgZXh0cmFCeXRlcyA9IGxlbiAlIDMgLy8gaWYgd2UgaGF2ZSAxIGJ5dGUgbGVmdCwgcGFkIDIgYnl0ZXNcbiAgdmFyIHBhcnRzID0gW11cbiAgdmFyIG1heENodW5rTGVuZ3RoID0gMTYzODMgLy8gbXVzdCBiZSBtdWx0aXBsZSBvZiAzXG5cbiAgLy8gZ28gdGhyb3VnaCB0aGUgYXJyYXkgZXZlcnkgdGhyZWUgYnl0ZXMsIHdlJ2xsIGRlYWwgd2l0aCB0cmFpbGluZyBzdHVmZiBsYXRlclxuICBmb3IgKHZhciBpID0gMCwgbGVuMiA9IGxlbiAtIGV4dHJhQnl0ZXM7IGkgPCBsZW4yOyBpICs9IG1heENodW5rTGVuZ3RoKSB7XG4gICAgcGFydHMucHVzaChlbmNvZGVDaHVuayhcbiAgICAgIHVpbnQ4LCBpLCAoaSArIG1heENodW5rTGVuZ3RoKSA+IGxlbjIgPyBsZW4yIDogKGkgKyBtYXhDaHVua0xlbmd0aClcbiAgICApKVxuICB9XG5cbiAgLy8gcGFkIHRoZSBlbmQgd2l0aCB6ZXJvcywgYnV0IG1ha2Ugc3VyZSB0byBub3QgZm9yZ2V0IHRoZSBleHRyYSBieXRlc1xuICBpZiAoZXh0cmFCeXRlcyA9PT0gMSkge1xuICAgIHRtcCA9IHVpbnQ4W2xlbiAtIDFdXG4gICAgcGFydHMucHVzaChcbiAgICAgIGxvb2t1cFt0bXAgPj4gMl0gK1xuICAgICAgbG9va3VwWyh0bXAgPDwgNCkgJiAweDNGXSArXG4gICAgICAnPT0nXG4gICAgKVxuICB9IGVsc2UgaWYgKGV4dHJhQnl0ZXMgPT09IDIpIHtcbiAgICB0bXAgPSAodWludDhbbGVuIC0gMl0gPDwgOCkgKyB1aW50OFtsZW4gLSAxXVxuICAgIHBhcnRzLnB1c2goXG4gICAgICBsb29rdXBbdG1wID4+IDEwXSArXG4gICAgICBsb29rdXBbKHRtcCA+PiA0KSAmIDB4M0ZdICtcbiAgICAgIGxvb2t1cFsodG1wIDw8IDIpICYgMHgzRl0gK1xuICAgICAgJz0nXG4gICAgKVxuICB9XG5cbiAgcmV0dXJuIHBhcnRzLmpvaW4oJycpXG59XG4iLCIvKiFcbiAqIFRoZSBidWZmZXIgbW9kdWxlIGZyb20gbm9kZS5qcywgZm9yIHRoZSBicm93c2VyLlxuICpcbiAqIEBhdXRob3IgICBGZXJvc3MgQWJvdWtoYWRpamVoIDxmZXJvc3NAZmVyb3NzLm9yZz4gPGh0dHA6Ly9mZXJvc3Mub3JnPlxuICogQGxpY2Vuc2UgIE1JVFxuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wcm90byAqL1xuXG4ndXNlIHN0cmljdCdcblxudmFyIGJhc2U2NCA9IHJlcXVpcmUoJ2Jhc2U2NC1qcycpXG52YXIgaWVlZTc1NCA9IHJlcXVpcmUoJ2llZWU3NTQnKVxudmFyIGlzQXJyYXkgPSByZXF1aXJlKCdpc2FycmF5JylcblxuZXhwb3J0cy5CdWZmZXIgPSBCdWZmZXJcbmV4cG9ydHMuU2xvd0J1ZmZlciA9IFNsb3dCdWZmZXJcbmV4cG9ydHMuSU5TUEVDVF9NQVhfQllURVMgPSA1MFxuXG4vKipcbiAqIElmIGBCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVGA6XG4gKiAgID09PSB0cnVlICAgIFVzZSBVaW50OEFycmF5IGltcGxlbWVudGF0aW9uIChmYXN0ZXN0KVxuICogICA9PT0gZmFsc2UgICBVc2UgT2JqZWN0IGltcGxlbWVudGF0aW9uIChtb3N0IGNvbXBhdGlibGUsIGV2ZW4gSUU2KVxuICpcbiAqIEJyb3dzZXJzIHRoYXQgc3VwcG9ydCB0eXBlZCBhcnJheXMgYXJlIElFIDEwKywgRmlyZWZveCA0KywgQ2hyb21lIDcrLCBTYWZhcmkgNS4xKyxcbiAqIE9wZXJhIDExLjYrLCBpT1MgNC4yKy5cbiAqXG4gKiBEdWUgdG8gdmFyaW91cyBicm93c2VyIGJ1Z3MsIHNvbWV0aW1lcyB0aGUgT2JqZWN0IGltcGxlbWVudGF0aW9uIHdpbGwgYmUgdXNlZCBldmVuXG4gKiB3aGVuIHRoZSBicm93c2VyIHN1cHBvcnRzIHR5cGVkIGFycmF5cy5cbiAqXG4gKiBOb3RlOlxuICpcbiAqICAgLSBGaXJlZm94IDQtMjkgbGFja3Mgc3VwcG9ydCBmb3IgYWRkaW5nIG5ldyBwcm9wZXJ0aWVzIHRvIGBVaW50OEFycmF5YCBpbnN0YW5jZXMsXG4gKiAgICAgU2VlOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD02OTU0MzguXG4gKlxuICogICAtIENocm9tZSA5LTEwIGlzIG1pc3NpbmcgdGhlIGBUeXBlZEFycmF5LnByb3RvdHlwZS5zdWJhcnJheWAgZnVuY3Rpb24uXG4gKlxuICogICAtIElFMTAgaGFzIGEgYnJva2VuIGBUeXBlZEFycmF5LnByb3RvdHlwZS5zdWJhcnJheWAgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyBhcnJheXMgb2ZcbiAqICAgICBpbmNvcnJlY3QgbGVuZ3RoIGluIHNvbWUgc2l0dWF0aW9ucy5cblxuICogV2UgZGV0ZWN0IHRoZXNlIGJ1Z2d5IGJyb3dzZXJzIGFuZCBzZXQgYEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUYCB0byBgZmFsc2VgIHNvIHRoZXlcbiAqIGdldCB0aGUgT2JqZWN0IGltcGxlbWVudGF0aW9uLCB3aGljaCBpcyBzbG93ZXIgYnV0IGJlaGF2ZXMgY29ycmVjdGx5LlxuICovXG5CdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCA9IGdsb2JhbC5UWVBFRF9BUlJBWV9TVVBQT1JUICE9PSB1bmRlZmluZWRcbiAgPyBnbG9iYWwuVFlQRURfQVJSQVlfU1VQUE9SVFxuICA6IHR5cGVkQXJyYXlTdXBwb3J0KClcblxuLypcbiAqIEV4cG9ydCBrTWF4TGVuZ3RoIGFmdGVyIHR5cGVkIGFycmF5IHN1cHBvcnQgaXMgZGV0ZXJtaW5lZC5cbiAqL1xuZXhwb3J0cy5rTWF4TGVuZ3RoID0ga01heExlbmd0aCgpXG5cbmZ1bmN0aW9uIHR5cGVkQXJyYXlTdXBwb3J0ICgpIHtcbiAgdHJ5IHtcbiAgICB2YXIgYXJyID0gbmV3IFVpbnQ4QXJyYXkoMSlcbiAgICBhcnIuX19wcm90b19fID0ge19fcHJvdG9fXzogVWludDhBcnJheS5wcm90b3R5cGUsIGZvbzogZnVuY3Rpb24gKCkgeyByZXR1cm4gNDIgfX1cbiAgICByZXR1cm4gYXJyLmZvbygpID09PSA0MiAmJiAvLyB0eXBlZCBhcnJheSBpbnN0YW5jZXMgY2FuIGJlIGF1Z21lbnRlZFxuICAgICAgICB0eXBlb2YgYXJyLnN1YmFycmF5ID09PSAnZnVuY3Rpb24nICYmIC8vIGNocm9tZSA5LTEwIGxhY2sgYHN1YmFycmF5YFxuICAgICAgICBhcnIuc3ViYXJyYXkoMSwgMSkuYnl0ZUxlbmd0aCA9PT0gMCAvLyBpZTEwIGhhcyBicm9rZW4gYHN1YmFycmF5YFxuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuZnVuY3Rpb24ga01heExlbmd0aCAoKSB7XG4gIHJldHVybiBCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVFxuICAgID8gMHg3ZmZmZmZmZlxuICAgIDogMHgzZmZmZmZmZlxufVxuXG5mdW5jdGlvbiBjcmVhdGVCdWZmZXIgKHRoYXQsIGxlbmd0aCkge1xuICBpZiAoa01heExlbmd0aCgpIDwgbGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0ludmFsaWQgdHlwZWQgYXJyYXkgbGVuZ3RoJylcbiAgfVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICAvLyBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZSwgZm9yIGJlc3QgcGVyZm9ybWFuY2VcbiAgICB0aGF0ID0gbmV3IFVpbnQ4QXJyYXkobGVuZ3RoKVxuICAgIHRoYXQuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICB9IGVsc2Uge1xuICAgIC8vIEZhbGxiYWNrOiBSZXR1cm4gYW4gb2JqZWN0IGluc3RhbmNlIG9mIHRoZSBCdWZmZXIgY2xhc3NcbiAgICBpZiAodGhhdCA9PT0gbnVsbCkge1xuICAgICAgdGhhdCA9IG5ldyBCdWZmZXIobGVuZ3RoKVxuICAgIH1cbiAgICB0aGF0Lmxlbmd0aCA9IGxlbmd0aFxuICB9XG5cbiAgcmV0dXJuIHRoYXRcbn1cblxuLyoqXG4gKiBUaGUgQnVmZmVyIGNvbnN0cnVjdG9yIHJldHVybnMgaW5zdGFuY2VzIG9mIGBVaW50OEFycmF5YCB0aGF0IGhhdmUgdGhlaXJcbiAqIHByb3RvdHlwZSBjaGFuZ2VkIHRvIGBCdWZmZXIucHJvdG90eXBlYC4gRnVydGhlcm1vcmUsIGBCdWZmZXJgIGlzIGEgc3ViY2xhc3Mgb2ZcbiAqIGBVaW50OEFycmF5YCwgc28gdGhlIHJldHVybmVkIGluc3RhbmNlcyB3aWxsIGhhdmUgYWxsIHRoZSBub2RlIGBCdWZmZXJgIG1ldGhvZHNcbiAqIGFuZCB0aGUgYFVpbnQ4QXJyYXlgIG1ldGhvZHMuIFNxdWFyZSBicmFja2V0IG5vdGF0aW9uIHdvcmtzIGFzIGV4cGVjdGVkIC0tIGl0XG4gKiByZXR1cm5zIGEgc2luZ2xlIG9jdGV0LlxuICpcbiAqIFRoZSBgVWludDhBcnJheWAgcHJvdG90eXBlIHJlbWFpbnMgdW5tb2RpZmllZC5cbiAqL1xuXG5mdW5jdGlvbiBCdWZmZXIgKGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIGlmICghQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQgJiYgISh0aGlzIGluc3RhbmNlb2YgQnVmZmVyKSkge1xuICAgIHJldHVybiBuZXcgQnVmZmVyKGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgLy8gQ29tbW9uIGNhc2UuXG4gIGlmICh0eXBlb2YgYXJnID09PSAnbnVtYmVyJykge1xuICAgIGlmICh0eXBlb2YgZW5jb2RpbmdPck9mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ0lmIGVuY29kaW5nIGlzIHNwZWNpZmllZCB0aGVuIHRoZSBmaXJzdCBhcmd1bWVudCBtdXN0IGJlIGEgc3RyaW5nJ1xuICAgICAgKVxuICAgIH1cbiAgICByZXR1cm4gYWxsb2NVbnNhZmUodGhpcywgYXJnKVxuICB9XG4gIHJldHVybiBmcm9tKHRoaXMsIGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxufVxuXG5CdWZmZXIucG9vbFNpemUgPSA4MTkyIC8vIG5vdCB1c2VkIGJ5IHRoaXMgaW1wbGVtZW50YXRpb25cblxuLy8gVE9ETzogTGVnYWN5LCBub3QgbmVlZGVkIGFueW1vcmUuIFJlbW92ZSBpbiBuZXh0IG1ham9yIHZlcnNpb24uXG5CdWZmZXIuX2F1Z21lbnQgPSBmdW5jdGlvbiAoYXJyKSB7XG4gIGFyci5fX3Byb3RvX18gPSBCdWZmZXIucHJvdG90eXBlXG4gIHJldHVybiBhcnJcbn1cblxuZnVuY3Rpb24gZnJvbSAodGhhdCwgdmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1widmFsdWVcIiBhcmd1bWVudCBtdXN0IG5vdCBiZSBhIG51bWJlcicpXG4gIH1cblxuICBpZiAodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgcmV0dXJuIGZyb21BcnJheUJ1ZmZlcih0aGF0LCB2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gZnJvbVN0cmluZyh0aGF0LCB2YWx1ZSwgZW5jb2RpbmdPck9mZnNldClcbiAgfVxuXG4gIHJldHVybiBmcm9tT2JqZWN0KHRoYXQsIHZhbHVlKVxufVxuXG4vKipcbiAqIEZ1bmN0aW9uYWxseSBlcXVpdmFsZW50IHRvIEJ1ZmZlcihhcmcsIGVuY29kaW5nKSBidXQgdGhyb3dzIGEgVHlwZUVycm9yXG4gKiBpZiB2YWx1ZSBpcyBhIG51bWJlci5cbiAqIEJ1ZmZlci5mcm9tKHN0clssIGVuY29kaW5nXSlcbiAqIEJ1ZmZlci5mcm9tKGFycmF5KVxuICogQnVmZmVyLmZyb20oYnVmZmVyKVxuICogQnVmZmVyLmZyb20oYXJyYXlCdWZmZXJbLCBieXRlT2Zmc2V0WywgbGVuZ3RoXV0pXG4gKiovXG5CdWZmZXIuZnJvbSA9IGZ1bmN0aW9uICh2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBmcm9tKG51bGwsIHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG59XG5cbmlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICBCdWZmZXIucHJvdG90eXBlLl9fcHJvdG9fXyA9IFVpbnQ4QXJyYXkucHJvdG90eXBlXG4gIEJ1ZmZlci5fX3Byb3RvX18gPSBVaW50OEFycmF5XG4gIGlmICh0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wuc3BlY2llcyAmJlxuICAgICAgQnVmZmVyW1N5bWJvbC5zcGVjaWVzXSA9PT0gQnVmZmVyKSB7XG4gICAgLy8gRml4IHN1YmFycmF5KCkgaW4gRVMyMDE2LiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9mZXJvc3MvYnVmZmVyL3B1bGwvOTdcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQnVmZmVyLCBTeW1ib2wuc3BlY2llcywge1xuICAgICAgdmFsdWU6IG51bGwsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KVxuICB9XG59XG5cbmZ1bmN0aW9uIGFzc2VydFNpemUgKHNpemUpIHtcbiAgaWYgKHR5cGVvZiBzaXplICE9PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wic2l6ZVwiIGFyZ3VtZW50IG11c3QgYmUgYSBudW1iZXInKVxuICB9IGVsc2UgaWYgKHNpemUgPCAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1wic2l6ZVwiIGFyZ3VtZW50IG11c3Qgbm90IGJlIG5lZ2F0aXZlJylcbiAgfVxufVxuXG5mdW5jdGlvbiBhbGxvYyAodGhhdCwgc2l6ZSwgZmlsbCwgZW5jb2RpbmcpIHtcbiAgYXNzZXJ0U2l6ZShzaXplKVxuICBpZiAoc2l6ZSA8PSAwKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplKVxuICB9XG4gIGlmIChmaWxsICE9PSB1bmRlZmluZWQpIHtcbiAgICAvLyBPbmx5IHBheSBhdHRlbnRpb24gdG8gZW5jb2RpbmcgaWYgaXQncyBhIHN0cmluZy4gVGhpc1xuICAgIC8vIHByZXZlbnRzIGFjY2lkZW50YWxseSBzZW5kaW5nIGluIGEgbnVtYmVyIHRoYXQgd291bGRcbiAgICAvLyBiZSBpbnRlcnByZXR0ZWQgYXMgYSBzdGFydCBvZmZzZXQuXG4gICAgcmV0dXJuIHR5cGVvZiBlbmNvZGluZyA9PT0gJ3N0cmluZydcbiAgICAgID8gY3JlYXRlQnVmZmVyKHRoYXQsIHNpemUpLmZpbGwoZmlsbCwgZW5jb2RpbmcpXG4gICAgICA6IGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplKS5maWxsKGZpbGwpXG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplKVxufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgZmlsbGVkIEJ1ZmZlciBpbnN0YW5jZS5cbiAqIGFsbG9jKHNpemVbLCBmaWxsWywgZW5jb2RpbmddXSlcbiAqKi9cbkJ1ZmZlci5hbGxvYyA9IGZ1bmN0aW9uIChzaXplLCBmaWxsLCBlbmNvZGluZykge1xuICByZXR1cm4gYWxsb2MobnVsbCwgc2l6ZSwgZmlsbCwgZW5jb2RpbmcpXG59XG5cbmZ1bmN0aW9uIGFsbG9jVW5zYWZlICh0aGF0LCBzaXplKSB7XG4gIGFzc2VydFNpemUoc2l6ZSlcbiAgdGhhdCA9IGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplIDwgMCA/IDAgOiBjaGVja2VkKHNpemUpIHwgMClcbiAgaWYgKCFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZTsgKytpKSB7XG4gICAgICB0aGF0W2ldID0gMFxuICAgIH1cbiAgfVxuICByZXR1cm4gdGhhdFxufVxuXG4vKipcbiAqIEVxdWl2YWxlbnQgdG8gQnVmZmVyKG51bSksIGJ5IGRlZmF1bHQgY3JlYXRlcyBhIG5vbi16ZXJvLWZpbGxlZCBCdWZmZXIgaW5zdGFuY2UuXG4gKiAqL1xuQnVmZmVyLmFsbG9jVW5zYWZlID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgcmV0dXJuIGFsbG9jVW5zYWZlKG51bGwsIHNpemUpXG59XG4vKipcbiAqIEVxdWl2YWxlbnQgdG8gU2xvd0J1ZmZlcihudW0pLCBieSBkZWZhdWx0IGNyZWF0ZXMgYSBub24temVyby1maWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICovXG5CdWZmZXIuYWxsb2NVbnNhZmVTbG93ID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgcmV0dXJuIGFsbG9jVW5zYWZlKG51bGwsIHNpemUpXG59XG5cbmZ1bmN0aW9uIGZyb21TdHJpbmcgKHRoYXQsIHN0cmluZywgZW5jb2RpbmcpIHtcbiAgaWYgKHR5cGVvZiBlbmNvZGluZyAhPT0gJ3N0cmluZycgfHwgZW5jb2RpbmcgPT09ICcnKSB7XG4gICAgZW5jb2RpbmcgPSAndXRmOCdcbiAgfVxuXG4gIGlmICghQnVmZmVyLmlzRW5jb2RpbmcoZW5jb2RpbmcpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJlbmNvZGluZ1wiIG11c3QgYmUgYSB2YWxpZCBzdHJpbmcgZW5jb2RpbmcnKVxuICB9XG5cbiAgdmFyIGxlbmd0aCA9IGJ5dGVMZW5ndGgoc3RyaW5nLCBlbmNvZGluZykgfCAwXG4gIHRoYXQgPSBjcmVhdGVCdWZmZXIodGhhdCwgbGVuZ3RoKVxuXG4gIHZhciBhY3R1YWwgPSB0aGF0LndyaXRlKHN0cmluZywgZW5jb2RpbmcpXG5cbiAgaWYgKGFjdHVhbCAhPT0gbGVuZ3RoKSB7XG4gICAgLy8gV3JpdGluZyBhIGhleCBzdHJpbmcsIGZvciBleGFtcGxlLCB0aGF0IGNvbnRhaW5zIGludmFsaWQgY2hhcmFjdGVycyB3aWxsXG4gICAgLy8gY2F1c2UgZXZlcnl0aGluZyBhZnRlciB0aGUgZmlyc3QgaW52YWxpZCBjaGFyYWN0ZXIgdG8gYmUgaWdub3JlZC4gKGUuZy5cbiAgICAvLyAnYWJ4eGNkJyB3aWxsIGJlIHRyZWF0ZWQgYXMgJ2FiJylcbiAgICB0aGF0ID0gdGhhdC5zbGljZSgwLCBhY3R1YWwpXG4gIH1cblxuICByZXR1cm4gdGhhdFxufVxuXG5mdW5jdGlvbiBmcm9tQXJyYXlMaWtlICh0aGF0LCBhcnJheSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoIDwgMCA/IDAgOiBjaGVja2VkKGFycmF5Lmxlbmd0aCkgfCAwXG4gIHRoYXQgPSBjcmVhdGVCdWZmZXIodGhhdCwgbGVuZ3RoKVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgdGhhdFtpXSA9IGFycmF5W2ldICYgMjU1XG4gIH1cbiAgcmV0dXJuIHRoYXRcbn1cblxuZnVuY3Rpb24gZnJvbUFycmF5QnVmZmVyICh0aGF0LCBhcnJheSwgYnl0ZU9mZnNldCwgbGVuZ3RoKSB7XG4gIGFycmF5LmJ5dGVMZW5ndGggLy8gdGhpcyB0aHJvd3MgaWYgYGFycmF5YCBpcyBub3QgYSB2YWxpZCBBcnJheUJ1ZmZlclxuXG4gIGlmIChieXRlT2Zmc2V0IDwgMCB8fCBhcnJheS5ieXRlTGVuZ3RoIDwgYnl0ZU9mZnNldCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdcXCdvZmZzZXRcXCcgaXMgb3V0IG9mIGJvdW5kcycpXG4gIH1cblxuICBpZiAoYXJyYXkuYnl0ZUxlbmd0aCA8IGJ5dGVPZmZzZXQgKyAobGVuZ3RoIHx8IDApKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1xcJ2xlbmd0aFxcJyBpcyBvdXQgb2YgYm91bmRzJylcbiAgfVxuXG4gIGlmIChieXRlT2Zmc2V0ID09PSB1bmRlZmluZWQgJiYgbGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBhcnJheSA9IG5ldyBVaW50OEFycmF5KGFycmF5KVxuICB9IGVsc2UgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYXJyYXkgPSBuZXcgVWludDhBcnJheShhcnJheSwgYnl0ZU9mZnNldClcbiAgfSBlbHNlIHtcbiAgICBhcnJheSA9IG5ldyBVaW50OEFycmF5KGFycmF5LCBieXRlT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICAvLyBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZSwgZm9yIGJlc3QgcGVyZm9ybWFuY2VcbiAgICB0aGF0ID0gYXJyYXlcbiAgICB0aGF0Ll9fcHJvdG9fXyA9IEJ1ZmZlci5wcm90b3R5cGVcbiAgfSBlbHNlIHtcbiAgICAvLyBGYWxsYmFjazogUmV0dXJuIGFuIG9iamVjdCBpbnN0YW5jZSBvZiB0aGUgQnVmZmVyIGNsYXNzXG4gICAgdGhhdCA9IGZyb21BcnJheUxpa2UodGhhdCwgYXJyYXkpXG4gIH1cbiAgcmV0dXJuIHRoYXRcbn1cblxuZnVuY3Rpb24gZnJvbU9iamVjdCAodGhhdCwgb2JqKSB7XG4gIGlmIChCdWZmZXIuaXNCdWZmZXIob2JqKSkge1xuICAgIHZhciBsZW4gPSBjaGVja2VkKG9iai5sZW5ndGgpIHwgMFxuICAgIHRoYXQgPSBjcmVhdGVCdWZmZXIodGhhdCwgbGVuKVxuXG4gICAgaWYgKHRoYXQubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gdGhhdFxuICAgIH1cblxuICAgIG9iai5jb3B5KHRoYXQsIDAsIDAsIGxlbilcbiAgICByZXR1cm4gdGhhdFxuICB9XG5cbiAgaWYgKG9iaikge1xuICAgIGlmICgodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICBvYmouYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHx8ICdsZW5ndGgnIGluIG9iaikge1xuICAgICAgaWYgKHR5cGVvZiBvYmoubGVuZ3RoICE9PSAnbnVtYmVyJyB8fCBpc25hbihvYmoubGVuZ3RoKSkge1xuICAgICAgICByZXR1cm4gY3JlYXRlQnVmZmVyKHRoYXQsIDApXG4gICAgICB9XG4gICAgICByZXR1cm4gZnJvbUFycmF5TGlrZSh0aGF0LCBvYmopXG4gICAgfVxuXG4gICAgaWYgKG9iai50eXBlID09PSAnQnVmZmVyJyAmJiBpc0FycmF5KG9iai5kYXRhKSkge1xuICAgICAgcmV0dXJuIGZyb21BcnJheUxpa2UodGhhdCwgb2JqLmRhdGEpXG4gICAgfVxuICB9XG5cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcignRmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhIHN0cmluZywgQnVmZmVyLCBBcnJheUJ1ZmZlciwgQXJyYXksIG9yIGFycmF5LWxpa2Ugb2JqZWN0LicpXG59XG5cbmZ1bmN0aW9uIGNoZWNrZWQgKGxlbmd0aCkge1xuICAvLyBOb3RlOiBjYW5ub3QgdXNlIGBsZW5ndGggPCBrTWF4TGVuZ3RoKClgIGhlcmUgYmVjYXVzZSB0aGF0IGZhaWxzIHdoZW5cbiAgLy8gbGVuZ3RoIGlzIE5hTiAod2hpY2ggaXMgb3RoZXJ3aXNlIGNvZXJjZWQgdG8gemVyby4pXG4gIGlmIChsZW5ndGggPj0ga01heExlbmd0aCgpKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0F0dGVtcHQgdG8gYWxsb2NhdGUgQnVmZmVyIGxhcmdlciB0aGFuIG1heGltdW0gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgJ3NpemU6IDB4JyArIGtNYXhMZW5ndGgoKS50b1N0cmluZygxNikgKyAnIGJ5dGVzJylcbiAgfVxuICByZXR1cm4gbGVuZ3RoIHwgMFxufVxuXG5mdW5jdGlvbiBTbG93QnVmZmVyIChsZW5ndGgpIHtcbiAgaWYgKCtsZW5ndGggIT0gbGVuZ3RoKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZXFlcWVxXG4gICAgbGVuZ3RoID0gMFxuICB9XG4gIHJldHVybiBCdWZmZXIuYWxsb2MoK2xlbmd0aClcbn1cblxuQnVmZmVyLmlzQnVmZmVyID0gZnVuY3Rpb24gaXNCdWZmZXIgKGIpIHtcbiAgcmV0dXJuICEhKGIgIT0gbnVsbCAmJiBiLl9pc0J1ZmZlcilcbn1cblxuQnVmZmVyLmNvbXBhcmUgPSBmdW5jdGlvbiBjb21wYXJlIChhLCBiKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGEpIHx8ICFCdWZmZXIuaXNCdWZmZXIoYikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudHMgbXVzdCBiZSBCdWZmZXJzJylcbiAgfVxuXG4gIGlmIChhID09PSBiKSByZXR1cm4gMFxuXG4gIHZhciB4ID0gYS5sZW5ndGhcbiAgdmFyIHkgPSBiLmxlbmd0aFxuXG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBNYXRoLm1pbih4LCB5KTsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKGFbaV0gIT09IGJbaV0pIHtcbiAgICAgIHggPSBhW2ldXG4gICAgICB5ID0gYltpXVxuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICBpZiAoeCA8IHkpIHJldHVybiAtMVxuICBpZiAoeSA8IHgpIHJldHVybiAxXG4gIHJldHVybiAwXG59XG5cbkJ1ZmZlci5pc0VuY29kaW5nID0gZnVuY3Rpb24gaXNFbmNvZGluZyAoZW5jb2RpbmcpIHtcbiAgc3dpdGNoIChTdHJpbmcoZW5jb2RpbmcpLnRvTG93ZXJDYXNlKCkpIHtcbiAgICBjYXNlICdoZXgnOlxuICAgIGNhc2UgJ3V0ZjgnOlxuICAgIGNhc2UgJ3V0Zi04JzpcbiAgICBjYXNlICdhc2NpaSc6XG4gICAgY2FzZSAnbGF0aW4xJzpcbiAgICBjYXNlICdiaW5hcnknOlxuICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgY2FzZSAndWNzMic6XG4gICAgY2FzZSAndWNzLTInOlxuICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgIHJldHVybiB0cnVlXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbkJ1ZmZlci5jb25jYXQgPSBmdW5jdGlvbiBjb25jYXQgKGxpc3QsIGxlbmd0aCkge1xuICBpZiAoIWlzQXJyYXkobGlzdCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RcIiBhcmd1bWVudCBtdXN0IGJlIGFuIEFycmF5IG9mIEJ1ZmZlcnMnKVxuICB9XG5cbiAgaWYgKGxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5hbGxvYygwKVxuICB9XG5cbiAgdmFyIGlcbiAgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbGVuZ3RoID0gMFxuICAgIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgKytpKSB7XG4gICAgICBsZW5ndGggKz0gbGlzdFtpXS5sZW5ndGhcbiAgICB9XG4gIH1cblxuICB2YXIgYnVmZmVyID0gQnVmZmVyLmFsbG9jVW5zYWZlKGxlbmd0aClcbiAgdmFyIHBvcyA9IDBcbiAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgYnVmID0gbGlzdFtpXVxuICAgIGlmICghQnVmZmVyLmlzQnVmZmVyKGJ1ZikpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wibGlzdFwiIGFyZ3VtZW50IG11c3QgYmUgYW4gQXJyYXkgb2YgQnVmZmVycycpXG4gICAgfVxuICAgIGJ1Zi5jb3B5KGJ1ZmZlciwgcG9zKVxuICAgIHBvcyArPSBidWYubGVuZ3RoXG4gIH1cbiAgcmV0dXJuIGJ1ZmZlclxufVxuXG5mdW5jdGlvbiBieXRlTGVuZ3RoIChzdHJpbmcsIGVuY29kaW5nKSB7XG4gIGlmIChCdWZmZXIuaXNCdWZmZXIoc3RyaW5nKSkge1xuICAgIHJldHVybiBzdHJpbmcubGVuZ3RoXG4gIH1cbiAgaWYgKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIEFycmF5QnVmZmVyLmlzVmlldyA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgICAgKEFycmF5QnVmZmVyLmlzVmlldyhzdHJpbmcpIHx8IHN0cmluZyBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSkge1xuICAgIHJldHVybiBzdHJpbmcuYnl0ZUxlbmd0aFxuICB9XG4gIGlmICh0eXBlb2Ygc3RyaW5nICE9PSAnc3RyaW5nJykge1xuICAgIHN0cmluZyA9ICcnICsgc3RyaW5nXG4gIH1cblxuICB2YXIgbGVuID0gc3RyaW5nLmxlbmd0aFxuICBpZiAobGVuID09PSAwKSByZXR1cm4gMFxuXG4gIC8vIFVzZSBhIGZvciBsb29wIHRvIGF2b2lkIHJlY3Vyc2lvblxuICB2YXIgbG93ZXJlZENhc2UgPSBmYWxzZVxuICBmb3IgKDs7KSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgY2FzZSAnbGF0aW4xJzpcbiAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAgIHJldHVybiBsZW5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgY2FzZSB1bmRlZmluZWQ6XG4gICAgICAgIHJldHVybiB1dGY4VG9CeXRlcyhzdHJpbmcpLmxlbmd0aFxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIGxlbiAqIDJcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBsZW4gPj4+IDFcbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIHJldHVybiBiYXNlNjRUb0J5dGVzKHN0cmluZykubGVuZ3RoXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHJldHVybiB1dGY4VG9CeXRlcyhzdHJpbmcpLmxlbmd0aCAvLyBhc3N1bWUgdXRmOFxuICAgICAgICBlbmNvZGluZyA9ICgnJyArIGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuQnVmZmVyLmJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoXG5cbmZ1bmN0aW9uIHNsb3dUb1N0cmluZyAoZW5jb2RpbmcsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxvd2VyZWRDYXNlID0gZmFsc2VcblxuICAvLyBObyBuZWVkIHRvIHZlcmlmeSB0aGF0IFwidGhpcy5sZW5ndGggPD0gTUFYX1VJTlQzMlwiIHNpbmNlIGl0J3MgYSByZWFkLW9ubHlcbiAgLy8gcHJvcGVydHkgb2YgYSB0eXBlZCBhcnJheS5cblxuICAvLyBUaGlzIGJlaGF2ZXMgbmVpdGhlciBsaWtlIFN0cmluZyBub3IgVWludDhBcnJheSBpbiB0aGF0IHdlIHNldCBzdGFydC9lbmRcbiAgLy8gdG8gdGhlaXIgdXBwZXIvbG93ZXIgYm91bmRzIGlmIHRoZSB2YWx1ZSBwYXNzZWQgaXMgb3V0IG9mIHJhbmdlLlxuICAvLyB1bmRlZmluZWQgaXMgaGFuZGxlZCBzcGVjaWFsbHkgYXMgcGVyIEVDTUEtMjYyIDZ0aCBFZGl0aW9uLFxuICAvLyBTZWN0aW9uIDEzLjMuMy43IFJ1bnRpbWUgU2VtYW50aWNzOiBLZXllZEJpbmRpbmdJbml0aWFsaXphdGlvbi5cbiAgaWYgKHN0YXJ0ID09PSB1bmRlZmluZWQgfHwgc3RhcnQgPCAwKSB7XG4gICAgc3RhcnQgPSAwXG4gIH1cbiAgLy8gUmV0dXJuIGVhcmx5IGlmIHN0YXJ0ID4gdGhpcy5sZW5ndGguIERvbmUgaGVyZSB0byBwcmV2ZW50IHBvdGVudGlhbCB1aW50MzJcbiAgLy8gY29lcmNpb24gZmFpbCBiZWxvdy5cbiAgaWYgKHN0YXJ0ID4gdGhpcy5sZW5ndGgpIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIGlmIChlbmQgPT09IHVuZGVmaW5lZCB8fCBlbmQgPiB0aGlzLmxlbmd0aCkge1xuICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gIH1cblxuICBpZiAoZW5kIDw9IDApIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIC8vIEZvcmNlIGNvZXJzaW9uIHRvIHVpbnQzMi4gVGhpcyB3aWxsIGFsc28gY29lcmNlIGZhbHNleS9OYU4gdmFsdWVzIHRvIDAuXG4gIGVuZCA+Pj49IDBcbiAgc3RhcnQgPj4+PSAwXG5cbiAgaWYgKGVuZCA8PSBzdGFydCkge1xuICAgIHJldHVybiAnJ1xuICB9XG5cbiAgaWYgKCFlbmNvZGluZykgZW5jb2RpbmcgPSAndXRmOCdcblxuICB3aGlsZSAodHJ1ZSkge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBoZXhTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgICAgcmV0dXJuIHV0ZjhTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdhc2NpaSc6XG4gICAgICAgIHJldHVybiBhc2NpaVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gbGF0aW4xU2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgICAgcmV0dXJuIGJhc2U2NFNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiB1dGYxNmxlU2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGxvd2VyZWRDYXNlKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gICAgICAgIGVuY29kaW5nID0gKGVuY29kaW5nICsgJycpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgbG93ZXJlZENhc2UgPSB0cnVlXG4gICAgfVxuICB9XG59XG5cbi8vIFRoZSBwcm9wZXJ0eSBpcyB1c2VkIGJ5IGBCdWZmZXIuaXNCdWZmZXJgIGFuZCBgaXMtYnVmZmVyYCAoaW4gU2FmYXJpIDUtNykgdG8gZGV0ZWN0XG4vLyBCdWZmZXIgaW5zdGFuY2VzLlxuQnVmZmVyLnByb3RvdHlwZS5faXNCdWZmZXIgPSB0cnVlXG5cbmZ1bmN0aW9uIHN3YXAgKGIsIG4sIG0pIHtcbiAgdmFyIGkgPSBiW25dXG4gIGJbbl0gPSBiW21dXG4gIGJbbV0gPSBpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDE2ID0gZnVuY3Rpb24gc3dhcDE2ICgpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW4gJSAyICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0J1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiAxNi1iaXRzJylcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSAyKSB7XG4gICAgc3dhcCh0aGlzLCBpLCBpICsgMSlcbiAgfVxuICByZXR1cm4gdGhpc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnN3YXAzMiA9IGZ1bmN0aW9uIHN3YXAzMiAoKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBpZiAobGVuICUgNCAhPT0gMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdCdWZmZXIgc2l6ZSBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgMzItYml0cycpXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkgKz0gNCkge1xuICAgIHN3YXAodGhpcywgaSwgaSArIDMpXG4gICAgc3dhcCh0aGlzLCBpICsgMSwgaSArIDIpXG4gIH1cbiAgcmV0dXJuIHRoaXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zd2FwNjQgPSBmdW5jdGlvbiBzd2FwNjQgKCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDggIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDY0LWJpdHMnKVxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpICs9IDgpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyA3KVxuICAgIHN3YXAodGhpcywgaSArIDEsIGkgKyA2KVxuICAgIHN3YXAodGhpcywgaSArIDIsIGkgKyA1KVxuICAgIHN3YXAodGhpcywgaSArIDMsIGkgKyA0KVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyAoKSB7XG4gIHZhciBsZW5ndGggPSB0aGlzLmxlbmd0aCB8IDBcbiAgaWYgKGxlbmd0aCA9PT0gMCkgcmV0dXJuICcnXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSByZXR1cm4gdXRmOFNsaWNlKHRoaXMsIDAsIGxlbmd0aClcbiAgcmV0dXJuIHNsb3dUb1N0cmluZy5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gZXF1YWxzIChiKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudCBtdXN0IGJlIGEgQnVmZmVyJylcbiAgaWYgKHRoaXMgPT09IGIpIHJldHVybiB0cnVlXG4gIHJldHVybiBCdWZmZXIuY29tcGFyZSh0aGlzLCBiKSA9PT0gMFxufVxuXG5CdWZmZXIucHJvdG90eXBlLmluc3BlY3QgPSBmdW5jdGlvbiBpbnNwZWN0ICgpIHtcbiAgdmFyIHN0ciA9ICcnXG4gIHZhciBtYXggPSBleHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTXG4gIGlmICh0aGlzLmxlbmd0aCA+IDApIHtcbiAgICBzdHIgPSB0aGlzLnRvU3RyaW5nKCdoZXgnLCAwLCBtYXgpLm1hdGNoKC8uezJ9L2cpLmpvaW4oJyAnKVxuICAgIGlmICh0aGlzLmxlbmd0aCA+IG1heCkgc3RyICs9ICcgLi4uICdcbiAgfVxuICByZXR1cm4gJzxCdWZmZXIgJyArIHN0ciArICc+J1xufVxuXG5CdWZmZXIucHJvdG90eXBlLmNvbXBhcmUgPSBmdW5jdGlvbiBjb21wYXJlICh0YXJnZXQsIHN0YXJ0LCBlbmQsIHRoaXNTdGFydCwgdGhpc0VuZCkge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcih0YXJnZXQpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlcicpXG4gIH1cblxuICBpZiAoc3RhcnQgPT09IHVuZGVmaW5lZCkge1xuICAgIHN0YXJ0ID0gMFxuICB9XG4gIGlmIChlbmQgPT09IHVuZGVmaW5lZCkge1xuICAgIGVuZCA9IHRhcmdldCA/IHRhcmdldC5sZW5ndGggOiAwXG4gIH1cbiAgaWYgKHRoaXNTdGFydCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpc1N0YXJ0ID0gMFxuICB9XG4gIGlmICh0aGlzRW5kID09PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzRW5kID0gdGhpcy5sZW5ndGhcbiAgfVxuXG4gIGlmIChzdGFydCA8IDAgfHwgZW5kID4gdGFyZ2V0Lmxlbmd0aCB8fCB0aGlzU3RhcnQgPCAwIHx8IHRoaXNFbmQgPiB0aGlzLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdvdXQgb2YgcmFuZ2UgaW5kZXgnKVxuICB9XG5cbiAgaWYgKHRoaXNTdGFydCA+PSB0aGlzRW5kICYmIHN0YXJ0ID49IGVuZCkge1xuICAgIHJldHVybiAwXG4gIH1cbiAgaWYgKHRoaXNTdGFydCA+PSB0aGlzRW5kKSB7XG4gICAgcmV0dXJuIC0xXG4gIH1cbiAgaWYgKHN0YXJ0ID49IGVuZCkge1xuICAgIHJldHVybiAxXG4gIH1cblxuICBzdGFydCA+Pj49IDBcbiAgZW5kID4+Pj0gMFxuICB0aGlzU3RhcnQgPj4+PSAwXG4gIHRoaXNFbmQgPj4+PSAwXG5cbiAgaWYgKHRoaXMgPT09IHRhcmdldCkgcmV0dXJuIDBcblxuICB2YXIgeCA9IHRoaXNFbmQgLSB0aGlzU3RhcnRcbiAgdmFyIHkgPSBlbmQgLSBzdGFydFxuICB2YXIgbGVuID0gTWF0aC5taW4oeCwgeSlcblxuICB2YXIgdGhpc0NvcHkgPSB0aGlzLnNsaWNlKHRoaXNTdGFydCwgdGhpc0VuZClcbiAgdmFyIHRhcmdldENvcHkgPSB0YXJnZXQuc2xpY2Uoc3RhcnQsIGVuZClcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKHRoaXNDb3B5W2ldICE9PSB0YXJnZXRDb3B5W2ldKSB7XG4gICAgICB4ID0gdGhpc0NvcHlbaV1cbiAgICAgIHkgPSB0YXJnZXRDb3B5W2ldXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIGlmICh4IDwgeSkgcmV0dXJuIC0xXG4gIGlmICh5IDwgeCkgcmV0dXJuIDFcbiAgcmV0dXJuIDBcbn1cblxuLy8gRmluZHMgZWl0aGVyIHRoZSBmaXJzdCBpbmRleCBvZiBgdmFsYCBpbiBgYnVmZmVyYCBhdCBvZmZzZXQgPj0gYGJ5dGVPZmZzZXRgLFxuLy8gT1IgdGhlIGxhc3QgaW5kZXggb2YgYHZhbGAgaW4gYGJ1ZmZlcmAgYXQgb2Zmc2V0IDw9IGBieXRlT2Zmc2V0YC5cbi8vXG4vLyBBcmd1bWVudHM6XG4vLyAtIGJ1ZmZlciAtIGEgQnVmZmVyIHRvIHNlYXJjaFxuLy8gLSB2YWwgLSBhIHN0cmluZywgQnVmZmVyLCBvciBudW1iZXJcbi8vIC0gYnl0ZU9mZnNldCAtIGFuIGluZGV4IGludG8gYGJ1ZmZlcmA7IHdpbGwgYmUgY2xhbXBlZCB0byBhbiBpbnQzMlxuLy8gLSBlbmNvZGluZyAtIGFuIG9wdGlvbmFsIGVuY29kaW5nLCByZWxldmFudCBpcyB2YWwgaXMgYSBzdHJpbmdcbi8vIC0gZGlyIC0gdHJ1ZSBmb3IgaW5kZXhPZiwgZmFsc2UgZm9yIGxhc3RJbmRleE9mXG5mdW5jdGlvbiBiaWRpcmVjdGlvbmFsSW5kZXhPZiAoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpIHtcbiAgLy8gRW1wdHkgYnVmZmVyIG1lYW5zIG5vIG1hdGNoXG4gIGlmIChidWZmZXIubGVuZ3RoID09PSAwKSByZXR1cm4gLTFcblxuICAvLyBOb3JtYWxpemUgYnl0ZU9mZnNldFxuICBpZiAodHlwZW9mIGJ5dGVPZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgZW5jb2RpbmcgPSBieXRlT2Zmc2V0XG4gICAgYnl0ZU9mZnNldCA9IDBcbiAgfSBlbHNlIGlmIChieXRlT2Zmc2V0ID4gMHg3ZmZmZmZmZikge1xuICAgIGJ5dGVPZmZzZXQgPSAweDdmZmZmZmZmXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA8IC0weDgwMDAwMDAwKSB7XG4gICAgYnl0ZU9mZnNldCA9IC0weDgwMDAwMDAwXG4gIH1cbiAgYnl0ZU9mZnNldCA9ICtieXRlT2Zmc2V0ICAvLyBDb2VyY2UgdG8gTnVtYmVyLlxuICBpZiAoaXNOYU4oYnl0ZU9mZnNldCkpIHtcbiAgICAvLyBieXRlT2Zmc2V0OiBpdCBpdCdzIHVuZGVmaW5lZCwgbnVsbCwgTmFOLCBcImZvb1wiLCBldGMsIHNlYXJjaCB3aG9sZSBidWZmZXJcbiAgICBieXRlT2Zmc2V0ID0gZGlyID8gMCA6IChidWZmZXIubGVuZ3RoIC0gMSlcbiAgfVxuXG4gIC8vIE5vcm1hbGl6ZSBieXRlT2Zmc2V0OiBuZWdhdGl2ZSBvZmZzZXRzIHN0YXJ0IGZyb20gdGhlIGVuZCBvZiB0aGUgYnVmZmVyXG4gIGlmIChieXRlT2Zmc2V0IDwgMCkgYnl0ZU9mZnNldCA9IGJ1ZmZlci5sZW5ndGggKyBieXRlT2Zmc2V0XG4gIGlmIChieXRlT2Zmc2V0ID49IGJ1ZmZlci5sZW5ndGgpIHtcbiAgICBpZiAoZGlyKSByZXR1cm4gLTFcbiAgICBlbHNlIGJ5dGVPZmZzZXQgPSBidWZmZXIubGVuZ3RoIC0gMVxuICB9IGVsc2UgaWYgKGJ5dGVPZmZzZXQgPCAwKSB7XG4gICAgaWYgKGRpcikgYnl0ZU9mZnNldCA9IDBcbiAgICBlbHNlIHJldHVybiAtMVxuICB9XG5cbiAgLy8gTm9ybWFsaXplIHZhbFxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHtcbiAgICB2YWwgPSBCdWZmZXIuZnJvbSh2YWwsIGVuY29kaW5nKVxuICB9XG5cbiAgLy8gRmluYWxseSwgc2VhcmNoIGVpdGhlciBpbmRleE9mIChpZiBkaXIgaXMgdHJ1ZSkgb3IgbGFzdEluZGV4T2ZcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcih2YWwpKSB7XG4gICAgLy8gU3BlY2lhbCBjYXNlOiBsb29raW5nIGZvciBlbXB0eSBzdHJpbmcvYnVmZmVyIGFsd2F5cyBmYWlsc1xuICAgIGlmICh2YWwubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gLTFcbiAgICB9XG4gICAgcmV0dXJuIGFycmF5SW5kZXhPZihidWZmZXIsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcilcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgIHZhbCA9IHZhbCAmIDB4RkYgLy8gU2VhcmNoIGZvciBhIGJ5dGUgdmFsdWUgWzAtMjU1XVxuICAgIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCAmJlxuICAgICAgICB0eXBlb2YgVWludDhBcnJheS5wcm90b3R5cGUuaW5kZXhPZiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgaWYgKGRpcikge1xuICAgICAgICByZXR1cm4gVWludDhBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFVpbnQ4QXJyYXkucHJvdG90eXBlLmxhc3RJbmRleE9mLmNhbGwoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhcnJheUluZGV4T2YoYnVmZmVyLCBbIHZhbCBdLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKVxuICB9XG5cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcigndmFsIG11c3QgYmUgc3RyaW5nLCBudW1iZXIgb3IgQnVmZmVyJylcbn1cblxuZnVuY3Rpb24gYXJyYXlJbmRleE9mIChhcnIsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcikge1xuICB2YXIgaW5kZXhTaXplID0gMVxuICB2YXIgYXJyTGVuZ3RoID0gYXJyLmxlbmd0aFxuICB2YXIgdmFsTGVuZ3RoID0gdmFsLmxlbmd0aFxuXG4gIGlmIChlbmNvZGluZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgZW5jb2RpbmcgPSBTdHJpbmcoZW5jb2RpbmcpLnRvTG93ZXJDYXNlKClcbiAgICBpZiAoZW5jb2RpbmcgPT09ICd1Y3MyJyB8fCBlbmNvZGluZyA9PT0gJ3Vjcy0yJyB8fFxuICAgICAgICBlbmNvZGluZyA9PT0gJ3V0ZjE2bGUnIHx8IGVuY29kaW5nID09PSAndXRmLTE2bGUnKSB7XG4gICAgICBpZiAoYXJyLmxlbmd0aCA8IDIgfHwgdmFsLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgcmV0dXJuIC0xXG4gICAgICB9XG4gICAgICBpbmRleFNpemUgPSAyXG4gICAgICBhcnJMZW5ndGggLz0gMlxuICAgICAgdmFsTGVuZ3RoIC89IDJcbiAgICAgIGJ5dGVPZmZzZXQgLz0gMlxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWQgKGJ1ZiwgaSkge1xuICAgIGlmIChpbmRleFNpemUgPT09IDEpIHtcbiAgICAgIHJldHVybiBidWZbaV1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGJ1Zi5yZWFkVUludDE2QkUoaSAqIGluZGV4U2l6ZSlcbiAgICB9XG4gIH1cblxuICB2YXIgaVxuICBpZiAoZGlyKSB7XG4gICAgdmFyIGZvdW5kSW5kZXggPSAtMVxuICAgIGZvciAoaSA9IGJ5dGVPZmZzZXQ7IGkgPCBhcnJMZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHJlYWQoYXJyLCBpKSA9PT0gcmVhZCh2YWwsIGZvdW5kSW5kZXggPT09IC0xID8gMCA6IGkgLSBmb3VuZEluZGV4KSkge1xuICAgICAgICBpZiAoZm91bmRJbmRleCA9PT0gLTEpIGZvdW5kSW5kZXggPSBpXG4gICAgICAgIGlmIChpIC0gZm91bmRJbmRleCArIDEgPT09IHZhbExlbmd0aCkgcmV0dXJuIGZvdW5kSW5kZXggKiBpbmRleFNpemVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChmb3VuZEluZGV4ICE9PSAtMSkgaSAtPSBpIC0gZm91bmRJbmRleFxuICAgICAgICBmb3VuZEluZGV4ID0gLTFcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKGJ5dGVPZmZzZXQgKyB2YWxMZW5ndGggPiBhcnJMZW5ndGgpIGJ5dGVPZmZzZXQgPSBhcnJMZW5ndGggLSB2YWxMZW5ndGhcbiAgICBmb3IgKGkgPSBieXRlT2Zmc2V0OyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIGZvdW5kID0gdHJ1ZVxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB2YWxMZW5ndGg7IGorKykge1xuICAgICAgICBpZiAocmVhZChhcnIsIGkgKyBqKSAhPT0gcmVhZCh2YWwsIGopKSB7XG4gICAgICAgICAgZm91bmQgPSBmYWxzZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChmb3VuZCkgcmV0dXJuIGlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gLTFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbmNsdWRlcyA9IGZ1bmN0aW9uIGluY2x1ZGVzICh2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSB7XG4gIHJldHVybiB0aGlzLmluZGV4T2YodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykgIT09IC0xXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5kZXhPZiA9IGZ1bmN0aW9uIGluZGV4T2YgKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIGJpZGlyZWN0aW9uYWxJbmRleE9mKHRoaXMsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIHRydWUpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUubGFzdEluZGV4T2YgPSBmdW5jdGlvbiBsYXN0SW5kZXhPZiAodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykge1xuICByZXR1cm4gYmlkaXJlY3Rpb25hbEluZGV4T2YodGhpcywgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZmFsc2UpXG59XG5cbmZ1bmN0aW9uIGhleFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgb2Zmc2V0ID0gTnVtYmVyKG9mZnNldCkgfHwgMFxuICB2YXIgcmVtYWluaW5nID0gYnVmLmxlbmd0aCAtIG9mZnNldFxuICBpZiAoIWxlbmd0aCkge1xuICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICB9IGVsc2Uge1xuICAgIGxlbmd0aCA9IE51bWJlcihsZW5ndGgpXG4gICAgaWYgKGxlbmd0aCA+IHJlbWFpbmluZykge1xuICAgICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gICAgfVxuICB9XG5cbiAgLy8gbXVzdCBiZSBhbiBldmVuIG51bWJlciBvZiBkaWdpdHNcbiAgdmFyIHN0ckxlbiA9IHN0cmluZy5sZW5ndGhcbiAgaWYgKHN0ckxlbiAlIDIgIT09IDApIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgaGV4IHN0cmluZycpXG5cbiAgaWYgKGxlbmd0aCA+IHN0ckxlbiAvIDIpIHtcbiAgICBsZW5ndGggPSBzdHJMZW4gLyAyXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIHZhciBwYXJzZWQgPSBwYXJzZUludChzdHJpbmcuc3Vic3RyKGkgKiAyLCAyKSwgMTYpXG4gICAgaWYgKGlzTmFOKHBhcnNlZCkpIHJldHVybiBpXG4gICAgYnVmW29mZnNldCArIGldID0gcGFyc2VkXG4gIH1cbiAgcmV0dXJuIGlcbn1cblxuZnVuY3Rpb24gdXRmOFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIodXRmOFRvQnl0ZXMoc3RyaW5nLCBidWYubGVuZ3RoIC0gb2Zmc2V0KSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gYXNjaWlXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKGFzY2lpVG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiBsYXRpbjFXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBhc2NpaVdyaXRlKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gYmFzZTY0V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcihiYXNlNjRUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIHVjczJXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKHV0ZjE2bGVUb0J5dGVzKHN0cmluZywgYnVmLmxlbmd0aCAtIG9mZnNldCksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbiB3cml0ZSAoc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCwgZW5jb2RpbmcpIHtcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZylcbiAgaWYgKG9mZnNldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZW5jb2RpbmcgPSAndXRmOCdcbiAgICBsZW5ndGggPSB0aGlzLmxlbmd0aFxuICAgIG9mZnNldCA9IDBcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZywgZW5jb2RpbmcpXG4gIH0gZWxzZSBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQgJiYgdHlwZW9mIG9mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICBlbmNvZGluZyA9IG9mZnNldFxuICAgIGxlbmd0aCA9IHRoaXMubGVuZ3RoXG4gICAgb2Zmc2V0ID0gMFxuICAvLyBCdWZmZXIjd3JpdGUoc3RyaW5nLCBvZmZzZXRbLCBsZW5ndGhdWywgZW5jb2RpbmddKVxuICB9IGVsc2UgaWYgKGlzRmluaXRlKG9mZnNldCkpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gICAgaWYgKGlzRmluaXRlKGxlbmd0aCkpIHtcbiAgICAgIGxlbmd0aCA9IGxlbmd0aCB8IDBcbiAgICAgIGlmIChlbmNvZGluZyA9PT0gdW5kZWZpbmVkKSBlbmNvZGluZyA9ICd1dGY4J1xuICAgIH0gZWxzZSB7XG4gICAgICBlbmNvZGluZyA9IGxlbmd0aFxuICAgICAgbGVuZ3RoID0gdW5kZWZpbmVkXG4gICAgfVxuICAvLyBsZWdhY3kgd3JpdGUoc3RyaW5nLCBlbmNvZGluZywgb2Zmc2V0LCBsZW5ndGgpIC0gcmVtb3ZlIGluIHYwLjEzXG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgJ0J1ZmZlci53cml0ZShzdHJpbmcsIGVuY29kaW5nLCBvZmZzZXRbLCBsZW5ndGhdKSBpcyBubyBsb25nZXIgc3VwcG9ydGVkJ1xuICAgIClcbiAgfVxuXG4gIHZhciByZW1haW5pbmcgPSB0aGlzLmxlbmd0aCAtIG9mZnNldFxuICBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQgfHwgbGVuZ3RoID4gcmVtYWluaW5nKSBsZW5ndGggPSByZW1haW5pbmdcblxuICBpZiAoKHN0cmluZy5sZW5ndGggPiAwICYmIChsZW5ndGggPCAwIHx8IG9mZnNldCA8IDApKSB8fCBvZmZzZXQgPiB0aGlzLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdBdHRlbXB0IHRvIHdyaXRlIG91dHNpZGUgYnVmZmVyIGJvdW5kcycpXG4gIH1cblxuICBpZiAoIWVuY29kaW5nKSBlbmNvZGluZyA9ICd1dGY4J1xuXG4gIHZhciBsb3dlcmVkQ2FzZSA9IGZhbHNlXG4gIGZvciAoOzspIHtcbiAgICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gaGV4V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAndXRmOCc6XG4gICAgICBjYXNlICd1dGYtOCc6XG4gICAgICAgIHJldHVybiB1dGY4V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgICByZXR1cm4gYXNjaWlXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICdsYXRpbjEnOlxuICAgICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgICAgcmV0dXJuIGxhdGluMVdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIC8vIFdhcm5pbmc6IG1heExlbmd0aCBub3QgdGFrZW4gaW50byBhY2NvdW50IGluIGJhc2U2NFdyaXRlXG4gICAgICAgIHJldHVybiBiYXNlNjRXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gdWNzMldyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChsb3dlcmVkQ2FzZSkgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICAgICAgICBlbmNvZGluZyA9ICgnJyArIGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTiAoKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJ0J1ZmZlcicsXG4gICAgZGF0YTogQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5fYXJyIHx8IHRoaXMsIDApXG4gIH1cbn1cblxuZnVuY3Rpb24gYmFzZTY0U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBpZiAoc3RhcnQgPT09IDAgJiYgZW5kID09PSBidWYubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGJhc2U2NC5mcm9tQnl0ZUFycmF5KGJ1ZilcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYmFzZTY0LmZyb21CeXRlQXJyYXkoYnVmLnNsaWNlKHN0YXJ0LCBlbmQpKVxuICB9XG59XG5cbmZ1bmN0aW9uIHV0ZjhTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcbiAgdmFyIHJlcyA9IFtdXG5cbiAgdmFyIGkgPSBzdGFydFxuICB3aGlsZSAoaSA8IGVuZCkge1xuICAgIHZhciBmaXJzdEJ5dGUgPSBidWZbaV1cbiAgICB2YXIgY29kZVBvaW50ID0gbnVsbFxuICAgIHZhciBieXRlc1BlclNlcXVlbmNlID0gKGZpcnN0Qnl0ZSA+IDB4RUYpID8gNFxuICAgICAgOiAoZmlyc3RCeXRlID4gMHhERikgPyAzXG4gICAgICA6IChmaXJzdEJ5dGUgPiAweEJGKSA/IDJcbiAgICAgIDogMVxuXG4gICAgaWYgKGkgKyBieXRlc1BlclNlcXVlbmNlIDw9IGVuZCkge1xuICAgICAgdmFyIHNlY29uZEJ5dGUsIHRoaXJkQnl0ZSwgZm91cnRoQnl0ZSwgdGVtcENvZGVQb2ludFxuXG4gICAgICBzd2l0Y2ggKGJ5dGVzUGVyU2VxdWVuY2UpIHtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIGlmIChmaXJzdEJ5dGUgPCAweDgwKSB7XG4gICAgICAgICAgICBjb2RlUG9pbnQgPSBmaXJzdEJ5dGVcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgIHNlY29uZEJ5dGUgPSBidWZbaSArIDFdXG4gICAgICAgICAgaWYgKChzZWNvbmRCeXRlICYgMHhDMCkgPT09IDB4ODApIHtcbiAgICAgICAgICAgIHRlbXBDb2RlUG9pbnQgPSAoZmlyc3RCeXRlICYgMHgxRikgPDwgMHg2IHwgKHNlY29uZEJ5dGUgJiAweDNGKVxuICAgICAgICAgICAgaWYgKHRlbXBDb2RlUG9pbnQgPiAweDdGKSB7XG4gICAgICAgICAgICAgIGNvZGVQb2ludCA9IHRlbXBDb2RlUG9pbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgIHNlY29uZEJ5dGUgPSBidWZbaSArIDFdXG4gICAgICAgICAgdGhpcmRCeXRlID0gYnVmW2kgKyAyXVxuICAgICAgICAgIGlmICgoc2Vjb25kQnl0ZSAmIDB4QzApID09PSAweDgwICYmICh0aGlyZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweEYpIDw8IDB4QyB8IChzZWNvbmRCeXRlICYgMHgzRikgPDwgMHg2IHwgKHRoaXJkQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4N0ZGICYmICh0ZW1wQ29kZVBvaW50IDwgMHhEODAwIHx8IHRlbXBDb2RlUG9pbnQgPiAweERGRkYpKSB7XG4gICAgICAgICAgICAgIGNvZGVQb2ludCA9IHRlbXBDb2RlUG9pbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSA0OlxuICAgICAgICAgIHNlY29uZEJ5dGUgPSBidWZbaSArIDFdXG4gICAgICAgICAgdGhpcmRCeXRlID0gYnVmW2kgKyAyXVxuICAgICAgICAgIGZvdXJ0aEJ5dGUgPSBidWZbaSArIDNdXG4gICAgICAgICAgaWYgKChzZWNvbmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKHRoaXJkQnl0ZSAmIDB4QzApID09PSAweDgwICYmIChmb3VydGhCeXRlICYgMHhDMCkgPT09IDB4ODApIHtcbiAgICAgICAgICAgIHRlbXBDb2RlUG9pbnQgPSAoZmlyc3RCeXRlICYgMHhGKSA8PCAweDEyIHwgKHNlY29uZEJ5dGUgJiAweDNGKSA8PCAweEMgfCAodGhpcmRCeXRlICYgMHgzRikgPDwgMHg2IHwgKGZvdXJ0aEJ5dGUgJiAweDNGKVxuICAgICAgICAgICAgaWYgKHRlbXBDb2RlUG9pbnQgPiAweEZGRkYgJiYgdGVtcENvZGVQb2ludCA8IDB4MTEwMDAwKSB7XG4gICAgICAgICAgICAgIGNvZGVQb2ludCA9IHRlbXBDb2RlUG9pbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNvZGVQb2ludCA9PT0gbnVsbCkge1xuICAgICAgLy8gd2UgZGlkIG5vdCBnZW5lcmF0ZSBhIHZhbGlkIGNvZGVQb2ludCBzbyBpbnNlcnQgYVxuICAgICAgLy8gcmVwbGFjZW1lbnQgY2hhciAoVStGRkZEKSBhbmQgYWR2YW5jZSBvbmx5IDEgYnl0ZVxuICAgICAgY29kZVBvaW50ID0gMHhGRkZEXG4gICAgICBieXRlc1BlclNlcXVlbmNlID0gMVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50ID4gMHhGRkZGKSB7XG4gICAgICAvLyBlbmNvZGUgdG8gdXRmMTYgKHN1cnJvZ2F0ZSBwYWlyIGRhbmNlKVxuICAgICAgY29kZVBvaW50IC09IDB4MTAwMDBcbiAgICAgIHJlcy5wdXNoKGNvZGVQb2ludCA+Pj4gMTAgJiAweDNGRiB8IDB4RDgwMClcbiAgICAgIGNvZGVQb2ludCA9IDB4REMwMCB8IGNvZGVQb2ludCAmIDB4M0ZGXG4gICAgfVxuXG4gICAgcmVzLnB1c2goY29kZVBvaW50KVxuICAgIGkgKz0gYnl0ZXNQZXJTZXF1ZW5jZVxuICB9XG5cbiAgcmV0dXJuIGRlY29kZUNvZGVQb2ludHNBcnJheShyZXMpXG59XG5cbi8vIEJhc2VkIG9uIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzIyNzQ3MjcyLzY4MDc0MiwgdGhlIGJyb3dzZXIgd2l0aFxuLy8gdGhlIGxvd2VzdCBsaW1pdCBpcyBDaHJvbWUsIHdpdGggMHgxMDAwMCBhcmdzLlxuLy8gV2UgZ28gMSBtYWduaXR1ZGUgbGVzcywgZm9yIHNhZmV0eVxudmFyIE1BWF9BUkdVTUVOVFNfTEVOR1RIID0gMHgxMDAwXG5cbmZ1bmN0aW9uIGRlY29kZUNvZGVQb2ludHNBcnJheSAoY29kZVBvaW50cykge1xuICB2YXIgbGVuID0gY29kZVBvaW50cy5sZW5ndGhcbiAgaWYgKGxlbiA8PSBNQVhfQVJHVU1FTlRTX0xFTkdUSCkge1xuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFN0cmluZywgY29kZVBvaW50cykgLy8gYXZvaWQgZXh0cmEgc2xpY2UoKVxuICB9XG5cbiAgLy8gRGVjb2RlIGluIGNodW5rcyB0byBhdm9pZCBcImNhbGwgc3RhY2sgc2l6ZSBleGNlZWRlZFwiLlxuICB2YXIgcmVzID0gJydcbiAgdmFyIGkgPSAwXG4gIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgcmVzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoXG4gICAgICBTdHJpbmcsXG4gICAgICBjb2RlUG9pbnRzLnNsaWNlKGksIGkgKz0gTUFYX0FSR1VNRU5UU19MRU5HVEgpXG4gICAgKVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuZnVuY3Rpb24gYXNjaWlTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciByZXQgPSAnJ1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG5cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICByZXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShidWZbaV0gJiAweDdGKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuZnVuY3Rpb24gbGF0aW4xU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgcmV0ID0gJydcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgcmV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuZnVuY3Rpb24gaGV4U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuXG4gIGlmICghc3RhcnQgfHwgc3RhcnQgPCAwKSBzdGFydCA9IDBcbiAgaWYgKCFlbmQgfHwgZW5kIDwgMCB8fCBlbmQgPiBsZW4pIGVuZCA9IGxlblxuXG4gIHZhciBvdXQgPSAnJ1xuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgIG91dCArPSB0b0hleChidWZbaV0pXG4gIH1cbiAgcmV0dXJuIG91dFxufVxuXG5mdW5jdGlvbiB1dGYxNmxlU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgYnl0ZXMgPSBidWYuc2xpY2Uoc3RhcnQsIGVuZClcbiAgdmFyIHJlcyA9ICcnXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYnl0ZXMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICByZXMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShieXRlc1tpXSArIGJ5dGVzW2kgKyAxXSAqIDI1NilcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc2xpY2UgPSBmdW5jdGlvbiBzbGljZSAoc3RhcnQsIGVuZCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgc3RhcnQgPSB+fnN0YXJ0XG4gIGVuZCA9IGVuZCA9PT0gdW5kZWZpbmVkID8gbGVuIDogfn5lbmRcblxuICBpZiAoc3RhcnQgPCAwKSB7XG4gICAgc3RhcnQgKz0gbGVuXG4gICAgaWYgKHN0YXJ0IDwgMCkgc3RhcnQgPSAwXG4gIH0gZWxzZSBpZiAoc3RhcnQgPiBsZW4pIHtcbiAgICBzdGFydCA9IGxlblxuICB9XG5cbiAgaWYgKGVuZCA8IDApIHtcbiAgICBlbmQgKz0gbGVuXG4gICAgaWYgKGVuZCA8IDApIGVuZCA9IDBcbiAgfSBlbHNlIGlmIChlbmQgPiBsZW4pIHtcbiAgICBlbmQgPSBsZW5cbiAgfVxuXG4gIGlmIChlbmQgPCBzdGFydCkgZW5kID0gc3RhcnRcblxuICB2YXIgbmV3QnVmXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIG5ld0J1ZiA9IHRoaXMuc3ViYXJyYXkoc3RhcnQsIGVuZClcbiAgICBuZXdCdWYuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICB9IGVsc2Uge1xuICAgIHZhciBzbGljZUxlbiA9IGVuZCAtIHN0YXJ0XG4gICAgbmV3QnVmID0gbmV3IEJ1ZmZlcihzbGljZUxlbiwgdW5kZWZpbmVkKVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpY2VMZW47ICsraSkge1xuICAgICAgbmV3QnVmW2ldID0gdGhpc1tpICsgc3RhcnRdXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ld0J1ZlxufVxuXG4vKlxuICogTmVlZCB0byBtYWtlIHN1cmUgdGhhdCBidWZmZXIgaXNuJ3QgdHJ5aW5nIHRvIHdyaXRlIG91dCBvZiBib3VuZHMuXG4gKi9cbmZ1bmN0aW9uIGNoZWNrT2Zmc2V0IChvZmZzZXQsIGV4dCwgbGVuZ3RoKSB7XG4gIGlmICgob2Zmc2V0ICUgMSkgIT09IDAgfHwgb2Zmc2V0IDwgMCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ29mZnNldCBpcyBub3QgdWludCcpXG4gIGlmIChvZmZzZXQgKyBleHQgPiBsZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdUcnlpbmcgdG8gYWNjZXNzIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludExFID0gZnVuY3Rpb24gcmVhZFVJbnRMRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldF1cbiAgdmFyIG11bCA9IDFcbiAgdmFyIGkgPSAwXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgaV0gKiBtdWxcbiAgfVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludEJFID0gZnVuY3Rpb24gcmVhZFVJbnRCRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcbiAgfVxuXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldCArIC0tYnl0ZUxlbmd0aF1cbiAgdmFyIG11bCA9IDFcbiAgd2hpbGUgKGJ5dGVMZW5ndGggPiAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgLS1ieXRlTGVuZ3RoXSAqIG11bFxuICB9XG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50OCA9IGZ1bmN0aW9uIHJlYWRVSW50OCAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDEsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gdGhpc1tvZmZzZXRdXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQxNkxFID0gZnVuY3Rpb24gcmVhZFVJbnQxNkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiB0aGlzW29mZnNldF0gfCAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MTZCRSA9IGZ1bmN0aW9uIHJlYWRVSW50MTZCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSA8PCA4KSB8IHRoaXNbb2Zmc2V0ICsgMV1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDMyTEUgPSBmdW5jdGlvbiByZWFkVUludDMyTEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKCh0aGlzW29mZnNldF0pIHxcbiAgICAgICh0aGlzW29mZnNldCArIDFdIDw8IDgpIHxcbiAgICAgICh0aGlzW29mZnNldCArIDJdIDw8IDE2KSkgK1xuICAgICAgKHRoaXNbb2Zmc2V0ICsgM10gKiAweDEwMDAwMDApXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkJFID0gZnVuY3Rpb24gcmVhZFVJbnQzMkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0gKiAweDEwMDAwMDApICtcbiAgICAoKHRoaXNbb2Zmc2V0ICsgMV0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCA4KSB8XG4gICAgdGhpc1tvZmZzZXQgKyAzXSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50TEUgPSBmdW5jdGlvbiByZWFkSW50TEUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXRdXG4gIHZhciBtdWwgPSAxXG4gIHZhciBpID0gMFxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIGldICogbXVsXG4gIH1cbiAgbXVsICo9IDB4ODBcblxuICBpZiAodmFsID49IG11bCkgdmFsIC09IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50QkUgPSBmdW5jdGlvbiByZWFkSW50QkUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICB2YXIgaSA9IGJ5dGVMZW5ndGhcbiAgdmFyIG11bCA9IDFcbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0ICsgLS1pXVxuICB3aGlsZSAoaSA+IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyAtLWldICogbXVsXG4gIH1cbiAgbXVsICo9IDB4ODBcblxuICBpZiAodmFsID49IG11bCkgdmFsIC09IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50OCA9IGZ1bmN0aW9uIHJlYWRJbnQ4IChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMSwgdGhpcy5sZW5ndGgpXG4gIGlmICghKHRoaXNbb2Zmc2V0XSAmIDB4ODApKSByZXR1cm4gKHRoaXNbb2Zmc2V0XSlcbiAgcmV0dXJuICgoMHhmZiAtIHRoaXNbb2Zmc2V0XSArIDEpICogLTEpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2TEUgPSBmdW5jdGlvbiByZWFkSW50MTZMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXRdIHwgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOClcbiAgcmV0dXJuICh2YWwgJiAweDgwMDApID8gdmFsIHwgMHhGRkZGMDAwMCA6IHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQxNkJFID0gZnVuY3Rpb24gcmVhZEludDE2QkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0ICsgMV0gfCAodGhpc1tvZmZzZXRdIDw8IDgpXG4gIHJldHVybiAodmFsICYgMHg4MDAwKSA/IHZhbCB8IDB4RkZGRjAwMDAgOiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJMRSA9IGZ1bmN0aW9uIHJlYWRJbnQzMkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0pIHxcbiAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAzXSA8PCAyNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJCRSA9IGZ1bmN0aW9uIHJlYWRJbnQzMkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0gPDwgMjQpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCAxNikgfFxuICAgICh0aGlzW29mZnNldCArIDJdIDw8IDgpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAzXSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRmxvYXRMRSA9IGZ1bmN0aW9uIHJlYWRGbG9hdExFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCB0cnVlLCAyMywgNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRmxvYXRCRSA9IGZ1bmN0aW9uIHJlYWRGbG9hdEJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCBmYWxzZSwgMjMsIDQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZERvdWJsZUxFID0gZnVuY3Rpb24gcmVhZERvdWJsZUxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgOCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCB0cnVlLCA1MiwgOClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRG91YmxlQkUgPSBmdW5jdGlvbiByZWFkRG91YmxlQkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA4LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIGZhbHNlLCA1MiwgOClcbn1cblxuZnVuY3Rpb24gY2hlY2tJbnQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgZXh0LCBtYXgsIG1pbikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihidWYpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImJ1ZmZlclwiIGFyZ3VtZW50IG11c3QgYmUgYSBCdWZmZXIgaW5zdGFuY2UnKVxuICBpZiAodmFsdWUgPiBtYXggfHwgdmFsdWUgPCBtaW4pIHRocm93IG5ldyBSYW5nZUVycm9yKCdcInZhbHVlXCIgYXJndW1lbnQgaXMgb3V0IG9mIGJvdW5kcycpXG4gIGlmIChvZmZzZXQgKyBleHQgPiBidWYubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnRMRSA9IGZ1bmN0aW9uIHdyaXRlVUludExFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgdmFyIG1heEJ5dGVzID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpIC0gMVxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG1heEJ5dGVzLCAwKVxuICB9XG5cbiAgdmFyIG11bCA9IDFcbiAgdmFyIGkgPSAwXG4gIHRoaXNbb2Zmc2V0XSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAodmFsdWUgLyBtdWwpICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnRCRSA9IGZ1bmN0aW9uIHdyaXRlVUludEJFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgdmFyIG1heEJ5dGVzID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpIC0gMVxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG1heEJ5dGVzLCAwKVxuICB9XG5cbiAgdmFyIGkgPSBieXRlTGVuZ3RoIC0gMVxuICB2YXIgbXVsID0gMVxuICB0aGlzW29mZnNldCArIGldID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgtLWkgPj0gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAodmFsdWUgLyBtdWwpICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQ4ID0gZnVuY3Rpb24gd3JpdGVVSW50OCAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAxLCAweGZmLCAwKVxuICBpZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB2YWx1ZSA9IE1hdGguZmxvb3IodmFsdWUpXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyAxXG59XG5cbmZ1bmN0aW9uIG9iamVjdFdyaXRlVUludDE2IChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbikge1xuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmZmZiArIHZhbHVlICsgMVxuICBmb3IgKHZhciBpID0gMCwgaiA9IE1hdGgubWluKGJ1Zi5sZW5ndGggLSBvZmZzZXQsIDIpOyBpIDwgajsgKytpKSB7XG4gICAgYnVmW29mZnNldCArIGldID0gKHZhbHVlICYgKDB4ZmYgPDwgKDggKiAobGl0dGxlRW5kaWFuID8gaSA6IDEgLSBpKSkpKSA+Pj5cbiAgICAgIChsaXR0bGVFbmRpYW4gPyBpIDogMSAtIGkpICogOFxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MTZMRSA9IGZ1bmN0aW9uIHdyaXRlVUludDE2TEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHhmZmZmLCAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2QkUgPSBmdW5jdGlvbiB3cml0ZVVJbnQxNkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4ZmZmZiwgMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbmZ1bmN0aW9uIG9iamVjdFdyaXRlVUludDMyIChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbikge1xuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmZmZmZmZmYgKyB2YWx1ZSArIDFcbiAgZm9yICh2YXIgaSA9IDAsIGogPSBNYXRoLm1pbihidWYubGVuZ3RoIC0gb2Zmc2V0LCA0KTsgaSA8IGo7ICsraSkge1xuICAgIGJ1ZltvZmZzZXQgKyBpXSA9ICh2YWx1ZSA+Pj4gKGxpdHRsZUVuZGlhbiA/IGkgOiAzIC0gaSkgKiA4KSAmIDB4ZmZcbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyTEUgPSBmdW5jdGlvbiB3cml0ZVVJbnQzMkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4ZmZmZmZmZmYsIDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgPj4+IDI0KVxuICAgIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDE2KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJCRSA9IGZ1bmN0aW9uIHdyaXRlVUludDMyQkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHhmZmZmZmZmZiwgMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiAyNClcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiAxNilcbiAgICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnRMRSA9IGZ1bmN0aW9uIHdyaXRlSW50TEUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBsaW1pdCA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoIC0gMSlcblxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIGxpbWl0IC0gMSwgLWxpbWl0KVxuICB9XG5cbiAgdmFyIGkgPSAwXG4gIHZhciBtdWwgPSAxXG4gIHZhciBzdWIgPSAwXG4gIHRoaXNbb2Zmc2V0XSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIGlmICh2YWx1ZSA8IDAgJiYgc3ViID09PSAwICYmIHRoaXNbb2Zmc2V0ICsgaSAtIDFdICE9PSAwKSB7XG4gICAgICBzdWIgPSAxXG4gICAgfVxuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAoKHZhbHVlIC8gbXVsKSA+PiAwKSAtIHN1YiAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnRCRSA9IGZ1bmN0aW9uIHdyaXRlSW50QkUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBsaW1pdCA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoIC0gMSlcblxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIGxpbWl0IC0gMSwgLWxpbWl0KVxuICB9XG5cbiAgdmFyIGkgPSBieXRlTGVuZ3RoIC0gMVxuICB2YXIgbXVsID0gMVxuICB2YXIgc3ViID0gMFxuICB0aGlzW29mZnNldCArIGldID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgtLWkgPj0gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIGlmICh2YWx1ZSA8IDAgJiYgc3ViID09PSAwICYmIHRoaXNbb2Zmc2V0ICsgaSArIDFdICE9PSAwKSB7XG4gICAgICBzdWIgPSAxXG4gICAgfVxuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAoKHZhbHVlIC8gbXVsKSA+PiAwKSAtIHN1YiAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQ4ID0gZnVuY3Rpb24gd3JpdGVJbnQ4ICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDEsIDB4N2YsIC0weDgwKVxuICBpZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB2YWx1ZSA9IE1hdGguZmxvb3IodmFsdWUpXG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZiArIHZhbHVlICsgMVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgMVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MTZMRSA9IGZ1bmN0aW9uIHdyaXRlSW50MTZMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweDdmZmYsIC0weDgwMDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkJFID0gZnVuY3Rpb24gd3JpdGVJbnQxNkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4N2ZmZiwgLTB4ODAwMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQzMkxFID0gZnVuY3Rpb24gd3JpdGVJbnQzMkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4N2ZmZmZmZmYsIC0weDgwMDAwMDAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gICAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSA+Pj4gMjQpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJCRSA9IGZ1bmN0aW9uIHdyaXRlSW50MzJCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweDdmZmZmZmZmLCAtMHg4MDAwMDAwMClcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmZmZmZmZmICsgdmFsdWUgKyAxXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gMjQpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gICAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5mdW5jdGlvbiBjaGVja0lFRUU3NTQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgZXh0LCBtYXgsIG1pbikge1xuICBpZiAob2Zmc2V0ICsgZXh0ID4gYnVmLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG4gIGlmIChvZmZzZXQgPCAwKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbn1cblxuZnVuY3Rpb24gd3JpdGVGbG9hdCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja0lFRUU3NTQoYnVmLCB2YWx1ZSwgb2Zmc2V0LCA0LCAzLjQwMjgyMzQ2NjM4NTI4ODZlKzM4LCAtMy40MDI4MjM0NjYzODUyODg2ZSszOClcbiAgfVxuICBpZWVlNzU0LndyaXRlKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCAyMywgNClcbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUZsb2F0TEUgPSBmdW5jdGlvbiB3cml0ZUZsb2F0TEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZUZsb2F0KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRmxvYXRCRSA9IGZ1bmN0aW9uIHdyaXRlRmxvYXRCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRmxvYXQodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiB3cml0ZURvdWJsZSAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja0lFRUU3NTQoYnVmLCB2YWx1ZSwgb2Zmc2V0LCA4LCAxLjc5NzY5MzEzNDg2MjMxNTdFKzMwOCwgLTEuNzk3NjkzMTM0ODYyMzE1N0UrMzA4KVxuICB9XG4gIGllZWU3NTQud3JpdGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDUyLCA4KVxuICByZXR1cm4gb2Zmc2V0ICsgOFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRG91YmxlTEUgPSBmdW5jdGlvbiB3cml0ZURvdWJsZUxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVEb3VibGUodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVCRSA9IGZ1bmN0aW9uIHdyaXRlRG91YmxlQkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZURvdWJsZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbi8vIGNvcHkodGFyZ2V0QnVmZmVyLCB0YXJnZXRTdGFydD0wLCBzb3VyY2VTdGFydD0wLCBzb3VyY2VFbmQ9YnVmZmVyLmxlbmd0aClcbkJ1ZmZlci5wcm90b3R5cGUuY29weSA9IGZ1bmN0aW9uIGNvcHkgKHRhcmdldCwgdGFyZ2V0U3RhcnQsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKCFzdGFydCkgc3RhcnQgPSAwXG4gIGlmICghZW5kICYmIGVuZCAhPT0gMCkgZW5kID0gdGhpcy5sZW5ndGhcbiAgaWYgKHRhcmdldFN0YXJ0ID49IHRhcmdldC5sZW5ndGgpIHRhcmdldFN0YXJ0ID0gdGFyZ2V0Lmxlbmd0aFxuICBpZiAoIXRhcmdldFN0YXJ0KSB0YXJnZXRTdGFydCA9IDBcbiAgaWYgKGVuZCA+IDAgJiYgZW5kIDwgc3RhcnQpIGVuZCA9IHN0YXJ0XG5cbiAgLy8gQ29weSAwIGJ5dGVzOyB3ZSdyZSBkb25lXG4gIGlmIChlbmQgPT09IHN0YXJ0KSByZXR1cm4gMFxuICBpZiAodGFyZ2V0Lmxlbmd0aCA9PT0gMCB8fCB0aGlzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIDBcblxuICAvLyBGYXRhbCBlcnJvciBjb25kaXRpb25zXG4gIGlmICh0YXJnZXRTdGFydCA8IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcigndGFyZ2V0U3RhcnQgb3V0IG9mIGJvdW5kcycpXG4gIH1cbiAgaWYgKHN0YXJ0IDwgMCB8fCBzdGFydCA+PSB0aGlzLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3NvdXJjZVN0YXJ0IG91dCBvZiBib3VuZHMnKVxuICBpZiAoZW5kIDwgMCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3NvdXJjZUVuZCBvdXQgb2YgYm91bmRzJylcblxuICAvLyBBcmUgd2Ugb29iP1xuICBpZiAoZW5kID4gdGhpcy5sZW5ndGgpIGVuZCA9IHRoaXMubGVuZ3RoXG4gIGlmICh0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0U3RhcnQgPCBlbmQgLSBzdGFydCkge1xuICAgIGVuZCA9IHRhcmdldC5sZW5ndGggLSB0YXJnZXRTdGFydCArIHN0YXJ0XG4gIH1cblxuICB2YXIgbGVuID0gZW5kIC0gc3RhcnRcbiAgdmFyIGlcblxuICBpZiAodGhpcyA9PT0gdGFyZ2V0ICYmIHN0YXJ0IDwgdGFyZ2V0U3RhcnQgJiYgdGFyZ2V0U3RhcnQgPCBlbmQpIHtcbiAgICAvLyBkZXNjZW5kaW5nIGNvcHkgZnJvbSBlbmRcbiAgICBmb3IgKGkgPSBsZW4gLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgdGFyZ2V0W2kgKyB0YXJnZXRTdGFydF0gPSB0aGlzW2kgKyBzdGFydF1cbiAgICB9XG4gIH0gZWxzZSBpZiAobGVuIDwgMTAwMCB8fCAhQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICAvLyBhc2NlbmRpbmcgY29weSBmcm9tIHN0YXJ0XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICB0YXJnZXRbaSArIHRhcmdldFN0YXJ0XSA9IHRoaXNbaSArIHN0YXJ0XVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBVaW50OEFycmF5LnByb3RvdHlwZS5zZXQuY2FsbChcbiAgICAgIHRhcmdldCxcbiAgICAgIHRoaXMuc3ViYXJyYXkoc3RhcnQsIHN0YXJ0ICsgbGVuKSxcbiAgICAgIHRhcmdldFN0YXJ0XG4gICAgKVxuICB9XG5cbiAgcmV0dXJuIGxlblxufVxuXG4vLyBVc2FnZTpcbi8vICAgIGJ1ZmZlci5maWxsKG51bWJlclssIG9mZnNldFssIGVuZF1dKVxuLy8gICAgYnVmZmVyLmZpbGwoYnVmZmVyWywgb2Zmc2V0WywgZW5kXV0pXG4vLyAgICBidWZmZXIuZmlsbChzdHJpbmdbLCBvZmZzZXRbLCBlbmRdXVssIGVuY29kaW5nXSlcbkJ1ZmZlci5wcm90b3R5cGUuZmlsbCA9IGZ1bmN0aW9uIGZpbGwgKHZhbCwgc3RhcnQsIGVuZCwgZW5jb2RpbmcpIHtcbiAgLy8gSGFuZGxlIHN0cmluZyBjYXNlczpcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnKSB7XG4gICAgaWYgKHR5cGVvZiBzdGFydCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGVuY29kaW5nID0gc3RhcnRcbiAgICAgIHN0YXJ0ID0gMFxuICAgICAgZW5kID0gdGhpcy5sZW5ndGhcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBlbmQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBlbmNvZGluZyA9IGVuZFxuICAgICAgZW5kID0gdGhpcy5sZW5ndGhcbiAgICB9XG4gICAgaWYgKHZhbC5sZW5ndGggPT09IDEpIHtcbiAgICAgIHZhciBjb2RlID0gdmFsLmNoYXJDb2RlQXQoMClcbiAgICAgIGlmIChjb2RlIDwgMjU2KSB7XG4gICAgICAgIHZhbCA9IGNvZGVcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGVuY29kaW5nICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGVuY29kaW5nICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZW5jb2RpbmcgbXVzdCBiZSBhIHN0cmluZycpXG4gICAgfVxuICAgIGlmICh0eXBlb2YgZW5jb2RpbmcgPT09ICdzdHJpbmcnICYmICFCdWZmZXIuaXNFbmNvZGluZyhlbmNvZGluZykpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICB2YWwgPSB2YWwgJiAyNTVcbiAgfVxuXG4gIC8vIEludmFsaWQgcmFuZ2VzIGFyZSBub3Qgc2V0IHRvIGEgZGVmYXVsdCwgc28gY2FuIHJhbmdlIGNoZWNrIGVhcmx5LlxuICBpZiAoc3RhcnQgPCAwIHx8IHRoaXMubGVuZ3RoIDwgc3RhcnQgfHwgdGhpcy5sZW5ndGggPCBlbmQpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignT3V0IG9mIHJhbmdlIGluZGV4JylcbiAgfVxuXG4gIGlmIChlbmQgPD0gc3RhcnQpIHtcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgc3RhcnQgPSBzdGFydCA+Pj4gMFxuICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IHRoaXMubGVuZ3RoIDogZW5kID4+PiAwXG5cbiAgaWYgKCF2YWwpIHZhbCA9IDBcblxuICB2YXIgaVxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICBmb3IgKGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgICB0aGlzW2ldID0gdmFsXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciBieXRlcyA9IEJ1ZmZlci5pc0J1ZmZlcih2YWwpXG4gICAgICA/IHZhbFxuICAgICAgOiB1dGY4VG9CeXRlcyhuZXcgQnVmZmVyKHZhbCwgZW5jb2RpbmcpLnRvU3RyaW5nKCkpXG4gICAgdmFyIGxlbiA9IGJ5dGVzLmxlbmd0aFxuICAgIGZvciAoaSA9IDA7IGkgPCBlbmQgLSBzdGFydDsgKytpKSB7XG4gICAgICB0aGlzW2kgKyBzdGFydF0gPSBieXRlc1tpICUgbGVuXVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzXG59XG5cbi8vIEhFTFBFUiBGVU5DVElPTlNcbi8vID09PT09PT09PT09PT09PT1cblxudmFyIElOVkFMSURfQkFTRTY0X1JFID0gL1teK1xcLzAtOUEtWmEtei1fXS9nXG5cbmZ1bmN0aW9uIGJhc2U2NGNsZWFuIChzdHIpIHtcbiAgLy8gTm9kZSBzdHJpcHMgb3V0IGludmFsaWQgY2hhcmFjdGVycyBsaWtlIFxcbiBhbmQgXFx0IGZyb20gdGhlIHN0cmluZywgYmFzZTY0LWpzIGRvZXMgbm90XG4gIHN0ciA9IHN0cmluZ3RyaW0oc3RyKS5yZXBsYWNlKElOVkFMSURfQkFTRTY0X1JFLCAnJylcbiAgLy8gTm9kZSBjb252ZXJ0cyBzdHJpbmdzIHdpdGggbGVuZ3RoIDwgMiB0byAnJ1xuICBpZiAoc3RyLmxlbmd0aCA8IDIpIHJldHVybiAnJ1xuICAvLyBOb2RlIGFsbG93cyBmb3Igbm9uLXBhZGRlZCBiYXNlNjQgc3RyaW5ncyAobWlzc2luZyB0cmFpbGluZyA9PT0pLCBiYXNlNjQtanMgZG9lcyBub3RcbiAgd2hpbGUgKHN0ci5sZW5ndGggJSA0ICE9PSAwKSB7XG4gICAgc3RyID0gc3RyICsgJz0nXG4gIH1cbiAgcmV0dXJuIHN0clxufVxuXG5mdW5jdGlvbiBzdHJpbmd0cmltIChzdHIpIHtcbiAgaWYgKHN0ci50cmltKSByZXR1cm4gc3RyLnRyaW0oKVxuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKVxufVxuXG5mdW5jdGlvbiB0b0hleCAobikge1xuICBpZiAobiA8IDE2KSByZXR1cm4gJzAnICsgbi50b1N0cmluZygxNilcbiAgcmV0dXJuIG4udG9TdHJpbmcoMTYpXG59XG5cbmZ1bmN0aW9uIHV0ZjhUb0J5dGVzIChzdHJpbmcsIHVuaXRzKSB7XG4gIHVuaXRzID0gdW5pdHMgfHwgSW5maW5pdHlcbiAgdmFyIGNvZGVQb2ludFxuICB2YXIgbGVuZ3RoID0gc3RyaW5nLmxlbmd0aFxuICB2YXIgbGVhZFN1cnJvZ2F0ZSA9IG51bGxcbiAgdmFyIGJ5dGVzID0gW11cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgY29kZVBvaW50ID0gc3RyaW5nLmNoYXJDb2RlQXQoaSlcblxuICAgIC8vIGlzIHN1cnJvZ2F0ZSBjb21wb25lbnRcbiAgICBpZiAoY29kZVBvaW50ID4gMHhEN0ZGICYmIGNvZGVQb2ludCA8IDB4RTAwMCkge1xuICAgICAgLy8gbGFzdCBjaGFyIHdhcyBhIGxlYWRcbiAgICAgIGlmICghbGVhZFN1cnJvZ2F0ZSkge1xuICAgICAgICAvLyBubyBsZWFkIHlldFxuICAgICAgICBpZiAoY29kZVBvaW50ID4gMHhEQkZGKSB7XG4gICAgICAgICAgLy8gdW5leHBlY3RlZCB0cmFpbFxuICAgICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH0gZWxzZSBpZiAoaSArIDEgPT09IGxlbmd0aCkge1xuICAgICAgICAgIC8vIHVucGFpcmVkIGxlYWRcbiAgICAgICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gdmFsaWQgbGVhZFxuICAgICAgICBsZWFkU3Vycm9nYXRlID0gY29kZVBvaW50XG5cbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgLy8gMiBsZWFkcyBpbiBhIHJvd1xuICAgICAgaWYgKGNvZGVQb2ludCA8IDB4REMwMCkge1xuICAgICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICAgICAgbGVhZFN1cnJvZ2F0ZSA9IGNvZGVQb2ludFxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICAvLyB2YWxpZCBzdXJyb2dhdGUgcGFpclxuICAgICAgY29kZVBvaW50ID0gKGxlYWRTdXJyb2dhdGUgLSAweEQ4MDAgPDwgMTAgfCBjb2RlUG9pbnQgLSAweERDMDApICsgMHgxMDAwMFxuICAgIH0gZWxzZSBpZiAobGVhZFN1cnJvZ2F0ZSkge1xuICAgICAgLy8gdmFsaWQgYm1wIGNoYXIsIGJ1dCBsYXN0IGNoYXIgd2FzIGEgbGVhZFxuICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgfVxuXG4gICAgbGVhZFN1cnJvZ2F0ZSA9IG51bGxcblxuICAgIC8vIGVuY29kZSB1dGY4XG4gICAgaWYgKGNvZGVQb2ludCA8IDB4ODApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gMSkgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChjb2RlUG9pbnQpXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPCAweDgwMCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAyKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHg2IHwgMHhDMCxcbiAgICAgICAgY29kZVBvaW50ICYgMHgzRiB8IDB4ODBcbiAgICAgIClcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA8IDB4MTAwMDApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gMykgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChcbiAgICAgICAgY29kZVBvaW50ID4+IDB4QyB8IDB4RTAsXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgJiAweDNGIHwgMHg4MCxcbiAgICAgICAgY29kZVBvaW50ICYgMHgzRiB8IDB4ODBcbiAgICAgIClcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA8IDB4MTEwMDAwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDQpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDEyIHwgMHhGMCxcbiAgICAgICAgY29kZVBvaW50ID4+IDB4QyAmIDB4M0YgfCAweDgwLFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHg2ICYgMHgzRiB8IDB4ODAsXG4gICAgICAgIGNvZGVQb2ludCAmIDB4M0YgfCAweDgwXG4gICAgICApXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBjb2RlIHBvaW50JylcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnl0ZXNcbn1cblxuZnVuY3Rpb24gYXNjaWlUb0J5dGVzIChzdHIpIHtcbiAgdmFyIGJ5dGVBcnJheSA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgKytpKSB7XG4gICAgLy8gTm9kZSdzIGNvZGUgc2VlbXMgdG8gYmUgZG9pbmcgdGhpcyBhbmQgbm90ICYgMHg3Ri4uXG4gICAgYnl0ZUFycmF5LnB1c2goc3RyLmNoYXJDb2RlQXQoaSkgJiAweEZGKVxuICB9XG4gIHJldHVybiBieXRlQXJyYXlcbn1cblxuZnVuY3Rpb24gdXRmMTZsZVRvQnl0ZXMgKHN0ciwgdW5pdHMpIHtcbiAgdmFyIGMsIGhpLCBsb1xuICB2YXIgYnl0ZUFycmF5ID0gW11cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoKHVuaXRzIC09IDIpIDwgMCkgYnJlYWtcblxuICAgIGMgPSBzdHIuY2hhckNvZGVBdChpKVxuICAgIGhpID0gYyA+PiA4XG4gICAgbG8gPSBjICUgMjU2XG4gICAgYnl0ZUFycmF5LnB1c2gobG8pXG4gICAgYnl0ZUFycmF5LnB1c2goaGkpXG4gIH1cblxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFRvQnl0ZXMgKHN0cikge1xuICByZXR1cm4gYmFzZTY0LnRvQnl0ZUFycmF5KGJhc2U2NGNsZWFuKHN0cikpXG59XG5cbmZ1bmN0aW9uIGJsaXRCdWZmZXIgKHNyYywgZHN0LCBvZmZzZXQsIGxlbmd0aCkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgaWYgKChpICsgb2Zmc2V0ID49IGRzdC5sZW5ndGgpIHx8IChpID49IHNyYy5sZW5ndGgpKSBicmVha1xuICAgIGRzdFtpICsgb2Zmc2V0XSA9IHNyY1tpXVxuICB9XG4gIHJldHVybiBpXG59XG5cbmZ1bmN0aW9uIGlzbmFuICh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gdmFsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2VsZi1jb21wYXJlXG59XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuLy8gTk9URTogVGhlc2UgdHlwZSBjaGVja2luZyBmdW5jdGlvbnMgaW50ZW50aW9uYWxseSBkb24ndCB1c2UgYGluc3RhbmNlb2ZgXG4vLyBiZWNhdXNlIGl0IGlzIGZyYWdpbGUgYW5kIGNhbiBiZSBlYXNpbHkgZmFrZWQgd2l0aCBgT2JqZWN0LmNyZWF0ZSgpYC5cblxuZnVuY3Rpb24gaXNBcnJheShhcmcpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkpIHtcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheShhcmcpO1xuICB9XG4gIHJldHVybiBvYmplY3RUb1N0cmluZyhhcmcpID09PSAnW29iamVjdCBBcnJheV0nO1xufVxuZXhwb3J0cy5pc0FycmF5ID0gaXNBcnJheTtcblxuZnVuY3Rpb24gaXNCb29sZWFuKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Jvb2xlYW4nO1xufVxuZXhwb3J0cy5pc0Jvb2xlYW4gPSBpc0Jvb2xlYW47XG5cbmZ1bmN0aW9uIGlzTnVsbChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gbnVsbDtcbn1cbmV4cG9ydHMuaXNOdWxsID0gaXNOdWxsO1xuXG5mdW5jdGlvbiBpc051bGxPclVuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PSBudWxsO1xufVxuZXhwb3J0cy5pc051bGxPclVuZGVmaW5lZCA9IGlzTnVsbE9yVW5kZWZpbmVkO1xuXG5mdW5jdGlvbiBpc051bWJlcihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdudW1iZXInO1xufVxuZXhwb3J0cy5pc051bWJlciA9IGlzTnVtYmVyO1xuXG5mdW5jdGlvbiBpc1N0cmluZyhhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnO1xufVxuZXhwb3J0cy5pc1N0cmluZyA9IGlzU3RyaW5nO1xuXG5mdW5jdGlvbiBpc1N5bWJvbChhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdzeW1ib2wnO1xufVxuZXhwb3J0cy5pc1N5bWJvbCA9IGlzU3ltYm9sO1xuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gdm9pZCAwO1xufVxuZXhwb3J0cy5pc1VuZGVmaW5lZCA9IGlzVW5kZWZpbmVkO1xuXG5mdW5jdGlvbiBpc1JlZ0V4cChyZSkge1xuICByZXR1cm4gb2JqZWN0VG9TdHJpbmcocmUpID09PSAnW29iamVjdCBSZWdFeHBdJztcbn1cbmV4cG9ydHMuaXNSZWdFeHAgPSBpc1JlZ0V4cDtcblxuZnVuY3Rpb24gaXNPYmplY3QoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnb2JqZWN0JyAmJiBhcmcgIT09IG51bGw7XG59XG5leHBvcnRzLmlzT2JqZWN0ID0gaXNPYmplY3Q7XG5cbmZ1bmN0aW9uIGlzRGF0ZShkKSB7XG4gIHJldHVybiBvYmplY3RUb1N0cmluZyhkKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xufVxuZXhwb3J0cy5pc0RhdGUgPSBpc0RhdGU7XG5cbmZ1bmN0aW9uIGlzRXJyb3IoZSkge1xuICByZXR1cm4gKG9iamVjdFRvU3RyaW5nKGUpID09PSAnW29iamVjdCBFcnJvcl0nIHx8IGUgaW5zdGFuY2VvZiBFcnJvcik7XG59XG5leHBvcnRzLmlzRXJyb3IgPSBpc0Vycm9yO1xuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Z1bmN0aW9uJztcbn1cbmV4cG9ydHMuaXNGdW5jdGlvbiA9IGlzRnVuY3Rpb247XG5cbmZ1bmN0aW9uIGlzUHJpbWl0aXZlKGFyZykge1xuICByZXR1cm4gYXJnID09PSBudWxsIHx8XG4gICAgICAgICB0eXBlb2YgYXJnID09PSAnYm9vbGVhbicgfHxcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdudW1iZXInIHx8XG4gICAgICAgICB0eXBlb2YgYXJnID09PSAnc3RyaW5nJyB8fFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ3N5bWJvbCcgfHwgIC8vIEVTNiBzeW1ib2xcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICd1bmRlZmluZWQnO1xufVxuZXhwb3J0cy5pc1ByaW1pdGl2ZSA9IGlzUHJpbWl0aXZlO1xuXG5leHBvcnRzLmlzQnVmZmVyID0gQnVmZmVyLmlzQnVmZmVyO1xuXG5mdW5jdGlvbiBvYmplY3RUb1N0cmluZyhvKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobyk7XG59XG4iLCJcblxuY2xhc3MgUmVzaXplYWJsZUJ1ZmZlcntcbiAgY29uc3RydWN0b3Ioc2l6ZT0xMDApe1xuICAgIHRoaXMuc2l6ZSA9IHNpemVcbiAgICB0aGlzLmxlbmd0aCA9IDBcbiAgICB0aGlzLmJ1ZiA9IEJ1ZmZlci5hbGxvYyhzaXplKVxuICB9XG4gIHByZXBlbmQodmFsKXtcbiAgICBjb25zdCBsZW5ndGggPSB0aGlzLmxlbmd0aCsrXG4gICAgaWYobGVuZ3RoID09PSB0aGlzLnNpemUpe1xuICAgICAgdGhpcy5yZXNpemUoKVxuICAgIH1cbiAgICBjb25zdCBidWYgPSB0aGlzLmNsb25lKClcbiAgICB0aGlzLmJ1ZlswXSA9IHZhbFxuICAgIGJ1Zi5jb3B5KHRoaXMuYnVmLDEsIDAsIGxlbmd0aClcbiAgfVxuICBhcHBlbmQodmFsKXtcbiAgICBjb25zdCBsZW5ndGggPSB0aGlzLmxlbmd0aCsrXG4gICAgaWYobGVuZ3RoID09PSB0aGlzLnNpemUpe1xuICAgICAgdGhpcy5yZXNpemUoKVxuICAgIH1cbiAgICB0aGlzLmJ1ZltsZW5ndGhdID0gdmFsXG4gIH1cbiAgY2xvbmUoKXtcbiAgICByZXR1cm4gQnVmZmVyLmZyb20odGhpcy5idWYuc2xpY2UoMCwgdGhpcy5sZW5ndGgpKVxuICB9XG4gIHJlc2l6ZSgpe1xuICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMubGVuZ3RoXG4gICAgdGhpcy5zaXplID0gdGhpcy5zaXplICogMlxuICAgIGNvbnN0IGJ1ZiA9IEJ1ZmZlci5hbGxvYyh0aGlzLnNpemUpXG4gICAgdGhpcy5idWYuY29weShidWYsMCwgMCwgbGVuZ3RoKVxuICAgIHRoaXMuYnVmID0gYnVmXG4gIH1cbiAgdG9TdHJpbmcoKXtcbiAgICByZXR1cm4gdGhpcy5idWYuc2xpY2UoMCwgdGhpcy5sZW5ndGgpLnRvU3RyaW5nKClcbiAgfVxuICB0b0pTT04oKXtcbiAgICByZXR1cm4gdGhpcy50b1N0cmluZygpXG4gIH1cbiAgcmVzZXQoKXtcbiAgICB0aGlzLmxlbmd0aCA9IDBcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlc2l6ZWFibGVCdWZmZXJcbiIsIlxuLypcbkNTViBQYXJzZVxuXG5QbGVhc2UgbG9vayBhdCB0aGUgW3Byb2plY3QgZG9jdW1lbnRhdGlvbl0oaHR0cHM6Ly9jc3YuanMub3JnL3BhcnNlLykgZm9yIGFkZGl0aW9uYWxcbmluZm9ybWF0aW9uLlxuKi9cblxuY29uc3QgeyBUcmFuc2Zvcm0gfSA9IHJlcXVpcmUoJ3N0cmVhbScpXG5jb25zdCBSZXNpemVhYmxlQnVmZmVyID0gcmVxdWlyZSgnLi9SZXNpemVhYmxlQnVmZmVyJylcblxuY29uc3QgY3IgPSAxM1xuY29uc3QgbmwgPSAxMFxuY29uc3Qgc3BhY2UgPSAzMlxuY29uc3QgdGFiID0gOVxuY29uc3QgYm9tX3V0ZjggPSBCdWZmZXIuZnJvbShbMjM5LCAxODcsIDE5MV0pXG5cbmNsYXNzIFBhcnNlciBleHRlbmRzIFRyYW5zZm9ybSB7XG4gIGNvbnN0cnVjdG9yKG9wdHMgPSB7fSl7XG4gICAgc3VwZXIoey4uLntyZWFkYWJsZU9iamVjdE1vZGU6IHRydWV9LCAuLi5vcHRzfSlcbiAgICBjb25zdCBvcHRpb25zID0ge31cbiAgICAvLyBNZXJnZSB3aXRoIHVzZXIgb3B0aW9uc1xuICAgIGZvcihsZXQgb3B0IGluIG9wdHMpe1xuICAgICAgb3B0aW9uc1t1bmRlcnNjb3JlKG9wdCldID0gb3B0c1tvcHRdXG4gICAgfVxuICAgIC8vIE5vcm1hbGl6ZSBvcHRpb24gYGJvbWBcbiAgICBpZihvcHRpb25zLmJvbSA9PT0gdW5kZWZpbmVkIHx8IG9wdGlvbnMuYm9tID09PSBudWxsIHx8IG9wdGlvbnMuYm9tID09PSBmYWxzZSl7XG4gICAgICBvcHRpb25zLmJvbSA9IGZhbHNlXG4gICAgfWVsc2UgaWYob3B0aW9ucy5ib20gIT09IHRydWUpe1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIE9wdGlvbjogYm9tIG11c3QgYmUgdHJ1ZSwgZ290ICR7SlNPTi5zdHJpbmdpZnkob3B0aW9ucy5ib20pfWApXG4gICAgfVxuICAgIC8vIE5vcm1hbGl6ZSBvcHRpb24gYGNhc3RgXG4gICAgbGV0IGZuQ2FzdEZpZWxkID0gbnVsbFxuICAgIGlmKG9wdGlvbnMuY2FzdCA9PT0gdW5kZWZpbmVkIHx8IG9wdGlvbnMuY2FzdCA9PT0gbnVsbCB8fCBvcHRpb25zLmNhc3QgPT09IGZhbHNlIHx8IG9wdGlvbnMuY2FzdCA9PT0gJycpe1xuICAgICAgb3B0aW9ucy5jYXN0ID0gdW5kZWZpbmVkXG4gICAgfWVsc2UgaWYodHlwZW9mIG9wdGlvbnMuY2FzdCA9PT0gJ2Z1bmN0aW9uJyl7XG4gICAgICBmbkNhc3RGaWVsZCA9IG9wdGlvbnMuY2FzdFxuICAgICAgb3B0aW9ucy5jYXN0ID0gdHJ1ZVxuICAgIH1lbHNlIGlmKG9wdGlvbnMuY2FzdCAhPT0gdHJ1ZSl7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgT3B0aW9uOiBjYXN0IG11c3QgYmUgdHJ1ZSBvciBhIGZ1bmN0aW9uJylcbiAgICB9XG4gICAgLy8gTm9ybWFsaXplIG9wdGlvbiBgY2FzdF9kYXRlYFxuICAgIGlmKG9wdGlvbnMuY2FzdF9kYXRlID09PSB1bmRlZmluZWQgfHwgb3B0aW9ucy5jYXN0X2RhdGUgPT09IG51bGwgfHwgb3B0aW9ucy5jYXN0X2RhdGUgPT09IGZhbHNlIHx8IG9wdGlvbnMuY2FzdF9kYXRlID09PSAnJyl7XG4gICAgICBvcHRpb25zLmNhc3RfZGF0ZSA9IGZhbHNlXG4gICAgfWVsc2UgaWYob3B0aW9ucy5jYXN0X2RhdGUgPT09IHRydWUpe1xuICAgICAgb3B0aW9ucy5jYXN0X2RhdGUgPSBmdW5jdGlvbih2YWx1ZSl7XG4gICAgICAgIGNvbnN0IGRhdGUgPSBEYXRlLnBhcnNlKHZhbHVlKVxuICAgICAgICByZXR1cm4gIWlzTmFOKGRhdGUpID8gbmV3IERhdGUoZGF0ZSkgOiB2YWx1ZVxuICAgICAgfVxuICAgIH1lbHNlIGlmKHR5cGVvZiBvcHRpb25zLmNhc3RfZGF0ZSAhPT0gJ2Z1bmN0aW9uJyl7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgT3B0aW9uOiBjYXN0X2RhdGUgbXVzdCBiZSB0cnVlIG9yIGEgZnVuY3Rpb24nKVxuICAgIH1cbiAgICAvLyBOb3JtYWxpemUgb3B0aW9uIGBjb2x1bW5zYFxuICAgIGxldCBmbkZpcnN0TGluZVRvSGVhZGVycyA9IG51bGxcbiAgICBpZihvcHRpb25zLmNvbHVtbnMgPT09IHRydWUpe1xuICAgICAgLy8gRmllbGRzIGluIHRoZSBmaXJzdCBsaW5lIGFyZSBjb252ZXJ0ZWQgYXMtaXMgdG8gY29sdW1uc1xuICAgICAgZm5GaXJzdExpbmVUb0hlYWRlcnMgPSB1bmRlZmluZWRcbiAgICB9ZWxzZSBpZih0eXBlb2Ygb3B0aW9ucy5jb2x1bW5zID09PSAnZnVuY3Rpb24nKXtcbiAgICAgIGZuRmlyc3RMaW5lVG9IZWFkZXJzID0gb3B0aW9ucy5jb2x1bW5zXG4gICAgICBvcHRpb25zLmNvbHVtbnMgPSB0cnVlXG4gICAgfWVsc2UgaWYoQXJyYXkuaXNBcnJheShvcHRpb25zLmNvbHVtbnMpKXtcbiAgICAgIG9wdGlvbnMuY29sdW1ucyA9IG5vcm1hbGl6ZUNvbHVtbnNBcnJheShvcHRpb25zLmNvbHVtbnMpXG4gICAgfWVsc2UgaWYob3B0aW9ucy5jb2x1bW5zID09PSB1bmRlZmluZWQgfHwgb3B0aW9ucy5jb2x1bW5zID09PSBudWxsIHx8IG9wdGlvbnMuY29sdW1ucyA9PT0gZmFsc2Upe1xuICAgICAgb3B0aW9ucy5jb2x1bW5zID0gZmFsc2VcbiAgICB9ZWxzZXtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBPcHRpb24gY29sdW1uczogZXhwZWN0IGFuIG9iamVjdCBvciB0cnVlLCBnb3QgJHtKU09OLnN0cmluZ2lmeShvcHRpb25zLmNvbHVtbnMpfWApXG4gICAgfVxuICAgIC8vIE5vcm1hbGl6ZSBvcHRpb24gYGNvbW1lbnRgXG4gICAgaWYob3B0aW9ucy5jb21tZW50ID09PSB1bmRlZmluZWQgfHwgb3B0aW9ucy5jb21tZW50ID09PSBudWxsIHx8IG9wdGlvbnMuY29tbWVudCA9PT0gZmFsc2UgfHwgb3B0aW9ucy5jb21tZW50ID09PSAnJyl7XG4gICAgICBvcHRpb25zLmNvbW1lbnQgPSBudWxsXG4gICAgfWVsc2V7XG4gICAgICBpZih0eXBlb2Ygb3B0aW9ucy5jb21tZW50ID09PSAnc3RyaW5nJyl7XG4gICAgICAgIG9wdGlvbnMuY29tbWVudCA9IEJ1ZmZlci5mcm9tKG9wdGlvbnMuY29tbWVudClcbiAgICAgIH1cbiAgICAgIGlmKCFCdWZmZXIuaXNCdWZmZXIob3B0aW9ucy5jb21tZW50KSl7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBPcHRpb246IGNvbW1lbnQgbXVzdCBiZSBhIGJ1ZmZlciBvciBhIHN0cmluZywgZ290ICR7SlNPTi5zdHJpbmdpZnkob3B0aW9ucy5jb21tZW50KX1gKVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBOb3JtYWxpemUgb3B0aW9uIGBkZWxpbWl0ZXJgXG4gICAgaWYob3B0aW9ucy5kZWxpbWl0ZXIgPT09IHVuZGVmaW5lZCB8fCBvcHRpb25zLmRlbGltaXRlciA9PT0gbnVsbCB8fCBvcHRpb25zLmRlbGltaXRlciA9PT0gZmFsc2Upe1xuICAgICAgb3B0aW9ucy5kZWxpbWl0ZXIgPSBCdWZmZXIuZnJvbSgnLCcpXG4gICAgfWVsc2UgaWYoQnVmZmVyLmlzQnVmZmVyKG9wdGlvbnMuZGVsaW1pdGVyKSl7XG4gICAgICBpZihvcHRpb25zLmRlbGltaXRlci5sZW5ndGggPT09IDApe1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgT3B0aW9uOiBkZWxpbWl0ZXIgbXVzdCBiZSBhIG5vbiBlbXB0eSBidWZmZXJgKVxuICAgICAgfVxuICAgICAgLy8gR3JlYXQsIG5vdGhpbmcgdG8gZG9cbiAgICB9ZWxzZSBpZih0eXBlb2Ygb3B0aW9ucy5kZWxpbWl0ZXIgPT09ICdzdHJpbmcnKXtcbiAgICAgIGlmKG9wdGlvbnMuZGVsaW1pdGVyLmxlbmd0aCA9PT0gMCl7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBPcHRpb246IGRlbGltaXRlciBtdXN0IGJlIGEgbm9uIGVtcHR5IHN0cmluZ2ApXG4gICAgICB9XG4gICAgICBvcHRpb25zLmRlbGltaXRlciA9IEJ1ZmZlci5mcm9tKG9wdGlvbnMuZGVsaW1pdGVyKVxuICAgIH1lbHNle1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIE9wdGlvbjogZGVsaW1pdGVyIG11c3QgYmUgYSBzdHJpbmcgb3IgYSBidWZmZXIsIGdvdCAke29wdGlvbnMuZGVsaW1pdGVyfWApXG4gICAgfVxuICAgIC8vIE5vcm1hbGl6ZSBvcHRpb24gYGVzY2FwZWBcbiAgICBpZihvcHRpb25zLmVzY2FwZSA9PT0gdW5kZWZpbmVkIHx8IG9wdGlvbnMuZXNjYXBlID09PSBudWxsKXtcbiAgICAgIG9wdGlvbnMuZXNjYXBlID0gQnVmZmVyLmZyb20oJ1wiJylcbiAgICB9ZWxzZSBpZih0eXBlb2Ygb3B0aW9ucy5lc2NhcGUgPT09ICdzdHJpbmcnKXtcbiAgICAgIG9wdGlvbnMuZXNjYXBlID0gQnVmZmVyLmZyb20ob3B0aW9ucy5lc2NhcGUpXG4gICAgfVxuICAgIGlmKCFCdWZmZXIuaXNCdWZmZXIob3B0aW9ucy5lc2NhcGUpKXtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBPcHRpb246IGVzY2FwZSBtdXN0IGJlIGEgYnVmZmVyIG9yIGEgc3RyaW5nLCBnb3QgJHtKU09OLnN0cmluZ2lmeShvcHRpb25zLmVzY2FwZSl9YClcbiAgICB9ZWxzZSBpZihvcHRpb25zLmVzY2FwZS5sZW5ndGggIT09IDEpe1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIE9wdGlvbiBMZW5ndGg6IGVzY2FwZSBtdXN0IGJlIG9uZSBjaGFyYWN0ZXIsIGdvdCAke29wdGlvbnMuZXNjYXBlLmxlbmd0aH1gKVxuICAgIH1lbHNle1xuICAgICAgb3B0aW9ucy5lc2NhcGUgPSBvcHRpb25zLmVzY2FwZVswXVxuICAgIH1cbiAgICAvLyBOb3JtYWxpemUgb3B0aW9uIGBmcm9tYFxuICAgIGlmKG9wdGlvbnMuZnJvbSA9PT0gdW5kZWZpbmVkIHx8IG9wdGlvbnMuZnJvbSA9PT0gbnVsbCl7XG4gICAgICBvcHRpb25zLmZyb20gPSAxXG4gICAgfWVsc2V7XG4gICAgICBpZih0eXBlb2Ygb3B0aW9ucy5mcm9tID09PSAnc3RyaW5nJyAmJiAvXFxkKy8udGVzdChvcHRpb25zLmZyb20pKXtcbiAgICAgICAgb3B0aW9ucy5mcm9tID0gcGFyc2VJbnQob3B0aW9ucy5mcm9tKVxuICAgICAgfVxuICAgICAgaWYoTnVtYmVyLmlzSW50ZWdlcihvcHRpb25zLmZyb20pKXtcbiAgICAgICAgaWYob3B0aW9ucy5mcm9tIDwgMCl7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIE9wdGlvbjogZnJvbSBtdXN0IGJlIGEgcG9zaXRpdmUgaW50ZWdlciwgZ290ICR7SlNPTi5zdHJpbmdpZnkob3B0cy5mcm9tKX1gKVxuICAgICAgICB9XG4gICAgICB9ZWxzZXtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIE9wdGlvbjogZnJvbSBtdXN0IGJlIGFuIGludGVnZXIsIGdvdCAke0pTT04uc3RyaW5naWZ5KG9wdGlvbnMuZnJvbSl9YClcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gTm9ybWFsaXplIG9wdGlvbiBgZnJvbV9saW5lYFxuICAgIGlmKG9wdGlvbnMuZnJvbV9saW5lID09PSB1bmRlZmluZWQgfHwgb3B0aW9ucy5mcm9tX2xpbmUgPT09IG51bGwpe1xuICAgICAgb3B0aW9ucy5mcm9tX2xpbmUgPSAxXG4gICAgfWVsc2V7XG4gICAgICBpZih0eXBlb2Ygb3B0aW9ucy5mcm9tX2xpbmUgPT09ICdzdHJpbmcnICYmIC9cXGQrLy50ZXN0KG9wdGlvbnMuZnJvbV9saW5lKSl7XG4gICAgICAgIG9wdGlvbnMuZnJvbV9saW5lID0gcGFyc2VJbnQob3B0aW9ucy5mcm9tX2xpbmUpXG4gICAgICB9XG4gICAgICBpZihOdW1iZXIuaXNJbnRlZ2VyKG9wdGlvbnMuZnJvbV9saW5lKSl7XG4gICAgICAgIGlmKG9wdGlvbnMuZnJvbV9saW5lIDw9IDApe1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBPcHRpb246IGZyb21fbGluZSBtdXN0IGJlIGEgcG9zaXRpdmUgaW50ZWdlciBncmVhdGVyIHRoYW4gMCwgZ290ICR7SlNPTi5zdHJpbmdpZnkob3B0cy5mcm9tX2xpbmUpfWApXG4gICAgICAgIH1cbiAgICAgIH1lbHNle1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgT3B0aW9uOiBmcm9tX2xpbmUgbXVzdCBiZSBhbiBpbnRlZ2VyLCBnb3QgJHtKU09OLnN0cmluZ2lmeShvcHRzLmZyb21fbGluZSl9YClcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gTm9ybWFsaXplIG9wdGlvbiBgaW5mb2BcbiAgICBpZihvcHRpb25zLmluZm8gPT09IHVuZGVmaW5lZCB8fCBvcHRpb25zLmluZm8gPT09IG51bGwgfHwgb3B0aW9ucy5pbmZvID09PSBmYWxzZSl7XG4gICAgICBvcHRpb25zLmluZm8gPSBmYWxzZVxuICAgIH1lbHNlIGlmKG9wdGlvbnMuaW5mbyAhPT0gdHJ1ZSl7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgT3B0aW9uOiBpbmZvIG11c3QgYmUgdHJ1ZSwgZ290ICR7SlNPTi5zdHJpbmdpZnkob3B0aW9ucy5pbmZvKX1gKVxuICAgIH1cbiAgICAvLyBOb3JtYWxpemUgb3B0aW9uIGBtYXhfcmVjb3JkX3NpemVgXG4gICAgaWYob3B0aW9ucy5tYXhfcmVjb3JkX3NpemUgPT09IHVuZGVmaW5lZCB8fCBvcHRpb25zLm1heF9yZWNvcmRfc2l6ZSA9PT0gbnVsbCB8fCBvcHRpb25zLm1heF9yZWNvcmRfc2l6ZSA9PT0gZmFsc2Upe1xuICAgICAgb3B0aW9ucy5tYXhfcmVjb3JkX3NpemUgPSAwXG4gICAgfWVsc2UgaWYoTnVtYmVyLmlzSW50ZWdlcihvcHRpb25zLm1heF9yZWNvcmRfc2l6ZSkgJiYgb3B0aW9ucy5tYXhfcmVjb3JkX3NpemUgPj0gMCl7XG4gICAgICAvLyBHcmVhdCwgbm90aGluZyB0byBkb1xuICAgIH1lbHNlIGlmKHR5cGVvZiBvcHRpb25zLm1heF9yZWNvcmRfc2l6ZSA9PT0gJ3N0cmluZycgJiYgL1xcZCsvLnRlc3Qob3B0aW9ucy5tYXhfcmVjb3JkX3NpemUpKXtcbiAgICAgIG9wdGlvbnMubWF4X3JlY29yZF9zaXplID0gcGFyc2VJbnQob3B0aW9ucy5tYXhfcmVjb3JkX3NpemUpXG4gICAgfWVsc2V7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgT3B0aW9uOiBtYXhfcmVjb3JkX3NpemUgbXVzdCBiZSBhIHBvc2l0aXZlIGludGVnZXIsIGdvdCAke0pTT04uc3RyaW5naWZ5KG9wdGlvbnMubWF4X3JlY29yZF9zaXplKX1gKVxuICAgIH1cbiAgICAvLyBOb3JtYWxpemUgb3B0aW9uIGBvYmpuYW1lYFxuICAgIGlmKG9wdGlvbnMub2JqbmFtZSA9PT0gdW5kZWZpbmVkIHx8IG9wdGlvbnMub2JqbmFtZSA9PT0gbnVsbCB8fCBvcHRpb25zLm9iam5hbWUgPT09IGZhbHNlKXtcbiAgICAgIG9wdGlvbnMub2JqbmFtZSA9IHVuZGVmaW5lZFxuICAgIH1lbHNlIGlmKEJ1ZmZlci5pc0J1ZmZlcihvcHRpb25zLm9iam5hbWUpKXtcbiAgICAgIGlmKG9wdGlvbnMub2JqbmFtZS5sZW5ndGggPT09IDApe1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgT3B0aW9uOiBvYmpuYW1lIG11c3QgYmUgYSBub24gZW1wdHkgYnVmZmVyYClcbiAgICAgIH1cbiAgICAgIG9wdGlvbnMub2JqbmFtZSA9IG9wdGlvbnMub2JqbmFtZS50b1N0cmluZygpXG4gICAgfWVsc2UgaWYodHlwZW9mIG9wdGlvbnMub2JqbmFtZSA9PT0gJ3N0cmluZycpe1xuICAgICAgaWYob3B0aW9ucy5vYmpuYW1lLmxlbmd0aCA9PT0gMCl7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBPcHRpb246IG9iam5hbWUgbXVzdCBiZSBhIG5vbiBlbXB0eSBzdHJpbmdgKVxuICAgICAgfVxuICAgICAgLy8gR3JlYXQsIG5vdGhpbmcgdG8gZG9cbiAgICB9ZWxzZXtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBPcHRpb246IG9iam5hbWUgbXVzdCBiZSBhIHN0cmluZyBvciBhIGJ1ZmZlciwgZ290ICR7b3B0aW9ucy5vYmpuYW1lfWApXG4gICAgfVxuICAgIC8vIE5vcm1hbGl6ZSBvcHRpb24gYHF1b3RlYFxuICAgIGlmKG9wdGlvbnMucXVvdGUgPT09IG51bGwgfHwgb3B0aW9ucy5xdW90ZSA9PT0gZmFsc2UgfHwgb3B0aW9ucy5xdW90ZSA9PT0gJycpe1xuICAgICAgb3B0aW9ucy5xdW90ZSA9IG51bGxcbiAgICB9ZWxzZXtcbiAgICAgIGlmKG9wdGlvbnMucXVvdGUgPT09IHVuZGVmaW5lZCB8fCBvcHRpb25zLnF1b3RlID09PSB0cnVlKXtcbiAgICAgICAgb3B0aW9ucy5xdW90ZSA9IEJ1ZmZlci5mcm9tKCdcIicpXG4gICAgICB9ZWxzZSBpZih0eXBlb2Ygb3B0aW9ucy5xdW90ZSA9PT0gJ3N0cmluZycpe1xuICAgICAgICBvcHRpb25zLnF1b3RlID0gQnVmZmVyLmZyb20ob3B0aW9ucy5xdW90ZSlcbiAgICAgIH1cbiAgICAgIGlmKCFCdWZmZXIuaXNCdWZmZXIob3B0aW9ucy5xdW90ZSkpe1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgT3B0aW9uOiBxdW90ZSBtdXN0IGJlIGEgYnVmZmVyIG9yIGEgc3RyaW5nLCBnb3QgJHtKU09OLnN0cmluZ2lmeShvcHRpb25zLnF1b3RlKX1gKVxuICAgICAgfWVsc2UgaWYob3B0aW9ucy5xdW90ZS5sZW5ndGggIT09IDEpe1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgT3B0aW9uIExlbmd0aDogcXVvdGUgbXVzdCBiZSBvbmUgY2hhcmFjdGVyLCBnb3QgJHtvcHRpb25zLnF1b3RlLmxlbmd0aH1gKVxuICAgICAgfWVsc2V7XG4gICAgICAgIG9wdGlvbnMucXVvdGUgPSBvcHRpb25zLnF1b3RlWzBdXG4gICAgICB9XG4gICAgfVxuICAgIC8vIE5vcm1hbGl6ZSBvcHRpb24gYHJhd2BcbiAgICBpZihvcHRpb25zLnJhdyA9PT0gdW5kZWZpbmVkIHx8IG9wdGlvbnMucmF3ID09PSBudWxsIHx8IG9wdGlvbnMucmF3ID09PSBmYWxzZSl7XG4gICAgICBvcHRpb25zLnJhdyA9IGZhbHNlXG4gICAgfWVsc2UgaWYob3B0aW9ucy5yYXcgIT09IHRydWUpe1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIE9wdGlvbjogcmF3IG11c3QgYmUgdHJ1ZSwgZ290ICR7SlNPTi5zdHJpbmdpZnkob3B0aW9ucy5yYXcpfWApXG4gICAgfVxuICAgIC8vIE5vcm1hbGl6ZSBvcHRpb24gYHJlY29yZF9kZWxpbWl0ZXJgXG4gICAgaWYoIW9wdGlvbnMucmVjb3JkX2RlbGltaXRlcil7XG4gICAgICBvcHRpb25zLnJlY29yZF9kZWxpbWl0ZXIgPSBbXVxuICAgIH1lbHNlIGlmKCFBcnJheS5pc0FycmF5KG9wdGlvbnMucmVjb3JkX2RlbGltaXRlcikpe1xuICAgICAgb3B0aW9ucy5yZWNvcmRfZGVsaW1pdGVyID0gW29wdGlvbnMucmVjb3JkX2RlbGltaXRlcl1cbiAgICB9XG4gICAgb3B0aW9ucy5yZWNvcmRfZGVsaW1pdGVyID0gb3B0aW9ucy5yZWNvcmRfZGVsaW1pdGVyLm1hcCggZnVuY3Rpb24ocmQpe1xuICAgICAgaWYodHlwZW9mIHJkID09PSAnc3RyaW5nJyl7XG4gICAgICAgIHJkID0gQnVmZmVyLmZyb20ocmQpXG4gICAgICB9XG4gICAgICByZXR1cm4gcmRcbiAgICB9KVxuICAgIC8vIE5vcm1hbGl6ZSBvcHRpb24gYHJlbGF4YFxuICAgIGlmKHR5cGVvZiBvcHRpb25zLnJlbGF4ID09PSAnYm9vbGVhbicpe1xuICAgICAgLy8gR3JlYXQsIG5vdGhpbmcgdG8gZG9cbiAgICB9ZWxzZSBpZihvcHRpb25zLnJlbGF4ID09PSB1bmRlZmluZWQgfHwgb3B0aW9ucy5yZWxheCA9PT0gbnVsbCl7XG4gICAgICBvcHRpb25zLnJlbGF4ID0gZmFsc2VcbiAgICB9ZWxzZXtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBPcHRpb246IHJlbGF4IG11c3QgYmUgYSBib29sZWFuLCBnb3QgJHtKU09OLnN0cmluZ2lmeShvcHRpb25zLnJlbGF4KX1gKVxuICAgIH1cbiAgICAvLyBOb3JtYWxpemUgb3B0aW9uIGByZWxheF9jb2x1bW5fY291bnRgXG4gICAgaWYodHlwZW9mIG9wdGlvbnMucmVsYXhfY29sdW1uX2NvdW50ID09PSAnYm9vbGVhbicpe1xuICAgICAgLy8gR3JlYXQsIG5vdGhpbmcgdG8gZG9cbiAgICB9ZWxzZSBpZihvcHRpb25zLnJlbGF4X2NvbHVtbl9jb3VudCA9PT0gdW5kZWZpbmVkIHx8IG9wdGlvbnMucmVsYXhfY29sdW1uX2NvdW50ID09PSBudWxsKXtcbiAgICAgIG9wdGlvbnMucmVsYXhfY29sdW1uX2NvdW50ID0gZmFsc2VcbiAgICB9ZWxzZXtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBPcHRpb246IHJlbGF4X2NvbHVtbl9jb3VudCBtdXN0IGJlIGEgYm9vbGVhbiwgZ290ICR7SlNPTi5zdHJpbmdpZnkob3B0aW9ucy5yZWxheF9jb2x1bW5fY291bnQpfWApXG4gICAgfVxuICAgIC8vIE5vcm1hbGl6ZSBvcHRpb24gYHNraXBfZW1wdHlfbGluZXNgXG4gICAgaWYodHlwZW9mIG9wdGlvbnMuc2tpcF9lbXB0eV9saW5lcyA9PT0gJ2Jvb2xlYW4nKXtcbiAgICAgIC8vIEdyZWF0LCBub3RoaW5nIHRvIGRvXG4gICAgfWVsc2UgaWYob3B0aW9ucy5za2lwX2VtcHR5X2xpbmVzID09PSB1bmRlZmluZWQgfHwgb3B0aW9ucy5za2lwX2VtcHR5X2xpbmVzID09PSBudWxsKXtcbiAgICAgIG9wdGlvbnMuc2tpcF9lbXB0eV9saW5lcyA9IGZhbHNlXG4gICAgfWVsc2V7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgT3B0aW9uOiBza2lwX2VtcHR5X2xpbmVzIG11c3QgYmUgYSBib29sZWFuLCBnb3QgJHtKU09OLnN0cmluZ2lmeShvcHRpb25zLnNraXBfZW1wdHlfbGluZXMpfWApXG4gICAgfVxuICAgIC8vIE5vcm1hbGl6ZSBvcHRpb24gYHNraXBfbGluZXNfd2l0aF9lbXB0eV92YWx1ZXNgXG4gICAgaWYodHlwZW9mIG9wdGlvbnMuc2tpcF9saW5lc193aXRoX2VtcHR5X3ZhbHVlcyA9PT0gJ2Jvb2xlYW4nKXtcbiAgICAgIC8vIEdyZWF0LCBub3RoaW5nIHRvIGRvXG4gICAgfWVsc2UgaWYob3B0aW9ucy5za2lwX2xpbmVzX3dpdGhfZW1wdHlfdmFsdWVzID09PSB1bmRlZmluZWQgfHwgb3B0aW9ucy5za2lwX2xpbmVzX3dpdGhfZW1wdHlfdmFsdWVzID09PSBudWxsKXtcbiAgICAgIG9wdGlvbnMuc2tpcF9saW5lc193aXRoX2VtcHR5X3ZhbHVlcyA9IGZhbHNlXG4gICAgfWVsc2V7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgT3B0aW9uOiBza2lwX2xpbmVzX3dpdGhfZW1wdHlfdmFsdWVzIG11c3QgYmUgYSBib29sZWFuLCBnb3QgJHtKU09OLnN0cmluZ2lmeShvcHRpb25zLnNraXBfbGluZXNfd2l0aF9lbXB0eV92YWx1ZXMpfWApXG4gICAgfVxuICAgIC8vIE5vcm1hbGl6ZSBvcHRpb24gYHNraXBfbGluZXNfd2l0aF9lcnJvcmBcbiAgICBpZih0eXBlb2Ygb3B0aW9ucy5za2lwX2xpbmVzX3dpdGhfZXJyb3IgPT09ICdib29sZWFuJyl7XG4gICAgICAvLyBHcmVhdCwgbm90aGluZyB0byBkb1xuICAgIH1lbHNlIGlmKG9wdGlvbnMuc2tpcF9saW5lc193aXRoX2Vycm9yID09PSB1bmRlZmluZWQgfHwgb3B0aW9ucy5za2lwX2xpbmVzX3dpdGhfZXJyb3IgPT09IG51bGwpe1xuICAgICAgb3B0aW9ucy5za2lwX2xpbmVzX3dpdGhfZXJyb3IgPSBmYWxzZVxuICAgIH1lbHNle1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIE9wdGlvbjogc2tpcF9saW5lc193aXRoX2Vycm9yIG11c3QgYmUgYSBib29sZWFuLCBnb3QgJHtKU09OLnN0cmluZ2lmeShvcHRpb25zLnNraXBfbGluZXNfd2l0aF9lcnJvcil9YClcbiAgICB9XG4gICAgLy8gTm9ybWFsaXplIG9wdGlvbiBgcnRyaW1gXG4gICAgaWYob3B0aW9ucy5ydHJpbSA9PT0gdW5kZWZpbmVkIHx8IG9wdGlvbnMucnRyaW0gPT09IG51bGwgfHwgb3B0aW9ucy5ydHJpbSA9PT0gZmFsc2Upe1xuICAgICAgb3B0aW9ucy5ydHJpbSA9IGZhbHNlXG4gICAgfWVsc2UgaWYob3B0aW9ucy5ydHJpbSAhPT0gdHJ1ZSl7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgT3B0aW9uOiBydHJpbSBtdXN0IGJlIGEgYm9vbGVhbiwgZ290ICR7SlNPTi5zdHJpbmdpZnkob3B0aW9ucy5ydHJpbSl9YClcbiAgICB9XG4gICAgLy8gTm9ybWFsaXplIG9wdGlvbiBgbHRyaW1gXG4gICAgaWYob3B0aW9ucy5sdHJpbSA9PT0gdW5kZWZpbmVkIHx8IG9wdGlvbnMubHRyaW0gPT09IG51bGwgfHwgb3B0aW9ucy5sdHJpbSA9PT0gZmFsc2Upe1xuICAgICAgb3B0aW9ucy5sdHJpbSA9IGZhbHNlXG4gICAgfWVsc2UgaWYob3B0aW9ucy5sdHJpbSAhPT0gdHJ1ZSl7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgT3B0aW9uOiBsdHJpbSBtdXN0IGJlIGEgYm9vbGVhbiwgZ290ICR7SlNPTi5zdHJpbmdpZnkob3B0aW9ucy5sdHJpbSl9YClcbiAgICB9XG4gICAgLy8gTm9ybWFsaXplIG9wdGlvbiBgdHJpbWBcbiAgICBpZihvcHRpb25zLnRyaW0gPT09IHVuZGVmaW5lZCB8fCBvcHRpb25zLnRyaW0gPT09IG51bGwgfHwgb3B0aW9ucy50cmltID09PSBmYWxzZSl7XG4gICAgICBvcHRpb25zLnRyaW0gPSBmYWxzZVxuICAgIH1lbHNlIGlmKG9wdGlvbnMudHJpbSAhPT0gdHJ1ZSl7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgT3B0aW9uOiB0cmltIG11c3QgYmUgYSBib29sZWFuLCBnb3QgJHtKU09OLnN0cmluZ2lmeShvcHRpb25zLnRyaW0pfWApXG4gICAgfVxuICAgIC8vIE5vcm1hbGl6ZSBvcHRpb25zIGB0cmltYCwgYGx0cmltYCBhbmQgYHJ0cmltYFxuICAgIGlmKG9wdGlvbnMudHJpbSA9PT0gdHJ1ZSAmJiBvcHRzLmx0cmltICE9PSBmYWxzZSl7XG4gICAgICBvcHRpb25zLmx0cmltID0gdHJ1ZVxuICAgIH1lbHNlIGlmKG9wdGlvbnMubHRyaW0gIT09IHRydWUpe1xuICAgICAgb3B0aW9ucy5sdHJpbSA9IGZhbHNlXG4gICAgfVxuICAgIGlmKG9wdGlvbnMudHJpbSA9PT0gdHJ1ZSAmJiBvcHRzLnJ0cmltICE9PSBmYWxzZSl7XG4gICAgICBvcHRpb25zLnJ0cmltID0gdHJ1ZVxuICAgIH1lbHNlIGlmKG9wdGlvbnMucnRyaW0gIT09IHRydWUpe1xuICAgICAgb3B0aW9ucy5ydHJpbSA9IGZhbHNlXG4gICAgfVxuICAgIC8vIE5vcm1hbGl6ZSBvcHRpb24gYHRvYFxuICAgIGlmKG9wdGlvbnMudG8gPT09IHVuZGVmaW5lZCB8fCBvcHRpb25zLnRvID09PSBudWxsKXtcbiAgICAgIG9wdGlvbnMudG8gPSAtMVxuICAgIH1lbHNle1xuICAgICAgaWYodHlwZW9mIG9wdGlvbnMudG8gPT09ICdzdHJpbmcnICYmIC9cXGQrLy50ZXN0KG9wdGlvbnMudG8pKXtcbiAgICAgICAgb3B0aW9ucy50byA9IHBhcnNlSW50KG9wdGlvbnMudG8pXG4gICAgICB9XG4gICAgICBpZihOdW1iZXIuaXNJbnRlZ2VyKG9wdGlvbnMudG8pKXtcbiAgICAgICAgaWYob3B0aW9ucy50byA8PSAwKXtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgT3B0aW9uOiB0byBtdXN0IGJlIGEgcG9zaXRpdmUgaW50ZWdlciBncmVhdGVyIHRoYW4gMCwgZ290ICR7SlNPTi5zdHJpbmdpZnkob3B0cy50byl9YClcbiAgICAgICAgfVxuICAgICAgfWVsc2V7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBPcHRpb246IHRvIG11c3QgYmUgYW4gaW50ZWdlciwgZ290ICR7SlNPTi5zdHJpbmdpZnkob3B0cy50byl9YClcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gTm9ybWFsaXplIG9wdGlvbiBgdG9fbGluZWBcbiAgICBpZihvcHRpb25zLnRvX2xpbmUgPT09IHVuZGVmaW5lZCB8fCBvcHRpb25zLnRvX2xpbmUgPT09IG51bGwpe1xuICAgICAgb3B0aW9ucy50b19saW5lID0gLTFcbiAgICB9ZWxzZXtcbiAgICAgIGlmKHR5cGVvZiBvcHRpb25zLnRvX2xpbmUgPT09ICdzdHJpbmcnICYmIC9cXGQrLy50ZXN0KG9wdGlvbnMudG9fbGluZSkpe1xuICAgICAgICBvcHRpb25zLnRvX2xpbmUgPSBwYXJzZUludChvcHRpb25zLnRvX2xpbmUpXG4gICAgICB9XG4gICAgICBpZihOdW1iZXIuaXNJbnRlZ2VyKG9wdGlvbnMudG9fbGluZSkpe1xuICAgICAgICBpZihvcHRpb25zLnRvX2xpbmUgPD0gMCl7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIE9wdGlvbjogdG9fbGluZSBtdXN0IGJlIGEgcG9zaXRpdmUgaW50ZWdlciBncmVhdGVyIHRoYW4gMCwgZ290ICR7SlNPTi5zdHJpbmdpZnkob3B0cy50b19saW5lKX1gKVxuICAgICAgICB9XG4gICAgICB9ZWxzZXtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIE9wdGlvbjogdG9fbGluZSBtdXN0IGJlIGFuIGludGVnZXIsIGdvdCAke0pTT04uc3RyaW5naWZ5KG9wdHMudG9fbGluZSl9YClcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5pbmZvID0ge1xuICAgICAgY29tbWVudF9saW5lczogMCxcbiAgICAgIGVtcHR5X2xpbmVzOiAwLFxuICAgICAgaW52YWxpZF9maWVsZF9sZW5ndGg6IDAsXG4gICAgICBsaW5lczogMSxcbiAgICAgIHJlY29yZHM6IDBcbiAgICB9XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9uc1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBib21Ta2lwcGVkOiBmYWxzZSxcbiAgICAgIGNhc3RGaWVsZDogZm5DYXN0RmllbGQsXG4gICAgICBjb21tZW50aW5nOiBmYWxzZSxcbiAgICAgIGVuYWJsZWQ6IG9wdGlvbnMuZnJvbV9saW5lID09PSAxLFxuICAgICAgZXNjYXBpbmc6IGZhbHNlLFxuICAgICAgZXNjYXBlSXNRdW90ZTogb3B0aW9ucy5lc2NhcGUgPT09IG9wdGlvbnMucXVvdGUsXG4gICAgICBleHBlY3RlZFJlY29yZExlbmd0aDogb3B0aW9ucy5jb2x1bW5zID09PSBudWxsID8gMCA6IG9wdGlvbnMuY29sdW1ucy5sZW5ndGgsXG4gICAgICBmaWVsZDogbmV3IFJlc2l6ZWFibGVCdWZmZXIoMjApLFxuICAgICAgZmlyc3RMaW5lVG9IZWFkZXJzOiBmbkZpcnN0TGluZVRvSGVhZGVycyxcbiAgICAgIGluZm86IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuaW5mbyksXG4gICAgICBwcmV2aW91c0J1ZjogdW5kZWZpbmVkLFxuICAgICAgcXVvdGluZzogZmFsc2UsXG4gICAgICBzdG9wOiBmYWxzZSxcbiAgICAgIHJhd0J1ZmZlcjogbmV3IFJlc2l6ZWFibGVCdWZmZXIoMTAwKSxcbiAgICAgIHJlY29yZDogW10sXG4gICAgICByZWNvcmRIYXNFcnJvcjogZmFsc2UsXG4gICAgICByZWNvcmRfbGVuZ3RoOiAwLFxuICAgICAgcmVjb3JkRGVsaW1pdGVyTWF4TGVuZ3RoOiBvcHRpb25zLnJlY29yZF9kZWxpbWl0ZXIubGVuZ3RoID09PSAwID8gMiA6IE1hdGgubWF4KC4uLm9wdGlvbnMucmVjb3JkX2RlbGltaXRlci5tYXAoICh2KSA9PiB2Lmxlbmd0aCkpLFxuICAgICAgdHJpbUNoYXJzOiBbQnVmZmVyLmZyb20oJyAnKVswXSwgQnVmZmVyLmZyb20oJ1xcdCcpWzBdXSxcbiAgICAgIHdhc1F1b3Rpbmc6IGZhbHNlLFxuICAgICAgd2FzUm93RGVsaW1pdGVyOiBmYWxzZVxuICAgIH1cbiAgfVxuICAvLyBJbXBsZW1lbnRhdGlvbiBvZiBgVHJhbnNmb3JtLl90cmFuc2Zvcm1gXG4gIF90cmFuc2Zvcm0oYnVmLCBlbmNvZGluZywgY2FsbGJhY2spe1xuICAgIGlmKHRoaXMuc3RhdGUuc3RvcCA9PT0gdHJ1ZSl7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3QgZXJyID0gdGhpcy5fX3BhcnNlKGJ1ZiwgZmFsc2UpXG4gICAgaWYoZXJyICE9PSB1bmRlZmluZWQpe1xuICAgICAgdGhpcy5zdGF0ZS5zdG9wID0gdHJ1ZVxuICAgIH1cbiAgICBjYWxsYmFjayhlcnIpXG4gIH1cbiAgLy8gSW1wbGVtZW50YXRpb24gb2YgYFRyYW5zZm9ybS5fZmx1c2hgXG4gIF9mbHVzaChjYWxsYmFjayl7XG4gICAgaWYodGhpcy5zdGF0ZS5zdG9wID09PSB0cnVlKXtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBjb25zdCBlcnIgPSB0aGlzLl9fcGFyc2UodW5kZWZpbmVkLCB0cnVlKVxuICAgIGNhbGxiYWNrKGVycilcbiAgfVxuICAvLyBDZW50cmFsIHBhcnNlciBpbXBsZW1lbnRhdGlvblxuICBfX3BhcnNlKG5leHRCdWYsIGVuZCl7XG4gICAgY29uc3Qge2JvbSwgY29tbWVudCwgZXNjYXBlLCBmcm9tX2xpbmUsIGluZm8sIGx0cmltLCBtYXhfcmVjb3JkX3NpemUsIHF1b3RlLCByYXcsIHJlbGF4LCBydHJpbSwgc2tpcF9lbXB0eV9saW5lcywgdG8sIHRvX2xpbmV9ID0gdGhpcy5vcHRpb25zXG4gICAgbGV0IHtyZWNvcmRfZGVsaW1pdGVyfSA9IHRoaXMub3B0aW9uc1xuICAgIGNvbnN0IHtib21Ta2lwcGVkLCBwcmV2aW91c0J1ZiwgcmF3QnVmZmVyLCBlc2NhcGVJc1F1b3RlfSA9IHRoaXMuc3RhdGVcbiAgICBsZXQgYnVmXG4gICAgaWYocHJldmlvdXNCdWYgPT09IHVuZGVmaW5lZCl7XG4gICAgICBpZihuZXh0QnVmID09PSB1bmRlZmluZWQpe1xuICAgICAgICAvLyBIYW5kbGUgZW1wdHkgc3RyaW5nXG4gICAgICAgIHRoaXMucHVzaChudWxsKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1lbHNle1xuICAgICAgICBidWYgPSBuZXh0QnVmXG4gICAgICB9XG4gICAgfWVsc2UgaWYocHJldmlvdXNCdWYgIT09IHVuZGVmaW5lZCAmJiBuZXh0QnVmID09PSB1bmRlZmluZWQpe1xuICAgICAgYnVmID0gcHJldmlvdXNCdWZcbiAgICB9ZWxzZXtcbiAgICAgIGJ1ZiA9IEJ1ZmZlci5jb25jYXQoW3ByZXZpb3VzQnVmLCBuZXh0QnVmXSlcbiAgICB9XG4gICAgLy8gSGFuZGxlIFVURiBCT01cbiAgICBpZihib21Ta2lwcGVkID09PSBmYWxzZSl7XG4gICAgICBpZihib20gPT09IGZhbHNlKXtcbiAgICAgICAgdGhpcy5zdGF0ZS5ib21Ta2lwcGVkID0gdHJ1ZVxuICAgICAgfWVsc2UgaWYoYnVmLmxlbmd0aCA8IDMpe1xuICAgICAgICAvLyBObyBlbm91Z2ggZGF0YVxuICAgICAgICBpZihlbmQgPT09IGZhbHNlKXtcbiAgICAgICAgICAvLyBXYWl0IGZvciBtb3JlIGRhdGFcbiAgICAgICAgICB0aGlzLnN0YXRlLnByZXZpb3VzQnVmID0gYnVmXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgLy8gc2tpcCBCT00gZGV0ZWN0IGJlY2F1c2UgZGF0YSBsZW5ndGggPCAzXG4gICAgICB9ZWxzZXtcbiAgICAgICAgaWYoYm9tX3V0ZjguY29tcGFyZShidWYsIDAsIDMpID09PSAwKXtcbiAgICAgICAgICAvLyBTa2lwIEJPTVxuICAgICAgICAgIGJ1ZiA9IGJ1Zi5zbGljZSgzKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RhdGUuYm9tU2tpcHBlZCA9IHRydWVcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgYnVmTGVuID0gYnVmLmxlbmd0aFxuICAgIGxldCBwb3NcbiAgICBmb3IocG9zID0gMDsgcG9zIDwgYnVmTGVuOyBwb3MrKyl7XG4gICAgICAvLyBFbnN1cmUgd2UgZ2V0IGVub3VnaCBzcGFjZSB0byBsb29rIGFoZWFkXG4gICAgICAvLyBUaGVyZSBzaG91bGQgYmUgYSB3YXkgdG8gbW92ZSB0aGlzIG91dCBvZiB0aGUgbG9vcFxuICAgICAgaWYodGhpcy5fX25lZWRNb3JlRGF0YShwb3MsIGJ1ZkxlbiwgZW5kKSl7XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICBpZih0aGlzLnN0YXRlLndhc1Jvd0RlbGltaXRlciA9PT0gdHJ1ZSl7XG4gICAgICAgIHRoaXMuaW5mby5saW5lcysrXG4gICAgICAgIGlmKGluZm8gPT09IHRydWUgJiYgdGhpcy5zdGF0ZS5yZWNvcmQubGVuZ3RoID09PSAwICYmIHRoaXMuc3RhdGUuZmllbGQubGVuZ3RoID09PSAwICYmIHRoaXMuc3RhdGUud2FzUXVvdGluZyA9PT0gZmFsc2Upe1xuICAgICAgICAgIHRoaXMuc3RhdGUuaW5mbyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuaW5mbylcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN0YXRlLndhc1Jvd0RlbGltaXRlciA9IGZhbHNlXG4gICAgICB9XG4gICAgICBpZih0b19saW5lICE9PSAtMSAmJiB0aGlzLmluZm8ubGluZXMgPiB0b19saW5lKXtcbiAgICAgICAgdGhpcy5zdGF0ZS5zdG9wID0gdHJ1ZVxuICAgICAgICB0aGlzLnB1c2gobnVsbClcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICAvLyBBdXRvIGRpc2NvdmVyeSBvZiByZWNvcmRfZGVsaW1pdGVyLCB1bml4LCBtYWMgYW5kIHdpbmRvd3Mgc3VwcG9ydGVkXG4gICAgICBpZih0aGlzLnN0YXRlLnF1b3RpbmcgPT09IGZhbHNlICYmIHJlY29yZF9kZWxpbWl0ZXIubGVuZ3RoID09PSAwKXtcbiAgICAgICAgY29uc3QgcmVjb3JkX2RlbGltaXRlckNvdW50ID0gdGhpcy5fX2F1dG9EaXNjb3ZlclJvd0RlbGltaXRlcihidWYsIHBvcylcbiAgICAgICAgaWYocmVjb3JkX2RlbGltaXRlckNvdW50KXtcbiAgICAgICAgICByZWNvcmRfZGVsaW1pdGVyID0gdGhpcy5vcHRpb25zLnJlY29yZF9kZWxpbWl0ZXJcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc3QgY2hyID0gYnVmW3Bvc11cbiAgICAgIGlmKHJhdyA9PT0gdHJ1ZSl7XG4gICAgICAgIHJhd0J1ZmZlci5hcHBlbmQoY2hyKVxuICAgICAgfVxuICAgICAgaWYoKGNociA9PT0gY3IgfHwgY2hyID09PSBubCkgJiYgdGhpcy5zdGF0ZS53YXNSb3dEZWxpbWl0ZXIgPT09IGZhbHNlICl7XG4gICAgICAgIHRoaXMuc3RhdGUud2FzUm93RGVsaW1pdGVyID0gdHJ1ZVxuICAgICAgfVxuICAgICAgLy8gUHJldmlvdXMgY2hhciB3YXMgYSB2YWxpZCBlc2NhcGUgY2hhclxuICAgICAgLy8gdHJlYXQgdGhlIGN1cnJlbnQgY2hhciBhcyBhIHJlZ3VsYXIgY2hhclxuICAgICAgaWYodGhpcy5zdGF0ZS5lc2NhcGluZyA9PT0gdHJ1ZSl7XG4gICAgICAgIHRoaXMuc3RhdGUuZXNjYXBpbmcgPSBmYWxzZVxuICAgICAgfWVsc2V7XG4gICAgICAgIC8vIEVzY2FwZSBpcyBvbmx5IGFjdGl2ZSBpbnNpZGUgcXVvdGVkIGZpZWxkc1xuICAgICAgICBpZih0aGlzLnN0YXRlLnF1b3RpbmcgPT09IHRydWUgJiYgY2hyID09PSBlc2NhcGUgJiYgcG9zICsgMSA8IGJ1Zkxlbil7XG4gICAgICAgICAgLy8gV2UgYXJlIHF1b3RpbmcsIHRoZSBjaGFyIGlzIGFuIGVzY2FwZSBjaHIgYW5kIHRoZXJlIGlzIGEgY2hyIHRvIGVzY2FwZVxuICAgICAgICAgIGlmKGVzY2FwZUlzUXVvdGUpe1xuICAgICAgICAgICAgaWYoYnVmW3BvcysxXSA9PT0gcXVvdGUpe1xuICAgICAgICAgICAgICB0aGlzLnN0YXRlLmVzY2FwaW5nID0gdHJ1ZVxuICAgICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS5lc2NhcGluZyA9IHRydWVcbiAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIE5vdCBjdXJyZW50bHkgZXNjYXBpbmcgYW5kIGNociBpcyBhIHF1b3RlXG4gICAgICAgIC8vIFRPRE86IG5lZWQgdG8gY29tcGFyZSBieXRlcyBpbnN0ZWFkIG9mIHNpbmdsZSBjaGFyXG4gICAgICAgIGlmKHRoaXMuc3RhdGUuY29tbWVudGluZyA9PT0gZmFsc2UgJiYgY2hyID09PSBxdW90ZSl7XG4gICAgICAgICAgaWYodGhpcy5zdGF0ZS5xdW90aW5nID09PSB0cnVlKXtcbiAgICAgICAgICAgIGNvbnN0IG5leHRDaHIgPSBidWZbcG9zKzFdXG4gICAgICAgICAgICBjb25zdCBpc05leHRDaHJUcmltYWJsZSA9IHJ0cmltICYmIHRoaXMuX19pc0NoYXJUcmltYWJsZShuZXh0Q2hyKVxuICAgICAgICAgICAgLy8gY29uc3QgaXNOZXh0Q2hyQ29tbWVudCA9IG5leHRDaHIgPT09IGNvbW1lbnRcbiAgICAgICAgICAgIGNvbnN0IGlzTmV4dENockNvbW1lbnQgPSBjb21tZW50ICE9PSBudWxsICYmIHRoaXMuX19jb21wYXJlQnl0ZXMoY29tbWVudCwgYnVmLCBwb3MrMSwgbmV4dENocilcbiAgICAgICAgICAgIGNvbnN0IGlzTmV4dENockRlbGltaXRlciA9IHRoaXMuX19pc0RlbGltaXRlcihuZXh0Q2hyLCBidWYsIHBvcysxKVxuICAgICAgICAgICAgY29uc3QgaXNOZXh0Q2hyUm93RGVsaW1pdGVyID0gcmVjb3JkX2RlbGltaXRlci5sZW5ndGggPT09IDAgPyB0aGlzLl9fYXV0b0Rpc2NvdmVyUm93RGVsaW1pdGVyKGJ1ZiwgcG9zKzEpIDogdGhpcy5fX2lzUmVjb3JkRGVsaW1pdGVyKG5leHRDaHIsIGJ1ZiwgcG9zKzEpXG4gICAgICAgICAgICAvLyBFc2NhcGUgYSBxdW90ZVxuICAgICAgICAgICAgLy8gVHJlYXQgbmV4dCBjaGFyIGFzIGEgcmVndWxhciBjaGFyYWN0ZXJcbiAgICAgICAgICAgIC8vIFRPRE86IG5lZWQgdG8gY29tcGFyZSBieXRlcyBpbnN0ZWFkIG9mIHNpbmdsZSBjaGFyXG4gICAgICAgICAgICBpZihjaHIgPT09IGVzY2FwZSAmJiBuZXh0Q2hyID09PSBxdW90ZSl7XG4gICAgICAgICAgICAgIHBvcysrXG4gICAgICAgICAgICB9ZWxzZSBpZighbmV4dENociB8fCBpc05leHRDaHJEZWxpbWl0ZXIgfHwgaXNOZXh0Q2hyUm93RGVsaW1pdGVyIHx8IGlzTmV4dENockNvbW1lbnQgfHwgaXNOZXh0Q2hyVHJpbWFibGUpe1xuICAgICAgICAgICAgICB0aGlzLnN0YXRlLnF1b3RpbmcgPSBmYWxzZVxuICAgICAgICAgICAgICB0aGlzLnN0YXRlLndhc1F1b3RpbmcgPSB0cnVlXG4gICAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgICB9ZWxzZSBpZihyZWxheCA9PT0gZmFsc2Upe1xuICAgICAgICAgICAgICBjb25zdCBlcnIgPSB0aGlzLl9fZXJyb3IoXG4gICAgICAgICAgICAgICAgbmV3IENzdkVycm9yKCdDU1ZfSU5WQUxJRF9DTE9TSU5HX1FVT1RFJywgW1xuICAgICAgICAgICAgICAgICAgJ0ludmFsaWQgQ2xvc2luZyBRdW90ZTonLFxuICAgICAgICAgICAgICAgICAgYGdvdCBcIiR7U3RyaW5nLmZyb21DaGFyQ29kZShuZXh0Q2hyKX1cImAsXG4gICAgICAgICAgICAgICAgICBgYXQgbGluZSAke3RoaXMuaW5mby5saW5lc31gLFxuICAgICAgICAgICAgICAgICAgJ2luc3RlYWQgb2YgZGVsaW1pdGVyLCByb3cgZGVsaW1pdGVyLCB0cmltYWJsZSBjaGFyYWN0ZXInLFxuICAgICAgICAgICAgICAgICAgJyhpZiBhY3RpdmF0ZWQpIG9yIGNvbW1lbnQnLFxuICAgICAgICAgICAgICAgIF0sIHRoaXMuX19jb250ZXh0KCkpXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgaWYoZXJyICE9PSB1bmRlZmluZWQpIHJldHVybiBlcnJcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICB0aGlzLnN0YXRlLnF1b3RpbmcgPSBmYWxzZVxuICAgICAgICAgICAgICB0aGlzLnN0YXRlLndhc1F1b3RpbmcgPSB0cnVlXG4gICAgICAgICAgICAgIC8vIGNvbnRpbnVlXG4gICAgICAgICAgICAgIHRoaXMuc3RhdGUuZmllbGQucHJlcGVuZChxdW90ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGlmKHRoaXMuc3RhdGUuZmllbGQubGVuZ3RoICE9PSAwKXtcbiAgICAgICAgICAgICAgLy8gSW4gcmVsYXggbW9kZSwgdHJlYXQgb3BlbmluZyBxdW90ZSBwcmVjZWRlZCBieSBjaHJzIGFzIHJlZ3VsYXJcbiAgICAgICAgICAgICAgaWYoIHJlbGF4ID09PSBmYWxzZSApe1xuICAgICAgICAgICAgICAgIGNvbnN0IGVyciA9IHRoaXMuX19lcnJvcihcbiAgICAgICAgICAgICAgICAgIG5ldyBDc3ZFcnJvcignSU5WQUxJRF9PUEVOSU5HX1FVT1RFJywgW1xuICAgICAgICAgICAgICAgICAgICAnSW52YWxpZCBPcGVuaW5nIFF1b3RlOicsXG4gICAgICAgICAgICAgICAgICAgIGBhIHF1b3RlIGlzIGZvdW5kIGluc2lkZSBhIGZpZWxkIGF0IGxpbmUgJHt0aGlzLmluZm8ubGluZXN9YCxcbiAgICAgICAgICAgICAgICAgIF0sIHRoaXMuX19jb250ZXh0KCksIHtcbiAgICAgICAgICAgICAgICAgICAgZmllbGQ6IHRoaXMuc3RhdGUuZmllbGQsXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICBpZihlcnIgIT09IHVuZGVmaW5lZCkgcmV0dXJuIGVyclxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5xdW90aW5nID0gdHJ1ZVxuICAgICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLnN0YXRlLnF1b3RpbmcgPT09IGZhbHNlKXtcbiAgICAgICAgICBsZXQgcmVjb3JkRGVsaW1pdGVyTGVuZ3RoID0gdGhpcy5fX2lzUmVjb3JkRGVsaW1pdGVyKGNociwgYnVmLCBwb3MpXG4gICAgICAgICAgaWYocmVjb3JkRGVsaW1pdGVyTGVuZ3RoICE9PSAwKXtcbiAgICAgICAgICAgIC8vIERvIG5vdCBlbWl0IGNvbW1lbnRzIHdoaWNoIHRha2UgYSBmdWxsIGxpbmVcbiAgICAgICAgICAgIGNvbnN0IHNraXBDb21tZW50TGluZSA9IHRoaXMuc3RhdGUuY29tbWVudGluZyAmJiAodGhpcy5zdGF0ZS53YXNRdW90aW5nID09PSBmYWxzZSAmJiB0aGlzLnN0YXRlLnJlY29yZC5sZW5ndGggPT09IDAgJiYgdGhpcy5zdGF0ZS5maWVsZC5sZW5ndGggPT09IDApXG4gICAgICAgICAgICBpZihza2lwQ29tbWVudExpbmUpe1xuICAgICAgICAgICAgICB0aGlzLmluZm8uY29tbWVudF9saW5lcysrXG4gICAgICAgICAgICAgIC8vIFNraXAgZnVsbCBjb21tZW50IGxpbmVcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAvLyBTa2lwIGlmIGxpbmUgaXMgZW1wdHkgYW5kIHNraXBfZW1wdHlfbGluZXMgYWN0aXZhdGVkXG4gICAgICAgICAgICAgIGlmKHNraXBfZW1wdHlfbGluZXMgPT09IHRydWUgJiYgdGhpcy5zdGF0ZS53YXNRdW90aW5nID09PSBmYWxzZSAmJiB0aGlzLnN0YXRlLnJlY29yZC5sZW5ndGggPT09IDAgJiYgdGhpcy5zdGF0ZS5maWVsZC5sZW5ndGggPT09IDApe1xuICAgICAgICAgICAgICAgIHRoaXMuaW5mby5lbXB0eV9saW5lcysrXG4gICAgICAgICAgICAgICAgcG9zICs9IHJlY29yZERlbGltaXRlckxlbmd0aCAtIDFcbiAgICAgICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8vIEFjdGl2YXRlIHJlY29yZHMgZW1pdGlvbiBpZiBhYm92ZSBmcm9tX2xpbmVcbiAgICAgICAgICAgICAgaWYodGhpcy5zdGF0ZS5lbmFibGVkID09PSBmYWxzZSAmJiB0aGlzLmluZm8ubGluZXMgKyAodGhpcy5zdGF0ZS53YXNSb3dEZWxpbWl0ZXIgPT09IHRydWUgPyAxOiAwICkgPj0gZnJvbV9saW5lKXtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmVuYWJsZWQgPSB0cnVlXG4gICAgICAgICAgICAgICAgdGhpcy5fX3Jlc2V0RmllbGQoKVxuICAgICAgICAgICAgICAgIHRoaXMuX19yZXNldFJvdygpXG4gICAgICAgICAgICAgICAgcG9zICs9IHJlY29yZERlbGltaXRlckxlbmd0aCAtIDFcbiAgICAgICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBjb25zdCBlcnJGaWVsZCA9IHRoaXMuX19vbkZpZWxkKClcbiAgICAgICAgICAgICAgICBpZihlcnJGaWVsZCAhPT0gdW5kZWZpbmVkKSByZXR1cm4gZXJyRmllbGRcbiAgICAgICAgICAgICAgICBjb25zdCBlcnJSZWNvcmQgPSB0aGlzLl9fb25Sb3coKVxuICAgICAgICAgICAgICAgIGlmKGVyclJlY29yZCAhPT0gdW5kZWZpbmVkKSByZXR1cm4gZXJyUmVjb3JkXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYodG8gIT09IC0xICYmIHRoaXMuaW5mby5yZWNvcmRzID49IHRvKXtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnN0b3AgPSB0cnVlXG4gICAgICAgICAgICAgICAgdGhpcy5wdXNoKG51bGwpXG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc3RhdGUuY29tbWVudGluZyA9IGZhbHNlXG4gICAgICAgICAgICBwb3MgKz0gcmVjb3JkRGVsaW1pdGVyTGVuZ3RoIC0gMVxuICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYodGhpcy5zdGF0ZS5jb21tZW50aW5nKXtcbiAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IGNvbW1lbnRDb3VudCA9IGNvbW1lbnQgPT09IG51bGwgPyAwIDogdGhpcy5fX2NvbXBhcmVCeXRlcyhjb21tZW50LCBidWYsIHBvcywgY2hyKVxuICAgICAgICAgIGlmKGNvbW1lbnRDb3VudCAhPT0gMCl7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLmNvbW1lbnRpbmcgPSB0cnVlXG4gICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgIH1cbiAgICAgICAgICBsZXQgZGVsaW1pdGVyTGVuZ3RoID0gdGhpcy5fX2lzRGVsaW1pdGVyKGNociwgYnVmLCBwb3MpXG4gICAgICAgICAgaWYoZGVsaW1pdGVyTGVuZ3RoICE9PSAwKXtcbiAgICAgICAgICAgIGNvbnN0IGVyckZpZWxkID0gdGhpcy5fX29uRmllbGQoKVxuICAgICAgICAgICAgaWYoZXJyRmllbGQgIT09IHVuZGVmaW5lZCkgcmV0dXJuIGVyckZpZWxkXG4gICAgICAgICAgICBwb3MgKz0gZGVsaW1pdGVyTGVuZ3RoIC0gMVxuICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmKHRoaXMuc3RhdGUuY29tbWVudGluZyA9PT0gZmFsc2Upe1xuICAgICAgICBpZihtYXhfcmVjb3JkX3NpemUgIT09IDAgJiYgdGhpcy5zdGF0ZS5yZWNvcmRfbGVuZ3RoICsgdGhpcy5zdGF0ZS5maWVsZC5sZW5ndGggPiBtYXhfcmVjb3JkX3NpemUpe1xuICAgICAgICAgIGNvbnN0IGVyciA9IHRoaXMuX19lcnJvcihcbiAgICAgICAgICAgIG5ldyBDc3ZFcnJvcignQ1NWX01BWF9SRUNPUkRfU0laRScsIFtcbiAgICAgICAgICAgICAgJ01heCBSZWNvcmQgU2l6ZTonLFxuICAgICAgICAgICAgICAncmVjb3JkIGV4Y2VlZCB0aGUgbWF4aW11bSBudW1iZXIgb2YgdG9sZXJhdGVkIGJ5dGVzJyxcbiAgICAgICAgICAgICAgYG9mICR7bWF4X3JlY29yZF9zaXplfWAsXG4gICAgICAgICAgICAgIGBhdCBsaW5lICR7dGhpcy5pbmZvLmxpbmVzfWAsXG4gICAgICAgICAgICBdLCB0aGlzLl9fY29udGV4dCgpKVxuICAgICAgICAgIClcbiAgICAgICAgICBpZihlcnIgIT09IHVuZGVmaW5lZCkgcmV0dXJuIGVyclxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGxhcHBlbmQgPSBsdHJpbSA9PT0gZmFsc2UgfHwgdGhpcy5zdGF0ZS5xdW90aW5nID09PSB0cnVlIHx8IHRoaXMuc3RhdGUuZmllbGQubGVuZ3RoICE9PSAwIHx8ICF0aGlzLl9faXNDaGFyVHJpbWFibGUoY2hyKVxuICAgICAgLy8gcnRyaW0gaW4gbm9uIHF1b3RpbmcgaXMgaGFuZGxlIGluIF9fb25GaWVsZFxuICAgICAgY29uc3QgcmFwcGVuZCA9IHJ0cmltID09PSBmYWxzZSB8fCB0aGlzLnN0YXRlLndhc1F1b3RpbmcgPT09IGZhbHNlXG4gICAgICBpZiggbGFwcGVuZCA9PT0gdHJ1ZSAmJiByYXBwZW5kID09PSB0cnVlICl7XG4gICAgICAgIHRoaXMuc3RhdGUuZmllbGQuYXBwZW5kKGNocilcbiAgICAgIH1lbHNlIGlmKHJ0cmltID09PSB0cnVlICYmICF0aGlzLl9faXNDaGFyVHJpbWFibGUoY2hyKSl7XG4gICAgICAgIGNvbnN0IGVyciA9IHRoaXMuX19lcnJvcihcbiAgICAgICAgICBuZXcgQ3N2RXJyb3IoJ0NTVl9OT05fVFJJTUFCTEVfQ0hBUl9BRlRFUl9DTE9TSU5HX1FVT1RFJywgW1xuICAgICAgICAgICAgJ0ludmFsaWQgQ2xvc2luZyBRdW90ZTonLFxuICAgICAgICAgICAgJ2ZvdW5kIG5vbiB0cmltYWJsZSBieXRlIGFmdGVyIHF1b3RlJyxcbiAgICAgICAgICAgIGBhdCBsaW5lICR7dGhpcy5pbmZvLmxpbmVzfWAsXG4gICAgICAgICAgXSwgdGhpcy5fX2NvbnRleHQoKSlcbiAgICAgICAgKVxuICAgICAgICBpZihlcnIgIT09IHVuZGVmaW5lZCkgcmV0dXJuIGVyclxuICAgICAgfVxuICAgIH1cbiAgICBpZihlbmQgPT09IHRydWUpe1xuICAgICAgaWYodGhpcy5zdGF0ZS5xdW90aW5nID09PSB0cnVlKXtcbiAgICAgICAgY29uc3QgZXJyID0gdGhpcy5fX2Vycm9yKFxuICAgICAgICAgIG5ldyBDc3ZFcnJvcignQ1NWX1FVT1RFX05PVF9DTE9TRUQnLCBbXG4gICAgICAgICAgICAnUXVvdGUgTm90IENsb3NlZDonLFxuICAgICAgICAgICAgYHRoZSBwYXJzaW5nIGlzIGZpbmlzaGVkIHdpdGggYW4gb3BlbmluZyBxdW90ZSBhdCBsaW5lICR7dGhpcy5pbmZvLmxpbmVzfWAsXG4gICAgICAgICAgXSwgdGhpcy5fX2NvbnRleHQoKSlcbiAgICAgICAgKVxuICAgICAgICBpZihlcnIgIT09IHVuZGVmaW5lZCkgcmV0dXJuIGVyclxuICAgICAgfWVsc2V7XG4gICAgICAgIC8vIFNraXAgbGFzdCBsaW5lIGlmIGl0IGhhcyBubyBjaGFyYWN0ZXJzXG4gICAgICAgIGlmKHRoaXMuc3RhdGUud2FzUXVvdGluZyA9PT0gdHJ1ZSB8fCB0aGlzLnN0YXRlLnJlY29yZC5sZW5ndGggIT09IDAgfHwgdGhpcy5zdGF0ZS5maWVsZC5sZW5ndGggIT09IDApe1xuICAgICAgICAgIGNvbnN0IGVyckZpZWxkID0gdGhpcy5fX29uRmllbGQoKVxuICAgICAgICAgIGlmKGVyckZpZWxkICE9PSB1bmRlZmluZWQpIHJldHVybiBlcnJGaWVsZFxuICAgICAgICAgIGNvbnN0IGVyclJlY29yZCA9IHRoaXMuX19vblJvdygpXG4gICAgICAgICAgaWYoZXJyUmVjb3JkICE9PSB1bmRlZmluZWQpIHJldHVybiBlcnJSZWNvcmRcbiAgICAgICAgfWVsc2UgaWYodGhpcy5zdGF0ZS53YXNSb3dEZWxpbWl0ZXIgPT09IHRydWUpe1xuICAgICAgICAgIHRoaXMuaW5mby5lbXB0eV9saW5lcysrXG4gICAgICAgIH1lbHNlIGlmKHRoaXMuc3RhdGUuY29tbWVudGluZyA9PT0gdHJ1ZSl7XG4gICAgICAgICAgdGhpcy5pbmZvLmNvbW1lbnRfbGluZXMrK1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfWVsc2V7XG4gICAgICB0aGlzLnN0YXRlLnByZXZpb3VzQnVmID0gYnVmLnNsaWNlKHBvcylcbiAgICB9XG4gICAgaWYodGhpcy5zdGF0ZS53YXNSb3dEZWxpbWl0ZXIgPT09IHRydWUpe1xuICAgICAgdGhpcy5pbmZvLmxpbmVzKytcbiAgICAgIHRoaXMuc3RhdGUud2FzUm93RGVsaW1pdGVyID0gZmFsc2VcbiAgICB9XG4gIH1cbiAgLy8gSGVscGVyIHRvIHRlc3QgaWYgYSBjaGFyYWN0ZXIgaXMgYSBzcGFjZSBvciBhIGxpbmUgZGVsaW1pdGVyXG4gIF9faXNDaGFyVHJpbWFibGUoY2hyKXtcbiAgICByZXR1cm4gY2hyID09PSBzcGFjZSB8fCBjaHIgPT09IHRhYiB8fCBjaHIgPT09IGNyIHx8IGNociA9PT0gbmxcbiAgfVxuICBfX29uUm93KCl7XG4gICAgY29uc3Qge2NvbHVtbnMsIGluZm8sIGZyb20sIHJlbGF4X2NvbHVtbl9jb3VudCwgcmF3LCBza2lwX2xpbmVzX3dpdGhfZW1wdHlfdmFsdWVzfSA9IHRoaXMub3B0aW9uc1xuICAgIGNvbnN0IHtlbmFibGVkLCByZWNvcmR9ID0gdGhpcy5zdGF0ZVxuICAgIC8vIENvbnZlcnQgdGhlIGZpcnN0IGxpbmUgaW50byBjb2x1bW4gbmFtZXNcbiAgICBpZihjb2x1bW5zID09PSB0cnVlKXtcbiAgICAgIHJldHVybiB0aGlzLl9fZmlyc3RMaW5lVG9Db2x1bW5zKHJlY29yZClcbiAgICB9XG4gICAgY29uc3QgcmVjb3JkTGVuZ3RoID0gcmVjb3JkLmxlbmd0aFxuICAgIGlmKGNvbHVtbnMgPT09IGZhbHNlICYmIHRoaXMuaW5mby5yZWNvcmRzID09PSAwKXtcbiAgICAgIHRoaXMuc3RhdGUuZXhwZWN0ZWRSZWNvcmRMZW5ndGggPSByZWNvcmRMZW5ndGhcbiAgICB9ZWxzZSBpZihlbmFibGVkID09PSB0cnVlKXtcbiAgICAgIGlmKHJlY29yZExlbmd0aCAhPT0gdGhpcy5zdGF0ZS5leHBlY3RlZFJlY29yZExlbmd0aCl7XG4gICAgICAgIGlmKHJlbGF4X2NvbHVtbl9jb3VudCA9PT0gdHJ1ZSl7XG4gICAgICAgICAgdGhpcy5pbmZvLmludmFsaWRfZmllbGRfbGVuZ3RoKytcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgaWYoY29sdW1ucyA9PT0gZmFsc2Upe1xuICAgICAgICAgICAgY29uc3QgZXJyID0gdGhpcy5fX2Vycm9yKFxuICAgICAgICAgICAgICBuZXcgQ3N2RXJyb3IoJ0NTVl9JTlZBTElEX1JFQ09SRF9MRU5HVEhfRE9OVF9QUkVWSU9VU19SRUNPUkRTJywgW1xuICAgICAgICAgICAgICAgICdJbnZhbGlkIFJlY29yZCBMZW5ndGg6JyxcbiAgICAgICAgICAgICAgICBgZXhwZWN0ICR7dGhpcy5zdGF0ZS5leHBlY3RlZFJlY29yZExlbmd0aH0sYCxcbiAgICAgICAgICAgICAgICBgZ290ICR7cmVjb3JkTGVuZ3RofSBvbiBsaW5lICR7dGhpcy5pbmZvLmxpbmVzfWAsXG4gICAgICAgICAgICAgIF0sIHRoaXMuX19jb250ZXh0KCksIHtcbiAgICAgICAgICAgICAgICByZWNvcmQ6IHJlY29yZCxcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIGlmKGVyciAhPT0gdW5kZWZpbmVkKSByZXR1cm4gZXJyXG4gICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBjb25zdCBlcnIgPSB0aGlzLl9fZXJyb3IoXG4gICAgICAgICAgICAgIG5ldyBDc3ZFcnJvcignQ1NWX0lOVkFMSURfUkVDT1JEX0xFTkdUSF9ET05UX01BVENIX0NPTFVNTlMnLCBbXG4gICAgICAgICAgICAgICAgJ0ludmFsaWQgUmVjb3JkIExlbmd0aDonLFxuICAgICAgICAgICAgICAgIGBoZWFkZXIgbGVuZ3RoIGlzICR7Y29sdW1ucy5sZW5ndGh9LGAsXG4gICAgICAgICAgICAgICAgYGdvdCAke3JlY29yZExlbmd0aH0gb24gbGluZSAke3RoaXMuaW5mby5saW5lc31gLFxuICAgICAgICAgICAgICBdLCB0aGlzLl9fY29udGV4dCgpLCB7XG4gICAgICAgICAgICAgICAgcmVjb3JkOiByZWNvcmQsXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgICBpZihlcnIgIT09IHVuZGVmaW5lZCkgcmV0dXJuIGVyclxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZihlbmFibGVkID09PSBmYWxzZSl7XG4gICAgICByZXR1cm4gdGhpcy5fX3Jlc2V0Um93KClcbiAgICB9XG4gICAgaWYoc2tpcF9saW5lc193aXRoX2VtcHR5X3ZhbHVlcyA9PT0gdHJ1ZSl7XG4gICAgICBpZihyZWNvcmQuZXZlcnkoIChmaWVsZCkgPT4gZmllbGQgPT0gbnVsbCB8fCBmaWVsZC50b1N0cmluZyAmJiBmaWVsZC50b1N0cmluZygpLnRyaW0oKSA9PT0gJycgKSl7XG4gICAgICAgIHRoaXMuX19yZXNldFJvdygpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgIH1cbiAgICBpZih0aGlzLnN0YXRlLnJlY29yZEhhc0Vycm9yID09PSB0cnVlKXtcbiAgICAgIHRoaXMuX19yZXNldFJvdygpXG4gICAgICB0aGlzLnN0YXRlLnJlY29yZEhhc0Vycm9yID0gZmFsc2VcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICB0aGlzLmluZm8ucmVjb3JkcysrXG4gICAgaWYoZnJvbSA9PT0gMSB8fCB0aGlzLmluZm8ucmVjb3JkcyA+PSBmcm9tKXtcbiAgICAgIGlmKGNvbHVtbnMgIT09IGZhbHNlKXtcbiAgICAgICAgY29uc3Qgb2JqID0ge31cbiAgICAgICAgLy8gVHJhbnNmb3JtIHJlY29yZCBhcnJheSB0byBhbiBvYmplY3RcbiAgICAgICAgZm9yKGxldCBpIGluIHJlY29yZCl7XG4gICAgICAgICAgaWYoY29sdW1uc1tpXSA9PT0gdW5kZWZpbmVkIHx8IGNvbHVtbnNbaV0uZGlzYWJsZWQpIGNvbnRpbnVlXG4gICAgICAgICAgb2JqW2NvbHVtbnNbaV0ubmFtZV0gPSByZWNvcmRbaV1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCB7b2JqbmFtZX0gPSB0aGlzLm9wdGlvbnNcbiAgICAgICAgaWYob2JqbmFtZSA9PT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICBpZihyYXcgPT09IHRydWUgfHwgaW5mbyA9PT0gdHJ1ZSl7XG4gICAgICAgICAgICB0aGlzLnB1c2goT2JqZWN0LmFzc2lnbihcbiAgICAgICAgICAgICAge3JlY29yZDogb2JqfSxcbiAgICAgICAgICAgICAgKHJhdyA9PT0gdHJ1ZSA/IHtyYXc6IHRoaXMuc3RhdGUucmF3QnVmZmVyLnRvU3RyaW5nKCl9OiB7fSksXG4gICAgICAgICAgICAgIChpbmZvID09PSB0cnVlID8ge2luZm86IHRoaXMuc3RhdGUuaW5mb306IHt9KVxuICAgICAgICAgICAgKSlcbiAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMucHVzaChvYmopXG4gICAgICAgICAgfVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICBpZihyYXcgPT09IHRydWUgfHwgaW5mbyA9PT0gdHJ1ZSl7XG4gICAgICAgICAgICB0aGlzLnB1c2goT2JqZWN0LmFzc2lnbihcbiAgICAgICAgICAgICAge3JlY29yZDogW29ialtvYmpuYW1lXSwgb2JqXX0sXG4gICAgICAgICAgICAgIHJhdyA9PT0gdHJ1ZSA/IHtyYXc6IHRoaXMuc3RhdGUucmF3QnVmZmVyLnRvU3RyaW5nKCl9OiB7fSxcbiAgICAgICAgICAgICAgaW5mbyA9PT0gdHJ1ZSA/IHtpbmZvOiB0aGlzLnN0YXRlLmluZm99OiB7fVxuICAgICAgICAgICAgKSlcbiAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMucHVzaChbb2JqW29iam5hbWVdLCBvYmpdKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfWVsc2V7XG4gICAgICAgIGlmKHJhdyA9PT0gdHJ1ZSB8fCBpbmZvID09PSB0cnVlKXtcbiAgICAgICAgICB0aGlzLnB1c2goT2JqZWN0LmFzc2lnbihcbiAgICAgICAgICAgIHtyZWNvcmQ6IHJlY29yZH0sXG4gICAgICAgICAgICByYXcgPT09IHRydWUgPyB7cmF3OiB0aGlzLnN0YXRlLnJhd0J1ZmZlci50b1N0cmluZygpfToge30sXG4gICAgICAgICAgICBpbmZvID09PSB0cnVlID8ge2luZm86IHRoaXMuc3RhdGUuaW5mb306IHt9XG4gICAgICAgICAgKSlcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgdGhpcy5wdXNoKHJlY29yZClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9fcmVzZXRSb3coKVxuICB9XG4gIF9fZmlyc3RMaW5lVG9Db2x1bW5zKHJlY29yZCl7XG4gICAgY29uc3Qge2ZpcnN0TGluZVRvSGVhZGVyc30gPSB0aGlzLnN0YXRlXG4gICAgdHJ5e1xuICAgICAgY29uc3QgaGVhZGVycyA9IGZpcnN0TGluZVRvSGVhZGVycyA9PT0gdW5kZWZpbmVkID8gcmVjb3JkIDogZmlyc3RMaW5lVG9IZWFkZXJzLmNhbGwobnVsbCwgcmVjb3JkKVxuICAgICAgaWYoIUFycmF5LmlzQXJyYXkoaGVhZGVycykpe1xuICAgICAgICByZXR1cm4gdGhpcy5fX2Vycm9yKFxuICAgICAgICAgIG5ldyBDc3ZFcnJvcignQ1NWX0lOVkFMSURfQ09MVU1OX01BUFBJTkcnLCBbXG4gICAgICAgICAgICAnSW52YWxpZCBDb2x1bW4gTWFwcGluZzonLFxuICAgICAgICAgICAgJ2V4cGVjdCBhbiBhcnJheSBmcm9tIGNvbHVtbiBmdW5jdGlvbiwnLFxuICAgICAgICAgICAgYGdvdCAke0pTT04uc3RyaW5naWZ5KGhlYWRlcnMpfWBcbiAgICAgICAgICBdLCB0aGlzLl9fY29udGV4dCgpLCB7XG4gICAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzLFxuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgIH1cbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRIZWFkZXJzID0gbm9ybWFsaXplQ29sdW1uc0FycmF5KGhlYWRlcnMpXG4gICAgICB0aGlzLnN0YXRlLmV4cGVjdGVkUmVjb3JkTGVuZ3RoID0gbm9ybWFsaXplZEhlYWRlcnMubGVuZ3RoXG4gICAgICB0aGlzLm9wdGlvbnMuY29sdW1ucyA9IG5vcm1hbGl6ZWRIZWFkZXJzXG4gICAgICB0aGlzLl9fcmVzZXRSb3coKVxuICAgICAgcmV0dXJuXG4gICAgfWNhdGNoKGVycil7XG4gICAgICByZXR1cm4gZXJyXG4gICAgfVxuICB9XG4gIF9fcmVzZXRSb3coKXtcbiAgICBpZih0aGlzLm9wdGlvbnMucmF3ID09PSB0cnVlKXtcbiAgICAgIHRoaXMuc3RhdGUucmF3QnVmZmVyLnJlc2V0KClcbiAgICB9XG4gICAgdGhpcy5zdGF0ZS5yZWNvcmQgPSBbXVxuICAgIHRoaXMuc3RhdGUucmVjb3JkX2xlbmd0aCA9IDBcbiAgfVxuICBfX29uRmllbGQoKXtcbiAgICBjb25zdCB7Y2FzdCwgcnRyaW0sIG1heF9yZWNvcmRfc2l6ZX0gPSB0aGlzLm9wdGlvbnNcbiAgICBjb25zdCB7ZW5hYmxlZCwgd2FzUXVvdGluZ30gPSB0aGlzLnN0YXRlXG4gICAgLy8gRGVhbCB3aXRoIGZyb21fdG8gb3B0aW9uc1xuICAgIGlmKHRoaXMub3B0aW9ucy5jb2x1bW5zICE9PSB0cnVlICYmIGVuYWJsZWQgPT09IGZhbHNlKXtcbiAgICAgIHJldHVybiB0aGlzLl9fcmVzZXRGaWVsZCgpXG4gICAgfVxuICAgIGxldCBmaWVsZCA9IHRoaXMuc3RhdGUuZmllbGQudG9TdHJpbmcoKVxuICAgIGlmKHJ0cmltID09PSB0cnVlICYmIHdhc1F1b3RpbmcgPT09IGZhbHNlKXtcbiAgICAgIGZpZWxkID0gZmllbGQudHJpbVJpZ2h0KClcbiAgICB9XG4gICAgaWYoY2FzdCA9PT0gdHJ1ZSl7XG4gICAgICBjb25zdCBbZXJyLCBmXSA9IHRoaXMuX19jYXN0KGZpZWxkKVxuICAgICAgaWYoZXJyICE9PSB1bmRlZmluZWQpIHJldHVybiBlcnJcbiAgICAgIGZpZWxkID0gZlxuICAgIH1cbiAgICB0aGlzLnN0YXRlLnJlY29yZC5wdXNoKGZpZWxkKVxuICAgIC8vIEluY3JlbWVudCByZWNvcmQgbGVuZ3RoIGlmIHJlY29yZCBzaXplIG11c3Qgbm90IGV4Y2VlZCBhIGxpbWl0XG4gICAgaWYobWF4X3JlY29yZF9zaXplICE9PSAwICYmIHR5cGVvZiBmaWVsZCA9PT0gJ3N0cmluZycpe1xuICAgICAgdGhpcy5zdGF0ZS5yZWNvcmRfbGVuZ3RoICs9IGZpZWxkLmxlbmd0aFxuICAgIH1cbiAgICB0aGlzLl9fcmVzZXRGaWVsZCgpXG4gIH1cbiAgX19yZXNldEZpZWxkKCl7XG4gICAgdGhpcy5zdGF0ZS5maWVsZC5yZXNldCgpXG4gICAgdGhpcy5zdGF0ZS53YXNRdW90aW5nID0gZmFsc2VcbiAgfVxuICAvLyBSZXR1cm4gYSB0dXBsZSB3aXRoIHRoZSBlcnJvciBhbmQgdGhlIGNhc3RlZCB2YWx1ZVxuICBfX2Nhc3QoZmllbGQpe1xuICAgIGNvbnN0IHtjb2x1bW5zLCByZWxheF9jb2x1bW5fY291bnR9ID0gdGhpcy5vcHRpb25zXG4gICAgY29uc3QgaXNDb2x1bW5zID0gQXJyYXkuaXNBcnJheShjb2x1bW5zKVxuICAgIC8vIERvbnQgbG9vc2UgdGltZSBjYWxsaW5nIGNhc3RcbiAgICAvLyBiZWNhdXNlIHRoZSBmaW5hbCByZWNvcmQgaXMgYW4gb2JqZWN0XG4gICAgLy8gYW5kIHRoaXMgZmllbGQgY2FuJ3QgYmUgYXNzb2NpYXRlZCB0byBhIGtleSBwcmVzZW50IGluIGNvbHVtbnNcbiAgICBpZiggaXNDb2x1bW5zID09PSB0cnVlICYmIHJlbGF4X2NvbHVtbl9jb3VudCAmJiB0aGlzLm9wdGlvbnMuY29sdW1ucy5sZW5ndGggPD0gdGhpcy5zdGF0ZS5yZWNvcmQubGVuZ3RoICl7XG4gICAgICByZXR1cm4gW3VuZGVmaW5lZCwgdW5kZWZpbmVkXVxuICAgIH1cbiAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5fX2NvbnRleHQoKVxuICAgIGlmKHRoaXMuc3RhdGUuY2FzdEZpZWxkICE9PSBudWxsKXtcbiAgICAgIHRyeXtcbiAgICAgICAgcmV0dXJuIFt1bmRlZmluZWQsIHRoaXMuc3RhdGUuY2FzdEZpZWxkLmNhbGwobnVsbCwgZmllbGQsIGNvbnRleHQpXVxuICAgICAgfWNhdGNoKGVycil7XG4gICAgICAgIHJldHVybiBbZXJyXVxuICAgICAgfVxuICAgIH1cbiAgICBpZih0aGlzLl9faXNGbG9hdChmaWVsZCkpe1xuICAgICAgcmV0dXJuIFt1bmRlZmluZWQsIHBhcnNlRmxvYXQoZmllbGQpXVxuICAgIH1lbHNlIGlmKHRoaXMub3B0aW9ucy5jYXN0X2RhdGUgIT09IGZhbHNlKXtcbiAgICAgIHJldHVybiBbdW5kZWZpbmVkLCB0aGlzLm9wdGlvbnMuY2FzdF9kYXRlLmNhbGwobnVsbCwgZmllbGQsIGNvbnRleHQpXVxuICAgIH1cbiAgICByZXR1cm4gW3VuZGVmaW5lZCwgZmllbGRdXG4gIH1cbiAgLy8gS2VlcCBpdCBpbiBjYXNlIHdlIGltcGxlbWVudCB0aGUgYGNhc3RfaW50YCBvcHRpb25cbiAgLy8gX19pc0ludCh2YWx1ZSl7XG4gIC8vICAgLy8gcmV0dXJuIE51bWJlci5pc0ludGVnZXIocGFyc2VJbnQodmFsdWUpKVxuICAvLyAgIC8vIHJldHVybiAhaXNOYU4oIHBhcnNlSW50KCBvYmogKSApO1xuICAvLyAgIHJldHVybiAvXihcXC18XFwrKT9bMS05XVswLTldKiQvLnRlc3QodmFsdWUpXG4gIC8vIH1cbiAgX19pc0Zsb2F0KHZhbHVlKXtcbiAgICByZXR1cm4gKHZhbHVlIC0gcGFyc2VGbG9hdCggdmFsdWUgKSArIDEpID49IDAgLy8gQm9ycm93ZWQgZnJvbSBqcXVlcnlcbiAgfVxuICBfX2NvbXBhcmVCeXRlcyhzb3VyY2VCdWYsIHRhcmdldEJ1ZiwgcG9zLCBmaXJ0Qnl0ZSl7XG4gICAgaWYoc291cmNlQnVmWzBdICE9PSBmaXJ0Qnl0ZSkgcmV0dXJuIDBcbiAgICBjb25zdCBzb3VyY2VMZW5ndGggPSBzb3VyY2VCdWYubGVuZ3RoXG4gICAgZm9yKGxldCBpID0gMTsgaSA8IHNvdXJjZUxlbmd0aDsgaSsrKXtcbiAgICAgIGlmKHNvdXJjZUJ1ZltpXSAhPT0gdGFyZ2V0QnVmW3BvcytpXSkgcmV0dXJuIDBcbiAgICB9XG4gICAgcmV0dXJuIHNvdXJjZUxlbmd0aFxuICB9XG4gIF9fbmVlZE1vcmVEYXRhKGksIGJ1ZkxlbiwgZW5kKXtcbiAgICBpZihlbmQpe1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIGNvbnN0IHtjb21tZW50LCBkZWxpbWl0ZXJ9ID0gdGhpcy5vcHRpb25zXG4gICAgY29uc3Qge3F1b3RpbmcsIHJlY29yZERlbGltaXRlck1heExlbmd0aH0gPSB0aGlzLnN0YXRlXG4gICAgY29uc3QgbnVtT2ZDaGFyTGVmdCA9IGJ1ZkxlbiAtIGkgLSAxXG4gICAgY29uc3QgcmVxdWlyZWRMZW5ndGggPSBNYXRoLm1heChcbiAgICAgIC8vIFNraXAgaWYgdGhlIHJlbWFpbmluZyBidWZmZXIgc21hbGxlciB0aGFuIGNvbW1lbnRcbiAgICAgIGNvbW1lbnQgPyBjb21tZW50Lmxlbmd0aCA6IDAsXG4gICAgICAvLyBTa2lwIGlmIHRoZSByZW1haW5pbmcgYnVmZmVyIHNtYWxsZXIgdGhhbiByb3cgZGVsaW1pdGVyXG4gICAgICByZWNvcmREZWxpbWl0ZXJNYXhMZW5ndGgsXG4gICAgICAvLyBTa2lwIGlmIHRoZSByZW1haW5pbmcgYnVmZmVyIGNhbiBiZSByb3cgZGVsaW1pdGVyIGZvbGxvd2luZyB0aGUgY2xvc2luZyBxdW90ZVxuICAgICAgLy8gMSBpcyBmb3IgcXVvdGUubGVuZ3RoXG4gICAgICBxdW90aW5nID8gKDEgKyByZWNvcmREZWxpbWl0ZXJNYXhMZW5ndGgpIDogMCxcbiAgICAgIC8vIFNraXAgaWYgdGhlIHJlbWFpbmluZyBidWZmZXIgY2FuIGJlIGRlbGltaXRlclxuICAgICAgZGVsaW1pdGVyLmxlbmd0aCxcbiAgICAgIC8vIFNraXAgaWYgdGhlIHJlbWFpbmluZyBidWZmZXIgY2FuIGJlIGVzY2FwZSBzZXF1ZW5jZVxuICAgICAgLy8gMSBpcyBmb3IgZXNjYXBlLmxlbmd0aFxuICAgICAgMVxuICAgIClcbiAgICByZXR1cm4gbnVtT2ZDaGFyTGVmdCA8IHJlcXVpcmVkTGVuZ3RoXG4gIH1cbiAgX19pc0RlbGltaXRlcihjaHIsIGJ1ZiwgcG9zKXtcbiAgICBjb25zdCB7ZGVsaW1pdGVyfSA9IHRoaXMub3B0aW9uc1xuICAgIGNvbnN0IGRlbExlbmd0aCA9IGRlbGltaXRlci5sZW5ndGhcbiAgICBpZihkZWxpbWl0ZXJbMF0gIT09IGNocikgcmV0dXJuIDBcbiAgICBmb3IobGV0IGkgPSAxOyBpIDwgZGVsTGVuZ3RoOyBpKyspe1xuICAgICAgaWYoZGVsaW1pdGVyW2ldICE9PSBidWZbcG9zK2ldKSByZXR1cm4gMFxuICAgIH1cbiAgICByZXR1cm4gZGVsaW1pdGVyLmxlbmd0aFxuICB9XG4gIF9faXNSZWNvcmREZWxpbWl0ZXIoY2hyLCBidWYsIHBvcyl7XG4gICAgY29uc3Qge3JlY29yZF9kZWxpbWl0ZXJ9ID0gdGhpcy5vcHRpb25zXG4gICAgY29uc3QgcmVjb3JkRGVsaW1pdGVyTGVuZ3RoID0gcmVjb3JkX2RlbGltaXRlci5sZW5ndGhcbiAgICBsb29wMTogZm9yKGxldCBpID0gMDsgaSA8IHJlY29yZERlbGltaXRlckxlbmd0aDsgaSsrKXtcbiAgICAgIGNvbnN0IHJkID0gcmVjb3JkX2RlbGltaXRlcltpXVxuICAgICAgY29uc3QgcmRMZW5ndGggPSByZC5sZW5ndGhcbiAgICAgIGlmKHJkWzBdICE9PSBjaHIpe1xuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuICAgICAgZm9yKGxldCBqID0gMTsgaiA8IHJkTGVuZ3RoOyBqKyspe1xuICAgICAgICBpZihyZFtqXSAhPT0gYnVmW3BvcytqXSl7XG4gICAgICAgICAgY29udGludWUgbG9vcDFcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJkLmxlbmd0aFxuICAgIH1cbiAgICByZXR1cm4gMFxuICB9XG4gIF9fYXV0b0Rpc2NvdmVyUm93RGVsaW1pdGVyKGJ1ZiwgcG9zKXtcbiAgICBjb25zdCBjaHIgPSBidWZbcG9zXVxuICAgIGlmKGNociA9PT0gY3Ipe1xuICAgICAgaWYoYnVmW3BvcysxXSA9PT0gbmwpe1xuICAgICAgICB0aGlzLm9wdGlvbnMucmVjb3JkX2RlbGltaXRlci5wdXNoKEJ1ZmZlci5mcm9tKCdcXHJcXG4nKSlcbiAgICAgICAgdGhpcy5zdGF0ZS5yZWNvcmREZWxpbWl0ZXJNYXhMZW5ndGggPSAyXG4gICAgICAgIHJldHVybiAyXG4gICAgICB9ZWxzZXtcbiAgICAgICAgdGhpcy5vcHRpb25zLnJlY29yZF9kZWxpbWl0ZXIucHVzaChCdWZmZXIuZnJvbSgnXFxyJykpXG4gICAgICAgIHRoaXMuc3RhdGUucmVjb3JkRGVsaW1pdGVyTWF4TGVuZ3RoID0gMVxuICAgICAgICByZXR1cm4gMVxuICAgICAgfVxuICAgIH1lbHNlIGlmKGNociA9PT0gbmwpe1xuICAgICAgdGhpcy5vcHRpb25zLnJlY29yZF9kZWxpbWl0ZXIucHVzaChCdWZmZXIuZnJvbSgnXFxuJykpXG4gICAgICB0aGlzLnN0YXRlLnJlY29yZERlbGltaXRlck1heExlbmd0aCA9IDFcbiAgICAgIHJldHVybiAxXG4gICAgfVxuICAgIHJldHVybiAwXG4gIH1cbiAgX19lcnJvcihtc2cpe1xuICAgIGNvbnN0IHtza2lwX2xpbmVzX3dpdGhfZXJyb3J9ID0gdGhpcy5vcHRpb25zXG4gICAgY29uc3QgZXJyID0gdHlwZW9mIG1zZyA9PT0gJ3N0cmluZycgPyBuZXcgRXJyb3IobXNnKSA6IG1zZ1xuICAgIGlmKHNraXBfbGluZXNfd2l0aF9lcnJvcil7XG4gICAgICB0aGlzLnN0YXRlLnJlY29yZEhhc0Vycm9yID0gdHJ1ZVxuICAgICAgdGhpcy5lbWl0KCdza2lwJywgZXJyKVxuICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgIH1lbHNle1xuICAgICAgcmV0dXJuIGVyclxuICAgIH1cbiAgfVxuICBfX2NvbnRleHQoKXtcbiAgICBjb25zdCB7Y29sdW1uc30gPSB0aGlzLm9wdGlvbnNcbiAgICBjb25zdCBpc0NvbHVtbnMgPSBBcnJheS5pc0FycmF5KGNvbHVtbnMpXG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbHVtbjogaXNDb2x1bW5zID09PSB0cnVlID9cbiAgICAgICAgKCBjb2x1bW5zLmxlbmd0aCA+IHRoaXMuc3RhdGUucmVjb3JkLmxlbmd0aCA/XG4gICAgICAgICAgY29sdW1uc1t0aGlzLnN0YXRlLnJlY29yZC5sZW5ndGhdLm5hbWUgOlxuICAgICAgICAgIG51bGxcbiAgICAgICAgKSA6XG4gICAgICAgIHRoaXMuc3RhdGUucmVjb3JkLmxlbmd0aCxcbiAgICAgIGVtcHR5X2xpbmVzOiB0aGlzLmluZm8uZW1wdHlfbGluZXMsXG4gICAgICBoZWFkZXI6IGNvbHVtbnMgPT09IHRydWUsXG4gICAgICBpbmRleDogdGhpcy5zdGF0ZS5yZWNvcmQubGVuZ3RoLFxuICAgICAgaW52YWxpZF9maWVsZF9sZW5ndGg6IHRoaXMuaW5mby5pbnZhbGlkX2ZpZWxkX2xlbmd0aCxcbiAgICAgIHF1b3Rpbmc6IHRoaXMuc3RhdGUud2FzUXVvdGluZyxcbiAgICAgIGxpbmVzOiB0aGlzLmluZm8ubGluZXMsXG4gICAgICByZWNvcmRzOiB0aGlzLmluZm8ucmVjb3Jkc1xuICAgIH1cbiAgfVxufVxuXG5jb25zdCBwYXJzZSA9IGZ1bmN0aW9uKCl7XG4gIGxldCBkYXRhLCBvcHRpb25zLCBjYWxsYmFja1xuICBmb3IobGV0IGkgaW4gYXJndW1lbnRzKXtcbiAgICBjb25zdCBhcmd1bWVudCA9IGFyZ3VtZW50c1tpXVxuICAgIGNvbnN0IHR5cGUgPSB0eXBlb2YgYXJndW1lbnRcbiAgICBpZihkYXRhID09PSB1bmRlZmluZWQgJiYgKHR5cGVvZiBhcmd1bWVudCA9PT0gJ3N0cmluZycgfHwgQnVmZmVyLmlzQnVmZmVyKGFyZ3VtZW50KSkpe1xuICAgICAgZGF0YSA9IGFyZ3VtZW50XG4gICAgfWVsc2UgaWYob3B0aW9ucyA9PT0gdW5kZWZpbmVkICYmIGlzT2JqZWN0KGFyZ3VtZW50KSl7XG4gICAgICBvcHRpb25zID0gYXJndW1lbnRcbiAgICB9ZWxzZSBpZihjYWxsYmFjayA9PT0gdW5kZWZpbmVkICYmIHR5cGUgPT09ICdmdW5jdGlvbicpe1xuICAgICAgY2FsbGJhY2sgPSBhcmd1bWVudFxuICAgIH1lbHNle1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGFyZ3VtZW50OiBnb3QgJHtKU09OLnN0cmluZ2lmeShhcmd1bWVudCl9IGF0IGluZGV4ICR7aX1gKVxuICAgIH1cbiAgfVxuICBjb25zdCBwYXJzZXIgPSBuZXcgUGFyc2VyKG9wdGlvbnMpXG4gIGlmKGNhbGxiYWNrKXtcbiAgICBjb25zdCByZWNvcmRzID0gb3B0aW9ucyA9PT0gdW5kZWZpbmVkIHx8IG9wdGlvbnMub2JqbmFtZSA9PT0gdW5kZWZpbmVkID8gW10gOiB7fVxuICAgIHBhcnNlci5vbigncmVhZGFibGUnLCBmdW5jdGlvbigpe1xuICAgICAgbGV0IHJlY29yZFxuICAgICAgd2hpbGUoKHJlY29yZCA9IHRoaXMucmVhZCgpKSAhPT0gbnVsbCl7XG4gICAgICAgIGlmKG9wdGlvbnMgPT09IHVuZGVmaW5lZCB8fCBvcHRpb25zLm9iam5hbWUgPT09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgcmVjb3Jkcy5wdXNoKHJlY29yZClcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgcmVjb3Jkc1tyZWNvcmRbMF1dID0gcmVjb3JkWzFdXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICAgIHBhcnNlci5vbignZXJyb3InLCBmdW5jdGlvbihlcnIpe1xuICAgICAgY2FsbGJhY2soZXJyLCB1bmRlZmluZWQsIHBhcnNlci5pbmZvKVxuICAgIH0pXG4gICAgcGFyc2VyLm9uKCdlbmQnLCBmdW5jdGlvbigpe1xuICAgICAgY2FsbGJhY2sodW5kZWZpbmVkLCByZWNvcmRzLCBwYXJzZXIuaW5mbylcbiAgICB9KVxuICB9XG4gIGlmKGRhdGEgIT09IHVuZGVmaW5lZCl7XG4gICAgcGFyc2VyLndyaXRlKGRhdGEpXG4gICAgcGFyc2VyLmVuZCgpXG4gIH1cbiAgcmV0dXJuIHBhcnNlclxufVxuXG5jbGFzcyBDc3ZFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IoY29kZSwgbWVzc2FnZSwgLi4uY29udGV4dHMpIHtcbiAgICBpZihBcnJheS5pc0FycmF5KG1lc3NhZ2UpKSBtZXNzYWdlID0gbWVzc2FnZS5qb2luKCcgJylcbiAgICBzdXBlcihbbWVzc2FnZV0pXG4gICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgQ3N2RXJyb3IpXG4gICAgdGhpcy5jb2RlID0gY29kZVxuICAgIGZvcihjb25zdCBjb250ZXh0IG9mIGNvbnRleHRzKXtcbiAgICAgIGZvcihjb25zdCBrZXkgaW4gY29udGV4dCl7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gY29udGV4dFtrZXldXG4gICAgICAgIHRoaXNba2V5XSA9IEJ1ZmZlci5pc0J1ZmZlcih2YWx1ZSkgPyB2YWx1ZS50b1N0cmluZygpIDogdmFsdWUgPT0gbnVsbCA/IHZhbHVlIDogSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh2YWx1ZSkpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbnBhcnNlLlBhcnNlciA9IFBhcnNlclxuXG5wYXJzZS5Dc3ZFcnJvciA9IENzdkVycm9yXG5cbm1vZHVsZS5leHBvcnRzID0gcGFyc2VcblxuY29uc3QgdW5kZXJzY29yZSA9IGZ1bmN0aW9uKHN0cil7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvKFtBLVpdKS9nLCBmdW5jdGlvbihfLCBtYXRjaCl7XG4gICAgcmV0dXJuICdfJyArIG1hdGNoLnRvTG93ZXJDYXNlKClcbiAgfSlcbn1cblxuY29uc3QgaXNPYmplY3QgPSBmdW5jdGlvbihvYmope1xuICByZXR1cm4gKHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIG9iaiAhPT0gbnVsbCAmJiAhQXJyYXkuaXNBcnJheShvYmopKVxufVxuXG5jb25zdCBub3JtYWxpemVDb2x1bW5zQXJyYXkgPSBmdW5jdGlvbihjb2x1bW5zKXtcbiAgY29uc3Qgbm9ybWFsaXplZENvbHVtbnMgPSBbXTtcblxuICBmb3IobGV0IGk9MDsgaTwgY29sdW1ucy5sZW5ndGg7IGkrKyl7XG4gICAgY29uc3QgY29sdW1uID0gY29sdW1uc1tpXVxuICAgIGlmKGNvbHVtbiA9PT0gdW5kZWZpbmVkIHx8IGNvbHVtbiA9PT0gbnVsbCB8fCBjb2x1bW4gPT09IGZhbHNlKXtcbiAgICAgIG5vcm1hbGl6ZWRDb2x1bW5zW2ldID0geyBkaXNhYmxlZDogdHJ1ZSB9XG4gICAgfWVsc2UgaWYodHlwZW9mIGNvbHVtbiA9PT0gJ3N0cmluZycpe1xuICAgICAgbm9ybWFsaXplZENvbHVtbnNbaV0gPSB7IG5hbWU6IGNvbHVtbiB9XG4gICAgfWVsc2UgaWYoaXNPYmplY3QoY29sdW1uKSl7XG4gICAgICBpZih0eXBlb2YgY29sdW1uLm5hbWUgIT09ICdzdHJpbmcnKXtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIE9wdGlvbiBjb2x1bW5zOiBwcm9wZXJ0eSBcIm5hbWVcIiBpcyByZXF1aXJlZCBhdCBwb3NpdGlvbiAke2l9IHdoZW4gY29sdW1uIGlzIGFuIG9iamVjdCBsaXRlcmFsYClcbiAgICAgIH1cbiAgICAgIG5vcm1hbGl6ZWRDb2x1bW5zW2ldID0gY29sdW1uXG4gICAgfWVsc2V7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgT3B0aW9uIGNvbHVtbnM6IGV4cGVjdCBhIHN0cmluZyBvciBhbiBvYmplY3QsIGdvdCAke0pTT04uc3RyaW5naWZ5KGNvbHVtbil9IGF0IHBvc2l0aW9uICR7aX1gKVxuICAgIH1cbiAgfVxuICByZXR1cm4gbm9ybWFsaXplZENvbHVtbnM7XG59XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUiA9IHR5cGVvZiBSZWZsZWN0ID09PSAnb2JqZWN0JyA/IFJlZmxlY3QgOiBudWxsXG52YXIgUmVmbGVjdEFwcGx5ID0gUiAmJiB0eXBlb2YgUi5hcHBseSA9PT0gJ2Z1bmN0aW9uJ1xuICA/IFIuYXBwbHlcbiAgOiBmdW5jdGlvbiBSZWZsZWN0QXBwbHkodGFyZ2V0LCByZWNlaXZlciwgYXJncykge1xuICAgIHJldHVybiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbCh0YXJnZXQsIHJlY2VpdmVyLCBhcmdzKTtcbiAgfVxuXG52YXIgUmVmbGVjdE93bktleXNcbmlmIChSICYmIHR5cGVvZiBSLm93bktleXMgPT09ICdmdW5jdGlvbicpIHtcbiAgUmVmbGVjdE93bktleXMgPSBSLm93bktleXNcbn0gZWxzZSBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICBSZWZsZWN0T3duS2V5cyA9IGZ1bmN0aW9uIFJlZmxlY3RPd25LZXlzKHRhcmdldCkge1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpXG4gICAgICAuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHModGFyZ2V0KSk7XG4gIH07XG59IGVsc2Uge1xuICBSZWZsZWN0T3duS2V5cyA9IGZ1bmN0aW9uIFJlZmxlY3RPd25LZXlzKHRhcmdldCkge1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBQcm9jZXNzRW1pdFdhcm5pbmcod2FybmluZykge1xuICBpZiAoY29uc29sZSAmJiBjb25zb2xlLndhcm4pIGNvbnNvbGUud2Fybih3YXJuaW5nKTtcbn1cblxudmFyIE51bWJlcklzTmFOID0gTnVtYmVyLmlzTmFOIHx8IGZ1bmN0aW9uIE51bWJlcklzTmFOKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPT0gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgRXZlbnRFbWl0dGVyLmluaXQuY2FsbCh0aGlzKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xuXG4vLyBCYWNrd2FyZHMtY29tcGF0IHdpdGggbm9kZSAwLjEwLnhcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50c0NvdW50ID0gMDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycyA9IHVuZGVmaW5lZDtcblxuLy8gQnkgZGVmYXVsdCBFdmVudEVtaXR0ZXJzIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIG1vcmUgdGhhbiAxMCBsaXN0ZW5lcnMgYXJlXG4vLyBhZGRlZCB0byBpdC4gVGhpcyBpcyBhIHVzZWZ1bCBkZWZhdWx0IHdoaWNoIGhlbHBzIGZpbmRpbmcgbWVtb3J5IGxlYWtzLlxudmFyIGRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAxMDtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEV2ZW50RW1pdHRlciwgJ2RlZmF1bHRNYXhMaXN0ZW5lcnMnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gIH0sXG4gIHNldDogZnVuY3Rpb24oYXJnKSB7XG4gICAgaWYgKHR5cGVvZiBhcmcgIT09ICdudW1iZXInIHx8IGFyZyA8IDAgfHwgTnVtYmVySXNOYU4oYXJnKSkge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBvZiBcImRlZmF1bHRNYXhMaXN0ZW5lcnNcIiBpcyBvdXQgb2YgcmFuZ2UuIEl0IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLiBSZWNlaXZlZCAnICsgYXJnICsgJy4nKTtcbiAgICB9XG4gICAgZGVmYXVsdE1heExpc3RlbmVycyA9IGFyZztcbiAgfVxufSk7XG5cbkV2ZW50RW1pdHRlci5pbml0ID0gZnVuY3Rpb24oKSB7XG5cbiAgaWYgKHRoaXMuX2V2ZW50cyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICB0aGlzLl9ldmVudHMgPT09IE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzKS5fZXZlbnRzKSB7XG4gICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gIH1cblxuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSB0aGlzLl9tYXhMaXN0ZW5lcnMgfHwgdW5kZWZpbmVkO1xufTtcblxuLy8gT2J2aW91c2x5IG5vdCBhbGwgRW1pdHRlcnMgc2hvdWxkIGJlIGxpbWl0ZWQgdG8gMTAuIFRoaXMgZnVuY3Rpb24gYWxsb3dzXG4vLyB0aGF0IHRvIGJlIGluY3JlYXNlZC4gU2V0IHRvIHplcm8gZm9yIHVubGltaXRlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gc2V0TWF4TGlzdGVuZXJzKG4pIHtcbiAgaWYgKHR5cGVvZiBuICE9PSAnbnVtYmVyJyB8fCBuIDwgMCB8fCBOdW1iZXJJc05hTihuKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgb2YgXCJuXCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci4gUmVjZWl2ZWQgJyArIG4gKyAnLicpO1xuICB9XG4gIHRoaXMuX21heExpc3RlbmVycyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuZnVuY3Rpb24gJGdldE1heExpc3RlbmVycyh0aGF0KSB7XG4gIGlmICh0aGF0Ll9tYXhMaXN0ZW5lcnMgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gIHJldHVybiB0aGF0Ll9tYXhMaXN0ZW5lcnM7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZ2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gZ2V0TWF4TGlzdGVuZXJzKCkge1xuICByZXR1cm4gJGdldE1heExpc3RlbmVycyh0aGlzKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQodHlwZSkge1xuICB2YXIgYXJncyA9IFtdO1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgYXJncy5wdXNoKGFyZ3VtZW50c1tpXSk7XG4gIHZhciBkb0Vycm9yID0gKHR5cGUgPT09ICdlcnJvcicpO1xuXG4gIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gIGlmIChldmVudHMgIT09IHVuZGVmaW5lZClcbiAgICBkb0Vycm9yID0gKGRvRXJyb3IgJiYgZXZlbnRzLmVycm9yID09PSB1bmRlZmluZWQpO1xuICBlbHNlIGlmICghZG9FcnJvcilcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICBpZiAoZG9FcnJvcikge1xuICAgIHZhciBlcjtcbiAgICBpZiAoYXJncy5sZW5ndGggPiAwKVxuICAgICAgZXIgPSBhcmdzWzBdO1xuICAgIGlmIChlciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAvLyBOb3RlOiBUaGUgY29tbWVudHMgb24gdGhlIGB0aHJvd2AgbGluZXMgYXJlIGludGVudGlvbmFsLCB0aGV5IHNob3dcbiAgICAgIC8vIHVwIGluIE5vZGUncyBvdXRwdXQgaWYgdGhpcyByZXN1bHRzIGluIGFuIHVuaGFuZGxlZCBleGNlcHRpb24uXG4gICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICB9XG4gICAgLy8gQXQgbGVhc3QgZ2l2ZSBzb21lIGtpbmQgb2YgY29udGV4dCB0byB0aGUgdXNlclxuICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ1VuaGFuZGxlZCBlcnJvci4nICsgKGVyID8gJyAoJyArIGVyLm1lc3NhZ2UgKyAnKScgOiAnJykpO1xuICAgIGVyci5jb250ZXh0ID0gZXI7XG4gICAgdGhyb3cgZXJyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICB9XG5cbiAgdmFyIGhhbmRsZXIgPSBldmVudHNbdHlwZV07XG5cbiAgaWYgKGhhbmRsZXIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgUmVmbGVjdEFwcGx5KGhhbmRsZXIsIHRoaXMsIGFyZ3MpO1xuICB9IGVsc2Uge1xuICAgIHZhciBsZW4gPSBoYW5kbGVyLmxlbmd0aDtcbiAgICB2YXIgbGlzdGVuZXJzID0gYXJyYXlDbG9uZShoYW5kbGVyLCBsZW4pO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpXG4gICAgICBSZWZsZWN0QXBwbHkobGlzdGVuZXJzW2ldLCB0aGlzLCBhcmdzKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuZnVuY3Rpb24gX2FkZExpc3RlbmVyKHRhcmdldCwgdHlwZSwgbGlzdGVuZXIsIHByZXBlbmQpIHtcbiAgdmFyIG07XG4gIHZhciBldmVudHM7XG4gIHZhciBleGlzdGluZztcblxuICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24uIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBsaXN0ZW5lcik7XG4gIH1cblxuICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcbiAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRhcmdldC5fZXZlbnRzQ291bnQgPSAwO1xuICB9IGVsc2Uge1xuICAgIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gICAgLy8gYWRkaW5nIGl0IHRvIHRoZSBsaXN0ZW5lcnMsIGZpcnN0IGVtaXQgXCJuZXdMaXN0ZW5lclwiLlxuICAgIGlmIChldmVudHMubmV3TGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGFyZ2V0LmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICAgICAgICAgIGxpc3RlbmVyLmxpc3RlbmVyID8gbGlzdGVuZXIubGlzdGVuZXIgOiBsaXN0ZW5lcik7XG5cbiAgICAgIC8vIFJlLWFzc2lnbiBgZXZlbnRzYCBiZWNhdXNlIGEgbmV3TGlzdGVuZXIgaGFuZGxlciBjb3VsZCBoYXZlIGNhdXNlZCB0aGVcbiAgICAgIC8vIHRoaXMuX2V2ZW50cyB0byBiZSBhc3NpZ25lZCB0byBhIG5ldyBvYmplY3RcbiAgICAgIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuICAgIH1cbiAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXTtcbiAgfVxuXG4gIGlmIChleGlzdGluZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXG4gICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgICArK3RhcmdldC5fZXZlbnRzQ291bnQ7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHR5cGVvZiBleGlzdGluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXSA9XG4gICAgICAgIHByZXBlbmQgPyBbbGlzdGVuZXIsIGV4aXN0aW5nXSA6IFtleGlzdGluZywgbGlzdGVuZXJdO1xuICAgICAgLy8gSWYgd2UndmUgYWxyZWFkeSBnb3QgYW4gYXJyYXksIGp1c3QgYXBwZW5kLlxuICAgIH0gZWxzZSBpZiAocHJlcGVuZCkge1xuICAgICAgZXhpc3RpbmcudW5zaGlmdChsaXN0ZW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4aXN0aW5nLnB1c2gobGlzdGVuZXIpO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gICAgbSA9ICRnZXRNYXhMaXN0ZW5lcnModGFyZ2V0KTtcbiAgICBpZiAobSA+IDAgJiYgZXhpc3RpbmcubGVuZ3RoID4gbSAmJiAhZXhpc3Rpbmcud2FybmVkKSB7XG4gICAgICBleGlzdGluZy53YXJuZWQgPSB0cnVlO1xuICAgICAgLy8gTm8gZXJyb3IgY29kZSBmb3IgdGhpcyBzaW5jZSBpdCBpcyBhIFdhcm5pbmdcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuICAgICAgdmFyIHcgPSBuZXcgRXJyb3IoJ1Bvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgbGVhayBkZXRlY3RlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nLmxlbmd0aCArICcgJyArIFN0cmluZyh0eXBlKSArICcgbGlzdGVuZXJzICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnYWRkZWQuIFVzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnaW5jcmVhc2UgbGltaXQnKTtcbiAgICAgIHcubmFtZSA9ICdNYXhMaXN0ZW5lcnNFeGNlZWRlZFdhcm5pbmcnO1xuICAgICAgdy5lbWl0dGVyID0gdGFyZ2V0O1xuICAgICAgdy50eXBlID0gdHlwZTtcbiAgICAgIHcuY291bnQgPSBleGlzdGluZy5sZW5ndGg7XG4gICAgICBQcm9jZXNzRW1pdFdhcm5pbmcodyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uIGFkZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHJldHVybiBfYWRkTGlzdGVuZXIodGhpcywgdHlwZSwgbGlzdGVuZXIsIGZhbHNlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICByZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCB0cnVlKTtcbiAgICB9O1xuXG5mdW5jdGlvbiBvbmNlV3JhcHBlcigpIHtcbiAgdmFyIGFyZ3MgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICBpZiAoIXRoaXMuZmlyZWQpIHtcbiAgICB0aGlzLnRhcmdldC5yZW1vdmVMaXN0ZW5lcih0aGlzLnR5cGUsIHRoaXMud3JhcEZuKTtcbiAgICB0aGlzLmZpcmVkID0gdHJ1ZTtcbiAgICBSZWZsZWN0QXBwbHkodGhpcy5saXN0ZW5lciwgdGhpcy50YXJnZXQsIGFyZ3MpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9vbmNlV3JhcCh0YXJnZXQsIHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBzdGF0ZSA9IHsgZmlyZWQ6IGZhbHNlLCB3cmFwRm46IHVuZGVmaW5lZCwgdGFyZ2V0OiB0YXJnZXQsIHR5cGU6IHR5cGUsIGxpc3RlbmVyOiBsaXN0ZW5lciB9O1xuICB2YXIgd3JhcHBlZCA9IG9uY2VXcmFwcGVyLmJpbmQoc3RhdGUpO1xuICB3cmFwcGVkLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHN0YXRlLndyYXBGbiA9IHdyYXBwZWQ7XG4gIHJldHVybiB3cmFwcGVkO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiBvbmNlKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbi4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGxpc3RlbmVyKTtcbiAgfVxuICB0aGlzLm9uKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZE9uY2VMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZE9uY2VMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbi4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGxpc3RlbmVyKTtcbiAgICAgIH1cbiAgICAgIHRoaXMucHJlcGVuZExpc3RlbmVyKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuLy8gRW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmIGFuZCBvbmx5IGlmIHRoZSBsaXN0ZW5lciB3YXMgcmVtb3ZlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICB2YXIgbGlzdCwgZXZlbnRzLCBwb3NpdGlvbiwgaSwgb3JpZ2luYWxMaXN0ZW5lcjtcblxuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbi4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGxpc3RlbmVyKTtcbiAgICAgIH1cblxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgbGlzdCA9IGV2ZW50c1t0eXBlXTtcbiAgICAgIGlmIChsaXN0ID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHwgbGlzdC5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApXG4gICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3QubGlzdGVuZXIgfHwgbGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBsaXN0ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHBvc2l0aW9uID0gLTE7XG5cbiAgICAgICAgZm9yIChpID0gbGlzdC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fCBsaXN0W2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICAgICAgb3JpZ2luYWxMaXN0ZW5lciA9IGxpc3RbaV0ubGlzdGVuZXI7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocG9zaXRpb24gPCAwKVxuICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIGlmIChwb3NpdGlvbiA9PT0gMClcbiAgICAgICAgICBsaXN0LnNoaWZ0KCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHNwbGljZU9uZShsaXN0LCBwb3NpdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpXG4gICAgICAgICAgZXZlbnRzW3R5cGVdID0gbGlzdFswXTtcblxuICAgICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIG9yaWdpbmFsTGlzdGVuZXIgfHwgbGlzdGVuZXIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9mZiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID1cbiAgICBmdW5jdGlvbiByZW1vdmVBbGxMaXN0ZW5lcnModHlwZSkge1xuICAgICAgdmFyIGxpc3RlbmVycywgZXZlbnRzLCBpO1xuXG4gICAgICBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gICAgICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAvLyBub3QgbGlzdGVuaW5nIGZvciByZW1vdmVMaXN0ZW5lciwgbm8gbmVlZCB0byBlbWl0XG4gICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgICAgICAgfSBlbHNlIGlmIChldmVudHNbdHlwZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGlmICgtLXRoaXMuX2V2ZW50c0NvdW50ID09PSAwKVxuICAgICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBkZWxldGUgZXZlbnRzW3R5cGVdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoZXZlbnRzKTtcbiAgICAgICAgdmFyIGtleTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIGxpc3RlbmVycyA9IGV2ZW50c1t0eXBlXTtcblxuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lcnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnMpO1xuICAgICAgfSBlbHNlIGlmIChsaXN0ZW5lcnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyBMSUZPIG9yZGVyXG4gICAgICAgIGZvciAoaSA9IGxpc3RlbmVycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG5mdW5jdGlvbiBfbGlzdGVuZXJzKHRhcmdldCwgdHlwZSwgdW53cmFwKSB7XG4gIHZhciBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcblxuICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIFtdO1xuXG4gIHZhciBldmxpc3RlbmVyID0gZXZlbnRzW3R5cGVdO1xuICBpZiAoZXZsaXN0ZW5lciA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBbXTtcblxuICBpZiAodHlwZW9mIGV2bGlzdGVuZXIgPT09ICdmdW5jdGlvbicpXG4gICAgcmV0dXJuIHVud3JhcCA/IFtldmxpc3RlbmVyLmxpc3RlbmVyIHx8IGV2bGlzdGVuZXJdIDogW2V2bGlzdGVuZXJdO1xuXG4gIHJldHVybiB1bndyYXAgP1xuICAgIHVud3JhcExpc3RlbmVycyhldmxpc3RlbmVyKSA6IGFycmF5Q2xvbmUoZXZsaXN0ZW5lciwgZXZsaXN0ZW5lci5sZW5ndGgpO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uIGxpc3RlbmVycyh0eXBlKSB7XG4gIHJldHVybiBfbGlzdGVuZXJzKHRoaXMsIHR5cGUsIHRydWUpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yYXdMaXN0ZW5lcnMgPSBmdW5jdGlvbiByYXdMaXN0ZW5lcnModHlwZSkge1xuICByZXR1cm4gX2xpc3RlbmVycyh0aGlzLCB0eXBlLCBmYWxzZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgaWYgKHR5cGVvZiBlbWl0dGVyLmxpc3RlbmVyQ291bnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBsaXN0ZW5lckNvdW50LmNhbGwoZW1pdHRlciwgdHlwZSk7XG4gIH1cbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGxpc3RlbmVyQ291bnQ7XG5mdW5jdGlvbiBsaXN0ZW5lckNvdW50KHR5cGUpIHtcbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcblxuICBpZiAoZXZlbnRzICE9PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgZXZsaXN0ZW5lciA9IGV2ZW50c1t0eXBlXTtcblxuICAgIGlmICh0eXBlb2YgZXZsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfSBlbHNlIGlmIChldmxpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBldmxpc3RlbmVyLmxlbmd0aDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gMDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5ldmVudE5hbWVzID0gZnVuY3Rpb24gZXZlbnROYW1lcygpIHtcbiAgcmV0dXJuIHRoaXMuX2V2ZW50c0NvdW50ID4gMCA/IFJlZmxlY3RPd25LZXlzKHRoaXMuX2V2ZW50cykgOiBbXTtcbn07XG5cbmZ1bmN0aW9uIGFycmF5Q2xvbmUoYXJyLCBuKSB7XG4gIHZhciBjb3B5ID0gbmV3IEFycmF5KG4pO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG47ICsraSlcbiAgICBjb3B5W2ldID0gYXJyW2ldO1xuICByZXR1cm4gY29weTtcbn1cblxuZnVuY3Rpb24gc3BsaWNlT25lKGxpc3QsIGluZGV4KSB7XG4gIGZvciAoOyBpbmRleCArIDEgPCBsaXN0Lmxlbmd0aDsgaW5kZXgrKylcbiAgICBsaXN0W2luZGV4XSA9IGxpc3RbaW5kZXggKyAxXTtcbiAgbGlzdC5wb3AoKTtcbn1cblxuZnVuY3Rpb24gdW53cmFwTGlzdGVuZXJzKGFycikge1xuICB2YXIgcmV0ID0gbmV3IEFycmF5KGFyci5sZW5ndGgpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHJldC5sZW5ndGg7ICsraSkge1xuICAgIHJldFtpXSA9IGFycltpXS5saXN0ZW5lciB8fCBhcnJbaV07XG4gIH1cbiAgcmV0dXJuIHJldDtcbn1cbiIsImV4cG9ydHMucmVhZCA9IGZ1bmN0aW9uIChidWZmZXIsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtXG4gIHZhciBlTGVuID0gKG5CeXRlcyAqIDgpIC0gbUxlbiAtIDFcbiAgdmFyIGVNYXggPSAoMSA8PCBlTGVuKSAtIDFcbiAgdmFyIGVCaWFzID0gZU1heCA+PiAxXG4gIHZhciBuQml0cyA9IC03XG4gIHZhciBpID0gaXNMRSA/IChuQnl0ZXMgLSAxKSA6IDBcbiAgdmFyIGQgPSBpc0xFID8gLTEgOiAxXG4gIHZhciBzID0gYnVmZmVyW29mZnNldCArIGldXG5cbiAgaSArPSBkXG5cbiAgZSA9IHMgJiAoKDEgPDwgKC1uQml0cykpIC0gMSlcbiAgcyA+Pj0gKC1uQml0cylcbiAgbkJpdHMgKz0gZUxlblxuICBmb3IgKDsgbkJpdHMgPiAwOyBlID0gKGUgKiAyNTYpICsgYnVmZmVyW29mZnNldCArIGldLCBpICs9IGQsIG5CaXRzIC09IDgpIHt9XG5cbiAgbSA9IGUgJiAoKDEgPDwgKC1uQml0cykpIC0gMSlcbiAgZSA+Pj0gKC1uQml0cylcbiAgbkJpdHMgKz0gbUxlblxuICBmb3IgKDsgbkJpdHMgPiAwOyBtID0gKG0gKiAyNTYpICsgYnVmZmVyW29mZnNldCArIGldLCBpICs9IGQsIG5CaXRzIC09IDgpIHt9XG5cbiAgaWYgKGUgPT09IDApIHtcbiAgICBlID0gMSAtIGVCaWFzXG4gIH0gZWxzZSBpZiAoZSA9PT0gZU1heCkge1xuICAgIHJldHVybiBtID8gTmFOIDogKChzID8gLTEgOiAxKSAqIEluZmluaXR5KVxuICB9IGVsc2Uge1xuICAgIG0gPSBtICsgTWF0aC5wb3coMiwgbUxlbilcbiAgICBlID0gZSAtIGVCaWFzXG4gIH1cbiAgcmV0dXJuIChzID8gLTEgOiAxKSAqIG0gKiBNYXRoLnBvdygyLCBlIC0gbUxlbilcbn1cblxuZXhwb3J0cy53cml0ZSA9IGZ1bmN0aW9uIChidWZmZXIsIHZhbHVlLCBvZmZzZXQsIGlzTEUsIG1MZW4sIG5CeXRlcykge1xuICB2YXIgZSwgbSwgY1xuICB2YXIgZUxlbiA9IChuQnl0ZXMgKiA4KSAtIG1MZW4gLSAxXG4gIHZhciBlTWF4ID0gKDEgPDwgZUxlbikgLSAxXG4gIHZhciBlQmlhcyA9IGVNYXggPj4gMVxuICB2YXIgcnQgPSAobUxlbiA9PT0gMjMgPyBNYXRoLnBvdygyLCAtMjQpIC0gTWF0aC5wb3coMiwgLTc3KSA6IDApXG4gIHZhciBpID0gaXNMRSA/IDAgOiAobkJ5dGVzIC0gMSlcbiAgdmFyIGQgPSBpc0xFID8gMSA6IC0xXG4gIHZhciBzID0gdmFsdWUgPCAwIHx8ICh2YWx1ZSA9PT0gMCAmJiAxIC8gdmFsdWUgPCAwKSA/IDEgOiAwXG5cbiAgdmFsdWUgPSBNYXRoLmFicyh2YWx1ZSlcblxuICBpZiAoaXNOYU4odmFsdWUpIHx8IHZhbHVlID09PSBJbmZpbml0eSkge1xuICAgIG0gPSBpc05hTih2YWx1ZSkgPyAxIDogMFxuICAgIGUgPSBlTWF4XG4gIH0gZWxzZSB7XG4gICAgZSA9IE1hdGguZmxvb3IoTWF0aC5sb2codmFsdWUpIC8gTWF0aC5MTjIpXG4gICAgaWYgKHZhbHVlICogKGMgPSBNYXRoLnBvdygyLCAtZSkpIDwgMSkge1xuICAgICAgZS0tXG4gICAgICBjICo9IDJcbiAgICB9XG4gICAgaWYgKGUgKyBlQmlhcyA+PSAxKSB7XG4gICAgICB2YWx1ZSArPSBydCAvIGNcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgKz0gcnQgKiBNYXRoLnBvdygyLCAxIC0gZUJpYXMpXG4gICAgfVxuICAgIGlmICh2YWx1ZSAqIGMgPj0gMikge1xuICAgICAgZSsrXG4gICAgICBjIC89IDJcbiAgICB9XG5cbiAgICBpZiAoZSArIGVCaWFzID49IGVNYXgpIHtcbiAgICAgIG0gPSAwXG4gICAgICBlID0gZU1heFxuICAgIH0gZWxzZSBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIG0gPSAoKHZhbHVlICogYykgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pXG4gICAgICBlID0gZSArIGVCaWFzXG4gICAgfSBlbHNlIHtcbiAgICAgIG0gPSB2YWx1ZSAqIE1hdGgucG93KDIsIGVCaWFzIC0gMSkgKiBNYXRoLnBvdygyLCBtTGVuKVxuICAgICAgZSA9IDBcbiAgICB9XG4gIH1cblxuICBmb3IgKDsgbUxlbiA+PSA4OyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBtICYgMHhmZiwgaSArPSBkLCBtIC89IDI1NiwgbUxlbiAtPSA4KSB7fVxuXG4gIGUgPSAoZSA8PCBtTGVuKSB8IG1cbiAgZUxlbiArPSBtTGVuXG4gIGZvciAoOyBlTGVuID4gMDsgYnVmZmVyW29mZnNldCArIGldID0gZSAmIDB4ZmYsIGkgKz0gZCwgZSAvPSAyNTYsIGVMZW4gLT0gOCkge31cblxuICBidWZmZXJbb2Zmc2V0ICsgaSAtIGRdIHw9IHMgKiAxMjhcbn1cbiIsImlmICh0eXBlb2YgT2JqZWN0LmNyZWF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAvLyBpbXBsZW1lbnRhdGlvbiBmcm9tIHN0YW5kYXJkIG5vZGUuanMgJ3V0aWwnIG1vZHVsZVxuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluaGVyaXRzKGN0b3IsIHN1cGVyQ3Rvcikge1xuICAgIGlmIChzdXBlckN0b3IpIHtcbiAgICAgIGN0b3Iuc3VwZXJfID0gc3VwZXJDdG9yXG4gICAgICBjdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDdG9yLnByb3RvdHlwZSwge1xuICAgICAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgICAgIHZhbHVlOiBjdG9yLFxuICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfTtcbn0gZWxzZSB7XG4gIC8vIG9sZCBzY2hvb2wgc2hpbSBmb3Igb2xkIGJyb3dzZXJzXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW5oZXJpdHMoY3Rvciwgc3VwZXJDdG9yKSB7XG4gICAgaWYgKHN1cGVyQ3Rvcikge1xuICAgICAgY3Rvci5zdXBlcl8gPSBzdXBlckN0b3JcbiAgICAgIHZhciBUZW1wQ3RvciA9IGZ1bmN0aW9uICgpIHt9XG4gICAgICBUZW1wQ3Rvci5wcm90b3R5cGUgPSBzdXBlckN0b3IucHJvdG90eXBlXG4gICAgICBjdG9yLnByb3RvdHlwZSA9IG5ldyBUZW1wQ3RvcigpXG4gICAgICBjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGN0b3JcbiAgICB9XG4gIH1cbn1cbiIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKGFycikge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChhcnIpID09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuIiwiIWZ1bmN0aW9uKGUpe2lmKFwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzKW1vZHVsZS5leHBvcnRzPWUoKTtlbHNlIGlmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZClkZWZpbmUoZSk7ZWxzZXt2YXIgdDtcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3Q9d2luZG93OlwidW5kZWZpbmVkXCIhPXR5cGVvZiBnbG9iYWw/dD1nbG9iYWw6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGYmJih0PXNlbGYpLHQub2JqZWN0SGFzaD1lKCl9fShmdW5jdGlvbigpe3JldHVybiBmdW5jdGlvbiBvKGksdSxhKXtmdW5jdGlvbiBmKG4sZSl7aWYoIXVbbl0pe2lmKCFpW25dKXt2YXIgdD1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFlJiZ0KXJldHVybiB0KG4sITApO2lmKHMpcmV0dXJuIHMobiwhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIituK1wiJ1wiKX12YXIgcj11W25dPXtleHBvcnRzOnt9fTtpW25dWzBdLmNhbGwoci5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciB0PWlbbl1bMV1bZV07cmV0dXJuIGYodHx8ZSl9LHIsci5leHBvcnRzLG8saSx1LGEpfXJldHVybiB1W25dLmV4cG9ydHN9Zm9yKHZhciBzPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsZT0wO2U8YS5sZW5ndGg7ZSsrKWYoYVtlXSk7cmV0dXJuIGZ9KHsxOltmdW5jdGlvbih3LGIsbSl7KGZ1bmN0aW9uKGUsdCxzLG4scixvLGksdSxhKXtcInVzZSBzdHJpY3RcIjt2YXIgZj13KFwiY3J5cHRvXCIpO2Z1bmN0aW9uIGMoZSx0KXtyZXR1cm4gZnVuY3Rpb24oZSx0KXt2YXIgbjtuPVwicGFzc3Rocm91Z2hcIiE9PXQuYWxnb3JpdGhtP2YuY3JlYXRlSGFzaCh0LmFsZ29yaXRobSk6bmV3IHk7dm9pZCAwPT09bi53cml0ZSYmKG4ud3JpdGU9bi51cGRhdGUsbi5lbmQ9bi51cGRhdGUpO2codCxuKS5kaXNwYXRjaChlKSxuLnVwZGF0ZXx8bi5lbmQoXCJcIik7aWYobi5kaWdlc3QpcmV0dXJuIG4uZGlnZXN0KFwiYnVmZmVyXCI9PT10LmVuY29kaW5nP3ZvaWQgMDp0LmVuY29kaW5nKTt2YXIgcj1uLnJlYWQoKTtyZXR1cm5cImJ1ZmZlclwiIT09dC5lbmNvZGluZz9yLnRvU3RyaW5nKHQuZW5jb2RpbmcpOnJ9KGUsdD1oKGUsdCkpfShtPWIuZXhwb3J0cz1jKS5zaGExPWZ1bmN0aW9uKGUpe3JldHVybiBjKGUpfSxtLmtleXM9ZnVuY3Rpb24oZSl7cmV0dXJuIGMoZSx7ZXhjbHVkZVZhbHVlczohMCxhbGdvcml0aG06XCJzaGExXCIsZW5jb2Rpbmc6XCJoZXhcIn0pfSxtLk1ENT1mdW5jdGlvbihlKXtyZXR1cm4gYyhlLHthbGdvcml0aG06XCJtZDVcIixlbmNvZGluZzpcImhleFwifSl9LG0ua2V5c01ENT1mdW5jdGlvbihlKXtyZXR1cm4gYyhlLHthbGdvcml0aG06XCJtZDVcIixlbmNvZGluZzpcImhleFwiLGV4Y2x1ZGVWYWx1ZXM6ITB9KX07dmFyIGw9Zi5nZXRIYXNoZXM/Zi5nZXRIYXNoZXMoKS5zbGljZSgpOltcInNoYTFcIixcIm1kNVwiXTtsLnB1c2goXCJwYXNzdGhyb3VnaFwiKTt2YXIgZD1bXCJidWZmZXJcIixcImhleFwiLFwiYmluYXJ5XCIsXCJiYXNlNjRcIl07ZnVuY3Rpb24gaChlLHQpe3Q9dHx8e307dmFyIG49e307aWYobi5hbGdvcml0aG09dC5hbGdvcml0aG18fFwic2hhMVwiLG4uZW5jb2Rpbmc9dC5lbmNvZGluZ3x8XCJoZXhcIixuLmV4Y2x1ZGVWYWx1ZXM9ISF0LmV4Y2x1ZGVWYWx1ZXMsbi5hbGdvcml0aG09bi5hbGdvcml0aG0udG9Mb3dlckNhc2UoKSxuLmVuY29kaW5nPW4uZW5jb2RpbmcudG9Mb3dlckNhc2UoKSxuLmlnbm9yZVVua25vd249ITA9PT10Lmlnbm9yZVVua25vd24sbi5yZXNwZWN0VHlwZT0hMSE9PXQucmVzcGVjdFR5cGUsbi5yZXNwZWN0RnVuY3Rpb25OYW1lcz0hMSE9PXQucmVzcGVjdEZ1bmN0aW9uTmFtZXMsbi5yZXNwZWN0RnVuY3Rpb25Qcm9wZXJ0aWVzPSExIT09dC5yZXNwZWN0RnVuY3Rpb25Qcm9wZXJ0aWVzLG4udW5vcmRlcmVkQXJyYXlzPSEwPT09dC51bm9yZGVyZWRBcnJheXMsbi51bm9yZGVyZWRTZXRzPSExIT09dC51bm9yZGVyZWRTZXRzLG4udW5vcmRlcmVkT2JqZWN0cz0hMSE9PXQudW5vcmRlcmVkT2JqZWN0cyxuLnJlcGxhY2VyPXQucmVwbGFjZXJ8fHZvaWQgMCxuLmV4Y2x1ZGVLZXlzPXQuZXhjbHVkZUtleXN8fHZvaWQgMCx2b2lkIDA9PT1lKXRocm93IG5ldyBFcnJvcihcIk9iamVjdCBhcmd1bWVudCByZXF1aXJlZC5cIik7Zm9yKHZhciByPTA7cjxsLmxlbmd0aDsrK3IpbFtyXS50b0xvd2VyQ2FzZSgpPT09bi5hbGdvcml0aG0udG9Mb3dlckNhc2UoKSYmKG4uYWxnb3JpdGhtPWxbcl0pO2lmKC0xPT09bC5pbmRleE9mKG4uYWxnb3JpdGhtKSl0aHJvdyBuZXcgRXJyb3IoJ0FsZ29yaXRobSBcIicrbi5hbGdvcml0aG0rJ1wiICBub3Qgc3VwcG9ydGVkLiBzdXBwb3J0ZWQgdmFsdWVzOiAnK2wuam9pbihcIiwgXCIpKTtpZigtMT09PWQuaW5kZXhPZihuLmVuY29kaW5nKSYmXCJwYXNzdGhyb3VnaFwiIT09bi5hbGdvcml0aG0pdGhyb3cgbmV3IEVycm9yKCdFbmNvZGluZyBcIicrbi5lbmNvZGluZysnXCIgIG5vdCBzdXBwb3J0ZWQuIHN1cHBvcnRlZCB2YWx1ZXM6ICcrZC5qb2luKFwiLCBcIikpO3JldHVybiBufWZ1bmN0aW9uIHAoZSl7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgZSlyZXR1cm4hMTtyZXR1cm4gbnVsbCE9L15mdW5jdGlvblxccytcXHcqXFxzKlxcKFxccypcXClcXHMqe1xccytcXFtuYXRpdmUgY29kZVxcXVxccyt9JC9pLmV4ZWMoRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZSkpfWZ1bmN0aW9uIGcodSx0LGEpe2E9YXx8W107ZnVuY3Rpb24gZihlKXtyZXR1cm4gdC51cGRhdGU/dC51cGRhdGUoZSxcInV0ZjhcIik6dC53cml0ZShlLFwidXRmOFwiKX1yZXR1cm57ZGlzcGF0Y2g6ZnVuY3Rpb24oZSl7dS5yZXBsYWNlciYmKGU9dS5yZXBsYWNlcihlKSk7dmFyIHQ9dHlwZW9mIGU7cmV0dXJuIG51bGw9PT1lJiYodD1cIm51bGxcIiksdGhpc1tcIl9cIit0XShlKX0sX29iamVjdDpmdW5jdGlvbih0KXt2YXIgZT1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodCksbj0vXFxbb2JqZWN0ICguKilcXF0vaS5leGVjKGUpO249KG49bj9uWzFdOlwidW5rbm93bjpbXCIrZStcIl1cIikudG9Mb3dlckNhc2UoKTt2YXIgcjtpZigwPD0ocj1hLmluZGV4T2YodCkpKXJldHVybiB0aGlzLmRpc3BhdGNoKFwiW0NJUkNVTEFSOlwiK3IrXCJdXCIpO2lmKGEucHVzaCh0KSx2b2lkIDAhPT1zJiZzLmlzQnVmZmVyJiZzLmlzQnVmZmVyKHQpKXJldHVybiBmKFwiYnVmZmVyOlwiKSxmKHQpO2lmKFwib2JqZWN0XCI9PT1ufHxcImZ1bmN0aW9uXCI9PT1uKXt2YXIgbz1PYmplY3Qua2V5cyh0KTt1LnVub3JkZXJlZE9iamVjdHMmJihvPW8uc29ydCgpKSwhMT09PXUucmVzcGVjdFR5cGV8fHAodCl8fG8uc3BsaWNlKDAsMCxcInByb3RvdHlwZVwiLFwiX19wcm90b19fXCIsXCJjb25zdHJ1Y3RvclwiKSx1LmV4Y2x1ZGVLZXlzJiYobz1vLmZpbHRlcihmdW5jdGlvbihlKXtyZXR1cm4hdS5leGNsdWRlS2V5cyhlKX0pKSxmKFwib2JqZWN0OlwiK28ubGVuZ3RoK1wiOlwiKTt2YXIgaT10aGlzO3JldHVybiBvLmZvckVhY2goZnVuY3Rpb24oZSl7aS5kaXNwYXRjaChlKSxmKFwiOlwiKSx1LmV4Y2x1ZGVWYWx1ZXN8fGkuZGlzcGF0Y2godFtlXSksZihcIixcIil9KX1pZighdGhpc1tcIl9cIituXSl7aWYodS5pZ25vcmVVbmtub3duKXJldHVybiBmKFwiW1wiK24rXCJdXCIpO3Rocm93IG5ldyBFcnJvcignVW5rbm93biBvYmplY3QgdHlwZSBcIicrbisnXCInKX10aGlzW1wiX1wiK25dKHQpfSxfYXJyYXk6ZnVuY3Rpb24oZSx0KXt0PXZvaWQgMCE9PXQ/dDohMSE9PXUudW5vcmRlcmVkQXJyYXlzO3ZhciBuPXRoaXM7aWYoZihcImFycmF5OlwiK2UubGVuZ3RoK1wiOlwiKSwhdHx8ZS5sZW5ndGg8PTEpcmV0dXJuIGUuZm9yRWFjaChmdW5jdGlvbihlKXtyZXR1cm4gbi5kaXNwYXRjaChlKX0pO3ZhciByPVtdLG89ZS5tYXAoZnVuY3Rpb24oZSl7dmFyIHQ9bmV3IHksbj1hLnNsaWNlKCk7cmV0dXJuIGcodSx0LG4pLmRpc3BhdGNoKGUpLHI9ci5jb25jYXQobi5zbGljZShhLmxlbmd0aCkpLHQucmVhZCgpLnRvU3RyaW5nKCl9KTtyZXR1cm4gYT1hLmNvbmNhdChyKSxvLnNvcnQoKSx0aGlzLl9hcnJheShvLCExKX0sX2RhdGU6ZnVuY3Rpb24oZSl7cmV0dXJuIGYoXCJkYXRlOlwiK2UudG9KU09OKCkpfSxfc3ltYm9sOmZ1bmN0aW9uKGUpe3JldHVybiBmKFwic3ltYm9sOlwiK2UudG9TdHJpbmcoKSl9LF9lcnJvcjpmdW5jdGlvbihlKXtyZXR1cm4gZihcImVycm9yOlwiK2UudG9TdHJpbmcoKSl9LF9ib29sZWFuOmZ1bmN0aW9uKGUpe3JldHVybiBmKFwiYm9vbDpcIitlLnRvU3RyaW5nKCkpfSxfc3RyaW5nOmZ1bmN0aW9uKGUpe2YoXCJzdHJpbmc6XCIrZS5sZW5ndGgrXCI6XCIpLGYoZS50b1N0cmluZygpKX0sX2Z1bmN0aW9uOmZ1bmN0aW9uKGUpe2YoXCJmbjpcIikscChlKT90aGlzLmRpc3BhdGNoKFwiW25hdGl2ZV1cIik6dGhpcy5kaXNwYXRjaChlLnRvU3RyaW5nKCkpLCExIT09dS5yZXNwZWN0RnVuY3Rpb25OYW1lcyYmdGhpcy5kaXNwYXRjaChcImZ1bmN0aW9uLW5hbWU6XCIrU3RyaW5nKGUubmFtZSkpLHUucmVzcGVjdEZ1bmN0aW9uUHJvcGVydGllcyYmdGhpcy5fb2JqZWN0KGUpfSxfbnVtYmVyOmZ1bmN0aW9uKGUpe3JldHVybiBmKFwibnVtYmVyOlwiK2UudG9TdHJpbmcoKSl9LF94bWw6ZnVuY3Rpb24oZSl7cmV0dXJuIGYoXCJ4bWw6XCIrZS50b1N0cmluZygpKX0sX251bGw6ZnVuY3Rpb24oKXtyZXR1cm4gZihcIk51bGxcIil9LF91bmRlZmluZWQ6ZnVuY3Rpb24oKXtyZXR1cm4gZihcIlVuZGVmaW5lZFwiKX0sX3JlZ2V4cDpmdW5jdGlvbihlKXtyZXR1cm4gZihcInJlZ2V4OlwiK2UudG9TdHJpbmcoKSl9LF91aW50OGFycmF5OmZ1bmN0aW9uKGUpe3JldHVybiBmKFwidWludDhhcnJheTpcIiksdGhpcy5kaXNwYXRjaChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlKSl9LF91aW50OGNsYW1wZWRhcnJheTpmdW5jdGlvbihlKXtyZXR1cm4gZihcInVpbnQ4Y2xhbXBlZGFycmF5OlwiKSx0aGlzLmRpc3BhdGNoKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGUpKX0sX2ludDhhcnJheTpmdW5jdGlvbihlKXtyZXR1cm4gZihcInVpbnQ4YXJyYXk6XCIpLHRoaXMuZGlzcGF0Y2goQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZSkpfSxfdWludDE2YXJyYXk6ZnVuY3Rpb24oZSl7cmV0dXJuIGYoXCJ1aW50MTZhcnJheTpcIiksdGhpcy5kaXNwYXRjaChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlKSl9LF9pbnQxNmFycmF5OmZ1bmN0aW9uKGUpe3JldHVybiBmKFwidWludDE2YXJyYXk6XCIpLHRoaXMuZGlzcGF0Y2goQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZSkpfSxfdWludDMyYXJyYXk6ZnVuY3Rpb24oZSl7cmV0dXJuIGYoXCJ1aW50MzJhcnJheTpcIiksdGhpcy5kaXNwYXRjaChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlKSl9LF9pbnQzMmFycmF5OmZ1bmN0aW9uKGUpe3JldHVybiBmKFwidWludDMyYXJyYXk6XCIpLHRoaXMuZGlzcGF0Y2goQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZSkpfSxfZmxvYXQzMmFycmF5OmZ1bmN0aW9uKGUpe3JldHVybiBmKFwiZmxvYXQzMmFycmF5OlwiKSx0aGlzLmRpc3BhdGNoKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGUpKX0sX2Zsb2F0NjRhcnJheTpmdW5jdGlvbihlKXtyZXR1cm4gZihcImZsb2F0NjRhcnJheTpcIiksdGhpcy5kaXNwYXRjaChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlKSl9LF9hcnJheWJ1ZmZlcjpmdW5jdGlvbihlKXtyZXR1cm4gZihcImFycmF5YnVmZmVyOlwiKSx0aGlzLmRpc3BhdGNoKG5ldyBVaW50OEFycmF5KGUpKX0sX3VybDpmdW5jdGlvbihlKXtyZXR1cm4gZihcInVybDpcIitlLnRvU3RyaW5nKCkpfSxfbWFwOmZ1bmN0aW9uKGUpe2YoXCJtYXA6XCIpO3ZhciB0PUFycmF5LmZyb20oZSk7cmV0dXJuIHRoaXMuX2FycmF5KHQsITEhPT11LnVub3JkZXJlZFNldHMpfSxfc2V0OmZ1bmN0aW9uKGUpe2YoXCJzZXQ6XCIpO3ZhciB0PUFycmF5LmZyb20oZSk7cmV0dXJuIHRoaXMuX2FycmF5KHQsITEhPT11LnVub3JkZXJlZFNldHMpfSxfYmxvYjpmdW5jdGlvbigpe2lmKHUuaWdub3JlVW5rbm93bilyZXR1cm4gZihcIltibG9iXVwiKTt0aHJvdyBFcnJvcignSGFzaGluZyBCbG9iIG9iamVjdHMgaXMgY3VycmVudGx5IG5vdCBzdXBwb3J0ZWRcXG4oc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9wdWxlb3Mvb2JqZWN0LWhhc2gvaXNzdWVzLzI2KVxcblVzZSBcIm9wdGlvbnMucmVwbGFjZXJcIiBvciBcIm9wdGlvbnMuaWdub3JlVW5rbm93blwiXFxuJyl9LF9kb213aW5kb3c6ZnVuY3Rpb24oKXtyZXR1cm4gZihcImRvbXdpbmRvd1wiKX0sX3Byb2Nlc3M6ZnVuY3Rpb24oKXtyZXR1cm4gZihcInByb2Nlc3NcIil9LF90aW1lcjpmdW5jdGlvbigpe3JldHVybiBmKFwidGltZXJcIil9LF9waXBlOmZ1bmN0aW9uKCl7cmV0dXJuIGYoXCJwaXBlXCIpfSxfdGNwOmZ1bmN0aW9uKCl7cmV0dXJuIGYoXCJ0Y3BcIil9LF91ZHA6ZnVuY3Rpb24oKXtyZXR1cm4gZihcInVkcFwiKX0sX3R0eTpmdW5jdGlvbigpe3JldHVybiBmKFwidHR5XCIpfSxfc3RhdHdhdGNoZXI6ZnVuY3Rpb24oKXtyZXR1cm4gZihcInN0YXR3YXRjaGVyXCIpfSxfc2VjdXJlY29udGV4dDpmdW5jdGlvbigpe3JldHVybiBmKFwic2VjdXJlY29udGV4dFwiKX0sX2Nvbm5lY3Rpb246ZnVuY3Rpb24oKXtyZXR1cm4gZihcImNvbm5lY3Rpb25cIil9LF96bGliOmZ1bmN0aW9uKCl7cmV0dXJuIGYoXCJ6bGliXCIpfSxfY29udGV4dDpmdW5jdGlvbigpe3JldHVybiBmKFwiY29udGV4dFwiKX0sX25vZGVzY3JpcHQ6ZnVuY3Rpb24oKXtyZXR1cm4gZihcIm5vZGVzY3JpcHRcIil9LF9odHRwcGFyc2VyOmZ1bmN0aW9uKCl7cmV0dXJuIGYoXCJodHRwcGFyc2VyXCIpfSxfZGF0YXZpZXc6ZnVuY3Rpb24oKXtyZXR1cm4gZihcImRhdGF2aWV3XCIpfSxfc2lnbmFsOmZ1bmN0aW9uKCl7cmV0dXJuIGYoXCJzaWduYWxcIil9LF9mc2V2ZW50OmZ1bmN0aW9uKCl7cmV0dXJuIGYoXCJmc2V2ZW50XCIpfSxfdGxzd3JhcDpmdW5jdGlvbigpe3JldHVybiBmKFwidGxzd3JhcFwiKX19fWZ1bmN0aW9uIHkoKXtyZXR1cm57YnVmOlwiXCIsd3JpdGU6ZnVuY3Rpb24oZSl7dGhpcy5idWYrPWV9LGVuZDpmdW5jdGlvbihlKXt0aGlzLmJ1Zis9ZX0scmVhZDpmdW5jdGlvbigpe3JldHVybiB0aGlzLmJ1Zn19fW0ud3JpdGVUb1N0cmVhbT1mdW5jdGlvbihlLHQsbil7cmV0dXJuIHZvaWQgMD09PW4mJihuPXQsdD17fSksZyh0PWgoZSx0KSxuKS5kaXNwYXRjaChlKX19KS5jYWxsKHRoaXMsdyhcImxZcG9JMlwiKSxcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93Ont9LHcoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9mYWtlXzhmYzk0ZTdiLmpzXCIsXCIvXCIpfSx7YnVmZmVyOjMsY3J5cHRvOjUsbFlwb0kyOjEwfV0sMjpbZnVuY3Rpb24oZSx0LHMpeyhmdW5jdGlvbihlLHQsbixyLG8saSx1LGEsZil7IWZ1bmN0aW9uKGUpe1widXNlIHN0cmljdFwiO3ZhciBzPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBVaW50OEFycmF5P1VpbnQ4QXJyYXk6QXJyYXksbj1cIitcIi5jaGFyQ29kZUF0KDApLHI9XCIvXCIuY2hhckNvZGVBdCgwKSxvPVwiMFwiLmNoYXJDb2RlQXQoMCksaT1cImFcIi5jaGFyQ29kZUF0KDApLHU9XCJBXCIuY2hhckNvZGVBdCgwKSxhPVwiLVwiLmNoYXJDb2RlQXQoMCksZj1cIl9cIi5jaGFyQ29kZUF0KDApO2Z1bmN0aW9uIGMoZSl7dmFyIHQ9ZS5jaGFyQ29kZUF0KDApO3JldHVybiB0PT09bnx8dD09PWE/NjI6dD09PXJ8fHQ9PT1mPzYzOnQ8bz8tMTp0PG8rMTA/dC1vKzI2KzI2OnQ8dSsyNj90LXU6dDxpKzI2P3QtaSsyNjp2b2lkIDB9ZS50b0J5dGVBcnJheT1mdW5jdGlvbihlKXt2YXIgdCxuLHIsbyxpO2lmKDA8ZS5sZW5ndGglNCl0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHN0cmluZy4gTGVuZ3RoIG11c3QgYmUgYSBtdWx0aXBsZSBvZiA0XCIpO3ZhciB1PWUubGVuZ3RoO289XCI9XCI9PT1lLmNoYXJBdCh1LTIpPzI6XCI9XCI9PT1lLmNoYXJBdCh1LTEpPzE6MCxpPW5ldyBzKDMqZS5sZW5ndGgvNC1vKSxuPTA8bz9lLmxlbmd0aC00OmUubGVuZ3RoO3ZhciBhPTA7ZnVuY3Rpb24gZihlKXtpW2ErK109ZX1mb3IodD0wO3Q8bjt0Kz00LDMpZigoMTY3MTE2ODAmKHI9YyhlLmNoYXJBdCh0KSk8PDE4fGMoZS5jaGFyQXQodCsxKSk8PDEyfGMoZS5jaGFyQXQodCsyKSk8PDZ8YyhlLmNoYXJBdCh0KzMpKSkpPj4xNiksZigoNjUyODAmcik+PjgpLGYoMjU1JnIpO3JldHVybiAyPT1vP2YoMjU1JihyPWMoZS5jaGFyQXQodCkpPDwyfGMoZS5jaGFyQXQodCsxKSk+PjQpKToxPT1vJiYoZigocj1jKGUuY2hhckF0KHQpKTw8MTB8YyhlLmNoYXJBdCh0KzEpKTw8NHxjKGUuY2hhckF0KHQrMikpPj4yKT4+OCYyNTUpLGYoMjU1JnIpKSxpfSxlLmZyb21CeXRlQXJyYXk9ZnVuY3Rpb24oZSl7dmFyIHQsbixyLG8saT1lLmxlbmd0aCUzLHU9XCJcIjtmdW5jdGlvbiBhKGUpe3JldHVyblwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrL1wiLmNoYXJBdChlKX1mb3IodD0wLHI9ZS5sZW5ndGgtaTt0PHI7dCs9MyluPShlW3RdPDwxNikrKGVbdCsxXTw8OCkrZVt0KzJdLHUrPWEoKG89bik+PjE4JjYzKSthKG8+PjEyJjYzKSthKG8+PjYmNjMpK2EoNjMmbyk7c3dpdGNoKGkpe2Nhc2UgMTp1Kz1hKChuPWVbZS5sZW5ndGgtMV0pPj4yKSx1Kz1hKG48PDQmNjMpLHUrPVwiPT1cIjticmVhaztjYXNlIDI6dSs9YSgobj0oZVtlLmxlbmd0aC0yXTw8OCkrZVtlLmxlbmd0aC0xXSk+PjEwKSx1Kz1hKG4+PjQmNjMpLHUrPWEobjw8MiY2MyksdSs9XCI9XCJ9cmV0dXJuIHV9fSh2b2lkIDA9PT1zP3RoaXMuYmFzZTY0anM9e306cyl9KS5jYWxsKHRoaXMsZShcImxZcG9JMlwiKSxcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93Ont9LGUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9iYXNlNjQtanMvbGliL2I2NC5qc1wiLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jhc2U2NC1qcy9saWJcIil9LHtidWZmZXI6MyxsWXBvSTI6MTB9XSwzOltmdW5jdGlvbihELGUsTyl7KGZ1bmN0aW9uKGUsdCxmLG4scixvLGksdSxhKXt2YXIgcz1EKFwiYmFzZTY0LWpzXCIpLGM9RChcImllZWU3NTRcIik7ZnVuY3Rpb24gZihlLHQsbil7aWYoISh0aGlzIGluc3RhbmNlb2YgZikpcmV0dXJuIG5ldyBmKGUsdCxuKTt2YXIgcixvLGksdT10eXBlb2YgZTtpZihcImJhc2U2NFwiPT09dCYmXCJzdHJpbmdcIj09dSlmb3IoZT1mdW5jdGlvbihlKXtyZXR1cm4gZS50cmltP2UudHJpbSgpOmUucmVwbGFjZSgvXlxccyt8XFxzKyQvZyxcIlwiKX0oZSk7ZS5sZW5ndGglNCE9MDspZSs9XCI9XCI7aWYoXCJudW1iZXJcIj09dSlyPVUoZSk7ZWxzZSBpZihcInN0cmluZ1wiPT11KXI9Zi5ieXRlTGVuZ3RoKGUsdCk7ZWxzZXtpZihcIm9iamVjdFwiIT11KXRocm93IG5ldyBFcnJvcihcIkZpcnN0IGFyZ3VtZW50IG5lZWRzIHRvIGJlIGEgbnVtYmVyLCBhcnJheSBvciBzdHJpbmcuXCIpO3I9VShlLmxlbmd0aCl9aWYoZi5fdXNlVHlwZWRBcnJheXM/bz1mLl9hdWdtZW50KG5ldyBVaW50OEFycmF5KHIpKTooKG89dGhpcykubGVuZ3RoPXIsby5faXNCdWZmZXI9ITApLGYuX3VzZVR5cGVkQXJyYXlzJiZcIm51bWJlclwiPT10eXBlb2YgZS5ieXRlTGVuZ3RoKW8uX3NldChlKTtlbHNlIGlmKGZ1bmN0aW9uKGUpe3JldHVybiB4KGUpfHxmLmlzQnVmZmVyKGUpfHxlJiZcIm9iamVjdFwiPT10eXBlb2YgZSYmXCJudW1iZXJcIj09dHlwZW9mIGUubGVuZ3RofShlKSlmb3IoaT0wO2k8cjtpKyspZi5pc0J1ZmZlcihlKT9vW2ldPWUucmVhZFVJbnQ4KGkpOm9baV09ZVtpXTtlbHNlIGlmKFwic3RyaW5nXCI9PXUpby53cml0ZShlLDAsdCk7ZWxzZSBpZihcIm51bWJlclwiPT11JiYhZi5fdXNlVHlwZWRBcnJheXMmJiFuKWZvcihpPTA7aTxyO2krKylvW2ldPTA7cmV0dXJuIG99ZnVuY3Rpb24gbChlLHQsbixyKXtyZXR1cm4gZi5fY2hhcnNXcml0dGVuPWsoZnVuY3Rpb24oZSl7Zm9yKHZhciB0PVtdLG49MDtuPGUubGVuZ3RoO24rKyl0LnB1c2goMjU1JmUuY2hhckNvZGVBdChuKSk7cmV0dXJuIHR9KHQpLGUsbixyKX1mdW5jdGlvbiBkKGUsdCxuKXt2YXIgcj1cIlwiO249TWF0aC5taW4oZS5sZW5ndGgsbik7Zm9yKHZhciBvPXQ7bzxuO28rKylyKz1TdHJpbmcuZnJvbUNoYXJDb2RlKGVbb10pO3JldHVybiByfWZ1bmN0aW9uIGgoZSx0LG4scil7cnx8KEYoXCJib29sZWFuXCI9PXR5cGVvZiBuLFwibWlzc2luZyBvciBpbnZhbGlkIGVuZGlhblwiKSxGKG51bGwhPXQsXCJtaXNzaW5nIG9mZnNldFwiKSxGKHQrMTxlLmxlbmd0aCxcIlRyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpKTt2YXIgbyxpPWUubGVuZ3RoO2lmKCEoaTw9dCkpcmV0dXJuIG4/KG89ZVt0XSx0KzE8aSYmKG98PWVbdCsxXTw8OCkpOihvPWVbdF08PDgsdCsxPGkmJihvfD1lW3QrMV0pKSxvfWZ1bmN0aW9uIHAoZSx0LG4scil7cnx8KEYoXCJib29sZWFuXCI9PXR5cGVvZiBuLFwibWlzc2luZyBvciBpbnZhbGlkIGVuZGlhblwiKSxGKG51bGwhPXQsXCJtaXNzaW5nIG9mZnNldFwiKSxGKHQrMzxlLmxlbmd0aCxcIlRyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpKTt2YXIgbyxpPWUubGVuZ3RoO2lmKCEoaTw9dCkpcmV0dXJuIG4/KHQrMjxpJiYobz1lW3QrMl08PDE2KSx0KzE8aSYmKG98PWVbdCsxXTw8OCksb3w9ZVt0XSx0KzM8aSYmKG8rPWVbdCszXTw8MjQ+Pj4wKSk6KHQrMTxpJiYobz1lW3QrMV08PDE2KSx0KzI8aSYmKG98PWVbdCsyXTw8OCksdCszPGkmJihvfD1lW3QrM10pLG8rPWVbdF08PDI0Pj4+MCksb31mdW5jdGlvbiBnKGUsdCxuLHIpe2lmKHJ8fChGKFwiYm9vbGVhblwiPT10eXBlb2YgbixcIm1pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW5cIiksRihudWxsIT10LFwibWlzc2luZyBvZmZzZXRcIiksRih0KzE8ZS5sZW5ndGgsXCJUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSksIShlLmxlbmd0aDw9dCkpe3ZhciBvPWgoZSx0LG4sITApO3JldHVybiAzMjc2OCZvPy0xKig2NTUzNS1vKzEpOm99fWZ1bmN0aW9uIHkoZSx0LG4scil7aWYocnx8KEYoXCJib29sZWFuXCI9PXR5cGVvZiBuLFwibWlzc2luZyBvciBpbnZhbGlkIGVuZGlhblwiKSxGKG51bGwhPXQsXCJtaXNzaW5nIG9mZnNldFwiKSxGKHQrMzxlLmxlbmd0aCxcIlRyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpKSwhKGUubGVuZ3RoPD10KSl7dmFyIG89cChlLHQsbiwhMCk7cmV0dXJuIDIxNDc0ODM2NDgmbz8tMSooNDI5NDk2NzI5NS1vKzEpOm99fWZ1bmN0aW9uIHcoZSx0LG4scil7cmV0dXJuIHJ8fChGKFwiYm9vbGVhblwiPT10eXBlb2YgbixcIm1pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW5cIiksRih0KzM8ZS5sZW5ndGgsXCJUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSksYy5yZWFkKGUsdCxuLDIzLDQpfWZ1bmN0aW9uIGIoZSx0LG4scil7cmV0dXJuIHJ8fChGKFwiYm9vbGVhblwiPT10eXBlb2YgbixcIm1pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW5cIiksRih0Kzc8ZS5sZW5ndGgsXCJUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSksYy5yZWFkKGUsdCxuLDUyLDgpfWZ1bmN0aW9uIG0oZSx0LG4scixvKXtvfHwoRihudWxsIT10LFwibWlzc2luZyB2YWx1ZVwiKSxGKFwiYm9vbGVhblwiPT10eXBlb2YgcixcIm1pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW5cIiksRihudWxsIT1uLFwibWlzc2luZyBvZmZzZXRcIiksRihuKzE8ZS5sZW5ndGgsXCJ0cnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIiksTSh0LDY1NTM1KSk7dmFyIGk9ZS5sZW5ndGg7aWYoIShpPD1uKSlmb3IodmFyIHU9MCxhPU1hdGgubWluKGktbiwyKTt1PGE7dSsrKWVbbit1XT0odCYyNTU8PDgqKHI/dToxLXUpKT4+PjgqKHI/dToxLXUpfWZ1bmN0aW9uIHYoZSx0LG4scixvKXtvfHwoRihudWxsIT10LFwibWlzc2luZyB2YWx1ZVwiKSxGKFwiYm9vbGVhblwiPT10eXBlb2YgcixcIm1pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW5cIiksRihudWxsIT1uLFwibWlzc2luZyBvZmZzZXRcIiksRihuKzM8ZS5sZW5ndGgsXCJ0cnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIiksTSh0LDQyOTQ5NjcyOTUpKTt2YXIgaT1lLmxlbmd0aDtpZighKGk8PW4pKWZvcih2YXIgdT0wLGE9TWF0aC5taW4oaS1uLDQpO3U8YTt1KyspZVtuK3VdPXQ+Pj44KihyP3U6My11KSYyNTV9ZnVuY3Rpb24gXyhlLHQsbixyLG8pe298fChGKG51bGwhPXQsXCJtaXNzaW5nIHZhbHVlXCIpLEYoXCJib29sZWFuXCI9PXR5cGVvZiByLFwibWlzc2luZyBvciBpbnZhbGlkIGVuZGlhblwiKSxGKG51bGwhPW4sXCJtaXNzaW5nIG9mZnNldFwiKSxGKG4rMTxlLmxlbmd0aCxcIlRyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSxOKHQsMzI3NjcsLTMyNzY4KSksZS5sZW5ndGg8PW58fG0oZSwwPD10P3Q6NjU1MzUrdCsxLG4scixvKX1mdW5jdGlvbiBFKGUsdCxuLHIsbyl7b3x8KEYobnVsbCE9dCxcIm1pc3NpbmcgdmFsdWVcIiksRihcImJvb2xlYW5cIj09dHlwZW9mIHIsXCJtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuXCIpLEYobnVsbCE9bixcIm1pc3Npbmcgb2Zmc2V0XCIpLEYobiszPGUubGVuZ3RoLFwiVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpLE4odCwyMTQ3NDgzNjQ3LC0yMTQ3NDgzNjQ4KSksZS5sZW5ndGg8PW58fHYoZSwwPD10P3Q6NDI5NDk2NzI5NSt0KzEsbixyLG8pfWZ1bmN0aW9uIEkoZSx0LG4scixvKXtvfHwoRihudWxsIT10LFwibWlzc2luZyB2YWx1ZVwiKSxGKFwiYm9vbGVhblwiPT10eXBlb2YgcixcIm1pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW5cIiksRihudWxsIT1uLFwibWlzc2luZyBvZmZzZXRcIiksRihuKzM8ZS5sZW5ndGgsXCJUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIiksWSh0LDM0MDI4MjM0NjYzODUyODg2ZTIyLC0zNDAyODIzNDY2Mzg1Mjg4NmUyMikpLGUubGVuZ3RoPD1ufHxjLndyaXRlKGUsdCxuLHIsMjMsNCl9ZnVuY3Rpb24gQShlLHQsbixyLG8pe298fChGKG51bGwhPXQsXCJtaXNzaW5nIHZhbHVlXCIpLEYoXCJib29sZWFuXCI9PXR5cGVvZiByLFwibWlzc2luZyBvciBpbnZhbGlkIGVuZGlhblwiKSxGKG51bGwhPW4sXCJtaXNzaW5nIG9mZnNldFwiKSxGKG4rNzxlLmxlbmd0aCxcIlRyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSxZKHQsMTc5NzY5MzEzNDg2MjMxNTdlMjkyLC0xNzk3NjkzMTM0ODYyMzE1N2UyOTIpKSxlLmxlbmd0aDw9bnx8Yy53cml0ZShlLHQsbixyLDUyLDgpfU8uQnVmZmVyPWYsTy5TbG93QnVmZmVyPWYsTy5JTlNQRUNUX01BWF9CWVRFUz01MCxmLnBvb2xTaXplPTgxOTIsZi5fdXNlVHlwZWRBcnJheXM9ZnVuY3Rpb24oKXt0cnl7dmFyIGU9bmV3IEFycmF5QnVmZmVyKDApLHQ9bmV3IFVpbnQ4QXJyYXkoZSk7cmV0dXJuIHQuZm9vPWZ1bmN0aW9uKCl7cmV0dXJuIDQyfSw0Mj09PXQuZm9vKCkmJlwiZnVuY3Rpb25cIj09dHlwZW9mIHQuc3ViYXJyYXl9Y2F0Y2goZSl7cmV0dXJuITF9fSgpLGYuaXNFbmNvZGluZz1mdW5jdGlvbihlKXtzd2l0Y2goU3RyaW5nKGUpLnRvTG93ZXJDYXNlKCkpe2Nhc2VcImhleFwiOmNhc2VcInV0ZjhcIjpjYXNlXCJ1dGYtOFwiOmNhc2VcImFzY2lpXCI6Y2FzZVwiYmluYXJ5XCI6Y2FzZVwiYmFzZTY0XCI6Y2FzZVwicmF3XCI6Y2FzZVwidWNzMlwiOmNhc2VcInVjcy0yXCI6Y2FzZVwidXRmMTZsZVwiOmNhc2VcInV0Zi0xNmxlXCI6cmV0dXJuITA7ZGVmYXVsdDpyZXR1cm4hMX19LGYuaXNCdWZmZXI9ZnVuY3Rpb24oZSl7cmV0dXJuIShudWxsPT1lfHwhZS5faXNCdWZmZXIpfSxmLmJ5dGVMZW5ndGg9ZnVuY3Rpb24oZSx0KXt2YXIgbjtzd2l0Y2goZSs9XCJcIix0fHxcInV0ZjhcIil7Y2FzZVwiaGV4XCI6bj1lLmxlbmd0aC8yO2JyZWFrO2Nhc2VcInV0ZjhcIjpjYXNlXCJ1dGYtOFwiOm49aihlKS5sZW5ndGg7YnJlYWs7Y2FzZVwiYXNjaWlcIjpjYXNlXCJiaW5hcnlcIjpjYXNlXCJyYXdcIjpuPWUubGVuZ3RoO2JyZWFrO2Nhc2VcImJhc2U2NFwiOm49QyhlKS5sZW5ndGg7YnJlYWs7Y2FzZVwidWNzMlwiOmNhc2VcInVjcy0yXCI6Y2FzZVwidXRmMTZsZVwiOmNhc2VcInV0Zi0xNmxlXCI6bj0yKmUubGVuZ3RoO2JyZWFrO2RlZmF1bHQ6dGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBlbmNvZGluZ1wiKX1yZXR1cm4gbn0sZi5jb25jYXQ9ZnVuY3Rpb24oZSx0KXtpZihGKHgoZSksXCJVc2FnZTogQnVmZmVyLmNvbmNhdChsaXN0LCBbdG90YWxMZW5ndGhdKVxcbmxpc3Qgc2hvdWxkIGJlIGFuIEFycmF5LlwiKSwwPT09ZS5sZW5ndGgpcmV0dXJuIG5ldyBmKDApO2lmKDE9PT1lLmxlbmd0aClyZXR1cm4gZVswXTt2YXIgbjtpZihcIm51bWJlclwiIT10eXBlb2YgdClmb3Iobj10PTA7bjxlLmxlbmd0aDtuKyspdCs9ZVtuXS5sZW5ndGg7dmFyIHI9bmV3IGYodCksbz0wO2ZvcihuPTA7bjxlLmxlbmd0aDtuKyspe3ZhciBpPWVbbl07aS5jb3B5KHIsbyksbys9aS5sZW5ndGh9cmV0dXJuIHJ9LGYucHJvdG90eXBlLndyaXRlPWZ1bmN0aW9uKGUsdCxuLHIpe2lmKGlzRmluaXRlKHQpKWlzRmluaXRlKG4pfHwocj1uLG49dm9pZCAwKTtlbHNle3ZhciBvPXI7cj10LHQ9bixuPW99dD1OdW1iZXIodCl8fDA7dmFyIGksdT10aGlzLmxlbmd0aC10O3N3aXRjaChuP3U8KG49TnVtYmVyKG4pKSYmKG49dSk6bj11LHI9U3RyaW5nKHJ8fFwidXRmOFwiKS50b0xvd2VyQ2FzZSgpKXtjYXNlXCJoZXhcIjppPWZ1bmN0aW9uKGUsdCxuLHIpe249TnVtYmVyKG4pfHwwO3ZhciBvPWUubGVuZ3RoLW47cj9vPChyPU51bWJlcihyKSkmJihyPW8pOnI9bzt2YXIgaT10Lmxlbmd0aDtGKGklMj09MCxcIkludmFsaWQgaGV4IHN0cmluZ1wiKSxpLzI8ciYmKHI9aS8yKTtmb3IodmFyIHU9MDt1PHI7dSsrKXt2YXIgYT1wYXJzZUludCh0LnN1YnN0cigyKnUsMiksMTYpO0YoIWlzTmFOKGEpLFwiSW52YWxpZCBoZXggc3RyaW5nXCIpLGVbbit1XT1hfXJldHVybiBmLl9jaGFyc1dyaXR0ZW49Mip1LHV9KHRoaXMsZSx0LG4pO2JyZWFrO2Nhc2VcInV0ZjhcIjpjYXNlXCJ1dGYtOFwiOmk9ZnVuY3Rpb24oZSx0LG4scil7cmV0dXJuIGYuX2NoYXJzV3JpdHRlbj1rKGoodCksZSxuLHIpfSh0aGlzLGUsdCxuKTticmVhaztjYXNlXCJhc2NpaVwiOmk9bCh0aGlzLGUsdCxuKTticmVhaztjYXNlXCJiaW5hcnlcIjppPWZ1bmN0aW9uKGUsdCxuLHIpe3JldHVybiBsKGUsdCxuLHIpfSh0aGlzLGUsdCxuKTticmVhaztjYXNlXCJiYXNlNjRcIjppPWZ1bmN0aW9uKGUsdCxuLHIpe3JldHVybiBmLl9jaGFyc1dyaXR0ZW49ayhDKHQpLGUsbixyKX0odGhpcyxlLHQsbik7YnJlYWs7Y2FzZVwidWNzMlwiOmNhc2VcInVjcy0yXCI6Y2FzZVwidXRmMTZsZVwiOmNhc2VcInV0Zi0xNmxlXCI6aT1mdW5jdGlvbihlLHQsbixyKXtyZXR1cm4gZi5fY2hhcnNXcml0dGVuPWsoZnVuY3Rpb24oZSl7Zm9yKHZhciB0LG4scixvPVtdLGk9MDtpPGUubGVuZ3RoO2krKyl0PWUuY2hhckNvZGVBdChpKSxuPXQ+Pjgscj10JTI1NixvLnB1c2gociksby5wdXNoKG4pO3JldHVybiBvfSh0KSxlLG4scil9KHRoaXMsZSx0LG4pO2JyZWFrO2RlZmF1bHQ6dGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBlbmNvZGluZ1wiKX1yZXR1cm4gaX0sZi5wcm90b3R5cGUudG9TdHJpbmc9ZnVuY3Rpb24oZSx0LG4pe3ZhciByLG89dGhpcztpZihlPVN0cmluZyhlfHxcInV0ZjhcIikudG9Mb3dlckNhc2UoKSx0PU51bWJlcih0KXx8MCwobj12b2lkIDAhPT1uP051bWJlcihuKTpuPW8ubGVuZ3RoKT09PXQpcmV0dXJuXCJcIjtzd2l0Y2goZSl7Y2FzZVwiaGV4XCI6cj1mdW5jdGlvbihlLHQsbil7dmFyIHI9ZS5sZW5ndGg7KCF0fHx0PDApJiYodD0wKTsoIW58fG48MHx8cjxuKSYmKG49cik7Zm9yKHZhciBvPVwiXCIsaT10O2k8bjtpKyspbys9UyhlW2ldKTtyZXR1cm4gb30obyx0LG4pO2JyZWFrO2Nhc2VcInV0ZjhcIjpjYXNlXCJ1dGYtOFwiOnI9ZnVuY3Rpb24oZSx0LG4pe3ZhciByPVwiXCIsbz1cIlwiO249TWF0aC5taW4oZS5sZW5ndGgsbik7Zm9yKHZhciBpPXQ7aTxuO2krKyllW2ldPD0xMjc/KHIrPVQobykrU3RyaW5nLmZyb21DaGFyQ29kZShlW2ldKSxvPVwiXCIpOm8rPVwiJVwiK2VbaV0udG9TdHJpbmcoMTYpO3JldHVybiByK1Qobyl9KG8sdCxuKTticmVhaztjYXNlXCJhc2NpaVwiOnI9ZChvLHQsbik7YnJlYWs7Y2FzZVwiYmluYXJ5XCI6cj1mdW5jdGlvbihlLHQsbil7cmV0dXJuIGQoZSx0LG4pfShvLHQsbik7YnJlYWs7Y2FzZVwiYmFzZTY0XCI6cj1mdW5jdGlvbihlLHQsbil7cmV0dXJuIDA9PT10JiZuPT09ZS5sZW5ndGg/cy5mcm9tQnl0ZUFycmF5KGUpOnMuZnJvbUJ5dGVBcnJheShlLnNsaWNlKHQsbikpfShvLHQsbik7YnJlYWs7Y2FzZVwidWNzMlwiOmNhc2VcInVjcy0yXCI6Y2FzZVwidXRmMTZsZVwiOmNhc2VcInV0Zi0xNmxlXCI6cj1mdW5jdGlvbihlLHQsbil7Zm9yKHZhciByPWUuc2xpY2UodCxuKSxvPVwiXCIsaT0wO2k8ci5sZW5ndGg7aSs9MilvKz1TdHJpbmcuZnJvbUNoYXJDb2RlKHJbaV0rMjU2KnJbaSsxXSk7cmV0dXJuIG99KG8sdCxuKTticmVhaztkZWZhdWx0OnRocm93IG5ldyBFcnJvcihcIlVua25vd24gZW5jb2RpbmdcIil9cmV0dXJuIHJ9LGYucHJvdG90eXBlLnRvSlNPTj1mdW5jdGlvbigpe3JldHVybnt0eXBlOlwiQnVmZmVyXCIsZGF0YTpBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLl9hcnJ8fHRoaXMsMCl9fSxmLnByb3RvdHlwZS5jb3B5PWZ1bmN0aW9uKGUsdCxuLHIpe2lmKG49bnx8MCxyfHwwPT09cnx8KHI9dGhpcy5sZW5ndGgpLHQ9dHx8MCxyIT09biYmMCE9PWUubGVuZ3RoJiYwIT09dGhpcy5sZW5ndGgpe0Yobjw9cixcInNvdXJjZUVuZCA8IHNvdXJjZVN0YXJ0XCIpLEYoMDw9dCYmdDxlLmxlbmd0aCxcInRhcmdldFN0YXJ0IG91dCBvZiBib3VuZHNcIiksRigwPD1uJiZuPHRoaXMubGVuZ3RoLFwic291cmNlU3RhcnQgb3V0IG9mIGJvdW5kc1wiKSxGKDA8PXImJnI8PXRoaXMubGVuZ3RoLFwic291cmNlRW5kIG91dCBvZiBib3VuZHNcIikscj50aGlzLmxlbmd0aCYmKHI9dGhpcy5sZW5ndGgpLGUubGVuZ3RoLXQ8ci1uJiYocj1lLmxlbmd0aC10K24pO3ZhciBvPXItbjtpZihvPDEwMHx8IWYuX3VzZVR5cGVkQXJyYXlzKWZvcih2YXIgaT0wO2k8bztpKyspZVtpK3RdPXRoaXNbaStuXTtlbHNlIGUuX3NldCh0aGlzLnN1YmFycmF5KG4sbitvKSx0KX19LGYucHJvdG90eXBlLnNsaWNlPWZ1bmN0aW9uKGUsdCl7dmFyIG49dGhpcy5sZW5ndGg7aWYoZT1MKGUsbiwwKSx0PUwodCxuLG4pLGYuX3VzZVR5cGVkQXJyYXlzKXJldHVybiBmLl9hdWdtZW50KHRoaXMuc3ViYXJyYXkoZSx0KSk7Zm9yKHZhciByPXQtZSxvPW5ldyBmKHIsdm9pZCAwLCEwKSxpPTA7aTxyO2krKylvW2ldPXRoaXNbaStlXTtyZXR1cm4gb30sZi5wcm90b3R5cGUuZ2V0PWZ1bmN0aW9uKGUpe3JldHVybiBjb25zb2xlLmxvZyhcIi5nZXQoKSBpcyBkZXByZWNhdGVkLiBBY2Nlc3MgdXNpbmcgYXJyYXkgaW5kZXhlcyBpbnN0ZWFkLlwiKSx0aGlzLnJlYWRVSW50OChlKX0sZi5wcm90b3R5cGUuc2V0PWZ1bmN0aW9uKGUsdCl7cmV0dXJuIGNvbnNvbGUubG9nKFwiLnNldCgpIGlzIGRlcHJlY2F0ZWQuIEFjY2VzcyB1c2luZyBhcnJheSBpbmRleGVzIGluc3RlYWQuXCIpLHRoaXMud3JpdGVVSW50OChlLHQpfSxmLnByb3RvdHlwZS5yZWFkVUludDg9ZnVuY3Rpb24oZSx0KXtpZih0fHwoRihudWxsIT1lLFwibWlzc2luZyBvZmZzZXRcIiksRihlPHRoaXMubGVuZ3RoLFwiVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIikpLCEoZT49dGhpcy5sZW5ndGgpKXJldHVybiB0aGlzW2VdfSxmLnByb3RvdHlwZS5yZWFkVUludDE2TEU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gaCh0aGlzLGUsITAsdCl9LGYucHJvdG90eXBlLnJlYWRVSW50MTZCRT1mdW5jdGlvbihlLHQpe3JldHVybiBoKHRoaXMsZSwhMSx0KX0sZi5wcm90b3R5cGUucmVhZFVJbnQzMkxFPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIHAodGhpcyxlLCEwLHQpfSxmLnByb3RvdHlwZS5yZWFkVUludDMyQkU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gcCh0aGlzLGUsITEsdCl9LGYucHJvdG90eXBlLnJlYWRJbnQ4PWZ1bmN0aW9uKGUsdCl7aWYodHx8KEYobnVsbCE9ZSxcIm1pc3Npbmcgb2Zmc2V0XCIpLEYoZTx0aGlzLmxlbmd0aCxcIlRyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpKSwhKGU+PXRoaXMubGVuZ3RoKSlyZXR1cm4gMTI4JnRoaXNbZV0/LTEqKDI1NS10aGlzW2VdKzEpOnRoaXNbZV19LGYucHJvdG90eXBlLnJlYWRJbnQxNkxFPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIGcodGhpcyxlLCEwLHQpfSxmLnByb3RvdHlwZS5yZWFkSW50MTZCRT1mdW5jdGlvbihlLHQpe3JldHVybiBnKHRoaXMsZSwhMSx0KX0sZi5wcm90b3R5cGUucmVhZEludDMyTEU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4geSh0aGlzLGUsITAsdCl9LGYucHJvdG90eXBlLnJlYWRJbnQzMkJFPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIHkodGhpcyxlLCExLHQpfSxmLnByb3RvdHlwZS5yZWFkRmxvYXRMRT1mdW5jdGlvbihlLHQpe3JldHVybiB3KHRoaXMsZSwhMCx0KX0sZi5wcm90b3R5cGUucmVhZEZsb2F0QkU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gdyh0aGlzLGUsITEsdCl9LGYucHJvdG90eXBlLnJlYWREb3VibGVMRT1mdW5jdGlvbihlLHQpe3JldHVybiBiKHRoaXMsZSwhMCx0KX0sZi5wcm90b3R5cGUucmVhZERvdWJsZUJFPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIGIodGhpcyxlLCExLHQpfSxmLnByb3RvdHlwZS53cml0ZVVJbnQ4PWZ1bmN0aW9uKGUsdCxuKXtufHwoRihudWxsIT1lLFwibWlzc2luZyB2YWx1ZVwiKSxGKG51bGwhPXQsXCJtaXNzaW5nIG9mZnNldFwiKSxGKHQ8dGhpcy5sZW5ndGgsXCJ0cnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIiksTShlLDI1NSkpLHQ+PXRoaXMubGVuZ3RofHwodGhpc1t0XT1lKX0sZi5wcm90b3R5cGUud3JpdGVVSW50MTZMRT1mdW5jdGlvbihlLHQsbil7bSh0aGlzLGUsdCwhMCxuKX0sZi5wcm90b3R5cGUud3JpdGVVSW50MTZCRT1mdW5jdGlvbihlLHQsbil7bSh0aGlzLGUsdCwhMSxuKX0sZi5wcm90b3R5cGUud3JpdGVVSW50MzJMRT1mdW5jdGlvbihlLHQsbil7dih0aGlzLGUsdCwhMCxuKX0sZi5wcm90b3R5cGUud3JpdGVVSW50MzJCRT1mdW5jdGlvbihlLHQsbil7dih0aGlzLGUsdCwhMSxuKX0sZi5wcm90b3R5cGUud3JpdGVJbnQ4PWZ1bmN0aW9uKGUsdCxuKXtufHwoRihudWxsIT1lLFwibWlzc2luZyB2YWx1ZVwiKSxGKG51bGwhPXQsXCJtaXNzaW5nIG9mZnNldFwiKSxGKHQ8dGhpcy5sZW5ndGgsXCJUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIiksTihlLDEyNywtMTI4KSksdD49dGhpcy5sZW5ndGh8fCgwPD1lP3RoaXMud3JpdGVVSW50OChlLHQsbik6dGhpcy53cml0ZVVJbnQ4KDI1NStlKzEsdCxuKSl9LGYucHJvdG90eXBlLndyaXRlSW50MTZMRT1mdW5jdGlvbihlLHQsbil7Xyh0aGlzLGUsdCwhMCxuKX0sZi5wcm90b3R5cGUud3JpdGVJbnQxNkJFPWZ1bmN0aW9uKGUsdCxuKXtfKHRoaXMsZSx0LCExLG4pfSxmLnByb3RvdHlwZS53cml0ZUludDMyTEU9ZnVuY3Rpb24oZSx0LG4pe0UodGhpcyxlLHQsITAsbil9LGYucHJvdG90eXBlLndyaXRlSW50MzJCRT1mdW5jdGlvbihlLHQsbil7RSh0aGlzLGUsdCwhMSxuKX0sZi5wcm90b3R5cGUud3JpdGVGbG9hdExFPWZ1bmN0aW9uKGUsdCxuKXtJKHRoaXMsZSx0LCEwLG4pfSxmLnByb3RvdHlwZS53cml0ZUZsb2F0QkU9ZnVuY3Rpb24oZSx0LG4pe0kodGhpcyxlLHQsITEsbil9LGYucHJvdG90eXBlLndyaXRlRG91YmxlTEU9ZnVuY3Rpb24oZSx0LG4pe0EodGhpcyxlLHQsITAsbil9LGYucHJvdG90eXBlLndyaXRlRG91YmxlQkU9ZnVuY3Rpb24oZSx0LG4pe0EodGhpcyxlLHQsITEsbil9LGYucHJvdG90eXBlLmZpbGw9ZnVuY3Rpb24oZSx0LG4pe2lmKGU9ZXx8MCx0PXR8fDAsbj1ufHx0aGlzLmxlbmd0aCxcInN0cmluZ1wiPT10eXBlb2YgZSYmKGU9ZS5jaGFyQ29kZUF0KDApKSxGKFwibnVtYmVyXCI9PXR5cGVvZiBlJiYhaXNOYU4oZSksXCJ2YWx1ZSBpcyBub3QgYSBudW1iZXJcIiksRih0PD1uLFwiZW5kIDwgc3RhcnRcIiksbiE9PXQmJjAhPT10aGlzLmxlbmd0aCl7RigwPD10JiZ0PHRoaXMubGVuZ3RoLFwic3RhcnQgb3V0IG9mIGJvdW5kc1wiKSxGKDA8PW4mJm48PXRoaXMubGVuZ3RoLFwiZW5kIG91dCBvZiBib3VuZHNcIik7Zm9yKHZhciByPXQ7cjxuO3IrKyl0aGlzW3JdPWV9fSxmLnByb3RvdHlwZS5pbnNwZWN0PWZ1bmN0aW9uKCl7Zm9yKHZhciBlPVtdLHQ9dGhpcy5sZW5ndGgsbj0wO248dDtuKyspaWYoZVtuXT1TKHRoaXNbbl0pLG49PT1PLklOU1BFQ1RfTUFYX0JZVEVTKXtlW24rMV09XCIuLi5cIjticmVha31yZXR1cm5cIjxCdWZmZXIgXCIrZS5qb2luKFwiIFwiKStcIj5cIn0sZi5wcm90b3R5cGUudG9BcnJheUJ1ZmZlcj1mdW5jdGlvbigpe2lmKFwidW5kZWZpbmVkXCI9PXR5cGVvZiBVaW50OEFycmF5KXRocm93IG5ldyBFcnJvcihcIkJ1ZmZlci50b0FycmF5QnVmZmVyIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO2lmKGYuX3VzZVR5cGVkQXJyYXlzKXJldHVybiBuZXcgZih0aGlzKS5idWZmZXI7Zm9yKHZhciBlPW5ldyBVaW50OEFycmF5KHRoaXMubGVuZ3RoKSx0PTAsbj1lLmxlbmd0aDt0PG47dCs9MSllW3RdPXRoaXNbdF07cmV0dXJuIGUuYnVmZmVyfTt2YXIgQj1mLnByb3RvdHlwZTtmdW5jdGlvbiBMKGUsdCxuKXtyZXR1cm5cIm51bWJlclwiIT10eXBlb2YgZT9uOnQ8PShlPX5+ZSk/dDowPD1lP2U6MDw9KGUrPXQpP2U6MH1mdW5jdGlvbiBVKGUpe3JldHVybihlPX5+TWF0aC5jZWlsKCtlKSk8MD8wOmV9ZnVuY3Rpb24geChlKXtyZXR1cm4oQXJyYXkuaXNBcnJheXx8ZnVuY3Rpb24oZSl7cmV0dXJuXCJbb2JqZWN0IEFycmF5XVwiPT09T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGUpfSkoZSl9ZnVuY3Rpb24gUyhlKXtyZXR1cm4gZTwxNj9cIjBcIitlLnRvU3RyaW5nKDE2KTplLnRvU3RyaW5nKDE2KX1mdW5jdGlvbiBqKGUpe2Zvcih2YXIgdD1bXSxuPTA7bjxlLmxlbmd0aDtuKyspe3ZhciByPWUuY2hhckNvZGVBdChuKTtpZihyPD0xMjcpdC5wdXNoKGUuY2hhckNvZGVBdChuKSk7ZWxzZXt2YXIgbz1uOzU1Mjk2PD1yJiZyPD01NzM0MyYmbisrO2Zvcih2YXIgaT1lbmNvZGVVUklDb21wb25lbnQoZS5zbGljZShvLG4rMSkpLnN1YnN0cigxKS5zcGxpdChcIiVcIiksdT0wO3U8aS5sZW5ndGg7dSsrKXQucHVzaChwYXJzZUludChpW3VdLDE2KSl9fXJldHVybiB0fWZ1bmN0aW9uIEMoZSl7cmV0dXJuIHMudG9CeXRlQXJyYXkoZSl9ZnVuY3Rpb24gayhlLHQsbixyKXtmb3IodmFyIG89MDtvPHImJiEobytuPj10Lmxlbmd0aHx8bz49ZS5sZW5ndGgpO28rKyl0W28rbl09ZVtvXTtyZXR1cm4gb31mdW5jdGlvbiBUKGUpe3RyeXtyZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGUpfWNhdGNoKGUpe3JldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKDY1NTMzKX19ZnVuY3Rpb24gTShlLHQpe0YoXCJudW1iZXJcIj09dHlwZW9mIGUsXCJjYW5ub3Qgd3JpdGUgYSBub24tbnVtYmVyIGFzIGEgbnVtYmVyXCIpLEYoMDw9ZSxcInNwZWNpZmllZCBhIG5lZ2F0aXZlIHZhbHVlIGZvciB3cml0aW5nIGFuIHVuc2lnbmVkIHZhbHVlXCIpLEYoZTw9dCxcInZhbHVlIGlzIGxhcmdlciB0aGFuIG1heGltdW0gdmFsdWUgZm9yIHR5cGVcIiksRihNYXRoLmZsb29yKGUpPT09ZSxcInZhbHVlIGhhcyBhIGZyYWN0aW9uYWwgY29tcG9uZW50XCIpfWZ1bmN0aW9uIE4oZSx0LG4pe0YoXCJudW1iZXJcIj09dHlwZW9mIGUsXCJjYW5ub3Qgd3JpdGUgYSBub24tbnVtYmVyIGFzIGEgbnVtYmVyXCIpLEYoZTw9dCxcInZhbHVlIGxhcmdlciB0aGFuIG1heGltdW0gYWxsb3dlZCB2YWx1ZVwiKSxGKG48PWUsXCJ2YWx1ZSBzbWFsbGVyIHRoYW4gbWluaW11bSBhbGxvd2VkIHZhbHVlXCIpLEYoTWF0aC5mbG9vcihlKT09PWUsXCJ2YWx1ZSBoYXMgYSBmcmFjdGlvbmFsIGNvbXBvbmVudFwiKX1mdW5jdGlvbiBZKGUsdCxuKXtGKFwibnVtYmVyXCI9PXR5cGVvZiBlLFwiY2Fubm90IHdyaXRlIGEgbm9uLW51bWJlciBhcyBhIG51bWJlclwiKSxGKGU8PXQsXCJ2YWx1ZSBsYXJnZXIgdGhhbiBtYXhpbXVtIGFsbG93ZWQgdmFsdWVcIiksRihuPD1lLFwidmFsdWUgc21hbGxlciB0aGFuIG1pbmltdW0gYWxsb3dlZCB2YWx1ZVwiKX1mdW5jdGlvbiBGKGUsdCl7aWYoIWUpdGhyb3cgbmV3IEVycm9yKHR8fFwiRmFpbGVkIGFzc2VydGlvblwiKX1mLl9hdWdtZW50PWZ1bmN0aW9uKGUpe3JldHVybiBlLl9pc0J1ZmZlcj0hMCxlLl9nZXQ9ZS5nZXQsZS5fc2V0PWUuc2V0LGUuZ2V0PUIuZ2V0LGUuc2V0PUIuc2V0LGUud3JpdGU9Qi53cml0ZSxlLnRvU3RyaW5nPUIudG9TdHJpbmcsZS50b0xvY2FsZVN0cmluZz1CLnRvU3RyaW5nLGUudG9KU09OPUIudG9KU09OLGUuY29weT1CLmNvcHksZS5zbGljZT1CLnNsaWNlLGUucmVhZFVJbnQ4PUIucmVhZFVJbnQ4LGUucmVhZFVJbnQxNkxFPUIucmVhZFVJbnQxNkxFLGUucmVhZFVJbnQxNkJFPUIucmVhZFVJbnQxNkJFLGUucmVhZFVJbnQzMkxFPUIucmVhZFVJbnQzMkxFLGUucmVhZFVJbnQzMkJFPUIucmVhZFVJbnQzMkJFLGUucmVhZEludDg9Qi5yZWFkSW50OCxlLnJlYWRJbnQxNkxFPUIucmVhZEludDE2TEUsZS5yZWFkSW50MTZCRT1CLnJlYWRJbnQxNkJFLGUucmVhZEludDMyTEU9Qi5yZWFkSW50MzJMRSxlLnJlYWRJbnQzMkJFPUIucmVhZEludDMyQkUsZS5yZWFkRmxvYXRMRT1CLnJlYWRGbG9hdExFLGUucmVhZEZsb2F0QkU9Qi5yZWFkRmxvYXRCRSxlLnJlYWREb3VibGVMRT1CLnJlYWREb3VibGVMRSxlLnJlYWREb3VibGVCRT1CLnJlYWREb3VibGVCRSxlLndyaXRlVUludDg9Qi53cml0ZVVJbnQ4LGUud3JpdGVVSW50MTZMRT1CLndyaXRlVUludDE2TEUsZS53cml0ZVVJbnQxNkJFPUIud3JpdGVVSW50MTZCRSxlLndyaXRlVUludDMyTEU9Qi53cml0ZVVJbnQzMkxFLGUud3JpdGVVSW50MzJCRT1CLndyaXRlVUludDMyQkUsZS53cml0ZUludDg9Qi53cml0ZUludDgsZS53cml0ZUludDE2TEU9Qi53cml0ZUludDE2TEUsZS53cml0ZUludDE2QkU9Qi53cml0ZUludDE2QkUsZS53cml0ZUludDMyTEU9Qi53cml0ZUludDMyTEUsZS53cml0ZUludDMyQkU9Qi53cml0ZUludDMyQkUsZS53cml0ZUZsb2F0TEU9Qi53cml0ZUZsb2F0TEUsZS53cml0ZUZsb2F0QkU9Qi53cml0ZUZsb2F0QkUsZS53cml0ZURvdWJsZUxFPUIud3JpdGVEb3VibGVMRSxlLndyaXRlRG91YmxlQkU9Qi53cml0ZURvdWJsZUJFLGUuZmlsbD1CLmZpbGwsZS5pbnNwZWN0PUIuaW5zcGVjdCxlLnRvQXJyYXlCdWZmZXI9Qi50b0FycmF5QnVmZmVyLGV9fSkuY2FsbCh0aGlzLEQoXCJsWXBvSTJcIiksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp7fSxEKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnVmZmVyL2luZGV4LmpzXCIsXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnVmZmVyXCIpfSx7XCJiYXNlNjQtanNcIjoyLGJ1ZmZlcjozLGllZWU3NTQ6MTEsbFlwb0kyOjEwfV0sNDpbZnVuY3Rpb24obCxkLGUpeyhmdW5jdGlvbihlLHQsdSxuLHIsbyxpLGEsZil7dT1sKFwiYnVmZmVyXCIpLkJ1ZmZlcjt2YXIgcz00LGM9bmV3IHUocyk7Yy5maWxsKDApO2QuZXhwb3J0cz17aGFzaDpmdW5jdGlvbihlLHQsbixyKXtyZXR1cm4gdS5pc0J1ZmZlcihlKXx8KGU9bmV3IHUoZSkpLGZ1bmN0aW9uKGUsdCxuKXtmb3IodmFyIHI9bmV3IHUodCksbz1uP3Iud3JpdGVJbnQzMkJFOnIud3JpdGVJbnQzMkxFLGk9MDtpPGUubGVuZ3RoO2krKylvLmNhbGwocixlW2ldLDQqaSwhMCk7cmV0dXJuIHJ9KHQoZnVuY3Rpb24oZSx0KXtpZihlLmxlbmd0aCVzIT0wKXt2YXIgbj1lLmxlbmd0aCsocy1lLmxlbmd0aCVzKTtlPXUuY29uY2F0KFtlLGNdLG4pfWZvcih2YXIgcj1bXSxvPXQ/ZS5yZWFkSW50MzJCRTplLnJlYWRJbnQzMkxFLGk9MDtpPGUubGVuZ3RoO2krPXMpci5wdXNoKG8uY2FsbChlLGkpKTtyZXR1cm4gcn0oZSxyKSw4KmUubGVuZ3RoKSxuLHIpfX19KS5jYWxsKHRoaXMsbChcImxZcG9JMlwiKSxcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93Ont9LGwoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeS9oZWxwZXJzLmpzXCIsXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnlcIil9LHtidWZmZXI6MyxsWXBvSTI6MTB9XSw1OltmdW5jdGlvbih3LGUsYil7KGZ1bmN0aW9uKGUsdCxhLG4scixvLGksdSxmKXthPXcoXCJidWZmZXJcIikuQnVmZmVyO3ZhciBzPXcoXCIuL3NoYVwiKSxjPXcoXCIuL3NoYTI1NlwiKSxsPXcoXCIuL3JuZ1wiKSxkPXtzaGExOnMsc2hhMjU2OmMsbWQ1OncoXCIuL21kNVwiKX0saD02NCxwPW5ldyBhKGgpO2Z1bmN0aW9uIGcoZSxyKXt2YXIgbz1kW2U9ZXx8XCJzaGExXCJdLGk9W107cmV0dXJuIG98fHkoXCJhbGdvcml0aG06XCIsZSxcImlzIG5vdCB5ZXQgc3VwcG9ydGVkXCIpLHt1cGRhdGU6ZnVuY3Rpb24oZSl7cmV0dXJuIGEuaXNCdWZmZXIoZSl8fChlPW5ldyBhKGUpKSxpLnB1c2goZSksZS5sZW5ndGgsdGhpc30sZGlnZXN0OmZ1bmN0aW9uKGUpe3ZhciB0PWEuY29uY2F0KGkpLG49cj9mdW5jdGlvbihlLHQsbil7YS5pc0J1ZmZlcih0KXx8KHQ9bmV3IGEodCkpLGEuaXNCdWZmZXIobil8fChuPW5ldyBhKG4pKSx0Lmxlbmd0aD5oP3Q9ZSh0KTp0Lmxlbmd0aDxoJiYodD1hLmNvbmNhdChbdCxwXSxoKSk7Zm9yKHZhciByPW5ldyBhKGgpLG89bmV3IGEoaCksaT0wO2k8aDtpKyspcltpXT01NF50W2ldLG9baV09OTJedFtpXTt2YXIgdT1lKGEuY29uY2F0KFtyLG5dKSk7cmV0dXJuIGUoYS5jb25jYXQoW28sdV0pKX0obyxyLHQpOm8odCk7cmV0dXJuIGk9bnVsbCxlP24udG9TdHJpbmcoZSk6bn19fWZ1bmN0aW9uIHkoKXt2YXIgZT1bXS5zbGljZS5jYWxsKGFyZ3VtZW50cykuam9pbihcIiBcIik7dGhyb3cgbmV3IEVycm9yKFtlLFwid2UgYWNjZXB0IHB1bGwgcmVxdWVzdHNcIixcImh0dHA6Ly9naXRodWIuY29tL2RvbWluaWN0YXJyL2NyeXB0by1icm93c2VyaWZ5XCJdLmpvaW4oXCJcXG5cIikpfXAuZmlsbCgwKSxiLmNyZWF0ZUhhc2g9ZnVuY3Rpb24oZSl7cmV0dXJuIGcoZSl9LGIuY3JlYXRlSG1hYz1mdW5jdGlvbihlLHQpe3JldHVybiBnKGUsdCl9LGIucmFuZG9tQnl0ZXM9ZnVuY3Rpb24oZSx0KXtpZighdHx8IXQuY2FsbClyZXR1cm4gbmV3IGEobChlKSk7dHJ5e3QuY2FsbCh0aGlzLHZvaWQgMCxuZXcgYShsKGUpKSl9Y2F0Y2goZSl7dChlKX19LGZ1bmN0aW9uKGUsdCl7Zm9yKHZhciBuIGluIGUpdChlW25dLG4pfShbXCJjcmVhdGVDcmVkZW50aWFsc1wiLFwiY3JlYXRlQ2lwaGVyXCIsXCJjcmVhdGVDaXBoZXJpdlwiLFwiY3JlYXRlRGVjaXBoZXJcIixcImNyZWF0ZURlY2lwaGVyaXZcIixcImNyZWF0ZVNpZ25cIixcImNyZWF0ZVZlcmlmeVwiLFwiY3JlYXRlRGlmZmllSGVsbG1hblwiLFwicGJrZGYyXCJdLGZ1bmN0aW9uKGUpe2JbZV09ZnVuY3Rpb24oKXt5KFwic29ycnksXCIsZSxcImlzIG5vdCBpbXBsZW1lbnRlZCB5ZXRcIil9fSl9KS5jYWxsKHRoaXMsdyhcImxZcG9JMlwiKSxcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93Ont9LHcoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeS9pbmRleC5qc1wiLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2NyeXB0by1icm93c2VyaWZ5XCIpfSx7XCIuL21kNVwiOjYsXCIuL3JuZ1wiOjcsXCIuL3NoYVwiOjgsXCIuL3NoYTI1NlwiOjksYnVmZmVyOjMsbFlwb0kyOjEwfV0sNjpbZnVuY3Rpb24odyxiLGUpeyhmdW5jdGlvbihlLHQsbixyLG8saSx1LGEsZil7dmFyIHM9dyhcIi4vaGVscGVyc1wiKTtmdW5jdGlvbiBjKGUsdCl7ZVt0Pj41XXw9MTI4PDx0JTMyLGVbMTQrKHQrNjQ+Pj45PDw0KV09dDtmb3IodmFyIG49MTczMjU4NDE5MyxyPS0yNzE3MzM4Nzksbz0tMTczMjU4NDE5NCxpPTI3MTczMzg3OCx1PTA7dTxlLmxlbmd0aDt1Kz0xNil7dmFyIGE9bixmPXIscz1vLGM9aTtyPWcocj1nKHI9ZyhyPWcocj1wKHI9cChyPXAocj1wKHI9aChyPWgocj1oKHI9aChyPWQocj1kKHI9ZChyPWQocixvPWQobyxpPWQoaSxuPWQobixyLG8saSxlW3UrMF0sNywtNjgwODc2OTM2KSxyLG8sZVt1KzFdLDEyLC0zODk1NjQ1ODYpLG4scixlW3UrMl0sMTcsNjA2MTA1ODE5KSxpLG4sZVt1KzNdLDIyLC0xMDQ0NTI1MzMwKSxvPWQobyxpPWQoaSxuPWQobixyLG8saSxlW3UrNF0sNywtMTc2NDE4ODk3KSxyLG8sZVt1KzVdLDEyLDEyMDAwODA0MjYpLG4scixlW3UrNl0sMTcsLTE0NzMyMzEzNDEpLGksbixlW3UrN10sMjIsLTQ1NzA1OTgzKSxvPWQobyxpPWQoaSxuPWQobixyLG8saSxlW3UrOF0sNywxNzcwMDM1NDE2KSxyLG8sZVt1KzldLDEyLC0xOTU4NDE0NDE3KSxuLHIsZVt1KzEwXSwxNywtNDIwNjMpLGksbixlW3UrMTFdLDIyLC0xOTkwNDA0MTYyKSxvPWQobyxpPWQoaSxuPWQobixyLG8saSxlW3UrMTJdLDcsMTgwNDYwMzY4MikscixvLGVbdSsxM10sMTIsLTQwMzQxMTAxKSxuLHIsZVt1KzE0XSwxNywtMTUwMjAwMjI5MCksaSxuLGVbdSsxNV0sMjIsMTIzNjUzNTMyOSksbz1oKG8saT1oKGksbj1oKG4scixvLGksZVt1KzFdLDUsLTE2NTc5NjUxMCkscixvLGVbdSs2XSw5LC0xMDY5NTAxNjMyKSxuLHIsZVt1KzExXSwxNCw2NDM3MTc3MTMpLGksbixlW3UrMF0sMjAsLTM3Mzg5NzMwMiksbz1oKG8saT1oKGksbj1oKG4scixvLGksZVt1KzVdLDUsLTcwMTU1ODY5MSkscixvLGVbdSsxMF0sOSwzODAxNjA4MyksbixyLGVbdSsxNV0sMTQsLTY2MDQ3ODMzNSksaSxuLGVbdSs0XSwyMCwtNDA1NTM3ODQ4KSxvPWgobyxpPWgoaSxuPWgobixyLG8saSxlW3UrOV0sNSw1Njg0NDY0MzgpLHIsbyxlW3UrMTRdLDksLTEwMTk4MDM2OTApLG4scixlW3UrM10sMTQsLTE4NzM2Mzk2MSksaSxuLGVbdSs4XSwyMCwxMTYzNTMxNTAxKSxvPWgobyxpPWgoaSxuPWgobixyLG8saSxlW3UrMTNdLDUsLTE0NDQ2ODE0NjcpLHIsbyxlW3UrMl0sOSwtNTE0MDM3ODQpLG4scixlW3UrN10sMTQsMTczNTMyODQ3MyksaSxuLGVbdSsxMl0sMjAsLTE5MjY2MDc3MzQpLG89cChvLGk9cChpLG49cChuLHIsbyxpLGVbdSs1XSw0LC0zNzg1NTgpLHIsbyxlW3UrOF0sMTEsLTIwMjI1NzQ0NjMpLG4scixlW3UrMTFdLDE2LDE4MzkwMzA1NjIpLGksbixlW3UrMTRdLDIzLC0zNTMwOTU1Niksbz1wKG8saT1wKGksbj1wKG4scixvLGksZVt1KzFdLDQsLTE1MzA5OTIwNjApLHIsbyxlW3UrNF0sMTEsMTI3Mjg5MzM1MyksbixyLGVbdSs3XSwxNiwtMTU1NDk3NjMyKSxpLG4sZVt1KzEwXSwyMywtMTA5NDczMDY0MCksbz1wKG8saT1wKGksbj1wKG4scixvLGksZVt1KzEzXSw0LDY4MTI3OTE3NCkscixvLGVbdSswXSwxMSwtMzU4NTM3MjIyKSxuLHIsZVt1KzNdLDE2LC03MjI1MjE5NzkpLGksbixlW3UrNl0sMjMsNzYwMjkxODkpLG89cChvLGk9cChpLG49cChuLHIsbyxpLGVbdSs5XSw0LC02NDAzNjQ0ODcpLHIsbyxlW3UrMTJdLDExLC00MjE4MTU4MzUpLG4scixlW3UrMTVdLDE2LDUzMDc0MjUyMCksaSxuLGVbdSsyXSwyMywtOTk1MzM4NjUxKSxvPWcobyxpPWcoaSxuPWcobixyLG8saSxlW3UrMF0sNiwtMTk4NjMwODQ0KSxyLG8sZVt1KzddLDEwLDExMjY4OTE0MTUpLG4scixlW3UrMTRdLDE1LC0xNDE2MzU0OTA1KSxpLG4sZVt1KzVdLDIxLC01NzQzNDA1NSksbz1nKG8saT1nKGksbj1nKG4scixvLGksZVt1KzEyXSw2LDE3MDA0ODU1NzEpLHIsbyxlW3UrM10sMTAsLTE4OTQ5ODY2MDYpLG4scixlW3UrMTBdLDE1LC0xMDUxNTIzKSxpLG4sZVt1KzFdLDIxLC0yMDU0OTIyNzk5KSxvPWcobyxpPWcoaSxuPWcobixyLG8saSxlW3UrOF0sNiwxODczMzEzMzU5KSxyLG8sZVt1KzE1XSwxMCwtMzA2MTE3NDQpLG4scixlW3UrNl0sMTUsLTE1NjAxOTgzODApLGksbixlW3UrMTNdLDIxLDEzMDkxNTE2NDkpLG89ZyhvLGk9ZyhpLG49ZyhuLHIsbyxpLGVbdSs0XSw2LC0xNDU1MjMwNzApLHIsbyxlW3UrMTFdLDEwLC0xMTIwMjEwMzc5KSxuLHIsZVt1KzJdLDE1LDcxODc4NzI1OSksaSxuLGVbdSs5XSwyMSwtMzQzNDg1NTUxKSxuPXkobixhKSxyPXkocixmKSxvPXkobyxzKSxpPXkoaSxjKX1yZXR1cm4gQXJyYXkobixyLG8saSl9ZnVuY3Rpb24gbChlLHQsbixyLG8saSl7cmV0dXJuIHkoZnVuY3Rpb24oZSx0KXtyZXR1cm4gZTw8dHxlPj4+MzItdH0oeSh5KHQsZSkseShyLGkpKSxvKSxuKX1mdW5jdGlvbiBkKGUsdCxuLHIsbyxpLHUpe3JldHVybiBsKHQmbnx+dCZyLGUsdCxvLGksdSl9ZnVuY3Rpb24gaChlLHQsbixyLG8saSx1KXtyZXR1cm4gbCh0JnJ8biZ+cixlLHQsbyxpLHUpfWZ1bmN0aW9uIHAoZSx0LG4scixvLGksdSl7cmV0dXJuIGwodF5uXnIsZSx0LG8saSx1KX1mdW5jdGlvbiBnKGUsdCxuLHIsbyxpLHUpe3JldHVybiBsKG5eKHR8fnIpLGUsdCxvLGksdSl9ZnVuY3Rpb24geShlLHQpe3ZhciBuPSg2NTUzNSZlKSsoNjU1MzUmdCk7cmV0dXJuKGU+PjE2KSsodD4+MTYpKyhuPj4xNik8PDE2fDY1NTM1Jm59Yi5leHBvcnRzPWZ1bmN0aW9uKGUpe3JldHVybiBzLmhhc2goZSxjLDE2KX19KS5jYWxsKHRoaXMsdyhcImxZcG9JMlwiKSxcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93Ont9LHcoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeS9tZDUuanNcIixcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeVwiKX0se1wiLi9oZWxwZXJzXCI6NCxidWZmZXI6MyxsWXBvSTI6MTB9XSw3OltmdW5jdGlvbihlLHMsdCl7KGZ1bmN0aW9uKGUsdCxuLHIsbyxpLHUsYSxmKXshZnVuY3Rpb24oKXt2YXIgZSx0O2U9ZnVuY3Rpb24oZSl7Zm9yKHZhciB0LG49bmV3IEFycmF5KGUpLHI9MDtyPGU7cisrKTA9PSgzJnIpJiYodD00Mjk0OTY3Mjk2Kk1hdGgucmFuZG9tKCkpLG5bcl09dD4+PigoMyZyKTw8MykmMjU1O3JldHVybiBufSx0aGlzLmNyeXB0byYmY3J5cHRvLmdldFJhbmRvbVZhbHVlcyYmKHQ9ZnVuY3Rpb24oZSl7dmFyIHQ9bmV3IFVpbnQ4QXJyYXkoZSk7cmV0dXJuIGNyeXB0by5nZXRSYW5kb21WYWx1ZXModCksdH0pLHMuZXhwb3J0cz10fHxlfSgpfSkuY2FsbCh0aGlzLGUoXCJsWXBvSTJcIiksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp7fSxlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnkvcm5nLmpzXCIsXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnlcIil9LHtidWZmZXI6MyxsWXBvSTI6MTB9XSw4OltmdW5jdGlvbihsLGQsZSl7KGZ1bmN0aW9uKGUsdCxuLHIsbyxpLHUsYSxmKXt2YXIgcz1sKFwiLi9oZWxwZXJzXCIpO2Z1bmN0aW9uIGMoZSx0KXtlW3Q+PjVdfD0xMjg8PDI0LXQlMzIsZVsxNSsodCs2ND4+OTw8NCldPXQ7Zm9yKHZhciBuLHI9QXJyYXkoODApLG89MTczMjU4NDE5MyxpPS0yNzE3MzM4NzksdT0tMTczMjU4NDE5NCxhPTI3MTczMzg3OCxmPS0xMDA5NTg5Nzc2LHM9MDtzPGUubGVuZ3RoO3MrPTE2KXtmb3IodmFyIGM9byxsPWksZD11LGg9YSxwPWYsZz0wO2c8ODA7ZysrKXtyW2ddPWc8MTY/ZVtzK2ddOm0ocltnLTNdXnJbZy04XV5yW2ctMTRdXnJbZy0xNl0sMSk7dmFyIHk9YihiKG0obyw1KSx3KGcsaSx1LGEpKSxiKGIoZixyW2ddKSwobj1nKTwyMD8xNTE4NTAwMjQ5Om48NDA/MTg1OTc3NTM5MzpuPDYwPy0xODk0MDA3NTg4Oi04OTk0OTc1MTQpKTtmPWEsYT11LHU9bShpLDMwKSxpPW8sbz15fW89YihvLGMpLGk9YihpLGwpLHU9Yih1LGQpLGE9YihhLGgpLGY9YihmLHApfXJldHVybiBBcnJheShvLGksdSxhLGYpfWZ1bmN0aW9uIHcoZSx0LG4scil7cmV0dXJuIGU8MjA/dCZufH50JnI6ZTw0MD90Xm5ecjplPDYwP3Qmbnx0JnJ8biZyOnRebl5yfWZ1bmN0aW9uIGIoZSx0KXt2YXIgbj0oNjU1MzUmZSkrKDY1NTM1JnQpO3JldHVybihlPj4xNikrKHQ+PjE2KSsobj4+MTYpPDwxNnw2NTUzNSZufWZ1bmN0aW9uIG0oZSx0KXtyZXR1cm4gZTw8dHxlPj4+MzItdH1kLmV4cG9ydHM9ZnVuY3Rpb24oZSl7cmV0dXJuIHMuaGFzaChlLGMsMjAsITApfX0pLmNhbGwodGhpcyxsKFwibFlwb0kyXCIpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6e30sbChcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2NyeXB0by1icm93c2VyaWZ5L3NoYS5qc1wiLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2NyeXB0by1icm93c2VyaWZ5XCIpfSx7XCIuL2hlbHBlcnNcIjo0LGJ1ZmZlcjozLGxZcG9JMjoxMH1dLDk6W2Z1bmN0aW9uKGwsZCxlKXsoZnVuY3Rpb24oZSx0LG4scixvLGksdSxhLGYpe2Z1bmN0aW9uIEIoZSx0KXt2YXIgbj0oNjU1MzUmZSkrKDY1NTM1JnQpO3JldHVybihlPj4xNikrKHQ+PjE2KSsobj4+MTYpPDwxNnw2NTUzNSZufWZ1bmN0aW9uIEwoZSx0KXtyZXR1cm4gZT4+PnR8ZTw8MzItdH1mdW5jdGlvbiBVKGUsdCl7cmV0dXJuIGU+Pj50fWZ1bmN0aW9uIHMoZSx0KXt2YXIgbixyLG8saSx1LGEsZixzLGMsbCxkLGgscCxnLHksdyxiLG0sdj1uZXcgQXJyYXkoMTExNjM1MjQwOCwxODk5NDQ3NDQxLDMwNDkzMjM0NzEsMzkyMTAwOTU3Myw5NjE5ODcxNjMsMTUwODk3MDk5MywyNDUzNjM1NzQ4LDI4NzA3NjMyMjEsMzYyNDM4MTA4MCwzMTA1OTg0MDEsNjA3MjI1Mjc4LDE0MjY4ODE5ODcsMTkyNTA3ODM4OCwyMTYyMDc4MjA2LDI2MTQ4ODgxMDMsMzI0ODIyMjU4MCwzODM1MzkwNDAxLDQwMjIyMjQ3NzQsMjY0MzQ3MDc4LDYwNDgwNzYyOCw3NzAyNTU5ODMsMTI0OTE1MDEyMiwxNTU1MDgxNjkyLDE5OTYwNjQ5ODYsMjU1NDIyMDg4MiwyODIxODM0MzQ5LDI5NTI5OTY4MDgsMzIxMDMxMzY3MSwzMzM2NTcxODkxLDM1ODQ1Mjg3MTEsMTEzOTI2OTkzLDMzODI0MTg5NSw2NjYzMDcyMDUsNzczNTI5OTEyLDEyOTQ3NTczNzIsMTM5NjE4MjI5MSwxNjk1MTgzNzAwLDE5ODY2NjEwNTEsMjE3NzAyNjM1MCwyNDU2OTU2MDM3LDI3MzA0ODU5MjEsMjgyMDMwMjQxMSwzMjU5NzMwODAwLDMzNDU3NjQ3NzEsMzUxNjA2NTgxNywzNjAwMzUyODA0LDQwOTQ1NzE5MDksMjc1NDIzMzQ0LDQzMDIyNzczNCw1MDY5NDg2MTYsNjU5MDYwNTU2LDg4Mzk5Nzg3Nyw5NTgxMzk1NzEsMTMyMjgyMjIxOCwxNTM3MDAyMDYzLDE3NDc4NzM3NzksMTk1NTU2MjIyMiwyMDI0MTA0ODE1LDIyMjc3MzA0NTIsMjM2MTg1MjQyNCwyNDI4NDM2NDc0LDI3NTY3MzQxODcsMzIwNDAzMTQ3OSwzMzI5MzI1Mjk4KSxfPW5ldyBBcnJheSgxNzc5MDMzNzAzLDMxNDQxMzQyNzcsMTAxMzkwNDI0MiwyNzczNDgwNzYyLDEzNTk4OTMxMTksMjYwMDgyMjkyNCw1Mjg3MzQ2MzUsMTU0MTQ1OTIyNSksRT1uZXcgQXJyYXkoNjQpO2VbdD4+NV18PTEyODw8MjQtdCUzMixlWzE1Kyh0KzY0Pj45PDw0KV09dDtmb3IodmFyIEk9MDtJPGUubGVuZ3RoO0krPTE2KXtuPV9bMF0scj1fWzFdLG89X1syXSxpPV9bM10sdT1fWzRdLGE9X1s1XSxmPV9bNl0scz1fWzddO2Zvcih2YXIgQT0wO0E8NjQ7QSsrKUVbQV09QTwxNj9lW0ErSV06QihCKEIoKG09RVtBLTJdLEwobSwxNyleTChtLDE5KV5VKG0sMTApKSxFW0EtN10pLChiPUVbQS0xNV0sTChiLDcpXkwoYiwxOCleVShiLDMpKSksRVtBLTE2XSksYz1CKEIoQihCKHMsTCh3PXUsNileTCh3LDExKV5MKHcsMjUpKSwoeT11KSZhXn55JmYpLHZbQV0pLEVbQV0pLGw9QihMKGc9biwyKV5MKGcsMTMpXkwoZywyMiksKGQ9bikmKGg9cileZCYocD1vKV5oJnApLHM9ZixmPWEsYT11LHU9QihpLGMpLGk9byxvPXIscj1uLG49QihjLGwpO19bMF09QihuLF9bMF0pLF9bMV09QihyLF9bMV0pLF9bMl09QihvLF9bMl0pLF9bM109QihpLF9bM10pLF9bNF09Qih1LF9bNF0pLF9bNV09QihhLF9bNV0pLF9bNl09QihmLF9bNl0pLF9bN109QihzLF9bN10pfXJldHVybiBffXZhciBjPWwoXCIuL2hlbHBlcnNcIik7ZC5leHBvcnRzPWZ1bmN0aW9uKGUpe3JldHVybiBjLmhhc2goZSxzLDMyLCEwKX19KS5jYWxsKHRoaXMsbChcImxZcG9JMlwiKSxcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93Ont9LGwoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeS9zaGEyNTYuanNcIixcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeVwiKX0se1wiLi9oZWxwZXJzXCI6NCxidWZmZXI6MyxsWXBvSTI6MTB9XSwxMDpbZnVuY3Rpb24oZSxjLHQpeyhmdW5jdGlvbihlLHQsbixyLG8saSx1LGEsZil7ZnVuY3Rpb24gcygpe30oZT1jLmV4cG9ydHM9e30pLm5leHRUaWNrPWZ1bmN0aW9uKCl7dmFyIGU9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyYmd2luZG93LnNldEltbWVkaWF0ZSx0PVwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cmJndpbmRvdy5wb3N0TWVzc2FnZSYmd2luZG93LmFkZEV2ZW50TGlzdGVuZXI7aWYoZSlyZXR1cm4gZnVuY3Rpb24oZSl7cmV0dXJuIHdpbmRvdy5zZXRJbW1lZGlhdGUoZSl9O2lmKHQpe3ZhciBuPVtdO3JldHVybiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIixmdW5jdGlvbihlKXt2YXIgdD1lLnNvdXJjZTt0IT09d2luZG93JiZudWxsIT09dHx8XCJwcm9jZXNzLXRpY2tcIiE9PWUuZGF0YXx8KGUuc3RvcFByb3BhZ2F0aW9uKCksMDxuLmxlbmd0aCYmbi5zaGlmdCgpKCkpfSwhMCksZnVuY3Rpb24oZSl7bi5wdXNoKGUpLHdpbmRvdy5wb3N0TWVzc2FnZShcInByb2Nlc3MtdGlja1wiLFwiKlwiKX19cmV0dXJuIGZ1bmN0aW9uKGUpe3NldFRpbWVvdXQoZSwwKX19KCksZS50aXRsZT1cImJyb3dzZXJcIixlLmJyb3dzZXI9ITAsZS5lbnY9e30sZS5hcmd2PVtdLGUub249cyxlLmFkZExpc3RlbmVyPXMsZS5vbmNlPXMsZS5vZmY9cyxlLnJlbW92ZUxpc3RlbmVyPXMsZS5yZW1vdmVBbGxMaXN0ZW5lcnM9cyxlLmVtaXQ9cyxlLmJpbmRpbmc9ZnVuY3Rpb24oZSl7dGhyb3cgbmV3IEVycm9yKFwicHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWRcIil9LGUuY3dkPWZ1bmN0aW9uKCl7cmV0dXJuXCIvXCJ9LGUuY2hkaXI9ZnVuY3Rpb24oZSl7dGhyb3cgbmV3IEVycm9yKFwicHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkXCIpfX0pLmNhbGwodGhpcyxlKFwibFlwb0kyXCIpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6e30sZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qc1wiLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3Byb2Nlc3NcIil9LHtidWZmZXI6MyxsWXBvSTI6MTB9XSwxMTpbZnVuY3Rpb24oZSx0LHMpeyhmdW5jdGlvbihlLHQsbixyLG8saSx1LGEsZil7cy5yZWFkPWZ1bmN0aW9uKGUsdCxuLHIsbyl7dmFyIGksdSxhPTgqby1yLTEsZj0oMTw8YSktMSxzPWY+PjEsYz0tNyxsPW4/by0xOjAsZD1uPy0xOjEsaD1lW3QrbF07Zm9yKGwrPWQsaT1oJigxPDwtYyktMSxoPj49LWMsYys9YTswPGM7aT0yNTYqaStlW3QrbF0sbCs9ZCxjLT04KTtmb3IodT1pJigxPDwtYyktMSxpPj49LWMsYys9cjswPGM7dT0yNTYqdStlW3QrbF0sbCs9ZCxjLT04KTtpZigwPT09aSlpPTEtcztlbHNle2lmKGk9PT1mKXJldHVybiB1P05hTjoxLzAqKGg/LTE6MSk7dSs9TWF0aC5wb3coMixyKSxpLT1zfXJldHVybihoPy0xOjEpKnUqTWF0aC5wb3coMixpLXIpfSxzLndyaXRlPWZ1bmN0aW9uKGUsdCxuLHIsbyxpKXt2YXIgdSxhLGYscz04Kmktby0xLGM9KDE8PHMpLTEsbD1jPj4xLGQ9MjM9PT1vP01hdGgucG93KDIsLTI0KS1NYXRoLnBvdygyLC03Nyk6MCxoPXI/MDppLTEscD1yPzE6LTEsZz10PDB8fDA9PT10JiYxL3Q8MD8xOjA7Zm9yKHQ9TWF0aC5hYnModCksaXNOYU4odCl8fHQ9PT0xLzA/KGE9aXNOYU4odCk/MTowLHU9Yyk6KHU9TWF0aC5mbG9vcihNYXRoLmxvZyh0KS9NYXRoLkxOMiksdCooZj1NYXRoLnBvdygyLC11KSk8MSYmKHUtLSxmKj0yKSwyPD0odCs9MTw9dStsP2QvZjpkKk1hdGgucG93KDIsMS1sKSkqZiYmKHUrKyxmLz0yKSxjPD11K2w/KGE9MCx1PWMpOjE8PXUrbD8oYT0odCpmLTEpKk1hdGgucG93KDIsbyksdSs9bCk6KGE9dCpNYXRoLnBvdygyLGwtMSkqTWF0aC5wb3coMixvKSx1PTApKTs4PD1vO2VbbitoXT0yNTUmYSxoKz1wLGEvPTI1NixvLT04KTtmb3IodT11PDxvfGEscys9bzswPHM7ZVtuK2hdPTI1NSZ1LGgrPXAsdS89MjU2LHMtPTgpO2VbbitoLXBdfD0xMjgqZ319KS5jYWxsKHRoaXMsZShcImxZcG9JMlwiKSxcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93Ont9LGUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9ub2RlX21vZHVsZXMvaWVlZTc1NC9pbmRleC5qc1wiLFwiL25vZGVfbW9kdWxlcy9pZWVlNzU0XCIpfSx7YnVmZmVyOjMsbFlwb0kyOjEwfV19LHt9LFsxXSkoMSl9KTsiLCIndXNlIHN0cmljdCc7XG5cbmlmICh0eXBlb2YgcHJvY2VzcyA9PT0gJ3VuZGVmaW5lZCcgfHxcbiAgICAhcHJvY2Vzcy52ZXJzaW9uIHx8XG4gICAgcHJvY2Vzcy52ZXJzaW9uLmluZGV4T2YoJ3YwLicpID09PSAwIHx8XG4gICAgcHJvY2Vzcy52ZXJzaW9uLmluZGV4T2YoJ3YxLicpID09PSAwICYmIHByb2Nlc3MudmVyc2lvbi5pbmRleE9mKCd2MS44LicpICE9PSAwKSB7XG4gIG1vZHVsZS5leHBvcnRzID0geyBuZXh0VGljazogbmV4dFRpY2sgfTtcbn0gZWxzZSB7XG4gIG1vZHVsZS5leHBvcnRzID0gcHJvY2Vzc1xufVxuXG5mdW5jdGlvbiBuZXh0VGljayhmbiwgYXJnMSwgYXJnMiwgYXJnMykge1xuICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJjYWxsYmFja1wiIGFyZ3VtZW50IG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICB9XG4gIHZhciBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICB2YXIgYXJncywgaTtcbiAgc3dpdGNoIChsZW4pIHtcbiAgY2FzZSAwOlxuICBjYXNlIDE6XG4gICAgcmV0dXJuIHByb2Nlc3MubmV4dFRpY2soZm4pO1xuICBjYXNlIDI6XG4gICAgcmV0dXJuIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24gYWZ0ZXJUaWNrT25lKCkge1xuICAgICAgZm4uY2FsbChudWxsLCBhcmcxKTtcbiAgICB9KTtcbiAgY2FzZSAzOlxuICAgIHJldHVybiBwcm9jZXNzLm5leHRUaWNrKGZ1bmN0aW9uIGFmdGVyVGlja1R3bygpIHtcbiAgICAgIGZuLmNhbGwobnVsbCwgYXJnMSwgYXJnMik7XG4gICAgfSk7XG4gIGNhc2UgNDpcbiAgICByZXR1cm4gcHJvY2Vzcy5uZXh0VGljayhmdW5jdGlvbiBhZnRlclRpY2tUaHJlZSgpIHtcbiAgICAgIGZuLmNhbGwobnVsbCwgYXJnMSwgYXJnMiwgYXJnMyk7XG4gICAgfSk7XG4gIGRlZmF1bHQ6XG4gICAgYXJncyA9IG5ldyBBcnJheShsZW4gLSAxKTtcbiAgICBpID0gMDtcbiAgICB3aGlsZSAoaSA8IGFyZ3MubGVuZ3RoKSB7XG4gICAgICBhcmdzW2krK10gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuICAgIHJldHVybiBwcm9jZXNzLm5leHRUaWNrKGZ1bmN0aW9uIGFmdGVyVGljaygpIHtcbiAgICAgIGZuLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgIH0pO1xuICB9XG59XG5cbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL19zdHJlYW1fZHVwbGV4LmpzJyk7XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuLy8gYSBkdXBsZXggc3RyZWFtIGlzIGp1c3QgYSBzdHJlYW0gdGhhdCBpcyBib3RoIHJlYWRhYmxlIGFuZCB3cml0YWJsZS5cbi8vIFNpbmNlIEpTIGRvZXNuJ3QgaGF2ZSBtdWx0aXBsZSBwcm90b3R5cGFsIGluaGVyaXRhbmNlLCB0aGlzIGNsYXNzXG4vLyBwcm90b3R5cGFsbHkgaW5oZXJpdHMgZnJvbSBSZWFkYWJsZSwgYW5kIHRoZW4gcGFyYXNpdGljYWxseSBmcm9tXG4vLyBXcml0YWJsZS5cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKjxyZXBsYWNlbWVudD4qL1xuXG52YXIgcG5hID0gcmVxdWlyZSgncHJvY2Vzcy1uZXh0aWNrLWFyZ3MnKTtcbi8qPC9yZXBsYWNlbWVudD4qL1xuXG4vKjxyZXBsYWNlbWVudD4qL1xudmFyIG9iamVjdEtleXMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiAob2JqKSB7XG4gIHZhciBrZXlzID0gW107XG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBrZXlzLnB1c2goa2V5KTtcbiAgfXJldHVybiBrZXlzO1xufTtcbi8qPC9yZXBsYWNlbWVudD4qL1xuXG5tb2R1bGUuZXhwb3J0cyA9IER1cGxleDtcblxuLyo8cmVwbGFjZW1lbnQ+Ki9cbnZhciB1dGlsID0gcmVxdWlyZSgnY29yZS11dGlsLWlzJyk7XG51dGlsLmluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKTtcbi8qPC9yZXBsYWNlbWVudD4qL1xuXG52YXIgUmVhZGFibGUgPSByZXF1aXJlKCcuL19zdHJlYW1fcmVhZGFibGUnKTtcbnZhciBXcml0YWJsZSA9IHJlcXVpcmUoJy4vX3N0cmVhbV93cml0YWJsZScpO1xuXG51dGlsLmluaGVyaXRzKER1cGxleCwgUmVhZGFibGUpO1xuXG57XG4gIC8vIGF2b2lkIHNjb3BlIGNyZWVwLCB0aGUga2V5cyBhcnJheSBjYW4gdGhlbiBiZSBjb2xsZWN0ZWRcbiAgdmFyIGtleXMgPSBvYmplY3RLZXlzKFdyaXRhYmxlLnByb3RvdHlwZSk7XG4gIGZvciAodmFyIHYgPSAwOyB2IDwga2V5cy5sZW5ndGg7IHYrKykge1xuICAgIHZhciBtZXRob2QgPSBrZXlzW3ZdO1xuICAgIGlmICghRHVwbGV4LnByb3RvdHlwZVttZXRob2RdKSBEdXBsZXgucHJvdG90eXBlW21ldGhvZF0gPSBXcml0YWJsZS5wcm90b3R5cGVbbWV0aG9kXTtcbiAgfVxufVxuXG5mdW5jdGlvbiBEdXBsZXgob3B0aW9ucykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgRHVwbGV4KSkgcmV0dXJuIG5ldyBEdXBsZXgob3B0aW9ucyk7XG5cbiAgUmVhZGFibGUuY2FsbCh0aGlzLCBvcHRpb25zKTtcbiAgV3JpdGFibGUuY2FsbCh0aGlzLCBvcHRpb25zKTtcblxuICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnJlYWRhYmxlID09PSBmYWxzZSkgdGhpcy5yZWFkYWJsZSA9IGZhbHNlO1xuXG4gIGlmIChvcHRpb25zICYmIG9wdGlvbnMud3JpdGFibGUgPT09IGZhbHNlKSB0aGlzLndyaXRhYmxlID0gZmFsc2U7XG5cbiAgdGhpcy5hbGxvd0hhbGZPcGVuID0gdHJ1ZTtcbiAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5hbGxvd0hhbGZPcGVuID09PSBmYWxzZSkgdGhpcy5hbGxvd0hhbGZPcGVuID0gZmFsc2U7XG5cbiAgdGhpcy5vbmNlKCdlbmQnLCBvbmVuZCk7XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShEdXBsZXgucHJvdG90eXBlLCAnd3JpdGFibGVIaWdoV2F0ZXJNYXJrJywge1xuICAvLyBtYWtpbmcgaXQgZXhwbGljaXQgdGhpcyBwcm9wZXJ0eSBpcyBub3QgZW51bWVyYWJsZVxuICAvLyBiZWNhdXNlIG90aGVyd2lzZSBzb21lIHByb3RvdHlwZSBtYW5pcHVsYXRpb24gaW5cbiAgLy8gdXNlcmxhbmQgd2lsbCBmYWlsXG4gIGVudW1lcmFibGU6IGZhbHNlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5fd3JpdGFibGVTdGF0ZS5oaWdoV2F0ZXJNYXJrO1xuICB9XG59KTtcblxuLy8gdGhlIG5vLWhhbGYtb3BlbiBlbmZvcmNlclxuZnVuY3Rpb24gb25lbmQoKSB7XG4gIC8vIGlmIHdlIGFsbG93IGhhbGYtb3BlbiBzdGF0ZSwgb3IgaWYgdGhlIHdyaXRhYmxlIHNpZGUgZW5kZWQsXG4gIC8vIHRoZW4gd2UncmUgb2suXG4gIGlmICh0aGlzLmFsbG93SGFsZk9wZW4gfHwgdGhpcy5fd3JpdGFibGVTdGF0ZS5lbmRlZCkgcmV0dXJuO1xuXG4gIC8vIG5vIG1vcmUgZGF0YSBjYW4gYmUgd3JpdHRlbi5cbiAgLy8gQnV0IGFsbG93IG1vcmUgd3JpdGVzIHRvIGhhcHBlbiBpbiB0aGlzIHRpY2suXG4gIHBuYS5uZXh0VGljayhvbkVuZE5ULCB0aGlzKTtcbn1cblxuZnVuY3Rpb24gb25FbmROVChzZWxmKSB7XG4gIHNlbGYuZW5kKCk7XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShEdXBsZXgucHJvdG90eXBlLCAnZGVzdHJveWVkJywge1xuICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5fcmVhZGFibGVTdGF0ZSA9PT0gdW5kZWZpbmVkIHx8IHRoaXMuX3dyaXRhYmxlU3RhdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fcmVhZGFibGVTdGF0ZS5kZXN0cm95ZWQgJiYgdGhpcy5fd3JpdGFibGVTdGF0ZS5kZXN0cm95ZWQ7XG4gIH0sXG4gIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgLy8gd2UgaWdub3JlIHRoZSB2YWx1ZSBpZiB0aGUgc3RyZWFtXG4gICAgLy8gaGFzIG5vdCBiZWVuIGluaXRpYWxpemVkIHlldFxuICAgIGlmICh0aGlzLl9yZWFkYWJsZVN0YXRlID09PSB1bmRlZmluZWQgfHwgdGhpcy5fd3JpdGFibGVTdGF0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gYmFja3dhcmQgY29tcGF0aWJpbGl0eSwgdGhlIHVzZXIgaXMgZXhwbGljaXRseVxuICAgIC8vIG1hbmFnaW5nIGRlc3Ryb3llZFxuICAgIHRoaXMuX3JlYWRhYmxlU3RhdGUuZGVzdHJveWVkID0gdmFsdWU7XG4gICAgdGhpcy5fd3JpdGFibGVTdGF0ZS5kZXN0cm95ZWQgPSB2YWx1ZTtcbiAgfVxufSk7XG5cbkR1cGxleC5wcm90b3R5cGUuX2Rlc3Ryb3kgPSBmdW5jdGlvbiAoZXJyLCBjYikge1xuICB0aGlzLnB1c2gobnVsbCk7XG4gIHRoaXMuZW5kKCk7XG5cbiAgcG5hLm5leHRUaWNrKGNiLCBlcnIpO1xufTsiLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuLy8gYSBwYXNzdGhyb3VnaCBzdHJlYW0uXG4vLyBiYXNpY2FsbHkganVzdCB0aGUgbW9zdCBtaW5pbWFsIHNvcnQgb2YgVHJhbnNmb3JtIHN0cmVhbS5cbi8vIEV2ZXJ5IHdyaXR0ZW4gY2h1bmsgZ2V0cyBvdXRwdXQgYXMtaXMuXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBQYXNzVGhyb3VnaDtcblxudmFyIFRyYW5zZm9ybSA9IHJlcXVpcmUoJy4vX3N0cmVhbV90cmFuc2Zvcm0nKTtcblxuLyo8cmVwbGFjZW1lbnQ+Ki9cbnZhciB1dGlsID0gcmVxdWlyZSgnY29yZS11dGlsLWlzJyk7XG51dGlsLmluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKTtcbi8qPC9yZXBsYWNlbWVudD4qL1xuXG51dGlsLmluaGVyaXRzKFBhc3NUaHJvdWdoLCBUcmFuc2Zvcm0pO1xuXG5mdW5jdGlvbiBQYXNzVGhyb3VnaChvcHRpb25zKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBQYXNzVGhyb3VnaCkpIHJldHVybiBuZXcgUGFzc1Rocm91Z2gob3B0aW9ucyk7XG5cbiAgVHJhbnNmb3JtLmNhbGwodGhpcywgb3B0aW9ucyk7XG59XG5cblBhc3NUaHJvdWdoLnByb3RvdHlwZS5fdHJhbnNmb3JtID0gZnVuY3Rpb24gKGNodW5rLCBlbmNvZGluZywgY2IpIHtcbiAgY2IobnVsbCwgY2h1bmspO1xufTsiLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKjxyZXBsYWNlbWVudD4qL1xuXG52YXIgcG5hID0gcmVxdWlyZSgncHJvY2Vzcy1uZXh0aWNrLWFyZ3MnKTtcbi8qPC9yZXBsYWNlbWVudD4qL1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWRhYmxlO1xuXG4vKjxyZXBsYWNlbWVudD4qL1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCdpc2FycmF5Jyk7XG4vKjwvcmVwbGFjZW1lbnQ+Ki9cblxuLyo8cmVwbGFjZW1lbnQ+Ki9cbnZhciBEdXBsZXg7XG4vKjwvcmVwbGFjZW1lbnQ+Ki9cblxuUmVhZGFibGUuUmVhZGFibGVTdGF0ZSA9IFJlYWRhYmxlU3RhdGU7XG5cbi8qPHJlcGxhY2VtZW50PiovXG52YXIgRUUgPSByZXF1aXJlKCdldmVudHMnKS5FdmVudEVtaXR0ZXI7XG5cbnZhciBFRWxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbiAoZW1pdHRlciwgdHlwZSkge1xuICByZXR1cm4gZW1pdHRlci5saXN0ZW5lcnModHlwZSkubGVuZ3RoO1xufTtcbi8qPC9yZXBsYWNlbWVudD4qL1xuXG4vKjxyZXBsYWNlbWVudD4qL1xudmFyIFN0cmVhbSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvc3RyZWFtcy9zdHJlYW0nKTtcbi8qPC9yZXBsYWNlbWVudD4qL1xuXG4vKjxyZXBsYWNlbWVudD4qL1xuXG52YXIgQnVmZmVyID0gcmVxdWlyZSgnc2FmZS1idWZmZXInKS5CdWZmZXI7XG52YXIgT3VyVWludDhBcnJheSA9IGdsb2JhbC5VaW50OEFycmF5IHx8IGZ1bmN0aW9uICgpIHt9O1xuZnVuY3Rpb24gX3VpbnQ4QXJyYXlUb0J1ZmZlcihjaHVuaykge1xuICByZXR1cm4gQnVmZmVyLmZyb20oY2h1bmspO1xufVxuZnVuY3Rpb24gX2lzVWludDhBcnJheShvYmopIHtcbiAgcmV0dXJuIEJ1ZmZlci5pc0J1ZmZlcihvYmopIHx8IG9iaiBpbnN0YW5jZW9mIE91clVpbnQ4QXJyYXk7XG59XG5cbi8qPC9yZXBsYWNlbWVudD4qL1xuXG4vKjxyZXBsYWNlbWVudD4qL1xudmFyIHV0aWwgPSByZXF1aXJlKCdjb3JlLXV0aWwtaXMnKTtcbnV0aWwuaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpO1xuLyo8L3JlcGxhY2VtZW50PiovXG5cbi8qPHJlcGxhY2VtZW50PiovXG52YXIgZGVidWdVdGlsID0gcmVxdWlyZSgndXRpbCcpO1xudmFyIGRlYnVnID0gdm9pZCAwO1xuaWYgKGRlYnVnVXRpbCAmJiBkZWJ1Z1V0aWwuZGVidWdsb2cpIHtcbiAgZGVidWcgPSBkZWJ1Z1V0aWwuZGVidWdsb2coJ3N0cmVhbScpO1xufSBlbHNlIHtcbiAgZGVidWcgPSBmdW5jdGlvbiAoKSB7fTtcbn1cbi8qPC9yZXBsYWNlbWVudD4qL1xuXG52YXIgQnVmZmVyTGlzdCA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvc3RyZWFtcy9CdWZmZXJMaXN0Jyk7XG52YXIgZGVzdHJveUltcGwgPSByZXF1aXJlKCcuL2ludGVybmFsL3N0cmVhbXMvZGVzdHJveScpO1xudmFyIFN0cmluZ0RlY29kZXI7XG5cbnV0aWwuaW5oZXJpdHMoUmVhZGFibGUsIFN0cmVhbSk7XG5cbnZhciBrUHJveHlFdmVudHMgPSBbJ2Vycm9yJywgJ2Nsb3NlJywgJ2Rlc3Ryb3knLCAncGF1c2UnLCAncmVzdW1lJ107XG5cbmZ1bmN0aW9uIHByZXBlbmRMaXN0ZW5lcihlbWl0dGVyLCBldmVudCwgZm4pIHtcbiAgLy8gU2FkbHkgdGhpcyBpcyBub3QgY2FjaGVhYmxlIGFzIHNvbWUgbGlicmFyaWVzIGJ1bmRsZSB0aGVpciBvd25cbiAgLy8gZXZlbnQgZW1pdHRlciBpbXBsZW1lbnRhdGlvbiB3aXRoIHRoZW0uXG4gIGlmICh0eXBlb2YgZW1pdHRlci5wcmVwZW5kTGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHJldHVybiBlbWl0dGVyLnByZXBlbmRMaXN0ZW5lcihldmVudCwgZm4pO1xuXG4gIC8vIFRoaXMgaXMgYSBoYWNrIHRvIG1ha2Ugc3VyZSB0aGF0IG91ciBlcnJvciBoYW5kbGVyIGlzIGF0dGFjaGVkIGJlZm9yZSBhbnlcbiAgLy8gdXNlcmxhbmQgb25lcy4gIE5FVkVSIERPIFRISVMuIFRoaXMgaXMgaGVyZSBvbmx5IGJlY2F1c2UgdGhpcyBjb2RlIG5lZWRzXG4gIC8vIHRvIGNvbnRpbnVlIHRvIHdvcmsgd2l0aCBvbGRlciB2ZXJzaW9ucyBvZiBOb2RlLmpzIHRoYXQgZG8gbm90IGluY2x1ZGVcbiAgLy8gdGhlIHByZXBlbmRMaXN0ZW5lcigpIG1ldGhvZC4gVGhlIGdvYWwgaXMgdG8gZXZlbnR1YWxseSByZW1vdmUgdGhpcyBoYWNrLlxuICBpZiAoIWVtaXR0ZXIuX2V2ZW50cyB8fCAhZW1pdHRlci5fZXZlbnRzW2V2ZW50XSkgZW1pdHRlci5vbihldmVudCwgZm4pO2Vsc2UgaWYgKGlzQXJyYXkoZW1pdHRlci5fZXZlbnRzW2V2ZW50XSkpIGVtaXR0ZXIuX2V2ZW50c1tldmVudF0udW5zaGlmdChmbik7ZWxzZSBlbWl0dGVyLl9ldmVudHNbZXZlbnRdID0gW2ZuLCBlbWl0dGVyLl9ldmVudHNbZXZlbnRdXTtcbn1cblxuZnVuY3Rpb24gUmVhZGFibGVTdGF0ZShvcHRpb25zLCBzdHJlYW0pIHtcbiAgRHVwbGV4ID0gRHVwbGV4IHx8IHJlcXVpcmUoJy4vX3N0cmVhbV9kdXBsZXgnKTtcblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAvLyBEdXBsZXggc3RyZWFtcyBhcmUgYm90aCByZWFkYWJsZSBhbmQgd3JpdGFibGUsIGJ1dCBzaGFyZVxuICAvLyB0aGUgc2FtZSBvcHRpb25zIG9iamVjdC5cbiAgLy8gSG93ZXZlciwgc29tZSBjYXNlcyByZXF1aXJlIHNldHRpbmcgb3B0aW9ucyB0byBkaWZmZXJlbnRcbiAgLy8gdmFsdWVzIGZvciB0aGUgcmVhZGFibGUgYW5kIHRoZSB3cml0YWJsZSBzaWRlcyBvZiB0aGUgZHVwbGV4IHN0cmVhbS5cbiAgLy8gVGhlc2Ugb3B0aW9ucyBjYW4gYmUgcHJvdmlkZWQgc2VwYXJhdGVseSBhcyByZWFkYWJsZVhYWCBhbmQgd3JpdGFibGVYWFguXG4gIHZhciBpc0R1cGxleCA9IHN0cmVhbSBpbnN0YW5jZW9mIER1cGxleDtcblxuICAvLyBvYmplY3Qgc3RyZWFtIGZsYWcuIFVzZWQgdG8gbWFrZSByZWFkKG4pIGlnbm9yZSBuIGFuZCB0b1xuICAvLyBtYWtlIGFsbCB0aGUgYnVmZmVyIG1lcmdpbmcgYW5kIGxlbmd0aCBjaGVja3MgZ28gYXdheVxuICB0aGlzLm9iamVjdE1vZGUgPSAhIW9wdGlvbnMub2JqZWN0TW9kZTtcblxuICBpZiAoaXNEdXBsZXgpIHRoaXMub2JqZWN0TW9kZSA9IHRoaXMub2JqZWN0TW9kZSB8fCAhIW9wdGlvbnMucmVhZGFibGVPYmplY3RNb2RlO1xuXG4gIC8vIHRoZSBwb2ludCBhdCB3aGljaCBpdCBzdG9wcyBjYWxsaW5nIF9yZWFkKCkgdG8gZmlsbCB0aGUgYnVmZmVyXG4gIC8vIE5vdGU6IDAgaXMgYSB2YWxpZCB2YWx1ZSwgbWVhbnMgXCJkb24ndCBjYWxsIF9yZWFkIHByZWVtcHRpdmVseSBldmVyXCJcbiAgdmFyIGh3bSA9IG9wdGlvbnMuaGlnaFdhdGVyTWFyaztcbiAgdmFyIHJlYWRhYmxlSHdtID0gb3B0aW9ucy5yZWFkYWJsZUhpZ2hXYXRlck1hcms7XG4gIHZhciBkZWZhdWx0SHdtID0gdGhpcy5vYmplY3RNb2RlID8gMTYgOiAxNiAqIDEwMjQ7XG5cbiAgaWYgKGh3bSB8fCBod20gPT09IDApIHRoaXMuaGlnaFdhdGVyTWFyayA9IGh3bTtlbHNlIGlmIChpc0R1cGxleCAmJiAocmVhZGFibGVId20gfHwgcmVhZGFibGVId20gPT09IDApKSB0aGlzLmhpZ2hXYXRlck1hcmsgPSByZWFkYWJsZUh3bTtlbHNlIHRoaXMuaGlnaFdhdGVyTWFyayA9IGRlZmF1bHRId207XG5cbiAgLy8gY2FzdCB0byBpbnRzLlxuICB0aGlzLmhpZ2hXYXRlck1hcmsgPSBNYXRoLmZsb29yKHRoaXMuaGlnaFdhdGVyTWFyayk7XG5cbiAgLy8gQSBsaW5rZWQgbGlzdCBpcyB1c2VkIHRvIHN0b3JlIGRhdGEgY2h1bmtzIGluc3RlYWQgb2YgYW4gYXJyYXkgYmVjYXVzZSB0aGVcbiAgLy8gbGlua2VkIGxpc3QgY2FuIHJlbW92ZSBlbGVtZW50cyBmcm9tIHRoZSBiZWdpbm5pbmcgZmFzdGVyIHRoYW5cbiAgLy8gYXJyYXkuc2hpZnQoKVxuICB0aGlzLmJ1ZmZlciA9IG5ldyBCdWZmZXJMaXN0KCk7XG4gIHRoaXMubGVuZ3RoID0gMDtcbiAgdGhpcy5waXBlcyA9IG51bGw7XG4gIHRoaXMucGlwZXNDb3VudCA9IDA7XG4gIHRoaXMuZmxvd2luZyA9IG51bGw7XG4gIHRoaXMuZW5kZWQgPSBmYWxzZTtcbiAgdGhpcy5lbmRFbWl0dGVkID0gZmFsc2U7XG4gIHRoaXMucmVhZGluZyA9IGZhbHNlO1xuXG4gIC8vIGEgZmxhZyB0byBiZSBhYmxlIHRvIHRlbGwgaWYgdGhlIGV2ZW50ICdyZWFkYWJsZScvJ2RhdGEnIGlzIGVtaXR0ZWRcbiAgLy8gaW1tZWRpYXRlbHksIG9yIG9uIGEgbGF0ZXIgdGljay4gIFdlIHNldCB0aGlzIHRvIHRydWUgYXQgZmlyc3QsIGJlY2F1c2VcbiAgLy8gYW55IGFjdGlvbnMgdGhhdCBzaG91bGRuJ3QgaGFwcGVuIHVudGlsIFwibGF0ZXJcIiBzaG91bGQgZ2VuZXJhbGx5IGFsc29cbiAgLy8gbm90IGhhcHBlbiBiZWZvcmUgdGhlIGZpcnN0IHJlYWQgY2FsbC5cbiAgdGhpcy5zeW5jID0gdHJ1ZTtcblxuICAvLyB3aGVuZXZlciB3ZSByZXR1cm4gbnVsbCwgdGhlbiB3ZSBzZXQgYSBmbGFnIHRvIHNheVxuICAvLyB0aGF0IHdlJ3JlIGF3YWl0aW5nIGEgJ3JlYWRhYmxlJyBldmVudCBlbWlzc2lvbi5cbiAgdGhpcy5uZWVkUmVhZGFibGUgPSBmYWxzZTtcbiAgdGhpcy5lbWl0dGVkUmVhZGFibGUgPSBmYWxzZTtcbiAgdGhpcy5yZWFkYWJsZUxpc3RlbmluZyA9IGZhbHNlO1xuICB0aGlzLnJlc3VtZVNjaGVkdWxlZCA9IGZhbHNlO1xuXG4gIC8vIGhhcyBpdCBiZWVuIGRlc3Ryb3llZFxuICB0aGlzLmRlc3Ryb3llZCA9IGZhbHNlO1xuXG4gIC8vIENyeXB0byBpcyBraW5kIG9mIG9sZCBhbmQgY3J1c3R5LiAgSGlzdG9yaWNhbGx5LCBpdHMgZGVmYXVsdCBzdHJpbmdcbiAgLy8gZW5jb2RpbmcgaXMgJ2JpbmFyeScgc28gd2UgaGF2ZSB0byBtYWtlIHRoaXMgY29uZmlndXJhYmxlLlxuICAvLyBFdmVyeXRoaW5nIGVsc2UgaW4gdGhlIHVuaXZlcnNlIHVzZXMgJ3V0ZjgnLCB0aG91Z2guXG4gIHRoaXMuZGVmYXVsdEVuY29kaW5nID0gb3B0aW9ucy5kZWZhdWx0RW5jb2RpbmcgfHwgJ3V0ZjgnO1xuXG4gIC8vIHRoZSBudW1iZXIgb2Ygd3JpdGVycyB0aGF0IGFyZSBhd2FpdGluZyBhIGRyYWluIGV2ZW50IGluIC5waXBlKClzXG4gIHRoaXMuYXdhaXREcmFpbiA9IDA7XG5cbiAgLy8gaWYgdHJ1ZSwgYSBtYXliZVJlYWRNb3JlIGhhcyBiZWVuIHNjaGVkdWxlZFxuICB0aGlzLnJlYWRpbmdNb3JlID0gZmFsc2U7XG5cbiAgdGhpcy5kZWNvZGVyID0gbnVsbDtcbiAgdGhpcy5lbmNvZGluZyA9IG51bGw7XG4gIGlmIChvcHRpb25zLmVuY29kaW5nKSB7XG4gICAgaWYgKCFTdHJpbmdEZWNvZGVyKSBTdHJpbmdEZWNvZGVyID0gcmVxdWlyZSgnc3RyaW5nX2RlY29kZXIvJykuU3RyaW5nRGVjb2RlcjtcbiAgICB0aGlzLmRlY29kZXIgPSBuZXcgU3RyaW5nRGVjb2RlcihvcHRpb25zLmVuY29kaW5nKTtcbiAgICB0aGlzLmVuY29kaW5nID0gb3B0aW9ucy5lbmNvZGluZztcbiAgfVxufVxuXG5mdW5jdGlvbiBSZWFkYWJsZShvcHRpb25zKSB7XG4gIER1cGxleCA9IER1cGxleCB8fCByZXF1aXJlKCcuL19zdHJlYW1fZHVwbGV4Jyk7XG5cbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFJlYWRhYmxlKSkgcmV0dXJuIG5ldyBSZWFkYWJsZShvcHRpb25zKTtcblxuICB0aGlzLl9yZWFkYWJsZVN0YXRlID0gbmV3IFJlYWRhYmxlU3RhdGUob3B0aW9ucywgdGhpcyk7XG5cbiAgLy8gbGVnYWN5XG4gIHRoaXMucmVhZGFibGUgPSB0cnVlO1xuXG4gIGlmIChvcHRpb25zKSB7XG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLnJlYWQgPT09ICdmdW5jdGlvbicpIHRoaXMuX3JlYWQgPSBvcHRpb25zLnJlYWQ7XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMuZGVzdHJveSA9PT0gJ2Z1bmN0aW9uJykgdGhpcy5fZGVzdHJveSA9IG9wdGlvbnMuZGVzdHJveTtcbiAgfVxuXG4gIFN0cmVhbS5jYWxsKHRoaXMpO1xufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoUmVhZGFibGUucHJvdG90eXBlLCAnZGVzdHJveWVkJywge1xuICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5fcmVhZGFibGVTdGF0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9yZWFkYWJsZVN0YXRlLmRlc3Ryb3llZDtcbiAgfSxcbiAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAvLyB3ZSBpZ25vcmUgdGhlIHZhbHVlIGlmIHRoZSBzdHJlYW1cbiAgICAvLyBoYXMgbm90IGJlZW4gaW5pdGlhbGl6ZWQgeWV0XG4gICAgaWYgKCF0aGlzLl9yZWFkYWJsZVN0YXRlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gYmFja3dhcmQgY29tcGF0aWJpbGl0eSwgdGhlIHVzZXIgaXMgZXhwbGljaXRseVxuICAgIC8vIG1hbmFnaW5nIGRlc3Ryb3llZFxuICAgIHRoaXMuX3JlYWRhYmxlU3RhdGUuZGVzdHJveWVkID0gdmFsdWU7XG4gIH1cbn0pO1xuXG5SZWFkYWJsZS5wcm90b3R5cGUuZGVzdHJveSA9IGRlc3Ryb3lJbXBsLmRlc3Ryb3k7XG5SZWFkYWJsZS5wcm90b3R5cGUuX3VuZGVzdHJveSA9IGRlc3Ryb3lJbXBsLnVuZGVzdHJveTtcblJlYWRhYmxlLnByb3RvdHlwZS5fZGVzdHJveSA9IGZ1bmN0aW9uIChlcnIsIGNiKSB7XG4gIHRoaXMucHVzaChudWxsKTtcbiAgY2IoZXJyKTtcbn07XG5cbi8vIE1hbnVhbGx5IHNob3ZlIHNvbWV0aGluZyBpbnRvIHRoZSByZWFkKCkgYnVmZmVyLlxuLy8gVGhpcyByZXR1cm5zIHRydWUgaWYgdGhlIGhpZ2hXYXRlck1hcmsgaGFzIG5vdCBiZWVuIGhpdCB5ZXQsXG4vLyBzaW1pbGFyIHRvIGhvdyBXcml0YWJsZS53cml0ZSgpIHJldHVybnMgdHJ1ZSBpZiB5b3Ugc2hvdWxkXG4vLyB3cml0ZSgpIHNvbWUgbW9yZS5cblJlYWRhYmxlLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKGNodW5rLCBlbmNvZGluZykge1xuICB2YXIgc3RhdGUgPSB0aGlzLl9yZWFkYWJsZVN0YXRlO1xuICB2YXIgc2tpcENodW5rQ2hlY2s7XG5cbiAgaWYgKCFzdGF0ZS5vYmplY3RNb2RlKSB7XG4gICAgaWYgKHR5cGVvZiBjaHVuayA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGVuY29kaW5nID0gZW5jb2RpbmcgfHwgc3RhdGUuZGVmYXVsdEVuY29kaW5nO1xuICAgICAgaWYgKGVuY29kaW5nICE9PSBzdGF0ZS5lbmNvZGluZykge1xuICAgICAgICBjaHVuayA9IEJ1ZmZlci5mcm9tKGNodW5rLCBlbmNvZGluZyk7XG4gICAgICAgIGVuY29kaW5nID0gJyc7XG4gICAgICB9XG4gICAgICBza2lwQ2h1bmtDaGVjayA9IHRydWU7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHNraXBDaHVua0NoZWNrID0gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiByZWFkYWJsZUFkZENodW5rKHRoaXMsIGNodW5rLCBlbmNvZGluZywgZmFsc2UsIHNraXBDaHVua0NoZWNrKTtcbn07XG5cbi8vIFVuc2hpZnQgc2hvdWxkICphbHdheXMqIGJlIHNvbWV0aGluZyBkaXJlY3RseSBvdXQgb2YgcmVhZCgpXG5SZWFkYWJsZS5wcm90b3R5cGUudW5zaGlmdCA9IGZ1bmN0aW9uIChjaHVuaykge1xuICByZXR1cm4gcmVhZGFibGVBZGRDaHVuayh0aGlzLCBjaHVuaywgbnVsbCwgdHJ1ZSwgZmFsc2UpO1xufTtcblxuZnVuY3Rpb24gcmVhZGFibGVBZGRDaHVuayhzdHJlYW0sIGNodW5rLCBlbmNvZGluZywgYWRkVG9Gcm9udCwgc2tpcENodW5rQ2hlY2spIHtcbiAgdmFyIHN0YXRlID0gc3RyZWFtLl9yZWFkYWJsZVN0YXRlO1xuICBpZiAoY2h1bmsgPT09IG51bGwpIHtcbiAgICBzdGF0ZS5yZWFkaW5nID0gZmFsc2U7XG4gICAgb25Fb2ZDaHVuayhzdHJlYW0sIHN0YXRlKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgZXI7XG4gICAgaWYgKCFza2lwQ2h1bmtDaGVjaykgZXIgPSBjaHVua0ludmFsaWQoc3RhdGUsIGNodW5rKTtcbiAgICBpZiAoZXIpIHtcbiAgICAgIHN0cmVhbS5lbWl0KCdlcnJvcicsIGVyKTtcbiAgICB9IGVsc2UgaWYgKHN0YXRlLm9iamVjdE1vZGUgfHwgY2h1bmsgJiYgY2h1bmsubGVuZ3RoID4gMCkge1xuICAgICAgaWYgKHR5cGVvZiBjaHVuayAhPT0gJ3N0cmluZycgJiYgIXN0YXRlLm9iamVjdE1vZGUgJiYgT2JqZWN0LmdldFByb3RvdHlwZU9mKGNodW5rKSAhPT0gQnVmZmVyLnByb3RvdHlwZSkge1xuICAgICAgICBjaHVuayA9IF91aW50OEFycmF5VG9CdWZmZXIoY2h1bmspO1xuICAgICAgfVxuXG4gICAgICBpZiAoYWRkVG9Gcm9udCkge1xuICAgICAgICBpZiAoc3RhdGUuZW5kRW1pdHRlZCkgc3RyZWFtLmVtaXQoJ2Vycm9yJywgbmV3IEVycm9yKCdzdHJlYW0udW5zaGlmdCgpIGFmdGVyIGVuZCBldmVudCcpKTtlbHNlIGFkZENodW5rKHN0cmVhbSwgc3RhdGUsIGNodW5rLCB0cnVlKTtcbiAgICAgIH0gZWxzZSBpZiAoc3RhdGUuZW5kZWQpIHtcbiAgICAgICAgc3RyZWFtLmVtaXQoJ2Vycm9yJywgbmV3IEVycm9yKCdzdHJlYW0ucHVzaCgpIGFmdGVyIEVPRicpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0YXRlLnJlYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgaWYgKHN0YXRlLmRlY29kZXIgJiYgIWVuY29kaW5nKSB7XG4gICAgICAgICAgY2h1bmsgPSBzdGF0ZS5kZWNvZGVyLndyaXRlKGNodW5rKTtcbiAgICAgICAgICBpZiAoc3RhdGUub2JqZWN0TW9kZSB8fCBjaHVuay5sZW5ndGggIT09IDApIGFkZENodW5rKHN0cmVhbSwgc3RhdGUsIGNodW5rLCBmYWxzZSk7ZWxzZSBtYXliZVJlYWRNb3JlKHN0cmVhbSwgc3RhdGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFkZENodW5rKHN0cmVhbSwgc3RhdGUsIGNodW5rLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCFhZGRUb0Zyb250KSB7XG4gICAgICBzdGF0ZS5yZWFkaW5nID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5lZWRNb3JlRGF0YShzdGF0ZSk7XG59XG5cbmZ1bmN0aW9uIGFkZENodW5rKHN0cmVhbSwgc3RhdGUsIGNodW5rLCBhZGRUb0Zyb250KSB7XG4gIGlmIChzdGF0ZS5mbG93aW5nICYmIHN0YXRlLmxlbmd0aCA9PT0gMCAmJiAhc3RhdGUuc3luYykge1xuICAgIHN0cmVhbS5lbWl0KCdkYXRhJywgY2h1bmspO1xuICAgIHN0cmVhbS5yZWFkKDApO1xuICB9IGVsc2Uge1xuICAgIC8vIHVwZGF0ZSB0aGUgYnVmZmVyIGluZm8uXG4gICAgc3RhdGUubGVuZ3RoICs9IHN0YXRlLm9iamVjdE1vZGUgPyAxIDogY2h1bmsubGVuZ3RoO1xuICAgIGlmIChhZGRUb0Zyb250KSBzdGF0ZS5idWZmZXIudW5zaGlmdChjaHVuayk7ZWxzZSBzdGF0ZS5idWZmZXIucHVzaChjaHVuayk7XG5cbiAgICBpZiAoc3RhdGUubmVlZFJlYWRhYmxlKSBlbWl0UmVhZGFibGUoc3RyZWFtKTtcbiAgfVxuICBtYXliZVJlYWRNb3JlKHN0cmVhbSwgc3RhdGUpO1xufVxuXG5mdW5jdGlvbiBjaHVua0ludmFsaWQoc3RhdGUsIGNodW5rKSB7XG4gIHZhciBlcjtcbiAgaWYgKCFfaXNVaW50OEFycmF5KGNodW5rKSAmJiB0eXBlb2YgY2h1bmsgIT09ICdzdHJpbmcnICYmIGNodW5rICE9PSB1bmRlZmluZWQgJiYgIXN0YXRlLm9iamVjdE1vZGUpIHtcbiAgICBlciA9IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgbm9uLXN0cmluZy9idWZmZXIgY2h1bmsnKTtcbiAgfVxuICByZXR1cm4gZXI7XG59XG5cbi8vIGlmIGl0J3MgcGFzdCB0aGUgaGlnaCB3YXRlciBtYXJrLCB3ZSBjYW4gcHVzaCBpbiBzb21lIG1vcmUuXG4vLyBBbHNvLCBpZiB3ZSBoYXZlIG5vIGRhdGEgeWV0LCB3ZSBjYW4gc3RhbmQgc29tZVxuLy8gbW9yZSBieXRlcy4gIFRoaXMgaXMgdG8gd29yayBhcm91bmQgY2FzZXMgd2hlcmUgaHdtPTAsXG4vLyBzdWNoIGFzIHRoZSByZXBsLiAgQWxzbywgaWYgdGhlIHB1c2goKSB0cmlnZ2VyZWQgYVxuLy8gcmVhZGFibGUgZXZlbnQsIGFuZCB0aGUgdXNlciBjYWxsZWQgcmVhZChsYXJnZU51bWJlcikgc3VjaCB0aGF0XG4vLyBuZWVkUmVhZGFibGUgd2FzIHNldCwgdGhlbiB3ZSBvdWdodCB0byBwdXNoIG1vcmUsIHNvIHRoYXQgYW5vdGhlclxuLy8gJ3JlYWRhYmxlJyBldmVudCB3aWxsIGJlIHRyaWdnZXJlZC5cbmZ1bmN0aW9uIG5lZWRNb3JlRGF0YShzdGF0ZSkge1xuICByZXR1cm4gIXN0YXRlLmVuZGVkICYmIChzdGF0ZS5uZWVkUmVhZGFibGUgfHwgc3RhdGUubGVuZ3RoIDwgc3RhdGUuaGlnaFdhdGVyTWFyayB8fCBzdGF0ZS5sZW5ndGggPT09IDApO1xufVxuXG5SZWFkYWJsZS5wcm90b3R5cGUuaXNQYXVzZWQgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLl9yZWFkYWJsZVN0YXRlLmZsb3dpbmcgPT09IGZhbHNlO1xufTtcblxuLy8gYmFja3dhcmRzIGNvbXBhdGliaWxpdHkuXG5SZWFkYWJsZS5wcm90b3R5cGUuc2V0RW5jb2RpbmcgPSBmdW5jdGlvbiAoZW5jKSB7XG4gIGlmICghU3RyaW5nRGVjb2RlcikgU3RyaW5nRGVjb2RlciA9IHJlcXVpcmUoJ3N0cmluZ19kZWNvZGVyLycpLlN0cmluZ0RlY29kZXI7XG4gIHRoaXMuX3JlYWRhYmxlU3RhdGUuZGVjb2RlciA9IG5ldyBTdHJpbmdEZWNvZGVyKGVuYyk7XG4gIHRoaXMuX3JlYWRhYmxlU3RhdGUuZW5jb2RpbmcgPSBlbmM7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gRG9uJ3QgcmFpc2UgdGhlIGh3bSA+IDhNQlxudmFyIE1BWF9IV00gPSAweDgwMDAwMDtcbmZ1bmN0aW9uIGNvbXB1dGVOZXdIaWdoV2F0ZXJNYXJrKG4pIHtcbiAgaWYgKG4gPj0gTUFYX0hXTSkge1xuICAgIG4gPSBNQVhfSFdNO1xuICB9IGVsc2Uge1xuICAgIC8vIEdldCB0aGUgbmV4dCBoaWdoZXN0IHBvd2VyIG9mIDIgdG8gcHJldmVudCBpbmNyZWFzaW5nIGh3bSBleGNlc3NpdmVseSBpblxuICAgIC8vIHRpbnkgYW1vdW50c1xuICAgIG4tLTtcbiAgICBuIHw9IG4gPj4+IDE7XG4gICAgbiB8PSBuID4+PiAyO1xuICAgIG4gfD0gbiA+Pj4gNDtcbiAgICBuIHw9IG4gPj4+IDg7XG4gICAgbiB8PSBuID4+PiAxNjtcbiAgICBuKys7XG4gIH1cbiAgcmV0dXJuIG47XG59XG5cbi8vIFRoaXMgZnVuY3Rpb24gaXMgZGVzaWduZWQgdG8gYmUgaW5saW5hYmxlLCBzbyBwbGVhc2UgdGFrZSBjYXJlIHdoZW4gbWFraW5nXG4vLyBjaGFuZ2VzIHRvIHRoZSBmdW5jdGlvbiBib2R5LlxuZnVuY3Rpb24gaG93TXVjaFRvUmVhZChuLCBzdGF0ZSkge1xuICBpZiAobiA8PSAwIHx8IHN0YXRlLmxlbmd0aCA9PT0gMCAmJiBzdGF0ZS5lbmRlZCkgcmV0dXJuIDA7XG4gIGlmIChzdGF0ZS5vYmplY3RNb2RlKSByZXR1cm4gMTtcbiAgaWYgKG4gIT09IG4pIHtcbiAgICAvLyBPbmx5IGZsb3cgb25lIGJ1ZmZlciBhdCBhIHRpbWVcbiAgICBpZiAoc3RhdGUuZmxvd2luZyAmJiBzdGF0ZS5sZW5ndGgpIHJldHVybiBzdGF0ZS5idWZmZXIuaGVhZC5kYXRhLmxlbmd0aDtlbHNlIHJldHVybiBzdGF0ZS5sZW5ndGg7XG4gIH1cbiAgLy8gSWYgd2UncmUgYXNraW5nIGZvciBtb3JlIHRoYW4gdGhlIGN1cnJlbnQgaHdtLCB0aGVuIHJhaXNlIHRoZSBod20uXG4gIGlmIChuID4gc3RhdGUuaGlnaFdhdGVyTWFyaykgc3RhdGUuaGlnaFdhdGVyTWFyayA9IGNvbXB1dGVOZXdIaWdoV2F0ZXJNYXJrKG4pO1xuICBpZiAobiA8PSBzdGF0ZS5sZW5ndGgpIHJldHVybiBuO1xuICAvLyBEb24ndCBoYXZlIGVub3VnaFxuICBpZiAoIXN0YXRlLmVuZGVkKSB7XG4gICAgc3RhdGUubmVlZFJlYWRhYmxlID0gdHJ1ZTtcbiAgICByZXR1cm4gMDtcbiAgfVxuICByZXR1cm4gc3RhdGUubGVuZ3RoO1xufVxuXG4vLyB5b3UgY2FuIG92ZXJyaWRlIGVpdGhlciB0aGlzIG1ldGhvZCwgb3IgdGhlIGFzeW5jIF9yZWFkKG4pIGJlbG93LlxuUmVhZGFibGUucHJvdG90eXBlLnJlYWQgPSBmdW5jdGlvbiAobikge1xuICBkZWJ1ZygncmVhZCcsIG4pO1xuICBuID0gcGFyc2VJbnQobiwgMTApO1xuICB2YXIgc3RhdGUgPSB0aGlzLl9yZWFkYWJsZVN0YXRlO1xuICB2YXIgbk9yaWcgPSBuO1xuXG4gIGlmIChuICE9PSAwKSBzdGF0ZS5lbWl0dGVkUmVhZGFibGUgPSBmYWxzZTtcblxuICAvLyBpZiB3ZSdyZSBkb2luZyByZWFkKDApIHRvIHRyaWdnZXIgYSByZWFkYWJsZSBldmVudCwgYnV0IHdlXG4gIC8vIGFscmVhZHkgaGF2ZSBhIGJ1bmNoIG9mIGRhdGEgaW4gdGhlIGJ1ZmZlciwgdGhlbiBqdXN0IHRyaWdnZXJcbiAgLy8gdGhlICdyZWFkYWJsZScgZXZlbnQgYW5kIG1vdmUgb24uXG4gIGlmIChuID09PSAwICYmIHN0YXRlLm5lZWRSZWFkYWJsZSAmJiAoc3RhdGUubGVuZ3RoID49IHN0YXRlLmhpZ2hXYXRlck1hcmsgfHwgc3RhdGUuZW5kZWQpKSB7XG4gICAgZGVidWcoJ3JlYWQ6IGVtaXRSZWFkYWJsZScsIHN0YXRlLmxlbmd0aCwgc3RhdGUuZW5kZWQpO1xuICAgIGlmIChzdGF0ZS5sZW5ndGggPT09IDAgJiYgc3RhdGUuZW5kZWQpIGVuZFJlYWRhYmxlKHRoaXMpO2Vsc2UgZW1pdFJlYWRhYmxlKHRoaXMpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgbiA9IGhvd011Y2hUb1JlYWQobiwgc3RhdGUpO1xuXG4gIC8vIGlmIHdlJ3ZlIGVuZGVkLCBhbmQgd2UncmUgbm93IGNsZWFyLCB0aGVuIGZpbmlzaCBpdCB1cC5cbiAgaWYgKG4gPT09IDAgJiYgc3RhdGUuZW5kZWQpIHtcbiAgICBpZiAoc3RhdGUubGVuZ3RoID09PSAwKSBlbmRSZWFkYWJsZSh0aGlzKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIEFsbCB0aGUgYWN0dWFsIGNodW5rIGdlbmVyYXRpb24gbG9naWMgbmVlZHMgdG8gYmVcbiAgLy8gKmJlbG93KiB0aGUgY2FsbCB0byBfcmVhZC4gIFRoZSByZWFzb24gaXMgdGhhdCBpbiBjZXJ0YWluXG4gIC8vIHN5bnRoZXRpYyBzdHJlYW0gY2FzZXMsIHN1Y2ggYXMgcGFzc3Rocm91Z2ggc3RyZWFtcywgX3JlYWRcbiAgLy8gbWF5IGJlIGEgY29tcGxldGVseSBzeW5jaHJvbm91cyBvcGVyYXRpb24gd2hpY2ggbWF5IGNoYW5nZVxuICAvLyB0aGUgc3RhdGUgb2YgdGhlIHJlYWQgYnVmZmVyLCBwcm92aWRpbmcgZW5vdWdoIGRhdGEgd2hlblxuICAvLyBiZWZvcmUgdGhlcmUgd2FzICpub3QqIGVub3VnaC5cbiAgLy9cbiAgLy8gU28sIHRoZSBzdGVwcyBhcmU6XG4gIC8vIDEuIEZpZ3VyZSBvdXQgd2hhdCB0aGUgc3RhdGUgb2YgdGhpbmdzIHdpbGwgYmUgYWZ0ZXIgd2UgZG9cbiAgLy8gYSByZWFkIGZyb20gdGhlIGJ1ZmZlci5cbiAgLy9cbiAgLy8gMi4gSWYgdGhhdCByZXN1bHRpbmcgc3RhdGUgd2lsbCB0cmlnZ2VyIGEgX3JlYWQsIHRoZW4gY2FsbCBfcmVhZC5cbiAgLy8gTm90ZSB0aGF0IHRoaXMgbWF5IGJlIGFzeW5jaHJvbm91cywgb3Igc3luY2hyb25vdXMuICBZZXMsIGl0IGlzXG4gIC8vIGRlZXBseSB1Z2x5IHRvIHdyaXRlIEFQSXMgdGhpcyB3YXksIGJ1dCB0aGF0IHN0aWxsIGRvZXNuJ3QgbWVhblxuICAvLyB0aGF0IHRoZSBSZWFkYWJsZSBjbGFzcyBzaG91bGQgYmVoYXZlIGltcHJvcGVybHksIGFzIHN0cmVhbXMgYXJlXG4gIC8vIGRlc2lnbmVkIHRvIGJlIHN5bmMvYXN5bmMgYWdub3N0aWMuXG4gIC8vIFRha2Ugbm90ZSBpZiB0aGUgX3JlYWQgY2FsbCBpcyBzeW5jIG9yIGFzeW5jIChpZSwgaWYgdGhlIHJlYWQgY2FsbFxuICAvLyBoYXMgcmV0dXJuZWQgeWV0KSwgc28gdGhhdCB3ZSBrbm93IHdoZXRoZXIgb3Igbm90IGl0J3Mgc2FmZSB0byBlbWl0XG4gIC8vICdyZWFkYWJsZScgZXRjLlxuICAvL1xuICAvLyAzLiBBY3R1YWxseSBwdWxsIHRoZSByZXF1ZXN0ZWQgY2h1bmtzIG91dCBvZiB0aGUgYnVmZmVyIGFuZCByZXR1cm4uXG5cbiAgLy8gaWYgd2UgbmVlZCBhIHJlYWRhYmxlIGV2ZW50LCB0aGVuIHdlIG5lZWQgdG8gZG8gc29tZSByZWFkaW5nLlxuICB2YXIgZG9SZWFkID0gc3RhdGUubmVlZFJlYWRhYmxlO1xuICBkZWJ1ZygnbmVlZCByZWFkYWJsZScsIGRvUmVhZCk7XG5cbiAgLy8gaWYgd2UgY3VycmVudGx5IGhhdmUgbGVzcyB0aGFuIHRoZSBoaWdoV2F0ZXJNYXJrLCB0aGVuIGFsc28gcmVhZCBzb21lXG4gIGlmIChzdGF0ZS5sZW5ndGggPT09IDAgfHwgc3RhdGUubGVuZ3RoIC0gbiA8IHN0YXRlLmhpZ2hXYXRlck1hcmspIHtcbiAgICBkb1JlYWQgPSB0cnVlO1xuICAgIGRlYnVnKCdsZW5ndGggbGVzcyB0aGFuIHdhdGVybWFyaycsIGRvUmVhZCk7XG4gIH1cblxuICAvLyBob3dldmVyLCBpZiB3ZSd2ZSBlbmRlZCwgdGhlbiB0aGVyZSdzIG5vIHBvaW50LCBhbmQgaWYgd2UncmUgYWxyZWFkeVxuICAvLyByZWFkaW5nLCB0aGVuIGl0J3MgdW5uZWNlc3NhcnkuXG4gIGlmIChzdGF0ZS5lbmRlZCB8fCBzdGF0ZS5yZWFkaW5nKSB7XG4gICAgZG9SZWFkID0gZmFsc2U7XG4gICAgZGVidWcoJ3JlYWRpbmcgb3IgZW5kZWQnLCBkb1JlYWQpO1xuICB9IGVsc2UgaWYgKGRvUmVhZCkge1xuICAgIGRlYnVnKCdkbyByZWFkJyk7XG4gICAgc3RhdGUucmVhZGluZyA9IHRydWU7XG4gICAgc3RhdGUuc3luYyA9IHRydWU7XG4gICAgLy8gaWYgdGhlIGxlbmd0aCBpcyBjdXJyZW50bHkgemVybywgdGhlbiB3ZSAqbmVlZCogYSByZWFkYWJsZSBldmVudC5cbiAgICBpZiAoc3RhdGUubGVuZ3RoID09PSAwKSBzdGF0ZS5uZWVkUmVhZGFibGUgPSB0cnVlO1xuICAgIC8vIGNhbGwgaW50ZXJuYWwgcmVhZCBtZXRob2RcbiAgICB0aGlzLl9yZWFkKHN0YXRlLmhpZ2hXYXRlck1hcmspO1xuICAgIHN0YXRlLnN5bmMgPSBmYWxzZTtcbiAgICAvLyBJZiBfcmVhZCBwdXNoZWQgZGF0YSBzeW5jaHJvbm91c2x5LCB0aGVuIGByZWFkaW5nYCB3aWxsIGJlIGZhbHNlLFxuICAgIC8vIGFuZCB3ZSBuZWVkIHRvIHJlLWV2YWx1YXRlIGhvdyBtdWNoIGRhdGEgd2UgY2FuIHJldHVybiB0byB0aGUgdXNlci5cbiAgICBpZiAoIXN0YXRlLnJlYWRpbmcpIG4gPSBob3dNdWNoVG9SZWFkKG5PcmlnLCBzdGF0ZSk7XG4gIH1cblxuICB2YXIgcmV0O1xuICBpZiAobiA+IDApIHJldCA9IGZyb21MaXN0KG4sIHN0YXRlKTtlbHNlIHJldCA9IG51bGw7XG5cbiAgaWYgKHJldCA9PT0gbnVsbCkge1xuICAgIHN0YXRlLm5lZWRSZWFkYWJsZSA9IHRydWU7XG4gICAgbiA9IDA7XG4gIH0gZWxzZSB7XG4gICAgc3RhdGUubGVuZ3RoIC09IG47XG4gIH1cblxuICBpZiAoc3RhdGUubGVuZ3RoID09PSAwKSB7XG4gICAgLy8gSWYgd2UgaGF2ZSBub3RoaW5nIGluIHRoZSBidWZmZXIsIHRoZW4gd2Ugd2FudCB0byBrbm93XG4gICAgLy8gYXMgc29vbiBhcyB3ZSAqZG8qIGdldCBzb21ldGhpbmcgaW50byB0aGUgYnVmZmVyLlxuICAgIGlmICghc3RhdGUuZW5kZWQpIHN0YXRlLm5lZWRSZWFkYWJsZSA9IHRydWU7XG5cbiAgICAvLyBJZiB3ZSB0cmllZCB0byByZWFkKCkgcGFzdCB0aGUgRU9GLCB0aGVuIGVtaXQgZW5kIG9uIHRoZSBuZXh0IHRpY2suXG4gICAgaWYgKG5PcmlnICE9PSBuICYmIHN0YXRlLmVuZGVkKSBlbmRSZWFkYWJsZSh0aGlzKTtcbiAgfVxuXG4gIGlmIChyZXQgIT09IG51bGwpIHRoaXMuZW1pdCgnZGF0YScsIHJldCk7XG5cbiAgcmV0dXJuIHJldDtcbn07XG5cbmZ1bmN0aW9uIG9uRW9mQ2h1bmsoc3RyZWFtLCBzdGF0ZSkge1xuICBpZiAoc3RhdGUuZW5kZWQpIHJldHVybjtcbiAgaWYgKHN0YXRlLmRlY29kZXIpIHtcbiAgICB2YXIgY2h1bmsgPSBzdGF0ZS5kZWNvZGVyLmVuZCgpO1xuICAgIGlmIChjaHVuayAmJiBjaHVuay5sZW5ndGgpIHtcbiAgICAgIHN0YXRlLmJ1ZmZlci5wdXNoKGNodW5rKTtcbiAgICAgIHN0YXRlLmxlbmd0aCArPSBzdGF0ZS5vYmplY3RNb2RlID8gMSA6IGNodW5rLmxlbmd0aDtcbiAgICB9XG4gIH1cbiAgc3RhdGUuZW5kZWQgPSB0cnVlO1xuXG4gIC8vIGVtaXQgJ3JlYWRhYmxlJyBub3cgdG8gbWFrZSBzdXJlIGl0IGdldHMgcGlja2VkIHVwLlxuICBlbWl0UmVhZGFibGUoc3RyZWFtKTtcbn1cblxuLy8gRG9uJ3QgZW1pdCByZWFkYWJsZSByaWdodCBhd2F5IGluIHN5bmMgbW9kZSwgYmVjYXVzZSB0aGlzIGNhbiB0cmlnZ2VyXG4vLyBhbm90aGVyIHJlYWQoKSBjYWxsID0+IHN0YWNrIG92ZXJmbG93LiAgVGhpcyB3YXksIGl0IG1pZ2h0IHRyaWdnZXJcbi8vIGEgbmV4dFRpY2sgcmVjdXJzaW9uIHdhcm5pbmcsIGJ1dCB0aGF0J3Mgbm90IHNvIGJhZC5cbmZ1bmN0aW9uIGVtaXRSZWFkYWJsZShzdHJlYW0pIHtcbiAgdmFyIHN0YXRlID0gc3RyZWFtLl9yZWFkYWJsZVN0YXRlO1xuICBzdGF0ZS5uZWVkUmVhZGFibGUgPSBmYWxzZTtcbiAgaWYgKCFzdGF0ZS5lbWl0dGVkUmVhZGFibGUpIHtcbiAgICBkZWJ1ZygnZW1pdFJlYWRhYmxlJywgc3RhdGUuZmxvd2luZyk7XG4gICAgc3RhdGUuZW1pdHRlZFJlYWRhYmxlID0gdHJ1ZTtcbiAgICBpZiAoc3RhdGUuc3luYykgcG5hLm5leHRUaWNrKGVtaXRSZWFkYWJsZV8sIHN0cmVhbSk7ZWxzZSBlbWl0UmVhZGFibGVfKHN0cmVhbSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZW1pdFJlYWRhYmxlXyhzdHJlYW0pIHtcbiAgZGVidWcoJ2VtaXQgcmVhZGFibGUnKTtcbiAgc3RyZWFtLmVtaXQoJ3JlYWRhYmxlJyk7XG4gIGZsb3coc3RyZWFtKTtcbn1cblxuLy8gYXQgdGhpcyBwb2ludCwgdGhlIHVzZXIgaGFzIHByZXN1bWFibHkgc2VlbiB0aGUgJ3JlYWRhYmxlJyBldmVudCxcbi8vIGFuZCBjYWxsZWQgcmVhZCgpIHRvIGNvbnN1bWUgc29tZSBkYXRhLiAgdGhhdCBtYXkgaGF2ZSB0cmlnZ2VyZWRcbi8vIGluIHR1cm4gYW5vdGhlciBfcmVhZChuKSBjYWxsLCBpbiB3aGljaCBjYXNlIHJlYWRpbmcgPSB0cnVlIGlmXG4vLyBpdCdzIGluIHByb2dyZXNzLlxuLy8gSG93ZXZlciwgaWYgd2UncmUgbm90IGVuZGVkLCBvciByZWFkaW5nLCBhbmQgdGhlIGxlbmd0aCA8IGh3bSxcbi8vIHRoZW4gZ28gYWhlYWQgYW5kIHRyeSB0byByZWFkIHNvbWUgbW9yZSBwcmVlbXB0aXZlbHkuXG5mdW5jdGlvbiBtYXliZVJlYWRNb3JlKHN0cmVhbSwgc3RhdGUpIHtcbiAgaWYgKCFzdGF0ZS5yZWFkaW5nTW9yZSkge1xuICAgIHN0YXRlLnJlYWRpbmdNb3JlID0gdHJ1ZTtcbiAgICBwbmEubmV4dFRpY2sobWF5YmVSZWFkTW9yZV8sIHN0cmVhbSwgc3RhdGUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIG1heWJlUmVhZE1vcmVfKHN0cmVhbSwgc3RhdGUpIHtcbiAgdmFyIGxlbiA9IHN0YXRlLmxlbmd0aDtcbiAgd2hpbGUgKCFzdGF0ZS5yZWFkaW5nICYmICFzdGF0ZS5mbG93aW5nICYmICFzdGF0ZS5lbmRlZCAmJiBzdGF0ZS5sZW5ndGggPCBzdGF0ZS5oaWdoV2F0ZXJNYXJrKSB7XG4gICAgZGVidWcoJ21heWJlUmVhZE1vcmUgcmVhZCAwJyk7XG4gICAgc3RyZWFtLnJlYWQoMCk7XG4gICAgaWYgKGxlbiA9PT0gc3RhdGUubGVuZ3RoKVxuICAgICAgLy8gZGlkbid0IGdldCBhbnkgZGF0YSwgc3RvcCBzcGlubmluZy5cbiAgICAgIGJyZWFrO2Vsc2UgbGVuID0gc3RhdGUubGVuZ3RoO1xuICB9XG4gIHN0YXRlLnJlYWRpbmdNb3JlID0gZmFsc2U7XG59XG5cbi8vIGFic3RyYWN0IG1ldGhvZC4gIHRvIGJlIG92ZXJyaWRkZW4gaW4gc3BlY2lmaWMgaW1wbGVtZW50YXRpb24gY2xhc3Nlcy5cbi8vIGNhbGwgY2IoZXIsIGRhdGEpIHdoZXJlIGRhdGEgaXMgPD0gbiBpbiBsZW5ndGguXG4vLyBmb3IgdmlydHVhbCAobm9uLXN0cmluZywgbm9uLWJ1ZmZlcikgc3RyZWFtcywgXCJsZW5ndGhcIiBpcyBzb21ld2hhdFxuLy8gYXJiaXRyYXJ5LCBhbmQgcGVyaGFwcyBub3QgdmVyeSBtZWFuaW5nZnVsLlxuUmVhZGFibGUucHJvdG90eXBlLl9yZWFkID0gZnVuY3Rpb24gKG4pIHtcbiAgdGhpcy5lbWl0KCdlcnJvcicsIG5ldyBFcnJvcignX3JlYWQoKSBpcyBub3QgaW1wbGVtZW50ZWQnKSk7XG59O1xuXG5SZWFkYWJsZS5wcm90b3R5cGUucGlwZSA9IGZ1bmN0aW9uIChkZXN0LCBwaXBlT3B0cykge1xuICB2YXIgc3JjID0gdGhpcztcbiAgdmFyIHN0YXRlID0gdGhpcy5fcmVhZGFibGVTdGF0ZTtcblxuICBzd2l0Y2ggKHN0YXRlLnBpcGVzQ291bnQpIHtcbiAgICBjYXNlIDA6XG4gICAgICBzdGF0ZS5waXBlcyA9IGRlc3Q7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDE6XG4gICAgICBzdGF0ZS5waXBlcyA9IFtzdGF0ZS5waXBlcywgZGVzdF07XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgc3RhdGUucGlwZXMucHVzaChkZXN0KTtcbiAgICAgIGJyZWFrO1xuICB9XG4gIHN0YXRlLnBpcGVzQ291bnQgKz0gMTtcbiAgZGVidWcoJ3BpcGUgY291bnQ9JWQgb3B0cz0laicsIHN0YXRlLnBpcGVzQ291bnQsIHBpcGVPcHRzKTtcblxuICB2YXIgZG9FbmQgPSAoIXBpcGVPcHRzIHx8IHBpcGVPcHRzLmVuZCAhPT0gZmFsc2UpICYmIGRlc3QgIT09IHByb2Nlc3Muc3Rkb3V0ICYmIGRlc3QgIT09IHByb2Nlc3Muc3RkZXJyO1xuXG4gIHZhciBlbmRGbiA9IGRvRW5kID8gb25lbmQgOiB1bnBpcGU7XG4gIGlmIChzdGF0ZS5lbmRFbWl0dGVkKSBwbmEubmV4dFRpY2soZW5kRm4pO2Vsc2Ugc3JjLm9uY2UoJ2VuZCcsIGVuZEZuKTtcblxuICBkZXN0Lm9uKCd1bnBpcGUnLCBvbnVucGlwZSk7XG4gIGZ1bmN0aW9uIG9udW5waXBlKHJlYWRhYmxlLCB1bnBpcGVJbmZvKSB7XG4gICAgZGVidWcoJ29udW5waXBlJyk7XG4gICAgaWYgKHJlYWRhYmxlID09PSBzcmMpIHtcbiAgICAgIGlmICh1bnBpcGVJbmZvICYmIHVucGlwZUluZm8uaGFzVW5waXBlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgdW5waXBlSW5mby5oYXNVbnBpcGVkID0gdHJ1ZTtcbiAgICAgICAgY2xlYW51cCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uZW5kKCkge1xuICAgIGRlYnVnKCdvbmVuZCcpO1xuICAgIGRlc3QuZW5kKCk7XG4gIH1cblxuICAvLyB3aGVuIHRoZSBkZXN0IGRyYWlucywgaXQgcmVkdWNlcyB0aGUgYXdhaXREcmFpbiBjb3VudGVyXG4gIC8vIG9uIHRoZSBzb3VyY2UuICBUaGlzIHdvdWxkIGJlIG1vcmUgZWxlZ2FudCB3aXRoIGEgLm9uY2UoKVxuICAvLyBoYW5kbGVyIGluIGZsb3coKSwgYnV0IGFkZGluZyBhbmQgcmVtb3ZpbmcgcmVwZWF0ZWRseSBpc1xuICAvLyB0b28gc2xvdy5cbiAgdmFyIG9uZHJhaW4gPSBwaXBlT25EcmFpbihzcmMpO1xuICBkZXN0Lm9uKCdkcmFpbicsIG9uZHJhaW4pO1xuXG4gIHZhciBjbGVhbmVkVXAgPSBmYWxzZTtcbiAgZnVuY3Rpb24gY2xlYW51cCgpIHtcbiAgICBkZWJ1ZygnY2xlYW51cCcpO1xuICAgIC8vIGNsZWFudXAgZXZlbnQgaGFuZGxlcnMgb25jZSB0aGUgcGlwZSBpcyBicm9rZW5cbiAgICBkZXN0LnJlbW92ZUxpc3RlbmVyKCdjbG9zZScsIG9uY2xvc2UpO1xuICAgIGRlc3QucmVtb3ZlTGlzdGVuZXIoJ2ZpbmlzaCcsIG9uZmluaXNoKTtcbiAgICBkZXN0LnJlbW92ZUxpc3RlbmVyKCdkcmFpbicsIG9uZHJhaW4pO1xuICAgIGRlc3QucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJywgb25lcnJvcik7XG4gICAgZGVzdC5yZW1vdmVMaXN0ZW5lcigndW5waXBlJywgb251bnBpcGUpO1xuICAgIHNyYy5yZW1vdmVMaXN0ZW5lcignZW5kJywgb25lbmQpO1xuICAgIHNyYy5yZW1vdmVMaXN0ZW5lcignZW5kJywgdW5waXBlKTtcbiAgICBzcmMucmVtb3ZlTGlzdGVuZXIoJ2RhdGEnLCBvbmRhdGEpO1xuXG4gICAgY2xlYW5lZFVwID0gdHJ1ZTtcblxuICAgIC8vIGlmIHRoZSByZWFkZXIgaXMgd2FpdGluZyBmb3IgYSBkcmFpbiBldmVudCBmcm9tIHRoaXNcbiAgICAvLyBzcGVjaWZpYyB3cml0ZXIsIHRoZW4gaXQgd291bGQgY2F1c2UgaXQgdG8gbmV2ZXIgc3RhcnRcbiAgICAvLyBmbG93aW5nIGFnYWluLlxuICAgIC8vIFNvLCBpZiB0aGlzIGlzIGF3YWl0aW5nIGEgZHJhaW4sIHRoZW4gd2UganVzdCBjYWxsIGl0IG5vdy5cbiAgICAvLyBJZiB3ZSBkb24ndCBrbm93LCB0aGVuIGFzc3VtZSB0aGF0IHdlIGFyZSB3YWl0aW5nIGZvciBvbmUuXG4gICAgaWYgKHN0YXRlLmF3YWl0RHJhaW4gJiYgKCFkZXN0Ll93cml0YWJsZVN0YXRlIHx8IGRlc3QuX3dyaXRhYmxlU3RhdGUubmVlZERyYWluKSkgb25kcmFpbigpO1xuICB9XG5cbiAgLy8gSWYgdGhlIHVzZXIgcHVzaGVzIG1vcmUgZGF0YSB3aGlsZSB3ZSdyZSB3cml0aW5nIHRvIGRlc3QgdGhlbiB3ZSdsbCBlbmQgdXBcbiAgLy8gaW4gb25kYXRhIGFnYWluLiBIb3dldmVyLCB3ZSBvbmx5IHdhbnQgdG8gaW5jcmVhc2UgYXdhaXREcmFpbiBvbmNlIGJlY2F1c2VcbiAgLy8gZGVzdCB3aWxsIG9ubHkgZW1pdCBvbmUgJ2RyYWluJyBldmVudCBmb3IgdGhlIG11bHRpcGxlIHdyaXRlcy5cbiAgLy8gPT4gSW50cm9kdWNlIGEgZ3VhcmQgb24gaW5jcmVhc2luZyBhd2FpdERyYWluLlxuICB2YXIgaW5jcmVhc2VkQXdhaXREcmFpbiA9IGZhbHNlO1xuICBzcmMub24oJ2RhdGEnLCBvbmRhdGEpO1xuICBmdW5jdGlvbiBvbmRhdGEoY2h1bmspIHtcbiAgICBkZWJ1Zygnb25kYXRhJyk7XG4gICAgaW5jcmVhc2VkQXdhaXREcmFpbiA9IGZhbHNlO1xuICAgIHZhciByZXQgPSBkZXN0LndyaXRlKGNodW5rKTtcbiAgICBpZiAoZmFsc2UgPT09IHJldCAmJiAhaW5jcmVhc2VkQXdhaXREcmFpbikge1xuICAgICAgLy8gSWYgdGhlIHVzZXIgdW5waXBlZCBkdXJpbmcgYGRlc3Qud3JpdGUoKWAsIGl0IGlzIHBvc3NpYmxlXG4gICAgICAvLyB0byBnZXQgc3R1Y2sgaW4gYSBwZXJtYW5lbnRseSBwYXVzZWQgc3RhdGUgaWYgdGhhdCB3cml0ZVxuICAgICAgLy8gYWxzbyByZXR1cm5lZCBmYWxzZS5cbiAgICAgIC8vID0+IENoZWNrIHdoZXRoZXIgYGRlc3RgIGlzIHN0aWxsIGEgcGlwaW5nIGRlc3RpbmF0aW9uLlxuICAgICAgaWYgKChzdGF0ZS5waXBlc0NvdW50ID09PSAxICYmIHN0YXRlLnBpcGVzID09PSBkZXN0IHx8IHN0YXRlLnBpcGVzQ291bnQgPiAxICYmIGluZGV4T2Yoc3RhdGUucGlwZXMsIGRlc3QpICE9PSAtMSkgJiYgIWNsZWFuZWRVcCkge1xuICAgICAgICBkZWJ1ZygnZmFsc2Ugd3JpdGUgcmVzcG9uc2UsIHBhdXNlJywgc3JjLl9yZWFkYWJsZVN0YXRlLmF3YWl0RHJhaW4pO1xuICAgICAgICBzcmMuX3JlYWRhYmxlU3RhdGUuYXdhaXREcmFpbisrO1xuICAgICAgICBpbmNyZWFzZWRBd2FpdERyYWluID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHNyYy5wYXVzZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGlmIHRoZSBkZXN0IGhhcyBhbiBlcnJvciwgdGhlbiBzdG9wIHBpcGluZyBpbnRvIGl0LlxuICAvLyBob3dldmVyLCBkb24ndCBzdXBwcmVzcyB0aGUgdGhyb3dpbmcgYmVoYXZpb3IgZm9yIHRoaXMuXG4gIGZ1bmN0aW9uIG9uZXJyb3IoZXIpIHtcbiAgICBkZWJ1Zygnb25lcnJvcicsIGVyKTtcbiAgICB1bnBpcGUoKTtcbiAgICBkZXN0LnJlbW92ZUxpc3RlbmVyKCdlcnJvcicsIG9uZXJyb3IpO1xuICAgIGlmIChFRWxpc3RlbmVyQ291bnQoZGVzdCwgJ2Vycm9yJykgPT09IDApIGRlc3QuZW1pdCgnZXJyb3InLCBlcik7XG4gIH1cblxuICAvLyBNYWtlIHN1cmUgb3VyIGVycm9yIGhhbmRsZXIgaXMgYXR0YWNoZWQgYmVmb3JlIHVzZXJsYW5kIG9uZXMuXG4gIHByZXBlbmRMaXN0ZW5lcihkZXN0LCAnZXJyb3InLCBvbmVycm9yKTtcblxuICAvLyBCb3RoIGNsb3NlIGFuZCBmaW5pc2ggc2hvdWxkIHRyaWdnZXIgdW5waXBlLCBidXQgb25seSBvbmNlLlxuICBmdW5jdGlvbiBvbmNsb3NlKCkge1xuICAgIGRlc3QucmVtb3ZlTGlzdGVuZXIoJ2ZpbmlzaCcsIG9uZmluaXNoKTtcbiAgICB1bnBpcGUoKTtcbiAgfVxuICBkZXN0Lm9uY2UoJ2Nsb3NlJywgb25jbG9zZSk7XG4gIGZ1bmN0aW9uIG9uZmluaXNoKCkge1xuICAgIGRlYnVnKCdvbmZpbmlzaCcpO1xuICAgIGRlc3QucmVtb3ZlTGlzdGVuZXIoJ2Nsb3NlJywgb25jbG9zZSk7XG4gICAgdW5waXBlKCk7XG4gIH1cbiAgZGVzdC5vbmNlKCdmaW5pc2gnLCBvbmZpbmlzaCk7XG5cbiAgZnVuY3Rpb24gdW5waXBlKCkge1xuICAgIGRlYnVnKCd1bnBpcGUnKTtcbiAgICBzcmMudW5waXBlKGRlc3QpO1xuICB9XG5cbiAgLy8gdGVsbCB0aGUgZGVzdCB0aGF0IGl0J3MgYmVpbmcgcGlwZWQgdG9cbiAgZGVzdC5lbWl0KCdwaXBlJywgc3JjKTtcblxuICAvLyBzdGFydCB0aGUgZmxvdyBpZiBpdCBoYXNuJ3QgYmVlbiBzdGFydGVkIGFscmVhZHkuXG4gIGlmICghc3RhdGUuZmxvd2luZykge1xuICAgIGRlYnVnKCdwaXBlIHJlc3VtZScpO1xuICAgIHNyYy5yZXN1bWUoKTtcbiAgfVxuXG4gIHJldHVybiBkZXN0O1xufTtcblxuZnVuY3Rpb24gcGlwZU9uRHJhaW4oc3JjKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHN0YXRlID0gc3JjLl9yZWFkYWJsZVN0YXRlO1xuICAgIGRlYnVnKCdwaXBlT25EcmFpbicsIHN0YXRlLmF3YWl0RHJhaW4pO1xuICAgIGlmIChzdGF0ZS5hd2FpdERyYWluKSBzdGF0ZS5hd2FpdERyYWluLS07XG4gICAgaWYgKHN0YXRlLmF3YWl0RHJhaW4gPT09IDAgJiYgRUVsaXN0ZW5lckNvdW50KHNyYywgJ2RhdGEnKSkge1xuICAgICAgc3RhdGUuZmxvd2luZyA9IHRydWU7XG4gICAgICBmbG93KHNyYyk7XG4gICAgfVxuICB9O1xufVxuXG5SZWFkYWJsZS5wcm90b3R5cGUudW5waXBlID0gZnVuY3Rpb24gKGRlc3QpIHtcbiAgdmFyIHN0YXRlID0gdGhpcy5fcmVhZGFibGVTdGF0ZTtcbiAgdmFyIHVucGlwZUluZm8gPSB7IGhhc1VucGlwZWQ6IGZhbHNlIH07XG5cbiAgLy8gaWYgd2UncmUgbm90IHBpcGluZyBhbnl3aGVyZSwgdGhlbiBkbyBub3RoaW5nLlxuICBpZiAoc3RhdGUucGlwZXNDb3VudCA9PT0gMCkgcmV0dXJuIHRoaXM7XG5cbiAgLy8ganVzdCBvbmUgZGVzdGluYXRpb24uICBtb3N0IGNvbW1vbiBjYXNlLlxuICBpZiAoc3RhdGUucGlwZXNDb3VudCA9PT0gMSkge1xuICAgIC8vIHBhc3NlZCBpbiBvbmUsIGJ1dCBpdCdzIG5vdCB0aGUgcmlnaHQgb25lLlxuICAgIGlmIChkZXN0ICYmIGRlc3QgIT09IHN0YXRlLnBpcGVzKSByZXR1cm4gdGhpcztcblxuICAgIGlmICghZGVzdCkgZGVzdCA9IHN0YXRlLnBpcGVzO1xuXG4gICAgLy8gZ290IGEgbWF0Y2guXG4gICAgc3RhdGUucGlwZXMgPSBudWxsO1xuICAgIHN0YXRlLnBpcGVzQ291bnQgPSAwO1xuICAgIHN0YXRlLmZsb3dpbmcgPSBmYWxzZTtcbiAgICBpZiAoZGVzdCkgZGVzdC5lbWl0KCd1bnBpcGUnLCB0aGlzLCB1bnBpcGVJbmZvKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIHNsb3cgY2FzZS4gbXVsdGlwbGUgcGlwZSBkZXN0aW5hdGlvbnMuXG5cbiAgaWYgKCFkZXN0KSB7XG4gICAgLy8gcmVtb3ZlIGFsbC5cbiAgICB2YXIgZGVzdHMgPSBzdGF0ZS5waXBlcztcbiAgICB2YXIgbGVuID0gc3RhdGUucGlwZXNDb3VudDtcbiAgICBzdGF0ZS5waXBlcyA9IG51bGw7XG4gICAgc3RhdGUucGlwZXNDb3VudCA9IDA7XG4gICAgc3RhdGUuZmxvd2luZyA9IGZhbHNlO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgZGVzdHNbaV0uZW1pdCgndW5waXBlJywgdGhpcywgdW5waXBlSW5mbyk7XG4gICAgfXJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gdHJ5IHRvIGZpbmQgdGhlIHJpZ2h0IG9uZS5cbiAgdmFyIGluZGV4ID0gaW5kZXhPZihzdGF0ZS5waXBlcywgZGVzdCk7XG4gIGlmIChpbmRleCA9PT0gLTEpIHJldHVybiB0aGlzO1xuXG4gIHN0YXRlLnBpcGVzLnNwbGljZShpbmRleCwgMSk7XG4gIHN0YXRlLnBpcGVzQ291bnQgLT0gMTtcbiAgaWYgKHN0YXRlLnBpcGVzQ291bnQgPT09IDEpIHN0YXRlLnBpcGVzID0gc3RhdGUucGlwZXNbMF07XG5cbiAgZGVzdC5lbWl0KCd1bnBpcGUnLCB0aGlzLCB1bnBpcGVJbmZvKTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIHNldCB1cCBkYXRhIGV2ZW50cyBpZiB0aGV5IGFyZSBhc2tlZCBmb3Jcbi8vIEVuc3VyZSByZWFkYWJsZSBsaXN0ZW5lcnMgZXZlbnR1YWxseSBnZXQgc29tZXRoaW5nXG5SZWFkYWJsZS5wcm90b3R5cGUub24gPSBmdW5jdGlvbiAoZXYsIGZuKSB7XG4gIHZhciByZXMgPSBTdHJlYW0ucHJvdG90eXBlLm9uLmNhbGwodGhpcywgZXYsIGZuKTtcblxuICBpZiAoZXYgPT09ICdkYXRhJykge1xuICAgIC8vIFN0YXJ0IGZsb3dpbmcgb24gbmV4dCB0aWNrIGlmIHN0cmVhbSBpc24ndCBleHBsaWNpdGx5IHBhdXNlZFxuICAgIGlmICh0aGlzLl9yZWFkYWJsZVN0YXRlLmZsb3dpbmcgIT09IGZhbHNlKSB0aGlzLnJlc3VtZSgpO1xuICB9IGVsc2UgaWYgKGV2ID09PSAncmVhZGFibGUnKSB7XG4gICAgdmFyIHN0YXRlID0gdGhpcy5fcmVhZGFibGVTdGF0ZTtcbiAgICBpZiAoIXN0YXRlLmVuZEVtaXR0ZWQgJiYgIXN0YXRlLnJlYWRhYmxlTGlzdGVuaW5nKSB7XG4gICAgICBzdGF0ZS5yZWFkYWJsZUxpc3RlbmluZyA9IHN0YXRlLm5lZWRSZWFkYWJsZSA9IHRydWU7XG4gICAgICBzdGF0ZS5lbWl0dGVkUmVhZGFibGUgPSBmYWxzZTtcbiAgICAgIGlmICghc3RhdGUucmVhZGluZykge1xuICAgICAgICBwbmEubmV4dFRpY2soblJlYWRpbmdOZXh0VGljaywgdGhpcyk7XG4gICAgICB9IGVsc2UgaWYgKHN0YXRlLmxlbmd0aCkge1xuICAgICAgICBlbWl0UmVhZGFibGUodGhpcyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlcztcbn07XG5SZWFkYWJsZS5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBSZWFkYWJsZS5wcm90b3R5cGUub247XG5cbmZ1bmN0aW9uIG5SZWFkaW5nTmV4dFRpY2soc2VsZikge1xuICBkZWJ1ZygncmVhZGFibGUgbmV4dHRpY2sgcmVhZCAwJyk7XG4gIHNlbGYucmVhZCgwKTtcbn1cblxuLy8gcGF1c2UoKSBhbmQgcmVzdW1lKCkgYXJlIHJlbW5hbnRzIG9mIHRoZSBsZWdhY3kgcmVhZGFibGUgc3RyZWFtIEFQSVxuLy8gSWYgdGhlIHVzZXIgdXNlcyB0aGVtLCB0aGVuIHN3aXRjaCBpbnRvIG9sZCBtb2RlLlxuUmVhZGFibGUucHJvdG90eXBlLnJlc3VtZSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHN0YXRlID0gdGhpcy5fcmVhZGFibGVTdGF0ZTtcbiAgaWYgKCFzdGF0ZS5mbG93aW5nKSB7XG4gICAgZGVidWcoJ3Jlc3VtZScpO1xuICAgIHN0YXRlLmZsb3dpbmcgPSB0cnVlO1xuICAgIHJlc3VtZSh0aGlzLCBzdGF0ZSk7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5mdW5jdGlvbiByZXN1bWUoc3RyZWFtLCBzdGF0ZSkge1xuICBpZiAoIXN0YXRlLnJlc3VtZVNjaGVkdWxlZCkge1xuICAgIHN0YXRlLnJlc3VtZVNjaGVkdWxlZCA9IHRydWU7XG4gICAgcG5hLm5leHRUaWNrKHJlc3VtZV8sIHN0cmVhbSwgc3RhdGUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlc3VtZV8oc3RyZWFtLCBzdGF0ZSkge1xuICBpZiAoIXN0YXRlLnJlYWRpbmcpIHtcbiAgICBkZWJ1ZygncmVzdW1lIHJlYWQgMCcpO1xuICAgIHN0cmVhbS5yZWFkKDApO1xuICB9XG5cbiAgc3RhdGUucmVzdW1lU2NoZWR1bGVkID0gZmFsc2U7XG4gIHN0YXRlLmF3YWl0RHJhaW4gPSAwO1xuICBzdHJlYW0uZW1pdCgncmVzdW1lJyk7XG4gIGZsb3coc3RyZWFtKTtcbiAgaWYgKHN0YXRlLmZsb3dpbmcgJiYgIXN0YXRlLnJlYWRpbmcpIHN0cmVhbS5yZWFkKDApO1xufVxuXG5SZWFkYWJsZS5wcm90b3R5cGUucGF1c2UgPSBmdW5jdGlvbiAoKSB7XG4gIGRlYnVnKCdjYWxsIHBhdXNlIGZsb3dpbmc9JWonLCB0aGlzLl9yZWFkYWJsZVN0YXRlLmZsb3dpbmcpO1xuICBpZiAoZmFsc2UgIT09IHRoaXMuX3JlYWRhYmxlU3RhdGUuZmxvd2luZykge1xuICAgIGRlYnVnKCdwYXVzZScpO1xuICAgIHRoaXMuX3JlYWRhYmxlU3RhdGUuZmxvd2luZyA9IGZhbHNlO1xuICAgIHRoaXMuZW1pdCgncGF1c2UnKTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn07XG5cbmZ1bmN0aW9uIGZsb3coc3RyZWFtKSB7XG4gIHZhciBzdGF0ZSA9IHN0cmVhbS5fcmVhZGFibGVTdGF0ZTtcbiAgZGVidWcoJ2Zsb3cnLCBzdGF0ZS5mbG93aW5nKTtcbiAgd2hpbGUgKHN0YXRlLmZsb3dpbmcgJiYgc3RyZWFtLnJlYWQoKSAhPT0gbnVsbCkge31cbn1cblxuLy8gd3JhcCBhbiBvbGQtc3R5bGUgc3RyZWFtIGFzIHRoZSBhc3luYyBkYXRhIHNvdXJjZS5cbi8vIFRoaXMgaXMgKm5vdCogcGFydCBvZiB0aGUgcmVhZGFibGUgc3RyZWFtIGludGVyZmFjZS5cbi8vIEl0IGlzIGFuIHVnbHkgdW5mb3J0dW5hdGUgbWVzcyBvZiBoaXN0b3J5LlxuUmVhZGFibGUucHJvdG90eXBlLndyYXAgPSBmdW5jdGlvbiAoc3RyZWFtKSB7XG4gIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgdmFyIHN0YXRlID0gdGhpcy5fcmVhZGFibGVTdGF0ZTtcbiAgdmFyIHBhdXNlZCA9IGZhbHNlO1xuXG4gIHN0cmVhbS5vbignZW5kJywgZnVuY3Rpb24gKCkge1xuICAgIGRlYnVnKCd3cmFwcGVkIGVuZCcpO1xuICAgIGlmIChzdGF0ZS5kZWNvZGVyICYmICFzdGF0ZS5lbmRlZCkge1xuICAgICAgdmFyIGNodW5rID0gc3RhdGUuZGVjb2Rlci5lbmQoKTtcbiAgICAgIGlmIChjaHVuayAmJiBjaHVuay5sZW5ndGgpIF90aGlzLnB1c2goY2h1bmspO1xuICAgIH1cblxuICAgIF90aGlzLnB1c2gobnVsbCk7XG4gIH0pO1xuXG4gIHN0cmVhbS5vbignZGF0YScsIGZ1bmN0aW9uIChjaHVuaykge1xuICAgIGRlYnVnKCd3cmFwcGVkIGRhdGEnKTtcbiAgICBpZiAoc3RhdGUuZGVjb2RlcikgY2h1bmsgPSBzdGF0ZS5kZWNvZGVyLndyaXRlKGNodW5rKTtcblxuICAgIC8vIGRvbid0IHNraXAgb3ZlciBmYWxzeSB2YWx1ZXMgaW4gb2JqZWN0TW9kZVxuICAgIGlmIChzdGF0ZS5vYmplY3RNb2RlICYmIChjaHVuayA9PT0gbnVsbCB8fCBjaHVuayA9PT0gdW5kZWZpbmVkKSkgcmV0dXJuO2Vsc2UgaWYgKCFzdGF0ZS5vYmplY3RNb2RlICYmICghY2h1bmsgfHwgIWNodW5rLmxlbmd0aCkpIHJldHVybjtcblxuICAgIHZhciByZXQgPSBfdGhpcy5wdXNoKGNodW5rKTtcbiAgICBpZiAoIXJldCkge1xuICAgICAgcGF1c2VkID0gdHJ1ZTtcbiAgICAgIHN0cmVhbS5wYXVzZSgpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gcHJveHkgYWxsIHRoZSBvdGhlciBtZXRob2RzLlxuICAvLyBpbXBvcnRhbnQgd2hlbiB3cmFwcGluZyBmaWx0ZXJzIGFuZCBkdXBsZXhlcy5cbiAgZm9yICh2YXIgaSBpbiBzdHJlYW0pIHtcbiAgICBpZiAodGhpc1tpXSA9PT0gdW5kZWZpbmVkICYmIHR5cGVvZiBzdHJlYW1baV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXNbaV0gPSBmdW5jdGlvbiAobWV0aG9kKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIHN0cmVhbVttZXRob2RdLmFwcGx5KHN0cmVhbSwgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICAgIH0oaSk7XG4gICAgfVxuICB9XG5cbiAgLy8gcHJveHkgY2VydGFpbiBpbXBvcnRhbnQgZXZlbnRzLlxuICBmb3IgKHZhciBuID0gMDsgbiA8IGtQcm94eUV2ZW50cy5sZW5ndGg7IG4rKykge1xuICAgIHN0cmVhbS5vbihrUHJveHlFdmVudHNbbl0sIHRoaXMuZW1pdC5iaW5kKHRoaXMsIGtQcm94eUV2ZW50c1tuXSkpO1xuICB9XG5cbiAgLy8gd2hlbiB3ZSB0cnkgdG8gY29uc3VtZSBzb21lIG1vcmUgYnl0ZXMsIHNpbXBseSB1bnBhdXNlIHRoZVxuICAvLyB1bmRlcmx5aW5nIHN0cmVhbS5cbiAgdGhpcy5fcmVhZCA9IGZ1bmN0aW9uIChuKSB7XG4gICAgZGVidWcoJ3dyYXBwZWQgX3JlYWQnLCBuKTtcbiAgICBpZiAocGF1c2VkKSB7XG4gICAgICBwYXVzZWQgPSBmYWxzZTtcbiAgICAgIHN0cmVhbS5yZXN1bWUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoUmVhZGFibGUucHJvdG90eXBlLCAncmVhZGFibGVIaWdoV2F0ZXJNYXJrJywge1xuICAvLyBtYWtpbmcgaXQgZXhwbGljaXQgdGhpcyBwcm9wZXJ0eSBpcyBub3QgZW51bWVyYWJsZVxuICAvLyBiZWNhdXNlIG90aGVyd2lzZSBzb21lIHByb3RvdHlwZSBtYW5pcHVsYXRpb24gaW5cbiAgLy8gdXNlcmxhbmQgd2lsbCBmYWlsXG4gIGVudW1lcmFibGU6IGZhbHNlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVhZGFibGVTdGF0ZS5oaWdoV2F0ZXJNYXJrO1xuICB9XG59KTtcblxuLy8gZXhwb3NlZCBmb3IgdGVzdGluZyBwdXJwb3NlcyBvbmx5LlxuUmVhZGFibGUuX2Zyb21MaXN0ID0gZnJvbUxpc3Q7XG5cbi8vIFBsdWNrIG9mZiBuIGJ5dGVzIGZyb20gYW4gYXJyYXkgb2YgYnVmZmVycy5cbi8vIExlbmd0aCBpcyB0aGUgY29tYmluZWQgbGVuZ3RocyBvZiBhbGwgdGhlIGJ1ZmZlcnMgaW4gdGhlIGxpc3QuXG4vLyBUaGlzIGZ1bmN0aW9uIGlzIGRlc2lnbmVkIHRvIGJlIGlubGluYWJsZSwgc28gcGxlYXNlIHRha2UgY2FyZSB3aGVuIG1ha2luZ1xuLy8gY2hhbmdlcyB0byB0aGUgZnVuY3Rpb24gYm9keS5cbmZ1bmN0aW9uIGZyb21MaXN0KG4sIHN0YXRlKSB7XG4gIC8vIG5vdGhpbmcgYnVmZmVyZWRcbiAgaWYgKHN0YXRlLmxlbmd0aCA9PT0gMCkgcmV0dXJuIG51bGw7XG5cbiAgdmFyIHJldDtcbiAgaWYgKHN0YXRlLm9iamVjdE1vZGUpIHJldCA9IHN0YXRlLmJ1ZmZlci5zaGlmdCgpO2Vsc2UgaWYgKCFuIHx8IG4gPj0gc3RhdGUubGVuZ3RoKSB7XG4gICAgLy8gcmVhZCBpdCBhbGwsIHRydW5jYXRlIHRoZSBsaXN0XG4gICAgaWYgKHN0YXRlLmRlY29kZXIpIHJldCA9IHN0YXRlLmJ1ZmZlci5qb2luKCcnKTtlbHNlIGlmIChzdGF0ZS5idWZmZXIubGVuZ3RoID09PSAxKSByZXQgPSBzdGF0ZS5idWZmZXIuaGVhZC5kYXRhO2Vsc2UgcmV0ID0gc3RhdGUuYnVmZmVyLmNvbmNhdChzdGF0ZS5sZW5ndGgpO1xuICAgIHN0YXRlLmJ1ZmZlci5jbGVhcigpO1xuICB9IGVsc2Uge1xuICAgIC8vIHJlYWQgcGFydCBvZiBsaXN0XG4gICAgcmV0ID0gZnJvbUxpc3RQYXJ0aWFsKG4sIHN0YXRlLmJ1ZmZlciwgc3RhdGUuZGVjb2Rlcik7XG4gIH1cblxuICByZXR1cm4gcmV0O1xufVxuXG4vLyBFeHRyYWN0cyBvbmx5IGVub3VnaCBidWZmZXJlZCBkYXRhIHRvIHNhdGlzZnkgdGhlIGFtb3VudCByZXF1ZXN0ZWQuXG4vLyBUaGlzIGZ1bmN0aW9uIGlzIGRlc2lnbmVkIHRvIGJlIGlubGluYWJsZSwgc28gcGxlYXNlIHRha2UgY2FyZSB3aGVuIG1ha2luZ1xuLy8gY2hhbmdlcyB0byB0aGUgZnVuY3Rpb24gYm9keS5cbmZ1bmN0aW9uIGZyb21MaXN0UGFydGlhbChuLCBsaXN0LCBoYXNTdHJpbmdzKSB7XG4gIHZhciByZXQ7XG4gIGlmIChuIDwgbGlzdC5oZWFkLmRhdGEubGVuZ3RoKSB7XG4gICAgLy8gc2xpY2UgaXMgdGhlIHNhbWUgZm9yIGJ1ZmZlcnMgYW5kIHN0cmluZ3NcbiAgICByZXQgPSBsaXN0LmhlYWQuZGF0YS5zbGljZSgwLCBuKTtcbiAgICBsaXN0LmhlYWQuZGF0YSA9IGxpc3QuaGVhZC5kYXRhLnNsaWNlKG4pO1xuICB9IGVsc2UgaWYgKG4gPT09IGxpc3QuaGVhZC5kYXRhLmxlbmd0aCkge1xuICAgIC8vIGZpcnN0IGNodW5rIGlzIGEgcGVyZmVjdCBtYXRjaFxuICAgIHJldCA9IGxpc3Quc2hpZnQoKTtcbiAgfSBlbHNlIHtcbiAgICAvLyByZXN1bHQgc3BhbnMgbW9yZSB0aGFuIG9uZSBidWZmZXJcbiAgICByZXQgPSBoYXNTdHJpbmdzID8gY29weUZyb21CdWZmZXJTdHJpbmcobiwgbGlzdCkgOiBjb3B5RnJvbUJ1ZmZlcihuLCBsaXN0KTtcbiAgfVxuICByZXR1cm4gcmV0O1xufVxuXG4vLyBDb3BpZXMgYSBzcGVjaWZpZWQgYW1vdW50IG9mIGNoYXJhY3RlcnMgZnJvbSB0aGUgbGlzdCBvZiBidWZmZXJlZCBkYXRhXG4vLyBjaHVua3MuXG4vLyBUaGlzIGZ1bmN0aW9uIGlzIGRlc2lnbmVkIHRvIGJlIGlubGluYWJsZSwgc28gcGxlYXNlIHRha2UgY2FyZSB3aGVuIG1ha2luZ1xuLy8gY2hhbmdlcyB0byB0aGUgZnVuY3Rpb24gYm9keS5cbmZ1bmN0aW9uIGNvcHlGcm9tQnVmZmVyU3RyaW5nKG4sIGxpc3QpIHtcbiAgdmFyIHAgPSBsaXN0LmhlYWQ7XG4gIHZhciBjID0gMTtcbiAgdmFyIHJldCA9IHAuZGF0YTtcbiAgbiAtPSByZXQubGVuZ3RoO1xuICB3aGlsZSAocCA9IHAubmV4dCkge1xuICAgIHZhciBzdHIgPSBwLmRhdGE7XG4gICAgdmFyIG5iID0gbiA+IHN0ci5sZW5ndGggPyBzdHIubGVuZ3RoIDogbjtcbiAgICBpZiAobmIgPT09IHN0ci5sZW5ndGgpIHJldCArPSBzdHI7ZWxzZSByZXQgKz0gc3RyLnNsaWNlKDAsIG4pO1xuICAgIG4gLT0gbmI7XG4gICAgaWYgKG4gPT09IDApIHtcbiAgICAgIGlmIChuYiA9PT0gc3RyLmxlbmd0aCkge1xuICAgICAgICArK2M7XG4gICAgICAgIGlmIChwLm5leHQpIGxpc3QuaGVhZCA9IHAubmV4dDtlbHNlIGxpc3QuaGVhZCA9IGxpc3QudGFpbCA9IG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsaXN0LmhlYWQgPSBwO1xuICAgICAgICBwLmRhdGEgPSBzdHIuc2xpY2UobmIpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgfVxuICAgICsrYztcbiAgfVxuICBsaXN0Lmxlbmd0aCAtPSBjO1xuICByZXR1cm4gcmV0O1xufVxuXG4vLyBDb3BpZXMgYSBzcGVjaWZpZWQgYW1vdW50IG9mIGJ5dGVzIGZyb20gdGhlIGxpc3Qgb2YgYnVmZmVyZWQgZGF0YSBjaHVua3MuXG4vLyBUaGlzIGZ1bmN0aW9uIGlzIGRlc2lnbmVkIHRvIGJlIGlubGluYWJsZSwgc28gcGxlYXNlIHRha2UgY2FyZSB3aGVuIG1ha2luZ1xuLy8gY2hhbmdlcyB0byB0aGUgZnVuY3Rpb24gYm9keS5cbmZ1bmN0aW9uIGNvcHlGcm9tQnVmZmVyKG4sIGxpc3QpIHtcbiAgdmFyIHJldCA9IEJ1ZmZlci5hbGxvY1Vuc2FmZShuKTtcbiAgdmFyIHAgPSBsaXN0LmhlYWQ7XG4gIHZhciBjID0gMTtcbiAgcC5kYXRhLmNvcHkocmV0KTtcbiAgbiAtPSBwLmRhdGEubGVuZ3RoO1xuICB3aGlsZSAocCA9IHAubmV4dCkge1xuICAgIHZhciBidWYgPSBwLmRhdGE7XG4gICAgdmFyIG5iID0gbiA+IGJ1Zi5sZW5ndGggPyBidWYubGVuZ3RoIDogbjtcbiAgICBidWYuY29weShyZXQsIHJldC5sZW5ndGggLSBuLCAwLCBuYik7XG4gICAgbiAtPSBuYjtcbiAgICBpZiAobiA9PT0gMCkge1xuICAgICAgaWYgKG5iID09PSBidWYubGVuZ3RoKSB7XG4gICAgICAgICsrYztcbiAgICAgICAgaWYgKHAubmV4dCkgbGlzdC5oZWFkID0gcC5uZXh0O2Vsc2UgbGlzdC5oZWFkID0gbGlzdC50YWlsID0gbnVsbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxpc3QuaGVhZCA9IHA7XG4gICAgICAgIHAuZGF0YSA9IGJ1Zi5zbGljZShuYik7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgKytjO1xuICB9XG4gIGxpc3QubGVuZ3RoIC09IGM7XG4gIHJldHVybiByZXQ7XG59XG5cbmZ1bmN0aW9uIGVuZFJlYWRhYmxlKHN0cmVhbSkge1xuICB2YXIgc3RhdGUgPSBzdHJlYW0uX3JlYWRhYmxlU3RhdGU7XG5cbiAgLy8gSWYgd2UgZ2V0IGhlcmUgYmVmb3JlIGNvbnN1bWluZyBhbGwgdGhlIGJ5dGVzLCB0aGVuIHRoYXQgaXMgYVxuICAvLyBidWcgaW4gbm9kZS4gIFNob3VsZCBuZXZlciBoYXBwZW4uXG4gIGlmIChzdGF0ZS5sZW5ndGggPiAwKSB0aHJvdyBuZXcgRXJyb3IoJ1wiZW5kUmVhZGFibGUoKVwiIGNhbGxlZCBvbiBub24tZW1wdHkgc3RyZWFtJyk7XG5cbiAgaWYgKCFzdGF0ZS5lbmRFbWl0dGVkKSB7XG4gICAgc3RhdGUuZW5kZWQgPSB0cnVlO1xuICAgIHBuYS5uZXh0VGljayhlbmRSZWFkYWJsZU5ULCBzdGF0ZSwgc3RyZWFtKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBlbmRSZWFkYWJsZU5UKHN0YXRlLCBzdHJlYW0pIHtcbiAgLy8gQ2hlY2sgdGhhdCB3ZSBkaWRuJ3QgZ2V0IG9uZSBsYXN0IHVuc2hpZnQuXG4gIGlmICghc3RhdGUuZW5kRW1pdHRlZCAmJiBzdGF0ZS5sZW5ndGggPT09IDApIHtcbiAgICBzdGF0ZS5lbmRFbWl0dGVkID0gdHJ1ZTtcbiAgICBzdHJlYW0ucmVhZGFibGUgPSBmYWxzZTtcbiAgICBzdHJlYW0uZW1pdCgnZW5kJyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaW5kZXhPZih4cywgeCkge1xuICBmb3IgKHZhciBpID0gMCwgbCA9IHhzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGlmICh4c1tpXSA9PT0geCkgcmV0dXJuIGk7XG4gIH1cbiAgcmV0dXJuIC0xO1xufSIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4vLyBhIHRyYW5zZm9ybSBzdHJlYW0gaXMgYSByZWFkYWJsZS93cml0YWJsZSBzdHJlYW0gd2hlcmUgeW91IGRvXG4vLyBzb21ldGhpbmcgd2l0aCB0aGUgZGF0YS4gIFNvbWV0aW1lcyBpdCdzIGNhbGxlZCBhIFwiZmlsdGVyXCIsXG4vLyBidXQgdGhhdCdzIG5vdCBhIGdyZWF0IG5hbWUgZm9yIGl0LCBzaW5jZSB0aGF0IGltcGxpZXMgYSB0aGluZyB3aGVyZVxuLy8gc29tZSBiaXRzIHBhc3MgdGhyb3VnaCwgYW5kIG90aGVycyBhcmUgc2ltcGx5IGlnbm9yZWQuICAoVGhhdCB3b3VsZFxuLy8gYmUgYSB2YWxpZCBleGFtcGxlIG9mIGEgdHJhbnNmb3JtLCBvZiBjb3Vyc2UuKVxuLy9cbi8vIFdoaWxlIHRoZSBvdXRwdXQgaXMgY2F1c2FsbHkgcmVsYXRlZCB0byB0aGUgaW5wdXQsIGl0J3Mgbm90IGFcbi8vIG5lY2Vzc2FyaWx5IHN5bW1ldHJpYyBvciBzeW5jaHJvbm91cyB0cmFuc2Zvcm1hdGlvbi4gIEZvciBleGFtcGxlLFxuLy8gYSB6bGliIHN0cmVhbSBtaWdodCB0YWtlIG11bHRpcGxlIHBsYWluLXRleHQgd3JpdGVzKCksIGFuZCB0aGVuXG4vLyBlbWl0IGEgc2luZ2xlIGNvbXByZXNzZWQgY2h1bmsgc29tZSB0aW1lIGluIHRoZSBmdXR1cmUuXG4vL1xuLy8gSGVyZSdzIGhvdyB0aGlzIHdvcmtzOlxuLy9cbi8vIFRoZSBUcmFuc2Zvcm0gc3RyZWFtIGhhcyBhbGwgdGhlIGFzcGVjdHMgb2YgdGhlIHJlYWRhYmxlIGFuZCB3cml0YWJsZVxuLy8gc3RyZWFtIGNsYXNzZXMuICBXaGVuIHlvdSB3cml0ZShjaHVuayksIHRoYXQgY2FsbHMgX3dyaXRlKGNodW5rLGNiKVxuLy8gaW50ZXJuYWxseSwgYW5kIHJldHVybnMgZmFsc2UgaWYgdGhlcmUncyBhIGxvdCBvZiBwZW5kaW5nIHdyaXRlc1xuLy8gYnVmZmVyZWQgdXAuICBXaGVuIHlvdSBjYWxsIHJlYWQoKSwgdGhhdCBjYWxscyBfcmVhZChuKSB1bnRpbFxuLy8gdGhlcmUncyBlbm91Z2ggcGVuZGluZyByZWFkYWJsZSBkYXRhIGJ1ZmZlcmVkIHVwLlxuLy9cbi8vIEluIGEgdHJhbnNmb3JtIHN0cmVhbSwgdGhlIHdyaXR0ZW4gZGF0YSBpcyBwbGFjZWQgaW4gYSBidWZmZXIuICBXaGVuXG4vLyBfcmVhZChuKSBpcyBjYWxsZWQsIGl0IHRyYW5zZm9ybXMgdGhlIHF1ZXVlZCB1cCBkYXRhLCBjYWxsaW5nIHRoZVxuLy8gYnVmZmVyZWQgX3dyaXRlIGNiJ3MgYXMgaXQgY29uc3VtZXMgY2h1bmtzLiAgSWYgY29uc3VtaW5nIGEgc2luZ2xlXG4vLyB3cml0dGVuIGNodW5rIHdvdWxkIHJlc3VsdCBpbiBtdWx0aXBsZSBvdXRwdXQgY2h1bmtzLCB0aGVuIHRoZSBmaXJzdFxuLy8gb3V0cHV0dGVkIGJpdCBjYWxscyB0aGUgcmVhZGNiLCBhbmQgc3Vic2VxdWVudCBjaHVua3MganVzdCBnbyBpbnRvXG4vLyB0aGUgcmVhZCBidWZmZXIsIGFuZCB3aWxsIGNhdXNlIGl0IHRvIGVtaXQgJ3JlYWRhYmxlJyBpZiBuZWNlc3NhcnkuXG4vL1xuLy8gVGhpcyB3YXksIGJhY2stcHJlc3N1cmUgaXMgYWN0dWFsbHkgZGV0ZXJtaW5lZCBieSB0aGUgcmVhZGluZyBzaWRlLFxuLy8gc2luY2UgX3JlYWQgaGFzIHRvIGJlIGNhbGxlZCB0byBzdGFydCBwcm9jZXNzaW5nIGEgbmV3IGNodW5rLiAgSG93ZXZlcixcbi8vIGEgcGF0aG9sb2dpY2FsIGluZmxhdGUgdHlwZSBvZiB0cmFuc2Zvcm0gY2FuIGNhdXNlIGV4Y2Vzc2l2ZSBidWZmZXJpbmdcbi8vIGhlcmUuICBGb3IgZXhhbXBsZSwgaW1hZ2luZSBhIHN0cmVhbSB3aGVyZSBldmVyeSBieXRlIG9mIGlucHV0IGlzXG4vLyBpbnRlcnByZXRlZCBhcyBhbiBpbnRlZ2VyIGZyb20gMC0yNTUsIGFuZCB0aGVuIHJlc3VsdHMgaW4gdGhhdCBtYW55XG4vLyBieXRlcyBvZiBvdXRwdXQuICBXcml0aW5nIHRoZSA0IGJ5dGVzIHtmZixmZixmZixmZn0gd291bGQgcmVzdWx0IGluXG4vLyAxa2Igb2YgZGF0YSBiZWluZyBvdXRwdXQuICBJbiB0aGlzIGNhc2UsIHlvdSBjb3VsZCB3cml0ZSBhIHZlcnkgc21hbGxcbi8vIGFtb3VudCBvZiBpbnB1dCwgYW5kIGVuZCB1cCB3aXRoIGEgdmVyeSBsYXJnZSBhbW91bnQgb2Ygb3V0cHV0LiAgSW5cbi8vIHN1Y2ggYSBwYXRob2xvZ2ljYWwgaW5mbGF0aW5nIG1lY2hhbmlzbSwgdGhlcmUnZCBiZSBubyB3YXkgdG8gdGVsbFxuLy8gdGhlIHN5c3RlbSB0byBzdG9wIGRvaW5nIHRoZSB0cmFuc2Zvcm0uICBBIHNpbmdsZSA0TUIgd3JpdGUgY291bGRcbi8vIGNhdXNlIHRoZSBzeXN0ZW0gdG8gcnVuIG91dCBvZiBtZW1vcnkuXG4vL1xuLy8gSG93ZXZlciwgZXZlbiBpbiBzdWNoIGEgcGF0aG9sb2dpY2FsIGNhc2UsIG9ubHkgYSBzaW5nbGUgd3JpdHRlbiBjaHVua1xuLy8gd291bGQgYmUgY29uc3VtZWQsIGFuZCB0aGVuIHRoZSByZXN0IHdvdWxkIHdhaXQgKHVuLXRyYW5zZm9ybWVkKSB1bnRpbFxuLy8gdGhlIHJlc3VsdHMgb2YgdGhlIHByZXZpb3VzIHRyYW5zZm9ybWVkIGNodW5rIHdlcmUgY29uc3VtZWQuXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBUcmFuc2Zvcm07XG5cbnZhciBEdXBsZXggPSByZXF1aXJlKCcuL19zdHJlYW1fZHVwbGV4Jyk7XG5cbi8qPHJlcGxhY2VtZW50PiovXG52YXIgdXRpbCA9IHJlcXVpcmUoJ2NvcmUtdXRpbC1pcycpO1xudXRpbC5pbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJyk7XG4vKjwvcmVwbGFjZW1lbnQ+Ki9cblxudXRpbC5pbmhlcml0cyhUcmFuc2Zvcm0sIER1cGxleCk7XG5cbmZ1bmN0aW9uIGFmdGVyVHJhbnNmb3JtKGVyLCBkYXRhKSB7XG4gIHZhciB0cyA9IHRoaXMuX3RyYW5zZm9ybVN0YXRlO1xuICB0cy50cmFuc2Zvcm1pbmcgPSBmYWxzZTtcblxuICB2YXIgY2IgPSB0cy53cml0ZWNiO1xuXG4gIGlmICghY2IpIHtcbiAgICByZXR1cm4gdGhpcy5lbWl0KCdlcnJvcicsIG5ldyBFcnJvcignd3JpdGUgY2FsbGJhY2sgY2FsbGVkIG11bHRpcGxlIHRpbWVzJykpO1xuICB9XG5cbiAgdHMud3JpdGVjaHVuayA9IG51bGw7XG4gIHRzLndyaXRlY2IgPSBudWxsO1xuXG4gIGlmIChkYXRhICE9IG51bGwpIC8vIHNpbmdsZSBlcXVhbHMgY2hlY2sgZm9yIGJvdGggYG51bGxgIGFuZCBgdW5kZWZpbmVkYFxuICAgIHRoaXMucHVzaChkYXRhKTtcblxuICBjYihlcik7XG5cbiAgdmFyIHJzID0gdGhpcy5fcmVhZGFibGVTdGF0ZTtcbiAgcnMucmVhZGluZyA9IGZhbHNlO1xuICBpZiAocnMubmVlZFJlYWRhYmxlIHx8IHJzLmxlbmd0aCA8IHJzLmhpZ2hXYXRlck1hcmspIHtcbiAgICB0aGlzLl9yZWFkKHJzLmhpZ2hXYXRlck1hcmspO1xuICB9XG59XG5cbmZ1bmN0aW9uIFRyYW5zZm9ybShvcHRpb25zKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBUcmFuc2Zvcm0pKSByZXR1cm4gbmV3IFRyYW5zZm9ybShvcHRpb25zKTtcblxuICBEdXBsZXguY2FsbCh0aGlzLCBvcHRpb25zKTtcblxuICB0aGlzLl90cmFuc2Zvcm1TdGF0ZSA9IHtcbiAgICBhZnRlclRyYW5zZm9ybTogYWZ0ZXJUcmFuc2Zvcm0uYmluZCh0aGlzKSxcbiAgICBuZWVkVHJhbnNmb3JtOiBmYWxzZSxcbiAgICB0cmFuc2Zvcm1pbmc6IGZhbHNlLFxuICAgIHdyaXRlY2I6IG51bGwsXG4gICAgd3JpdGVjaHVuazogbnVsbCxcbiAgICB3cml0ZWVuY29kaW5nOiBudWxsXG4gIH07XG5cbiAgLy8gc3RhcnQgb3V0IGFza2luZyBmb3IgYSByZWFkYWJsZSBldmVudCBvbmNlIGRhdGEgaXMgdHJhbnNmb3JtZWQuXG4gIHRoaXMuX3JlYWRhYmxlU3RhdGUubmVlZFJlYWRhYmxlID0gdHJ1ZTtcblxuICAvLyB3ZSBoYXZlIGltcGxlbWVudGVkIHRoZSBfcmVhZCBtZXRob2QsIGFuZCBkb25lIHRoZSBvdGhlciB0aGluZ3NcbiAgLy8gdGhhdCBSZWFkYWJsZSB3YW50cyBiZWZvcmUgdGhlIGZpcnN0IF9yZWFkIGNhbGwsIHNvIHVuc2V0IHRoZVxuICAvLyBzeW5jIGd1YXJkIGZsYWcuXG4gIHRoaXMuX3JlYWRhYmxlU3RhdGUuc3luYyA9IGZhbHNlO1xuXG4gIGlmIChvcHRpb25zKSB7XG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLnRyYW5zZm9ybSA9PT0gJ2Z1bmN0aW9uJykgdGhpcy5fdHJhbnNmb3JtID0gb3B0aW9ucy50cmFuc2Zvcm07XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMuZmx1c2ggPT09ICdmdW5jdGlvbicpIHRoaXMuX2ZsdXNoID0gb3B0aW9ucy5mbHVzaDtcbiAgfVxuXG4gIC8vIFdoZW4gdGhlIHdyaXRhYmxlIHNpZGUgZmluaXNoZXMsIHRoZW4gZmx1c2ggb3V0IGFueXRoaW5nIHJlbWFpbmluZy5cbiAgdGhpcy5vbigncHJlZmluaXNoJywgcHJlZmluaXNoKTtcbn1cblxuZnVuY3Rpb24gcHJlZmluaXNoKCkge1xuICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gIGlmICh0eXBlb2YgdGhpcy5fZmx1c2ggPT09ICdmdW5jdGlvbicpIHtcbiAgICB0aGlzLl9mbHVzaChmdW5jdGlvbiAoZXIsIGRhdGEpIHtcbiAgICAgIGRvbmUoX3RoaXMsIGVyLCBkYXRhKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBkb25lKHRoaXMsIG51bGwsIG51bGwpO1xuICB9XG59XG5cblRyYW5zZm9ybS5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIChjaHVuaywgZW5jb2RpbmcpIHtcbiAgdGhpcy5fdHJhbnNmb3JtU3RhdGUubmVlZFRyYW5zZm9ybSA9IGZhbHNlO1xuICByZXR1cm4gRHVwbGV4LnByb3RvdHlwZS5wdXNoLmNhbGwodGhpcywgY2h1bmssIGVuY29kaW5nKTtcbn07XG5cbi8vIFRoaXMgaXMgdGhlIHBhcnQgd2hlcmUgeW91IGRvIHN0dWZmIVxuLy8gb3ZlcnJpZGUgdGhpcyBmdW5jdGlvbiBpbiBpbXBsZW1lbnRhdGlvbiBjbGFzc2VzLlxuLy8gJ2NodW5rJyBpcyBhbiBpbnB1dCBjaHVuay5cbi8vXG4vLyBDYWxsIGBwdXNoKG5ld0NodW5rKWAgdG8gcGFzcyBhbG9uZyB0cmFuc2Zvcm1lZCBvdXRwdXRcbi8vIHRvIHRoZSByZWFkYWJsZSBzaWRlLiAgWW91IG1heSBjYWxsICdwdXNoJyB6ZXJvIG9yIG1vcmUgdGltZXMuXG4vL1xuLy8gQ2FsbCBgY2IoZXJyKWAgd2hlbiB5b3UgYXJlIGRvbmUgd2l0aCB0aGlzIGNodW5rLiAgSWYgeW91IHBhc3Ncbi8vIGFuIGVycm9yLCB0aGVuIHRoYXQnbGwgcHV0IHRoZSBodXJ0IG9uIHRoZSB3aG9sZSBvcGVyYXRpb24uICBJZiB5b3Vcbi8vIG5ldmVyIGNhbGwgY2IoKSwgdGhlbiB5b3UnbGwgbmV2ZXIgZ2V0IGFub3RoZXIgY2h1bmsuXG5UcmFuc2Zvcm0ucHJvdG90eXBlLl90cmFuc2Zvcm0gPSBmdW5jdGlvbiAoY2h1bmssIGVuY29kaW5nLCBjYikge1xuICB0aHJvdyBuZXcgRXJyb3IoJ190cmFuc2Zvcm0oKSBpcyBub3QgaW1wbGVtZW50ZWQnKTtcbn07XG5cblRyYW5zZm9ybS5wcm90b3R5cGUuX3dyaXRlID0gZnVuY3Rpb24gKGNodW5rLCBlbmNvZGluZywgY2IpIHtcbiAgdmFyIHRzID0gdGhpcy5fdHJhbnNmb3JtU3RhdGU7XG4gIHRzLndyaXRlY2IgPSBjYjtcbiAgdHMud3JpdGVjaHVuayA9IGNodW5rO1xuICB0cy53cml0ZWVuY29kaW5nID0gZW5jb2Rpbmc7XG4gIGlmICghdHMudHJhbnNmb3JtaW5nKSB7XG4gICAgdmFyIHJzID0gdGhpcy5fcmVhZGFibGVTdGF0ZTtcbiAgICBpZiAodHMubmVlZFRyYW5zZm9ybSB8fCBycy5uZWVkUmVhZGFibGUgfHwgcnMubGVuZ3RoIDwgcnMuaGlnaFdhdGVyTWFyaykgdGhpcy5fcmVhZChycy5oaWdoV2F0ZXJNYXJrKTtcbiAgfVxufTtcblxuLy8gRG9lc24ndCBtYXR0ZXIgd2hhdCB0aGUgYXJncyBhcmUgaGVyZS5cbi8vIF90cmFuc2Zvcm0gZG9lcyBhbGwgdGhlIHdvcmsuXG4vLyBUaGF0IHdlIGdvdCBoZXJlIG1lYW5zIHRoYXQgdGhlIHJlYWRhYmxlIHNpZGUgd2FudHMgbW9yZSBkYXRhLlxuVHJhbnNmb3JtLnByb3RvdHlwZS5fcmVhZCA9IGZ1bmN0aW9uIChuKSB7XG4gIHZhciB0cyA9IHRoaXMuX3RyYW5zZm9ybVN0YXRlO1xuXG4gIGlmICh0cy53cml0ZWNodW5rICE9PSBudWxsICYmIHRzLndyaXRlY2IgJiYgIXRzLnRyYW5zZm9ybWluZykge1xuICAgIHRzLnRyYW5zZm9ybWluZyA9IHRydWU7XG4gICAgdGhpcy5fdHJhbnNmb3JtKHRzLndyaXRlY2h1bmssIHRzLndyaXRlZW5jb2RpbmcsIHRzLmFmdGVyVHJhbnNmb3JtKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBtYXJrIHRoYXQgd2UgbmVlZCBhIHRyYW5zZm9ybSwgc28gdGhhdCBhbnkgZGF0YSB0aGF0IGNvbWVzIGluXG4gICAgLy8gd2lsbCBnZXQgcHJvY2Vzc2VkLCBub3cgdGhhdCB3ZSd2ZSBhc2tlZCBmb3IgaXQuXG4gICAgdHMubmVlZFRyYW5zZm9ybSA9IHRydWU7XG4gIH1cbn07XG5cblRyYW5zZm9ybS5wcm90b3R5cGUuX2Rlc3Ryb3kgPSBmdW5jdGlvbiAoZXJyLCBjYikge1xuICB2YXIgX3RoaXMyID0gdGhpcztcblxuICBEdXBsZXgucHJvdG90eXBlLl9kZXN0cm95LmNhbGwodGhpcywgZXJyLCBmdW5jdGlvbiAoZXJyMikge1xuICAgIGNiKGVycjIpO1xuICAgIF90aGlzMi5lbWl0KCdjbG9zZScpO1xuICB9KTtcbn07XG5cbmZ1bmN0aW9uIGRvbmUoc3RyZWFtLCBlciwgZGF0YSkge1xuICBpZiAoZXIpIHJldHVybiBzdHJlYW0uZW1pdCgnZXJyb3InLCBlcik7XG5cbiAgaWYgKGRhdGEgIT0gbnVsbCkgLy8gc2luZ2xlIGVxdWFscyBjaGVjayBmb3IgYm90aCBgbnVsbGAgYW5kIGB1bmRlZmluZWRgXG4gICAgc3RyZWFtLnB1c2goZGF0YSk7XG5cbiAgLy8gaWYgdGhlcmUncyBub3RoaW5nIGluIHRoZSB3cml0ZSBidWZmZXIsIHRoZW4gdGhhdCBtZWFuc1xuICAvLyB0aGF0IG5vdGhpbmcgbW9yZSB3aWxsIGV2ZXIgYmUgcHJvdmlkZWRcbiAgaWYgKHN0cmVhbS5fd3JpdGFibGVTdGF0ZS5sZW5ndGgpIHRocm93IG5ldyBFcnJvcignQ2FsbGluZyB0cmFuc2Zvcm0gZG9uZSB3aGVuIHdzLmxlbmd0aCAhPSAwJyk7XG5cbiAgaWYgKHN0cmVhbS5fdHJhbnNmb3JtU3RhdGUudHJhbnNmb3JtaW5nKSB0aHJvdyBuZXcgRXJyb3IoJ0NhbGxpbmcgdHJhbnNmb3JtIGRvbmUgd2hlbiBzdGlsbCB0cmFuc2Zvcm1pbmcnKTtcblxuICByZXR1cm4gc3RyZWFtLnB1c2gobnVsbCk7XG59IiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbi8vIEEgYml0IHNpbXBsZXIgdGhhbiByZWFkYWJsZSBzdHJlYW1zLlxuLy8gSW1wbGVtZW50IGFuIGFzeW5jIC5fd3JpdGUoY2h1bmssIGVuY29kaW5nLCBjYiksIGFuZCBpdCdsbCBoYW5kbGUgYWxsXG4vLyB0aGUgZHJhaW4gZXZlbnQgZW1pc3Npb24gYW5kIGJ1ZmZlcmluZy5cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKjxyZXBsYWNlbWVudD4qL1xuXG52YXIgcG5hID0gcmVxdWlyZSgncHJvY2Vzcy1uZXh0aWNrLWFyZ3MnKTtcbi8qPC9yZXBsYWNlbWVudD4qL1xuXG5tb2R1bGUuZXhwb3J0cyA9IFdyaXRhYmxlO1xuXG4vKiA8cmVwbGFjZW1lbnQ+ICovXG5mdW5jdGlvbiBXcml0ZVJlcShjaHVuaywgZW5jb2RpbmcsIGNiKSB7XG4gIHRoaXMuY2h1bmsgPSBjaHVuaztcbiAgdGhpcy5lbmNvZGluZyA9IGVuY29kaW5nO1xuICB0aGlzLmNhbGxiYWNrID0gY2I7XG4gIHRoaXMubmV4dCA9IG51bGw7XG59XG5cbi8vIEl0IHNlZW1zIGEgbGlua2VkIGxpc3QgYnV0IGl0IGlzIG5vdFxuLy8gdGhlcmUgd2lsbCBiZSBvbmx5IDIgb2YgdGhlc2UgZm9yIGVhY2ggc3RyZWFtXG5mdW5jdGlvbiBDb3JrZWRSZXF1ZXN0KHN0YXRlKSB7XG4gIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgdGhpcy5uZXh0ID0gbnVsbDtcbiAgdGhpcy5lbnRyeSA9IG51bGw7XG4gIHRoaXMuZmluaXNoID0gZnVuY3Rpb24gKCkge1xuICAgIG9uQ29ya2VkRmluaXNoKF90aGlzLCBzdGF0ZSk7XG4gIH07XG59XG4vKiA8L3JlcGxhY2VtZW50PiAqL1xuXG4vKjxyZXBsYWNlbWVudD4qL1xudmFyIGFzeW5jV3JpdGUgPSAhcHJvY2Vzcy5icm93c2VyICYmIFsndjAuMTAnLCAndjAuOS4nXS5pbmRleE9mKHByb2Nlc3MudmVyc2lvbi5zbGljZSgwLCA1KSkgPiAtMSA/IHNldEltbWVkaWF0ZSA6IHBuYS5uZXh0VGljaztcbi8qPC9yZXBsYWNlbWVudD4qL1xuXG4vKjxyZXBsYWNlbWVudD4qL1xudmFyIER1cGxleDtcbi8qPC9yZXBsYWNlbWVudD4qL1xuXG5Xcml0YWJsZS5Xcml0YWJsZVN0YXRlID0gV3JpdGFibGVTdGF0ZTtcblxuLyo8cmVwbGFjZW1lbnQ+Ki9cbnZhciB1dGlsID0gcmVxdWlyZSgnY29yZS11dGlsLWlzJyk7XG51dGlsLmluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKTtcbi8qPC9yZXBsYWNlbWVudD4qL1xuXG4vKjxyZXBsYWNlbWVudD4qL1xudmFyIGludGVybmFsVXRpbCA9IHtcbiAgZGVwcmVjYXRlOiByZXF1aXJlKCd1dGlsLWRlcHJlY2F0ZScpXG59O1xuLyo8L3JlcGxhY2VtZW50PiovXG5cbi8qPHJlcGxhY2VtZW50PiovXG52YXIgU3RyZWFtID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9zdHJlYW1zL3N0cmVhbScpO1xuLyo8L3JlcGxhY2VtZW50PiovXG5cbi8qPHJlcGxhY2VtZW50PiovXG5cbnZhciBCdWZmZXIgPSByZXF1aXJlKCdzYWZlLWJ1ZmZlcicpLkJ1ZmZlcjtcbnZhciBPdXJVaW50OEFycmF5ID0gZ2xvYmFsLlVpbnQ4QXJyYXkgfHwgZnVuY3Rpb24gKCkge307XG5mdW5jdGlvbiBfdWludDhBcnJheVRvQnVmZmVyKGNodW5rKSB7XG4gIHJldHVybiBCdWZmZXIuZnJvbShjaHVuayk7XG59XG5mdW5jdGlvbiBfaXNVaW50OEFycmF5KG9iaikge1xuICByZXR1cm4gQnVmZmVyLmlzQnVmZmVyKG9iaikgfHwgb2JqIGluc3RhbmNlb2YgT3VyVWludDhBcnJheTtcbn1cblxuLyo8L3JlcGxhY2VtZW50PiovXG5cbnZhciBkZXN0cm95SW1wbCA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvc3RyZWFtcy9kZXN0cm95Jyk7XG5cbnV0aWwuaW5oZXJpdHMoV3JpdGFibGUsIFN0cmVhbSk7XG5cbmZ1bmN0aW9uIG5vcCgpIHt9XG5cbmZ1bmN0aW9uIFdyaXRhYmxlU3RhdGUob3B0aW9ucywgc3RyZWFtKSB7XG4gIER1cGxleCA9IER1cGxleCB8fCByZXF1aXJlKCcuL19zdHJlYW1fZHVwbGV4Jyk7XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgLy8gRHVwbGV4IHN0cmVhbXMgYXJlIGJvdGggcmVhZGFibGUgYW5kIHdyaXRhYmxlLCBidXQgc2hhcmVcbiAgLy8gdGhlIHNhbWUgb3B0aW9ucyBvYmplY3QuXG4gIC8vIEhvd2V2ZXIsIHNvbWUgY2FzZXMgcmVxdWlyZSBzZXR0aW5nIG9wdGlvbnMgdG8gZGlmZmVyZW50XG4gIC8vIHZhbHVlcyBmb3IgdGhlIHJlYWRhYmxlIGFuZCB0aGUgd3JpdGFibGUgc2lkZXMgb2YgdGhlIGR1cGxleCBzdHJlYW0uXG4gIC8vIFRoZXNlIG9wdGlvbnMgY2FuIGJlIHByb3ZpZGVkIHNlcGFyYXRlbHkgYXMgcmVhZGFibGVYWFggYW5kIHdyaXRhYmxlWFhYLlxuICB2YXIgaXNEdXBsZXggPSBzdHJlYW0gaW5zdGFuY2VvZiBEdXBsZXg7XG5cbiAgLy8gb2JqZWN0IHN0cmVhbSBmbGFnIHRvIGluZGljYXRlIHdoZXRoZXIgb3Igbm90IHRoaXMgc3RyZWFtXG4gIC8vIGNvbnRhaW5zIGJ1ZmZlcnMgb3Igb2JqZWN0cy5cbiAgdGhpcy5vYmplY3RNb2RlID0gISFvcHRpb25zLm9iamVjdE1vZGU7XG5cbiAgaWYgKGlzRHVwbGV4KSB0aGlzLm9iamVjdE1vZGUgPSB0aGlzLm9iamVjdE1vZGUgfHwgISFvcHRpb25zLndyaXRhYmxlT2JqZWN0TW9kZTtcblxuICAvLyB0aGUgcG9pbnQgYXQgd2hpY2ggd3JpdGUoKSBzdGFydHMgcmV0dXJuaW5nIGZhbHNlXG4gIC8vIE5vdGU6IDAgaXMgYSB2YWxpZCB2YWx1ZSwgbWVhbnMgdGhhdCB3ZSBhbHdheXMgcmV0dXJuIGZhbHNlIGlmXG4gIC8vIHRoZSBlbnRpcmUgYnVmZmVyIGlzIG5vdCBmbHVzaGVkIGltbWVkaWF0ZWx5IG9uIHdyaXRlKClcbiAgdmFyIGh3bSA9IG9wdGlvbnMuaGlnaFdhdGVyTWFyaztcbiAgdmFyIHdyaXRhYmxlSHdtID0gb3B0aW9ucy53cml0YWJsZUhpZ2hXYXRlck1hcms7XG4gIHZhciBkZWZhdWx0SHdtID0gdGhpcy5vYmplY3RNb2RlID8gMTYgOiAxNiAqIDEwMjQ7XG5cbiAgaWYgKGh3bSB8fCBod20gPT09IDApIHRoaXMuaGlnaFdhdGVyTWFyayA9IGh3bTtlbHNlIGlmIChpc0R1cGxleCAmJiAod3JpdGFibGVId20gfHwgd3JpdGFibGVId20gPT09IDApKSB0aGlzLmhpZ2hXYXRlck1hcmsgPSB3cml0YWJsZUh3bTtlbHNlIHRoaXMuaGlnaFdhdGVyTWFyayA9IGRlZmF1bHRId207XG5cbiAgLy8gY2FzdCB0byBpbnRzLlxuICB0aGlzLmhpZ2hXYXRlck1hcmsgPSBNYXRoLmZsb29yKHRoaXMuaGlnaFdhdGVyTWFyayk7XG5cbiAgLy8gaWYgX2ZpbmFsIGhhcyBiZWVuIGNhbGxlZFxuICB0aGlzLmZpbmFsQ2FsbGVkID0gZmFsc2U7XG5cbiAgLy8gZHJhaW4gZXZlbnQgZmxhZy5cbiAgdGhpcy5uZWVkRHJhaW4gPSBmYWxzZTtcbiAgLy8gYXQgdGhlIHN0YXJ0IG9mIGNhbGxpbmcgZW5kKClcbiAgdGhpcy5lbmRpbmcgPSBmYWxzZTtcbiAgLy8gd2hlbiBlbmQoKSBoYXMgYmVlbiBjYWxsZWQsIGFuZCByZXR1cm5lZFxuICB0aGlzLmVuZGVkID0gZmFsc2U7XG4gIC8vIHdoZW4gJ2ZpbmlzaCcgaXMgZW1pdHRlZFxuICB0aGlzLmZpbmlzaGVkID0gZmFsc2U7XG5cbiAgLy8gaGFzIGl0IGJlZW4gZGVzdHJveWVkXG4gIHRoaXMuZGVzdHJveWVkID0gZmFsc2U7XG5cbiAgLy8gc2hvdWxkIHdlIGRlY29kZSBzdHJpbmdzIGludG8gYnVmZmVycyBiZWZvcmUgcGFzc2luZyB0byBfd3JpdGU/XG4gIC8vIHRoaXMgaXMgaGVyZSBzbyB0aGF0IHNvbWUgbm9kZS1jb3JlIHN0cmVhbXMgY2FuIG9wdGltaXplIHN0cmluZ1xuICAvLyBoYW5kbGluZyBhdCBhIGxvd2VyIGxldmVsLlxuICB2YXIgbm9EZWNvZGUgPSBvcHRpb25zLmRlY29kZVN0cmluZ3MgPT09IGZhbHNlO1xuICB0aGlzLmRlY29kZVN0cmluZ3MgPSAhbm9EZWNvZGU7XG5cbiAgLy8gQ3J5cHRvIGlzIGtpbmQgb2Ygb2xkIGFuZCBjcnVzdHkuICBIaXN0b3JpY2FsbHksIGl0cyBkZWZhdWx0IHN0cmluZ1xuICAvLyBlbmNvZGluZyBpcyAnYmluYXJ5JyBzbyB3ZSBoYXZlIHRvIG1ha2UgdGhpcyBjb25maWd1cmFibGUuXG4gIC8vIEV2ZXJ5dGhpbmcgZWxzZSBpbiB0aGUgdW5pdmVyc2UgdXNlcyAndXRmOCcsIHRob3VnaC5cbiAgdGhpcy5kZWZhdWx0RW5jb2RpbmcgPSBvcHRpb25zLmRlZmF1bHRFbmNvZGluZyB8fCAndXRmOCc7XG5cbiAgLy8gbm90IGFuIGFjdHVhbCBidWZmZXIgd2Uga2VlcCB0cmFjayBvZiwgYnV0IGEgbWVhc3VyZW1lbnRcbiAgLy8gb2YgaG93IG11Y2ggd2UncmUgd2FpdGluZyB0byBnZXQgcHVzaGVkIHRvIHNvbWUgdW5kZXJseWluZ1xuICAvLyBzb2NrZXQgb3IgZmlsZS5cbiAgdGhpcy5sZW5ndGggPSAwO1xuXG4gIC8vIGEgZmxhZyB0byBzZWUgd2hlbiB3ZSdyZSBpbiB0aGUgbWlkZGxlIG9mIGEgd3JpdGUuXG4gIHRoaXMud3JpdGluZyA9IGZhbHNlO1xuXG4gIC8vIHdoZW4gdHJ1ZSBhbGwgd3JpdGVzIHdpbGwgYmUgYnVmZmVyZWQgdW50aWwgLnVuY29yaygpIGNhbGxcbiAgdGhpcy5jb3JrZWQgPSAwO1xuXG4gIC8vIGEgZmxhZyB0byBiZSBhYmxlIHRvIHRlbGwgaWYgdGhlIG9ud3JpdGUgY2IgaXMgY2FsbGVkIGltbWVkaWF0ZWx5LFxuICAvLyBvciBvbiBhIGxhdGVyIHRpY2suICBXZSBzZXQgdGhpcyB0byB0cnVlIGF0IGZpcnN0LCBiZWNhdXNlIGFueVxuICAvLyBhY3Rpb25zIHRoYXQgc2hvdWxkbid0IGhhcHBlbiB1bnRpbCBcImxhdGVyXCIgc2hvdWxkIGdlbmVyYWxseSBhbHNvXG4gIC8vIG5vdCBoYXBwZW4gYmVmb3JlIHRoZSBmaXJzdCB3cml0ZSBjYWxsLlxuICB0aGlzLnN5bmMgPSB0cnVlO1xuXG4gIC8vIGEgZmxhZyB0byBrbm93IGlmIHdlJ3JlIHByb2Nlc3NpbmcgcHJldmlvdXNseSBidWZmZXJlZCBpdGVtcywgd2hpY2hcbiAgLy8gbWF5IGNhbGwgdGhlIF93cml0ZSgpIGNhbGxiYWNrIGluIHRoZSBzYW1lIHRpY2ssIHNvIHRoYXQgd2UgZG9uJ3RcbiAgLy8gZW5kIHVwIGluIGFuIG92ZXJsYXBwZWQgb253cml0ZSBzaXR1YXRpb24uXG4gIHRoaXMuYnVmZmVyUHJvY2Vzc2luZyA9IGZhbHNlO1xuXG4gIC8vIHRoZSBjYWxsYmFjayB0aGF0J3MgcGFzc2VkIHRvIF93cml0ZShjaHVuayxjYilcbiAgdGhpcy5vbndyaXRlID0gZnVuY3Rpb24gKGVyKSB7XG4gICAgb253cml0ZShzdHJlYW0sIGVyKTtcbiAgfTtcblxuICAvLyB0aGUgY2FsbGJhY2sgdGhhdCB0aGUgdXNlciBzdXBwbGllcyB0byB3cml0ZShjaHVuayxlbmNvZGluZyxjYilcbiAgdGhpcy53cml0ZWNiID0gbnVsbDtcblxuICAvLyB0aGUgYW1vdW50IHRoYXQgaXMgYmVpbmcgd3JpdHRlbiB3aGVuIF93cml0ZSBpcyBjYWxsZWQuXG4gIHRoaXMud3JpdGVsZW4gPSAwO1xuXG4gIHRoaXMuYnVmZmVyZWRSZXF1ZXN0ID0gbnVsbDtcbiAgdGhpcy5sYXN0QnVmZmVyZWRSZXF1ZXN0ID0gbnVsbDtcblxuICAvLyBudW1iZXIgb2YgcGVuZGluZyB1c2VyLXN1cHBsaWVkIHdyaXRlIGNhbGxiYWNrc1xuICAvLyB0aGlzIG11c3QgYmUgMCBiZWZvcmUgJ2ZpbmlzaCcgY2FuIGJlIGVtaXR0ZWRcbiAgdGhpcy5wZW5kaW5nY2IgPSAwO1xuXG4gIC8vIGVtaXQgcHJlZmluaXNoIGlmIHRoZSBvbmx5IHRoaW5nIHdlJ3JlIHdhaXRpbmcgZm9yIGlzIF93cml0ZSBjYnNcbiAgLy8gVGhpcyBpcyByZWxldmFudCBmb3Igc3luY2hyb25vdXMgVHJhbnNmb3JtIHN0cmVhbXNcbiAgdGhpcy5wcmVmaW5pc2hlZCA9IGZhbHNlO1xuXG4gIC8vIFRydWUgaWYgdGhlIGVycm9yIHdhcyBhbHJlYWR5IGVtaXR0ZWQgYW5kIHNob3VsZCBub3QgYmUgdGhyb3duIGFnYWluXG4gIHRoaXMuZXJyb3JFbWl0dGVkID0gZmFsc2U7XG5cbiAgLy8gY291bnQgYnVmZmVyZWQgcmVxdWVzdHNcbiAgdGhpcy5idWZmZXJlZFJlcXVlc3RDb3VudCA9IDA7XG5cbiAgLy8gYWxsb2NhdGUgdGhlIGZpcnN0IENvcmtlZFJlcXVlc3QsIHRoZXJlIGlzIGFsd2F5c1xuICAvLyBvbmUgYWxsb2NhdGVkIGFuZCBmcmVlIHRvIHVzZSwgYW5kIHdlIG1haW50YWluIGF0IG1vc3QgdHdvXG4gIHRoaXMuY29ya2VkUmVxdWVzdHNGcmVlID0gbmV3IENvcmtlZFJlcXVlc3QodGhpcyk7XG59XG5cbldyaXRhYmxlU3RhdGUucHJvdG90eXBlLmdldEJ1ZmZlciA9IGZ1bmN0aW9uIGdldEJ1ZmZlcigpIHtcbiAgdmFyIGN1cnJlbnQgPSB0aGlzLmJ1ZmZlcmVkUmVxdWVzdDtcbiAgdmFyIG91dCA9IFtdO1xuICB3aGlsZSAoY3VycmVudCkge1xuICAgIG91dC5wdXNoKGN1cnJlbnQpO1xuICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XG4gIH1cbiAgcmV0dXJuIG91dDtcbn07XG5cbihmdW5jdGlvbiAoKSB7XG4gIHRyeSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFdyaXRhYmxlU3RhdGUucHJvdG90eXBlLCAnYnVmZmVyJywge1xuICAgICAgZ2V0OiBpbnRlcm5hbFV0aWwuZGVwcmVjYXRlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QnVmZmVyKCk7XG4gICAgICB9LCAnX3dyaXRhYmxlU3RhdGUuYnVmZmVyIGlzIGRlcHJlY2F0ZWQuIFVzZSBfd3JpdGFibGVTdGF0ZS5nZXRCdWZmZXIgJyArICdpbnN0ZWFkLicsICdERVAwMDAzJylcbiAgICB9KTtcbiAgfSBjYXRjaCAoXykge31cbn0pKCk7XG5cbi8vIFRlc3QgX3dyaXRhYmxlU3RhdGUgZm9yIGluaGVyaXRhbmNlIHRvIGFjY291bnQgZm9yIER1cGxleCBzdHJlYW1zLFxuLy8gd2hvc2UgcHJvdG90eXBlIGNoYWluIG9ubHkgcG9pbnRzIHRvIFJlYWRhYmxlLlxudmFyIHJlYWxIYXNJbnN0YW5jZTtcbmlmICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC5oYXNJbnN0YW5jZSAmJiB0eXBlb2YgRnVuY3Rpb24ucHJvdG90eXBlW1N5bWJvbC5oYXNJbnN0YW5jZV0gPT09ICdmdW5jdGlvbicpIHtcbiAgcmVhbEhhc0luc3RhbmNlID0gRnVuY3Rpb24ucHJvdG90eXBlW1N5bWJvbC5oYXNJbnN0YW5jZV07XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShXcml0YWJsZSwgU3ltYm9sLmhhc0luc3RhbmNlLCB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgICAgIGlmIChyZWFsSGFzSW5zdGFuY2UuY2FsbCh0aGlzLCBvYmplY3QpKSByZXR1cm4gdHJ1ZTtcbiAgICAgIGlmICh0aGlzICE9PSBXcml0YWJsZSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICByZXR1cm4gb2JqZWN0ICYmIG9iamVjdC5fd3JpdGFibGVTdGF0ZSBpbnN0YW5jZW9mIFdyaXRhYmxlU3RhdGU7XG4gICAgfVxuICB9KTtcbn0gZWxzZSB7XG4gIHJlYWxIYXNJbnN0YW5jZSA9IGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgICByZXR1cm4gb2JqZWN0IGluc3RhbmNlb2YgdGhpcztcbiAgfTtcbn1cblxuZnVuY3Rpb24gV3JpdGFibGUob3B0aW9ucykge1xuICBEdXBsZXggPSBEdXBsZXggfHwgcmVxdWlyZSgnLi9fc3RyZWFtX2R1cGxleCcpO1xuXG4gIC8vIFdyaXRhYmxlIGN0b3IgaXMgYXBwbGllZCB0byBEdXBsZXhlcywgdG9vLlxuICAvLyBgcmVhbEhhc0luc3RhbmNlYCBpcyBuZWNlc3NhcnkgYmVjYXVzZSB1c2luZyBwbGFpbiBgaW5zdGFuY2VvZmBcbiAgLy8gd291bGQgcmV0dXJuIGZhbHNlLCBhcyBubyBgX3dyaXRhYmxlU3RhdGVgIHByb3BlcnR5IGlzIGF0dGFjaGVkLlxuXG4gIC8vIFRyeWluZyB0byB1c2UgdGhlIGN1c3RvbSBgaW5zdGFuY2VvZmAgZm9yIFdyaXRhYmxlIGhlcmUgd2lsbCBhbHNvIGJyZWFrIHRoZVxuICAvLyBOb2RlLmpzIExhenlUcmFuc2Zvcm0gaW1wbGVtZW50YXRpb24sIHdoaWNoIGhhcyBhIG5vbi10cml2aWFsIGdldHRlciBmb3JcbiAgLy8gYF93cml0YWJsZVN0YXRlYCB0aGF0IHdvdWxkIGxlYWQgdG8gaW5maW5pdGUgcmVjdXJzaW9uLlxuICBpZiAoIXJlYWxIYXNJbnN0YW5jZS5jYWxsKFdyaXRhYmxlLCB0aGlzKSAmJiAhKHRoaXMgaW5zdGFuY2VvZiBEdXBsZXgpKSB7XG4gICAgcmV0dXJuIG5ldyBXcml0YWJsZShvcHRpb25zKTtcbiAgfVxuXG4gIHRoaXMuX3dyaXRhYmxlU3RhdGUgPSBuZXcgV3JpdGFibGVTdGF0ZShvcHRpb25zLCB0aGlzKTtcblxuICAvLyBsZWdhY3kuXG4gIHRoaXMud3JpdGFibGUgPSB0cnVlO1xuXG4gIGlmIChvcHRpb25zKSB7XG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLndyaXRlID09PSAnZnVuY3Rpb24nKSB0aGlzLl93cml0ZSA9IG9wdGlvbnMud3JpdGU7XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMud3JpdGV2ID09PSAnZnVuY3Rpb24nKSB0aGlzLl93cml0ZXYgPSBvcHRpb25zLndyaXRldjtcblxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5kZXN0cm95ID09PSAnZnVuY3Rpb24nKSB0aGlzLl9kZXN0cm95ID0gb3B0aW9ucy5kZXN0cm95O1xuXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLmZpbmFsID09PSAnZnVuY3Rpb24nKSB0aGlzLl9maW5hbCA9IG9wdGlvbnMuZmluYWw7XG4gIH1cblxuICBTdHJlYW0uY2FsbCh0aGlzKTtcbn1cblxuLy8gT3RoZXJ3aXNlIHBlb3BsZSBjYW4gcGlwZSBXcml0YWJsZSBzdHJlYW1zLCB3aGljaCBpcyBqdXN0IHdyb25nLlxuV3JpdGFibGUucHJvdG90eXBlLnBpcGUgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZW1pdCgnZXJyb3InLCBuZXcgRXJyb3IoJ0Nhbm5vdCBwaXBlLCBub3QgcmVhZGFibGUnKSk7XG59O1xuXG5mdW5jdGlvbiB3cml0ZUFmdGVyRW5kKHN0cmVhbSwgY2IpIHtcbiAgdmFyIGVyID0gbmV3IEVycm9yKCd3cml0ZSBhZnRlciBlbmQnKTtcbiAgLy8gVE9ETzogZGVmZXIgZXJyb3IgZXZlbnRzIGNvbnNpc3RlbnRseSBldmVyeXdoZXJlLCBub3QganVzdCB0aGUgY2JcbiAgc3RyZWFtLmVtaXQoJ2Vycm9yJywgZXIpO1xuICBwbmEubmV4dFRpY2soY2IsIGVyKTtcbn1cblxuLy8gQ2hlY2tzIHRoYXQgYSB1c2VyLXN1cHBsaWVkIGNodW5rIGlzIHZhbGlkLCBlc3BlY2lhbGx5IGZvciB0aGUgcGFydGljdWxhclxuLy8gbW9kZSB0aGUgc3RyZWFtIGlzIGluLiBDdXJyZW50bHkgdGhpcyBtZWFucyB0aGF0IGBudWxsYCBpcyBuZXZlciBhY2NlcHRlZFxuLy8gYW5kIHVuZGVmaW5lZC9ub24tc3RyaW5nIHZhbHVlcyBhcmUgb25seSBhbGxvd2VkIGluIG9iamVjdCBtb2RlLlxuZnVuY3Rpb24gdmFsaWRDaHVuayhzdHJlYW0sIHN0YXRlLCBjaHVuaywgY2IpIHtcbiAgdmFyIHZhbGlkID0gdHJ1ZTtcbiAgdmFyIGVyID0gZmFsc2U7XG5cbiAgaWYgKGNodW5rID09PSBudWxsKSB7XG4gICAgZXIgPSBuZXcgVHlwZUVycm9yKCdNYXkgbm90IHdyaXRlIG51bGwgdmFsdWVzIHRvIHN0cmVhbScpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBjaHVuayAhPT0gJ3N0cmluZycgJiYgY2h1bmsgIT09IHVuZGVmaW5lZCAmJiAhc3RhdGUub2JqZWN0TW9kZSkge1xuICAgIGVyID0gbmV3IFR5cGVFcnJvcignSW52YWxpZCBub24tc3RyaW5nL2J1ZmZlciBjaHVuaycpO1xuICB9XG4gIGlmIChlcikge1xuICAgIHN0cmVhbS5lbWl0KCdlcnJvcicsIGVyKTtcbiAgICBwbmEubmV4dFRpY2soY2IsIGVyKTtcbiAgICB2YWxpZCA9IGZhbHNlO1xuICB9XG4gIHJldHVybiB2YWxpZDtcbn1cblxuV3JpdGFibGUucHJvdG90eXBlLndyaXRlID0gZnVuY3Rpb24gKGNodW5rLCBlbmNvZGluZywgY2IpIHtcbiAgdmFyIHN0YXRlID0gdGhpcy5fd3JpdGFibGVTdGF0ZTtcbiAgdmFyIHJldCA9IGZhbHNlO1xuICB2YXIgaXNCdWYgPSAhc3RhdGUub2JqZWN0TW9kZSAmJiBfaXNVaW50OEFycmF5KGNodW5rKTtcblxuICBpZiAoaXNCdWYgJiYgIUJ1ZmZlci5pc0J1ZmZlcihjaHVuaykpIHtcbiAgICBjaHVuayA9IF91aW50OEFycmF5VG9CdWZmZXIoY2h1bmspO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBlbmNvZGluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNiID0gZW5jb2Rpbmc7XG4gICAgZW5jb2RpbmcgPSBudWxsO1xuICB9XG5cbiAgaWYgKGlzQnVmKSBlbmNvZGluZyA9ICdidWZmZXInO2Vsc2UgaWYgKCFlbmNvZGluZykgZW5jb2RpbmcgPSBzdGF0ZS5kZWZhdWx0RW5jb2Rpbmc7XG5cbiAgaWYgKHR5cGVvZiBjYiAhPT0gJ2Z1bmN0aW9uJykgY2IgPSBub3A7XG5cbiAgaWYgKHN0YXRlLmVuZGVkKSB3cml0ZUFmdGVyRW5kKHRoaXMsIGNiKTtlbHNlIGlmIChpc0J1ZiB8fCB2YWxpZENodW5rKHRoaXMsIHN0YXRlLCBjaHVuaywgY2IpKSB7XG4gICAgc3RhdGUucGVuZGluZ2NiKys7XG4gICAgcmV0ID0gd3JpdGVPckJ1ZmZlcih0aGlzLCBzdGF0ZSwgaXNCdWYsIGNodW5rLCBlbmNvZGluZywgY2IpO1xuICB9XG5cbiAgcmV0dXJuIHJldDtcbn07XG5cbldyaXRhYmxlLnByb3RvdHlwZS5jb3JrID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc3RhdGUgPSB0aGlzLl93cml0YWJsZVN0YXRlO1xuXG4gIHN0YXRlLmNvcmtlZCsrO1xufTtcblxuV3JpdGFibGUucHJvdG90eXBlLnVuY29yayA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHN0YXRlID0gdGhpcy5fd3JpdGFibGVTdGF0ZTtcblxuICBpZiAoc3RhdGUuY29ya2VkKSB7XG4gICAgc3RhdGUuY29ya2VkLS07XG5cbiAgICBpZiAoIXN0YXRlLndyaXRpbmcgJiYgIXN0YXRlLmNvcmtlZCAmJiAhc3RhdGUuZmluaXNoZWQgJiYgIXN0YXRlLmJ1ZmZlclByb2Nlc3NpbmcgJiYgc3RhdGUuYnVmZmVyZWRSZXF1ZXN0KSBjbGVhckJ1ZmZlcih0aGlzLCBzdGF0ZSk7XG4gIH1cbn07XG5cbldyaXRhYmxlLnByb3RvdHlwZS5zZXREZWZhdWx0RW5jb2RpbmcgPSBmdW5jdGlvbiBzZXREZWZhdWx0RW5jb2RpbmcoZW5jb2RpbmcpIHtcbiAgLy8gbm9kZTo6UGFyc2VFbmNvZGluZygpIHJlcXVpcmVzIGxvd2VyIGNhc2UuXG4gIGlmICh0eXBlb2YgZW5jb2RpbmcgPT09ICdzdHJpbmcnKSBlbmNvZGluZyA9IGVuY29kaW5nLnRvTG93ZXJDYXNlKCk7XG4gIGlmICghKFsnaGV4JywgJ3V0ZjgnLCAndXRmLTgnLCAnYXNjaWknLCAnYmluYXJ5JywgJ2Jhc2U2NCcsICd1Y3MyJywgJ3Vjcy0yJywgJ3V0ZjE2bGUnLCAndXRmLTE2bGUnLCAncmF3J10uaW5kZXhPZigoZW5jb2RpbmcgKyAnJykudG9Mb3dlckNhc2UoKSkgPiAtMSkpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZyk7XG4gIHRoaXMuX3dyaXRhYmxlU3RhdGUuZGVmYXVsdEVuY29kaW5nID0gZW5jb2Rpbmc7XG4gIHJldHVybiB0aGlzO1xufTtcblxuZnVuY3Rpb24gZGVjb2RlQ2h1bmsoc3RhdGUsIGNodW5rLCBlbmNvZGluZykge1xuICBpZiAoIXN0YXRlLm9iamVjdE1vZGUgJiYgc3RhdGUuZGVjb2RlU3RyaW5ncyAhPT0gZmFsc2UgJiYgdHlwZW9mIGNodW5rID09PSAnc3RyaW5nJykge1xuICAgIGNodW5rID0gQnVmZmVyLmZyb20oY2h1bmssIGVuY29kaW5nKTtcbiAgfVxuICByZXR1cm4gY2h1bms7XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShXcml0YWJsZS5wcm90b3R5cGUsICd3cml0YWJsZUhpZ2hXYXRlck1hcmsnLCB7XG4gIC8vIG1ha2luZyBpdCBleHBsaWNpdCB0aGlzIHByb3BlcnR5IGlzIG5vdCBlbnVtZXJhYmxlXG4gIC8vIGJlY2F1c2Ugb3RoZXJ3aXNlIHNvbWUgcHJvdG90eXBlIG1hbmlwdWxhdGlvbiBpblxuICAvLyB1c2VybGFuZCB3aWxsIGZhaWxcbiAgZW51bWVyYWJsZTogZmFsc2UsXG4gIGdldDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLl93cml0YWJsZVN0YXRlLmhpZ2hXYXRlck1hcms7XG4gIH1cbn0pO1xuXG4vLyBpZiB3ZSdyZSBhbHJlYWR5IHdyaXRpbmcgc29tZXRoaW5nLCB0aGVuIGp1c3QgcHV0IHRoaXNcbi8vIGluIHRoZSBxdWV1ZSwgYW5kIHdhaXQgb3VyIHR1cm4uICBPdGhlcndpc2UsIGNhbGwgX3dyaXRlXG4vLyBJZiB3ZSByZXR1cm4gZmFsc2UsIHRoZW4gd2UgbmVlZCBhIGRyYWluIGV2ZW50LCBzbyBzZXQgdGhhdCBmbGFnLlxuZnVuY3Rpb24gd3JpdGVPckJ1ZmZlcihzdHJlYW0sIHN0YXRlLCBpc0J1ZiwgY2h1bmssIGVuY29kaW5nLCBjYikge1xuICBpZiAoIWlzQnVmKSB7XG4gICAgdmFyIG5ld0NodW5rID0gZGVjb2RlQ2h1bmsoc3RhdGUsIGNodW5rLCBlbmNvZGluZyk7XG4gICAgaWYgKGNodW5rICE9PSBuZXdDaHVuaykge1xuICAgICAgaXNCdWYgPSB0cnVlO1xuICAgICAgZW5jb2RpbmcgPSAnYnVmZmVyJztcbiAgICAgIGNodW5rID0gbmV3Q2h1bms7XG4gICAgfVxuICB9XG4gIHZhciBsZW4gPSBzdGF0ZS5vYmplY3RNb2RlID8gMSA6IGNodW5rLmxlbmd0aDtcblxuICBzdGF0ZS5sZW5ndGggKz0gbGVuO1xuXG4gIHZhciByZXQgPSBzdGF0ZS5sZW5ndGggPCBzdGF0ZS5oaWdoV2F0ZXJNYXJrO1xuICAvLyB3ZSBtdXN0IGVuc3VyZSB0aGF0IHByZXZpb3VzIG5lZWREcmFpbiB3aWxsIG5vdCBiZSByZXNldCB0byBmYWxzZS5cbiAgaWYgKCFyZXQpIHN0YXRlLm5lZWREcmFpbiA9IHRydWU7XG5cbiAgaWYgKHN0YXRlLndyaXRpbmcgfHwgc3RhdGUuY29ya2VkKSB7XG4gICAgdmFyIGxhc3QgPSBzdGF0ZS5sYXN0QnVmZmVyZWRSZXF1ZXN0O1xuICAgIHN0YXRlLmxhc3RCdWZmZXJlZFJlcXVlc3QgPSB7XG4gICAgICBjaHVuazogY2h1bmssXG4gICAgICBlbmNvZGluZzogZW5jb2RpbmcsXG4gICAgICBpc0J1ZjogaXNCdWYsXG4gICAgICBjYWxsYmFjazogY2IsXG4gICAgICBuZXh0OiBudWxsXG4gICAgfTtcbiAgICBpZiAobGFzdCkge1xuICAgICAgbGFzdC5uZXh0ID0gc3RhdGUubGFzdEJ1ZmZlcmVkUmVxdWVzdDtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhdGUuYnVmZmVyZWRSZXF1ZXN0ID0gc3RhdGUubGFzdEJ1ZmZlcmVkUmVxdWVzdDtcbiAgICB9XG4gICAgc3RhdGUuYnVmZmVyZWRSZXF1ZXN0Q291bnQgKz0gMTtcbiAgfSBlbHNlIHtcbiAgICBkb1dyaXRlKHN0cmVhbSwgc3RhdGUsIGZhbHNlLCBsZW4sIGNodW5rLCBlbmNvZGluZywgY2IpO1xuICB9XG5cbiAgcmV0dXJuIHJldDtcbn1cblxuZnVuY3Rpb24gZG9Xcml0ZShzdHJlYW0sIHN0YXRlLCB3cml0ZXYsIGxlbiwgY2h1bmssIGVuY29kaW5nLCBjYikge1xuICBzdGF0ZS53cml0ZWxlbiA9IGxlbjtcbiAgc3RhdGUud3JpdGVjYiA9IGNiO1xuICBzdGF0ZS53cml0aW5nID0gdHJ1ZTtcbiAgc3RhdGUuc3luYyA9IHRydWU7XG4gIGlmICh3cml0ZXYpIHN0cmVhbS5fd3JpdGV2KGNodW5rLCBzdGF0ZS5vbndyaXRlKTtlbHNlIHN0cmVhbS5fd3JpdGUoY2h1bmssIGVuY29kaW5nLCBzdGF0ZS5vbndyaXRlKTtcbiAgc3RhdGUuc3luYyA9IGZhbHNlO1xufVxuXG5mdW5jdGlvbiBvbndyaXRlRXJyb3Ioc3RyZWFtLCBzdGF0ZSwgc3luYywgZXIsIGNiKSB7XG4gIC0tc3RhdGUucGVuZGluZ2NiO1xuXG4gIGlmIChzeW5jKSB7XG4gICAgLy8gZGVmZXIgdGhlIGNhbGxiYWNrIGlmIHdlIGFyZSBiZWluZyBjYWxsZWQgc3luY2hyb25vdXNseVxuICAgIC8vIHRvIGF2b2lkIHBpbGluZyB1cCB0aGluZ3Mgb24gdGhlIHN0YWNrXG4gICAgcG5hLm5leHRUaWNrKGNiLCBlcik7XG4gICAgLy8gdGhpcyBjYW4gZW1pdCBmaW5pc2gsIGFuZCBpdCB3aWxsIGFsd2F5cyBoYXBwZW5cbiAgICAvLyBhZnRlciBlcnJvclxuICAgIHBuYS5uZXh0VGljayhmaW5pc2hNYXliZSwgc3RyZWFtLCBzdGF0ZSk7XG4gICAgc3RyZWFtLl93cml0YWJsZVN0YXRlLmVycm9yRW1pdHRlZCA9IHRydWU7XG4gICAgc3RyZWFtLmVtaXQoJ2Vycm9yJywgZXIpO1xuICB9IGVsc2Uge1xuICAgIC8vIHRoZSBjYWxsZXIgZXhwZWN0IHRoaXMgdG8gaGFwcGVuIGJlZm9yZSBpZlxuICAgIC8vIGl0IGlzIGFzeW5jXG4gICAgY2IoZXIpO1xuICAgIHN0cmVhbS5fd3JpdGFibGVTdGF0ZS5lcnJvckVtaXR0ZWQgPSB0cnVlO1xuICAgIHN0cmVhbS5lbWl0KCdlcnJvcicsIGVyKTtcbiAgICAvLyB0aGlzIGNhbiBlbWl0IGZpbmlzaCwgYnV0IGZpbmlzaCBtdXN0XG4gICAgLy8gYWx3YXlzIGZvbGxvdyBlcnJvclxuICAgIGZpbmlzaE1heWJlKHN0cmVhbSwgc3RhdGUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIG9ud3JpdGVTdGF0ZVVwZGF0ZShzdGF0ZSkge1xuICBzdGF0ZS53cml0aW5nID0gZmFsc2U7XG4gIHN0YXRlLndyaXRlY2IgPSBudWxsO1xuICBzdGF0ZS5sZW5ndGggLT0gc3RhdGUud3JpdGVsZW47XG4gIHN0YXRlLndyaXRlbGVuID0gMDtcbn1cblxuZnVuY3Rpb24gb253cml0ZShzdHJlYW0sIGVyKSB7XG4gIHZhciBzdGF0ZSA9IHN0cmVhbS5fd3JpdGFibGVTdGF0ZTtcbiAgdmFyIHN5bmMgPSBzdGF0ZS5zeW5jO1xuICB2YXIgY2IgPSBzdGF0ZS53cml0ZWNiO1xuXG4gIG9ud3JpdGVTdGF0ZVVwZGF0ZShzdGF0ZSk7XG5cbiAgaWYgKGVyKSBvbndyaXRlRXJyb3Ioc3RyZWFtLCBzdGF0ZSwgc3luYywgZXIsIGNiKTtlbHNlIHtcbiAgICAvLyBDaGVjayBpZiB3ZSdyZSBhY3R1YWxseSByZWFkeSB0byBmaW5pc2gsIGJ1dCBkb24ndCBlbWl0IHlldFxuICAgIHZhciBmaW5pc2hlZCA9IG5lZWRGaW5pc2goc3RhdGUpO1xuXG4gICAgaWYgKCFmaW5pc2hlZCAmJiAhc3RhdGUuY29ya2VkICYmICFzdGF0ZS5idWZmZXJQcm9jZXNzaW5nICYmIHN0YXRlLmJ1ZmZlcmVkUmVxdWVzdCkge1xuICAgICAgY2xlYXJCdWZmZXIoc3RyZWFtLCBzdGF0ZSk7XG4gICAgfVxuXG4gICAgaWYgKHN5bmMpIHtcbiAgICAgIC8qPHJlcGxhY2VtZW50PiovXG4gICAgICBhc3luY1dyaXRlKGFmdGVyV3JpdGUsIHN0cmVhbSwgc3RhdGUsIGZpbmlzaGVkLCBjYik7XG4gICAgICAvKjwvcmVwbGFjZW1lbnQ+Ki9cbiAgICB9IGVsc2Uge1xuICAgICAgYWZ0ZXJXcml0ZShzdHJlYW0sIHN0YXRlLCBmaW5pc2hlZCwgY2IpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBhZnRlcldyaXRlKHN0cmVhbSwgc3RhdGUsIGZpbmlzaGVkLCBjYikge1xuICBpZiAoIWZpbmlzaGVkKSBvbndyaXRlRHJhaW4oc3RyZWFtLCBzdGF0ZSk7XG4gIHN0YXRlLnBlbmRpbmdjYi0tO1xuICBjYigpO1xuICBmaW5pc2hNYXliZShzdHJlYW0sIHN0YXRlKTtcbn1cblxuLy8gTXVzdCBmb3JjZSBjYWxsYmFjayB0byBiZSBjYWxsZWQgb24gbmV4dFRpY2ssIHNvIHRoYXQgd2UgZG9uJ3Rcbi8vIGVtaXQgJ2RyYWluJyBiZWZvcmUgdGhlIHdyaXRlKCkgY29uc3VtZXIgZ2V0cyB0aGUgJ2ZhbHNlJyByZXR1cm5cbi8vIHZhbHVlLCBhbmQgaGFzIGEgY2hhbmNlIHRvIGF0dGFjaCBhICdkcmFpbicgbGlzdGVuZXIuXG5mdW5jdGlvbiBvbndyaXRlRHJhaW4oc3RyZWFtLCBzdGF0ZSkge1xuICBpZiAoc3RhdGUubGVuZ3RoID09PSAwICYmIHN0YXRlLm5lZWREcmFpbikge1xuICAgIHN0YXRlLm5lZWREcmFpbiA9IGZhbHNlO1xuICAgIHN0cmVhbS5lbWl0KCdkcmFpbicpO1xuICB9XG59XG5cbi8vIGlmIHRoZXJlJ3Mgc29tZXRoaW5nIGluIHRoZSBidWZmZXIgd2FpdGluZywgdGhlbiBwcm9jZXNzIGl0XG5mdW5jdGlvbiBjbGVhckJ1ZmZlcihzdHJlYW0sIHN0YXRlKSB7XG4gIHN0YXRlLmJ1ZmZlclByb2Nlc3NpbmcgPSB0cnVlO1xuICB2YXIgZW50cnkgPSBzdGF0ZS5idWZmZXJlZFJlcXVlc3Q7XG5cbiAgaWYgKHN0cmVhbS5fd3JpdGV2ICYmIGVudHJ5ICYmIGVudHJ5Lm5leHQpIHtcbiAgICAvLyBGYXN0IGNhc2UsIHdyaXRlIGV2ZXJ5dGhpbmcgdXNpbmcgX3dyaXRldigpXG4gICAgdmFyIGwgPSBzdGF0ZS5idWZmZXJlZFJlcXVlc3RDb3VudDtcbiAgICB2YXIgYnVmZmVyID0gbmV3IEFycmF5KGwpO1xuICAgIHZhciBob2xkZXIgPSBzdGF0ZS5jb3JrZWRSZXF1ZXN0c0ZyZWU7XG4gICAgaG9sZGVyLmVudHJ5ID0gZW50cnk7XG5cbiAgICB2YXIgY291bnQgPSAwO1xuICAgIHZhciBhbGxCdWZmZXJzID0gdHJ1ZTtcbiAgICB3aGlsZSAoZW50cnkpIHtcbiAgICAgIGJ1ZmZlcltjb3VudF0gPSBlbnRyeTtcbiAgICAgIGlmICghZW50cnkuaXNCdWYpIGFsbEJ1ZmZlcnMgPSBmYWxzZTtcbiAgICAgIGVudHJ5ID0gZW50cnkubmV4dDtcbiAgICAgIGNvdW50ICs9IDE7XG4gICAgfVxuICAgIGJ1ZmZlci5hbGxCdWZmZXJzID0gYWxsQnVmZmVycztcblxuICAgIGRvV3JpdGUoc3RyZWFtLCBzdGF0ZSwgdHJ1ZSwgc3RhdGUubGVuZ3RoLCBidWZmZXIsICcnLCBob2xkZXIuZmluaXNoKTtcblxuICAgIC8vIGRvV3JpdGUgaXMgYWxtb3N0IGFsd2F5cyBhc3luYywgZGVmZXIgdGhlc2UgdG8gc2F2ZSBhIGJpdCBvZiB0aW1lXG4gICAgLy8gYXMgdGhlIGhvdCBwYXRoIGVuZHMgd2l0aCBkb1dyaXRlXG4gICAgc3RhdGUucGVuZGluZ2NiKys7XG4gICAgc3RhdGUubGFzdEJ1ZmZlcmVkUmVxdWVzdCA9IG51bGw7XG4gICAgaWYgKGhvbGRlci5uZXh0KSB7XG4gICAgICBzdGF0ZS5jb3JrZWRSZXF1ZXN0c0ZyZWUgPSBob2xkZXIubmV4dDtcbiAgICAgIGhvbGRlci5uZXh0ID0gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhdGUuY29ya2VkUmVxdWVzdHNGcmVlID0gbmV3IENvcmtlZFJlcXVlc3Qoc3RhdGUpO1xuICAgIH1cbiAgICBzdGF0ZS5idWZmZXJlZFJlcXVlc3RDb3VudCA9IDA7XG4gIH0gZWxzZSB7XG4gICAgLy8gU2xvdyBjYXNlLCB3cml0ZSBjaHVua3Mgb25lLWJ5LW9uZVxuICAgIHdoaWxlIChlbnRyeSkge1xuICAgICAgdmFyIGNodW5rID0gZW50cnkuY2h1bms7XG4gICAgICB2YXIgZW5jb2RpbmcgPSBlbnRyeS5lbmNvZGluZztcbiAgICAgIHZhciBjYiA9IGVudHJ5LmNhbGxiYWNrO1xuICAgICAgdmFyIGxlbiA9IHN0YXRlLm9iamVjdE1vZGUgPyAxIDogY2h1bmsubGVuZ3RoO1xuXG4gICAgICBkb1dyaXRlKHN0cmVhbSwgc3RhdGUsIGZhbHNlLCBsZW4sIGNodW5rLCBlbmNvZGluZywgY2IpO1xuICAgICAgZW50cnkgPSBlbnRyeS5uZXh0O1xuICAgICAgc3RhdGUuYnVmZmVyZWRSZXF1ZXN0Q291bnQtLTtcbiAgICAgIC8vIGlmIHdlIGRpZG4ndCBjYWxsIHRoZSBvbndyaXRlIGltbWVkaWF0ZWx5LCB0aGVuXG4gICAgICAvLyBpdCBtZWFucyB0aGF0IHdlIG5lZWQgdG8gd2FpdCB1bnRpbCBpdCBkb2VzLlxuICAgICAgLy8gYWxzbywgdGhhdCBtZWFucyB0aGF0IHRoZSBjaHVuayBhbmQgY2IgYXJlIGN1cnJlbnRseVxuICAgICAgLy8gYmVpbmcgcHJvY2Vzc2VkLCBzbyBtb3ZlIHRoZSBidWZmZXIgY291bnRlciBwYXN0IHRoZW0uXG4gICAgICBpZiAoc3RhdGUud3JpdGluZykge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZW50cnkgPT09IG51bGwpIHN0YXRlLmxhc3RCdWZmZXJlZFJlcXVlc3QgPSBudWxsO1xuICB9XG5cbiAgc3RhdGUuYnVmZmVyZWRSZXF1ZXN0ID0gZW50cnk7XG4gIHN0YXRlLmJ1ZmZlclByb2Nlc3NpbmcgPSBmYWxzZTtcbn1cblxuV3JpdGFibGUucHJvdG90eXBlLl93cml0ZSA9IGZ1bmN0aW9uIChjaHVuaywgZW5jb2RpbmcsIGNiKSB7XG4gIGNiKG5ldyBFcnJvcignX3dyaXRlKCkgaXMgbm90IGltcGxlbWVudGVkJykpO1xufTtcblxuV3JpdGFibGUucHJvdG90eXBlLl93cml0ZXYgPSBudWxsO1xuXG5Xcml0YWJsZS5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24gKGNodW5rLCBlbmNvZGluZywgY2IpIHtcbiAgdmFyIHN0YXRlID0gdGhpcy5fd3JpdGFibGVTdGF0ZTtcblxuICBpZiAodHlwZW9mIGNodW5rID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2IgPSBjaHVuaztcbiAgICBjaHVuayA9IG51bGw7XG4gICAgZW5jb2RpbmcgPSBudWxsO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBlbmNvZGluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNiID0gZW5jb2Rpbmc7XG4gICAgZW5jb2RpbmcgPSBudWxsO1xuICB9XG5cbiAgaWYgKGNodW5rICE9PSBudWxsICYmIGNodW5rICE9PSB1bmRlZmluZWQpIHRoaXMud3JpdGUoY2h1bmssIGVuY29kaW5nKTtcblxuICAvLyAuZW5kKCkgZnVsbHkgdW5jb3Jrc1xuICBpZiAoc3RhdGUuY29ya2VkKSB7XG4gICAgc3RhdGUuY29ya2VkID0gMTtcbiAgICB0aGlzLnVuY29yaygpO1xuICB9XG5cbiAgLy8gaWdub3JlIHVubmVjZXNzYXJ5IGVuZCgpIGNhbGxzLlxuICBpZiAoIXN0YXRlLmVuZGluZyAmJiAhc3RhdGUuZmluaXNoZWQpIGVuZFdyaXRhYmxlKHRoaXMsIHN0YXRlLCBjYik7XG59O1xuXG5mdW5jdGlvbiBuZWVkRmluaXNoKHN0YXRlKSB7XG4gIHJldHVybiBzdGF0ZS5lbmRpbmcgJiYgc3RhdGUubGVuZ3RoID09PSAwICYmIHN0YXRlLmJ1ZmZlcmVkUmVxdWVzdCA9PT0gbnVsbCAmJiAhc3RhdGUuZmluaXNoZWQgJiYgIXN0YXRlLndyaXRpbmc7XG59XG5mdW5jdGlvbiBjYWxsRmluYWwoc3RyZWFtLCBzdGF0ZSkge1xuICBzdHJlYW0uX2ZpbmFsKGZ1bmN0aW9uIChlcnIpIHtcbiAgICBzdGF0ZS5wZW5kaW5nY2ItLTtcbiAgICBpZiAoZXJyKSB7XG4gICAgICBzdHJlYW0uZW1pdCgnZXJyb3InLCBlcnIpO1xuICAgIH1cbiAgICBzdGF0ZS5wcmVmaW5pc2hlZCA9IHRydWU7XG4gICAgc3RyZWFtLmVtaXQoJ3ByZWZpbmlzaCcpO1xuICAgIGZpbmlzaE1heWJlKHN0cmVhbSwgc3RhdGUpO1xuICB9KTtcbn1cbmZ1bmN0aW9uIHByZWZpbmlzaChzdHJlYW0sIHN0YXRlKSB7XG4gIGlmICghc3RhdGUucHJlZmluaXNoZWQgJiYgIXN0YXRlLmZpbmFsQ2FsbGVkKSB7XG4gICAgaWYgKHR5cGVvZiBzdHJlYW0uX2ZpbmFsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBzdGF0ZS5wZW5kaW5nY2IrKztcbiAgICAgIHN0YXRlLmZpbmFsQ2FsbGVkID0gdHJ1ZTtcbiAgICAgIHBuYS5uZXh0VGljayhjYWxsRmluYWwsIHN0cmVhbSwgc3RhdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGF0ZS5wcmVmaW5pc2hlZCA9IHRydWU7XG4gICAgICBzdHJlYW0uZW1pdCgncHJlZmluaXNoJyk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGZpbmlzaE1heWJlKHN0cmVhbSwgc3RhdGUpIHtcbiAgdmFyIG5lZWQgPSBuZWVkRmluaXNoKHN0YXRlKTtcbiAgaWYgKG5lZWQpIHtcbiAgICBwcmVmaW5pc2goc3RyZWFtLCBzdGF0ZSk7XG4gICAgaWYgKHN0YXRlLnBlbmRpbmdjYiA9PT0gMCkge1xuICAgICAgc3RhdGUuZmluaXNoZWQgPSB0cnVlO1xuICAgICAgc3RyZWFtLmVtaXQoJ2ZpbmlzaCcpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbmVlZDtcbn1cblxuZnVuY3Rpb24gZW5kV3JpdGFibGUoc3RyZWFtLCBzdGF0ZSwgY2IpIHtcbiAgc3RhdGUuZW5kaW5nID0gdHJ1ZTtcbiAgZmluaXNoTWF5YmUoc3RyZWFtLCBzdGF0ZSk7XG4gIGlmIChjYikge1xuICAgIGlmIChzdGF0ZS5maW5pc2hlZCkgcG5hLm5leHRUaWNrKGNiKTtlbHNlIHN0cmVhbS5vbmNlKCdmaW5pc2gnLCBjYik7XG4gIH1cbiAgc3RhdGUuZW5kZWQgPSB0cnVlO1xuICBzdHJlYW0ud3JpdGFibGUgPSBmYWxzZTtcbn1cblxuZnVuY3Rpb24gb25Db3JrZWRGaW5pc2goY29ya1JlcSwgc3RhdGUsIGVycikge1xuICB2YXIgZW50cnkgPSBjb3JrUmVxLmVudHJ5O1xuICBjb3JrUmVxLmVudHJ5ID0gbnVsbDtcbiAgd2hpbGUgKGVudHJ5KSB7XG4gICAgdmFyIGNiID0gZW50cnkuY2FsbGJhY2s7XG4gICAgc3RhdGUucGVuZGluZ2NiLS07XG4gICAgY2IoZXJyKTtcbiAgICBlbnRyeSA9IGVudHJ5Lm5leHQ7XG4gIH1cbiAgaWYgKHN0YXRlLmNvcmtlZFJlcXVlc3RzRnJlZSkge1xuICAgIHN0YXRlLmNvcmtlZFJlcXVlc3RzRnJlZS5uZXh0ID0gY29ya1JlcTtcbiAgfSBlbHNlIHtcbiAgICBzdGF0ZS5jb3JrZWRSZXF1ZXN0c0ZyZWUgPSBjb3JrUmVxO1xuICB9XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShXcml0YWJsZS5wcm90b3R5cGUsICdkZXN0cm95ZWQnLCB7XG4gIGdldDogZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLl93cml0YWJsZVN0YXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3dyaXRhYmxlU3RhdGUuZGVzdHJveWVkO1xuICB9LFxuICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIC8vIHdlIGlnbm9yZSB0aGUgdmFsdWUgaWYgdGhlIHN0cmVhbVxuICAgIC8vIGhhcyBub3QgYmVlbiBpbml0aWFsaXplZCB5ZXRcbiAgICBpZiAoIXRoaXMuX3dyaXRhYmxlU3RhdGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBiYWNrd2FyZCBjb21wYXRpYmlsaXR5LCB0aGUgdXNlciBpcyBleHBsaWNpdGx5XG4gICAgLy8gbWFuYWdpbmcgZGVzdHJveWVkXG4gICAgdGhpcy5fd3JpdGFibGVTdGF0ZS5kZXN0cm95ZWQgPSB2YWx1ZTtcbiAgfVxufSk7XG5cbldyaXRhYmxlLnByb3RvdHlwZS5kZXN0cm95ID0gZGVzdHJveUltcGwuZGVzdHJveTtcbldyaXRhYmxlLnByb3RvdHlwZS5fdW5kZXN0cm95ID0gZGVzdHJveUltcGwudW5kZXN0cm95O1xuV3JpdGFibGUucHJvdG90eXBlLl9kZXN0cm95ID0gZnVuY3Rpb24gKGVyciwgY2IpIHtcbiAgdGhpcy5lbmQoKTtcbiAgY2IoZXJyKTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgQnVmZmVyID0gcmVxdWlyZSgnc2FmZS1idWZmZXInKS5CdWZmZXI7XG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKTtcblxuZnVuY3Rpb24gY29weUJ1ZmZlcihzcmMsIHRhcmdldCwgb2Zmc2V0KSB7XG4gIHNyYy5jb3B5KHRhcmdldCwgb2Zmc2V0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEJ1ZmZlckxpc3QoKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEJ1ZmZlckxpc3QpO1xuXG4gICAgdGhpcy5oZWFkID0gbnVsbDtcbiAgICB0aGlzLnRhaWwgPSBudWxsO1xuICAgIHRoaXMubGVuZ3RoID0gMDtcbiAgfVxuXG4gIEJ1ZmZlckxpc3QucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiBwdXNoKHYpIHtcbiAgICB2YXIgZW50cnkgPSB7IGRhdGE6IHYsIG5leHQ6IG51bGwgfTtcbiAgICBpZiAodGhpcy5sZW5ndGggPiAwKSB0aGlzLnRhaWwubmV4dCA9IGVudHJ5O2Vsc2UgdGhpcy5oZWFkID0gZW50cnk7XG4gICAgdGhpcy50YWlsID0gZW50cnk7XG4gICAgKyt0aGlzLmxlbmd0aDtcbiAgfTtcblxuICBCdWZmZXJMaXN0LnByb3RvdHlwZS51bnNoaWZ0ID0gZnVuY3Rpb24gdW5zaGlmdCh2KSB7XG4gICAgdmFyIGVudHJ5ID0geyBkYXRhOiB2LCBuZXh0OiB0aGlzLmhlYWQgfTtcbiAgICBpZiAodGhpcy5sZW5ndGggPT09IDApIHRoaXMudGFpbCA9IGVudHJ5O1xuICAgIHRoaXMuaGVhZCA9IGVudHJ5O1xuICAgICsrdGhpcy5sZW5ndGg7XG4gIH07XG5cbiAgQnVmZmVyTGlzdC5wcm90b3R5cGUuc2hpZnQgPSBmdW5jdGlvbiBzaGlmdCgpIHtcbiAgICBpZiAodGhpcy5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICB2YXIgcmV0ID0gdGhpcy5oZWFkLmRhdGE7XG4gICAgaWYgKHRoaXMubGVuZ3RoID09PSAxKSB0aGlzLmhlYWQgPSB0aGlzLnRhaWwgPSBudWxsO2Vsc2UgdGhpcy5oZWFkID0gdGhpcy5oZWFkLm5leHQ7XG4gICAgLS10aGlzLmxlbmd0aDtcbiAgICByZXR1cm4gcmV0O1xuICB9O1xuXG4gIEJ1ZmZlckxpc3QucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgdGhpcy5oZWFkID0gdGhpcy50YWlsID0gbnVsbDtcbiAgICB0aGlzLmxlbmd0aCA9IDA7XG4gIH07XG5cbiAgQnVmZmVyTGlzdC5wcm90b3R5cGUuam9pbiA9IGZ1bmN0aW9uIGpvaW4ocykge1xuICAgIGlmICh0aGlzLmxlbmd0aCA9PT0gMCkgcmV0dXJuICcnO1xuICAgIHZhciBwID0gdGhpcy5oZWFkO1xuICAgIHZhciByZXQgPSAnJyArIHAuZGF0YTtcbiAgICB3aGlsZSAocCA9IHAubmV4dCkge1xuICAgICAgcmV0ICs9IHMgKyBwLmRhdGE7XG4gICAgfXJldHVybiByZXQ7XG4gIH07XG5cbiAgQnVmZmVyTGlzdC5wcm90b3R5cGUuY29uY2F0ID0gZnVuY3Rpb24gY29uY2F0KG4pIHtcbiAgICBpZiAodGhpcy5sZW5ndGggPT09IDApIHJldHVybiBCdWZmZXIuYWxsb2MoMCk7XG4gICAgaWYgKHRoaXMubGVuZ3RoID09PSAxKSByZXR1cm4gdGhpcy5oZWFkLmRhdGE7XG4gICAgdmFyIHJldCA9IEJ1ZmZlci5hbGxvY1Vuc2FmZShuID4+PiAwKTtcbiAgICB2YXIgcCA9IHRoaXMuaGVhZDtcbiAgICB2YXIgaSA9IDA7XG4gICAgd2hpbGUgKHApIHtcbiAgICAgIGNvcHlCdWZmZXIocC5kYXRhLCByZXQsIGkpO1xuICAgICAgaSArPSBwLmRhdGEubGVuZ3RoO1xuICAgICAgcCA9IHAubmV4dDtcbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbiAgfTtcblxuICByZXR1cm4gQnVmZmVyTGlzdDtcbn0oKTtcblxuaWYgKHV0aWwgJiYgdXRpbC5pbnNwZWN0ICYmIHV0aWwuaW5zcGVjdC5jdXN0b20pIHtcbiAgbW9kdWxlLmV4cG9ydHMucHJvdG90eXBlW3V0aWwuaW5zcGVjdC5jdXN0b21dID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBvYmogPSB1dGlsLmluc3BlY3QoeyBsZW5ndGg6IHRoaXMubGVuZ3RoIH0pO1xuICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLm5hbWUgKyAnICcgKyBvYmo7XG4gIH07XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG4vKjxyZXBsYWNlbWVudD4qL1xuXG52YXIgcG5hID0gcmVxdWlyZSgncHJvY2Vzcy1uZXh0aWNrLWFyZ3MnKTtcbi8qPC9yZXBsYWNlbWVudD4qL1xuXG4vLyB1bmRvY3VtZW50ZWQgY2IoKSBBUEksIG5lZWRlZCBmb3IgY29yZSwgbm90IGZvciBwdWJsaWMgQVBJXG5mdW5jdGlvbiBkZXN0cm95KGVyciwgY2IpIHtcbiAgdmFyIF90aGlzID0gdGhpcztcblxuICB2YXIgcmVhZGFibGVEZXN0cm95ZWQgPSB0aGlzLl9yZWFkYWJsZVN0YXRlICYmIHRoaXMuX3JlYWRhYmxlU3RhdGUuZGVzdHJveWVkO1xuICB2YXIgd3JpdGFibGVEZXN0cm95ZWQgPSB0aGlzLl93cml0YWJsZVN0YXRlICYmIHRoaXMuX3dyaXRhYmxlU3RhdGUuZGVzdHJveWVkO1xuXG4gIGlmIChyZWFkYWJsZURlc3Ryb3llZCB8fCB3cml0YWJsZURlc3Ryb3llZCkge1xuICAgIGlmIChjYikge1xuICAgICAgY2IoZXJyKTtcbiAgICB9IGVsc2UgaWYgKGVyciAmJiAoIXRoaXMuX3dyaXRhYmxlU3RhdGUgfHwgIXRoaXMuX3dyaXRhYmxlU3RhdGUuZXJyb3JFbWl0dGVkKSkge1xuICAgICAgcG5hLm5leHRUaWNrKGVtaXRFcnJvck5ULCB0aGlzLCBlcnIpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIHdlIHNldCBkZXN0cm95ZWQgdG8gdHJ1ZSBiZWZvcmUgZmlyaW5nIGVycm9yIGNhbGxiYWNrcyBpbiBvcmRlclxuICAvLyB0byBtYWtlIGl0IHJlLWVudHJhbmNlIHNhZmUgaW4gY2FzZSBkZXN0cm95KCkgaXMgY2FsbGVkIHdpdGhpbiBjYWxsYmFja3NcblxuICBpZiAodGhpcy5fcmVhZGFibGVTdGF0ZSkge1xuICAgIHRoaXMuX3JlYWRhYmxlU3RhdGUuZGVzdHJveWVkID0gdHJ1ZTtcbiAgfVxuXG4gIC8vIGlmIHRoaXMgaXMgYSBkdXBsZXggc3RyZWFtIG1hcmsgdGhlIHdyaXRhYmxlIHBhcnQgYXMgZGVzdHJveWVkIGFzIHdlbGxcbiAgaWYgKHRoaXMuX3dyaXRhYmxlU3RhdGUpIHtcbiAgICB0aGlzLl93cml0YWJsZVN0YXRlLmRlc3Ryb3llZCA9IHRydWU7XG4gIH1cblxuICB0aGlzLl9kZXN0cm95KGVyciB8fCBudWxsLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgaWYgKCFjYiAmJiBlcnIpIHtcbiAgICAgIHBuYS5uZXh0VGljayhlbWl0RXJyb3JOVCwgX3RoaXMsIGVycik7XG4gICAgICBpZiAoX3RoaXMuX3dyaXRhYmxlU3RhdGUpIHtcbiAgICAgICAgX3RoaXMuX3dyaXRhYmxlU3RhdGUuZXJyb3JFbWl0dGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGNiKSB7XG4gICAgICBjYihlcnIpO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHRoaXM7XG59XG5cbmZ1bmN0aW9uIHVuZGVzdHJveSgpIHtcbiAgaWYgKHRoaXMuX3JlYWRhYmxlU3RhdGUpIHtcbiAgICB0aGlzLl9yZWFkYWJsZVN0YXRlLmRlc3Ryb3llZCA9IGZhbHNlO1xuICAgIHRoaXMuX3JlYWRhYmxlU3RhdGUucmVhZGluZyA9IGZhbHNlO1xuICAgIHRoaXMuX3JlYWRhYmxlU3RhdGUuZW5kZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9yZWFkYWJsZVN0YXRlLmVuZEVtaXR0ZWQgPSBmYWxzZTtcbiAgfVxuXG4gIGlmICh0aGlzLl93cml0YWJsZVN0YXRlKSB7XG4gICAgdGhpcy5fd3JpdGFibGVTdGF0ZS5kZXN0cm95ZWQgPSBmYWxzZTtcbiAgICB0aGlzLl93cml0YWJsZVN0YXRlLmVuZGVkID0gZmFsc2U7XG4gICAgdGhpcy5fd3JpdGFibGVTdGF0ZS5lbmRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLl93cml0YWJsZVN0YXRlLmZpbmlzaGVkID0gZmFsc2U7XG4gICAgdGhpcy5fd3JpdGFibGVTdGF0ZS5lcnJvckVtaXR0ZWQgPSBmYWxzZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBlbWl0RXJyb3JOVChzZWxmLCBlcnIpIHtcbiAgc2VsZi5lbWl0KCdlcnJvcicsIGVycik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBkZXN0cm95OiBkZXN0cm95LFxuICB1bmRlc3Ryb3k6IHVuZGVzdHJveVxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJ2V2ZW50cycpLkV2ZW50RW1pdHRlcjtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vZGUvbm8tZGVwcmVjYXRlZC1hcGkgKi9cbnZhciBidWZmZXIgPSByZXF1aXJlKCdidWZmZXInKVxudmFyIEJ1ZmZlciA9IGJ1ZmZlci5CdWZmZXJcblxuLy8gYWx0ZXJuYXRpdmUgdG8gdXNpbmcgT2JqZWN0LmtleXMgZm9yIG9sZCBicm93c2Vyc1xuZnVuY3Rpb24gY29weVByb3BzIChzcmMsIGRzdCkge1xuICBmb3IgKHZhciBrZXkgaW4gc3JjKSB7XG4gICAgZHN0W2tleV0gPSBzcmNba2V5XVxuICB9XG59XG5pZiAoQnVmZmVyLmZyb20gJiYgQnVmZmVyLmFsbG9jICYmIEJ1ZmZlci5hbGxvY1Vuc2FmZSAmJiBCdWZmZXIuYWxsb2NVbnNhZmVTbG93KSB7XG4gIG1vZHVsZS5leHBvcnRzID0gYnVmZmVyXG59IGVsc2Uge1xuICAvLyBDb3B5IHByb3BlcnRpZXMgZnJvbSByZXF1aXJlKCdidWZmZXInKVxuICBjb3B5UHJvcHMoYnVmZmVyLCBleHBvcnRzKVxuICBleHBvcnRzLkJ1ZmZlciA9IFNhZmVCdWZmZXJcbn1cblxuZnVuY3Rpb24gU2FmZUJ1ZmZlciAoYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIEJ1ZmZlcihhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbn1cblxuLy8gQ29weSBzdGF0aWMgbWV0aG9kcyBmcm9tIEJ1ZmZlclxuY29weVByb3BzKEJ1ZmZlciwgU2FmZUJ1ZmZlcilcblxuU2FmZUJ1ZmZlci5mcm9tID0gZnVuY3Rpb24gKGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIGlmICh0eXBlb2YgYXJnID09PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50IG11c3Qgbm90IGJlIGEgbnVtYmVyJylcbiAgfVxuICByZXR1cm4gQnVmZmVyKGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxufVxuXG5TYWZlQnVmZmVyLmFsbG9jID0gZnVuY3Rpb24gKHNpemUsIGZpbGwsIGVuY29kaW5nKSB7XG4gIGlmICh0eXBlb2Ygc2l6ZSAhPT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudCBtdXN0IGJlIGEgbnVtYmVyJylcbiAgfVxuICB2YXIgYnVmID0gQnVmZmVyKHNpemUpXG4gIGlmIChmaWxsICE9PSB1bmRlZmluZWQpIHtcbiAgICBpZiAodHlwZW9mIGVuY29kaW5nID09PSAnc3RyaW5nJykge1xuICAgICAgYnVmLmZpbGwoZmlsbCwgZW5jb2RpbmcpXG4gICAgfSBlbHNlIHtcbiAgICAgIGJ1Zi5maWxsKGZpbGwpXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGJ1Zi5maWxsKDApXG4gIH1cbiAgcmV0dXJuIGJ1ZlxufVxuXG5TYWZlQnVmZmVyLmFsbG9jVW5zYWZlID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgaWYgKHR5cGVvZiBzaXplICE9PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50IG11c3QgYmUgYSBudW1iZXInKVxuICB9XG4gIHJldHVybiBCdWZmZXIoc2l6ZSlcbn1cblxuU2FmZUJ1ZmZlci5hbGxvY1Vuc2FmZVNsb3cgPSBmdW5jdGlvbiAoc2l6ZSkge1xuICBpZiAodHlwZW9mIHNpemUgIT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgbXVzdCBiZSBhIG51bWJlcicpXG4gIH1cbiAgcmV0dXJuIGJ1ZmZlci5TbG93QnVmZmVyKHNpemUpXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vcmVhZGFibGUnKS5QYXNzVGhyb3VnaFxuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvX3N0cmVhbV9yZWFkYWJsZS5qcycpO1xuZXhwb3J0cy5TdHJlYW0gPSBleHBvcnRzO1xuZXhwb3J0cy5SZWFkYWJsZSA9IGV4cG9ydHM7XG5leHBvcnRzLldyaXRhYmxlID0gcmVxdWlyZSgnLi9saWIvX3N0cmVhbV93cml0YWJsZS5qcycpO1xuZXhwb3J0cy5EdXBsZXggPSByZXF1aXJlKCcuL2xpYi9fc3RyZWFtX2R1cGxleC5qcycpO1xuZXhwb3J0cy5UcmFuc2Zvcm0gPSByZXF1aXJlKCcuL2xpYi9fc3RyZWFtX3RyYW5zZm9ybS5qcycpO1xuZXhwb3J0cy5QYXNzVGhyb3VnaCA9IHJlcXVpcmUoJy4vbGliL19zdHJlYW1fcGFzc3Rocm91Z2guanMnKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9yZWFkYWJsZScpLlRyYW5zZm9ybVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9fc3RyZWFtX3dyaXRhYmxlLmpzJyk7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBub2RlL25vLWRlcHJlY2F0ZWQtYXBpICovXG52YXIgYnVmZmVyID0gcmVxdWlyZSgnYnVmZmVyJylcbnZhciBCdWZmZXIgPSBidWZmZXIuQnVmZmVyXG5cbi8vIGFsdGVybmF0aXZlIHRvIHVzaW5nIE9iamVjdC5rZXlzIGZvciBvbGQgYnJvd3NlcnNcbmZ1bmN0aW9uIGNvcHlQcm9wcyAoc3JjLCBkc3QpIHtcbiAgZm9yICh2YXIga2V5IGluIHNyYykge1xuICAgIGRzdFtrZXldID0gc3JjW2tleV1cbiAgfVxufVxuaWYgKEJ1ZmZlci5mcm9tICYmIEJ1ZmZlci5hbGxvYyAmJiBCdWZmZXIuYWxsb2NVbnNhZmUgJiYgQnVmZmVyLmFsbG9jVW5zYWZlU2xvdykge1xuICBtb2R1bGUuZXhwb3J0cyA9IGJ1ZmZlclxufSBlbHNlIHtcbiAgLy8gQ29weSBwcm9wZXJ0aWVzIGZyb20gcmVxdWlyZSgnYnVmZmVyJylcbiAgY29weVByb3BzKGJ1ZmZlciwgZXhwb3J0cylcbiAgZXhwb3J0cy5CdWZmZXIgPSBTYWZlQnVmZmVyXG59XG5cbmZ1bmN0aW9uIFNhZmVCdWZmZXIgKGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBCdWZmZXIoYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG59XG5cblNhZmVCdWZmZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShCdWZmZXIucHJvdG90eXBlKVxuXG4vLyBDb3B5IHN0YXRpYyBtZXRob2RzIGZyb20gQnVmZmVyXG5jb3B5UHJvcHMoQnVmZmVyLCBTYWZlQnVmZmVyKVxuXG5TYWZlQnVmZmVyLmZyb20gPSBmdW5jdGlvbiAoYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgaWYgKHR5cGVvZiBhcmcgPT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgbXVzdCBub3QgYmUgYSBudW1iZXInKVxuICB9XG4gIHJldHVybiBCdWZmZXIoYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG59XG5cblNhZmVCdWZmZXIuYWxsb2MgPSBmdW5jdGlvbiAoc2l6ZSwgZmlsbCwgZW5jb2RpbmcpIHtcbiAgaWYgKHR5cGVvZiBzaXplICE9PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50IG11c3QgYmUgYSBudW1iZXInKVxuICB9XG4gIHZhciBidWYgPSBCdWZmZXIoc2l6ZSlcbiAgaWYgKGZpbGwgIT09IHVuZGVmaW5lZCkge1xuICAgIGlmICh0eXBlb2YgZW5jb2RpbmcgPT09ICdzdHJpbmcnKSB7XG4gICAgICBidWYuZmlsbChmaWxsLCBlbmNvZGluZylcbiAgICB9IGVsc2Uge1xuICAgICAgYnVmLmZpbGwoZmlsbClcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgYnVmLmZpbGwoMClcbiAgfVxuICByZXR1cm4gYnVmXG59XG5cblNhZmVCdWZmZXIuYWxsb2NVbnNhZmUgPSBmdW5jdGlvbiAoc2l6ZSkge1xuICBpZiAodHlwZW9mIHNpemUgIT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgbXVzdCBiZSBhIG51bWJlcicpXG4gIH1cbiAgcmV0dXJuIEJ1ZmZlcihzaXplKVxufVxuXG5TYWZlQnVmZmVyLmFsbG9jVW5zYWZlU2xvdyA9IGZ1bmN0aW9uIChzaXplKSB7XG4gIGlmICh0eXBlb2Ygc2l6ZSAhPT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudCBtdXN0IGJlIGEgbnVtYmVyJylcbiAgfVxuICByZXR1cm4gYnVmZmVyLlNsb3dCdWZmZXIoc2l6ZSlcbn1cbiIsIihmdW5jdGlvbiAoZ2xvYmFsLCB1bmRlZmluZWQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGlmIChnbG9iYWwuc2V0SW1tZWRpYXRlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgbmV4dEhhbmRsZSA9IDE7IC8vIFNwZWMgc2F5cyBncmVhdGVyIHRoYW4gemVyb1xuICAgIHZhciB0YXNrc0J5SGFuZGxlID0ge307XG4gICAgdmFyIGN1cnJlbnRseVJ1bm5pbmdBVGFzayA9IGZhbHNlO1xuICAgIHZhciBkb2MgPSBnbG9iYWwuZG9jdW1lbnQ7XG4gICAgdmFyIHJlZ2lzdGVySW1tZWRpYXRlO1xuXG4gICAgZnVuY3Rpb24gc2V0SW1tZWRpYXRlKGNhbGxiYWNrKSB7XG4gICAgICAvLyBDYWxsYmFjayBjYW4gZWl0aGVyIGJlIGEgZnVuY3Rpb24gb3IgYSBzdHJpbmdcbiAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBjYWxsYmFjayA9IG5ldyBGdW5jdGlvbihcIlwiICsgY2FsbGJhY2spO1xuICAgICAgfVxuICAgICAgLy8gQ29weSBmdW5jdGlvbiBhcmd1bWVudHNcbiAgICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaSArIDFdO1xuICAgICAgfVxuICAgICAgLy8gU3RvcmUgYW5kIHJlZ2lzdGVyIHRoZSB0YXNrXG4gICAgICB2YXIgdGFzayA9IHsgY2FsbGJhY2s6IGNhbGxiYWNrLCBhcmdzOiBhcmdzIH07XG4gICAgICB0YXNrc0J5SGFuZGxlW25leHRIYW5kbGVdID0gdGFzaztcbiAgICAgIHJlZ2lzdGVySW1tZWRpYXRlKG5leHRIYW5kbGUpO1xuICAgICAgcmV0dXJuIG5leHRIYW5kbGUrKztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbGVhckltbWVkaWF0ZShoYW5kbGUpIHtcbiAgICAgICAgZGVsZXRlIHRhc2tzQnlIYW5kbGVbaGFuZGxlXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBydW4odGFzaykge1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSB0YXNrLmNhbGxiYWNrO1xuICAgICAgICB2YXIgYXJncyA9IHRhc2suYXJncztcbiAgICAgICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIGNhbGxiYWNrKGFyZ3NbMF0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIGNhbGxiYWNrKGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIGNhbGxiYWNrKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjYWxsYmFjay5hcHBseSh1bmRlZmluZWQsIGFyZ3MpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBydW5JZlByZXNlbnQoaGFuZGxlKSB7XG4gICAgICAgIC8vIEZyb20gdGhlIHNwZWM6IFwiV2FpdCB1bnRpbCBhbnkgaW52b2NhdGlvbnMgb2YgdGhpcyBhbGdvcml0aG0gc3RhcnRlZCBiZWZvcmUgdGhpcyBvbmUgaGF2ZSBjb21wbGV0ZWQuXCJcbiAgICAgICAgLy8gU28gaWYgd2UncmUgY3VycmVudGx5IHJ1bm5pbmcgYSB0YXNrLCB3ZSdsbCBuZWVkIHRvIGRlbGF5IHRoaXMgaW52b2NhdGlvbi5cbiAgICAgICAgaWYgKGN1cnJlbnRseVJ1bm5pbmdBVGFzaykge1xuICAgICAgICAgICAgLy8gRGVsYXkgYnkgZG9pbmcgYSBzZXRUaW1lb3V0LiBzZXRJbW1lZGlhdGUgd2FzIHRyaWVkIGluc3RlYWQsIGJ1dCBpbiBGaXJlZm94IDcgaXQgZ2VuZXJhdGVkIGFcbiAgICAgICAgICAgIC8vIFwidG9vIG11Y2ggcmVjdXJzaW9uXCIgZXJyb3IuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KHJ1bklmUHJlc2VudCwgMCwgaGFuZGxlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciB0YXNrID0gdGFza3NCeUhhbmRsZVtoYW5kbGVdO1xuICAgICAgICAgICAgaWYgKHRhc2spIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50bHlSdW5uaW5nQVRhc2sgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHJ1bih0YXNrKTtcbiAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckltbWVkaWF0ZShoYW5kbGUpO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50bHlSdW5uaW5nQVRhc2sgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsTmV4dFRpY2tJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24gKCkgeyBydW5JZlByZXNlbnQoaGFuZGxlKTsgfSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2FuVXNlUG9zdE1lc3NhZ2UoKSB7XG4gICAgICAgIC8vIFRoZSB0ZXN0IGFnYWluc3QgYGltcG9ydFNjcmlwdHNgIHByZXZlbnRzIHRoaXMgaW1wbGVtZW50YXRpb24gZnJvbSBiZWluZyBpbnN0YWxsZWQgaW5zaWRlIGEgd2ViIHdvcmtlcixcbiAgICAgICAgLy8gd2hlcmUgYGdsb2JhbC5wb3N0TWVzc2FnZWAgbWVhbnMgc29tZXRoaW5nIGNvbXBsZXRlbHkgZGlmZmVyZW50IGFuZCBjYW4ndCBiZSB1c2VkIGZvciB0aGlzIHB1cnBvc2UuXG4gICAgICAgIGlmIChnbG9iYWwucG9zdE1lc3NhZ2UgJiYgIWdsb2JhbC5pbXBvcnRTY3JpcHRzKSB7XG4gICAgICAgICAgICB2YXIgcG9zdE1lc3NhZ2VJc0FzeW5jaHJvbm91cyA9IHRydWU7XG4gICAgICAgICAgICB2YXIgb2xkT25NZXNzYWdlID0gZ2xvYmFsLm9ubWVzc2FnZTtcbiAgICAgICAgICAgIGdsb2JhbC5vbm1lc3NhZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZUlzQXN5bmNocm9ub3VzID0gZmFsc2U7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZ2xvYmFsLnBvc3RNZXNzYWdlKFwiXCIsIFwiKlwiKTtcbiAgICAgICAgICAgIGdsb2JhbC5vbm1lc3NhZ2UgPSBvbGRPbk1lc3NhZ2U7XG4gICAgICAgICAgICByZXR1cm4gcG9zdE1lc3NhZ2VJc0FzeW5jaHJvbm91cztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxQb3N0TWVzc2FnZUltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICAvLyBJbnN0YWxscyBhbiBldmVudCBoYW5kbGVyIG9uIGBnbG9iYWxgIGZvciB0aGUgYG1lc3NhZ2VgIGV2ZW50OiBzZWVcbiAgICAgICAgLy8gKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9ET00vd2luZG93LnBvc3RNZXNzYWdlXG4gICAgICAgIC8vICogaHR0cDovL3d3dy53aGF0d2cub3JnL3NwZWNzL3dlYi1hcHBzL2N1cnJlbnQtd29yay9tdWx0aXBhZ2UvY29tbXMuaHRtbCNjcm9zc0RvY3VtZW50TWVzc2FnZXNcblxuICAgICAgICB2YXIgbWVzc2FnZVByZWZpeCA9IFwic2V0SW1tZWRpYXRlJFwiICsgTWF0aC5yYW5kb20oKSArIFwiJFwiO1xuICAgICAgICB2YXIgb25HbG9iYWxNZXNzYWdlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChldmVudC5zb3VyY2UgPT09IGdsb2JhbCAmJlxuICAgICAgICAgICAgICAgIHR5cGVvZiBldmVudC5kYXRhID09PSBcInN0cmluZ1wiICYmXG4gICAgICAgICAgICAgICAgZXZlbnQuZGF0YS5pbmRleE9mKG1lc3NhZ2VQcmVmaXgpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcnVuSWZQcmVzZW50KCtldmVudC5kYXRhLnNsaWNlKG1lc3NhZ2VQcmVmaXgubGVuZ3RoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgb25HbG9iYWxNZXNzYWdlLCBmYWxzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnbG9iYWwuYXR0YWNoRXZlbnQoXCJvbm1lc3NhZ2VcIiwgb25HbG9iYWxNZXNzYWdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICBnbG9iYWwucG9zdE1lc3NhZ2UobWVzc2FnZVByZWZpeCArIGhhbmRsZSwgXCIqXCIpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxNZXNzYWdlQ2hhbm5lbEltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICB2YXIgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgICAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgaGFuZGxlID0gZXZlbnQuZGF0YTtcbiAgICAgICAgICAgIHJ1bklmUHJlc2VudChoYW5kbGUpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICBjaGFubmVsLnBvcnQyLnBvc3RNZXNzYWdlKGhhbmRsZSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbFJlYWR5U3RhdGVDaGFuZ2VJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgdmFyIGh0bWwgPSBkb2MuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgPHNjcmlwdD4gZWxlbWVudDsgaXRzIHJlYWR5c3RhdGVjaGFuZ2UgZXZlbnQgd2lsbCBiZSBmaXJlZCBhc3luY2hyb25vdXNseSBvbmNlIGl0IGlzIGluc2VydGVkXG4gICAgICAgICAgICAvLyBpbnRvIHRoZSBkb2N1bWVudC4gRG8gc28sIHRodXMgcXVldWluZyB1cCB0aGUgdGFzay4gUmVtZW1iZXIgdG8gY2xlYW4gdXAgb25jZSBpdCdzIGJlZW4gY2FsbGVkLlxuICAgICAgICAgICAgdmFyIHNjcmlwdCA9IGRvYy5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgICAgICAgICAgc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBydW5JZlByZXNlbnQoaGFuZGxlKTtcbiAgICAgICAgICAgICAgICBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gbnVsbDtcbiAgICAgICAgICAgICAgICBodG1sLnJlbW92ZUNoaWxkKHNjcmlwdCk7XG4gICAgICAgICAgICAgICAgc2NyaXB0ID0gbnVsbDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBodG1sLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbFNldFRpbWVvdXRJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQocnVuSWZQcmVzZW50LCAwLCBoYW5kbGUpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vIElmIHN1cHBvcnRlZCwgd2Ugc2hvdWxkIGF0dGFjaCB0byB0aGUgcHJvdG90eXBlIG9mIGdsb2JhbCwgc2luY2UgdGhhdCBpcyB3aGVyZSBzZXRUaW1lb3V0IGV0IGFsLiBsaXZlLlxuICAgIHZhciBhdHRhY2hUbyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiAmJiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoZ2xvYmFsKTtcbiAgICBhdHRhY2hUbyA9IGF0dGFjaFRvICYmIGF0dGFjaFRvLnNldFRpbWVvdXQgPyBhdHRhY2hUbyA6IGdsb2JhbDtcblxuICAgIC8vIERvbid0IGdldCBmb29sZWQgYnkgZS5nLiBicm93c2VyaWZ5IGVudmlyb25tZW50cy5cbiAgICBpZiAoe30udG9TdHJpbmcuY2FsbChnbG9iYWwucHJvY2VzcykgPT09IFwiW29iamVjdCBwcm9jZXNzXVwiKSB7XG4gICAgICAgIC8vIEZvciBOb2RlLmpzIGJlZm9yZSAwLjlcbiAgICAgICAgaW5zdGFsbE5leHRUaWNrSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSBpZiAoY2FuVXNlUG9zdE1lc3NhZ2UoKSkge1xuICAgICAgICAvLyBGb3Igbm9uLUlFMTAgbW9kZXJuIGJyb3dzZXJzXG4gICAgICAgIGluc3RhbGxQb3N0TWVzc2FnZUltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2UgaWYgKGdsb2JhbC5NZXNzYWdlQ2hhbm5lbCkge1xuICAgICAgICAvLyBGb3Igd2ViIHdvcmtlcnMsIHdoZXJlIHN1cHBvcnRlZFxuICAgICAgICBpbnN0YWxsTWVzc2FnZUNoYW5uZWxJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIGlmIChkb2MgJiYgXCJvbnJlYWR5c3RhdGVjaGFuZ2VcIiBpbiBkb2MuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKSkge1xuICAgICAgICAvLyBGb3IgSUUgNuKAkzhcbiAgICAgICAgaW5zdGFsbFJlYWR5U3RhdGVDaGFuZ2VJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gRm9yIG9sZGVyIGJyb3dzZXJzXG4gICAgICAgIGluc3RhbGxTZXRUaW1lb3V0SW1wbGVtZW50YXRpb24oKTtcbiAgICB9XG5cbiAgICBhdHRhY2hUby5zZXRJbW1lZGlhdGUgPSBzZXRJbW1lZGlhdGU7XG4gICAgYXR0YWNoVG8uY2xlYXJJbW1lZGlhdGUgPSBjbGVhckltbWVkaWF0ZTtcbn0odHlwZW9mIHNlbGYgPT09IFwidW5kZWZpbmVkXCIgPyB0eXBlb2YgZ2xvYmFsID09PSBcInVuZGVmaW5lZFwiID8gdGhpcyA6IGdsb2JhbCA6IHNlbGYpKTtcbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5tb2R1bGUuZXhwb3J0cyA9IFN0cmVhbTtcblxudmFyIEVFID0gcmVxdWlyZSgnZXZlbnRzJykuRXZlbnRFbWl0dGVyO1xudmFyIGluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKTtcblxuaW5oZXJpdHMoU3RyZWFtLCBFRSk7XG5TdHJlYW0uUmVhZGFibGUgPSByZXF1aXJlKCdyZWFkYWJsZS1zdHJlYW0vcmVhZGFibGUuanMnKTtcblN0cmVhbS5Xcml0YWJsZSA9IHJlcXVpcmUoJ3JlYWRhYmxlLXN0cmVhbS93cml0YWJsZS5qcycpO1xuU3RyZWFtLkR1cGxleCA9IHJlcXVpcmUoJ3JlYWRhYmxlLXN0cmVhbS9kdXBsZXguanMnKTtcblN0cmVhbS5UcmFuc2Zvcm0gPSByZXF1aXJlKCdyZWFkYWJsZS1zdHJlYW0vdHJhbnNmb3JtLmpzJyk7XG5TdHJlYW0uUGFzc1Rocm91Z2ggPSByZXF1aXJlKCdyZWFkYWJsZS1zdHJlYW0vcGFzc3Rocm91Z2guanMnKTtcblxuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC40LnhcblN0cmVhbS5TdHJlYW0gPSBTdHJlYW07XG5cblxuXG4vLyBvbGQtc3R5bGUgc3RyZWFtcy4gIE5vdGUgdGhhdCB0aGUgcGlwZSBtZXRob2QgKHRoZSBvbmx5IHJlbGV2YW50XG4vLyBwYXJ0IG9mIHRoaXMgY2xhc3MpIGlzIG92ZXJyaWRkZW4gaW4gdGhlIFJlYWRhYmxlIGNsYXNzLlxuXG5mdW5jdGlvbiBTdHJlYW0oKSB7XG4gIEVFLmNhbGwodGhpcyk7XG59XG5cblN0cmVhbS5wcm90b3R5cGUucGlwZSA9IGZ1bmN0aW9uKGRlc3QsIG9wdGlvbnMpIHtcbiAgdmFyIHNvdXJjZSA9IHRoaXM7XG5cbiAgZnVuY3Rpb24gb25kYXRhKGNodW5rKSB7XG4gICAgaWYgKGRlc3Qud3JpdGFibGUpIHtcbiAgICAgIGlmIChmYWxzZSA9PT0gZGVzdC53cml0ZShjaHVuaykgJiYgc291cmNlLnBhdXNlKSB7XG4gICAgICAgIHNvdXJjZS5wYXVzZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNvdXJjZS5vbignZGF0YScsIG9uZGF0YSk7XG5cbiAgZnVuY3Rpb24gb25kcmFpbigpIHtcbiAgICBpZiAoc291cmNlLnJlYWRhYmxlICYmIHNvdXJjZS5yZXN1bWUpIHtcbiAgICAgIHNvdXJjZS5yZXN1bWUoKTtcbiAgICB9XG4gIH1cblxuICBkZXN0Lm9uKCdkcmFpbicsIG9uZHJhaW4pO1xuXG4gIC8vIElmIHRoZSAnZW5kJyBvcHRpb24gaXMgbm90IHN1cHBsaWVkLCBkZXN0LmVuZCgpIHdpbGwgYmUgY2FsbGVkIHdoZW5cbiAgLy8gc291cmNlIGdldHMgdGhlICdlbmQnIG9yICdjbG9zZScgZXZlbnRzLiAgT25seSBkZXN0LmVuZCgpIG9uY2UuXG4gIGlmICghZGVzdC5faXNTdGRpbyAmJiAoIW9wdGlvbnMgfHwgb3B0aW9ucy5lbmQgIT09IGZhbHNlKSkge1xuICAgIHNvdXJjZS5vbignZW5kJywgb25lbmQpO1xuICAgIHNvdXJjZS5vbignY2xvc2UnLCBvbmNsb3NlKTtcbiAgfVxuXG4gIHZhciBkaWRPbkVuZCA9IGZhbHNlO1xuICBmdW5jdGlvbiBvbmVuZCgpIHtcbiAgICBpZiAoZGlkT25FbmQpIHJldHVybjtcbiAgICBkaWRPbkVuZCA9IHRydWU7XG5cbiAgICBkZXN0LmVuZCgpO1xuICB9XG5cblxuICBmdW5jdGlvbiBvbmNsb3NlKCkge1xuICAgIGlmIChkaWRPbkVuZCkgcmV0dXJuO1xuICAgIGRpZE9uRW5kID0gdHJ1ZTtcblxuICAgIGlmICh0eXBlb2YgZGVzdC5kZXN0cm95ID09PSAnZnVuY3Rpb24nKSBkZXN0LmRlc3Ryb3koKTtcbiAgfVxuXG4gIC8vIGRvbid0IGxlYXZlIGRhbmdsaW5nIHBpcGVzIHdoZW4gdGhlcmUgYXJlIGVycm9ycy5cbiAgZnVuY3Rpb24gb25lcnJvcihlcikge1xuICAgIGNsZWFudXAoKTtcbiAgICBpZiAoRUUubGlzdGVuZXJDb3VudCh0aGlzLCAnZXJyb3InKSA9PT0gMCkge1xuICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCBzdHJlYW0gZXJyb3IgaW4gcGlwZS5cbiAgICB9XG4gIH1cblxuICBzb3VyY2Uub24oJ2Vycm9yJywgb25lcnJvcik7XG4gIGRlc3Qub24oJ2Vycm9yJywgb25lcnJvcik7XG5cbiAgLy8gcmVtb3ZlIGFsbCB0aGUgZXZlbnQgbGlzdGVuZXJzIHRoYXQgd2VyZSBhZGRlZC5cbiAgZnVuY3Rpb24gY2xlYW51cCgpIHtcbiAgICBzb3VyY2UucmVtb3ZlTGlzdGVuZXIoJ2RhdGEnLCBvbmRhdGEpO1xuICAgIGRlc3QucmVtb3ZlTGlzdGVuZXIoJ2RyYWluJywgb25kcmFpbik7XG5cbiAgICBzb3VyY2UucmVtb3ZlTGlzdGVuZXIoJ2VuZCcsIG9uZW5kKTtcbiAgICBzb3VyY2UucmVtb3ZlTGlzdGVuZXIoJ2Nsb3NlJywgb25jbG9zZSk7XG5cbiAgICBzb3VyY2UucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJywgb25lcnJvcik7XG4gICAgZGVzdC5yZW1vdmVMaXN0ZW5lcignZXJyb3InLCBvbmVycm9yKTtcblxuICAgIHNvdXJjZS5yZW1vdmVMaXN0ZW5lcignZW5kJywgY2xlYW51cCk7XG4gICAgc291cmNlLnJlbW92ZUxpc3RlbmVyKCdjbG9zZScsIGNsZWFudXApO1xuXG4gICAgZGVzdC5yZW1vdmVMaXN0ZW5lcignY2xvc2UnLCBjbGVhbnVwKTtcbiAgfVxuXG4gIHNvdXJjZS5vbignZW5kJywgY2xlYW51cCk7XG4gIHNvdXJjZS5vbignY2xvc2UnLCBjbGVhbnVwKTtcblxuICBkZXN0Lm9uKCdjbG9zZScsIGNsZWFudXApO1xuXG4gIGRlc3QuZW1pdCgncGlwZScsIHNvdXJjZSk7XG5cbiAgLy8gQWxsb3cgZm9yIHVuaXgtbGlrZSB1c2FnZTogQS5waXBlKEIpLnBpcGUoQylcbiAgcmV0dXJuIGRlc3Q7XG59O1xuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxuLyo8cmVwbGFjZW1lbnQ+Ki9cblxudmFyIEJ1ZmZlciA9IHJlcXVpcmUoJ3NhZmUtYnVmZmVyJykuQnVmZmVyO1xuLyo8L3JlcGxhY2VtZW50PiovXG5cbnZhciBpc0VuY29kaW5nID0gQnVmZmVyLmlzRW5jb2RpbmcgfHwgZnVuY3Rpb24gKGVuY29kaW5nKSB7XG4gIGVuY29kaW5nID0gJycgKyBlbmNvZGluZztcbiAgc3dpdGNoIChlbmNvZGluZyAmJiBlbmNvZGluZy50b0xvd2VyQ2FzZSgpKSB7XG4gICAgY2FzZSAnaGV4JzpjYXNlICd1dGY4JzpjYXNlICd1dGYtOCc6Y2FzZSAnYXNjaWknOmNhc2UgJ2JpbmFyeSc6Y2FzZSAnYmFzZTY0JzpjYXNlICd1Y3MyJzpjYXNlICd1Y3MtMic6Y2FzZSAndXRmMTZsZSc6Y2FzZSAndXRmLTE2bGUnOmNhc2UgJ3Jhdyc6XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG5mdW5jdGlvbiBfbm9ybWFsaXplRW5jb2RpbmcoZW5jKSB7XG4gIGlmICghZW5jKSByZXR1cm4gJ3V0ZjgnO1xuICB2YXIgcmV0cmllZDtcbiAgd2hpbGUgKHRydWUpIHtcbiAgICBzd2l0Y2ggKGVuYykge1xuICAgICAgY2FzZSAndXRmOCc6XG4gICAgICBjYXNlICd1dGYtOCc6XG4gICAgICAgIHJldHVybiAndXRmOCc7XG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gJ3V0ZjE2bGUnO1xuICAgICAgY2FzZSAnbGF0aW4xJzpcbiAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAgIHJldHVybiAnbGF0aW4xJztcbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICBjYXNlICdhc2NpaSc6XG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gZW5jO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKHJldHJpZWQpIHJldHVybjsgLy8gdW5kZWZpbmVkXG4gICAgICAgIGVuYyA9ICgnJyArIGVuYykudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgcmV0cmllZCA9IHRydWU7XG4gICAgfVxuICB9XG59O1xuXG4vLyBEbyBub3QgY2FjaGUgYEJ1ZmZlci5pc0VuY29kaW5nYCB3aGVuIGNoZWNraW5nIGVuY29kaW5nIG5hbWVzIGFzIHNvbWVcbi8vIG1vZHVsZXMgbW9ua2V5LXBhdGNoIGl0IHRvIHN1cHBvcnQgYWRkaXRpb25hbCBlbmNvZGluZ3NcbmZ1bmN0aW9uIG5vcm1hbGl6ZUVuY29kaW5nKGVuYykge1xuICB2YXIgbmVuYyA9IF9ub3JtYWxpemVFbmNvZGluZyhlbmMpO1xuICBpZiAodHlwZW9mIG5lbmMgIT09ICdzdHJpbmcnICYmIChCdWZmZXIuaXNFbmNvZGluZyA9PT0gaXNFbmNvZGluZyB8fCAhaXNFbmNvZGluZyhlbmMpKSkgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jKTtcbiAgcmV0dXJuIG5lbmMgfHwgZW5jO1xufVxuXG4vLyBTdHJpbmdEZWNvZGVyIHByb3ZpZGVzIGFuIGludGVyZmFjZSBmb3IgZWZmaWNpZW50bHkgc3BsaXR0aW5nIGEgc2VyaWVzIG9mXG4vLyBidWZmZXJzIGludG8gYSBzZXJpZXMgb2YgSlMgc3RyaW5ncyB3aXRob3V0IGJyZWFraW5nIGFwYXJ0IG11bHRpLWJ5dGVcbi8vIGNoYXJhY3RlcnMuXG5leHBvcnRzLlN0cmluZ0RlY29kZXIgPSBTdHJpbmdEZWNvZGVyO1xuZnVuY3Rpb24gU3RyaW5nRGVjb2RlcihlbmNvZGluZykge1xuICB0aGlzLmVuY29kaW5nID0gbm9ybWFsaXplRW5jb2RpbmcoZW5jb2RpbmcpO1xuICB2YXIgbmI7XG4gIHN3aXRjaCAodGhpcy5lbmNvZGluZykge1xuICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgdGhpcy50ZXh0ID0gdXRmMTZUZXh0O1xuICAgICAgdGhpcy5lbmQgPSB1dGYxNkVuZDtcbiAgICAgIG5iID0gNDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgdGhpcy5maWxsTGFzdCA9IHV0ZjhGaWxsTGFzdDtcbiAgICAgIG5iID0gNDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICB0aGlzLnRleHQgPSBiYXNlNjRUZXh0O1xuICAgICAgdGhpcy5lbmQgPSBiYXNlNjRFbmQ7XG4gICAgICBuYiA9IDM7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgdGhpcy53cml0ZSA9IHNpbXBsZVdyaXRlO1xuICAgICAgdGhpcy5lbmQgPSBzaW1wbGVFbmQ7XG4gICAgICByZXR1cm47XG4gIH1cbiAgdGhpcy5sYXN0TmVlZCA9IDA7XG4gIHRoaXMubGFzdFRvdGFsID0gMDtcbiAgdGhpcy5sYXN0Q2hhciA9IEJ1ZmZlci5hbGxvY1Vuc2FmZShuYik7XG59XG5cblN0cmluZ0RlY29kZXIucHJvdG90eXBlLndyaXRlID0gZnVuY3Rpb24gKGJ1Zikge1xuICBpZiAoYnVmLmxlbmd0aCA9PT0gMCkgcmV0dXJuICcnO1xuICB2YXIgcjtcbiAgdmFyIGk7XG4gIGlmICh0aGlzLmxhc3ROZWVkKSB7XG4gICAgciA9IHRoaXMuZmlsbExhc3QoYnVmKTtcbiAgICBpZiAociA9PT0gdW5kZWZpbmVkKSByZXR1cm4gJyc7XG4gICAgaSA9IHRoaXMubGFzdE5lZWQ7XG4gICAgdGhpcy5sYXN0TmVlZCA9IDA7XG4gIH0gZWxzZSB7XG4gICAgaSA9IDA7XG4gIH1cbiAgaWYgKGkgPCBidWYubGVuZ3RoKSByZXR1cm4gciA/IHIgKyB0aGlzLnRleHQoYnVmLCBpKSA6IHRoaXMudGV4dChidWYsIGkpO1xuICByZXR1cm4gciB8fCAnJztcbn07XG5cblN0cmluZ0RlY29kZXIucHJvdG90eXBlLmVuZCA9IHV0ZjhFbmQ7XG5cbi8vIFJldHVybnMgb25seSBjb21wbGV0ZSBjaGFyYWN0ZXJzIGluIGEgQnVmZmVyXG5TdHJpbmdEZWNvZGVyLnByb3RvdHlwZS50ZXh0ID0gdXRmOFRleHQ7XG5cbi8vIEF0dGVtcHRzIHRvIGNvbXBsZXRlIGEgcGFydGlhbCBub24tVVRGLTggY2hhcmFjdGVyIHVzaW5nIGJ5dGVzIGZyb20gYSBCdWZmZXJcblN0cmluZ0RlY29kZXIucHJvdG90eXBlLmZpbGxMYXN0ID0gZnVuY3Rpb24gKGJ1Zikge1xuICBpZiAodGhpcy5sYXN0TmVlZCA8PSBidWYubGVuZ3RoKSB7XG4gICAgYnVmLmNvcHkodGhpcy5sYXN0Q2hhciwgdGhpcy5sYXN0VG90YWwgLSB0aGlzLmxhc3ROZWVkLCAwLCB0aGlzLmxhc3ROZWVkKTtcbiAgICByZXR1cm4gdGhpcy5sYXN0Q2hhci50b1N0cmluZyh0aGlzLmVuY29kaW5nLCAwLCB0aGlzLmxhc3RUb3RhbCk7XG4gIH1cbiAgYnVmLmNvcHkodGhpcy5sYXN0Q2hhciwgdGhpcy5sYXN0VG90YWwgLSB0aGlzLmxhc3ROZWVkLCAwLCBidWYubGVuZ3RoKTtcbiAgdGhpcy5sYXN0TmVlZCAtPSBidWYubGVuZ3RoO1xufTtcblxuLy8gQ2hlY2tzIHRoZSB0eXBlIG9mIGEgVVRGLTggYnl0ZSwgd2hldGhlciBpdCdzIEFTQ0lJLCBhIGxlYWRpbmcgYnl0ZSwgb3IgYVxuLy8gY29udGludWF0aW9uIGJ5dGUuIElmIGFuIGludmFsaWQgYnl0ZSBpcyBkZXRlY3RlZCwgLTIgaXMgcmV0dXJuZWQuXG5mdW5jdGlvbiB1dGY4Q2hlY2tCeXRlKGJ5dGUpIHtcbiAgaWYgKGJ5dGUgPD0gMHg3RikgcmV0dXJuIDA7ZWxzZSBpZiAoYnl0ZSA+PiA1ID09PSAweDA2KSByZXR1cm4gMjtlbHNlIGlmIChieXRlID4+IDQgPT09IDB4MEUpIHJldHVybiAzO2Vsc2UgaWYgKGJ5dGUgPj4gMyA9PT0gMHgxRSkgcmV0dXJuIDQ7XG4gIHJldHVybiBieXRlID4+IDYgPT09IDB4MDIgPyAtMSA6IC0yO1xufVxuXG4vLyBDaGVja3MgYXQgbW9zdCAzIGJ5dGVzIGF0IHRoZSBlbmQgb2YgYSBCdWZmZXIgaW4gb3JkZXIgdG8gZGV0ZWN0IGFuXG4vLyBpbmNvbXBsZXRlIG11bHRpLWJ5dGUgVVRGLTggY2hhcmFjdGVyLiBUaGUgdG90YWwgbnVtYmVyIG9mIGJ5dGVzICgyLCAzLCBvciA0KVxuLy8gbmVlZGVkIHRvIGNvbXBsZXRlIHRoZSBVVEYtOCBjaGFyYWN0ZXIgKGlmIGFwcGxpY2FibGUpIGFyZSByZXR1cm5lZC5cbmZ1bmN0aW9uIHV0ZjhDaGVja0luY29tcGxldGUoc2VsZiwgYnVmLCBpKSB7XG4gIHZhciBqID0gYnVmLmxlbmd0aCAtIDE7XG4gIGlmIChqIDwgaSkgcmV0dXJuIDA7XG4gIHZhciBuYiA9IHV0ZjhDaGVja0J5dGUoYnVmW2pdKTtcbiAgaWYgKG5iID49IDApIHtcbiAgICBpZiAobmIgPiAwKSBzZWxmLmxhc3ROZWVkID0gbmIgLSAxO1xuICAgIHJldHVybiBuYjtcbiAgfVxuICBpZiAoLS1qIDwgaSB8fCBuYiA9PT0gLTIpIHJldHVybiAwO1xuICBuYiA9IHV0ZjhDaGVja0J5dGUoYnVmW2pdKTtcbiAgaWYgKG5iID49IDApIHtcbiAgICBpZiAobmIgPiAwKSBzZWxmLmxhc3ROZWVkID0gbmIgLSAyO1xuICAgIHJldHVybiBuYjtcbiAgfVxuICBpZiAoLS1qIDwgaSB8fCBuYiA9PT0gLTIpIHJldHVybiAwO1xuICBuYiA9IHV0ZjhDaGVja0J5dGUoYnVmW2pdKTtcbiAgaWYgKG5iID49IDApIHtcbiAgICBpZiAobmIgPiAwKSB7XG4gICAgICBpZiAobmIgPT09IDIpIG5iID0gMDtlbHNlIHNlbGYubGFzdE5lZWQgPSBuYiAtIDM7XG4gICAgfVxuICAgIHJldHVybiBuYjtcbiAgfVxuICByZXR1cm4gMDtcbn1cblxuLy8gVmFsaWRhdGVzIGFzIG1hbnkgY29udGludWF0aW9uIGJ5dGVzIGZvciBhIG11bHRpLWJ5dGUgVVRGLTggY2hhcmFjdGVyIGFzXG4vLyBuZWVkZWQgb3IgYXJlIGF2YWlsYWJsZS4gSWYgd2Ugc2VlIGEgbm9uLWNvbnRpbnVhdGlvbiBieXRlIHdoZXJlIHdlIGV4cGVjdFxuLy8gb25lLCB3ZSBcInJlcGxhY2VcIiB0aGUgdmFsaWRhdGVkIGNvbnRpbnVhdGlvbiBieXRlcyB3ZSd2ZSBzZWVuIHNvIGZhciB3aXRoXG4vLyBhIHNpbmdsZSBVVEYtOCByZXBsYWNlbWVudCBjaGFyYWN0ZXIgKCdcXHVmZmZkJyksIHRvIG1hdGNoIHY4J3MgVVRGLTggZGVjb2Rpbmdcbi8vIGJlaGF2aW9yLiBUaGUgY29udGludWF0aW9uIGJ5dGUgY2hlY2sgaXMgaW5jbHVkZWQgdGhyZWUgdGltZXMgaW4gdGhlIGNhc2Vcbi8vIHdoZXJlIGFsbCBvZiB0aGUgY29udGludWF0aW9uIGJ5dGVzIGZvciBhIGNoYXJhY3RlciBleGlzdCBpbiB0aGUgc2FtZSBidWZmZXIuXG4vLyBJdCBpcyBhbHNvIGRvbmUgdGhpcyB3YXkgYXMgYSBzbGlnaHQgcGVyZm9ybWFuY2UgaW5jcmVhc2UgaW5zdGVhZCBvZiB1c2luZyBhXG4vLyBsb29wLlxuZnVuY3Rpb24gdXRmOENoZWNrRXh0cmFCeXRlcyhzZWxmLCBidWYsIHApIHtcbiAgaWYgKChidWZbMF0gJiAweEMwKSAhPT0gMHg4MCkge1xuICAgIHNlbGYubGFzdE5lZWQgPSAwO1xuICAgIHJldHVybiAnXFx1ZmZmZCc7XG4gIH1cbiAgaWYgKHNlbGYubGFzdE5lZWQgPiAxICYmIGJ1Zi5sZW5ndGggPiAxKSB7XG4gICAgaWYgKChidWZbMV0gJiAweEMwKSAhPT0gMHg4MCkge1xuICAgICAgc2VsZi5sYXN0TmVlZCA9IDE7XG4gICAgICByZXR1cm4gJ1xcdWZmZmQnO1xuICAgIH1cbiAgICBpZiAoc2VsZi5sYXN0TmVlZCA+IDIgJiYgYnVmLmxlbmd0aCA+IDIpIHtcbiAgICAgIGlmICgoYnVmWzJdICYgMHhDMCkgIT09IDB4ODApIHtcbiAgICAgICAgc2VsZi5sYXN0TmVlZCA9IDI7XG4gICAgICAgIHJldHVybiAnXFx1ZmZmZCc7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8vIEF0dGVtcHRzIHRvIGNvbXBsZXRlIGEgbXVsdGktYnl0ZSBVVEYtOCBjaGFyYWN0ZXIgdXNpbmcgYnl0ZXMgZnJvbSBhIEJ1ZmZlci5cbmZ1bmN0aW9uIHV0ZjhGaWxsTGFzdChidWYpIHtcbiAgdmFyIHAgPSB0aGlzLmxhc3RUb3RhbCAtIHRoaXMubGFzdE5lZWQ7XG4gIHZhciByID0gdXRmOENoZWNrRXh0cmFCeXRlcyh0aGlzLCBidWYsIHApO1xuICBpZiAociAhPT0gdW5kZWZpbmVkKSByZXR1cm4gcjtcbiAgaWYgKHRoaXMubGFzdE5lZWQgPD0gYnVmLmxlbmd0aCkge1xuICAgIGJ1Zi5jb3B5KHRoaXMubGFzdENoYXIsIHAsIDAsIHRoaXMubGFzdE5lZWQpO1xuICAgIHJldHVybiB0aGlzLmxhc3RDaGFyLnRvU3RyaW5nKHRoaXMuZW5jb2RpbmcsIDAsIHRoaXMubGFzdFRvdGFsKTtcbiAgfVxuICBidWYuY29weSh0aGlzLmxhc3RDaGFyLCBwLCAwLCBidWYubGVuZ3RoKTtcbiAgdGhpcy5sYXN0TmVlZCAtPSBidWYubGVuZ3RoO1xufVxuXG4vLyBSZXR1cm5zIGFsbCBjb21wbGV0ZSBVVEYtOCBjaGFyYWN0ZXJzIGluIGEgQnVmZmVyLiBJZiB0aGUgQnVmZmVyIGVuZGVkIG9uIGFcbi8vIHBhcnRpYWwgY2hhcmFjdGVyLCB0aGUgY2hhcmFjdGVyJ3MgYnl0ZXMgYXJlIGJ1ZmZlcmVkIHVudGlsIHRoZSByZXF1aXJlZFxuLy8gbnVtYmVyIG9mIGJ5dGVzIGFyZSBhdmFpbGFibGUuXG5mdW5jdGlvbiB1dGY4VGV4dChidWYsIGkpIHtcbiAgdmFyIHRvdGFsID0gdXRmOENoZWNrSW5jb21wbGV0ZSh0aGlzLCBidWYsIGkpO1xuICBpZiAoIXRoaXMubGFzdE5lZWQpIHJldHVybiBidWYudG9TdHJpbmcoJ3V0ZjgnLCBpKTtcbiAgdGhpcy5sYXN0VG90YWwgPSB0b3RhbDtcbiAgdmFyIGVuZCA9IGJ1Zi5sZW5ndGggLSAodG90YWwgLSB0aGlzLmxhc3ROZWVkKTtcbiAgYnVmLmNvcHkodGhpcy5sYXN0Q2hhciwgMCwgZW5kKTtcbiAgcmV0dXJuIGJ1Zi50b1N0cmluZygndXRmOCcsIGksIGVuZCk7XG59XG5cbi8vIEZvciBVVEYtOCwgYSByZXBsYWNlbWVudCBjaGFyYWN0ZXIgaXMgYWRkZWQgd2hlbiBlbmRpbmcgb24gYSBwYXJ0aWFsXG4vLyBjaGFyYWN0ZXIuXG5mdW5jdGlvbiB1dGY4RW5kKGJ1Zikge1xuICB2YXIgciA9IGJ1ZiAmJiBidWYubGVuZ3RoID8gdGhpcy53cml0ZShidWYpIDogJyc7XG4gIGlmICh0aGlzLmxhc3ROZWVkKSByZXR1cm4gciArICdcXHVmZmZkJztcbiAgcmV0dXJuIHI7XG59XG5cbi8vIFVURi0xNkxFIHR5cGljYWxseSBuZWVkcyB0d28gYnl0ZXMgcGVyIGNoYXJhY3RlciwgYnV0IGV2ZW4gaWYgd2UgaGF2ZSBhbiBldmVuXG4vLyBudW1iZXIgb2YgYnl0ZXMgYXZhaWxhYmxlLCB3ZSBuZWVkIHRvIGNoZWNrIGlmIHdlIGVuZCBvbiBhIGxlYWRpbmcvaGlnaFxuLy8gc3Vycm9nYXRlLiBJbiB0aGF0IGNhc2UsIHdlIG5lZWQgdG8gd2FpdCBmb3IgdGhlIG5leHQgdHdvIGJ5dGVzIGluIG9yZGVyIHRvXG4vLyBkZWNvZGUgdGhlIGxhc3QgY2hhcmFjdGVyIHByb3Blcmx5LlxuZnVuY3Rpb24gdXRmMTZUZXh0KGJ1ZiwgaSkge1xuICBpZiAoKGJ1Zi5sZW5ndGggLSBpKSAlIDIgPT09IDApIHtcbiAgICB2YXIgciA9IGJ1Zi50b1N0cmluZygndXRmMTZsZScsIGkpO1xuICAgIGlmIChyKSB7XG4gICAgICB2YXIgYyA9IHIuY2hhckNvZGVBdChyLmxlbmd0aCAtIDEpO1xuICAgICAgaWYgKGMgPj0gMHhEODAwICYmIGMgPD0gMHhEQkZGKSB7XG4gICAgICAgIHRoaXMubGFzdE5lZWQgPSAyO1xuICAgICAgICB0aGlzLmxhc3RUb3RhbCA9IDQ7XG4gICAgICAgIHRoaXMubGFzdENoYXJbMF0gPSBidWZbYnVmLmxlbmd0aCAtIDJdO1xuICAgICAgICB0aGlzLmxhc3RDaGFyWzFdID0gYnVmW2J1Zi5sZW5ndGggLSAxXTtcbiAgICAgICAgcmV0dXJuIHIuc2xpY2UoMCwgLTEpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcjtcbiAgfVxuICB0aGlzLmxhc3ROZWVkID0gMTtcbiAgdGhpcy5sYXN0VG90YWwgPSAyO1xuICB0aGlzLmxhc3RDaGFyWzBdID0gYnVmW2J1Zi5sZW5ndGggLSAxXTtcbiAgcmV0dXJuIGJ1Zi50b1N0cmluZygndXRmMTZsZScsIGksIGJ1Zi5sZW5ndGggLSAxKTtcbn1cblxuLy8gRm9yIFVURi0xNkxFIHdlIGRvIG5vdCBleHBsaWNpdGx5IGFwcGVuZCBzcGVjaWFsIHJlcGxhY2VtZW50IGNoYXJhY3RlcnMgaWYgd2Vcbi8vIGVuZCBvbiBhIHBhcnRpYWwgY2hhcmFjdGVyLCB3ZSBzaW1wbHkgbGV0IHY4IGhhbmRsZSB0aGF0LlxuZnVuY3Rpb24gdXRmMTZFbmQoYnVmKSB7XG4gIHZhciByID0gYnVmICYmIGJ1Zi5sZW5ndGggPyB0aGlzLndyaXRlKGJ1ZikgOiAnJztcbiAgaWYgKHRoaXMubGFzdE5lZWQpIHtcbiAgICB2YXIgZW5kID0gdGhpcy5sYXN0VG90YWwgLSB0aGlzLmxhc3ROZWVkO1xuICAgIHJldHVybiByICsgdGhpcy5sYXN0Q2hhci50b1N0cmluZygndXRmMTZsZScsIDAsIGVuZCk7XG4gIH1cbiAgcmV0dXJuIHI7XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFRleHQoYnVmLCBpKSB7XG4gIHZhciBuID0gKGJ1Zi5sZW5ndGggLSBpKSAlIDM7XG4gIGlmIChuID09PSAwKSByZXR1cm4gYnVmLnRvU3RyaW5nKCdiYXNlNjQnLCBpKTtcbiAgdGhpcy5sYXN0TmVlZCA9IDMgLSBuO1xuICB0aGlzLmxhc3RUb3RhbCA9IDM7XG4gIGlmIChuID09PSAxKSB7XG4gICAgdGhpcy5sYXN0Q2hhclswXSA9IGJ1ZltidWYubGVuZ3RoIC0gMV07XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5sYXN0Q2hhclswXSA9IGJ1ZltidWYubGVuZ3RoIC0gMl07XG4gICAgdGhpcy5sYXN0Q2hhclsxXSA9IGJ1ZltidWYubGVuZ3RoIC0gMV07XG4gIH1cbiAgcmV0dXJuIGJ1Zi50b1N0cmluZygnYmFzZTY0JywgaSwgYnVmLmxlbmd0aCAtIG4pO1xufVxuXG5mdW5jdGlvbiBiYXNlNjRFbmQoYnVmKSB7XG4gIHZhciByID0gYnVmICYmIGJ1Zi5sZW5ndGggPyB0aGlzLndyaXRlKGJ1ZikgOiAnJztcbiAgaWYgKHRoaXMubGFzdE5lZWQpIHJldHVybiByICsgdGhpcy5sYXN0Q2hhci50b1N0cmluZygnYmFzZTY0JywgMCwgMyAtIHRoaXMubGFzdE5lZWQpO1xuICByZXR1cm4gcjtcbn1cblxuLy8gUGFzcyBieXRlcyBvbiB0aHJvdWdoIGZvciBzaW5nbGUtYnl0ZSBlbmNvZGluZ3MgKGUuZy4gYXNjaWksIGxhdGluMSwgaGV4KVxuZnVuY3Rpb24gc2ltcGxlV3JpdGUoYnVmKSB7XG4gIHJldHVybiBidWYudG9TdHJpbmcodGhpcy5lbmNvZGluZyk7XG59XG5cbmZ1bmN0aW9uIHNpbXBsZUVuZChidWYpIHtcbiAgcmV0dXJuIGJ1ZiAmJiBidWYubGVuZ3RoID8gdGhpcy53cml0ZShidWYpIDogJyc7XG59IiwidmFyIHNjb3BlID0gKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsKSB8fFxuICAgICAgICAgICAgKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiICYmIHNlbGYpIHx8XG4gICAgICAgICAgICB3aW5kb3c7XG52YXIgYXBwbHkgPSBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHk7XG5cbi8vIERPTSBBUElzLCBmb3IgY29tcGxldGVuZXNzXG5cbmV4cG9ydHMuc2V0VGltZW91dCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IFRpbWVvdXQoYXBwbHkuY2FsbChzZXRUaW1lb3V0LCBzY29wZSwgYXJndW1lbnRzKSwgY2xlYXJUaW1lb3V0KTtcbn07XG5leHBvcnRzLnNldEludGVydmFsID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgVGltZW91dChhcHBseS5jYWxsKHNldEludGVydmFsLCBzY29wZSwgYXJndW1lbnRzKSwgY2xlYXJJbnRlcnZhbCk7XG59O1xuZXhwb3J0cy5jbGVhclRpbWVvdXQgPVxuZXhwb3J0cy5jbGVhckludGVydmFsID0gZnVuY3Rpb24odGltZW91dCkge1xuICBpZiAodGltZW91dCkge1xuICAgIHRpbWVvdXQuY2xvc2UoKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gVGltZW91dChpZCwgY2xlYXJGbikge1xuICB0aGlzLl9pZCA9IGlkO1xuICB0aGlzLl9jbGVhckZuID0gY2xlYXJGbjtcbn1cblRpbWVvdXQucHJvdG90eXBlLnVucmVmID0gVGltZW91dC5wcm90b3R5cGUucmVmID0gZnVuY3Rpb24oKSB7fTtcblRpbWVvdXQucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuX2NsZWFyRm4uY2FsbChzY29wZSwgdGhpcy5faWQpO1xufTtcblxuLy8gRG9lcyBub3Qgc3RhcnQgdGhlIHRpbWUsIGp1c3Qgc2V0cyB1cCB0aGUgbWVtYmVycyBuZWVkZWQuXG5leHBvcnRzLmVucm9sbCA9IGZ1bmN0aW9uKGl0ZW0sIG1zZWNzKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcbiAgaXRlbS5faWRsZVRpbWVvdXQgPSBtc2Vjcztcbn07XG5cbmV4cG9ydHMudW5lbnJvbGwgPSBmdW5jdGlvbihpdGVtKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcbiAgaXRlbS5faWRsZVRpbWVvdXQgPSAtMTtcbn07XG5cbmV4cG9ydHMuX3VucmVmQWN0aXZlID0gZXhwb3J0cy5hY3RpdmUgPSBmdW5jdGlvbihpdGVtKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcblxuICB2YXIgbXNlY3MgPSBpdGVtLl9pZGxlVGltZW91dDtcbiAgaWYgKG1zZWNzID49IDApIHtcbiAgICBpdGVtLl9pZGxlVGltZW91dElkID0gc2V0VGltZW91dChmdW5jdGlvbiBvblRpbWVvdXQoKSB7XG4gICAgICBpZiAoaXRlbS5fb25UaW1lb3V0KVxuICAgICAgICBpdGVtLl9vblRpbWVvdXQoKTtcbiAgICB9LCBtc2Vjcyk7XG4gIH1cbn07XG5cbi8vIHNldGltbWVkaWF0ZSBhdHRhY2hlcyBpdHNlbGYgdG8gdGhlIGdsb2JhbCBvYmplY3RcbnJlcXVpcmUoXCJzZXRpbW1lZGlhdGVcIik7XG4vLyBPbiBzb21lIGV4b3RpYyBlbnZpcm9ubWVudHMsIGl0J3Mgbm90IGNsZWFyIHdoaWNoIG9iamVjdCBgc2V0aW1tZWRpYXRlYCB3YXNcbi8vIGFibGUgdG8gaW5zdGFsbCBvbnRvLiAgU2VhcmNoIGVhY2ggcG9zc2liaWxpdHkgaW4gdGhlIHNhbWUgb3JkZXIgYXMgdGhlXG4vLyBgc2V0aW1tZWRpYXRlYCBsaWJyYXJ5LlxuZXhwb3J0cy5zZXRJbW1lZGlhdGUgPSAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgJiYgc2VsZi5zZXRJbW1lZGlhdGUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiICYmIGdsb2JhbC5zZXRJbW1lZGlhdGUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICh0aGlzICYmIHRoaXMuc2V0SW1tZWRpYXRlKTtcbmV4cG9ydHMuY2xlYXJJbW1lZGlhdGUgPSAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgJiYgc2VsZi5jbGVhckltbWVkaWF0ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBnbG9iYWwuY2xlYXJJbW1lZGlhdGUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMgJiYgdGhpcy5jbGVhckltbWVkaWF0ZSk7XG4iLCJcbi8qKlxuICogTW9kdWxlIGV4cG9ydHMuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBkZXByZWNhdGU7XG5cbi8qKlxuICogTWFyayB0aGF0IGEgbWV0aG9kIHNob3VsZCBub3QgYmUgdXNlZC5cbiAqIFJldHVybnMgYSBtb2RpZmllZCBmdW5jdGlvbiB3aGljaCB3YXJucyBvbmNlIGJ5IGRlZmF1bHQuXG4gKlxuICogSWYgYGxvY2FsU3RvcmFnZS5ub0RlcHJlY2F0aW9uID0gdHJ1ZWAgaXMgc2V0LCB0aGVuIGl0IGlzIGEgbm8tb3AuXG4gKlxuICogSWYgYGxvY2FsU3RvcmFnZS50aHJvd0RlcHJlY2F0aW9uID0gdHJ1ZWAgaXMgc2V0LCB0aGVuIGRlcHJlY2F0ZWQgZnVuY3Rpb25zXG4gKiB3aWxsIHRocm93IGFuIEVycm9yIHdoZW4gaW52b2tlZC5cbiAqXG4gKiBJZiBgbG9jYWxTdG9yYWdlLnRyYWNlRGVwcmVjYXRpb24gPSB0cnVlYCBpcyBzZXQsIHRoZW4gZGVwcmVjYXRlZCBmdW5jdGlvbnNcbiAqIHdpbGwgaW52b2tlIGBjb25zb2xlLnRyYWNlKClgIGluc3RlYWQgb2YgYGNvbnNvbGUuZXJyb3IoKWAuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gLSB0aGUgZnVuY3Rpb24gdG8gZGVwcmVjYXRlXG4gKiBAcGFyYW0ge1N0cmluZ30gbXNnIC0gdGhlIHN0cmluZyB0byBwcmludCB0byB0aGUgY29uc29sZSB3aGVuIGBmbmAgaXMgaW52b2tlZFxuICogQHJldHVybnMge0Z1bmN0aW9ufSBhIG5ldyBcImRlcHJlY2F0ZWRcIiB2ZXJzaW9uIG9mIGBmbmBcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZGVwcmVjYXRlIChmbiwgbXNnKSB7XG4gIGlmIChjb25maWcoJ25vRGVwcmVjYXRpb24nKSkge1xuICAgIHJldHVybiBmbjtcbiAgfVxuXG4gIHZhciB3YXJuZWQgPSBmYWxzZTtcbiAgZnVuY3Rpb24gZGVwcmVjYXRlZCgpIHtcbiAgICBpZiAoIXdhcm5lZCkge1xuICAgICAgaWYgKGNvbmZpZygndGhyb3dEZXByZWNhdGlvbicpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgICAgfSBlbHNlIGlmIChjb25maWcoJ3RyYWNlRGVwcmVjYXRpb24nKSkge1xuICAgICAgICBjb25zb2xlLnRyYWNlKG1zZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLndhcm4obXNnKTtcbiAgICAgIH1cbiAgICAgIHdhcm5lZCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgcmV0dXJuIGRlcHJlY2F0ZWQ7XG59XG5cbi8qKlxuICogQ2hlY2tzIGBsb2NhbFN0b3JhZ2VgIGZvciBib29sZWFuIHZhbHVlcyBmb3IgdGhlIGdpdmVuIGBuYW1lYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICogQHJldHVybnMge0Jvb2xlYW59XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBjb25maWcgKG5hbWUpIHtcbiAgLy8gYWNjZXNzaW5nIGdsb2JhbC5sb2NhbFN0b3JhZ2UgY2FuIHRyaWdnZXIgYSBET01FeGNlcHRpb24gaW4gc2FuZGJveGVkIGlmcmFtZXNcbiAgdHJ5IHtcbiAgICBpZiAoIWdsb2JhbC5sb2NhbFN0b3JhZ2UpIHJldHVybiBmYWxzZTtcbiAgfSBjYXRjaCAoXykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgdmFsID0gZ2xvYmFsLmxvY2FsU3RvcmFnZVtuYW1lXTtcbiAgaWYgKG51bGwgPT0gdmFsKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiBTdHJpbmcodmFsKS50b0xvd2VyQ2FzZSgpID09PSAndHJ1ZSc7XG59XG4iLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IG5ldyBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG59IGNhdGNoIChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG4iLCIvLyBHbG9iYWxzIHRvIGRlZmluZSBzcHJlYWRzaGVldCBjb2x1bW4gbmFtZXMsXG4vLyAgICAgaW4gY2FzZSBzb21ldGhpbmcgaXMgY2hhbmdlZCBsYXRlci5cblxuY29uc3QgZiA9IHtcbiAgdHlwZTogJ1R5cGUnLFxuICBuYW1lOiAnTmFtZScsXG4gIHNrdTogJ1NLVScsXG4gIHBpYzogJ1BJQycsXG4gIGNhdDogJ3RheDpwcm9kdWN0X2NhdCcsXG4gIHRhZzogJ3RheDpwcm9kdWN0X3RhZycsXG4gIGRlc2M6ICdEZXNjcmlwdGlvbicsXG4gIHNob3J0X2Rlc2M6ICdTaG9ydCBEZXNjcmlwdGlvbicsXG4gIHZpc2liaWxpdHk6ICdWaXNpYmlsaXR5IGluIGNhdGFsb2cnLFxuICBwYWNrYWdlOiAnUGFja2FnZScsXG4gIHRpdGxlOiAnVGl0bGUnLCAvLyBVc2VkIGluIHBhY2thZ2VzXG4gIGF0dHI6ICdBdHRyaWJ1dGVzJywgLy8gVXNlZCBpbiBwYWNrYWdlc1xuICBtb2RlbDogJ01vZGVsJywgLy8gVXNlZCBpbiBwYWNrYWdlc1xuICBza3VzOiAnU0tVcycsIC8vIFVzZWQgaW4gcGFja2FnZXNcbiAgcHJvZF9pbmZvOiAnUHJvZHVjdCBJbmZvJywgLy8gVXNlZCBpbiBwYWNrYWdlc1xuICBpbWFnZTogJ0ltYWdlJyxcbiAgaW5kZW50OiAnSW5kZW50aW9uJyxcbiAgd2FycmFudHlMaXN0OiAnV2FycmFudHkgTGlzdCcsXG4gIHdhcnJhbnR5Qm9keTogJ1dhcnJhbnR5IEJvZHknLFxuICBvcmRlckluZm86ICdPcmRlcmluZyBJbmZvcm1hdGlvbicsXG4gIGZlYXRzOiAnUHJvZHVjdCBGZWF0dXJlcycsXG4gIHJlbGF0ZWQ6ICdSZWxhdGVkIFByb2R1Y3RzJyxcbiAgaW5kaWN0OiAnSW5kaWNhdGlvbnMnLFxuICBkb3duczogJ0Rvd25sb2FkcycsXG4gIG1haW5fbW9kZWw6ICdNYWluIE1vZGVsJyxcbiAgcG5mOiAnSW4gUGFydCBOdW1iZXIgRmluZGVyJyxcbn07XG5cbmV4cG9ydCB7IGYgfTtcbiIsImltcG9ydCB7IGYgfSBmcm9tICcuL2ZpZWxkcy5qcyc7XG5pbXBvcnQgaGFzaCBmcm9tICdvYmplY3QtaGFzaCc7XG5cbi8vICAgVGhlIGF0dHJpYnV0ZSBjb2x1bW4gcmlnaHQgYmVmb3JlIHNwZWNpZmljYXRpb25zIHN0YXJ0XG5jb25zdCBiX1NwZWNzU3RhcnQgPSAnU3BlY2lmaWNhdGlvbiBTdGFydCc7XG5jb25zdCBiX1NwZWNzRW5kID0gJ1NwZWNpZmljYXRpb24gRW5kJztcblxuZnVuY3Rpb24gZmluZFNwZWNCb3VuZHMoYXR0clJvdykge1xuICBsZXQgc3RhcnRlZCA9IGZhbHNlO1xuXG4gIHJldHVybiBhdHRyUm93XG4gICAgLm1hcCgodmFsLCBpbmQpID0+IHtcbiAgICAgIGlmICh2YWwgPT09IGJfU3BlY3NTdGFydCkge1xuICAgICAgICBzdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGluZDtcbiAgICAgIH1cblxuICAgICAgaWYgKHZhbCA9PT0gYl9TcGVjc0VuZCAmJiBzdGFydGVkKSB7XG4gICAgICAgIHJldHVybiBpbmQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSlcbiAgICAuZmlsdGVyKHZhbCA9PiB7XG4gICAgICBpZiAoZmFsc2UgIT09IHZhbCkgcmV0dXJuIHRydWU7IC8vIEkga25vdyB0aGlzIGxvb2tzIHNpbGx5LCBidXQgd2hhdCBpZiB2YWwgPT0gMD9cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gZmluZFNwZWNJY29ucyhhdHRyUm93LCByb3cpIHtcbiAgY29uc3QgaWNvbnMgPSB7fTtcbiAgaWYgKCFyb3cuaW5jbHVkZXMoJ0lDT04nKSkge1xuICAgIHdpbmRvdy5hbGVydCgnQXJlIHlvdSBzdXJlIHlvdXIgZGVmaW5pbmcgc3BlY2lmaWNhdGlvbiBpY29ucz8nKTtcbiAgfVxuICByb3cubWFwKCh2YWwsIGluZCkgPT4ge1xuICAgIGlmICgnJyAhPT0gdmFsICYmICdJQ09OJyAhPT0gdmFsKSB7XG4gICAgICBpY29uc1thdHRyUm93W2luZF1dID0gdmFsO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBpY29ucztcbn1cblxuZnVuY3Rpb24gY29tcHV0ZUNoZWNrc3VtKHByb2RzKSB7XG4gIE9iamVjdC52YWx1ZXMocHJvZHMpLm1hcCgocHJvZCkgPT4ge1xuICAgIHByb2RzW3Byb2RbZi5waWNdXS5jaGVja3N1bSA9IGhhc2gocHJvZCk7XG4gIH0pO1xuICBjb25zb2xlLmxvZygnSEFTSGVkJywgcHJvZHMpO1xuICByZXR1cm4gcHJvZHM7XG59XG5cbmZ1bmN0aW9uIGZpbHRlckV4aXN0aW5nKGRhdGEpIHtcbiAgY29uc3QgZXhpc3RpbmdIYXNoZXMgPSB7fTtcbiAgZGF0YS5mb3JFYWNoKFdQcHJvZCA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGV4aXN0aW5nSGFzaGVzW1dQcHJvZC5tZXRhLlBJQ1swXV0gPSB7XG4gICAgICAgIGlkOiBXUHByb2QuaWQsXG4gICAgICAgIGNoZWNrc3VtOiBTdHJpbmcoV1Bwcm9kLm1ldGEucHJvZHVjdF9oYXNoWzBdKSxcbiAgICAgIH07XG4gICAgfSBjYXRjaCB7IGNvbnNvbGUubG9nKGBJRDoke1dQcHJvZC5pZH0gaXMgbm90IGEgbGVnaXRpbWF0ZSBwcm9kdWN0IDooYCk7IH1cbiAgfSk7XG4gIHJldHVybiBleGlzdGluZ0hhc2hlcztcbn1cblxuZnVuY3Rpb24gY29tcGFyZUhhc2hlc0ZvclBheWxvYWQobmV3UHJvZHMsIGV4aXN0aW5nLCBmb3JjaW5nID0gZmFsc2UpIHtcbiAgaWYgKCFleGlzdGluZykgcmV0dXJuIFtbXSwgT2JqZWN0LmtleXMobmV3UHJvZHMpXTtcbiAgY29uc3QgdG9EZWxldGUgPSBbXTtcbiAgY29uc3QgdG9Qb3N0ID0gW107XG4gIGNvbnN0IHRvVXBkYXRlID0gW107XG5cbiAgY29uc3QgbmV3UGljcyA9IE9iamVjdC5rZXlzKG5ld1Byb2RzKTtcblxuICBsZXQgaWdub3JpbmdOID0gMDtcblxuICAvLyBVZ2gsIGp1c3QgcmVkbyBpdFxuICBuZXdQaWNzLmZvckVhY2gocGljID0+IHtcbiAgICBpZiAoIWV4aXN0aW5nW3BpY10pIHtcbiAgICAgIC8vIENyZWF0ZSBuZXcgcHJvZHVjdHNcbiAgICAgIHRvUG9zdC5wdXNoKHBpYyk7XG4gICAgfSBlbHNlIGlmIChmb3JjaW5nIHx8IGV4aXN0aW5nW3BpY10uY2hlY2tzdW0gIT09IG5ld1Byb2RzW3BpY10uY2hlY2tzdW0pIHtcbiAgICAgIC8vIFVwZGF0ZSBleGlzdGluZyBwcm9kdWN0c1xuICAgICAgZXhpc3RpbmdbcGljXS5waWMgPSBwaWM7IC8vIExvbFxuICAgICAgdG9VcGRhdGUucHVzaChleGlzdGluZ1twaWNdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gSWdub3JlIHVuY2hhbmdlZCBwcm9kdWN0cywgd2UncmUganVzdCBpbmNyZW1lbnRpbmcgYSBjb3VudGVyIGZvciBzdGF0c1xuICAgICAgaWdub3JpbmdOKys7XG4gICAgfVxuICAgIC8vIGVsc2UsIHRoaXMgcHJvZHVjdCBoYXMgbm90IGJlZW4gdXBkYXRlZFxuICB9KTtcblxuICBjb25zb2xlLmxvZyhgQ3JlYXRpbmcgOiAke3RvUG9zdC5sZW5ndGh9YCk7XG4gIGNvbnNvbGUubG9nKGBVcGRhdGluZyA6ICR7dG9VcGRhdGUubGVuZ3RofWApO1xuICBjb25zb2xlLmxvZyhgSWdub3JlaW5nOiAke2lnbm9yaW5nTn1gKTtcblxuICByZXR1cm4gW3RvRGVsZXRlLCB0b1Bvc3QsIHRvVXBkYXRlXTtcbn1cblxuZnVuY3Rpb24ga2V5QnlQSUMocHJvZHMpIHtcbiAgY29uc3QgUHJvZEJ5UElDID0ge307XG4gIHByb2RzLm1hcCh2YWwgPT4ge1xuICAgIGlmICghdmFsKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKCFQcm9kQnlQSUNbdmFsW2YucGljXV0pIHtcbiAgICAgIFByb2RCeVBJQ1t2YWxbZi5waWNdXSA9IFtdO1xuICAgIH1cblxuICAgIFByb2RCeVBJQ1t2YWxbZi5waWNdXSA9IHZhbDtcblxuICAgIHJldHVybiB2YWw7XG4gIH0pO1xuXG4gIHJldHVybiBQcm9kQnlQSUM7XG59XG5cbmZ1bmN0aW9uIHNwbGl0QW5kVmVyaWZ5KGNvbW1hU2VwYXJhdGVkKSB7XG4gIGlmICghY29tbWFTZXBhcmF0ZWQpIHJldHVybiBbXTtcbiAgY29uc3QgcnYgPSBjb21tYVNlcGFyYXRlZC5zcGxpdCgnLCcpLm1hcCh2YWwgPT4ge1xuICAgIHJldHVybiB2YWwudHJpbSgpO1xuICB9KTtcbiAgaWYgKCcnID09PSBydlswXSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gcnY7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkUGFja2FnZU9iaihwYWNrYWdlcykge1xuICBjb25zdCBydiA9IHt9O1xuICBjb25zdCBhdHRyID0gcGFja2FnZXNbMF0uc3BsaWNlKDEpO1xuICAvLyBJZ25vcmUgSUQgZmllbGQgc2luY2UgdGhlIHJvd3MgYXJlIHNwbGljZWQgdG9vXG5cbiAgcGFja2FnZXMuc3BsaWNlKDEpLm1hcChyb3cgPT4ge1xuICAgIGNvbnN0IGlkID0gcm93WzBdO1xuICAgIGlmICh1bmRlZmluZWQgIT09IHJ2W2lkXSkge1xuICAgICAgd2luZG93LmFsZXJ0KGBDb25mbGljdGluZyBwYWNrYWdlIElEJ3MgZm91bmQ6ICR7aWR9YCk7XG4gICAgfVxuICAgIHJ2W2lkXSA9IHt9O1xuICAgIHJvdy5zcGxpY2UoMSkubWFwKCh2YWwsIGluZCkgPT4ge1xuICAgICAgcnZbaWRdW2F0dHJbaW5kXV0gPSB2YWw7XG4gICAgfSk7XG4gICAgcnZbaWRdW2YuYXR0cl0gPSBzcGxpdEFuZFZlcmlmeShydltpZF1bZi5hdHRyXSk7XG4gICAgcnZbaWRdW2Yuc2t1c10gPSBzcGxpdEFuZFZlcmlmeShydltpZF1bZi5za3VzXSk7XG4gIH0pO1xuICByZXR1cm4gcnY7XG59XG5cbmZ1bmN0aW9uIGxpbmtWYXJpYXRpb25zKHBhcmVudHMsIHZhcmllcykge1xuICAvLyBHaXZlIGFsbCBwYXJlbnRzIGFuIGFycmF5IGZpcnN0LCBhbmQgaWYgcHJvZC50eXBlIGlzIHNpbXBsZSxcbiAgLy8gICAgICAgIGNvcHkgdGhlIHNrdSBhbmQgbmFtZSB0byBtYWtlIGEgYmFzaWMgdmFyaWF0aW9uXG4gIE9iamVjdC52YWx1ZXMocGFyZW50cykubWFwKHByb2QgPT4ge1xuICAgIHBhcmVudHNbcHJvZFtmLnBpY11dLnZhcmlhdGlvbnMgPSBbXTtcbiAgICBpZiAoJ3NpbXBsZScgPT09IHByb2RbZi50eXBlXSkge1xuICAgICAgcGFyZW50c1twcm9kW2YucGljXV0udmFyaWF0aW9ucy5wdXNoKHtcbiAgICAgICAgbmFtZTogcHJvZFtmLm5hbWVdLFxuICAgICAgICBza3U6IHByb2RbZi5za3VdLFxuICAgICAgICBzcGVjczogcHJvZC5zcGVjcyxcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG5cbiAgdmFyaWVzLm1hcCh2YWwgPT4ge1xuICAgIGlmICh1bmRlZmluZWQgPT09IHBhcmVudHNbdmFsW2YucGljXV0pIHJldHVybiBmYWxzZTtcblxuICAgIGNvbnN0IHZhck4gPSBwYXJlbnRzW3ZhbFtmLnBpY11dLnZhcmlhdGlvbnMucHVzaCh7XG4gICAgICBuYW1lOiB2YWxbZi5uYW1lXSxcbiAgICAgIHNrdTogdmFsW2Yuc2t1XSxcbiAgICAgIHNwZWNzOiB2YWwuc3BlY3MsIC8vIFRoaXMgaXMgdG9vIGhlYXZ5IG9wdGltaXplVmFyaWF0aW9ucyB0cmFuc2Zvcm1zIGxhdGVyXG4gICAgfSk7XG4gICAgLy8gVW5kZWZpbmVkIGlzIGJldHRlciBmb3IgcGF5bG9hZCBzaXplXG4gICAgaWYgKHZhbFtmLmltYWdlXSkgeyBwYXJlbnRzW3ZhbFtmLnBpY11dLnZhcmlhdGlvbnNbdmFyTiAtIDFdLmltYWdlID0gdmFsW2YuaW1hZ2VdOyBjb25zb2xlLmxvZygnaGFzIGltYWdlJyk7IH07XG4gICAgaWYgKHZhbFtmLmluZGVudF0pIHsgcGFyZW50c1t2YWxbZi5waWNdXS52YXJpYXRpb25zW3Zhck4gLSAxXS5pbmRlbnQgPSB2YWxbZi5pbmRlbnRdOyB9O1xuICAgIGlmICh2YWxbZi5wYWNrYWdlXSkgeyBwYXJlbnRzW3ZhbFtmLnBpY11dLnZhcmlhdGlvbnNbdmFyTiAtIDFdLnBhY2thZ2UgPSB2YWxbZi5wYWNrYWdlXTsgfTtcbiAgfSk7XG5cbiAgcmV0dXJuIHBhcmVudHM7XG59XG5cbmZ1bmN0aW9uIGxpbmtQYWNrYWdlcyhwYXJlbnRzLCBwYWNrcykge1xuICBwYWNrcyA9IGJ1aWxkUGFja2FnZU9iaihwYWNrcyk7XG5cbiAgLy8gTGVhcm4gd2hhdCB5b3UgY2FuIGZyb20ganVzdCB2YXJpYXRpb25zXG4gIE9iamVjdC52YWx1ZXMocGFyZW50cykubWFwKHByb2QgPT4ge1xuICAgIGNvbnN0IHBhY2thZ2VzID0ge307XG5cbiAgICAvLyBEZWZhdWx0IHBhY2thZ2VcbiAgICBwYWNrYWdlcy5kcm9wID0ge1xuICAgICAgbGFiZWw6ICcnLCAvLyEgVGhpcyBzaG91bGQgcHVsbCBmcm9tIFBJQyBieSBjb250cm9sbGVyXG4gICAgICBwaWM6IHByb2RbZi5waWNdLFxuICAgICAgbW9kZWw6ICdCJyxcbiAgICAgIHNrdXM6IFtdLFxuICAgICAgc3BlY3M6IFtdLCAvLyBUaGlzIG5lZWRzIHRvIGJlIHB1bGxlZCBmcm9tIHZhcnlpbmcgYXR0cmlidXRlc1xuICAgICAgcHJvZHVjdF9pbmZvOiBbJ25hbWUnLCAnZGVzY3JpcHRpb24nLCAnaW1hZ2UnXSxcbiAgICB9O1xuXG4gICAgaWYgKHByb2QudmFyaWF0aW9ucykge1xuICAgICAgcHJvZC52YXJpYXRpb25zLm1hcCh2YXJ5ID0+IHtcbiAgICAgICAgaWYgKHVuZGVmaW5lZCAhPT0gdmFyeS5wYWNrYWdlKSB7XG4gICAgICAgICAgLy8gVmFyaWF0aW9uIHNwZWNpZmllcyBhIHBhY2thZ2UgdG8gYmUgaW5cbiAgICAgICAgICAvLyAgIHNlZSBpZiB0aGF0IHBhY2thZ2UgZXhpc3RzIGZpcnN0XG4gICAgICAgICAgaWYgKCFwYWNrYWdlc1t2YXJ5LnBhY2thZ2VdKSB7XG4gICAgICAgICAgICBwYWNrYWdlc1t2YXJ5LnBhY2thZ2VdID0geyAvLyBCYXNlIHBhY2thZ2UgdGVtcGxhdGVcbiAgICAgICAgICAgICAgbGFiZWw6IHZhcnkucGFja2FnZSxcbiAgICAgICAgICAgICAgcGljOiBwcm9kW2YucGljXSxcbiAgICAgICAgICAgICAgbW9kZWw6ICdCJyxcbiAgICAgICAgICAgICAgc2t1czogW10sXG4gICAgICAgICAgICAgIHNwZWNzOiBbXSwgLy8gRGVmaW5lZCBieSBwYWNrIHNoZWV0IGJlbG93XG4gICAgICAgICAgICAgIHByb2R1Y3RfaW5mbzogW10sIC8vIERlZmluZWQgYnkgcGFjayBzaGVldCBiZWxvd1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIC8vIGlmIHRoaXMgaXMgYSAnbGlzdCcgcGFja2FnZSwgZW5zdXJlIG1vZGVsIEFcbiAgICAgICAgICAgIGlmICgnbGlzdCcgPT09IHZhcnkucGFja2FnZSkge1xuICAgICAgICAgICAgICBwYWNrYWdlc1t2YXJ5LnBhY2thZ2VdLm1vZGVsID0gJ0EnO1xuICAgICAgICAgICAgICBwYWNrYWdlc1t2YXJ5LnBhY2thZ2VdLmxhYmVsID0gJyc7IC8vISBQSUMncyBuYW1lIGlmIG9uIGFub3RoZXIgcHJvZHVjdFxuICAgICAgICAgICAgICBwYWNrYWdlc1t2YXJ5LnBhY2thZ2VdLnByb2R1Y3RfaW5mbyA9IFsnbmFtZScsICdkZXNjcmlwdGlvbicsICdpbWFnZSddO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBJZiBhbnkgb2YgdGhlIHZhcmlhdGlvbnMgaGF2ZSBpbWFnZXMsIHVwZ3JhZGUgdGhhdCBwYWNrYWdlIG1vZGVsLlxuICAgICAgICAgIGlmICh2YXJ5LmltYWdlKSB7XG4gICAgICAgICAgICBwYWNrYWdlc1t2YXJ5LnBhY2thZ2VdLm1vZGVsID0gJ0MnO1xuICAgICAgICAgICAgLy8gICBNYWtlIHN1cmUgdGhleSdyZSBzZXBhcmF0ZSBmcm9tIHRoZSAnZHJvcCcgZmlyc3RcbiAgICAgICAgICAgIC8vIEFueSBvdGhlciBkZXRhaWxzIHNob3VsZCBiZSBkZWZpbmVkIGJ5IHBhY2sgc2hlZXRcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gQWRkIHZhcmlhdGlvbiB0byB0aGUgcGFja2FnZSBvZiBpdHMgY2hvaWNlXG4gICAgICAgICAgY29uc29sZS5sb2cocHJvZFtmLm5hbWVdLCB2YXJ5LnBhY2thZ2UpO1xuICAgICAgICAgIHBhY2thZ2VzW3ZhcnkucGFja2FnZV0uc2t1cy5wdXNoKHZhcnkuc2t1KTtcblxuICAgICAgICAvLyBJZiBhIHBhY2thZ2UgbmFtZSBpc24ndCBzcGVjaWZpZWQgYnV0IHRoZSB2YXJpYXRpb24gc3RpbGwgdXNlcyBhbiBpbWFnZSwgdXNlIGEgYmxhbmsgcGFja2FnZSBuYW1lLCBzaW1pbGFyIHRvICdkcm9wJ1xuICAgICAgICB9IGVsc2UgaWYgKHZhcnkuaW1hZ2UpIHtcbiAgICAgICAgICAvLyBDaGVjayBpZiB0aGVyZSBhbHJlYWR5IGlzbid0IGEgcGFja2FnZSBmb3IgdW5sYWJlbGVkIHBhY2thZ2VzIG9mIHZhcmlhdGlvbiBpbWFnZXMuXG4gICAgICAgICAgaWYgKCFwYWNrYWdlcy52YXJ5SW1hZ2UpIHtcbiAgICAgICAgICAgIHBhY2thZ2VzLnZhcnlJbWFnZSA9IHtcbiAgICAgICAgICAgICAgbGFiZWw6ICcnLFxuICAgICAgICAgICAgICBwaWM6IHByb2RbZi5waWNdLFxuICAgICAgICAgICAgICBza3VzOiBbXSxcbiAgICAgICAgICAgICAgc3BlY3M6IFtdLFxuICAgICAgICAgICAgICBtb2RlbDogJ0MnLFxuICAgICAgICAgICAgICBwcm9kdWN0X2luZm86IFsnbmFtZScsICdkZXNjcmlwdGlvbicsICdpbWFnZSddLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcGFja2FnZXMudmFyeUltYWdlLnNrdXMucHVzaCh2YXJ5LnNrdSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcGFja2FnZXMuZHJvcC5za3VzLnB1c2godmFyeS5za3UpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyAgIFJlbW92ZSBkZWZhdWx0IGlmIGV2ZXJ5IHZhcmlhdGlvbiBmb3VuZCBhIHBhY2thZ2VcbiAgICBpZiAoMCA9PT0gcGFja2FnZXMuZHJvcC5za3VzLmxlbmd0aCkge1xuICAgICAgZGVsZXRlIHBhY2thZ2VzLmRyb3A7XG4gICAgfVxuXG4gICAgLy8gTm93IGFwcGx5IHRoZSBwYWNrYWdlIGZpbGUgZm9yIG1vcmUgcGFja2FnZXMgYW5kIHNwZWNzXG4gICAgLy8gQWxsIHBhY2thZ2VzIG11c3QgaGF2ZSBuYW1lcyBieSBub3csIG90aGVyd2lzZSB0aGUgdmFyaWF0aW9ucyB3b3VsZG4ndCBiZSBhYmxlIHRvIHNhdmUgb3IgdGhleSB3b3VsZCBiZSBwdXQgaW4gJ2Ryb3AnXG4gICAgaWYgKHByb2RbZi5wYWNrYWdlXSkge1xuICAgICAgcHJvZFtmLnBhY2thZ2VdLnNwbGl0KCcsJykubWFwKGlkID0+IHtcbiAgICAgICAgLy8gVGhpcyBpcyBhIHBhY2thZ2Ugd2hvJ3MgbmFtZSBkZXJpdmVzIGZyb20gUElDXG4gICAgICAgIGlkID0gaWQudHJpbSgpO1xuICAgICAgICAvLyBCZWZvcmUgbWFraW5nIGN1c3RvbSBwYWNrYWdlLCBtYWtlIHN1cmUgdGhlIHZhcmlhdGlvbnMgZGlkbid0IGFscmVhZHkgZGVmaW5lIGl0LlxuICAgICAgICBpZiAocGFja3NbaWRdW2YudGl0bGVdICYgcGFja2FnZXNbcGFja3NbaWRdW2YudGl0bGVdXSkge1xuICAgICAgICAgIHBhY2thZ2VzWydjdXN0b20nICsgaWRdID0gcGFja2FnZXNbcGFja3NbaWRdW2YudGl0bGVdXTtcbiAgICAgICAgICBkZWxldGUgcGFja2FnZXNbcGFja3NbaWRdW2YudGl0bGVdXTtcbiAgICAgICAgfSBlbHNlIC8qIE90aGVyd2lzZSwgYnVpbGQgdGhlIG5ldyBwYWNrYWdlICovIHtcbiAgICAgICAgICBwYWNrYWdlc1snY3VzdG9tJyArIGlkXSA9IHtcbiAgICAgICAgICAgIGxhYmVsOiAnJyxcbiAgICAgICAgICAgIHBpYzogJycsXG4gICAgICAgICAgICBza3VzOiBbXSxcbiAgICAgICAgICAgIG1vZGVsOiAnQicsXG4gICAgICAgICAgICBzcGVjczogW10sIC8vIFRoaXMgbmVlZHMgdG8gYmUgcHVsbGVkIGZyb20gdmFyeWluZyBhdHRyaWJ1dGVzXG4gICAgICAgICAgICBwcm9kdWN0X2luZm86IFtdLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBGb3IgZXZlcnkgZmllbGQgdGhhdCBpcyBkZWZpbmVkIGJ5IHRoZSBwYWNrYWdlIHNoZWV0LCBjb25maXJtIGFuZCByZS1zcGVjaWZ5LlxuICAgICAgICBpZiAocGFja3NbaWRdW2YuaW1hZ2VdKSB7XG4gICAgICAgICAgcGFja2FnZXNbJ2N1c3RvbScgKyBpZF0ubW9kZWwgPSAnRCc7XG4gICAgICAgICAgcGFja2FnZXNbJ2N1c3RvbScgKyBpZF0uaW1hZ2UgPSBwYWNrc1tpZF1bZi5pbWFnZV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhY2tzW2lkXVtmLnBpY10pIHtcbiAgICAgICAgICBwYWNrYWdlc1snY3VzdG9tJyArIGlkXS5waWMgPSBwYWNrc1tpZF1bZi5waWNdO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYWNrc1tpZF1bZi5za3VzXSkge1xuICAgICAgICAgIHBhY2thZ2VzWydjdXN0b20nICsgaWRdLnNrdXMucHVzaCguLi5wYWNrc1tpZF1bZi5za3VzXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhY2tzW2lkXVtmLmF0dHJdKSB7XG4gICAgICAgICAgcGFja2FnZXNbJ2N1c3RvbScgKyBpZF0uc3BlY3MgPSBwYWNrc1tpZF1bZi5hdHRyXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGFja3NbaWRdW2YudGl0bGVdKSB7XG4gICAgICAgICAgcGFja2FnZXNbJ2N1c3RvbScgKyBpZF0ubGFiZWwgPSBwYWNrc1tpZF1bZi50aXRsZV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gSWYgdGhlIHRpdGxlIGlzIG5vdCBzcGVjaWZpZWQsIHRoaXMgaXMgYSBwcm9kdWN0IGJsdXJiIGFuZCB0aGUgdGl0bGUgYW5kIHByb2R1Y3RfaW5mbyBzaG91bGQgYmUgcHVsbGVkIGZyb20gdGhlIFBJQy5cbiAgICAgICAgICBwYWNrYWdlc1snY3VzdG9tJyArIGlkXS5wcm9kdWN0X2luZm8gPSBbJ25hbWUnLCAnZGVzY3JpcHRpb24nLCAnaW1hZ2UnXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGFja3NbaWRdW2YucHJvZF9pbmZvXSkge1xuICAgICAgICAgIHBhY2thZ2VzWydjdXN0b20nICsgaWRdLnByb2R1Y3RfaW5mbyA9IHBhY2tzW2lkXVtmLnByb2RfaW5mb10uc3BsaXQoJywnKS5tYXAodmFsID0+IHZhbC50cmltKCkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYWNrc1tpZF1bZi5tb2RlbF0pIHtcbiAgICAgICAgICBwYWNrYWdlc1snY3VzdG9tJyArIGlkXS5tb2RlbCA9IHBhY2tzW2lkXVtmLm1vZGVsXTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIC8vIFRPRE86IFRlc3Qgd2l0aCBQb3N0ZXJpb3IgTW91bnRpbmcgQnJhY2tldHMgd2l0aCB0aGUgYXJ0IG9mIGxpbmtpbmcgdmlhIGxhYmVsIGFuZCBzcGVjaWZ5IHNwZWNzIGluIHNoZWV0XG4gICAgLy8gVE9ETzogIG5ldmVybWluZCwgYnV0IHRlc3QgYW55d2F5c1xuXG4gICAgLy8vIC8gOiBDb25maXJtIHRoYXQgdGhlIGZpcnN0IHBhY2thZ2UgaXMgdGhlICdkcm9wJyBwYWNrYWdlXG4gICAgLy8gVE9ETzogU3RvcCB1c2luZyB0aGUgZHJvcCBwYWNrYWdlLi4uXG4gICAgLy8gaWYgKE9iamVjdC52YWx1ZXMocGFja2FnZXMpWzBdICYmICcnICE9PSBPYmplY3QudmFsdWVzKHBhY2thZ2VzKVswXS5sYWJlbCkge1xuICAgIC8vICAgd2luZG93LmFsZXJ0KGAke3Byb2RbZi5uYW1lXX0gc2hvdWxkIGJlIHNwZWNpZnlpbmcgbWFpbiBwcm9kdWN0IHZhcmlhdGlvbnMgZmlyc3QhYCk7XG4gICAgLy8gfVxuXG4gICAgLy8gUGFja2FnZXMgbWFrZXMgdXAgYm90aCBwYWNrYWdlcyBpbXBsaWNpdGx5IGRlZmluZWQgaW4gdmFyaWF0aW9ucyBhbmQgZXhwbGljaXRseSBmcm9tIHRoZSBzaGVldFxuICAgIHBhcmVudHNbcHJvZFtmLnBpY11dLnBhY2thZ2VzID0gcGFja2FnZXM7XG4gIH0pO1xuXG4gIHJldHVybiBwYXJlbnRzO1xufVxuXG4vLyBjb25maXJtIGRlZmluaXRpb24gb2YgcHJvcGVydGllcyB0aGF0IHdpbGwgYmUgdXNlZCBpbiBQT1NUXG4vLyAgICB1c2VkIGZvciBjbGVhbmluZyB0YXhvbm9taWVzIGZvciBub3dcbmZ1bmN0aW9uIHZlcmlmeUZpZWxkcyhwcm9kKSB7XG4gIHJldHVybiBwcm9kO1xufVxuXG5mdW5jdGlvbiB2ZXJpZnlGaWxlcyhwYXJlbnRGaWxlSGFuZGxlciwgdmFyaWF0aW9uRmlsZUhhbmRsZXIsIHBhY2thZ2VGaWxlSGFuZGxlcikge1xuICBpZiAocGFyZW50RmlsZUhhbmRsZXIgPT09IHVuZGVmaW5lZCkge1xuICAgIHdpbmRvdy5hbGVydCgnU3BlY2lmeSBhIHBhcmVudCBwcm9kdWN0IGZpbGUgZmlyc3QnKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKHZhcmlhdGlvbkZpbGVIYW5kbGVyID09PSB1bmRlZmluZWQpIHtcbiAgICB3aW5kb3cuYWxlcnQoJ1NwZWNpZnkgYSB2YXJpYXRpb25zIGZpbGUgZmlyc3QnKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKHBhY2thZ2VGaWxlSGFuZGxlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgd2luZG93LmFsZXJ0KCdTcGVjaWZ5IGEgcGFja2FnZSBmaWxlIGZpcnN0Jyk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBidWlsZFNwZWMoc3RhcnQsIGVuZCwgaW5kLCB2YWwsIGljb24pIHtcbiAgaWYgKHN0YXJ0IDwgaW5kICYmIGluZCA8IGVuZCkge1xuICAgIGNvbnN0IHNwZWMgPSB7fTtcblxuICAgIC8vIFZhbHVlXG4gICAgc3BlYy52YWwgPSB2YWw7XG5cbiAgICAvLyBJY29uXG4gICAgc3BlYy5pY29uID0gaWNvbjtcblxuICAgIC8vIEZlYXR1cmVkIG9yIEFkZGl0aW9uYWxcbiAgICBpZiAodmFsLmluY2x1ZGVzKCcqJykpIHtcbiAgICAgIHNwZWMudmFsID0gdmFsLnJlcGxhY2UoJyonLCAnJyk7XG4gICAgICBzcGVjLmZlYXR1cmVkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3BlYy5mZWF0dXJlZCA9IGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gc3BlYztcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gdmFyaWF0aW9uU2xpY2UodmFyeVBhY2ssIGkpIHtcbiAgY29uc3QgcnYgPSB7XG4gICAgdmFyaWVzOiB2YXJ5UGFjay52YXJpZXNbaV0sXG4gICAgbGFiZWxzOiB2YXJ5UGFjay5sYWJlbHMsXG4gIH07XG4gIHJldHVybiBydjtcbn1cblxuZXhwb3J0IHsgZmluZFNwZWNCb3VuZHMsIGZpbmRTcGVjSWNvbnMsIGNvbXB1dGVDaGVja3N1bSwgZmlsdGVyRXhpc3RpbmcsIGNvbXBhcmVIYXNoZXNGb3JQYXlsb2FkLCBrZXlCeVBJQywgbGlua1ZhcmlhdGlvbnMsIGxpbmtQYWNrYWdlcywgdmVyaWZ5RmllbGRzLCB2ZXJpZnlGaWxlcywgYnVpbGRTcGVjLCB2YXJpYXRpb25TbGljZSB9O1xuIiwiXG5pbXBvcnQgeyB2YXJpYXRpb25TbGljZSB9IGZyb20gJy4vZmlsdGVycyc7XG5pbXBvcnQgeyBmZXRjaGVyLCBpbmNyZW1lbnRQcm9ncmVzcyB9IGZyb20gJy4vdXRpbHMuanMnO1xuaW1wb3J0IHsgZiB9IGZyb20gJy4vZmllbGRzJztcblxuYXN5bmMgZnVuY3Rpb24gZ2V0RXhpc3RpbmdQcm9kdWN0cygpIHtcbiAgY29uc3QgcGFnZXMgPSBbXTtcbiAgbGV0IGNybnRQYWdlLCBwYWdlc047XG4gIGNybnRQYWdlID0gMTtcbiAgcGFnZXNOID0gMjA7XG5cbiAgLy8gRmV0Y2ggZmlyc3QgcGFnZSB0byBmaW5kIHRvdGFsIHBhZ2VzXG4gIHBhZ2VzLnB1c2goXG4gICAgLi4uYXdhaXQgZmV0Y2goYCR7d3BBcGlTZXR0aW5ncy5yb290fXdwL3YyL3Byb2R1Y3Q/cGVyX3BhZ2U9MTAwJnBhZ2U9MWApXG4gICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICBwYWdlc04gPSByZXMuaGVhZGVycy5nZXQoJ3gtd3AtdG90YWxwYWdlcycpO1xuICAgICAgICBjb25zb2xlLmxvZyhgVG90YWwgUGFnZXM6ICR7cGFnZXNOfWApO1xuICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goY29uc29sZS5lcnJvciksXG4gICk7XG5cbiAgLy8gRmV0Y2ggdGhlIHJlc3Qgb2YgcGFnZXNcbiAgd2hpbGUgKGNybnRQYWdlKysgPCBwYWdlc04pIHtcbiAgICBwYWdlcy5wdXNoKFxuICAgICAgLi4uYXdhaXQgZmV0Y2goYCR7d3BBcGlTZXR0aW5ncy5yb290fXdwL3YyL3Byb2R1Y3Q/cGVyX3BhZ2U9MTAwJnBhZ2U9JHtjcm50UGFnZX1gKVxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmVycm9yKGVyciwgcGFnZXMpKSxcbiAgICApO1xuICB9XG4gIHJldHVybiBwYWdlcztcbn1cblxuLy8gRGVsZXRlIGEgcHJvZHVjdCwgP2ZvcmNlIHRvIGVuc3VyZSBwZXJtYW5lbnQgZGVsZXRpb25cbmZ1bmN0aW9uIGRlbGV0ZVByb2R1Y3QocG9zdElELCB2ZXJib3NlID0gZmFsc2UpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBpZiAoIXBvc3RJRCkge1xuICAgICAgcmVqZWN0KHBvc3RJRCk7XG4gICAgfVxuICAgIGZldGNoKGAke3dwQXBpU2V0dGluZ3Mucm9vdH13cC92Mi9wcm9kdWN0LyR7cG9zdElEfT9mb3JjZT10cnVlYCwge1xuICAgICAgbWV0aG9kOiAnZGVsZXRlJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ1gtV1AtTm9uY2UnOiB3cEFwaVNldHRpbmdzLm5vbmNlLFxuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgfSxcbiAgICB9KVxuICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgcmVzb2x2ZShyZXMpO1xuICAgICAgICBpZiAodmVyYm9zZSkgY29uc29sZS5sb2cocmVzKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goY29uc29sZS5lcnJvcik7XG4gIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBkZWxldGVQcm9kdWN0cyhwcm9kcywgc3RhdHVzZUVsbSkge1xuICBjb25zdCByZXNwb25zZXMgPSBbXTtcbiAgbGV0IGxhc3REZWxldGU7XG4gIHdoaWxlICgwIDwgcHJvZHMubGVuZ3RoKSB7XG4gICAgc3RhdHVzZUVsbS50ZXh0Q29udGVudCA9IGBEZWxldGluZyBwcm9kdWN0cy4gJHtwcm9kcy5sZW5ndGh9IHJlbWFpbi4uLmA7XG4gICAgbGFzdERlbGV0ZSA9IGF3YWl0IGRlbGV0ZVByb2R1Y3QocHJvZHMuc3BsaWNlKDAsIDEpWzBdLCB0cnVlKTtcbiAgICByZXNwb25zZXMucHVzaChsYXN0RGVsZXRlKTtcbiAgfVxuICByZXR1cm4gcmVzcG9uc2VzO1xufVxuXG5hc3luYyBmdW5jdGlvbiBQT1NUcHJvZHVjdCh2YWwsIHVwZGF0ZUlEID0gZmFsc2UpIHtcbiAgLy8gdmFsID0gdmVyaWZ5RmllbGRzKHZhbCk7ICAgLy8gVW50aWwgdGhpcyBpcyB1c2VkLi4uIElmIHRoaXMgaXMgdXNlZC4uLlxuICBjb25zdCBwYXlsb2FkID0ge1xuICAgIHRpdGxlOiB2YWxbZi5uYW1lXSxcbiAgICBjb250ZW50OiB2YWxbZi5kZXNjXSxcbiAgICBleGNlcnB0OiB2YWxbZi5zaG9ydF9kZXNjXSxcbiAgICBzdGF0dXM6IHZhbFtmLnZpc2liaWxpdHldLFxuICAgIHRlcm1zOiB2YWwudGVybXMsXG4gICAgbWV0YToge1xuICAgICAgU0tVOiB2YWxbZi5za3VdLFxuICAgICAgUElDOiB2YWxbZi5waWNdLFxuICAgICAgb3JkZXJpbmdfaW5mbzogdmFsW2Yub3JkZXJJbmZvXSxcbiAgICAgIHByb2R1Y3RfdHlwZTogdmFsW2YudHlwZV0sXG4gICAgICBwcm9kdWN0X2hhc2g6IHZhbC5jaGVja3N1bSwgLy8gVXNlZCBmb3IgZmluZGluZyBjaGFuZ2VzIGJldHdlZW4gbmV3IGltcG9ydHMgYW5kIHdwIHBvc3RzXG4gICAgICBtYWluX21vZGVsOiB2YWxbZi5tYWluX21vZGVsXSxcbiAgICAgIHBhcnRfbnVtYmVyX2ZpbmRlcjogdmFsW2YucG5mXSxcbiAgICB9LFxuICAgIHNwZWNzOiB2YWwuc3BlY3MsXG4gICAgZ2FsbGVyeTogdmFsLmdhbGxlcnksXG4gICAgdmFyaWF0aW9uczogdmFsLnZhcmlhdGlvbnMgPyB2YXJpYXRpb25TbGljZSh2YWwudmFyaWF0aW9ucywgMCkgOiBbXSwgLy8gLnNwbGljZSgwLCA0MCkgOiBbXSxcbiAgICB3YXJyYW50eTogdmFsLndhcnJhbnR5LFxuICAgIGZlYXR1cmVzOiB2YWwuZmVhdHVyZXMsXG4gICAgaW5kaWNhdGlvbnM6IHZhbC5pbmRpY2F0aW9ucyxcbiAgICBkb3dubG9hZHM6IHZhbC5kb3dubG9hZHMsXG4gICAgcmVsYXRlZDogdmFsLnJlbGF0ZWQsXG4gICAgcGFja2FnZXM6IE9iamVjdC52YWx1ZXModmFsLnBhY2thZ2VzID8gdmFsLnBhY2thZ2VzIDoge30pLCAvLyBLZXlzIG9ubHkgdXNlZCBmb3IgY29uc3RydWN0aW9uXG4gIH07XG5cbiAgLy8gY29uc29sZS5sb2coJ3Byb2R1Y3QgcGF5bG9hZCcsIHBheWxvYWQpO1xuICBsZXQgdXJsID0gYCR7d3BBcGlTZXR0aW5ncy5yb290fXdwL3YyL3Byb2R1Y3RgO1xuICBpZiAodXBkYXRlSUQpIHtcbiAgICB1cmwgPSBgJHt3cEFwaVNldHRpbmdzLnJvb3R9d3AvdjIvcHJvZHVjdC8ke3VwZGF0ZUlEfWA7XG4gIH1cbiAgcmV0dXJuIGZldGNoZXIodXJsLCB7XG4gICAgbWV0aG9kOiAncG9zdCcsXG4gICAgaGVhZGVyczoge1xuICAgICAgJ1gtV1AtTm9uY2UnOiB3cEFwaVNldHRpbmdzLm5vbmNlLFxuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICB9LFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBheWxvYWQpLFxuICB9KVxuICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgLy8gQ29uZmlybSB0aGF0IHRoZSBQT1NUIHdhcyBvayBiZWZvcmUgYWRkaW5nIHZhcmlhdGlvbnNcbiAgICAgIGlmICh1bmRlZmluZWQgIT09IHJlcyAmJlxuICAgICAgICAgICAgICB2YWwudmFyaWF0aW9ucyAmJlxuICAgICAgICAgICAgICAxIDwgdmFsLnZhcmlhdGlvbnMudmFyaWVzLmxlbmd0aFxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBQT1NUdmFyaWF0aW9ucyhyZXMuaWQsIHZhbC52YXJpYXRpb25zLCAxKS50aGVuKCgpID0+IHtcbiAgICAgICAgICBpbmNyZW1lbnRQcm9ncmVzcygpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluY3JlbWVudFByb2dyZXNzKCk7XG4gICAgICB9XG4gICAgfSlcbiAgICAuY2F0Y2goY29uc29sZS5lcnJvcik7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIFBPU1R2YXJpYXRpb25zKFBPU1RpZCwgdmFyaWVzLCBkZXB0aCA9IDEpIHtcbiAgY29uc29sZS5sb2coYFBvc3RpbmcgbW9yZSB2YXJpYXRpb25zIGF0IGEgZGVwdGggb2YgJHtkZXB0aH1gKTtcbiAgY29uc3QgcGF5bG9hZCA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICB2YXJpYXRpb25zOiB2YXJpYXRpb25TbGljZSh2YXJpZXMsIGRlcHRoKSxcbiAgfSk7XG4gIC8vIGNvbnNvbGUubG9nKCd2YXJpYXRpb25zIHBheWxvYWQ6ICcsIHBheWxvYWQpO1xuICByZXR1cm4gZmV0Y2hlcihgJHt3cEFwaVNldHRpbmdzLnJvb3R9d3AvdjIvcHJvZHVjdC8ke1BPU1RpZH1gLCB7XG4gICAgbWV0aG9kOiAncG9zdCcsXG4gICAgaGVhZGVyczoge1xuICAgICAgJ1gtV1AtTm9uY2UnOiB3cEFwaVNldHRpbmdzLm5vbmNlLFxuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICB9LFxuICAgIGJvZHk6IHBheWxvYWQsXG5cbiAgfSkudGhlbihyZXMgPT4ge1xuICAgIGlmIChyZXMgJiYgZGVwdGggKyAxICE9PSB2YXJpZXMudmFyaWVzLmxlbmd0aCAmJiAxNiA+IGRlcHRoKSB7XG4gICAgICByZXR1cm4gUE9TVHZhcmlhdGlvbnMoUE9TVGlkLCB2YXJpZXMsIGRlcHRoICsgMSk7XG4gICAgfVxuICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gUE9TVHByb2R1Y3RzKHByb2RzLCB0b0NyZWF0ZSwgdG9VcGRhdGUsIHN0YXR1c0VsbSkge1xuICBjb25zdCBOcHJvZCA9IHRvQ3JlYXRlLmxlbmd0aCArIHRvVXBkYXRlLmxlbmd0aDtcbiAgbGV0IGN1cnJlbnRQcm9kdWN0LCBwcm9kRGF0YSwgcHJvZElEO1xuICBsZXQgZmluaXNoZWQgPSAwO1xuXG4gIHN0YXR1c0VsbS50ZXh0Q29udGVudCA9IGBVcGxvYWRpbmcgcHJvZHVjdHM6IDAgb2YgJHtOcHJvZH0gcmVjZWl2ZWRgO1xuXG4gIGNvbnNvbGUubG9nKCdQT1NUaW5nLi4uJywgdG9DcmVhdGUsIHRvVXBkYXRlKTtcblxuICAvLyAgUE9TVCBsb29wXG4gIHdoaWxlICgwIDwgdG9DcmVhdGUubGVuZ3RoKSB7XG4gICAgY29uc29sZS5sb2coJ3Bvc3RpbmcgbmV3IHByb2R1Y3QuLi4nKTtcbiAgICBzdGF0dXNFbG0udGV4dENvbnRlbnQgPSBgVXBsb2FkaW5nIHByb2R1Y3RzOiAke2ZpbmlzaGVkKyt9IG9mICR7TnByb2R9IHJlY2VpdmVkYDtcbiAgICBwcm9kRGF0YSA9IHByb2RzW3RvQ3JlYXRlLnNwbGljZSgwLCAxKV07XG4gICAgYXdhaXQgUE9TVHByb2R1Y3QocHJvZERhdGEpO1xuICB9XG4gIHdoaWxlICgwIDwgdG9VcGRhdGUubGVuZ3RoKSB7XG4gICAgY29uc29sZS5sb2coJ3Bvc3RpbmcgdXBkYXRlcy4uLicpO1xuICAgIHN0YXR1c0VsbS50ZXh0Q29udGVudCA9IGBVcGxvYWRpbmcgcHJvZHVjdHM6ICR7ZmluaXNoZWQrK30gb2YgJHtOcHJvZH0gcmVjZWl2ZWRgO1xuICAgIGN1cnJlbnRQcm9kdWN0ID0gdG9VcGRhdGUuc3BsaWNlKDAsIDEpWzBdO1xuICAgIHByb2REYXRhID0gcHJvZHNbY3VycmVudFByb2R1Y3QucGljXTtcbiAgICBwcm9kSUQgPSBjdXJyZW50UHJvZHVjdC5pZDtcbiAgICBhd2FpdCBQT1NUcHJvZHVjdChwcm9kRGF0YSwgcHJvZElEKTtcbiAgfVxuICByZXR1cm4gTnByb2Q7XG59XG5cbmV4cG9ydCB7IGRlbGV0ZVByb2R1Y3RzLCBQT1NUcHJvZHVjdHMsIGdldEV4aXN0aW5nUHJvZHVjdHMgfTtcbiIsImltcG9ydCBjc3YgZnJvbSAnY3N2LXBhcnNlJztcblxuLy8gVXRpdGxpdHkgRnVuY3Rpb25zXG5mdW5jdGlvbiBmZXRjaGVyKHVybCwgb2JqLCBmb3JnaXZpbmcgPSB0cnVlKSB7XG4gIC8vIFNvbWUgYm9pbGVycGxhdGUgZm9yIGZldGNoIGNhbGxzXG4gIHJldHVybiBmZXRjaCh1cmwsIG9iailcbiAgICAudGhlbihyZXMgPT4ge1xuICAgICAgaWYgKDUwMCA9PT0gcmVzLnN0YXR1cykge1xuICAgICAgICBpZiAoZm9yZ2l2aW5nKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignVHJ5aW5nIG9uZSBtb3JlIHRpbWUnKTtcbiAgICAgICAgICByZXR1cm4gZmV0Y2hlcih1cmwsIG9iaiwgZmFsc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1NlY29uZCBhdHRlbXB0IGZhaWxlZCBhcyB3ZWxsJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoIWZvcmdpdmluZykge1xuICAgICAgICBjb25zb2xlLmxvZygnU2Vjb25kIGF0dGVtcHQgc3VjY2VzcyEnKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgIH0pXG4gICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmVycm9yKGVyciwgb2JqKSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlYWRGaWxlUHJvbWlzZShmaWxlSGFuZGxlcikge1xuICAvLyBBbmQgYW5vdGhlciBzaG91dG91dCB0byB0aGlzIGxpbmsgaHR0cHM6Ly9ibG9nLnNob3Zvbmhhc2FuLmNvbS91c2luZy1wcm9taXNlcy13aXRoLWZpbGVyZWFkZXIvXG4gIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gIHJlYWRlci5yZWFkQXNUZXh0KGZpbGVIYW5kbGVyKTtcblxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHJlYWRlci5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICByZWFkZXIuYWJvcnQoKTtcbiAgICAgIHJlamVjdChuZXcgRE9NRXhjZXB0aW9uKCdQcm9ibGVtIHBhcnNpbmcgaW5wdXQgZmlsZS4nKSk7XG4gICAgfTtcbiAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICBjc3YocmVhZGVyLnJlc3VsdCwge30sIGZ1bmN0aW9uKGVyciwgb3V0cHV0KSB7XG4gICAgICAgIGlmIChlcnIpIGNvbnNvbGUuZXJyb3IoJ0NTViBwYXJzZXIgZmFpbGVkOiAnLCBlcnIpO1xuICAgICAgICBlbHNlIHJlc29sdmUob3V0cHV0KTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH0pO1xufVxuXG5mdW5jdGlvbiB0ZXN0Q2FsbChldikge1xuICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAvLyBMYW5jZSBtYWdpY1xuICBmZXRjaChgJHt3cEFwaVNldHRpbmdzLnJvb3R9d3AvdjJgLCB7XG4gICAgbWV0aG9kOiAnZ2V0JyxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnWC1XUC1Ob25jZSc6IHdwQXBpU2V0dGluZ3Mubm9uY2UsXG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgIH0sXG4gICAgLy8gYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgIC8vICAgdGl0bGU6ICdIZWxsbyBNb29uJyxcbiAgICAvLyAgIGNvbnRlbnQ6ICcnLFxuICAgIC8vICAgZXhjZXJwdDogJycsXG4gICAgLy8gICBzdGF0dXM6ICdwdWJsaXNoJyxcbiAgICAvLyAgIG1ldGE6IHsgc2t1OiAnYXNkZicsIHByb2R1Y3RfdHlwZTogJ3NpbXBsZScsIHBpYzogJzEyNDUyMzY0JyB9LFxuICAgIC8vIH0pLFxuICB9KVxuICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKS50aGVuKGNvbnNvbGUubG9nKSlcbiAgICAuY2F0Y2goY29uc29sZS5sb2cpO1xufVxuXG5mdW5jdGlvbiBpbmNyZW1lbnRQcm9ncmVzcyhlbG0pIHtcbiAgcmV0dXJuIGVsbTtcbn1cblxuZXhwb3J0IHsgZmV0Y2hlciwgcmVhZEZpbGVQcm9taXNlLCB0ZXN0Q2FsbCwgaW5jcmVtZW50UHJvZ3Jlc3MgfTtcbiIsIi8qIChpZ25vcmVkKSAqLyIsIi8qIChpZ25vcmVkKSAqLyJdLCJzb3VyY2VSb290IjoiIn0=