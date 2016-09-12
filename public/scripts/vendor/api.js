(function() {
this.launchpad = this.launchpad || {};
this.launchpadNamed = this.launchpadNamed || {};
var babelHelpers = {};
babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers.slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

babelHelpers.toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

babelHelpers;
'use strict';

/**
 * A collection of core utility functions.
 * @const
 */

(function () {
	var core = function () {
		function core() {
			babelHelpers.classCallCheck(this, core);
		}

		/**
   * When defining a class Foo with an abstract method bar(), you can do:
   * Foo.prototype.bar = core.abstractMethod
   *
   * Now if a subclass of Foo fails to override bar(), an error will be thrown
   * when bar() is invoked.
   *
   * @type {!Function}
   * @throws {Error} when invoked to indicate the method should be overridden.
   */

		core.abstractMethod = function abstractMethod() {
			throw Error('Unimplemented abstract method');
		};

		/**
   * Loops constructor super classes collecting its properties values. If
   * property is not available on the super class `undefined` will be
   * collected as value for the class hierarchy position.
   * @param {!function()} constructor Class constructor.
   * @param {string} propertyName Property name to be collected.
   * @return {Array.<*>} Array of collected values.
   * TODO(*): Rethink superclass loop.
   */


		core.collectSuperClassesProperty = function collectSuperClassesProperty(constructor, propertyName) {
			var propertyValues = [constructor[propertyName]];
			while (constructor.__proto__ && !constructor.__proto__.isPrototypeOf(Function)) {
				constructor = constructor.__proto__;
				propertyValues.push(constructor[propertyName]);
			}
			return propertyValues;
		};

		/**
   * Gets the name of the given function. If the current browser doesn't
   * support the `name` property, this will calculate it from the function's
   * content string.
   * @param {!function()} fn
   * @return {string}
   */


		core.getFunctionName = function getFunctionName(fn) {
			if (!fn.name) {
				var str = fn.toString();
				fn.name = str.substring(9, str.indexOf('('));
			}
			return fn.name;
		};

		/**
   * Gets an unique id. If `opt_object` argument is passed, the object is
   * mutated with an unique id. Consecutive calls with the same object
   * reference won't mutate the object again, instead the current object uid
   * returns. See {@link core.UID_PROPERTY}.
   * @type {opt_object} Optional object to be mutated with the uid. If not
   *     specified this method only returns the uid.
   * @throws {Error} when invoked to indicate the method should be overridden.
   */


		core.getUid = function getUid(opt_object) {
			if (opt_object) {
				return opt_object[core.UID_PROPERTY] || (opt_object[core.UID_PROPERTY] = core.uniqueIdCounter_++);
			}
			return core.uniqueIdCounter_++;
		};

		/**
   * The identity function. Returns its first argument.
   * @param {*=} opt_returnValue The single value that will be returned.
   * @return {?} The first argument.
   */


		core.identityFunction = function identityFunction(opt_returnValue) {
			return opt_returnValue;
		};

		/**
   * Returns true if the specified value is a boolean.
   * @param {?} val Variable to test.
   * @return {boolean} Whether variable is boolean.
   */


		core.isBoolean = function isBoolean(val) {
			return typeof val === 'boolean';
		};

		/**
   * Returns true if the specified value is not undefined.
   * @param {?} val Variable to test.
   * @return {boolean} Whether variable is defined.
   */


		core.isDef = function isDef(val) {
			return val !== undefined;
		};

		/**
   * Returns true if value is not undefined or null.
   * @param {*} val
   * @return {Boolean}
   */


		core.isDefAndNotNull = function isDefAndNotNull(val) {
			return core.isDef(val) && !core.isNull(val);
		};

		/**
   * Returns true if value is a document.
   * @param {*} val
   * @return {Boolean}
   */


		core.isDocument = function isDocument(val) {
			return val && (typeof val === 'undefined' ? 'undefined' : babelHelpers.typeof(val)) === 'object' && val.nodeType === 9;
		};

		/**
   * Returns true if value is a dom element.
   * @param {*} val
   * @return {Boolean}
   */


		core.isElement = function isElement(val) {
			return val && (typeof val === 'undefined' ? 'undefined' : babelHelpers.typeof(val)) === 'object' && val.nodeType === 1;
		};

		/**
   * Returns true if the specified value is a function.
   * @param {?} val Variable to test.
   * @return {boolean} Whether variable is a function.
   */


		core.isFunction = function isFunction(val) {
			return typeof val === 'function';
		};

		/**
   * Returns true if value is null.
   * @param {*} val
   * @return {Boolean}
   */


		core.isNull = function isNull(val) {
			return val === null;
		};

		/**
   * Returns true if the specified value is a number.
   * @param {?} val Variable to test.
   * @return {boolean} Whether variable is a number.
   */


		core.isNumber = function isNumber(val) {
			return typeof val === 'number';
		};

		/**
   * Returns true if value is a window.
   * @param {*} val
   * @return {Boolean}
   */


		core.isWindow = function isWindow(val) {
			return val !== null && val === val.window;
		};

		/**
   * Returns true if the specified value is an object. This includes arrays
   * and functions.
   * @param {?} val Variable to test.
   * @return {boolean} Whether variable is an object.
   */


		core.isObject = function isObject(val) {
			var type = typeof val === 'undefined' ? 'undefined' : babelHelpers.typeof(val);
			return type === 'object' && val !== null || type === 'function';
		};

		/**
   * Returns true if value is a Promise.
   * @param {*} val
   * @return {Boolean}
   */


		core.isPromise = function isPromise(val) {
			return val && (typeof val === 'undefined' ? 'undefined' : babelHelpers.typeof(val)) === 'object' && typeof val.then === 'function';
		};

		/**
   * Returns true if value is a string.
   * @param {*} val
   * @return {Boolean}
   */


		core.isString = function isString(val) {
			return typeof val === 'string';
		};

		/**
   * Merges the values of a static property a class with the values of that
   * property for all its super classes, and stores it as a new static
   * property of that class. If the static property already existed, it won't
   * be recalculated.
   * @param {!function()} constructor Class constructor.
   * @param {string} propertyName Property name to be collected.
   * @param {function(*, *):*=} opt_mergeFn Function that receives an array filled
   *   with the values of the property for the current class and all its super classes.
   *   Should return the merged value to be stored on the current class.
   * @return {boolean} Returns true if merge happens, false otherwise.
   */


		core.mergeSuperClassesProperty = function mergeSuperClassesProperty(constructor, propertyName, opt_mergeFn) {
			var mergedName = propertyName + '_MERGED';
			if (constructor.hasOwnProperty(mergedName)) {
				return false;
			}

			var merged = core.collectSuperClassesProperty(constructor, propertyName);
			if (opt_mergeFn) {
				merged = opt_mergeFn(merged);
			}
			constructor[mergedName] = merged;
			return true;
		};

		/**
   * Null function used for default values of callbacks, etc.
   * @return {void} Nothing.
   */


		core.nullFunction = function nullFunction() {};

		return core;
	}();

	/**
  * Unique id property prefix.
  * @type {String}
  * @protected
  */


	core.UID_PROPERTY = 'core_' + (Math.random() * 1e9 >>> 0);

	/**
  * Counter for unique id.
  * @type {Number}
  * @private
  */
	core.uniqueIdCounter_ = 1;

	this.launchpad.core = core;
}).call(this);
'use strict';

(function () {
	var core = this.launchpad.core;

	var array = function () {
		function array() {
			babelHelpers.classCallCheck(this, array);
		}

		/**
   * Checks if the given arrays have the same content.
   * @param {!Array<*>} arr1
   * @param {!Array<*>} arr2
   * @return {boolean}
   */

		array.equal = function equal(arr1, arr2) {
			if (arr1.length !== arr2.length) {
				return false;
			}
			for (var i = 0; i < arr1.length; i++) {
				if (arr1[i] !== arr2[i]) {
					return false;
				}
			}
			return true;
		};

		/**
   * Returns the first value in the given array that isn't undefined.
   * @param {!Array} arr
   * @return {*}
   */


		array.firstDefinedValue = function firstDefinedValue(arr) {
			for (var i = 0; i < arr.length; i++) {
				if (arr[i] !== undefined) {
					return arr[i];
				}
			}
		};

		/**
   * Transforms the input nested array to become flat.
   * @param {Array.<*|Array.<*>>} arr Nested array to flatten.
   * @param {Array.<*>} opt_output Optional output array.
   * @return {Array.<*>} Flat array.
   */


		array.flatten = function flatten(arr, opt_output) {
			var output = opt_output || [];
			for (var i = 0; i < arr.length; i++) {
				if (Array.isArray(arr[i])) {
					array.flatten(arr[i], output);
				} else {
					output.push(arr[i]);
				}
			}
			return output;
		};

		/**
   * Removes the first occurrence of a particular value from an array.
   * @param {Array.<T>} arr Array from which to remove value.
   * @param {T} obj Object to remove.
   * @return {boolean} True if an element was removed.
   * @template T
   */


		array.remove = function remove(arr, obj) {
			var i = arr.indexOf(obj);
			var rv;
			if (rv = i >= 0) {
				array.removeAt(arr, i);
			}
			return rv;
		};

		/**
   * Removes from an array the element at index i
   * @param {Array} arr Array or array like object from which to remove value.
   * @param {number} i The index to remove.
   * @return {boolean} True if an element was removed.
   */


		array.removeAt = function removeAt(arr, i) {
			return Array.prototype.splice.call(arr, i, 1).length === 1;
		};

		/**
   * Slices the given array, just like Array.prototype.slice, but this
   * is faster and working on all array-like objects (like arguments).
   * @param {!Object} arr Array-like object to slice.
   * @param {number} start The index that should start the slice.
   * @param {number=} opt_end The index where the slice should end, not
   *   included in the final array. If not given, all elements after the
   *   start index will be included.
   * @return {!Array}
   */


		array.slice = function slice(arr, start, opt_end) {
			var sliced = [];
			var end = core.isDef(opt_end) ? opt_end : arr.length;
			for (var i = start; i < end; i++) {
				sliced.push(arr[i]);
			}
			return sliced;
		};

		return array;
	}();

	this.launchpad.array = array;
}).call(this);
/*!
 * Polyfill from Google's Closure Library.
 * Copyright 2013 The Closure Library Authors. All Rights Reserved.
 */

'use strict';

(function () {
	var async = {};

	/**
  * Throw an item without interrupting the current execution context.  For
  * example, if processing a group of items in a loop, sometimes it is useful
  * to report an error while still allowing the rest of the batch to be
  * processed.
  * @param {*} exception
  */
	async.throwException = function (exception) {
		// Each throw needs to be in its own context.
		async.nextTick(function () {
			throw exception;
		});
	};

	/**
  * Fires the provided callback just before the current callstack unwinds, or as
  * soon as possible after the current JS execution context.
  * @param {function(this:THIS)} callback
  * @param {THIS=} opt_context Object to use as the "this value" when calling
  *     the provided function.
  * @template THIS
  */
	async.run = function (callback, opt_context) {
		if (!async.run.workQueueScheduled_) {
			// Nothing is currently scheduled, schedule it now.
			async.nextTick(async.run.processWorkQueue);
			async.run.workQueueScheduled_ = true;
		}

		async.run.workQueue_.push(new async.run.WorkItem_(callback, opt_context));
	};

	/** @private {boolean} */
	async.run.workQueueScheduled_ = false;

	/** @private {!Array.<!async.run.WorkItem_>} */
	async.run.workQueue_ = [];

	/**
  * Run any pending async.run work items. This function is not intended
  * for general use, but for use by entry point handlers to run items ahead of
  * async.nextTick.
  */
	async.run.processWorkQueue = function () {
		// NOTE: additional work queue items may be pushed while processing.
		while (async.run.workQueue_.length) {
			// Don't let the work queue grow indefinitely.
			var workItems = async.run.workQueue_;
			async.run.workQueue_ = [];
			for (var i = 0; i < workItems.length; i++) {
				var workItem = workItems[i];
				try {
					workItem.fn.call(workItem.scope);
				} catch (e) {
					async.throwException(e);
				}
			}
		}

		// There are no more work items, reset the work queue.
		async.run.workQueueScheduled_ = false;
	};

	/**
  * @constructor
  * @final
  * @struct
  * @private
  *
  * @param {function()} fn
  * @param {Object|null|undefined} scope
  */
	async.run.WorkItem_ = function (fn, scope) {
		/** @const */
		this.fn = fn;
		/** @const */
		this.scope = scope;
	};

	/**
  * Fires the provided callbacks as soon as possible after the current JS
  * execution context. setTimeout(…, 0) always takes at least 5ms for legacy
  * reasons.
  * @param {function(this:SCOPE)} callback Callback function to fire as soon as
  *     possible.
  * @param {SCOPE=} opt_context Object in whose scope to call the listener.
  * @template SCOPE
  */
	async.nextTick = function (callback, opt_context) {
		var cb = callback;
		if (opt_context) {
			cb = callback.bind(opt_context);
		}
		cb = async.nextTick.wrapCallback_(cb);
		// Introduced and currently only supported by IE10.
		// Verify if variable is defined on the current runtime (i.e., node, browser).
		// Can't use typeof enclosed in a function (such as core.isFunction) or an
		// exception will be thrown when the function is called on an environment
		// where the variable is undefined.
		if (typeof setImmediate === 'function') {
			setImmediate(cb);
			return;
		}
		// Look for and cache the custom fallback version of setImmediate.
		if (!async.nextTick.setImmediate_) {
			async.nextTick.setImmediate_ = async.nextTick.getSetImmediateEmulator_();
		}
		async.nextTick.setImmediate_(cb);
	};

	/**
  * Cache for the setImmediate implementation.
  * @type {function(function())}
  * @private
  */
	async.nextTick.setImmediate_ = null;

	/**
  * Determines the best possible implementation to run a function as soon as
  * the JS event loop is idle.
  * @return {function(function())} The "setImmediate" implementation.
  * @private
  */
	async.nextTick.getSetImmediateEmulator_ = function () {
		// Create a private message channel and use it to postMessage empty messages
		// to ourselves.
		var Channel;

		// Verify if variable is defined on the current runtime (i.e., node, browser).
		// Can't use typeof enclosed in a function (such as core.isFunction) or an
		// exception will be thrown when the function is called on an environment
		// where the variable is undefined.
		if (typeof MessageChannel === 'function') {
			Channel = MessageChannel;
		}

		// If MessageChannel is not available and we are in a browser, implement
		// an iframe based polyfill in browsers that have postMessage and
		// document.addEventListener. The latter excludes IE8 because it has a
		// synchronous postMessage implementation.
		if (typeof Channel === 'undefined' && typeof window !== 'undefined' && window.postMessage && window.addEventListener) {
			/** @constructor */
			Channel = function Channel() {
				// Make an empty, invisible iframe.
				var iframe = document.createElement('iframe');
				iframe.style.display = 'none';
				iframe.src = '';
				document.documentElement.appendChild(iframe);
				var win = iframe.contentWindow;
				var doc = win.document;
				doc.open();
				doc.write('');
				doc.close();
				var message = 'callImmediate' + Math.random();
				var origin = win.location.protocol + '//' + win.location.host;
				var onmessage = function (e) {
					// Validate origin and message to make sure that this message was
					// intended for us.
					if (e.origin !== origin && e.data !== message) {
						return;
					}
					this.port1.onmessage();
				}.bind(this);
				win.addEventListener('message', onmessage, false);
				this.port1 = {};
				this.port2 = {
					postMessage: function postMessage() {
						win.postMessage(message, origin);
					}
				};
			};
		}
		if (typeof Channel !== 'undefined') {
			var channel = new Channel();
			// Use a fifo linked list to call callbacks in the right order.
			var head = {};
			var tail = head;
			channel.port1.onmessage = function () {
				head = head.next;
				var cb = head.cb;
				head.cb = null;
				cb();
			};
			return function (cb) {
				tail.next = {
					cb: cb
				};
				tail = tail.next;
				channel.port2.postMessage(0);
			};
		}
		// Implementation for IE6-8: Script elements fire an asynchronous
		// onreadystatechange event when inserted into the DOM.
		if (typeof document !== 'undefined' && 'onreadystatechange' in document.createElement('script')) {
			return function (cb) {
				var script = document.createElement('script');
				script.onreadystatechange = function () {
					// Clean up and call the callback.
					script.onreadystatechange = null;
					script.parentNode.removeChild(script);
					script = null;
					cb();
					cb = null;
				};
				document.documentElement.appendChild(script);
			};
		}
		// Fall back to setTimeout with 0. In browsers this creates a delay of 5ms
		// or more.
		return function (cb) {
			setTimeout(cb, 0);
		};
	};

	/**
  * Helper function that is overrided to protect callbacks with entry point
  * monitor if the application monitors entry points.
  * @param {function()} callback Callback function to fire as soon as possible.
  * @return {function()} The wrapped callback.
  * @private
  */
	async.nextTick.wrapCallback_ = function (opt_returnValue) {
		return opt_returnValue;
	};

	this.launchpad.async = async;
}).call(this);
'use strict';

/**
 * Disposable utility. When inherited provides the `dispose` function to its
 * subclass, which is responsible for disposing of any object references
 * when an instance won't be used anymore. Subclasses should override
 * `disposeInternal` to implement any specific disposing logic.
 * @constructor
 */

(function () {
	var Disposable = function () {
		function Disposable() {
			babelHelpers.classCallCheck(this, Disposable);

			/**
    * Flag indicating if this instance has already been disposed.
    * @type {boolean}
    * @protected
    */
			this.disposed_ = false;
		}

		/**
   * Disposes of this instance's object references. Calls `disposeInternal`.
   */


		Disposable.prototype.dispose = function dispose() {
			if (!this.disposed_) {
				this.disposeInternal();
				this.disposed_ = true;
			}
		};

		/**
   * Subclasses should override this method to implement any specific
   * disposing logic (like clearing references and calling `dispose` on other
   * disposables).
   */


		Disposable.prototype.disposeInternal = function disposeInternal() {};

		/**
   * Checks if this instance has already been disposed.
   * @return {boolean}
   */


		Disposable.prototype.isDisposed = function isDisposed() {
			return this.disposed_;
		};

		return Disposable;
	}();

	this.launchpad.Disposable = Disposable;
}).call(this);
'use strict';

(function () {
	var object = function () {
		function object() {
			babelHelpers.classCallCheck(this, object);
		}

		/**
   * Copies all the members of a source object to a target object.
   * @param {Object} target Target object.
   * @param {...Object} var_args The objects from which values will be copied.
   * @return {Object} Returns the target object reference.
   */

		object.mixin = function mixin(target) {
			var key, source;
			for (var i = 1; i < arguments.length; i++) {
				source = arguments[i];
				for (key in source) {
					target[key] = source[key];
				}
			}
			return target;
		};

		/**
   * Returns an object based on its fully qualified external name.
   * @param {string} name The fully qualified name.
   * @param {object=} opt_obj The object within which to look; default is
   *     <code>window</code>.
   * @return {?} The value (object or primitive) or, if not found, undefined.
   */


		object.getObjectByName = function getObjectByName(name, opt_obj) {
			var scope = opt_obj || window;
			var parts = name.split('.');
			return parts.reduce(function (part, key) {
				return part[key];
			}, scope);
		};

		/**
   * Returns a new object with the same keys as the given one, but with
   * their values set to the return values of the specified function.
   * @param {!Object} obj
   * @param {!function(string, *)} fn
   * @return {!Object}
   */


		object.map = function map(obj, fn) {
			var mappedObj = {};
			var keys = Object.keys(obj);
			for (var i = 0; i < keys.length; i++) {
				mappedObj[keys[i]] = fn(keys[i], obj[keys[i]]);
			}
			return mappedObj;
		};

		/**
   * Checks if the two given objects are equal. This is done via a shallow
   * check, including only the keys directly contained by the 2 objects.
   * @return {boolean}
   */


		object.shallowEqual = function shallowEqual(obj1, obj2) {
			if (obj1 === obj2) {
				return true;
			}

			var keys1 = Object.keys(obj1);
			var keys2 = Object.keys(obj2);
			if (keys1.length !== keys2.length) {
				return false;
			}

			for (var i = 0; i < keys1.length; i++) {
				if (obj1[keys1[i]] !== obj2[keys1[i]]) {
					return false;
				}
			}
			return true;
		};

		return object;
	}();

	this.launchpad.object = object;
}).call(this);
'use strict';

(function () {
	var string = function () {
		function string() {
			babelHelpers.classCallCheck(this, string);
		}

		/**
   * Removes the breaking spaces from the left and right of the string and
   * collapses the sequences of breaking spaces in the middle into single spaces.
   * The original and the result strings render the same way in HTML.
   * @param {string} str A string in which to collapse spaces.
   * @return {string} Copy of the string with normalized breaking spaces.
   */

		string.collapseBreakingSpaces = function collapseBreakingSpaces(str) {
			return str.replace(/[\t\r\n ]+/g, ' ').replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, '');
		};

		/**
  * Escapes characters in the string that are not safe to use in a RegExp.
  * @param {*} str The string to escape. If not a string, it will be casted
  *     to one.
  * @return {string} A RegExp safe, escaped copy of {@code s}.
  */


		string.escapeRegex = function escapeRegex(str) {
			return String(str).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, '\\$1').replace(/\x08/g, '\\x08');
		};

		/**
  * Returns a string with at least 64-bits of randomness.
  * @return {string} A random string, e.g. sn1s7vb4gcic.
  */


		string.getRandomString = function getRandomString() {
			var x = 2147483648;
			return Math.floor(Math.random() * x).toString(36) + Math.abs(Math.floor(Math.random() * x) ^ Date.now()).toString(36);
		};

		/**
   * Calculates the hashcode for a string. The hashcode value is computed by
   * the sum algorithm: s[0]*31^(n-1) + s[1]*31^(n-2) + ... + s[n-1]. A nice
   * property of using 31 prime is that the multiplication can be replaced by
   * a shift and a subtraction for better performance: 31*i == (i<<5)-i.
   * Modern VMs do this sort of optimization automatically.
   * @param {String} val Target string.
   * @return {Number} Returns the string hashcode.
   */


		string.hashCode = function hashCode(val) {
			var hash = 0;
			for (var i = 0, len = val.length; i < len; i++) {
				hash = 31 * hash + val.charCodeAt(i);
				hash %= 0x100000000;
			}
			return hash;
		};

		/**
   * Replaces interval into the string with specified value, e.g.
   * `replaceInterval("abcde", 1, 4, "")` returns "ae".
   * @param {string} str The input string.
   * @param {Number} start Start interval position to be replaced.
   * @param {Number} end End interval position to be replaced.
   * @param {string} value The value that replaces the specified interval.
   * @return {string}
   */


		string.replaceInterval = function replaceInterval(str, start, end, value) {
			return str.substring(0, start) + value + str.substring(end);
		};

		return string;
	}();

	this.launchpad.string = string;
}).call(this);
'use strict';

(function () {
  var core = this.launchpad.core;
  var array = this.launchpad.array;
  var async = this.launchpad.async;
  var Disposable = this.launchpad.Disposable;
  var object = this.launchpad.object;
  var string = this.launchpad.string;
  this.launchpad.metal = core;
  this.launchpadNamed.metal = this.launchpadNamed.metal || {};
  this.launchpadNamed.metal.core = core;
  this.launchpadNamed.metal.array = array;
  this.launchpadNamed.metal.async = async;
  this.launchpadNamed.metal.Disposable = Disposable;
  this.launchpadNamed.metal.object = object;
  this.launchpadNamed.metal.string = string;
}).call(this);
'use strict';

(function () {
	var core = this.launchpadNamed.metal.core;

	/**
  * Class responsible for storing authorization information.
  */

	var Auth = function () {
		/**
   * Constructs an {@link Auth} instance.
   * @param {string} tokenOrUsername Either the authorization token, or
   *   the username.
   * @param {string=} opt_password If a username is given as the first param,
   *   this should be the password.
   * @constructor
   */

		function Auth(tokenOrUsername) {
			var opt_password = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
			babelHelpers.classCallCheck(this, Auth);

			this.token_ = core.isString(opt_password) ? null : tokenOrUsername;
			this.username_ = core.isString(opt_password) ? tokenOrUsername : null;
			this.password_ = opt_password;
		}

		/**
   * Constructs an {@link Auth} instance.
   * @param {string} tokenOrUsername Either the authorization token, or
   *   the username.
   * @param {string=} opt_password If a username is given as the first param,
   *   this should be the password.
   * @return {!Auth}
   */


		Auth.create = function create(tokenOrUsername, opt_password) {
			return new Auth(tokenOrUsername, opt_password);
		};

		/**
   * Checks if the password is set.
   * @return {boolean}
   */


		Auth.prototype.hasPassword = function hasPassword() {
			return this.password_ !== null;
		};

		/**
   * Checks if the token is set.
   * @return {boolean}
   */


		Auth.prototype.hasToken = function hasToken() {
			return this.token_ !== null;
		};

		/**
   * Checks if the username is set.
   * @return {boolean}
   */


		Auth.prototype.hasUsername = function hasUsername() {
			return this.username_ !== null;
		};

		/**
   * Returns the password.
   * @return {string}
   */


		Auth.prototype.password = function password() {
			return this.password_;
		};

		/**
   * Returns the token.
   * @return {string}
   */


		Auth.prototype.token = function token() {
			return this.token_;
		};

		/**
   * Returns the username.
   * @return {string}
   */


		Auth.prototype.username = function username() {
			return this.username_;
		};

		return Auth;
	}();

	this.launchpad.Auth = Auth;
}).call(this);
'use strict';

(function () {
	var Disposable = this.launchpadNamed.metal.Disposable;

	/**
  * A cached reference to the create function.
  */

	var create = Object.create;

	/**
  * Case insensitive string Multimap implementation. Allows multiple values for
  * the same key name.
  * @extends {Disposable}
  */

	var MultiMap = function (_Disposable) {
		babelHelpers.inherits(MultiMap, _Disposable);

		function MultiMap() {
			babelHelpers.classCallCheck(this, MultiMap);

			var _this = babelHelpers.possibleConstructorReturn(this, _Disposable.call(this));

			_this.keys = create(null);
			_this.values = create(null);
			return _this;
		}

		/**
   * Adds value to a key name.
   * @param {string} name
   * @param {*} value
   * @chainable
   */


		MultiMap.prototype.add = function add(name, value) {
			this.keys[name.toLowerCase()] = name;
			this.values[name.toLowerCase()] = this.values[name.toLowerCase()] || [];
			this.values[name.toLowerCase()].push(value);
			return this;
		};

		/**
   * Clears map names and values.
   * @chainable
   */


		MultiMap.prototype.clear = function clear() {
			this.keys = create(null);
			this.values = create(null);
			return this;
		};

		/**
   * Checks if map contains a value to the key name.
   * @param {string} name
   * @return {boolean}
   * @chainable
   */


		MultiMap.prototype.contains = function contains(name) {
			return name.toLowerCase() in this.values;
		};

		/**
   * @inheritDoc
   */


		MultiMap.prototype.disposeInternal = function disposeInternal() {
			this.values = null;
		};

		/**
   * Gets the first added value from a key name.
   * @param {string} name
   * @return {*}
   * @chainable
   */


		MultiMap.prototype.get = function get(name) {
			var values = this.values[name.toLowerCase()];
			if (values) {
				return values[0];
			}
		};

		/**
   * Gets all values from a key name.
   * @param {string} name
   * @return {Array.<*>}
   */


		MultiMap.prototype.getAll = function getAll(name) {
			return this.values[name.toLowerCase()];
		};

		/**
   * Returns true if the map is empty, false otherwise.
   * @return {boolean}
   */


		MultiMap.prototype.isEmpty = function isEmpty() {
			return this.size() === 0;
		};

		/**
   * Gets array of key names.
   * @return {Array.<string>}
   */


		MultiMap.prototype.names = function names() {
			var _this2 = this;

			return Object.keys(this.values).map(function (key) {
				return _this2.keys[key];
			});
		};

		/**
   * Removes all values from a key name.
   * @param {string} name
   * @chainable
   */


		MultiMap.prototype.remove = function remove(name) {
			delete this.keys[name.toLowerCase()];
			delete this.values[name.toLowerCase()];
			return this;
		};

		/**
   * Sets the value of a key name. Relevant to replace the current values with
   * a new one.
   * @param {string} name
   * @param {*} value
   * @chainable
   */


		MultiMap.prototype.set = function set(name, value) {
			this.keys[name.toLowerCase()] = name;
			this.values[name.toLowerCase()] = [value];
			return this;
		};

		/**
   * Gets the size of the map key names.
   * @return {number}
   */


		MultiMap.prototype.size = function size() {
			return this.names().length;
		};

		/**
   * Returns the parsed values as a string.
   * @return {string}
   */


		MultiMap.prototype.toString = function toString() {
			return JSON.stringify(this.values);
		};

		return MultiMap;
	}(Disposable);

	this.launchpad.MultiMap = MultiMap;
}).call(this);
'use strict';

(function () {
	var core = this.launchpadNamed.metal.core;
	var MultiMap = this.launchpad.MultiMap;

	/**
  * Represents a client message (e.g. a request or a response).
  */

	var ClientMessage = function () {
		function ClientMessage() {
			babelHelpers.classCallCheck(this, ClientMessage);

			this.headers_ = new MultiMap();
		}

		/**
   * Fluent getter and setter for request body.
   * @param {*=} opt_body Request body to be set. If none is given,
   *   the current value of the body will be returned.
   * @return {*} Returns request body if no body value was given. Otherwise
   *   returns the {@link ClientMessage} object itself, so calls can be chained.
   * @chainable Chainable when used as setter.
   */


		ClientMessage.prototype.body = function body(opt_body) {
			if (core.isDef(opt_body)) {
				this.body_ = opt_body;
				return this;
			}
			return this.body_;
		};

		/**
   * Adds a header. If a header with the same name already exists, it will not be
   * overwritten, but the new value will be stored as well. The order is preserved.
   * @param {string} name
   * @param {string} value
   * @chainable
   */


		ClientMessage.prototype.header = function header(name, value) {
			if (arguments.length !== 2) {
				throw new Error('Invalid arguments');
			}
			this.headers_.set(name, value);
			return this;
		};

		/**
   * Fluent getter and setter for request headers.
   * @param {MultiMap|Object=} opt_headers Request headers list to
   *   be set. If none is given the current value of the headers will
   *   be returned.
   * @return {!MultiMap|ClientMessage} Returns map of request headers
   *   if no new value was given. Otherwise returns the {@link ClientMessage}
   *   object itself, so calls can be chained.
   * @chainable Chainable when used as setter.
   */


		ClientMessage.prototype.headers = function headers(opt_headers) {
			if (core.isDef(opt_headers)) {
				if (opt_headers instanceof MultiMap) {
					this.headers_ = opt_headers;
				} else {
					this.headers_.values = opt_headers;
				}
				return opt_headers;
			}
			return this.headers_;
		};

		/**
   * Removes the body.
   */


		ClientMessage.prototype.removeBody = function removeBody() {
			this.body_ = undefined;
		};

		return ClientMessage;
	}();

	this.launchpad.ClientMessage = ClientMessage;
}).call(this);
'use strict';

(function () {
	var core = this.launchpadNamed.metal.core;
	var ClientMessage = this.launchpad.ClientMessage;
	var MultiMap = this.launchpad.MultiMap;

	/**
  * Represents a client request object.
  * @extends {ClientMessage}
  */

	var ClientRequest = function (_ClientMessage) {
		babelHelpers.inherits(ClientRequest, _ClientMessage);

		function ClientRequest() {
			babelHelpers.classCallCheck(this, ClientRequest);

			var _this = babelHelpers.possibleConstructorReturn(this, _ClientMessage.call(this));

			_this.params_ = new MultiMap();
			return _this;
		}

		/**
   * Fluent getter and setter for request method.
   * @param {string=} opt_method Request method to be set. If none is given,
   *   the current method value will be returned.
   * @return {!ClientMessage|string} Returns request method if no new value was
   *   given. Otherwise returns the {@link ClientMessage} object itself, so
   *   calls can be chained.
   * @chainable Chainable when used as setter.
   */


		ClientRequest.prototype.method = function method(opt_method) {
			if (core.isDef(opt_method)) {
				this.method_ = opt_method;
				return this;
			}
			return this.method_ || ClientRequest.DEFAULT_METHOD;
		};

		/**
   * Adds a query. If a query with the same name already exists, it will not
   * be overwritten, but new value will be stored as well. The order is preserved.
   * @param {string} name
   * @param {string} value
   * @chainable
   */


		ClientRequest.prototype.param = function param(name, value) {
			if (arguments.length !== 2) {
				throw new Error('Invalid arguments');
			}
			this.params_.set(name, value);
			return this;
		};

		/**
   * Fluent getter and setter for request querystring.
   * @param {MultiMap|Object=} opt_params Request querystring map to be set.
   *   If none is given the current value of the params will be returned.
   * @return {!MultiMap|ClientMessage} Returns map of request querystring if
   *   no new value was given. Otherwise returns the {@link ClientMessage}
   *   object itself, so calls can be chained.
   */


		ClientRequest.prototype.params = function params(opt_params) {
			if (core.isDef(opt_params)) {
				if (opt_params instanceof MultiMap) {
					this.params_ = opt_params;
				} else {
					this.params_.values = opt_params;
				}
				return opt_params;
			}
			return this.params_;
		};

		/**
   * Fluent getter and setter for request url.
   * @param {string=} opt_url Request url to be set. If none is given,
   *   the current value of the url will be returned.
   * @return {!ClientMessage|string} Returns request url if no new value was given.
   *   Otherwise returns the {@link ClientMessage} object itself, so calls can be
   *   chained.
   * @chainable Chainable when used as setter.
   */


		ClientRequest.prototype.url = function url(opt_url) {
			if (core.isDef(opt_url)) {
				this.url_ = opt_url;
				return this;
			}
			return this.url_;
		};

		return ClientRequest;
	}(ClientMessage);

	ClientRequest.DEFAULT_METHOD = 'GET';

	this.launchpad.ClientRequest = ClientRequest;
}).call(this);
'use strict';

(function () {
	var core = this.launchpadNamed.metal.core;
	var ClientMessage = this.launchpad.ClientMessage;

	/**
  * Represents a client response object.
  * @extends {ClientMessage}
  */

	var ClientResponse = function (_ClientMessage) {
		babelHelpers.inherits(ClientResponse, _ClientMessage);

		function ClientResponse(clientRequest) {
			babelHelpers.classCallCheck(this, ClientResponse);

			var _this = babelHelpers.possibleConstructorReturn(this, _ClientMessage.call(this));

			if (!clientRequest) {
				throw new Error('Can\'t create response without request');
			}
			_this.clientRequest_ = clientRequest;
			return _this;
		}

		/**
   * Returns request that created this response.
   * @return {!ClientRequest}
   */


		ClientResponse.prototype.request = function request() {
			return this.clientRequest_;
		};

		/**
   * Fluent getter and setter for response status code.
   * @param {number=} opt_statusCode Request status code to be set. If none is given,
   *   the current status code value will be returned.
   * @return {!ClientMessage|number} Returns response status code if no new value was
   *   given. Otherwise returns the {@link ClientMessage} object itself, so calls can
   *   be chained.
   * @chainable Chainable when used as setter.
   */


		ClientResponse.prototype.statusCode = function statusCode(opt_statusCode) {
			if (core.isDef(opt_statusCode)) {
				this.statusCode_ = opt_statusCode;
				return this;
			}
			return this.statusCode_;
		};

		/**
   * Fluent getter and setter for response status text.
   * @param {string=} opt_statusText Request status text to be set. If none is given,
   *   the current status text value will be returned.
   * @return {!ClientMessage|number} Returns response status text if no new value was
   *   given. Otherwise returns the {@link ClientMessage} object itself, so calls can
   *   be chained.
   * @chainable Chainable when used as setter.
   */


		ClientResponse.prototype.statusText = function statusText(opt_statusText) {
			if (core.isDef(opt_statusText)) {
				this.statusText_ = opt_statusText;
				return this;
			}
			return this.statusText_;
		};

		/**
   * Checks if response succeeded. Any status code 2xx or 3xx is considered valid.
   * @return {boolean}
   */


		ClientResponse.prototype.succeeded = function succeeded() {
			return this.statusCode() >= 200 && this.statusCode() <= 399;
		};

		return ClientResponse;
	}(ClientMessage);

	this.launchpad.ClientResponse = ClientResponse;
}).call(this);
'use strict';

/**
 * Abstraction layer for string to base64 conversion
 * reference: https://github.com/nodejs/node/issues/3462
 */

(function () {
	var Base64 = function () {
		function Base64() {
			babelHelpers.classCallCheck(this, Base64);
		}

		/**
   * Creates a base-64 encoded ASCII string from a "string" of binary data.
   * @param {string} string to be encoded.
   * @return {string}
   * @static
   */

		Base64.encodeString = function encodeString(string) {
			if (typeof btoa === 'function') {
				return btoa(string);
			}

			return new Buffer(string.toString(), 'binary');
		};

		return Base64;
	}();

	this.launchpad.Base64 = Base64;
}).call(this);
'use strict';

/**
 * Class responsible for storing an object that will be printed as JSON
 * when the `toString` method is called.
 */

(function () {
	var Embodied = function () {
		/**
   * Constructs a Embodied instance.
   * @constructor
   */

		function Embodied() {
			babelHelpers.classCallCheck(this, Embodied);

			this.body_ = {};
		}

		/**
   * Gets the json object that represents this instance.
   * @return {!Object}
   */


		Embodied.prototype.body = function body() {
			return this.body_;
		};

		/**
   * If the given object is an instance of Embodied, this will
   * return its body content. Otherwise this will return the
   * original object.
   * @param {*} obj
   * @return {*}
   * @static
   */


		Embodied.toBody = function toBody(obj) {
			return obj instanceof Embodied ? obj.body() : obj;
		};

		/**
   * Gets the json string that represents this instance.
   * @return {string}
   */


		Embodied.prototype.toString = function toString() {
			return JSON.stringify(this.body());
		};

		return Embodied;
	}();

	this.launchpad.Embodied = Embodied;
}).call(this);
'use strict';

(function () {
	var core = this.launchpadNamed.metal.core;
	var Embodied = this.launchpad.Embodied;

	/**
  * Class responsible for storing and handling the body contents
  * of a Filter instance.
  */

	var FilterBody = function () {
		/**
   * Constructs a {@link FilterBody} instance.
   * @param {string} field The name of the field to filter by.
   * @param {*} operatorOrValue If a third param is given, this should
   *   be the filter's operator (like ">="). Otherwise, this will be
   *   used as the filter's value, and the filter's operator will be "=".
   * @param {*=} opt_value The filter's value.
   * @constructor
   */

		function FilterBody(field, operatorOrValue, opt_value) {
			babelHelpers.classCallCheck(this, FilterBody);

			var obj = {
				operator: core.isDef(opt_value) ? operatorOrValue : '='
			};
			var value = core.isDef(opt_value) ? opt_value : operatorOrValue;
			if (core.isDefAndNotNull(value)) {
				if (value instanceof Embodied) {
					value = value.body();
				}
				obj.value = value;
			}
			this.createBody_(field, obj);
		}

		/**
   * Composes the current filter with the given operator.
   * @param {string} operator
   * @param {Filter=} opt_filter Another filter to compose this filter with,
   *   if the operator is not unary.
   */


		FilterBody.prototype.add = function add(operator, opt_filter) {
			if (opt_filter) {
				this.addArrayOperator_(operator, opt_filter);
			} else {
				this.createBody_(operator, this.body_);
			}
		};

		/**
   * Composes the current filter with an operator that stores its values in an array.
   * @param {string} operator
   * @param {!Filter} filter
   * @protected
   */


		FilterBody.prototype.addArrayOperator_ = function addArrayOperator_(operator, filter) {
			if (!(this.body_[operator] instanceof Array)) {
				this.createBody_(operator, [this.body_]);
			}
			this.body_[operator].push(filter.body());
		};

		/**
   * Adds filters to be composed with this filter body using the given operator.
   * @param {string} operator
   * @param {...*} filters A variable amount of filters to be composed.
   */


		FilterBody.prototype.addMany = function addMany(operator) {
			for (var _len = arguments.length, filters = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				filters[_key - 1] = arguments[_key];
			}

			for (var i = 0; i < filters.length; i++) {
				this.add(operator, filters[i]);
			}
		};

		/**
   * Creates a new body object, setting the requestd key to the given value.
   * @param {string} key The key to set in the new body object
   * @param {*} value The value the requested key should have in the new body object.
   * @protected
   */


		FilterBody.prototype.createBody_ = function createBody_(key, value) {
			this.body_ = {};
			this.body_[key] = value;
		};

		/**
   * Gets the json object that represents this filter's body.
   * @return {!Object}
   */


		FilterBody.prototype.getObject = function getObject() {
			return this.body_;
		};

		return FilterBody;
	}();

	this.launchpad.FilterBody = FilterBody;
}).call(this);
'use strict';

(function () {
	var Embodied = this.launchpad.Embodied;

	/**
  * Class responsible for building different types of geometric
  * shapes.
  */

	var Geo = function () {
		function Geo() {
			babelHelpers.classCallCheck(this, Geo);
		}

		/**
   * Creates a new {@link BoundingBox} instance.
   * @param {*} upperLeft The upper left point.
   * @param {*} lowerRight The lower right point.
   * @return {!BoundingBox}
   * @static
   */

		Geo.boundingBox = function boundingBox(upperLeft, lowerRight) {
			return new Geo.BoundingBox(upperLeft, lowerRight);
		};

		/**
   * Creates a new {@link Circle} instance.
   * @param {*} center The circle's center coordinate.
   * @param {string} radius The circle's radius.
   * @return {!Circle}
   * @static
   */


		Geo.circle = function circle(center, radius) {
			return new Geo.Circle(center, radius);
		};

		/**
   * Creates a new {@link Line} instance.
   * @param {...*} points This line's points.
   * @return {!Line}
   * @static
   */


		Geo.line = function line() {
			for (var _len = arguments.length, points = Array(_len), _key = 0; _key < _len; _key++) {
				points[_key] = arguments[_key];
			}

			return new (Function.prototype.bind.apply(Geo.Line, [null].concat(points)))();
		};

		/**
   * Creates a new {@link Point} instance.
   * @param {number} lat The latitude coordinate
   * @param {number} lon The longitude coordinate
   * @return {!Point}
   * @static
   */


		Geo.point = function point(lat, lon) {
			return new Geo.Point(lat, lon);
		};

		/**
   * Creates a new {@link Polygon} instance.
   * @param {...*} points This polygon's points.
   * @return {!Polygon}
   * @static
   */


		Geo.polygon = function polygon() {
			for (var _len2 = arguments.length, points = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
				points[_key2] = arguments[_key2];
			}

			return new (Function.prototype.bind.apply(Geo.Polygon, [null].concat(points)))();
		};

		return Geo;
	}();

	/**
  * Class that represents a point coordinate.
  * @extends {Embodied}
  */


	var Point = function (_Embodied) {
		babelHelpers.inherits(Point, _Embodied);

		/**
   * Constructs a {@link Point} instance.
   * @param {number} lat The latitude coordinate
   * @param {number} lon The longitude coordinate
   * @constructor
   */

		function Point(lat, lon) {
			babelHelpers.classCallCheck(this, Point);

			var _this = babelHelpers.possibleConstructorReturn(this, _Embodied.call(this));

			_this.body_ = [lat, lon];
			return _this;
		}

		return Point;
	}(Embodied);

	Geo.Point = Point;

	/**
  * Class that represents a line.
  * @extends {Embodied}
  */

	var Line = function (_Embodied2) {
		babelHelpers.inherits(Line, _Embodied2);

		/**
   * Constructs a {@link Line} instance.
   * @param {...*} points This line's points.
   * @constructor
   */

		function Line() {
			babelHelpers.classCallCheck(this, Line);

			var _this2 = babelHelpers.possibleConstructorReturn(this, _Embodied2.call(this));

			for (var _len3 = arguments.length, points = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
				points[_key3] = arguments[_key3];
			}

			_this2.body_ = {
				type: 'linestring',
				coordinates: points.map(function (point) {
					return Embodied.toBody(point);
				})
			};
			return _this2;
		}

		return Line;
	}(Embodied);

	Geo.Line = Line;

	/**
  * Class that represents a bounding box.
  * @extends {Embodied}
  */

	var BoundingBox = function (_Embodied3) {
		babelHelpers.inherits(BoundingBox, _Embodied3);

		/**
   * Constructs a {@link BoundingBox} instance.
   * @param {*} upperLeft The upper left point.
   * @param {*} lowerRight The lower right point.
   * @constructor
   */

		function BoundingBox(upperLeft, lowerRight) {
			babelHelpers.classCallCheck(this, BoundingBox);

			var _this3 = babelHelpers.possibleConstructorReturn(this, _Embodied3.call(this));

			_this3.body_ = {
				type: 'envelope',
				coordinates: [Embodied.toBody(upperLeft), Embodied.toBody(lowerRight)]
			};
			return _this3;
		}

		/**
   * Gets this bounding box's points.
   * @return {!Array}
   */


		BoundingBox.prototype.getPoints = function getPoints() {
			return this.body_.coordinates;
		};

		return BoundingBox;
	}(Embodied);

	Geo.BoundingBox = BoundingBox;

	/**
  * Class that represents a circle.
  * @extends {Embodied}
  */

	var Circle = function (_Embodied4) {
		babelHelpers.inherits(Circle, _Embodied4);

		/**
   * Constructs a {@link Circle} instance.
   * @param {*} center The circle's center coordinate.
   * @param {string} radius The circle's radius.
   * @constructor
   */

		function Circle(center, radius) {
			babelHelpers.classCallCheck(this, Circle);

			var _this4 = babelHelpers.possibleConstructorReturn(this, _Embodied4.call(this));

			_this4.body_ = {
				type: 'circle',
				coordinates: Embodied.toBody(center),
				radius: radius
			};
			return _this4;
		}

		/**
   * Gets this circle's center coordinate.
   * @return {*}
   */


		Circle.prototype.getCenter = function getCenter() {
			return this.body_.coordinates;
		};

		/**
   * Gets this circle's radius.
   * @return {string}
   */


		Circle.prototype.getRadius = function getRadius() {
			return this.body_.radius;
		};

		return Circle;
	}(Embodied);

	Geo.Circle = Circle;

	/**
  * Class that represents a polygon.
  * @extends {Embodied}
  */

	var Polygon = function (_Embodied5) {
		babelHelpers.inherits(Polygon, _Embodied5);

		/**
   * Constructs a {@link Polygon} instance.
   * @param {...*} points This polygon's points.
   * @constructor
   */

		function Polygon() {
			babelHelpers.classCallCheck(this, Polygon);

			var _this5 = babelHelpers.possibleConstructorReturn(this, _Embodied5.call(this));

			_this5.body_ = {
				type: 'polygon',
				coordinates: []
			};
			_this5.addCoordinates_.apply(_this5, arguments);
			return _this5;
		}

		/**
   * Adds the given points as coordinates for this polygon.
   * @param {...*} points
   * @protected
   */


		Polygon.prototype.addCoordinates_ = function addCoordinates_() {
			for (var _len4 = arguments.length, points = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
				points[_key4] = arguments[_key4];
			}

			this.body_.coordinates.push(points.map(function (point) {
				return Embodied.toBody(point);
			}));
		};

		/**
   * Adds the given points as a hole inside this polygon.
   * @param  {...*} points
   * @chainnable
   */


		Polygon.prototype.hole = function hole() {
			this.addCoordinates_.apply(this, arguments);
			return this;
		};

		return Polygon;
	}(Embodied);

	Geo.Polygon = Polygon;

	this.launchpad.Geo = Geo;
}).call(this);
'use strict';

(function () {
	var core = this.launchpadNamed.metal.core;
	var Embodied = this.launchpad.Embodied;

	/**
  * Class responsible for building range objects to be used by `Filter`.
  * @extends {Embodied}
  */

	var Range = function (_Embodied) {
		babelHelpers.inherits(Range, _Embodied);

		/**
   * Constructs a {@link Range} instance.
   * @param {*} from
   * @param {*} opt_to
   * @constructor
   */

		function Range(from, opt_to) {
			babelHelpers.classCallCheck(this, Range);

			var _this = babelHelpers.possibleConstructorReturn(this, _Embodied.call(this));

			if (core.isDefAndNotNull(from)) {
				_this.body_.from = from;
			}
			if (core.isDefAndNotNull(opt_to)) {
				_this.body_.to = opt_to;
			}
			return _this;
		}

		/**
   * Constructs a {@link Range} instance.
   * @param {*} from
   * @return {!Range}
   * @static
   */


		Range.from = function from(_from) {
			return new Range(_from);
		};

		/**
   * Constructs a {@link Range} instance.
   * @param {*} from
   * @param {*} to
   * @return {!Range}
   * @static
   */


		Range.range = function range(from, to) {
			return new Range(from, to);
		};

		/**
   * Constructs a {@link Range} instance.
   * @param {*} to
   * @return {!Range}
   * @static
   */


		Range.to = function to(_to) {
			return new Range(null, _to);
		};

		return Range;
	}(Embodied);

	this.launchpad.Range = Range;
}).call(this);
'use strict';

(function () {
	var core = this.launchpadNamed.metal.core;
	var Embodied = this.launchpad.Embodied;
	var FilterBody = this.launchpad.FilterBody;
	var Geo = this.launchpad.Geo;
	var Range = this.launchpad.Range;

	/**
  * Class responsible for building filters.
  * @extends {Embodied}
  */

	var Filter = function (_Embodied) {
		babelHelpers.inherits(Filter, _Embodied);

		/**
   * Constructs a {@link Filter} instance.
   * @param {string} field The name of the field to filter by.
   * @param {*} operatorOrValue If a third param is given, this should
   *   be the filter's operator (like ">="). Otherwise, this will be
   *   used as the filter's value, and the filter's operator will be "=".
   * @param {*=} opt_value The filter's value.
   * @constructor
   */

		function Filter(field, operatorOrValue, opt_value) {
			babelHelpers.classCallCheck(this, Filter);

			var _this = babelHelpers.possibleConstructorReturn(this, _Embodied.call(this));

			_this.body_ = new FilterBody(field, operatorOrValue, opt_value);
			return _this;
		}

		/**
   * Adds a filter to be composed with this filter using the given operator.
   * @param {string} operator
   * @param {!Filter|string} fieldOrFilter Either a {@link Filter} instance or the
   *   name of the field to filter by.
   * @param {*=} opt_operatorOrValue Either the field's operator or its value.
   * @param {*=} opt_value The filter's value.
   * @chainnable
   */


		Filter.prototype.add = function add(operator, fieldOrFilter, opt_operatorOrValue, opt_value) {
			var filter = fieldOrFilter ? Filter.toFilter(fieldOrFilter, opt_operatorOrValue, opt_value) : null;
			this.body_.add(operator, filter);
			return this;
		};

		/**
   * Adds filters to be composed with this filter using the given operator.
   * @param {string} operator
   * @param {...*} filters A variable amount of filters to be composed.
   * @chainnable
   */


		Filter.prototype.addMany = function addMany(operator) {
			var _body_;

			for (var _len = arguments.length, filters = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				filters[_key - 1] = arguments[_key];
			}

			(_body_ = this.body_).addMany.apply(_body_, [operator].concat(filters));
			return this;
		};

		/**
   * Adds a filter to be composed with this filter using the "and" operator.
   * @param {!Filter|string} fieldOrFilter Either a {@link Filter} instance or the
   *   name of the field to filter by.
   * @param {*=} opt_operatorOrValue Either the field's operator or its value.
   * @param {*=} opt_value The filter's value.
   * @chainnable
   */


		Filter.prototype.and = function and(fieldOrFilter, opt_operatorOrValue, opt_value) {
			return this.add('and', fieldOrFilter, opt_operatorOrValue, opt_value);
		};

		/**
   * Returns a {@link Filter} instance that uses the "any" operator.
   * @param {string} field The name of the field to filter by.
   * @param {!(Array|...*)} values A variable amount of values to be used with
   *   the "none" operator. Can be passed either as a single array or as
   *   separate params.
   * @return {!Filter}
   * @static
   */


		Filter.any = function any(field) {
			var values = Array.prototype.slice.call(arguments, 1);
			if (values.length === 1 && values[0] instanceof Array) {
				values = values[0];
			}
			return new Filter(field, 'any', values);
		};

		/**
   * Returns a {@link Filter} instance that uses the "gp" operator.
   * This is a special use case of `Filter.polygon` for bounding
   * boxes.
   * @param {string} field The field's name.
   * @param {*} boxOrUpperLeft Either a `Geo.BoundingBox` instance, or
   *   a bounding box's upper left coordinate.
   * @param {*=} opt_lowerRight A bounding box's lower right coordinate.
   * @return {!Filter}
   * @static
   */


		Filter.boundingBox = function boundingBox(field, boxOrUpperLeft, opt_lowerRight) {
			if (boxOrUpperLeft instanceof Geo.BoundingBox) {
				return Filter.polygon.apply(Filter, [field].concat(babelHelpers.toConsumableArray(boxOrUpperLeft.getPoints())));
			} else {
				return Filter.polygon(field, boxOrUpperLeft, opt_lowerRight);
			}
		};

		/**
   * Gets the json object that represents this filter.
   * @return {!Object}
   */


		Filter.prototype.body = function body() {
			return this.body_.getObject();
		};

		/**
   * Returns a {@link Filter} instance that uses the "gd" operator.
   * @param {string} field The field's name.
   * @param {*} locationOrCircle Either a `Geo.Circle` instance or a coordinate.
   * @param {Range|string=} opt_rangeOrDistance Either a `Range` instance or
   *   the distance value.
   * @return {!Filter}
   * @static
   */


		Filter.distance = function distance(field, locationOrCircle, opt_rangeOrDistance) {
			var location = locationOrCircle;
			var range = opt_rangeOrDistance;
			if (locationOrCircle instanceof Geo.Circle) {
				location = locationOrCircle.getCenter();
				range = Range.to(locationOrCircle.getRadius());
			} else if (!(opt_rangeOrDistance instanceof Range)) {
				range = Range.to(opt_rangeOrDistance);
			}
			return Filter.distanceInternal_(field, location, range);
		};

		/**
   * Returns a {@link Filter} instance that uses the "gd" operator. This
   * is just an internal helper used by `Filter.distance`.
   * @param {string} field The field's name.
   * @param {*} location A location coordinate.
   * @param {Range} range A `Range` instance.
   * @return {!Filter}
   * @protected
   * @static
   */


		Filter.distanceInternal_ = function distanceInternal_(field, location, range) {
			var value = {
				location: Embodied.toBody(location)
			};
			range = range.body();
			if (range.from) {
				value.min = range.from;
			}
			if (range.to) {
				value.max = range.to;
			}
			return Filter.field(field, 'gd', value);
		};

		/**
   * Returns a {@link Filter} instance that uses the "=" operator.
   * @param {string} field The name of the field to filter by.
   * @param {*} value The filter's value.
   * @return {!Filter}
    * @static
   */


		Filter.equal = function equal(field, value) {
			return new Filter(field, '=', value);
		};

		/**
   * Returns a {@link Filter} instance that uses the "exists" operator.
   * @param {string} field The field's name.
   * @return {!Filter}
   * @static
   */


		Filter.exists = function exists(field) {
			return Filter.field(field, 'exists', null);
		};

		/**
   * Returns a {@link Filter} instance that uses the "fuzzy" operator.
   * @param {string} fieldOrQuery If no second string argument is given, this
   *   should be the query string, in which case all fields will be matched.
   *   Otherwise, this should be the name of the field to match.
   * @param {string|number=} opt_queryOrFuzziness If this is a string, it should
   *   be the query, otherwise it should be the fuzziness value.
   * @param {number=} opt_fuzziness The fuzziness value.
   * @return {!Filter}
   * @static
   */


		Filter.fuzzy = function fuzzy(fieldOrQuery, opt_queryOrFuzziness, opt_fuzziness) {
			return Filter.fuzzyInternal_('fuzzy', fieldOrQuery, opt_queryOrFuzziness, opt_fuzziness);
		};

		/**
   * Returns a {@link Filter} instance that uses the given fuzzy operator. This
   * is an internal implementation used by the `Filter.fuzzy` method.
   * @param {string} operator The fuzzy operator.
   * @param {string} fieldOrQuery If no second string argument is given, this
   *   should be the query string, in which case all fields will be matched.
   *   Otherwise, this should be the name of the field to match.
   * @param {string|number=} opt_queryOrFuzziness If this is a string, it should
   *   be the query, otherwise it should be the fuzziness value.
   * @param {number=} opt_fuzziness The fuzziness value.
   * @return {!Filter}
   * @protected
   * @static
   */


		Filter.fuzzyInternal_ = function fuzzyInternal_(operator, fieldOrQuery, opt_queryOrFuzziness, opt_fuzziness) {
			var arg2IsString = core.isString(opt_queryOrFuzziness);

			var value = {
				query: arg2IsString ? opt_queryOrFuzziness : fieldOrQuery
			};
			var fuzziness = arg2IsString ? opt_fuzziness : opt_queryOrFuzziness;
			if (fuzziness) {
				value.fuzziness = fuzziness;
			}

			var field = arg2IsString ? fieldOrQuery : Filter.ALL;
			return Filter.field(field, operator, value);
		};

		/**
   * Returns a {@link Filter} instance that uses the ">" operator.
   * @param {string} field The name of the field to filter by.
   * @param {*} value The filter's value.
   * @return {!Filter}
    * @static
   */


		Filter.gt = function gt(field, value) {
			return new Filter(field, '>', value);
		};

		/**
   * Returns a {@link Filter} instance that uses the ">=" operator.
   * @param {string} field The name of the field to filter by.
   * @param {*} value The filter's value.
   * @return {!Filter}
    * @static
   */


		Filter.gte = function gte(field, value) {
			return new Filter(field, '>=', value);
		};

		/**
   * Returns a {@link Filter} instance that uses the "match" operator.
   * @param {string} fieldOrQuery If no second string argument is given, this
   *   should be the query string, in which case all fields will be matched.
   *   Otherwise, this should be the name of the field to match.
   * @param {string=} opt_query The query string.
   * @return {!Filter}
   * @static
   */


		Filter.match = function match(fieldOrQuery, opt_query) {
			var field = core.isString(opt_query) ? fieldOrQuery : Filter.ALL;
			var query = core.isString(opt_query) ? opt_query : fieldOrQuery;
			return Filter.field(field, 'match', query);
		};

		/**
   * Returns a {@link Filter} instance that uses the "missing" operator.
   * @param {string} field The field's name.
   * @return {!Filter}
   * @static
   */


		Filter.missing = function missing(field) {
			return Filter.field(field, 'missing', null);
		};

		/**
   * Returns a {@link Filter} instance that uses the "phrase" operator.
   * @param {string} fieldOrQuery If no second string argument is given, this
   *   should be the query string, in which case all fields will be matched.
   *   Otherwise, this should be the name of the field to match.
   * @param {string=} opt_query The query string.
   * @return {!Filter}
   * @static
   */


		Filter.phrase = function phrase(fieldOrQuery, opt_query) {
			var field = core.isString(opt_query) ? fieldOrQuery : Filter.ALL;
			var query = core.isString(opt_query) ? opt_query : fieldOrQuery;
			return Filter.field(field, 'phrase', query);
		};

		/**
   * Returns a {@link Filter} instance that uses the "gp" operator.
   * @param {string} field The name of the field.
   * @param {...!Object} points Objects representing points in the polygon.
   * @return {!Filter}
   * @static
   */


		Filter.polygon = function polygon(field) {
			for (var _len2 = arguments.length, points = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
				points[_key2 - 1] = arguments[_key2];
			}

			points = points.map(function (point) {
				return Embodied.toBody(point);
			});
			return Filter.field(field, 'gp', points);
		};

		/**
   * Returns a {@link Filter} instance that uses the "prefix" operator.
   * @param {string} fieldOrQuery If no second argument is given, this should
   *   be the query string, in which case all fields will be matched. Otherwise,
   *   this should be the name of the field to match.
   * @param {string=} opt_query The query string.
   * @return {!Filter}
   * @static
   */


		Filter.prefix = function prefix(fieldOrQuery, opt_query) {
			var field = opt_query ? fieldOrQuery : Filter.ALL;
			var query = opt_query ? opt_query : fieldOrQuery;
			return Filter.field(field, 'prefix', query);
		};

		/**
   * Returns a {@link Filter} instance that uses the "range" operator.
   * @param {string} field The field's name.
   * @param {*} rangeOrMin Either a `Range` instance or a the range's min value.
   * @param {*=} opt_max The range's max value.
   * @return {!Filter}
   * @static
   */


		Filter.range = function range(field, rangeOrMin, opt_max) {
			var range = rangeOrMin;
			if (!(range instanceof Range)) {
				range = Range.range(rangeOrMin, opt_max);
			}
			return Filter.field(field, 'range', range);
		};

		/**
   * Returns a {@link Filter} instance that uses the "~" operator.
   * @param {string} field The name of the field to filter by.
   * @param {*} value The filter's value.
   * @return {!Filter}
    * @static
   */


		Filter.regex = function regex(field, value) {
			return new Filter(field, '~', value);
		};

		/**
   * Returns a {@link Filter} instance that uses the "gs" operator.
   * @param {string} field The field's name.
   * @param {...!Object} shapes Objects representing shapes.
   * @return {!Filter}
   * @static
   */


		Filter.shape = function shape(field) {
			for (var _len3 = arguments.length, shapes = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
				shapes[_key3 - 1] = arguments[_key3];
			}

			shapes = shapes.map(function (shape) {
				return Embodied.toBody(shape);
			});
			var value = {
				type: 'geometrycollection',
				geometries: shapes
			};
			return Filter.field(field, 'gs', value);
		};

		/**
   * Returns a {@link Filter} instance that uses the "similar" operator.
   * @param {string} fieldOrQuery If no second string argument is given, this
   *   should be the query string, in which case all fields will be matched.
   *   Otherwise, this should be the name of the field to match.
   * @param {?string} query The query string.
   * @return {!Filter}
   * @static
   */


		Filter.similar = function similar(fieldOrQuery, query) {
			var field = core.isString(query) ? fieldOrQuery : Filter.ALL;
			var value = {
				query: core.isString(query) ? query : fieldOrQuery
			};
			return Filter.field(field, 'similar', value);
		};

		/**
   * Returns a {@link Filter} instance that uses the "<" operator.
   * @param {string} field The name of the field to filter by.
   * @param {*} value The filter's value.
   * @return {!Filter}
    * @static
   */


		Filter.lt = function lt(field, value) {
			return new Filter(field, '<', value);
		};

		/**
   * Returns a {@link Filter} instance that uses the "<=" operator.
   * @param {string} field The name of the field to filter by.
   * @param {*} value The filter's value.
   * @return {!Filter}
    * @static
   */


		Filter.lte = function lte(field, value) {
			return new Filter(field, '<=', value);
		};

		/**
   * Returns a {@link Filter} instance that uses the "none" operator.
   * @param {string} field The name of the field to filter by.
   * @param {!(Array|...*)} value A variable amount of values to be used with
   *   the "none" operator. Can be passed either as a single array or as
   *   separate params.
   * @return {!Filter}
   * @static
   */


		Filter.none = function none(field) {
			var values = Array.prototype.slice.call(arguments, 1);
			if (values.length === 1 && values[0] instanceof Array) {
				values = values[0];
			}
			return new Filter(field, 'none', values);
		};

		/**
   * Returns a {@link Filter} instance that uses the "!=" operator.
   * @param {string} field The name of the field to filter by.
   * @param {*} value The filter's value.
   * @return {!Filter}
   * @static
   */


		Filter.notEqual = function notEqual(field, value) {
			return new Filter(field, '!=', value);
		};

		/**
   * Returns a {@link Filter} instance that uses the "not" operator.
   * @param {!Filter|string} fieldOrFilter Either a {@link Filter} instance or the
   *   name of the field to filter by.
   * @param {*=} opt_operatorOrValue Either the field's operator or its value.
   * @param {*=} opt_value The filter's value.
   * @return {!Filter}
   * @static
   */


		Filter.not = function not(fieldOrFilter, opt_operatorOrValue, opt_value) {
			return Filter.toFilter(fieldOrFilter, opt_operatorOrValue, opt_value).add('not');
		};

		/**
   * Returns a {@link Filter} instance.
   * @param {string} field The name of the field to filter by.
   * @param {*} operatorOrValue If a third param is given, this should
   *   be the filter's operator (like ">="). Otherwise, this will be
   *   used as the filter's value, and the filter's operator will be "=".
   * @param {*=} opt_value The filter's value.
   * @return {!Filter}
    * @static
   */


		Filter.field = function field(_field, operatorOrValue, opt_value) {
			return new Filter(_field, operatorOrValue, opt_value);
		};

		/**
   * Adds a filter to be composed with this filter using the "or" operator.
   * @param {!Filter|string} fieldOrFilter Either a {@link Filter} instance or the
   *   name of the field to filter by.
   * @param {*=} opt_operatorOrValue Either the field's operator or its value.
   * @param {*=} opt_value The filter's value.
   * @chainnable
   */


		Filter.prototype.or = function or(fieldOrFilter, opt_operatorOrValue, opt_value) {
			return this.add('or', fieldOrFilter, opt_operatorOrValue, opt_value);
		};

		/**
   * Converts the given arguments into a {@link Filter} instance.
   * @param {!Filter|string} fieldOrFilter Either a {@link Filter} instance or the
   *   name of the field to filter by.
   * @param {*=} opt_operatorOrValue Either the field's operator or its value.
   * @param {*=} opt_value The filter's value.
   * @return {!Filter}
   */


		Filter.toFilter = function toFilter(fieldOrFilter, opt_operatorOrValue, opt_value) {
			var filter = fieldOrFilter;
			if (!(filter instanceof Filter)) {
				filter = Filter.field(fieldOrFilter, opt_operatorOrValue, opt_value);
			}
			return filter;
		};

		return Filter;
	}(Embodied);

	/**
  * String constant that represents all fields.
  * @type {string}
  * @static
  */


	Filter.ALL = '*';

	this.launchpad.Filter = Filter;
}).call(this);
'use strict';

(function () {
	var Embodied = this.launchpad.Embodied;
	var Range = this.launchpad.Range;

	/**
  * Class that represents a search aggregation.
  */

	var Aggregation = function () {
		/**
   * Constructs an {@link Aggregation} instance.
   * @param {string} field The aggregation field.
   * @param {string} operator The aggregation operator.
   * @param {*=} opt_value The aggregation value.
   * @constructor
   */

		function Aggregation(field, operator, opt_value) {
			babelHelpers.classCallCheck(this, Aggregation);

			this.field_ = field;
			this.operator_ = operator;
			this.value_ = opt_value;
		}

		/**
   * Creates an {@link Aggregation} instance with the "avg" operator.
   * @param {string} field The aggregation field.
   * @return {!Aggregation}
   * @static
   */


		Aggregation.avg = function avg(field) {
			return Aggregation.field(field, 'avg');
		};

		/**
   * Creates an {@link Aggregation} instance with the "count" operator.
   * @param {string} field The aggregation field.
   * @return {!Aggregation}
   * @static
   */


		Aggregation.count = function count(field) {
			return Aggregation.field(field, 'count');
		};

		/**
   * Creates an {@link DistanceAggregation} instance with the "geoDistance" operator.
   * @param {string} field The aggregation field.
   * @param {*} location The aggregation location.
   * @param {...!Range} ranges The aggregation ranges.
   * @return {!DistanceAggregation}
   * @static
   */


		Aggregation.distance = function distance(field, location) {
			for (var _len = arguments.length, ranges = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
				ranges[_key - 2] = arguments[_key];
			}

			return new (Function.prototype.bind.apply(Aggregation.DistanceAggregation, [null].concat([field, location], ranges)))();
		};

		/**
   * Creates an {@link Aggregation} instance with the "extendedStats" operator.
   * @param {string} field The aggregation field.
   * @return {!Aggregation}
   * @static
   */


		Aggregation.extendedStats = function extendedStats(field) {
			return Aggregation.field(field, 'extendedStats');
		};

		/**
   * Gets this aggregation's field.
   * @return {string}
   */


		Aggregation.prototype.getField = function getField() {
			return this.field_;
		};

		/**
   * Gets this aggregation's operator.
   * @return {string}
   */


		Aggregation.prototype.getOperator = function getOperator() {
			return this.operator_;
		};

		/**
   * Gets this aggregation's value.
   * @return {*}
   */


		Aggregation.prototype.getValue = function getValue() {
			return this.value_;
		};

		/**
   * Creates an {@link Aggregation} instance with the "histogram" operator.
   * @param {string} field The aggregation field.
   * @param {number} interval The histogram's interval.
   * @return {!Aggregation}
   * @static
   */


		Aggregation.histogram = function histogram(field, interval) {
			return new Aggregation(field, 'histogram', interval);
		};

		/**
   * Creates an {@link Aggregation} instance with the "max" operator.
   * @param {string} field The aggregation field.
   * @return {!Aggregation}
   * @static
   */


		Aggregation.max = function max(field) {
			return Aggregation.field(field, 'max');
		};

		/**
   * Creates an {@link Aggregation} instance with the "min" operator.
   * @param {string} field The aggregation field.
   * @return {!Aggregation}
   * @static
   */


		Aggregation.min = function min(field) {
			return Aggregation.field(field, 'min');
		};

		/**
   * Creates an {@link Aggregation} instance with the "missing" operator.
   * @param {string} field The aggregation field.
   * @return {!Aggregation}
   * @static
   */


		Aggregation.missing = function missing(field) {
			return Aggregation.field(field, 'missing');
		};

		/**
   * Creates a new {@link Aggregation} instance.
   * @param {string} field The aggregation field.
   * @param {string} operator The aggregation operator.
   * @return {!Aggregation}
   * @static
   */


		Aggregation.field = function field(_field, operator) {
			return new Aggregation(_field, operator);
		};

		/**
   * Creates an {@link RangeAggregation} instance with the "range" operator.
   * @param {string} field The aggregation field.
   * @param {...!Range} ranges The aggregation ranges.
   * @return {!RangeAggregation}
   * @static
   */


		Aggregation.range = function range(field) {
			for (var _len2 = arguments.length, ranges = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
				ranges[_key2 - 1] = arguments[_key2];
			}

			return new (Function.prototype.bind.apply(Aggregation.RangeAggregation, [null].concat([field], ranges)))();
		};

		/**
   * Creates an {@link Aggregation} instance with the "stats" operator.
   * @param {string} field The aggregation field.
   * @return {!Aggregation}
   * @static
   */


		Aggregation.stats = function stats(field) {
			return Aggregation.field(field, 'stats');
		};

		/**
   * Creates an {@link Aggregation} instance with the "sum" operator.
   * @param {string} field The aggregation field.
   * @return {!Aggregation}
   * @static
   */


		Aggregation.sum = function sum(field) {
			return Aggregation.field(field, 'sum');
		};

		/**
   * Creates an {@link Aggregation} instance with the "terms" operator.
   * @param {string} field The aggregation field.
   * @return {!Aggregation}
   * @static
   */


		Aggregation.terms = function terms(field) {
			return Aggregation.field(field, 'terms');
		};

		return Aggregation;
	}();

	/**
  * Class that represents a distance aggregation.
  * @extends {Aggregation}
  */


	var DistanceAggregation = function (_Aggregation) {
		babelHelpers.inherits(DistanceAggregation, _Aggregation);

		/**
   * Constructs an {@link DistanceAggregation} instance.
   * @param {string} field The aggregation field.
   * @param {*} location The aggregation location.
   * @param {...!Range} ranges The aggregation ranges.
   * @constructor
   */

		function DistanceAggregation(field, location) {
			babelHelpers.classCallCheck(this, DistanceAggregation);

			var _this = babelHelpers.possibleConstructorReturn(this, _Aggregation.call(this, field, 'geoDistance', {}));

			_this.value_.location = Embodied.toBody(location);

			for (var _len3 = arguments.length, ranges = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
				ranges[_key3 - 2] = arguments[_key3];
			}

			_this.value_.ranges = ranges.map(function (range) {
				return range.body();
			});
			return _this;
		}

		/**
   * Adds a range to this aggregation.
   * @param {*} rangeOrFrom
   * @param {*=} opt_to
   * @chainnable
   */


		DistanceAggregation.prototype.range = function range(rangeOrFrom, opt_to) {
			var range = rangeOrFrom;
			if (!(range instanceof Range)) {
				range = Range.range(rangeOrFrom, opt_to);
			}
			this.value_.ranges.push(range.body());
			return this;
		};

		/**
   * Sets this aggregation's unit.
   * @param {string} unit
   * @chainnable
   */


		DistanceAggregation.prototype.unit = function unit(_unit) {
			this.value_.unit = _unit;
			return this;
		};

		return DistanceAggregation;
	}(Aggregation);

	Aggregation.DistanceAggregation = DistanceAggregation;

	/**
  * Class that represents a range aggregation.
  * @extends {Aggregation}
  */

	var RangeAggregation = function (_Aggregation2) {
		babelHelpers.inherits(RangeAggregation, _Aggregation2);

		/**
   * Constructs an {@link RangeAggregation} instance.
   * @param {string} field The aggregation field.
   * @param {...!Range} ranges The aggregation ranges.
   * @constructor
   */

		function RangeAggregation(field) {
			babelHelpers.classCallCheck(this, RangeAggregation);

			var _this2 = babelHelpers.possibleConstructorReturn(this, _Aggregation2.call(this, field, 'range'));

			for (var _len4 = arguments.length, ranges = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
				ranges[_key4 - 1] = arguments[_key4];
			}

			_this2.value_ = ranges.map(function (range) {
				return range.body();
			});
			return _this2;
		}

		/**
   * Adds a range to this aggregation.
   * @param {*} rangeOrFrom
   * @param {*=} opt_to
   * @chainnable
   */


		RangeAggregation.prototype.range = function range(rangeOrFrom, opt_to) {
			var range = rangeOrFrom;
			if (!(range instanceof Range)) {
				range = Range.range(rangeOrFrom, opt_to);
			}
			this.value_.push(range.body());
			return this;
		};

		return RangeAggregation;
	}(Aggregation);

	Aggregation.RangeAggregation = RangeAggregation;

	this.launchpad.Aggregation = Aggregation;
}).call(this);
'use strict';

(function () {
	var core = this.launchpadNamed.metal.core;
	var Embodied = this.launchpad.Embodied;
	var Filter = this.launchpad.Filter;
	var Aggregation = this.launchpad.Aggregation;

	/**
  * Class responsible for building queries.
  * @extends {Embodied}
  */

	var Query = function (_Embodied) {
		babelHelpers.inherits(Query, _Embodied);

		function Query() {
			babelHelpers.classCallCheck(this, Query);
			return babelHelpers.possibleConstructorReturn(this, _Embodied.apply(this, arguments));
		}

		/**
   * Adds an aggregation to this {@link Query} instance.
   * @param {string} name The aggregation name.
   * @param {!Aggregation|string} aggregationOrField Either an
   *   {@link Aggregation} instance or the name of the aggregation field.
   * @param {string=} opt_operator The aggregation operator.
   * @return {!Query}
   * @static
   */

		Query.aggregate = function aggregate(name, aggregationOrField, opt_operator) {
			return new Query().aggregate(name, aggregationOrField, opt_operator);
		};

		/**
   * Sets this query's type to "count".
   * @return {!Query}
   * @static
   */


		Query.count = function count() {
			return new Query().type('count');
		};

		/**
   * Sets this query's type to "fetch".
   * @return {!Query}
   * @static
   */


		Query.fetch = function fetch() {
			return new Query().type('fetch');
		};

		/**
   * Adds a filter to this Query.
   * @param {!Filter|string} fieldOrFilter Either a {@link Filter} or the
   *   name of the field to filter by.
   * @param {*=} opt_operatorOrValue Either the field's operator or its value.
   * @param {*=} opt_value The filter's value.
   * @return {!Query}
   * @static
   */


		Query.filter = function filter(fieldOrFilter, opt_operatorOrValue, opt_value) {
			return new Query().filter(fieldOrFilter, opt_operatorOrValue, opt_value);
		};

		/**
   * Sets the query offset.
   * @param {number} offset The index of the first entry that should be returned
   *   by this query.
   * @return {!Query}
   * @static
   */


		Query.offset = function offset(_offset) {
			return new Query().offset(_offset);
		};

		/**
   * Adds a highlight entry to this {@link Query} instance.
   * @param {string} field The field's name.
   * @return {!Query}
   * @static
   */


		Query.highlight = function highlight(field) {
			return new Query().highlight(field);
		};

		/**
   * Sets the query limit.
   * @param {number} limit The max amount of entries that this query should return.
   * @return {!Query}
   * @static
   */


		Query.limit = function limit(_limit) {
			return new Query().limit(_limit);
		};

		/**
   * Adds a search to this {@link Query} instance.
   * @param {!Filter|string} filterOrTextOrField If no other arguments
   *   are passed to this function, this should be either a {@link Filter}
   *   instance or a text to be used in a match filter. In both cases
   *   the filter will be applied to all fields. Another option is to
   *   pass this as a field name instead, together with other arguments
   *   so the filter can be created.
   * @param {string=} opt_textOrOperator Either a text to be used in a
   *   match filter, or the operator that should be used.
   * @param {*=} opt_value The value to be used by the filter. Should
   *   only be passed if an operator was passed as the second argument.
   * @return {!Query}
   * @static
   */


		Query.search = function search(filterOrTextOrField, opt_textOrOperator, opt_value) {
			return new Query().search(filterOrTextOrField, opt_textOrOperator, opt_value);
		};

		/**
   * Adds a sort entry to this query, specifying the field this query should be
   * sorted by and, optionally, the sort direction.
   * @param {string} field The field that the query should be sorted by.
   * @param {string=} opt_direction The direction the sort operation should use.
   *   If none is given, "asc" is used by default.
   * @return {!Query}
   * @static
   */


		Query.sort = function sort(field, opt_direction) {
			return new Query().sort(field, opt_direction);
		};

		/**
   * Sets the query type.
   * @param {string} type The query's type. For example: "count", "fetch".
   * @return {!Query}
   * @static
   */


		Query.type = function type(_type) {
			return new Query().type(_type);
		};

		/**
   * Adds an aggregation to this {@link Query} instance.
   * @param {string} name The aggregation name.
   * @param {!Aggregation|string} aggregationOrField Either an
   *   {@link Aggregation} instance or the name of the aggregation field.
   * @param {string=} opt_operator The aggregation operator.
   * @chainnable
   */


		Query.prototype.aggregate = function aggregate(name, aggregationOrField, opt_operator) {
			var aggregation = aggregationOrField;
			if (!(aggregation instanceof Aggregation)) {
				aggregation = Aggregation.field(aggregationOrField, opt_operator);
			}

			var field = aggregation.getField();
			var value = {};
			value[field] = {
				name: name,
				operator: aggregation.getOperator()
			};
			if (core.isDefAndNotNull(aggregation.getValue())) {
				value[field].value = aggregation.getValue();
			}

			if (!this.body_.aggregation) {
				this.body_.aggregation = [];
			}
			this.body_.aggregation.push(value);
			return this;
		};

		/**
   * Sets this query's type to "count".
   * @chainnable
   */


		Query.prototype.count = function count() {
			return this.type('count');
		};

		/**
   * Sets this query's type to "fetch".
   * @chainnable
   */


		Query.prototype.fetch = function fetch() {
			return this.type('fetch');
		};

		/**
   * Adds a filter to this Query.
   * @param {!Filter|string} fieldOrFilter Either a {@link Filter} or the
   *   name of the field to filter by.
   * @param {*=} opt_operatorOrValue Either the field's operator or its value.
   * @param {*=} opt_value The filter's value.
   * @chainnable
   */


		Query.prototype.filter = function filter(fieldOrFilter, opt_operatorOrValue, opt_value) {
			var filter = Filter.toFilter(fieldOrFilter, opt_operatorOrValue, opt_value);
			if (!this.body_.filter) {
				this.body_.filter = [];
			}
			this.body_.filter.push(filter.body());
			return this;
		};

		/**
   * Sets the query offset.
   * @param {number} offset The index of the first entry that should be returned
   *   by this query.
   * @chainnable
   */


		Query.prototype.offset = function offset(_offset2) {
			this.body_.offset = _offset2;
			return this;
		};

		/**
   * Adds a highlight entry to this {@link Query} instance.
   * @param {string} field The field's name.
   * @chainnable
   */


		Query.prototype.highlight = function highlight(field) {
			if (!this.body_.highlight) {
				this.body_.highlight = [];
			}

			this.body_.highlight.push(field);
			return this;
		};

		/**
   * Sets the query limit.
   * @param {number} limit The max amount of entries that this query should return.
   * @chainnable
   */


		Query.prototype.limit = function limit(_limit2) {
			this.body_.limit = _limit2;
			return this;
		};

		/**
   * Adds a search to this {@link Query} instance.
   * @param {!Filter|string} filterOrTextOrField If no other arguments
   *   are passed to this function, this should be either a {@link Filter}
   *   instance or a text to be used in a match filter. In both cases
   *   the filter will be applied to all fields. Another option is to
   *   pass this as a field name instead, together with other arguments
   *   so the filter can be created.
   * @param {string=} opt_textOrOperator Either a text to be used in a
   *   match filter, or the operator that should be used.
   * @param {*=} opt_value The value to be used by the filter. Should
   *   only be passed if an operator was passed as the second argument.
   * @chainnable
   */


		Query.prototype.search = function search(filterOrTextOrField, opt_textOrOperator, opt_value) {
			var filter = filterOrTextOrField;
			if (opt_value) {
				filter = Filter.field(filterOrTextOrField, opt_textOrOperator, opt_value);
			} else if (opt_textOrOperator) {
				filter = Filter.match(filterOrTextOrField, opt_textOrOperator);
			} else if (!(filter instanceof Filter)) {
				filter = Filter.match(filterOrTextOrField);
			}
			if (!this.body_.search) {
				this.body_.search = [];
			}
			this.body_.search.push(filter.body());
			return this;
		};

		/**
   * Adds a sort entry to this query, specifying the field this query should be
   * sorted by and, optionally, the sort direction.
   * @param {string} field The field that the query should be sorted by.
   * @param {string=} opt_direction The direction the sort operation should use.
   *   If none is given, "asc" is used by default.
   * @chainnable
   */


		Query.prototype.sort = function sort(field, opt_direction) {
			if (!this.body_.sort) {
				this.body_.sort = [];
			}
			var sortEntry = {};
			sortEntry[field] = opt_direction || 'asc';
			this.body_.sort.push(sortEntry);
			return this;
		};

		/**
   * Sets the query type.
   * @param {string} type The query's type. For example: "count", "fetch".
   * @chainnable
   */


		Query.prototype.type = function type(_type2) {
			this.body_.type = _type2;
			return this;
		};

		return Query;
	}(Embodied);

	this.launchpad.Query = Query;
}).call(this);
'use strict';

/**
 * Parses the given uri string into an object.
 * @param {*=} opt_uri Optional string URI to parse
 */

(function () {
	function parseFromAnchor(opt_uri) {
		var link = document.createElement('a');
		link.href = opt_uri;
		return {
			hash: link.hash,
			hostname: link.hostname,
			password: link.password,
			pathname: link.pathname[0] === '/' ? link.pathname : '/' + link.pathname,
			port: link.port,
			protocol: link.protocol,
			search: link.search,
			username: link.username
		};
	}

	this.launchpad.parseFromAnchor = parseFromAnchor;
}).call(this);
'use strict';

(function () {
	var core = this.launchpadNamed.metal.core;
	var parseFromAnchor = this.launchpad.parseFromAnchor;

	/**
  * Parses the given uri string into an object. The URL function will be used
  * when present, otherwise we'll fall back to the anchor node element.
  * @param {*=} opt_uri Optional string URI to parse
  */

	function parse(opt_uri) {
		if (core.isFunction(URL) && URL.length) {
			return new URL(opt_uri);
		} else {
			return parseFromAnchor(opt_uri);
		}
	}

	this.launchpad.parse = parse;
}).call(this);
'use strict';

(function () {
	var core = this.launchpadNamed.metal.core;
	var string = this.launchpadNamed.metal.string;
	var parse = this.launchpad.parse;
	var MultiMap = this.launchpad.MultiMap;


	var parseFn_ = parse;

	var Uri = function () {

		/**
   * This class contains setters and getters for the parts of the URI.
   * The following figure displays an example URIs and their component parts.
   *
   *                                  path
   *	                             ┌───┴────┐
   *	  abc://example.com:123/path/data?key=value#fragid1
   *	  └┬┘   └────┬────┘ └┬┘           └───┬───┘ └──┬──┘
   * protocol  hostname  port            search    hash
   *          └──────┬───────┘
   *                host
   *
   * @param {*=} opt_uri Optional string URI to parse
   * @constructor
   */

		function Uri() {
			var opt_uri = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
			babelHelpers.classCallCheck(this, Uri);

			this.url = Uri.parse(this.maybeAddProtocolAndHostname_(opt_uri));
		}

		/**
   * Adds parameters to uri from a <code>MultiMap</code> as source.
   * @param {MultiMap} multimap The <code>MultiMap</code> containing the
   *   parameters.
   * @protected
   * @chainable
   */


		Uri.prototype.addParametersFromMultiMap = function addParametersFromMultiMap(multimap) {
			var _this = this;

			multimap.names().forEach(function (name) {
				multimap.getAll(name).forEach(function (value) {
					_this.addParameterValue(name, value);
				});
			});
			return this;
		};

		/**
   * Adds the value of the named query parameters.
   * @param {string} key The parameter to set.
   * @param {*} value The new value. Will be explicitly casted to String.
   * @chainable
   */


		Uri.prototype.addParameterValue = function addParameterValue(name, value) {
			this.ensureQueryInitialized_();
			if (core.isDef(value)) {
				value = String(value);
			}
			this.query.add(name, value);
			return this;
		};

		/**
   * Adds the values of the named query parameter.
   * @param {string} key The parameter to set.
   * @param {*} value The new value.
   * @chainable
   */


		Uri.prototype.addParameterValues = function addParameterValues(name, values) {
			var _this2 = this;

			values.forEach(function (value) {
				return _this2.addParameterValue(name, value);
			});
			return this;
		};

		/**
   * Ensures query internal map is initialized and synced with initial value
   * extracted from URI search part.
   * @protected
   */


		Uri.prototype.ensureQueryInitialized_ = function ensureQueryInitialized_() {
			var _this3 = this;

			if (this.query) {
				return;
			}
			this.query = new MultiMap();
			var search = this.url.search;
			if (search) {
				search.substring(1).split('&').forEach(function (param) {
					var _param$split = param.split('=');

					var _param$split2 = babelHelpers.slicedToArray(_param$split, 2);

					var key = _param$split2[0];
					var value = _param$split2[1];

					if (core.isDef(value)) {
						value = Uri.urlDecode(value);
					}
					_this3.addParameterValue(key, value);
				});
			}
		};

		/**
   * Gets the hash part of uri.
   * @return {string}
   */


		Uri.prototype.getHash = function getHash() {
			return this.url.hash || '';
		};

		/**
   * Gets the host part of uri. E.g. <code>[hostname]:[port]</code>.
   * @return {string}
   */


		Uri.prototype.getHost = function getHost() {
			var host = this.getHostname();
			if (host) {
				var port = this.getPort();
				if (port && port !== '80') {
					host += ':' + port;
				}
			}
			return host;
		};

		/**
   * Gets the hostname part of uri without protocol and port.
   * @return {string}
   */


		Uri.prototype.getHostname = function getHostname() {
			var hostname = this.url.hostname;
			if (hostname === Uri.HOSTNAME_PLACEHOLDER) {
				return '';
			}
			return hostname;
		};

		/**
   * Gets the origin part of uri. E.g. <code>http://[hostname]:[port]</code>.
   * @return {string}
   */


		Uri.prototype.getOrigin = function getOrigin() {
			var host = this.getHost();
			if (host) {
				return this.getProtocol() + '//' + host;
			}
			return '';
		};

		/**
   * Returns the first value for a given parameter or undefined if the given
   * parameter name does not appear in the query string.
   * @param {string} paramName Unescaped parameter name.
   * @return {string|undefined} The first value for a given parameter or
   *   undefined if the given parameter name does not appear in the query
   *   string.
   */


		Uri.prototype.getParameterValue = function getParameterValue(name) {
			this.ensureQueryInitialized_();
			return this.query.get(name);
		};

		/**
   * Returns the value<b>s</b> for a given parameter as a list of decoded
   * query parameter values.
   * @param {string} name The parameter to get values for.
   * @return {!Array<?>} The values for a given parameter as a list of decoded
   *   query parameter values.
   */


		Uri.prototype.getParameterValues = function getParameterValues(name) {
			this.ensureQueryInitialized_();
			return this.query.getAll(name);
		};

		/**
   * Returns the name<b>s</b> of the parameters.
   * @return {!Array<string>} The names for the parameters as a list of
   *   strings.
   */


		Uri.prototype.getParameterNames = function getParameterNames() {
			this.ensureQueryInitialized_();
			return this.query.names();
		};

		/**
   * Gets the function currently being used to parse URIs.
   * @return {!function()}
   */


		Uri.getParseFn = function getParseFn() {
			return parseFn_;
		};

		/**
   * Gets the pathname part of uri.
   * @return {string}
   */


		Uri.prototype.getPathname = function getPathname() {
			return this.url.pathname;
		};

		/**
   * Gets the port number part of uri as string.
   * @return {string}
   */


		Uri.prototype.getPort = function getPort() {
			return this.url.port;
		};

		/**
   * Gets the protocol part of uri. E.g. <code>http:</code>.
   * @return {string}
   */


		Uri.prototype.getProtocol = function getProtocol() {
			return this.url.protocol;
		};

		/**
   * Gets the search part of uri. Search value is retrieved from query
   * parameters.
   * @return {string}
   */


		Uri.prototype.getSearch = function getSearch() {
			var _this4 = this;

			var search = '';
			var querystring = '';
			this.getParameterNames().forEach(function (name) {
				_this4.getParameterValues(name).forEach(function (value) {
					querystring += name;
					if (core.isDef(value)) {
						querystring += '=' + encodeURIComponent(value);
					}
					querystring += '&';
				});
			});
			querystring = querystring.slice(0, -1);
			if (querystring) {
				search += '?' + querystring;
			}
			return search;
		};

		/**
   * Checks if uri contains the parameter.
   * @param {string} name
   * @return {boolean}
   */


		Uri.prototype.hasParameter = function hasParameter(name) {
			this.ensureQueryInitialized_();
			return this.query.contains(name);
		};

		/**
   * Makes this URL unique by adding a random param to it. Useful for avoiding
   * cache.
   */


		Uri.prototype.makeUnique = function makeUnique() {
			this.setParameterValue(Uri.RANDOM_PARAM, string.getRandomString());
			return this;
		};

		/**
   * Maybe adds protocol and a hostname placeholder on a parial URI if needed.
   * Relevent for compatibility with <code>URL</code> native object.
   * @param {string=} opt_uri
   * @return {string} URI with protocol and hostname placeholder.
   */


		Uri.prototype.maybeAddProtocolAndHostname_ = function maybeAddProtocolAndHostname_(opt_uri) {
			var url = opt_uri;
			if (opt_uri.indexOf('://') === -1 && opt_uri.indexOf('javascript:') !== 0) {
				// jshint ignore:line

				url = Uri.DEFAULT_PROTOCOL;
				if (opt_uri[0] !== '/' || opt_uri[1] !== '/') {
					url += '//';
				}

				switch (opt_uri.charAt(0)) {
					case '.':
					case '?':
					case '#':
						url += Uri.HOSTNAME_PLACEHOLDER;
						url += '/';
						url += opt_uri;
						break;
					case '':
					case '/':
						if (opt_uri[1] !== '/') {
							url += Uri.HOSTNAME_PLACEHOLDER;
						}
						url += opt_uri;
						break;
					default:
						url += opt_uri;
				}
			}
			return url;
		};

		/**
   * Normalizes the parsed object to be in the expected standard.
   * @param {!Object}
   */


		Uri.normalizeObject = function normalizeObject(parsed) {
			var length = parsed.pathname ? parsed.pathname.length : 0;
			if (length > 1 && parsed.pathname[length - 1] === '/') {
				parsed.pathname = parsed.pathname.substr(0, length - 1);
			}
			return parsed;
		};

		/**
   * Parses the given uri string into an object.
   * @param {*=} opt_uri Optional string URI to parse
   */


		Uri.parse = function parse(opt_uri) {
			return Uri.normalizeObject(parseFn_(opt_uri));
		};

		/**
   * Removes the named query parameter.
   * @param {string} name The parameter to remove.
   * @chainable
   */


		Uri.prototype.removeParameter = function removeParameter(name) {
			this.ensureQueryInitialized_();
			this.query.remove(name);
			return this;
		};

		/**
   * Removes uniqueness parameter of the uri.
   * @chainable
   */


		Uri.prototype.removeUnique = function removeUnique() {
			this.removeParameter(Uri.RANDOM_PARAM);
			return this;
		};

		/**
   * Sets the hash.
   * @param {string} hash
   * @chainable
   */


		Uri.prototype.setHash = function setHash(hash) {
			this.url.hash = hash;
			return this;
		};

		/**
   * Sets the hostname.
   * @param {string} hostname
   * @chainable
   */


		Uri.prototype.setHostname = function setHostname(hostname) {
			this.url.hostname = hostname;
			return this;
		};

		/**
   * Sets the value of the named query parameters, clearing previous values
   * for that key.
   * @param {string} key The parameter to set.
   * @param {*} value The new value.
   * @chainable
   */


		Uri.prototype.setParameterValue = function setParameterValue(name, value) {
			this.removeParameter(name);
			this.addParameterValue(name, value);
			return this;
		};

		/**
   * Sets the values of the named query parameters, clearing previous values
   * for that key.
   * @param {string} key The parameter to set.
   * @param {*} value The new value.
   * @chainable
   */


		Uri.prototype.setParameterValues = function setParameterValues(name, values) {
			var _this5 = this;

			this.removeParameter(name);
			values.forEach(function (value) {
				return _this5.addParameterValue(name, value);
			});
			return this;
		};

		/**
   * Sets the pathname.
   * @param {string} pathname
   * @chainable
   */


		Uri.prototype.setPathname = function setPathname(pathname) {
			this.url.pathname = pathname;
			return this;
		};

		/**
   * Sets the port number.
   * @param {*} port Port number.
   * @chainable
   */


		Uri.prototype.setPort = function setPort(port) {
			this.url.port = port;
			return this;
		};

		/**
   * Sets the function that will be used for parsing the original string uri
   * into an object.
   * @param {!function()} parseFn
   */


		Uri.setParseFn = function setParseFn(parseFn) {
			parseFn_ = parseFn;
		};

		/**
   * Sets the protocol. If missing <code>http:</code> is used as default.
   * @param {string} protocol
   * @chainable
   */


		Uri.prototype.setProtocol = function setProtocol(protocol) {
			this.url.protocol = protocol;
			if (this.url.protocol[this.url.protocol.length - 1] !== ':') {
				this.url.protocol += ':';
			}
			return this;
		};

		/**
   * @return {string} The string form of the url.
   * @override
   */


		Uri.prototype.toString = function toString() {
			var href = '';
			var host = this.getHost();
			if (host) {
				href += this.getProtocol() + '//';
			}
			href += host + this.getPathname() + this.getSearch() + this.getHash();
			return href;
		};

		/**
   * Joins the given paths.
   * @param {string} basePath
   * @param {...string} ...paths Any number of paths to be joined with the base url.
   * @static
   */


		Uri.joinPaths = function joinPaths(basePath) {
			for (var _len = arguments.length, paths = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				paths[_key - 1] = arguments[_key];
			}

			if (basePath.charAt(basePath.length - 1) === '/') {
				basePath = basePath.substring(0, basePath.length - 1);
			}
			paths = paths.map(function (path) {
				return path.charAt(0) === '/' ? path.substring(1) : path;
			});
			return [basePath].concat(paths).join('/').replace(/\/$/, '');
		};

		/**
   * URL-decodes the string. We need to specially handle '+'s because
   * the javascript library doesn't convert them to spaces.
   * @param {string} str The string to url decode.
   * @return {string} The decoded {@code str}.
   */


		Uri.urlDecode = function urlDecode(str) {
			return decodeURIComponent(str.replace(/\+/g, ' '));
		};

		return Uri;
	}();

	/**
  * Default protocol value.
  * @type {string}
  * @default http:
  * @static
  */


	Uri.DEFAULT_PROTOCOL = 'http:';

	/**
  * Hostname placeholder. Relevant to internal usage only.
  * @type {string}
  * @static
  */
	Uri.HOSTNAME_PLACEHOLDER = 'hostname' + Date.now();

	/**
  * Name used by the param generated by `makeUnique`.
  * @type {string}
  * @static
  */
	Uri.RANDOM_PARAM = 'zx';

	this.launchpad.Uri = Uri;
}).call(this);
/*!
 * Promises polyfill from Google's Closure Library.
 *
 *      Copyright 2013 The Closure Library Authors. All Rights Reserved.
 *
 * NOTE(eduardo): Promise support is not ready on all supported browsers,
 * therefore core.js is temporarily using Google's promises as polyfill. It
 * supports cancellable promises and has clean and fast implementation.
 */

'use strict';

(function () {
  var core = this.launchpadNamed.metal.core;
  var async = this.launchpadNamed.metal.async;

  /**
   * Provides a more strict interface for Thenables in terms of
   * http://promisesaplus.com for interop with {@see CancellablePromise}.
   *
   * @interface
   * @extends {IThenable.<TYPE>}
   * @template TYPE
   */

  var Thenable = function Thenable() {};

  /**
   * Adds callbacks that will operate on the result of the Thenable, returning a
   * new child Promise.
   *
   * If the Thenable is fulfilled, the {@code onFulfilled} callback will be
   * invoked with the fulfillment value as argument, and the child Promise will
   * be fulfilled with the return value of the callback. If the callback throws
   * an exception, the child Promise will be rejected with the thrown value
   * instead.
   *
   * If the Thenable is rejected, the {@code onRejected} callback will be invoked
   * with the rejection reason as argument, and the child Promise will be rejected
   * with the return value of the callback or thrown value.
   *
   * @param {?(function(this:THIS, TYPE):
   *             (RESULT|IThenable.<RESULT>|Thenable))=} opt_onFulfilled A
   *     function that will be invoked with the fulfillment value if the Promise
   *     is fullfilled.
   * @param {?(function(*): *)=} opt_onRejected A function that will be invoked
   *     with the rejection reason if the Promise is rejected.
   * @param {THIS=} opt_context An optional context object that will be the
   *     execution context for the callbacks. By default, functions are executed
   *     with the default this.
   * @return {!CancellablePromise.<RESULT>} A new Promise that will receive the
   *     result of the fulfillment or rejection callback.
   * @template RESULT,THIS
   */
  Thenable.prototype.then = function () {};

  /**
   * An expando property to indicate that an object implements
   * {@code Thenable}.
   *
   * {@see addImplementation}.
   *
   * @const
   */
  Thenable.IMPLEMENTED_BY_PROP = '$goog_Thenable';

  /**
   * Marks a given class (constructor) as an implementation of Thenable, so
   * that we can query that fact at runtime. The class must have already
   * implemented the interface.
   * Exports a 'then' method on the constructor prototype, so that the objects
   * also implement the extern {@see Thenable} interface for interop with
   * other Promise implementations.
   * @param {function(new:Thenable,...[?])} ctor The class constructor. The
   *     corresponding class must have already implemented the interface.
   */
  Thenable.addImplementation = function (ctor) {
    ctor.prototype.then = ctor.prototype.then;
    ctor.prototype.$goog_Thenable = true;
  };

  /**
   * @param {*} object
   * @return {boolean} Whether a given instance implements {@code Thenable}.
   *     The class/superclass of the instance must call {@code addImplementation}.
   */
  Thenable.isImplementedBy = function (object) {
    if (!object) {
      return false;
    }
    try {
      return !!object.$goog_Thenable;
    } catch (e) {
      // Property access seems to be forbidden.
      return false;
    }
  };

  /**
   * Like bind(), except that a 'this object' is not required. Useful when the
   * target function is already bound.
   *
   * Usage:
   * var g = partial(f, arg1, arg2);
   * g(arg3, arg4);
   *
   * @param {Function} fn A function to partially apply.
   * @param {...*} var_args Additional arguments that are partially applied to fn.
   * @return {!Function} A partially-applied form of the function bind() was
   *     invoked as a method of.
   */
  var partial = function partial(fn) {
    var args = Array.prototype.slice.call(arguments, 1);
    return function () {
      // Clone the array (with slice()) and append additional arguments
      // to the existing arguments.
      var newArgs = args.slice();
      newArgs.push.apply(newArgs, arguments);
      return fn.apply(this, newArgs);
    };
  };

  /**
   * Promises provide a result that may be resolved asynchronously. A Promise may
   * be resolved by being fulfilled or rejected with a value, which will be known
   * as the fulfillment value or the rejection reason. Whether fulfilled or
   * rejected, the Promise result is immutable once it is set.
   *
   * Promises may represent results of any type, including undefined. Rejection
   * reasons are typically Errors, but may also be of any type. Closure Promises
   * allow for optional type annotations that enforce that fulfillment values are
   * of the appropriate types at compile time.
   *
   * The result of a Promise is accessible by calling {@code then} and registering
   * {@code onFulfilled} and {@code onRejected} callbacks. Once the Promise
   * resolves, the relevant callbacks are invoked with the fulfillment value or
   * rejection reason as argument. Callbacks are always invoked in the order they
   * were registered, even when additional {@code then} calls are made from inside
   * another callback. A callback is always run asynchronously sometime after the
   * scope containing the registering {@code then} invocation has returned.
   *
   * If a Promise is resolved with another Promise, the first Promise will block
   * until the second is resolved, and then assumes the same result as the second
   * Promise. This allows Promises to depend on the results of other Promises,
   * linking together multiple asynchronous operations.
   *
   * This implementation is compatible with the Promises/A+ specification and
   * passes that specification's conformance test suite. A Closure Promise may be
   * resolved with a Promise instance (or sufficiently compatible Promise-like
   * object) created by other Promise implementations. From the specification,
   * Promise-like objects are known as "Thenables".
   *
   * @see http://promisesaplus.com/
   *
   * @param {function(
   *             this:RESOLVER_CONTEXT,
   *             function((TYPE|IThenable.<TYPE>|Thenable)),
   *             function(*)): void} resolver
   *     Initialization function that is invoked immediately with {@code resolve}
   *     and {@code reject} functions as arguments. The Promise is resolved or
   *     rejected with the first argument passed to either function.
   * @param {RESOLVER_CONTEXT=} opt_context An optional context for executing the
   *     resolver function. If unspecified, the resolver function will be executed
   *     in the default scope.
   * @constructor
   * @struct
   * @final
   * @implements {Thenable.<TYPE>}
   * @template TYPE,RESOLVER_CONTEXT
   */
  var CancellablePromise = function CancellablePromise(resolver, opt_context) {
    /**
     * The internal state of this Promise. Either PENDING, FULFILLED, REJECTED, or
     * BLOCKED.
     * @private {CancellablePromise.State_}
     */
    this.state_ = CancellablePromise.State_.PENDING;

    /**
     * The resolved result of the Promise. Immutable once set with either a
     * fulfillment value or rejection reason.
     * @private {*}
     */
    this.result_ = undefined;

    /**
     * For Promises created by calling {@code then()}, the originating parent.
     * @private {CancellablePromise}
     */
    this.parent_ = null;

    /**
     * The list of {@code onFulfilled} and {@code onRejected} callbacks added to
     * this Promise by calls to {@code then()}.
     * @private {Array.<CancellablePromise.CallbackEntry_>}
     */
    this.callbackEntries_ = null;

    /**
     * Whether the Promise is in the queue of Promises to execute.
     * @private {boolean}
     */
    this.executing_ = false;

    if (CancellablePromise.UNHANDLED_REJECTION_DELAY > 0) {
      /**
       * A timeout ID used when the {@code UNHANDLED_REJECTION_DELAY} is greater
       * than 0 milliseconds. The ID is set when the Promise is rejected, and
       * cleared only if an {@code onRejected} callback is invoked for the
       * Promise (or one of its descendants) before the delay is exceeded.
       *
       * If the rejection is not handled before the timeout completes, the
       * rejection reason is passed to the unhandled rejection handler.
       * @private {number}
       */
      this.unhandledRejectionId_ = 0;
    } else if (CancellablePromise.UNHANDLED_REJECTION_DELAY === 0) {
      /**
       * When the {@code UNHANDLED_REJECTION_DELAY} is set to 0 milliseconds, a
       * boolean that is set if the Promise is rejected, and reset to false if an
       * {@code onRejected} callback is invoked for the Promise (or one of its
       * descendants). If the rejection is not handled before the next timestep,
       * the rejection reason is passed to the unhandled rejection handler.
       * @private {boolean}
       */
      this.hadUnhandledRejection_ = false;
    }

    try {
      var self = this;
      resolver.call(opt_context, function (value) {
        self.resolve_(CancellablePromise.State_.FULFILLED, value);
      }, function (reason) {
        self.resolve_(CancellablePromise.State_.REJECTED, reason);
      });
    } catch (e) {
      this.resolve_(CancellablePromise.State_.REJECTED, e);
    }
  };

  /**
   * The delay in milliseconds before a rejected Promise's reason is passed to
   * the rejection handler. By default, the rejection handler rethrows the
   * rejection reason so that it appears in the developer console or
   * {@code window.onerror} handler.
   * Rejections are rethrown as quickly as possible by default. A negative value
   * disables rejection handling entirely.
   * @type {number}
   */
  CancellablePromise.UNHANDLED_REJECTION_DELAY = 0;

  /**
   * The possible internal states for a Promise. These states are not directly
   * observable to external callers.
   * @enum {number}
   * @private
   */
  CancellablePromise.State_ = {
    /** The Promise is waiting for resolution. */
    PENDING: 0,

    /** The Promise is blocked waiting for the result of another Thenable. */
    BLOCKED: 1,

    /** The Promise has been resolved with a fulfillment value. */
    FULFILLED: 2,

    /** The Promise has been resolved with a rejection reason. */
    REJECTED: 3
  };

  /**
   * Typedef for entries in the callback chain. Each call to {@code then},
   * {@code thenCatch}, or {@code thenAlways} creates an entry containing the
   * functions that may be invoked once the Promise is resolved.
   *
   * @typedef {{
   *   child: CancellablePromise,
   *   onFulfilled: function(*),
   *   onRejected: function(*)
   * }}
   * @private
   */
  CancellablePromise.CallbackEntry_ = null;

  /**
   * @param {(TYPE|Thenable.<TYPE>|Thenable)=} opt_value
   * @return {!CancellablePromise.<TYPE>} A new Promise that is immediately resolved
   *     with the given value.
   * @template TYPE
   */
  CancellablePromise.resolve = function (opt_value) {
    return new CancellablePromise(function (resolve) {
      resolve(opt_value);
    });
  };

  /**
   * @param {*=} opt_reason
   * @return {!CancellablePromise} A new Promise that is immediately rejected with the
   *     given reason.
   */
  CancellablePromise.reject = function (opt_reason) {
    return new CancellablePromise(function (resolve, reject) {
      reject(opt_reason);
    });
  };

  /**
   * @param {!Array.<!(Thenable.<TYPE>|Thenable)>} promises
   * @return {!CancellablePromise.<TYPE>} A Promise that receives the result of the
   *     first Promise (or Promise-like) input to complete.
   * @template TYPE
   */
  CancellablePromise.race = function (promises) {
    return new CancellablePromise(function (resolve, reject) {
      if (!promises.length) {
        resolve(undefined);
      }
      for (var i = 0, promise; promise = promises[i]; i++) {
        promise.then(resolve, reject);
      }
    });
  };

  /**
   * @param {!Array.<!(Thenable.<TYPE>|Thenable)>} promises
   * @return {!CancellablePromise.<!Array.<TYPE>>} A Promise that receives a list of
   *     every fulfilled value once every input Promise (or Promise-like) is
   *     successfully fulfilled, or is rejected by the first rejection result.
   * @template TYPE
   */
  CancellablePromise.all = function (promises) {
    return new CancellablePromise(function (resolve, reject) {
      var toFulfill = promises.length;
      var values = [];

      if (!toFulfill) {
        resolve(values);
        return;
      }

      var onFulfill = function onFulfill(index, value) {
        toFulfill--;
        values[index] = value;
        if (toFulfill === 0) {
          resolve(values);
        }
      };

      var onReject = function onReject(reason) {
        reject(reason);
      };

      for (var i = 0, promise; promise = promises[i]; i++) {
        promise.then(partial(onFulfill, i), onReject);
      }
    });
  };

  /**
   * @param {!Array.<!(Thenable.<TYPE>|Thenable)>} promises
   * @return {!CancellablePromise.<TYPE>} A Promise that receives the value of
   *     the first input to be fulfilled, or is rejected with a list of every
   *     rejection reason if all inputs are rejected.
   * @template TYPE
   */
  CancellablePromise.firstFulfilled = function (promises) {
    return new CancellablePromise(function (resolve, reject) {
      var toReject = promises.length;
      var reasons = [];

      if (!toReject) {
        resolve(undefined);
        return;
      }

      var onFulfill = function onFulfill(value) {
        resolve(value);
      };

      var onReject = function onReject(index, reason) {
        toReject--;
        reasons[index] = reason;
        if (toReject === 0) {
          reject(reasons);
        }
      };

      for (var i = 0, promise; promise = promises[i]; i++) {
        promise.then(onFulfill, partial(onReject, i));
      }
    });
  };

  /**
   * Adds callbacks that will operate on the result of the Promise, returning a
   * new child Promise.
   *
   * If the Promise is fulfilled, the {@code onFulfilled} callback will be invoked
   * with the fulfillment value as argument, and the child Promise will be
   * fulfilled with the return value of the callback. If the callback throws an
   * exception, the child Promise will be rejected with the thrown value instead.
   *
   * If the Promise is rejected, the {@code onRejected} callback will be invoked
   * with the rejection reason as argument, and the child Promise will be rejected
   * with the return value (or thrown value) of the callback.
   *
   * @override
   */
  CancellablePromise.prototype.then = function (opt_onFulfilled, opt_onRejected, opt_context) {
    return this.addChildPromise_(core.isFunction(opt_onFulfilled) ? opt_onFulfilled : null, core.isFunction(opt_onRejected) ? opt_onRejected : null, opt_context);
  };
  Thenable.addImplementation(CancellablePromise);

  /**
   * Adds a callback that will be invoked whether the Promise is fulfilled or
   * rejected. The callback receives no argument, and no new child Promise is
   * created. This is useful for ensuring that cleanup takes place after certain
   * asynchronous operations. Callbacks added with {@code thenAlways} will be
   * executed in the same order with other calls to {@code then},
   * {@code thenAlways}, or {@code thenCatch}.
   *
   * Since it does not produce a new child Promise, cancellation propagation is
   * not prevented by adding callbacks with {@code thenAlways}. A Promise that has
   * a cleanup handler added with {@code thenAlways} will be canceled if all of
   * its children created by {@code then} (or {@code thenCatch}) are canceled.
   *
   * @param {function(this:THIS): void} onResolved A function that will be invoked
   *     when the Promise is resolved.
   * @param {THIS=} opt_context An optional context object that will be the
   *     execution context for the callbacks. By default, functions are executed
   *     in the global scope.
   * @return {!CancellablePromise.<TYPE>} This Promise, for chaining additional calls.
   * @template THIS
   */
  CancellablePromise.prototype.thenAlways = function (onResolved, opt_context) {
    var callback = function callback() {
      try {
        // Ensure that no arguments are passed to onResolved.
        onResolved.call(opt_context);
      } catch (err) {
        CancellablePromise.handleRejection_.call(null, err);
      }
    };

    this.addCallbackEntry_({
      child: null,
      onRejected: callback,
      onFulfilled: callback
    });
    return this;
  };

  /**
   * Adds a callback that will be invoked only if the Promise is rejected. This
   * is equivalent to {@code then(null, onRejected)}.
   *
   * @param {!function(this:THIS, *): *} onRejected A function that will be
   *     invoked with the rejection reason if the Promise is rejected.
   * @param {THIS=} opt_context An optional context object that will be the
   *     execution context for the callbacks. By default, functions are executed
   *     in the global scope.
   * @return {!CancellablePromise} A new Promise that will receive the result of the
   *     callback.
   * @template THIS
   */
  CancellablePromise.prototype.thenCatch = function (onRejected, opt_context) {
    return this.addChildPromise_(null, onRejected, opt_context);
  };

  /**
   * Alias of {@link CancellablePromise.prototype.thenCatch}
   */
  CancellablePromise.prototype.catch = CancellablePromise.prototype.thenCatch;

  /**
   * Cancels the Promise if it is still pending by rejecting it with a cancel
   * Error. No action is performed if the Promise is already resolved.
   *
   * All child Promises of the canceled Promise will be rejected with the same
   * cancel error, as with normal Promise rejection. If the Promise to be canceled
   * is the only child of a pending Promise, the parent Promise will also be
   * canceled. Cancellation may propagate upward through multiple generations.
   *
   * @param {string=} opt_message An optional debugging message for describing the
   *     cancellation reason.
   */
  CancellablePromise.prototype.cancel = function (opt_message) {
    if (this.state_ === CancellablePromise.State_.PENDING) {
      async.run(function () {
        var err = new CancellablePromise.CancellationError(opt_message);
        err.IS_CANCELLATION_ERROR = true;
        this.cancelInternal_(err);
      }, this);
    }
  };

  /**
   * Cancels this Promise with the given error.
   *
   * @param {!Error} err The cancellation error.
   * @private
   */
  CancellablePromise.prototype.cancelInternal_ = function (err) {
    if (this.state_ === CancellablePromise.State_.PENDING) {
      if (this.parent_) {
        // Cancel the Promise and remove it from the parent's child list.
        this.parent_.cancelChild_(this, err);
      } else {
        this.resolve_(CancellablePromise.State_.REJECTED, err);
      }
    }
  };

  /**
   * Cancels a child Promise from the list of callback entries. If the Promise has
   * not already been resolved, reject it with a cancel error. If there are no
   * other children in the list of callback entries, propagate the cancellation
   * by canceling this Promise as well.
   *
   * @param {!CancellablePromise} childPromise The Promise to cancel.
   * @param {!Error} err The cancel error to use for rejecting the Promise.
   * @private
   */
  CancellablePromise.prototype.cancelChild_ = function (childPromise, err) {
    if (!this.callbackEntries_) {
      return;
    }
    var childCount = 0;
    var childIndex = -1;

    // Find the callback entry for the childPromise, and count whether there are
    // additional child Promises.
    for (var i = 0, entry; entry = this.callbackEntries_[i]; i++) {
      var child = entry.child;
      if (child) {
        childCount++;
        if (child === childPromise) {
          childIndex = i;
        }
        if (childIndex >= 0 && childCount > 1) {
          break;
        }
      }
    }

    // If the child Promise was the only child, cancel this Promise as well.
    // Otherwise, reject only the child Promise with the cancel error.
    if (childIndex >= 0) {
      if (this.state_ === CancellablePromise.State_.PENDING && childCount === 1) {
        this.cancelInternal_(err);
      } else {
        var callbackEntry = this.callbackEntries_.splice(childIndex, 1)[0];
        this.executeCallback_(callbackEntry, CancellablePromise.State_.REJECTED, err);
      }
    }
  };

  /**
   * Adds a callback entry to the current Promise, and schedules callback
   * execution if the Promise has already been resolved.
   *
   * @param {CancellablePromise.CallbackEntry_} callbackEntry Record containing
   *     {@code onFulfilled} and {@code onRejected} callbacks to execute after
   *     the Promise is resolved.
   * @private
   */
  CancellablePromise.prototype.addCallbackEntry_ = function (callbackEntry) {
    if ((!this.callbackEntries_ || !this.callbackEntries_.length) && (this.state_ === CancellablePromise.State_.FULFILLED || this.state_ === CancellablePromise.State_.REJECTED)) {
      this.scheduleCallbacks_();
    }
    if (!this.callbackEntries_) {
      this.callbackEntries_ = [];
    }
    this.callbackEntries_.push(callbackEntry);
  };

  /**
   * Creates a child Promise and adds it to the callback entry list. The result of
   * the child Promise is determined by the state of the parent Promise and the
   * result of the {@code onFulfilled} or {@code onRejected} callbacks as
   * specified in the Promise resolution procedure.
   *
   * @see http://promisesaplus.com/#the__method
   *
   * @param {?function(this:THIS, TYPE):
   *          (RESULT|CancellablePromise.<RESULT>|Thenable)} onFulfilled A callback that
   *     will be invoked if the Promise is fullfilled, or null.
   * @param {?function(this:THIS, *): *} onRejected A callback that will be
   *     invoked if the Promise is rejected, or null.
   * @param {THIS=} opt_context An optional execution context for the callbacks.
   *     in the default calling context.
   * @return {!CancellablePromise} The child Promise.
   * @template RESULT,THIS
   * @private
   */
  CancellablePromise.prototype.addChildPromise_ = function (onFulfilled, onRejected, opt_context) {

    var callbackEntry = {
      child: null,
      onFulfilled: null,
      onRejected: null
    };

    callbackEntry.child = new CancellablePromise(function (resolve, reject) {
      // Invoke onFulfilled, or resolve with the parent's value if absent.
      callbackEntry.onFulfilled = onFulfilled ? function (value) {
        try {
          var result = onFulfilled.call(opt_context, value);
          resolve(result);
        } catch (err) {
          reject(err);
        }
      } : resolve;

      // Invoke onRejected, or reject with the parent's reason if absent.
      callbackEntry.onRejected = onRejected ? function (reason) {
        try {
          var result = onRejected.call(opt_context, reason);
          if (!core.isDef(result) && reason.IS_CANCELLATION_ERROR) {
            // Propagate cancellation to children if no other result is returned.
            reject(reason);
          } else {
            resolve(result);
          }
        } catch (err) {
          reject(err);
        }
      } : reject;
    });

    callbackEntry.child.parent_ = this;
    this.addCallbackEntry_(
    /** @type {CancellablePromise.CallbackEntry_} */callbackEntry);
    return callbackEntry.child;
  };

  /**
   * Unblocks the Promise and fulfills it with the given value.
   *
   * @param {TYPE} value
   * @private
   */
  CancellablePromise.prototype.unblockAndFulfill_ = function (value) {
    if (this.state_ !== CancellablePromise.State_.BLOCKED) {
      throw new Error('CancellablePromise is not blocked.');
    }
    this.state_ = CancellablePromise.State_.PENDING;
    this.resolve_(CancellablePromise.State_.FULFILLED, value);
  };

  /**
   * Unblocks the Promise and rejects it with the given rejection reason.
   *
   * @param {*} reason
   * @private
   */
  CancellablePromise.prototype.unblockAndReject_ = function (reason) {
    if (this.state_ !== CancellablePromise.State_.BLOCKED) {
      throw new Error('CancellablePromise is not blocked.');
    }
    this.state_ = CancellablePromise.State_.PENDING;
    this.resolve_(CancellablePromise.State_.REJECTED, reason);
  };

  /**
   * Attempts to resolve a Promise with a given resolution state and value. This
   * is a no-op if the given Promise has already been resolved.
   *
   * If the given result is a Thenable (such as another Promise), the Promise will
   * be resolved with the same state and result as the Thenable once it is itself
   * resolved.
   *
   * If the given result is not a Thenable, the Promise will be fulfilled or
   * rejected with that result based on the given state.
   *
   * @see http://promisesaplus.com/#the_promise_resolution_procedure
   *
   * @param {CancellablePromise.State_} state
   * @param {*} x The result to apply to the Promise.
   * @private
   */
  CancellablePromise.prototype.resolve_ = function (state, x) {
    if (this.state_ !== CancellablePromise.State_.PENDING) {
      return;
    }

    if (this === x) {
      state = CancellablePromise.State_.REJECTED;
      x = new TypeError('CancellablePromise cannot resolve to itself');
    } else if (Thenable.isImplementedBy(x)) {
      x = /** @type {!Thenable} */x;
      this.state_ = CancellablePromise.State_.BLOCKED;
      x.then(this.unblockAndFulfill_, this.unblockAndReject_, this);
      return;
    } else if (core.isObject(x)) {
      try {
        var then = x.then;
        if (core.isFunction(then)) {
          this.tryThen_(x, then);
          return;
        }
      } catch (e) {
        state = CancellablePromise.State_.REJECTED;
        x = e;
      }
    }

    this.result_ = x;
    this.state_ = state;
    this.scheduleCallbacks_();

    if (state === CancellablePromise.State_.REJECTED && !x.IS_CANCELLATION_ERROR) {
      CancellablePromise.addUnhandledRejection_(this, x);
    }
  };

  /**
   * Attempts to call the {@code then} method on an object in the hopes that it is
   * a Promise-compatible instance. This allows interoperation between different
   * Promise implementations, however a non-compliant object may cause a Promise
   * to hang indefinitely. If the {@code then} method throws an exception, the
   * dependent Promise will be rejected with the thrown value.
   *
   * @see http://promisesaplus.com/#point-70
   *
   * @param {Thenable} thenable An object with a {@code then} method that may be
   *     compatible with the Promise/A+ specification.
   * @param {!Function} then The {@code then} method of the Thenable object.
   * @private
   */
  CancellablePromise.prototype.tryThen_ = function (thenable, then) {
    this.state_ = CancellablePromise.State_.BLOCKED;
    var promise = this;
    var called = false;

    var resolve = function resolve(value) {
      if (!called) {
        called = true;
        promise.unblockAndFulfill_(value);
      }
    };

    var reject = function reject(reason) {
      if (!called) {
        called = true;
        promise.unblockAndReject_(reason);
      }
    };

    try {
      then.call(thenable, resolve, reject);
    } catch (e) {
      reject(e);
    }
  };

  /**
   * Executes the pending callbacks of a resolved Promise after a timeout.
   *
   * Section 2.2.4 of the Promises/A+ specification requires that Promise
   * callbacks must only be invoked from a call stack that only contains Promise
   * implementation code, which we accomplish by invoking callback execution after
   * a timeout. If {@code startExecution_} is called multiple times for the same
   * Promise, the callback chain will be evaluated only once. Additional callbacks
   * may be added during the evaluation phase, and will be executed in the same
   * event loop.
   *
   * All Promises added to the waiting list during the same browser event loop
   * will be executed in one batch to avoid using a separate timeout per Promise.
   *
   * @private
   */
  CancellablePromise.prototype.scheduleCallbacks_ = function () {
    if (!this.executing_) {
      this.executing_ = true;
      async.run(this.executeCallbacks_, this);
    }
  };

  /**
   * Executes all pending callbacks for this Promise.
   *
   * @private
   */
  CancellablePromise.prototype.executeCallbacks_ = function () {
    while (this.callbackEntries_ && this.callbackEntries_.length) {
      var entries = this.callbackEntries_;
      this.callbackEntries_ = [];

      for (var i = 0; i < entries.length; i++) {
        this.executeCallback_(entries[i], this.state_, this.result_);
      }
    }
    this.executing_ = false;
  };

  /**
   * Executes a pending callback for this Promise. Invokes an {@code onFulfilled}
   * or {@code onRejected} callback based on the resolved state of the Promise.
   *
   * @param {!CancellablePromise.CallbackEntry_} callbackEntry An entry containing the
   *     onFulfilled and/or onRejected callbacks for this step.
   * @param {CancellablePromise.State_} state The resolution status of the Promise,
   *     either FULFILLED or REJECTED.
   * @param {*} result The resolved result of the Promise.
   * @private
   */
  CancellablePromise.prototype.executeCallback_ = function (callbackEntry, state, result) {
    if (state === CancellablePromise.State_.FULFILLED) {
      callbackEntry.onFulfilled(result);
    } else {
      this.removeUnhandledRejection_();
      callbackEntry.onRejected(result);
    }
  };

  /**
   * Marks this rejected Promise as having being handled. Also marks any parent
   * Promises in the rejected state as handled. The rejection handler will no
   * longer be invoked for this Promise (if it has not been called already).
   *
   * @private
   */
  CancellablePromise.prototype.removeUnhandledRejection_ = function () {
    var p;
    if (CancellablePromise.UNHANDLED_REJECTION_DELAY > 0) {
      for (p = this; p && p.unhandledRejectionId_; p = p.parent_) {
        clearTimeout(p.unhandledRejectionId_);
        p.unhandledRejectionId_ = 0;
      }
    } else if (CancellablePromise.UNHANDLED_REJECTION_DELAY === 0) {
      for (p = this; p && p.hadUnhandledRejection_; p = p.parent_) {
        p.hadUnhandledRejection_ = false;
      }
    }
  };

  /**
   * Marks this rejected Promise as unhandled. If no {@code onRejected} callback
   * is called for this Promise before the {@code UNHANDLED_REJECTION_DELAY}
   * expires, the reason will be passed to the unhandled rejection handler. The
   * handler typically rethrows the rejection reason so that it becomes visible in
   * the developer console.
   *
   * @param {!CancellablePromise} promise The rejected Promise.
   * @param {*} reason The Promise rejection reason.
   * @private
   */
  CancellablePromise.addUnhandledRejection_ = function (promise, reason) {
    if (CancellablePromise.UNHANDLED_REJECTION_DELAY > 0) {
      promise.unhandledRejectionId_ = setTimeout(function () {
        CancellablePromise.handleRejection_.call(null, reason);
      }, CancellablePromise.UNHANDLED_REJECTION_DELAY);
    } else if (CancellablePromise.UNHANDLED_REJECTION_DELAY === 0) {
      promise.hadUnhandledRejection_ = true;
      async.run(function () {
        if (promise.hadUnhandledRejection_) {
          CancellablePromise.handleRejection_.call(null, reason);
        }
      });
    }
  };

  /**
   * A method that is invoked with the rejection reasons for Promises that are
   * rejected but have no {@code onRejected} callbacks registered yet.
   * @type {function(*)}
   * @private
   */
  CancellablePromise.handleRejection_ = async.throwException;

  /**
   * Sets a handler that will be called with reasons from unhandled rejected
   * Promises. If the rejected Promise (or one of its descendants) has an
   * {@code onRejected} callback registered, the rejection will be considered
   * handled, and the rejection handler will not be called.
   *
   * By default, unhandled rejections are rethrown so that the error may be
   * captured by the developer console or a {@code window.onerror} handler.
   *
   * @param {function(*)} handler A function that will be called with reasons from
   *     rejected Promises. Defaults to {@code async.throwException}.
   */
  CancellablePromise.setUnhandledRejectionHandler = function (handler) {
    CancellablePromise.handleRejection_ = handler;
  };

  /**
   * Error used as a rejection reason for canceled Promises.
   *
   * @param {string=} opt_message
   * @constructor
   * @extends {Error}
   * @final
   */
  CancellablePromise.CancellationError = function (_Error) {
    babelHelpers.inherits(_class, _Error);

    function _class(opt_message) {
      babelHelpers.classCallCheck(this, _class);

      var _this = babelHelpers.possibleConstructorReturn(this, _Error.call(this, opt_message));

      if (opt_message) {
        _this.message = opt_message;
      }
      return _this;
    }

    return _class;
  }(Error);

  /** @override */
  CancellablePromise.CancellationError.prototype.name = 'cancel';

  this.launchpadNamed.Promise = this.launchpadNamed.Promise || {};
  this.launchpadNamed.Promise.CancellablePromise = CancellablePromise;
  this.launchpad.Promise = CancellablePromise;
}).call(this);
'use strict';

(function () {
	var core = this.launchpadNamed.metal.core;
	var Uri = this.launchpad.Uri;
	var Promise = this.launchpadNamed.Promise.CancellablePromise;

	var Ajax = function () {
		function Ajax() {
			babelHelpers.classCallCheck(this, Ajax);
		}

		/**
   * XmlHttpRequest's getAllResponseHeaders() method returns a string of
   * response headers according to the format described on the spec:
   * {@link http://www.w3.org/TR/XMLHttpRequest/#the-getallresponseheaders-method}.
   * This method parses that string into a user-friendly name/value pair
   * object.
   * @param {string} allHeaders All headers as string.
   * @return {!Array.<Object<string, string>>}
   */

		Ajax.parseResponseHeaders = function parseResponseHeaders(allHeaders) {
			var headers = [];
			if (!allHeaders) {
				return headers;
			}
			var pairs = allHeaders.split('\r\n');
			for (var i = 0; i < pairs.length; i++) {
				var index = pairs[i].indexOf(': ');
				if (index > 0) {
					var name = pairs[i].substring(0, index);
					var value = pairs[i].substring(index + 2);
					headers.push({
						name: name,
						value: value
					});
				}
			}
			return headers;
		};

		/**
   * Requests the url using XMLHttpRequest.
   * @param {!string} url
   * @param {!string} method
   * @param {?string} body
   * @param {MultiMap=} opt_headers
   * @param {MultiMap=} opt_params
   * @param {number=} opt_timeout
   * @param {boolean=} opt_sync
   * @return {Promise} Deferred ajax request.
   * @protected
   */


		Ajax.request = function request(url, method, body, opt_headers, opt_params, opt_timeout, opt_sync) {
			var request = new XMLHttpRequest();

			var promise = new Promise(function (resolve, reject) {
				request.onload = function () {
					if (request.aborted) {
						request.onerror();
						return;
					}
					resolve(request);
				};
				request.onerror = function () {
					var error = new Error('Request error');
					error.request = request;
					reject(error);
				};
			}).thenCatch(function (reason) {
				request.abort();
				throw reason;
			}).thenAlways(function () {
				clearTimeout(timeout);
			});

			if (opt_params) {
				url = new Uri(url).addParametersFromMultiMap(opt_params).toString();
			}

			request.open(method, url, !opt_sync);

			if (opt_headers) {
				opt_headers.names().forEach(function (name) {
					request.setRequestHeader(name, opt_headers.getAll(name).join(', '));
				});
			}

			request.send(core.isDef(body) ? body : null);

			if (core.isDefAndNotNull(opt_timeout)) {
				var timeout = setTimeout(function () {
					promise.cancel('Request timeout');
				}, opt_timeout);
			}

			return promise;
		};

		return Ajax;
	}();

	this.launchpad.Ajax = Ajax;
}).call(this);
'use strict';

/**
 * Provides a convenient interface for data transport.
 * @interface
 */

(function () {
	var Transport = function () {
		function Transport() {
			babelHelpers.classCallCheck(this, Transport);
		}

		/**
   * Sends a message for the specified client.
   * @param {!ClientRequest} clientRequest
   * @return {!Promise} Deferred request.
   */

		Transport.prototype.send = function send() {};

		return Transport;
	}();

	this.launchpad.Transport = Transport;
}).call(this);
'use strict';

(function () {
	var Ajax = this.launchpad.Ajax;
	var Transport = this.launchpad.Transport;
	var ClientResponse = this.launchpad.ClientResponse;

	/**
  * The implementation of an ajax transport to be used with {@link Launchpad}.
  * @extends {Transport}
  */

	var AjaxTransport = function (_Transport) {
		babelHelpers.inherits(AjaxTransport, _Transport);

		function AjaxTransport() {
			babelHelpers.classCallCheck(this, AjaxTransport);
			return babelHelpers.possibleConstructorReturn(this, _Transport.apply(this, arguments));
		}

		/**
   * @inheritDoc
   */

		AjaxTransport.prototype.send = function send(clientRequest) {
			var deferred = Ajax.request(clientRequest.url(), clientRequest.method(), clientRequest.body(), clientRequest.headers(), clientRequest.params(), null, false);

			return deferred.then(function (response) {
				var clientResponse = new ClientResponse(clientRequest);
				clientResponse.body(response.responseText);
				clientResponse.statusCode(response.status);
				clientResponse.statusText(response.statusText);
				Ajax.parseResponseHeaders(response.getAllResponseHeaders()).forEach(function (header) {
					clientResponse.header(header.name, header.value);
				});
				return clientResponse;
			});
		};

		return AjaxTransport;
	}(Transport);

	this.launchpad.AjaxTransport = AjaxTransport;
}).call(this);
'use strict';

(function () {
	var AjaxTransport = this.launchpad.AjaxTransport;

	/**
  * Provides a factory for data transport.
  */

	var TransportFactory = function () {
		function TransportFactory() {
			babelHelpers.classCallCheck(this, TransportFactory);

			this.transports = {};
			this.transports[TransportFactory.DEFAULT_TRANSPORT_NAME] = TransportFactory[TransportFactory.DEFAULT_TRANSPORT_NAME];
		}

		/**
   * Returns {@link TransportFactory} instance.
   */


		TransportFactory.instance = function instance() {
			if (!TransportFactory.instance_) {
				TransportFactory.instance_ = new TransportFactory();
			}
			return TransportFactory.instance_;
		};

		/**
   * Gets an instance of the transport implementation with the given name.
   * @param {string} implementationName
   * @return {!Transport}
   */


		TransportFactory.prototype.get = function get(implementationName) {
			var TransportClass = this.transports[implementationName];

			if (!TransportClass) {
				throw new Error('Invalid transport name: ' + implementationName);
			}

			try {
				return new TransportClass();
			} catch (err) {
				throw new Error('Can\'t create transport', err);
			}
		};

		/**
   * Returns the default transport implementation.
   * @return {!Transport}
   */


		TransportFactory.prototype.getDefault = function getDefault() {
			return this.get(TransportFactory.DEFAULT_TRANSPORT_NAME);
		};

		return TransportFactory;
	}();

	TransportFactory.DEFAULT_TRANSPORT_NAME = 'default';

	TransportFactory[TransportFactory.DEFAULT_TRANSPORT_NAME] = AjaxTransport;

	this.launchpad.TransportFactory = TransportFactory;
}).call(this);
'use strict';

(function () {
	var core = this.launchpadNamed.metal.core;
	var Auth = this.launchpad.Auth;
	var Base64 = this.launchpad.Base64;
	var Embodied = this.launchpad.Embodied;
	var Filter = this.launchpad.Filter;
	var Query = this.launchpad.Query;
	var TransportFactory = this.launchpad.TransportFactory;
	var ClientRequest = this.launchpad.ClientRequest;
	var MultiMap = this.launchpad.MultiMap;
	var Uri = this.launchpad.Uri;


	var io;

	// Optimistic initialization of `io` reference from global `window.io`.
	if (typeof window !== 'undefined') {
		io = window.io;
	}

	/**
  * The main class for making api requests. Sending requests returns a promise that is
  * resolved when the response arrives. Usage example:
  * ```javascript
  * Launchpad
  *   .url('/data/tasks')
  *   .post({desc: 'Buy milkl'})
  *   .then(function(response) {
  *     // Handle response here.
  *     console.log(response.body())
  *   });
  * ```
  */

	var Launchpad = function () {
		/**
   * Launchpad constructor function.
   * @param {string} url The base url.
   * @param {...string} paths Any amount of paths to be appended to the base url.
   * @constructor
   */

		function Launchpad(url) {
			for (var _len = arguments.length, paths = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				paths[_key - 1] = arguments[_key];
			}

			babelHelpers.classCallCheck(this, Launchpad);

			if (arguments.length === 0) {
				throw new Error('Invalid arguments, try `new Launchpad(baseUrl, url)`');
			}

			this.auth_ = null;
			this.body_ = null;
			this.url_ = Uri.joinPaths.apply(Uri, [url || ''].concat(paths));
			this.headers_ = new MultiMap();
			this.params_ = new MultiMap();

			this.header('Content-Type', 'application/json');
			this.header('X-PJAX', 'true');
			this.header('X-Requested-With', 'XMLHttpRequest');
		}

		/**
   * Adds an aggregation to this {@link Query} instance.
   * @param {string} name The aggregation name.
   * @param {!Aggregation|string} aggregationOrField Either an
   *   {@link Aggregation} instance or the name of the aggregation field.
   * @param {string=} opt_operator The aggregation operator.
   * @chainable
   */


		Launchpad.prototype.aggregate = function aggregate(name, aggregationOrField, opt_operator) {
			this.getOrCreateQuery_().aggregate(name, aggregationOrField, opt_operator);
			return this;
		};

		/**
   * Adds authorization information to this request.
   * @param {!Auth|string} authOrTokenOrUsername Either an {@link Auth} instance,
   *   an authorization token, or the username.
   * @param {string=} opt_password If a username is given as the first param,
   *   this should be the password.
   * @chainable
   */


		Launchpad.prototype.auth = function auth(authOrTokenOrUsername, opt_password) {
			this.auth_ = authOrTokenOrUsername;
			if (!(this.auth_ instanceof Auth)) {
				this.auth_ = Auth.create(authOrTokenOrUsername, opt_password);
			}
			return this;
		};

		/**
   * Sets the body that will be sent with this request.
   * @param {*} body
   * @chainable
   */


		Launchpad.prototype.body = function body(_body) {
			this.body_ = _body;
			return this;
		};

		/**
   * Converts the given body object to query params.
   * @param {!ClientRequest} clientRequest
   * @param {*} body
   * @protected
   */


		Launchpad.prototype.convertBodyToParams_ = function convertBodyToParams_(clientRequest, body) {
			if (core.isString(body)) {
				body = {
					body: body
				};
			} else if (body instanceof Embodied) {
				body = body.body();
			}
			Object.keys(body || {}).forEach(function (name) {
				return clientRequest.param(name, body[name]);
			});
		};

		/**
   * Sets this request's query type to "count".
   * @chainnable
   */


		Launchpad.prototype.count = function count() {
			this.getOrCreateQuery_().type('count');
			return this;
		};

		/**
   * Creates client request and encode.
   * @param {string} method
   * @param {*} body
   * @return {!ClientRequest} clientRequest
   * @protected
   */


		Launchpad.prototype.createClientRequest_ = function createClientRequest_(method, body) {
			var clientRequest = new ClientRequest();

			clientRequest.body(body || this.body_);

			if (!core.isDefAndNotNull(clientRequest.body())) {
				if (this.query_) {
					clientRequest.body(this.query_.body());
				} else if (this.formData_) {
					clientRequest.body(this.formData_);
				}
			}

			clientRequest.method(method);
			clientRequest.headers(this.headers());
			clientRequest.params(this.params());
			clientRequest.url(this.url());

			this.encode(clientRequest);

			return clientRequest;
		};

		/**
   * Decodes clientResponse body, parsing the body for example.
   * @param {!ClientResponse} clientResponse The response object to be decoded.
   * @return {!ClientResponse} The decoded response.
   */


		Launchpad.prototype.decode = function decode(clientResponse) {
			if (Launchpad.isContentTypeJson(clientResponse)) {
				try {
					clientResponse.body(JSON.parse(clientResponse.body()));
				} catch (err) {}
			}
			return clientResponse;
		};

		/**
   * Sends message with the DELETE http verb.
   * @param {string=} opt_body Content to be sent as the request's body.
   * @return {!CancellablePromise}
   */


		Launchpad.prototype.delete = function _delete(opt_body) {
			return this.sendAsync('DELETE', opt_body);
		};

		/**
   * Encodes the given {@link ClientRequest}, converting its body to an appropriate
   * format for example.
   * @param {!ClientRequest} clientRequest The request object to encode.
   * @return {!ClientRequest} The encoded request.
   */


		Launchpad.prototype.encode = function encode(clientRequest) {
			var body = clientRequest.body();

			if (core.isElement(body)) {
				body = new FormData(body);
				clientRequest.body(body);
			}

			body = this.wrapWithQuery_(body);
			if (clientRequest.method() === 'GET') {
				this.convertBodyToParams_(clientRequest, body);
				clientRequest.removeBody();
				body = null;
			}

			if (typeof FormData !== 'undefined' && body instanceof FormData) {
				clientRequest.headers().remove('content-type');
			} else if (body instanceof Embodied) {
				clientRequest.body(body.toString());
			} else if (Launchpad.isContentTypeJson(clientRequest)) {
				clientRequest.body(JSON.stringify(clientRequest.body()));
			}

			this.encodeParams_(clientRequest);
			this.resolveAuthentication_(clientRequest);

			return clientRequest;
		};

		/**
   * Encodes the params for the given request, according to their types.
   * @param {!ClientRequest} clientRequest
   * @protected
   */


		Launchpad.prototype.encodeParams_ = function encodeParams_(clientRequest) {
			var params = clientRequest.params();
			params.names().forEach(function (name) {
				var values = params.getAll(name);
				values.forEach(function (value, index) {
					if (value instanceof Embodied) {
						value = value.toString();
					} else if (core.isObject(value) || value instanceof Array) {
						value = JSON.stringify(value);
					}
					values[index] = value;
				});
			});
		};

		/**
   * Adds a filter to this request's {@link Query}.
   * @param {!Filter|string} fieldOrFilter Either a Filter instance or the
   *   name of the field to filter by.
   * @param {*=} opt_operatorOrValue Either the field's operator or its value.
   * @param {*=} opt_value The filter's value.
   * @chainable
   */


		Launchpad.prototype.filter = function filter(fieldOrFilter, opt_operatorOrValue, opt_value) {
			this.getOrCreateQuery_().filter(fieldOrFilter, opt_operatorOrValue, opt_value);
			return this;
		};

		/**
   * Adds a key/value pair to be sent via the body in a `multipart/form-data` format.
   * If the body is set by other means (for example, through the `body` method), this
   * will be ignored.
   * @param {string} name
   * @param {*} value
   * @chainable
   */


		Launchpad.prototype.form = function form(name, value) {
			if (typeof FormData === 'undefined') {
				throw new Error('form() is only available when FormData API is available.');
			}

			if (!this.formData_) {
				this.formData_ = new FormData();
			}
			this.formData_.append(name, value);
			return this;
		};

		/**
   * Sends message with the GET http verb.
   * @param {*=} opt_params Params to be added to the request url.
   * @return {!CancellablePromise}
   */


		Launchpad.prototype.get = function get(opt_params) {
			return this.sendAsync('GET', opt_params);
		};

		/**
   * Gets the currently used {@link Query} object. If none exists yet,
   * a new one is created.
   * @return {!Query}
   * @protected
   */


		Launchpad.prototype.getOrCreateQuery_ = function getOrCreateQuery_() {
			if (!this.query_) {
				this.query_ = new Query();
			}
			return this.query_;
		};

		/**
   * Adds a header. If the header with the same name already exists, it will
   * not be overwritten, but new value will be stored. The order is preserved.
   * @param {string} name
   * @param {*} value
   * @chainable
   */


		Launchpad.prototype.header = function header(name, value) {
			if (arguments.length !== 2) {
				throw new Error('Invalid arguments');
			}
			this.headers_.set(name, value);
			return this;
		};

		/**
   * Gets the headers.
   * @return {!MultiMap}
   */


		Launchpad.prototype.headers = function headers() {
			return this.headers_;
		};

		/**
   * Adds a highlight entry to this request's {@link Query} instance.
   * @param {string} field The field's name.
   * @chainable
   */


		Launchpad.prototype.highlight = function highlight(field) {
			this.getOrCreateQuery_().highlight(field);
			return this;
		};

		/**
   * Sets the limit for this request's {@link Query}.
   * @param {number} limit The max amount of entries that this request should return.
   * @chainable
   */


		Launchpad.prototype.limit = function limit(_limit) {
			this.getOrCreateQuery_().limit(_limit);
			return this;
		};

		/**
   * Sets the offset for this request's {@link Query}.
   * @param {number} offset The index of the first entry that should be returned
   *   by this query.
   * @chainable
   */


		Launchpad.prototype.offset = function offset(_offset) {
			this.getOrCreateQuery_().offset(_offset);
			return this;
		};

		/**
   * Adds a query. If the query with the same name already exists, it will not
   * be overwritten, but new value will be stored. The order is preserved.
   * @param {string} name
   * @param {*} value
   * @chainable
   */


		Launchpad.prototype.param = function param(name, value) {
			if (arguments.length !== 2) {
				throw new Error('Invalid arguments');
			}
			this.params_.set(name, value);
			return this;
		};

		/**
   * Gets the query strings map.
   * @return {!MultiMap}
   */


		Launchpad.prototype.params = function params() {
			return this.params_;
		};

		/**
   * Sends message with the PATCH http verb.
   * @param {string=} opt_body Content to be sent as the request's body.
   * @return {!CancellablePromise}
   */


		Launchpad.prototype.patch = function patch(opt_body) {
			return this.sendAsync('PATCH', opt_body);
		};

		/**
   * Creates a new {@link Launchpad} instance for handling the url resulting in the
   * union of the current url with the given paths.
   * @param {...string} paths Any number of paths.
   * @return {!Launchpad} A new {@link Launchpad} instance for handling the given paths.
   */


		Launchpad.prototype.path = function path() {
			for (var _len2 = arguments.length, paths = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
				paths[_key2] = arguments[_key2];
			}

			return new (Function.prototype.bind.apply(Launchpad, [null].concat([this.url()], paths)))().use(this.customTransport_);
		};

		/**
   * Sends message with the POST http verb.
   * @param {string=} opt_body Content to be sent as the request's body.
   * @return {!CancellablePromise}
   */


		Launchpad.prototype.post = function post(opt_body) {
			return this.sendAsync('POST', opt_body);
		};

		/**
   * Sends message with the PUT http verb.
   * @param {string=} opt_body Content to be sent as the request's body.
   * @return {!CancellablePromise}
   */


		Launchpad.prototype.put = function put(opt_body) {
			return this.sendAsync('PUT', opt_body);
		};

		/**
   * Adds the authentication information to the request.
   * @param {!ClientRequest} clientRequest
   * @protected
   */


		Launchpad.prototype.resolveAuthentication_ = function resolveAuthentication_(clientRequest) {
			if (!this.auth_) {
				return;
			}
			if (this.auth_.hasToken()) {
				clientRequest.header('Authorization', 'Bearer ' + this.auth_.token());
			} else {
				var credentials = this.auth_.username() + ':' + this.auth_.password();
				clientRequest.header('Authorization', 'Basic ' + Base64.encodeString(credentials));
			}
		};

		/**
   * Adds a search to this request's {@link Query} instance.
   * @param {!Filter|string} filterOrTextOrField If no other arguments
   *   are passed to this function, this should be either a `Filter`
   *   instance or a text to be used in a match filter. In both cases
   *   the filter will be applied to all fields. Another option is to
   *   pass this as a field name instead, together with other arguments
   *   so the filter can be created.
   * @param {string=} opt_textOrOperator Either a text to be used in a
   *   match filter, or the operator that should be used.
   * @param {*=} opt_value The value to be used by the filter. Should
   *   only be passed if an operator was passed as the second argument.
   * @chainable
   */


		Launchpad.prototype.search = function search(filterOrTextOrField, opt_textOrOperator, opt_value) {
			this.getOrCreateQuery_().search(filterOrTextOrField, opt_textOrOperator, opt_value);
			return this;
		};

		/**
   * Uses transport to send request with given method name and body
   * asynchronously.
   * @param {string} method The HTTP method to be used when sending data.
   * @param {string} body Content to be sent as the request's body.
   * @return {!CancellablePromise} Deferred request.
   */


		Launchpad.prototype.sendAsync = function sendAsync(method, body) {
			var transport = this.customTransport_ || TransportFactory.instance().getDefault();

			var clientRequest = this.createClientRequest_(method, body);

			return transport.send(clientRequest).then(this.decode);
		};

		/**
   * Sets the socket transport
   * @param {Object} socket implementation object.
   */


		Launchpad.socket = function socket(_socket) {
			io = _socket;
		};

		/**
   * Adds a sort query to this request's body.
   * @param {string} field The field that the query should be sorted by.
   * @param {string=} opt_direction The direction the sort operation should use.
   *   If none is given, "asc" is used by default.
   * @chainnable
   */


		Launchpad.prototype.sort = function sort(field, opt_direction) {
			this.getOrCreateQuery_().sort(field, opt_direction);
			return this;
		};

		/**
   * Static factory for creating launchpad client for the given url.
   * @param {string} url The url that the client should use for sending requests.
   */


		Launchpad.url = function url(_url) {
			return new Launchpad(_url).use(this.customTransport_);
		};

		/**
   * Static factory for creating launchpad client for the given url.
   * @param {string} containerId The container id that the client should use
   *   for sending requests.
   */


		Launchpad.container = function container(containerId) {
			if (Launchpad.DOMAIN === null) {
				return Launchpad.url('/');
			}

			return new Launchpad.url(containerId + '.' + Launchpad.DOMAIN);
		};

		/**
   * Returns the URL used by this client.
   */


		Launchpad.prototype.url = function url() {
			return this.url_;
		};

		/**
   * Specifies {@link Transport} implementation.
   * @param {!Transport} transport The transport implementation that should be used.
   */


		Launchpad.prototype.use = function use(transport) {
			this.customTransport_ = transport;
			return this;
		};

		/**
   * Creates new socket.io instance. The parameters passed to socket.io
   * constructor will be provided:
   *
   * ```javascript
   * Launchpad.url('http://domain:8080/path/a').watch({id: 'myId'}, {foo: true});
   * // Equals:
   * io('domain:8080/?url=path%2Fa%3Fid%3DmyId', {foo: true});
   * ```
   *
   * @param {Object=} opt_params Params to be sent with the Socket IO request.
   * @param {Object=} opt_options Object with Socket IO options.
   * @return {!io} Socket IO reference. Server events can be listened on it.
   */


		Launchpad.prototype.watch = function watch(opt_params, opt_options) {
			if (typeof io === 'undefined') {
				throw new Error('Socket.io client not loaded');
			}

			var clientRequest = this.createClientRequest_('GET', opt_params);
			var uri = new Uri(clientRequest.url());
			uri.addParametersFromMultiMap(clientRequest.params());

			opt_options = opt_options || {
				forceNew: true
			};
			opt_options.query = 'url=' + encodeURIComponent(uri.getPathname() + uri.getSearch());
			opt_options.path = opt_options.path || uri.getPathname();

			return io(uri.getHost(), opt_options);
		};

		/**
   * Wraps the given `Embodied` instance with a {@link Query} instance if needed.
   * @param {Embodied} embodied
   * @return {Embodied}
   * @protected
   */


		Launchpad.prototype.wrapWithQuery_ = function wrapWithQuery_(embodied) {
			if (embodied instanceof Filter) {
				embodied = Query.filter(embodied);
			}
			return embodied;
		};

		return Launchpad;
	}();

	Launchpad.isContentTypeJson = function (clientMessage) {
		var contentType = clientMessage.headers().get('content-type') || '';
		return contentType.indexOf('application/json') === 0;
	};

	/**
  * The project domain to be used on container requests.
  * @type {string}
  * @static
  */
	Launchpad.DOMAIN = null;

	this.launchpad.Launchpad = Launchpad;
}).call(this);
'use strict';

(function () {
  var Filter = this.launchpad.Filter;
  var Geo = this.launchpad.Geo;
  var Launchpad = this.launchpad.Launchpad;
  var Query = this.launchpad.Query;
  var Range = this.launchpad.Range;


  window.Filter = Filter;
  window.Geo = Geo;
  window.Query = Query;
  window.Range = Range;
  window.Launchpad = Launchpad;
}).call(this);
}).call(this);
//# sourceMappingURL=api.js.map
