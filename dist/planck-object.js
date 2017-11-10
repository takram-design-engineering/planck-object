(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three')) :
	typeof define === 'function' && define.amd ? define(['exports', 'three'], factory) :
	(factory((global.Planck = global.Planck || {}),global.THREE));
}(this, (function (exports,Three) { 'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
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









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

'use strict';

var _cachedApplicationRef = Symbol('_cachedApplicationRef');
var _mixinRef = Symbol('_mixinRef');
var _originalMixin = Symbol('_originalMixin');

/**
 * Sets the prototype of mixin to wrapper so that properties set on mixin are
 * inherited by the wrapper.
 *
 * This is needed in order to implement @@hasInstance as a decorator function.
 */
var wrap = function wrap(mixin, wrapper) {
  Object.setPrototypeOf(wrapper, mixin);
  if (!mixin[_originalMixin]) {
    mixin[_originalMixin] = mixin;
  }
  return wrapper;
};

/**
 * Decorates mixin so that it caches its applications. When applied multiple
 * times to the same superclass, mixin will only create one subclass and
 * memoize it.
 */
var Cached = function Cached(mixin) {
  return wrap(mixin, function (superclass) {
    // Get or create a symbol used to look up a previous application of mixin
    // to the class. This symbol is unique per mixin definition, so a class will have N
    // applicationRefs if it has had N mixins applied to it. A mixin will have
    // exactly one _cachedApplicationRef used to store its applications.
    var applicationRef = mixin[_cachedApplicationRef];
    if (!applicationRef) {
      applicationRef = mixin[_cachedApplicationRef] = Symbol(mixin.name);
    }
    // Look up an existing application of `mixin` to `c`, return it if found.
    if (superclass.hasOwnProperty(applicationRef)) {
      return superclass[applicationRef];
    }
    // Apply the mixin
    var application = mixin(superclass);
    // Cache the mixin application on the superclass
    superclass[applicationRef] = application;
    return application;
  });
};

/**
 * Adds @@hasInstance (ES2015 instanceof support) to mixin.
 * Note: @@hasInstance is not supported in any browsers yet.
 */
var HasInstance = function HasInstance(mixin) {
  if (Symbol.hasInstance && !mixin.hasOwnProperty(Symbol.hasInstance)) {
    Object.defineProperty(mixin, Symbol.hasInstance, {
      value: function value(o) {
        var originalMixin = this[_originalMixin];
        while (o != null) {
          if (o.hasOwnProperty(_mixinRef) && o[_mixinRef] === originalMixin) {
            return true;
          }
          o = Object.getPrototypeOf(o);
        }
        return false;
      }
    });
  }
  return mixin;
};

/**
 * A basic mixin decorator that sets up a reference from mixin applications
 * to the mixin defintion for use by other mixin decorators.
 */
var BareMixin = function BareMixin(mixin) {
  return wrap(mixin, function (superclass) {
    // Apply the mixin
    var application = mixin(superclass);

    // Attach a reference from mixin applition to wrapped mixin for RTTI
    // mixin[@@hasInstance] should use this.
    application.prototype[_mixinRef] = mixin[_originalMixin];
    return application;
  });
};

/**
 * Decorates a mixin function to add application caching and instanceof
 * support.
 */
var Mixin = function Mixin(mixin) {
  return Cached(HasInstance(BareMixin(mixin)));
};

var mix = function mix(superClass) {
  return new MixinBuilder(superClass);
};

var MixinBuilder = function () {
  function MixinBuilder(superclass) {
    classCallCheck(this, MixinBuilder);

    this.superclass = superclass;
  }

  createClass(MixinBuilder, [{
    key: 'with',
    value: function _with() {
      return Array.from(arguments).reduce(function (c, m) {
        return m(c);
      }, this.superclass);
    }
  }]);
  return MixinBuilder;
}();

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

function Namespace() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

  var symbol = Symbol(name);
  return function namespace(object) {
    var init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (data) {
      return data;
    };

    if (object[symbol] === undefined) {
      // eslint-disable-next-line no-param-reassign
      object[symbol] = init({});
    }
    return object[symbol];
  };
}

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

var environmentType = function () {
  try {
    // eslint-disable-next-line no-new-func
    if (new Function('return this === window')()) {
      return 'browser';
    }
  } catch (error) {}
  try {
    // eslint-disable-next-line no-new-func
    if (new Function('return this === self')()) {
      return 'worker';
    }
  } catch (error) {}
  try {
    // eslint-disable-next-line no-new-func
    if (new Function('return this === global')()) {
      return 'node';
    }
  } catch (error) {}
  return undefined;
}();

var environmentSelf = void 0;
switch (environmentType) {
  case 'browser':
    environmentSelf = window;
    break;
  case 'worker':
    // eslint-disable-next-line no-restricted-globals
    environmentSelf = self;
    break;
  case 'node':
    environmentSelf = global;
    break;
  default:
    break;
}

var Environment = {
  type: environmentType,
  self: environmentSelf
};

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

var internal$1 = Namespace('Event');

var Event = function () {
  function Event() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, Event);

    this.init(options);
  }

  createClass(Event, [{
    key: 'init',
    value: function init() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          type = _ref.type,
          _ref$captures = _ref.captures,
          captures = _ref$captures === undefined ? false : _ref$captures,
          _ref$bubbles = _ref.bubbles,
          bubbles = _ref$bubbles === undefined ? true : _ref$bubbles,
          _ref$cancelable = _ref.cancelable,
          cancelable = _ref$cancelable === undefined ? true : _ref$cancelable;

      var scope = internal$1(this);
      scope.type = type !== undefined ? type : null;
      scope.captures = !!captures;
      scope.bubbles = !!bubbles;
      scope.cancelable = !!cancelable;
      scope.timeStamp = Environment.self.performance && Environment.self.performance.now && Environment.self.performance.now() || Date.now();
      scope.propagationStopped = false;
      scope.immediatePropagationStopped = false;
      scope.defaultPrevented = false;
      scope.target = null;
      scope.currentTarget = null;
      scope.eventPhase = null;
      return this;
    }
  }, {
    key: 'stopPropagation',
    value: function stopPropagation() {
      var scope = internal$1(this);
      scope.propagationStopped = true;
    }
  }, {
    key: 'stopImmediatePropagation',
    value: function stopImmediatePropagation() {
      var scope = internal$1(this);
      scope.propagationStopped = true;
      scope.immediatePropagationStopped = true;
    }
  }, {
    key: 'preventDefault',
    value: function preventDefault() {
      if (this.cancelable) {
        var scope = internal$1(this);
        scope.defaultPrevented = true;
      }
    }
  }, {
    key: 'type',
    get: function get$$1() {
      var scope = internal$1(this);
      return scope.type;
    }
  }, {
    key: 'target',
    get: function get$$1() {
      var scope = internal$1(this);
      return scope.target;
    }
  }, {
    key: 'currentTarget',
    get: function get$$1() {
      var scope = internal$1(this);
      return scope.currentTarget;
    }
  }, {
    key: 'eventPhase',
    get: function get$$1() {
      var scope = internal$1(this);
      return scope.eventPhase;
    }
  }, {
    key: 'captures',
    get: function get$$1() {
      var scope = internal$1(this);
      return scope.captures;
    }
  }, {
    key: 'bubbles',
    get: function get$$1() {
      var scope = internal$1(this);
      return scope.bubbles;
    }
  }, {
    key: 'cancelable',
    get: function get$$1() {
      var scope = internal$1(this);
      return scope.cancelable;
    }
  }, {
    key: 'timeStamp',
    get: function get$$1() {
      var scope = internal$1(this);
      return scope.timeStamp;
    }
  }, {
    key: 'propagationStopped',
    get: function get$$1() {
      var scope = internal$1(this);
      return scope.propagationStopped;
    }
  }, {
    key: 'immediatePropagationStopped',
    get: function get$$1() {
      var scope = internal$1(this);
      return scope.immediatePropagationStopped;
    }
  }, {
    key: 'defaultPrevented',
    get: function get$$1() {
      var scope = internal$1(this);
      return scope.defaultPrevented;
    }
  }]);
  return Event;
}();

function modifyEvent(event) {
  var scope = internal$1(event);
  return {
    set target(value) {
      scope.target = value !== undefined ? value : null;
    },

    set currentTarget(value) {
      scope.currentTarget = value !== undefined ? value : null;
    },

    set eventPhase(value) {
      scope.eventPhase = value !== undefined ? value : null;
    }
  };
}

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

var CustomEvent = function (_Event) {
  inherits(CustomEvent, _Event);

  function CustomEvent() {
    classCallCheck(this, CustomEvent);
    return possibleConstructorReturn(this, (CustomEvent.__proto__ || Object.getPrototypeOf(CustomEvent)).apply(this, arguments));
  }

  createClass(CustomEvent, [{
    key: 'init',
    value: function init() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var type = _ref.type,
          target = _ref.target,
          rest = objectWithoutProperties(_ref, ['type', 'target']);

      get(CustomEvent.prototype.__proto__ || Object.getPrototypeOf(CustomEvent.prototype), 'init', this).call(this, _extends({ type: type }, rest));
      // Support target as a parameter
      modifyEvent(this).target = target !== undefined ? target : null;
      return this;
    }
  }]);
  return CustomEvent;
}(Event);

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

var GenericEvent = function (_CustomEvent) {
  inherits(GenericEvent, _CustomEvent);

  function GenericEvent() {
    classCallCheck(this, GenericEvent);
    return possibleConstructorReturn(this, (GenericEvent.__proto__ || Object.getPrototypeOf(GenericEvent)).apply(this, arguments));
  }

  createClass(GenericEvent, [{
    key: 'init',
    value: function init() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var type = _ref.type,
          target = _ref.target,
          _ref$captures = _ref.captures,
          captures = _ref$captures === undefined ? false : _ref$captures,
          _ref$bubbles = _ref.bubbles,
          bubbles = _ref$bubbles === undefined ? false : _ref$bubbles,
          rest = objectWithoutProperties(_ref, ['type', 'target', 'captures', 'bubbles']);

      get(GenericEvent.prototype.__proto__ || Object.getPrototypeOf(GenericEvent.prototype), 'init', this).call(this, { type: type, target: target, captures: captures, bubbles: bubbles });
      var names = Object.keys(rest);
      for (var i = 0; i < names.length; ++i) {
        var name = names[i];
        if (!{}.hasOwnProperty.call(this, name)) {
          this[name] = rest[name];
        } else {
          throw new Error('Name "' + name + '" cannot be used for event property');
        }
      }
      return this;
    }
  }]);
  return GenericEvent;
}(CustomEvent);

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

var internal = Namespace('EventDispatcherMixin');

function handleEvent(event, listener) {
  if (typeof listener === 'function') {
    listener(event);
  } else if (typeof listener.handleEvent === 'function') {
    listener.handleEvent(event);
  } else {
    throw new Error('Listener is neither function nor event listener');
  }
}

// eslint-disable-next-line arrow-parens
var EventDispatcherMixin = Mixin(function (S) {
  return function (_S) {
    inherits(EventDispatcherMixin, _S);

    function EventDispatcherMixin() {
      var _ref;

      classCallCheck(this, EventDispatcherMixin);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var _this = possibleConstructorReturn(this, (_ref = EventDispatcherMixin.__proto__ || Object.getPrototypeOf(EventDispatcherMixin)).call.apply(_ref, [this].concat(args)));

      var scope = internal(_this);
      scope.listeners = {};
      return _this;
    }

    createClass(EventDispatcherMixin, [{
      key: 'addEventListener',
      value: function addEventListener(type, listener) {
        var capture = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        if (typeof listener !== 'function' && (typeof listener === 'undefined' ? 'undefined' : _typeof(listener)) !== 'object') {
          throw new Error('Attempt to add non-function non-object listener');
        }
        var scope = internal(this);
        if (scope.listeners[type] === undefined) {
          scope.listeners[type] = { bubble: [], capture: [] };
        }
        var listeners = capture ? scope.listeners[type].capture : scope.listeners[type].bubble;
        if (listeners.includes(listener)) {
          return;
        }
        listeners.push(listener);
      }
    }, {
      key: 'removeEventListener',
      value: function removeEventListener(type, listener) {
        var capture = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        var scope = internal(this);
        if (scope.listeners[type] === undefined) {
          return;
        }
        var listeners = capture ? scope.listeners[type].capture : scope.listeners[type].bubble;
        var index = listeners.indexOf(listener);
        if (index !== -1) {
          listeners.splice(index, 1);
        }
      }
    }, {
      key: 'on',
      value: function on() {
        this.addEventListener.apply(this, arguments);
        return this;
      }
    }, {
      key: 'off',
      value: function off() {
        this.removeEventListener.apply(this, arguments);
        return this;
      }
    }, {
      key: 'once',
      value: function once(type, listener) {
        for (var _len2 = arguments.length, rest = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          rest[_key2 - 2] = arguments[_key2];
        }

        var _this2 = this;

        var delegate = function delegate(event) {
          handleEvent(event, listener);
          _this2.removeEventListener.apply(_this2, [type, delegate].concat(rest));
        };
        this.addEventListener.apply(this, [type, delegate].concat(rest));
        return this;
      }
    }, {
      key: 'dispatchEvent',
      value: function dispatchEvent(object) {
        var event = object;
        if (!(event instanceof Event)) {
          event = new GenericEvent(object);
        }
        var modifier = modifyEvent(event);

        // Set target to this when it's not set
        if (event.target === null) {
          modifier.target = this;
        }
        // Current target should be always this
        modifier.currentTarget = this;

        var scope = internal(this);
        var listeners = scope.listeners[event.type];
        if (listeners === undefined) {
          return;
        }
        var eventPhase = event.eventPhase;
        if (!eventPhase || eventPhase === 'target' || eventPhase === 'capture') {
          for (var i = 0; i < listeners.capture.length; ++i) {
            handleEvent(event, listeners.capture[i]);
            if (event.immediatePropagationStopped) {
              return;
            }
          }
        }
        if (!eventPhase || eventPhase === 'target' || eventPhase === 'bubble') {
          for (var _i = 0; _i < listeners.bubble.length; ++_i) {
            handleEvent(event, listeners.bubble[_i]);
            if (event.immediatePropagationStopped) {
              return;
            }
          }
        }
      }
    }]);
    return EventDispatcherMixin;
  }(S);
});

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

var internal$2 = Namespace('EventTargetMixin');

// eslint-disable-next-line arrow-parens
var EventTargetMixin = Mixin(function (S) {
  return function (_S) {
    inherits(EventTargetMixin, _S);

    function EventTargetMixin() {
      var _ref;

      classCallCheck(this, EventTargetMixin);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var _this = possibleConstructorReturn(this, (_ref = EventTargetMixin.__proto__ || Object.getPrototypeOf(EventTargetMixin)).call.apply(_ref, [this].concat(args)));

      var scope = internal$2(_this);
      scope.ancestorEventTarget = null;
      scope.descendantEventTarget = null;
      return _this;
    }

    createClass(EventTargetMixin, [{
      key: 'determinePropagationPath',
      value: function determinePropagationPath() {
        var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        var path = [];
        if (target !== null && target !== undefined) {
          var ancestor = target;
          while (ancestor !== null && ancestor !== undefined) {
            path.unshift(ancestor);
            ancestor = ancestor.ancestorEventTarget;
            if (path.includes(ancestor)) {
              break;
            }
          }
        } else {
          var descendant = this;
          while (descendant !== null && descendant !== undefined) {
            path.push(descendant);
            descendant = descendant.descendantEventTarget;
            if (path.includes(descendant)) {
              break;
            }
          }
        }
        return path;
      }
    }, {
      key: 'dispatchImmediateEvent',
      value: function dispatchImmediateEvent(event) {
        get(EventTargetMixin.prototype.__proto__ || Object.getPrototypeOf(EventTargetMixin.prototype), 'dispatchEvent', this).call(this, event);
      }
    }, {
      key: 'dispatchEvent',
      value: function dispatchEvent(object) {
        var propagationPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        var event = object;
        if (!(event instanceof Event)) {
          event = new GenericEvent(object);
        }
        var modifier = modifyEvent(event);

        // Just dispatch the event if it doesn't capture nor bubble
        if (!event.captures && !event.bubbles) {
          this.dispatchImmediateEvent(event);
          return;
        }

        // Determine the propagation path of this event
        var path = void 0;
        if (Array.isArray(propagationPath)) {
          path = [].concat(toConsumableArray(propagationPath));
        } else {
          path = this.determinePropagationPath(event.target || this);
        }

        // The last item in the propagation path must always be the event target
        if (event.target === null) {
          modifier.target = path.pop();
        } else {
          path.pop();
        }

        // Capturing event phase
        if (event.captures) {
          modifier.eventPhase = 'capture';
          for (var i = 0; i < path.length; ++i) {
            path[i].dispatchImmediateEvent(event);
            if (event.propagationStopped) {
              return;
            }
          }
        }

        // Target event phase. The target can be an integer if the parent target has
        // multiple identifiers, typically when picking an instanced geometry.
        if (!Number.isInteger(event.target)) {
          modifier.eventPhase = 'target';
          event.target.dispatchImmediateEvent(event);
          if (event.propagationStopped) {
            return;
          }
        }

        // Bubbling event phase
        if (event.bubbles) {
          modifier.eventPhase = 'bubble';
          for (var _i = path.length - 1; _i >= 0; --_i) {
            path[_i].dispatchImmediateEvent(event);
            if (event.propagationStopped) {
              return;
            }
          }
        }
      }
    }, {
      key: 'ancestorEventTarget',
      get: function get$$1() {
        var scope = internal$2(this);
        return scope.ancestorEventTarget;
      },
      set: function set$$1(value) {
        var scope = internal$2(this);
        scope.ancestorEventTarget = value !== undefined ? value : null;
      }
    }, {
      key: 'descendantEventTarget',
      get: function get$$1() {
        var scope = internal$2(this);
        return scope.descendantEventTarget;
      },
      set: function set$$1(value) {
        var scope = internal$2(this);
        scope.descendantEventTarget = value !== undefined ? value : null;
      }
    }]);
    return EventTargetMixin;
  }(S);
});

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

var internal$3 = Namespace('SceneGraphMixin');

var SceneGraphMixin = Mixin(function (S) {
  return function (_S) {
    inherits(SceneGraphMixin, _S);

    function SceneGraphMixin() {
      var _ref;

      classCallCheck(this, SceneGraphMixin);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var _this = possibleConstructorReturn(this, (_ref = SceneGraphMixin.__proto__ || Object.getPrototypeOf(SceneGraphMixin)).call.apply(_ref, [this].concat(args)));

      var scope = internal$3(_this);
      scope.setup = false;
      scope.disposed = false;
      scope.scene = null;
      return _this;
    }

    createClass(SceneGraphMixin, [{
      key: 'setup',
      value: function setup() {
        var scope = internal$3(this);
        scope.setup = true;
      }
    }, {
      key: 'dispose',
      value: function dispose() {
        // Remove from its parent if exists
        if (this.parent) {
          this.parent.remove(this);
        }
      }
    }, {
      key: 'addedToParent',
      value: function addedToParent(parent) {
        var scope = internal$3(this);
        if (!scope.setup) {
          this.setup();
          scope.setup = true;
        }
        if (parent instanceof Three.Scene) {
          this.addedToScene(parent);
          this.dispatchEvent({
            type: 'addedToScene',
            scene: parent
          });
        } else if (parent !== null && parent.scene !== null) {
          this.addedToScene(parent.scene);
          this.dispatchEvent({
            type: 'addedToScene',
            scene: parent.scene
          });
        }
      }
    }, {
      key: 'addedToScene',
      value: function addedToScene(scene) {
        var scope = internal$3(this);
        scope.scene = scene;
        for (var i = 0; i < this.children.length; ++i) {
          var child = this.children[i];
          child.addedToScene(scene);
          child.dispatchEvent({
            type: 'addedToScene',
            scene: scene
          });
        }
      }
    }, {
      key: 'removedFromParent',
      value: function removedFromParent(parent) {
        var scope = internal$3(this);
        scope.scene = null;
        if (parent instanceof Three.Scene) {
          this.removedFromScene(parent);
          this.dispatchEvent({
            type: 'removedFromScene',
            scene: parent
          });
        } else if (parent !== null && parent.scene !== null) {
          this.removedFromScene(parent.scene);
          this.dispatchEvent({
            type: 'removedFromScene',
            scene: parent.scene
          });
        }
      }
    }, {
      key: 'removedFromScene',
      value: function removedFromScene(scene) {
        for (var i = 0; i < this.children.length; ++i) {
          var child = this.children[i];
          child.removedFromScene(scene);
          child.dispatchEvent({
            type: 'removedFromScene',
            scene: scene
          });
        }
      }
    }, {
      key: 'dispatchEvent',
      value: function dispatchEvent(event) {
        var _babelHelpers$get;

        // Add `to` property to the event
        if (event.type === 'added' && !event.to) {
          var scope = internal$3(this);
          this.addedToParent(this.parent);
          get(SceneGraphMixin.prototype.__proto__ || Object.getPrototypeOf(SceneGraphMixin.prototype), 'dispatchEvent', this).call(this, { type: 'added', parent: this.parent });
          get(SceneGraphMixin.prototype.__proto__ || Object.getPrototypeOf(SceneGraphMixin.prototype), 'dispatchEvent', this).call(this, { type: 'addedToParent', parent: this.parent });
          scope.parent = this.parent;
          return;
        }
        // Add `from` property to the event
        if (event.type === 'removed' && !event.from) {
          var _scope = internal$3(this);
          this.removedFromParent(_scope.parent);
          get(SceneGraphMixin.prototype.__proto__ || Object.getPrototypeOf(SceneGraphMixin.prototype), 'dispatchEvent', this).call(this, { type: 'removed', parent: _scope.parent });
          get(SceneGraphMixin.prototype.__proto__ || Object.getPrototypeOf(SceneGraphMixin.prototype), 'dispatchEvent', this).call(this, { type: 'removedFromParent', parent: _scope.parent });
          delete _scope.parent;
          return;
        }

        for (var _len2 = arguments.length, rest = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          rest[_key2 - 1] = arguments[_key2];
        }

        (_babelHelpers$get = get(SceneGraphMixin.prototype.__proto__ || Object.getPrototypeOf(SceneGraphMixin.prototype), 'dispatchEvent', this)).call.apply(_babelHelpers$get, [this, event].concat(rest));
      }
    }, {
      key: 'ancestorEventTarget',
      get: function get$$1() {
        return this.parent || get(SceneGraphMixin.prototype.__proto__ || Object.getPrototypeOf(SceneGraphMixin.prototype), 'ancestorEventTarget', this);
      },
      set: function set$$1(value) {
        set(SceneGraphMixin.prototype.__proto__ || Object.getPrototypeOf(SceneGraphMixin.prototype), 'ancestorEventTarget', value, this);
      }
    }, {
      key: 'scene',
      get: function get$$1() {
        var scope = internal$3(this);
        return scope.scene;
      }
    }]);
    return SceneGraphMixin;
  }(S);
});

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

var Group$1 = function (_mix$with) {
  inherits(Group$$1, _mix$with);

  function Group$$1() {
    classCallCheck(this, Group$$1);
    return possibleConstructorReturn(this, (Group$$1.__proto__ || Object.getPrototypeOf(Group$$1)).apply(this, arguments));
  }

  return Group$$1;
}(mix(Three.Group).with(EventDispatcherMixin, EventTargetMixin, SceneGraphMixin));

var depth_frag_begin = "#define GLSLIFY 1\n// The MIT License\n// Copyright (C) 2010-2017 three.js authors\n// Copyright (C) 2016-Present Shota Matsuda\n\n// r87\n// depth_frag.glsl\n\n#include <clipping_planes_fragment>\n\nvec4 diffuseColor = vec4(1.0);\n\n#if DEPTH_PACKING == 3200\n  diffuseColor.a = opacity;\n#endif\n";

var depth_frag_end = "#define GLSLIFY 1\n// The MIT License\n// Copyright (C) 2010-2017 three.js authors\n// Copyright (C) 2016-Present Shota Matsuda\n\n// r87\n// depth_frag.glsl\n\n#include <map_fragment>\n#include <alphamap_fragment>\n#include <alphatest_fragment>\n#include <logdepthbuf_fragment>\n\n#if DEPTH_PACKING == 3200\n  gl_FragColor = vec4(vec3(gl_FragCoord.z), opacity);\n#elif DEPTH_PACKING == 3201\n  gl_FragColor = packDepthToRGBA(gl_FragCoord.z);\n#endif\n";

var depth_frag_params = "#define GLSLIFY 1\n// The MIT License\n// Copyright (C) 2010-2017 three.js authors\n// Copyright (C) 2016-Present Shota Matsuda\n\n// r87\n// depth_frag.glsl\n\n#if DEPTH_PACKING == 3200\n  uniform float opacity;\n#endif\n\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n";

var depth_vert_begin = "#define GLSLIFY 1\n// The MIT License\n// Copyright (C) 2010-2017 three.js authors\n// Copyright (C) 2016-Present Shota Matsuda\n\n// r87\n// depth_vert.glsl\n\n#include <uv_vertex>\n#include <skinbase_vertex>\n#ifdef USE_DISPLACEMENTMAP\n  #include <beginnormal_vertex>\n  #include <morphnormal_vertex>\n  #include <skinnormal_vertex>\n#endif\n#include <begin_vertex>\n";

var depth_vert_end = "#define GLSLIFY 1\n// The MIT License\n// Copyright (C) 2016-Present Shota Matsuda\n\n// r87\n// depth_vert.glsl\n\n#include <morphtarget_vertex>\n#include <skinning_vertex>\n#include <displacementmap_vertex>\n#include <project_vertex>\n#include <logdepthbuf_vertex>\n#include <clipping_planes_vertex>\n";

var depth_vert_params = "#define GLSLIFY 1\n// The MIT License\n// Copyright (C) 2010-2017 three.js authors\n// Copyright (C) 2016-Present Shota Matsuda\n\n// r87\n// depth_vert.glsl\n\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n";

var distance_frag_begin = "#define GLSLIFY 1\n// The MIT License\n// Copyright (C) 2010-2017 three.js authors\n// Copyright (C) 2016-Present Shota Matsuda\n\n// r87\n// distanceRGBA_frag.glsl\n\n#include <clipping_planes_fragment>\n\nvec4 diffuseColor = vec4(1.0);\n\n#include <map_fragment>\n#include <alphamap_fragment>\n#include <alphatest_fragment>\n\nfloat dist = length(vWorldPosition - referencePosition);\ndist = (dist - nearDistance) / (farDistance - nearDistance);\ndist = saturate(dist); // clamp to [0, 1]\n";

var distance_frag_end = "#define GLSLIFY 1\n// The MIT License\n// Copyright (C) 2010-2017 three.js authors\n// Copyright (C) 2016-Present Shota Matsuda\n\n// r87\n// distanceRGBA_frag.glsl\n\ngl_FragColor = packDepthToRGBA(dist);\n";

var distance_frag_params = "#define GLSLIFY 1\n// The MIT License\n// Copyright (C) 2010-2017 three.js authors\n// Copyright (C) 2016-Present Shota Matsuda\n\n// r87\n// distanceRGBA_frag.glsl\n\n#define DISTANCE\n\nuniform vec3 referencePosition;\nuniform float nearDistance;\nuniform float farDistance;\nvarying vec3 vWorldPosition;\n\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <clipping_planes_pars_fragment>\n";

var distance_vert_begin = "#define GLSLIFY 1\n// The MIT License\n// Copyright (C) 2010-2017 three.js authors\n// Copyright (C) 2016-Present Shota Matsuda\n\n// r87\n// distanceRGBA_vert.glsl\n\n#include <uv_vertex>\n#include <skinbase_vertex>\n#ifdef USE_DISPLACEMENTMAP\n  #include <beginnormal_vertex>\n  #include <morphnormal_vertex>\n  #include <skinnormal_vertex>\n#endif\n#include <begin_vertex>\n";

var distance_vert_end = "#define GLSLIFY 1\n// The MIT License\n// Copyright (C) 2010-2017 three.js authors\n// Copyright (C) 2016-Present Shota Matsuda\n\n// r87\n// distanceRGBA_vert.glsl\n\n#include <morphtarget_vertex>\n#include <skinning_vertex>\n#include <displacementmap_vertex>\n#include <project_vertex>\n#include <worldpos_vertex>\n#include <clipping_planes_vertex>\n\nvWorldPosition = worldPosition.xyz;\n";

var distance_vert_params = "#define GLSLIFY 1\n// The MIT License\n// Copyright (C) 2010-2017 three.js authors\n// Copyright (C) 2016-Present Shota Matsuda\n\n// r87\n// distanceRGBA_vert.glsl\n\n#define DISTANCE\n\nvarying vec4 vWorldPosition;\n\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\n";

var line_basic_frag_begin = "#define GLSLIFY 1\n// The MIT License\n// Copyright (C) 2010-2017 three.js authors\n// Copyright (C) 2016-Present Shota Matsuda\n\n// r87\n// linedashed_frag.glsl\n\n#include <clipping_planes_fragment>\n\nvec3 outgoingLight = vec3(0.0);\nvec4 diffuseColor = vec4(diffuse, opacity);\n";

var line_basic_frag_end = "#define GLSLIFY 1\n// The MIT License\n// Copyright (C) 2010-2017 three.js authors\n// Copyright (C) 2016-Present Shota Matsuda\n\n// r87\n// linedashed_frag.glsl\n\n#include <logdepthbuf_fragment>\n#include <color_fragment>\n\noutgoingLight = diffuseColor.rgb; // simple shader\n\ngl_FragColor = vec4(outgoingLight, diffuseColor.a);\n\n#include <premultiplied_alpha_fragment>\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n#include <fog_fragment>\n";

var line_basic_frag_params = "#define GLSLIFY 1\n// The MIT License\n// Copyright (C) 2010-2017 three.js authors\n// Copyright (C) 2016-Present Shota Matsuda\n\n// r87\n// linedashed_frag.glsl\n\nuniform vec3 diffuse;\nuniform float opacity;\n\n#include <common>\n#include <color_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n";

var line_basic_vert_begin = "#define GLSLIFY 1\n// The MIT License\n// Copyright (C) 2010-2017 three.js authors\n// Copyright (C) 2016-Present Shota Matsuda\n\n// r87\n// linedashed_vert.glsl\n\n#include <color_vertex>\n#include <begin_vertex>\n";

var line_basic_vert_end = "#define GLSLIFY 1\n// The MIT License\n// Copyright (C) 2010-2017 three.js authors\n// Copyright (C) 2016-Present Shota Matsuda\n\n// r87\n// linedashed_vert.glsl\n\n#include <project_vertex>\n#include <logdepthbuf_vertex>\n#include <clipping_planes_vertex>\n";

var line_basic_vert_params = "#define GLSLIFY 1\n// The MIT License\n// Copyright (C) 2010-2017 three.js authors\n// Copyright (C) 2016-Present Shota Matsuda\n\n// r87\n// linedashed_vert.glsl\n\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n";

var mesh_lambert_frag_begin = "#define GLSLIFY 1\n// The MIT License\n// Copyright (C) 2010-2017 three.js authors\n// Copyright (C) 2016-Present Shota Matsuda\n\n// r87\n// meshlambert_frag.glsl\n\n#include <clipping_planes_fragment>\n\nvec4 diffuseColor = vec4(diffuse, opacity);\nReflectedLight reflectedLight = ReflectedLight(vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0));\nvec3 totalEmissiveRadiance = emissive;\n";

var mesh_lambert_frag_end = "#define GLSLIFY 1\n// The MIT License\n// Copyright (C) 2010-2017 three.js authors\n// Copyright (C) 2016-Present Shota Matsuda\n\n// r87\n// meshlambert_frag.glsl\n\n#include <logdepthbuf_fragment>\n#include <map_fragment>\n#include <color_fragment>\n#include <alphamap_fragment>\n#include <alphatest_fragment>\n#include <specularmap_fragment>\n#include <emissivemap_fragment>\n\n// accumulation\nreflectedLight.indirectDiffuse = getAmbientLightIrradiance(ambientLightColor);\n\n#include <lightmap_fragment>\n\nreflectedLight.indirectDiffuse *= BRDF_Diffuse_Lambert(diffuseColor.rgb);\n\n#ifdef DOUBLE_SIDED\n  reflectedLight.directDiffuse = (gl_FrontFacing) ? vLightFront : vLightBack;\n#else\n  reflectedLight.directDiffuse = vLightFront;\n#endif\n\nreflectedLight.directDiffuse *= BRDF_Diffuse_Lambert(diffuseColor.rgb) * getShadowMask();\n\n// modulation\n#include <aomap_fragment>\n\nvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\n#include <envmap_fragment>\n\ngl_FragColor = vec4(outgoingLight, diffuseColor.a);\n\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n#include <fog_fragment>\n#include <premultiplied_alpha_fragment>\n#include <dithering_fragment>\n";

var mesh_lambert_frag_params = "#define GLSLIFY 1\n// The MIT License\n// Copyright (C) 2010-2017 three.js authors\n// Copyright (C) 2016-Present Shota Matsuda\n\n// r87\n// meshlambert_frag.glsl\n\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\n  varying vec3 vLightBack;\n#endif\n\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <bsdfs>\n#include <lights_pars>\n#include <fog_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n";

var mesh_lambert_vert_begin = "#define GLSLIFY 1\n// The MIT License\n// Copyright (C) 2010-2017 three.js authors\n// Copyright (C) 2016-Present Shota Matsuda\n\n// r87\n// meshlambert_vert.glsl\n\n#include <uv_vertex>\n#include <uv2_vertex>\n#include <color_vertex>\n#include <beginnormal_vertex>\n#include <morphnormal_vertex>\n#include <skinbase_vertex>\n#include <skinnormal_vertex>\n#include <defaultnormal_vertex>\n#include <begin_vertex>\n";

var mesh_lambert_vert_end = "#define GLSLIFY 1\n// The MIT License\n// Copyright (C) 2010-2017 three.js authors\n// Copyright (C) 2016-Present Shota Matsuda\n\n// r87\n// meshlambert_vert.glsl\n\n#include <morphtarget_vertex>\n#include <skinning_vertex>\n#include <project_vertex>\n#include <logdepthbuf_vertex>\n#include <clipping_planes_vertex>\n#include <worldpos_vertex>\n#include <envmap_vertex>\n#include <lights_lambert_vertex>\n#include <shadowmap_vertex>\n#include <fog_vertex>\n";

var mesh_lambert_vert_params = "#define GLSLIFY 1\n// The MIT License\n// Copyright (C) 2010-2017 three.js authors\n// Copyright (C) 2016-Present Shota Matsuda\n\n// r87\n// meshlambert_vert.glsl\n\n#define LAMBERT\n\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\n  varying vec3 vLightBack;\n#endif\n\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <bsdfs>\n#include <lights_pars>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n";

var picking_frag_begin = "#define GLSLIFY 1\n// The MIT License\n// Copyright (C) 2016-Present Shota Matsuda\n\n#include <clipping_planes_fragment>\n\ngl_FragColor = identifier;\n";

var picking_frag_end = "#define GLSLIFY 1\n// The MIT License\n// Copyright (C) 2016-Present Shota Matsuda\n\n#include <logdepthbuf_fragment>\n";

var picking_frag_params = "#define GLSLIFY 1\n// The MIT License\n// Copyright (C) 2016-Present Shota Matsuda\n\nuniform vec4 identifier;\n\n#include <common>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n";

var picking_vert_begin = "#define GLSLIFY 1\n// The MIT License\n// Copyright (C) 2016-Present Shota Matsuda\n\n#include <skinbase_vertex>\n#include <begin_vertex>\n";

var picking_vert_end = "#define GLSLIFY 1\n// The MIT License\n// Copyright (C) 2016-Present Shota Matsuda\n\n#include <morphtarget_vertex>\n#include <skinning_vertex>\n#include <project_vertex>\n#include <logdepthbuf_vertex>\n#include <worldpos_vertex>\n#include <clipping_planes_vertex>\n";

var picking_vert_params = "#define GLSLIFY 1\n// The MIT License\n// Copyright (C) 2016-Present Shota Matsuda\n\n#include <common>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n";

var points_frag_begin = "#define GLSLIFY 1\n// The MIT License\n// Copyright (C) 2010-2017 three.js authors\n// Copyright (C) 2016-Present Shota Matsuda\n\n// r87\n// points_frag.glsl\n\n#include <clipping_planes_fragment>\n\nvec3 outgoingLight = vec3(0.0);\nvec4 diffuseColor = vec4(diffuse, opacity);\n";

var points_frag_end = "#define GLSLIFY 1\n// The MIT License\n// Copyright (C) 2010-2017 three.js authors\n// Copyright (C) 2016-Present Shota Matsuda\n\n// r87\n// points_frag.glsl\n\n#include <logdepthbuf_fragment>\n#include <map_particle_fragment>\n#include <color_fragment>\n#include <alphatest_fragment>\n\noutgoingLight = diffuseColor.rgb;\n\ngl_FragColor = vec4(outgoingLight, diffuseColor.a);\n\n#include <premultiplied_alpha_fragment>\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n#include <fog_fragment>\n";

var points_frag_params = "#define GLSLIFY 1\n// The MIT License\n// Copyright (C) 2010-2017 three.js authors\n// Copyright (C) 2016-Present Shota Matsuda\n\n// r87\n// points_frag.glsl\n\nuniform vec3 diffuse;\nuniform float opacity;\n\n#include <common>\n#include <packing>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <fog_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n";

var points_picking_frag_begin = "#define GLSLIFY 1\n// The MIT License\n// Copyright (C) 2016-Present Shota Matsuda\n\n#include <clipping_planes_fragment>\n\ngl_FragColor = vVertexID;\n";

var points_picking_frag_end = "#define GLSLIFY 1\n// The MIT License\n// Copyright (C) 2016-Present Shota Matsuda\n\n#include <logdepthbuf_fragment>\n";

var points_picking_frag_params = "#define GLSLIFY 1\n// The MIT License\n// Copyright (C) 2016-Present Shota Matsuda\n\n#include <common>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvarying vec4 vVertexID;\n";

var points_picking_vert_begin = "#define GLSLIFY 1\n// The MIT License\n// Copyright (C) 2016-Present Shota Matsuda\n\n#include <begin_vertex>\n";

var points_picking_vert_end = "#define GLSLIFY 1\n// The MIT License\n// Copyright (C) 2016-Present Shota Matsuda\n\n#include <project_vertex>\n\n#ifdef USE_SIZEATTENUATION\n  gl_PointSize = size * (scale / -mvPosition.z);\n#else\n  gl_PointSize = size;\n#endif\n\n{\n  // Add 1 to distinguish points draw or not\n  vec4 v = decomposeVertexID(vertexID + 1.0);\n  vVertexID = addVertexID(identifier, v) / 255.0;\n}\n\n#include <logdepthbuf_vertex>\n#include <clipping_planes_vertex>\n#include <worldpos_vertex>\n";

var points_picking_vert_params = "#define GLSLIFY 1\n// The MIT License\n// Copyright (C) 2016-Present Shota Matsuda\n\nuniform float size;\nuniform float scale;\n\n#include <common>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nuniform vec4 identifier;\n\nattribute float vertexID;\n\nvarying vec4 vVertexID;\n\nvec4 decomposeVertexID(float v) {\n  float x = floor(v / 16777216.0);\n  v -= x * 16777216.0;\n  float y = floor(v / 65536.0);\n  v -= y * 65536.0;\n  float z = floor(v / 256.0);\n  v -= z * 256.0;\n  return vec4(x, y, z, v);\n}\n\nvec4 addVertexID(vec4 v, vec4 id) {\n  vec4 r = floor(v * 255.0 + 0.5) + id;\n  r.z += floor(r.w / 256.0);\n  r.y += floor(r.z / 256.0);\n  r.x += floor(r.y / 256.0);\n  return mod(r, 256.0);\n}\n";

var points_vert_begin = "#define GLSLIFY 1\n// The MIT License\n// Copyright (C) 2010-2017 three.js authors\n// Copyright (C) 2016-Present Shota Matsuda\n\n// r87\n// points_vert.glsl\n\n#include <color_vertex>\n#include <begin_vertex>\n";

var points_vert_end = "#define GLSLIFY 1\n// The MIT License\n// Copyright (C) 2010-2017 three.js authors\n// Copyright (C) 2016-Present Shota Matsuda\n\n// r87\n// points_vert.glsl\n\n#include <project_vertex>\n\n#ifdef USE_SIZEATTENUATION\n  gl_PointSize = size * (scale / -mvPosition.z);\n#else\n  gl_PointSize = size;\n#endif\n\n#include <logdepthbuf_vertex>\n#include <clipping_planes_vertex>\n#include <worldpos_vertex>\n#include <shadowmap_vertex>\n#include <fog_vertex>\n";

var points_vert_params = "#define GLSLIFY 1\n// The MIT License\n// Copyright (C) 2010-2017 three.js authors\n// Copyright (C) 2016-Present Shota Matsuda\n\n// r87\n// points_vert.glsl\n\nuniform float size;\nuniform float scale;\n\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n";

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

/* eslint-disable camelcase */

var ShaderLib$1 = {
  depth_frag_begin: depth_frag_begin,
  depth_frag_end: depth_frag_end,
  depth_frag_params: depth_frag_params,
  depth_vert_begin: depth_vert_begin,
  depth_vert_end: depth_vert_end,
  depth_vert_params: depth_vert_params,
  distance_frag_begin: distance_frag_begin,
  distance_frag_end: distance_frag_end,
  distance_frag_params: distance_frag_params,
  distance_vert_begin: distance_vert_begin,
  distance_vert_end: distance_vert_end,
  distance_vert_params: distance_vert_params,
  line_basic_frag_begin: line_basic_frag_begin,
  line_basic_frag_end: line_basic_frag_end,
  line_basic_frag_params: line_basic_frag_params,
  line_basic_vert_begin: line_basic_vert_begin,
  line_basic_vert_end: line_basic_vert_end,
  line_basic_vert_params: line_basic_vert_params,
  mesh_lambert_frag_begin: mesh_lambert_frag_begin,
  mesh_lambert_frag_end: mesh_lambert_frag_end,
  mesh_lambert_frag_params: mesh_lambert_frag_params,
  mesh_lambert_vert_begin: mesh_lambert_vert_begin,
  mesh_lambert_vert_end: mesh_lambert_vert_end,
  mesh_lambert_vert_params: mesh_lambert_vert_params,
  picking_frag_begin: picking_frag_begin,
  picking_frag_end: picking_frag_end,
  picking_frag_params: picking_frag_params,
  picking_vert_begin: picking_vert_begin,
  picking_vert_end: picking_vert_end,
  picking_vert_params: picking_vert_params,
  points_frag_begin: points_frag_begin,
  points_frag_end: points_frag_end,
  points_frag_params: points_frag_params,
  points_picking_frag_begin: points_picking_frag_begin,
  points_picking_frag_end: points_picking_frag_end,
  points_picking_frag_params: points_picking_frag_params,
  points_picking_vert_begin: points_picking_vert_begin,
  points_picking_vert_end: points_picking_vert_end,
  points_picking_vert_params: points_picking_vert_params,
  points_vert_begin: points_vert_begin,
  points_vert_end: points_vert_end,
  points_vert_params: points_vert_params
};

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

var Shader = {
  include: function include(source) {
    var includes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ShaderLib$1;
    var scope = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'planck/';

    var pattern = new RegExp('#include +<' + scope + '([\\w\\d.]+)>', 'g');
    var replace = function replace(match, id) {
      var source = includes[id];
      if (source === undefined) {
        throw new Error('Could not resolve #include <' + scope + id + '>');
      }
      return source.replace(pattern, replace);
    };
    return source.replace(pattern, replace);
  }
};

var fragmentShader = "#define GLSLIFY 1\n// The MIT License\n// Copyright (C) 2016-Present Shota Matsuda\n\n#include <planck/line_basic_frag_params>\n\nuniform float pixelRatio;\nuniform float targetPixelRatio;\n\nvoid main() {\n  #include <planck/line_basic_frag_begin>\n\n  diffuseColor.a *= pixelRatio / targetPixelRatio;\n\n  #include <planck/line_basic_frag_end>\n}\n";

var vertexShader = "#define GLSLIFY 1\n// The MIT License\n// Copyright (C) 2016-Present Shota Matsuda\n\n#include <planck/line_basic_vert_params>\n\nvoid main() {\n  #include <planck/line_basic_vert_begin>\n  #include <planck/line_basic_vert_end>\n}\n";

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

var LineBasicMaterial$1 = function (_Three$ShaderMaterial) {
  inherits(LineBasicMaterial$$1, _Three$ShaderMaterial);

  function LineBasicMaterial$$1() {
    var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, LineBasicMaterial$$1);

    var _this = possibleConstructorReturn(this, (LineBasicMaterial$$1.__proto__ || Object.getPrototypeOf(LineBasicMaterial$$1)).call(this));

    _this.color = new Three.Color(0xffffff);
    var source = new Three.LineBasicMaterial();
    Three.LineBasicMaterial.prototype.copy.call(_this, source);
    source.dispose();
    _this.setValues(parameters);
    _this.isLineBasicMaterial = true;

    _this.uniforms = Three.UniformsUtils.merge([Three.UniformsLib.common, Three.UniformsLib.fog, {
      pixelRatio: { value: 1 },
      targetPixelRatio: { value: 2 }
    }]);
    _this.vertexShader = Shader.include(vertexShader);
    _this.fragmentShader = Shader.include(fragmentShader);
    return _this;
  }

  return LineBasicMaterial$$1;
}(Three.ShaderMaterial);

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

var Line$1 = function (_mix$with) {
  inherits(Line$$1, _mix$with);

  function Line$$1(geometry, material) {
    classCallCheck(this, Line$$1);

    var _this = possibleConstructorReturn(this, (Line$$1.__proto__ || Object.getPrototypeOf(Line$$1)).call(this, geometry, material || new LineBasicMaterial$1()));

    if (_this.material) {
      _this.customDepthMaterial = _this.material.customDepthMaterial;
      _this.customDistanceMaterial = _this.material.customDistanceMaterial;
      _this.customPickingMaterial = _this.material.customPickingMaterial;
    }
    return _this;
  }

  return Line$$1;
}(mix(Three.Line).with(EventDispatcherMixin, EventTargetMixin, SceneGraphMixin));

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

var LineLoop$1 = function (_mix$with) {
  inherits(LineLoop$$1, _mix$with);

  function LineLoop$$1(geometry, material) {
    classCallCheck(this, LineLoop$$1);

    var _this = possibleConstructorReturn(this, (LineLoop$$1.__proto__ || Object.getPrototypeOf(LineLoop$$1)).call(this, geometry, material || new LineBasicMaterial$1()));

    if (_this.material) {
      _this.customDepthMaterial = _this.material.customDepthMaterial;
      _this.customDistanceMaterial = _this.material.customDistanceMaterial;
      _this.customPickingMaterial = _this.material.customPickingMaterial;
    }
    return _this;
  }

  return LineLoop$$1;
}(mix(Three.LineLoop).with(EventDispatcherMixin, EventTargetMixin, SceneGraphMixin));

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

var LineSegments$1 = function (_mix$with) {
  inherits(LineSegments$$1, _mix$with);

  function LineSegments$$1(geometry, material) {
    classCallCheck(this, LineSegments$$1);

    var _this = possibleConstructorReturn(this, (LineSegments$$1.__proto__ || Object.getPrototypeOf(LineSegments$$1)).call(this, geometry, material || new LineBasicMaterial$1()));

    if (_this.material) {
      _this.customDepthMaterial = _this.material.customDepthMaterial;
      _this.customDistanceMaterial = _this.material.customDistanceMaterial;
      _this.customPickingMaterial = _this.material.customPickingMaterial;
    }
    return _this;
  }

  return LineSegments$$1;
}(mix(Three.LineSegments).with(EventDispatcherMixin, EventTargetMixin, SceneGraphMixin));

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

var Mesh$1 = function (_mix$with) {
  inherits(Mesh$$1, _mix$with);

  function Mesh$$1(geometry, material) {
    classCallCheck(this, Mesh$$1);

    var _this = possibleConstructorReturn(this, (Mesh$$1.__proto__ || Object.getPrototypeOf(Mesh$$1)).call(this, geometry, material || new Three.MeshLambertMaterial()));

    _this.castShadow = true;
    _this.receiveShadow = true;
    if (_this.material) {
      _this.customDepthMaterial = _this.material.customDepthMaterial;
      _this.customDistanceMaterial = _this.material.customDistanceMaterial;
      _this.customPickingMaterial = _this.material.customPickingMaterial;
    }
    return _this;
  }

  return Mesh$$1;
}(mix(Three.Mesh).with(EventDispatcherMixin, EventTargetMixin, SceneGraphMixin));

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

var Object3D$1 = function (_mix$with) {
  inherits(Object3D$$1, _mix$with);

  function Object3D$$1() {
    classCallCheck(this, Object3D$$1);
    return possibleConstructorReturn(this, (Object3D$$1.__proto__ || Object.getPrototypeOf(Object3D$$1)).apply(this, arguments));
  }

  return Object3D$$1;
}(mix(Three.Object3D).with(EventDispatcherMixin, EventTargetMixin, SceneGraphMixin));

var fragmentShader$1 = "#define GLSLIFY 1\n// The MIT License\n// Copyright (C) 2016-Present Shota Matsuda\n\n#include <planck/points_frag_params>\n\nvoid main() {\n  #include <planck/points_frag_begin>\n  #include <planck/points_frag_end>\n}\n";

var vertexShader$1 = "#define GLSLIFY 1\n// The MIT License\n// Copyright (C) 2016-Present Shota Matsuda\n\n#include <planck/points_vert_params>\n\nvoid main() {\n  #include <planck/points_vert_begin>\n  #include <planck/points_vert_end>\n}\n";

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

var PointsMaterial$1 = function (_Three$ShaderMaterial) {
  inherits(PointsMaterial$$1, _Three$ShaderMaterial);

  function PointsMaterial$$1() {
    var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, PointsMaterial$$1);

    var _this = possibleConstructorReturn(this, (PointsMaterial$$1.__proto__ || Object.getPrototypeOf(PointsMaterial$$1)).call(this));

    _this.color = new Three.Color(0xffffff);
    var source = new Three.PointsMaterial();
    Three.PointsMaterial.prototype.copy.call(_this, source);
    source.dispose();
    _this.setValues(parameters);
    _this.isPointsMaterial = true;

    _this.uniforms = Three.UniformsUtils.merge([Three.ShaderLib.points.uniforms]);
    _this.vertexShader = Shader.include(vertexShader$1);
    _this.fragmentShader = Shader.include(fragmentShader$1);
    return _this;
  }

  return PointsMaterial$$1;
}(Three.ShaderMaterial);

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

var Points$1 = function (_mix$with) {
  inherits(Points$$1, _mix$with);

  function Points$$1(geometry, material) {
    classCallCheck(this, Points$$1);

    var _this = possibleConstructorReturn(this, (Points$$1.__proto__ || Object.getPrototypeOf(Points$$1)).call(this, geometry, material || new PointsMaterial$1()));

    if (_this.material) {
      _this.customDepthMaterial = _this.material.customDepthMaterial;
      _this.customDistanceMaterial = _this.material.customDistanceMaterial;
      _this.customPickingMaterial = _this.material.customPickingMaterial;
    }
    return _this;
  }

  createClass(Points$$1, [{
    key: 'identifierLength',
    get: function get$$1() {
      var position = this.geometry.getAttribute('position');
      if (!position) {
        return get(Points$$1.prototype.__proto__ || Object.getPrototypeOf(Points$$1.prototype), 'identifierLength', this);
      }
      return position.count + 1;
    }
  }]);
  return Points$$1;
}(mix(Three.Points).with(EventDispatcherMixin, EventTargetMixin, SceneGraphMixin));

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

var Sprite$1 = function (_mix$with) {
  inherits(Sprite$$1, _mix$with);

  function Sprite$$1(material) {
    classCallCheck(this, Sprite$$1);

    var _this = possibleConstructorReturn(this, (Sprite$$1.__proto__ || Object.getPrototypeOf(Sprite$$1)).call(this, material));

    if (_this.material) {
      _this.customDepthMaterial = _this.material.customDepthMaterial;
      _this.customDistanceMaterial = _this.material.customDistanceMaterial;
      _this.customPickingMaterial = _this.material.customPickingMaterial;
    }
    _this.size = new Three.Vector2();
    return _this;
  }

  createClass(Sprite$$1, [{
    key: 'onBeforeRender',
    value: function onBeforeRender(renderer, scene, camera, geometry, material, group) {
      var scale = 1 / camera.zoom;
      var x = this.size.x * scale;
      var y = this.size.y * scale;
      if (this.scale.x !== x || this.scale.y !== y) {
        this.scale.set(this.size.x * scale, this.size.y * scale, 1);
        this.updateMatrixWorld();
      }
    }
  }]);
  return Sprite$$1;
}(mix(Three.Sprite).with(EventDispatcherMixin, EventTargetMixin, SceneGraphMixin));

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

var TextStyle = function () {
  function TextStyle() {
    var style = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, TextStyle);

    this.color = 'white';
    this.backgroundColor = 'transparent';
    this.fontSize = 10;
    this.fontFamily = 'sans-serif';
    this.fontWeight = 'normal';
    this.lineHeight = 1;
    this.letterSpacing = 0;
    this.textTransform = 'uppercase';
    this.textAlign = 'center';
    this.verticalAlign = 'middle';
    var names = Object.keys(style);
    for (var i = 0; i < names.length; ++i) {
      var name = names[i];
      if ({}.hasOwnProperty.call(this, name)) {
        this[name] = style[name];
      }
    }
    if (style.marginTop === undefined) {
      this.marginTop = style.margin || 0;
    } else {
      this.marginTop = style.marginTop;
    }
    if (style.marginRight === undefined) {
      this.marginRight = style.margin || 0;
    } else {
      this.marginRight = style.marginRight;
    }
    if (style.marginBottom === undefined) {
      this.marginBottom = style.margin || 0;
    } else {
      this.marginBottom = style.marginBottom;
    }
    if (style.marginLeft === undefined) {
      this.marginLeft = style.margin || 0;
    } else {
      this.marginLeft = style.marginLeft;
    }
    if (style.paddingTop === undefined) {
      this.paddingTop = style.padding || 0;
    } else {
      this.paddingTop = style.paddingTop;
    }
    if (style.paddingRight === undefined) {
      this.paddingRight = style.padding || 0;
    } else {
      this.paddingRight = style.paddingRight;
    }
    if (style.paddingBottom === undefined) {
      this.paddingBottom = style.padding || 0;
    } else {
      this.paddingBottom = style.paddingBottom;
    }
    if (style.paddingLeft === undefined) {
      this.paddingLeft = style.padding || 0;
    } else {
      this.paddingLeft = style.paddingLeft;
    }
  }

  createClass(TextStyle, [{
    key: 'copy',
    value: function copy(other) {
      this.color = other.color;
      this.backgroundColor = other.backgroundColor;
      this.fontSize = other.fontSize;
      this.fontFamily = other.fontFamily;
      this.fontWeight = other.fontWeight;
      this.lineHeight = other.lineHeight;
      this.letterSpacing = other.letterSpacing;
      this.textTransform = other.textTransform;
      this.textAlign = other.textAlign;
      this.verticalAlign = other.verticalAlign;
      this.marginTop = other.marginTop;
      this.marginRight = other.marginRight;
      this.marginBottom = other.marginBottom;
      this.marginLeft = other.marginLeft;
      this.paddingTop = other.paddingTop;
      this.paddingRight = other.paddingRight;
      this.paddingBottom = other.paddingBottom;
      this.paddingLeft = other.paddingLeft;
      return this;
    }
  }, {
    key: 'clone',
    value: function clone() {
      return new this.constructor().copy(this);
    }
  }, {
    key: 'equals',
    value: function equals(other) {
      return this.color === other.color && this.backgroundColor === other.backgroundColor && this.fontSize === other.fontSize && this.fontFamily === other.fontFamily && this.fontWeight === other.fontWeight && this.lineHeight === other.lineHeight && this.letterSpacing === other.letterSpacing && this.textTransform === other.textTransform && this.textAlign === other.textAlign && this.verticalAlign === other.verticalAlign && this.marginTop === other.marginTop && this.marginRight === other.marginRight && this.marginBottom === other.marginBottom && this.marginLeft === other.marginLeft && this.paddingTop === other.paddingTop && this.paddingRight === other.paddingRight && this.paddingBottom === other.paddingBottom && this.paddingLeft === other.paddingLeft;
    }
  }, {
    key: 'font',
    get: function get$$1() {
      return this.fontWeight + ' ' + this.fontSize + 'px ' + this.fontFamily;
    }
  }, {
    key: 'margin',
    set: function set$$1(value) {
      this.marginTop = value;
      this.marginRight = value;
      this.marginBottom = value;
      this.marginLeft = value;
    }
  }, {
    key: 'padding',
    set: function set$$1(value) {
      this.paddingTop = value;
      this.paddingRight = value;
      this.paddingBottom = value;
      this.paddingLeft = value;
    }
  }]);
  return TextStyle;
}();

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

var Text = function (_Sprite) {
  inherits(Text, _Sprite);

  function Text() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        text = _ref.text,
        style = _ref.style,
        pixelRatio = _ref.pixelRatio;

    classCallCheck(this, Text);

    var _this = possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this, new Three.SpriteMaterial()));

    _this.text = text || '';
    _this.style = new TextStyle(style);
    _this.pixelRatio = pixelRatio || window.devicePixelRatio;
    _this.canvas = document.createElement('canvas');

    // Use nearest filtering because canvas always dumps colors of
    // transparent pixels as black, texture filtering that looks up
    // neighboring pixels will produce artifact on edge.
    _this.material.transparent = true;
    _this.material.map = new Three.CanvasTexture(_this.canvas, undefined, undefined, undefined, Three.NearestFilter, Three.NearestFilter);
    _this.draw();
    return _this;
  }

  createClass(Text, [{
    key: 'draw',
    value: function draw() {
      var context = this.canvas.getContext('2d');
      var style = this.style;

      var lines = this.text.toString().split('\n');
      var size = this.measureLines(lines, this.style);
      var _style = this.style,
          marginTop = _style.marginTop,
          marginRight = _style.marginRight,
          marginBottom = _style.marginBottom,
          marginLeft = _style.marginLeft,
          paddingTop = _style.paddingTop,
          paddingRight = _style.paddingRight,
          paddingBottom = _style.paddingBottom,
          paddingLeft = _style.paddingLeft,
          textAlign = _style.textAlign,
          verticalAlign = _style.verticalAlign;

      size.width += paddingLeft + paddingRight;
      size.height += paddingTop + paddingBottom;
      var content = _extends({}, size);
      size.width += marginLeft + marginRight;
      size.height += marginTop + marginBottom;
      var width = size.width * this.pixelRatio;
      var height = size.height * this.pixelRatio;
      var pixelRatio = this.pixelRatio;

      this.canvas.width = Three.Math.ceilPowerOfTwo(width + 2 * pixelRatio);
      this.canvas.height = Three.Math.ceilPowerOfTwo(height + 2 * pixelRatio);
      var offsetX = (this.canvas.width - width) / 2;
      var offsetY = (this.canvas.height - height) / 2;
      context.save();
      context.translate(offsetX, offsetY);
      context.scale(pixelRatio, pixelRatio);
      switch (textAlign) {
        case 'left':
        case 'right':
          context.translate(marginLeft, 0);
          break;
        case 'center':
        default:
          context.translate((marginLeft + marginRight) / 2, 0);
          break;
      }
      switch (verticalAlign) {
        case 'top':
        case 'bottom':
          context.translate(0, marginTop);
          break;
        case 'middle':
        default:
          context.translate(0, (marginTop + marginBottom) / 2);
          break;
      }
      this.drawBackground(content, style);
      this.drawLines(lines, content, style);
      context.restore();

      // Apply size to sprite and map
      switch (textAlign) {
        case 'left':
          this.size.x = size.width * 2;
          this.material.map.offset.x = (offsetX - width) / this.canvas.width;
          this.material.map.repeat.x = width / this.canvas.width * 2;
          break;
        case 'right':
          this.size.x = size.width * 2;
          this.material.map.offset.x = offsetX / this.canvas.width;
          this.material.map.repeat.x = width / this.canvas.width * 2;
          break;
        case 'center':
        default:
          this.size.x = size.width;
          this.material.map.offset.x = offsetX / this.canvas.width;
          this.material.map.repeat.x = width / this.canvas.width;
          break;
      }
      switch (verticalAlign) {
        case 'top':
          this.size.y = size.height * 2;
          this.material.map.offset.y = offsetY / this.canvas.height;
          this.material.map.repeat.y = height / this.canvas.height * 2;
          break;
        case 'bottom':
          this.size.y = size.height * 2;
          this.material.map.offset.y = (offsetY - height) / this.canvas.height;
          this.material.map.repeat.y = height / this.canvas.height * 2;
          break;
        case 'middle':
        default:
          this.size.y = size.height;
          this.material.map.offset.y = offsetY / this.canvas.height;
          this.material.map.repeat.y = height / this.canvas.height;
          break;
      }
      this.material.map.needsUpdate = true;
    }
  }, {
    key: 'drawBackground',
    value: function drawBackground(size, style) {
      if (style.backgroundColor === 'transparent') {
        return;
      }
      var context = this.canvas.getContext('2d');
      context.save();
      context.fillStyle = style.backgroundColor;
      context.fillRect(0, 0, size.width, size.height);
      context.restore();
    }

    // TODO: Support text transform, and letter spacing

  }, {
    key: 'drawLines',
    value: function drawLines(lines, size, style) {
      var context = this.canvas.getContext('2d');
      context.save();
      context.font = style.font;
      context.textAlign = style.textAlign;
      context.fillStyle = style.color;

      // Bottom is the only value that respects em box
      context.textBaseline = 'bottom';

      var x = 0;
      switch (style.textAlign) {
        case 'left':
          x = style.paddingLeft;
          break;
        case 'right':
          x = size.width - style.paddingRight;
          break;
        case 'center':
        default:
          x = (style.paddingLeft + size.width - style.paddingRight) / 2;
          break;
      }
      var lineHeight = style.fontSize * style.lineHeight;
      var y = (lineHeight + style.fontSize) * 0.5 + style.paddingTop;
      for (var i = 0; i < lines.length; ++i) {
        context.fillText(lines[i], x, y);
        y += lineHeight;
      }

      // Draw white fill with source-in composite to remove subpixel-antialias
      if (style.backgroundColor === 'transparent') {
        context.globalCompositeOperation = 'source-in';
        context.fillStyle = style.color;
        context.fillRect(0, 0, size.width, size.height);
      }
      context.restore();
    }
  }, {
    key: 'measureLines',
    value: function measureLines(lines, style) {
      var context = this.canvas.getContext('2d');
      context.save();
      context.font = style.font;
      var height = style.fontSize * style.lineHeight * lines.length;
      var width = 0;
      for (var i = 0; i < lines.length; ++i) {
        var lineWidth = context.measureText(lines[i]).width;
        if (lineWidth > width) {
          width = lineWidth;
        }
      }
      context.restore();
      return { width: width, height: height };
    }
  }]);
  return Text;
}(Sprite$1);

//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

exports.Group = Group$1;
exports.Line = Line$1;
exports.LineLoop = LineLoop$1;
exports.LineSegments = LineSegments$1;
exports.Mesh = Mesh$1;
exports.Object3D = Object3D$1;
exports.Points = Points$1;
exports.SceneGraphMixin = SceneGraphMixin;
exports.Sprite = Sprite$1;
exports.Text = Text;
exports.TextStyle = TextStyle;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=planck-object.js.map
