import { Group, Line, LineLoop, LineSegments, MeshLambertMaterial, Mesh, Object3D, Scene, Points, Vector2, Sprite, SpriteMaterial, CanvasTexture, NearestFilter, Math } from 'three';
import { Namespace } from '@takram/planck-core';
import { EventDispatcherMixin, EventTargetMixin } from '@takram/planck-event';
import { LineBasicMaterial, PointsMaterial } from '@takram/planck-renderer';

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

// The MIT License

var internal = Namespace('SceneGraphMixin');

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

      var scope = internal(_this);
      scope.setup = false;
      scope.disposed = false;
      scope.scene = null;
      return _this;
    }

    createClass(SceneGraphMixin, [{
      key: 'setup',
      value: function setup() {
        internal(this).setup = true;
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
        var scope = internal(this);
        if (!scope.setup) {
          this.setup();
          scope.setup = true;
        }
        if (parent instanceof Scene) {
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
        internal(this).scene = scene;
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
        internal(this).scene = null;
        if (parent instanceof Scene) {
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
          var scope = internal(this);
          this.addedToParent(this.parent);
          get(SceneGraphMixin.prototype.__proto__ || Object.getPrototypeOf(SceneGraphMixin.prototype), 'dispatchEvent', this).call(this, { type: 'added', parent: this.parent });
          get(SceneGraphMixin.prototype.__proto__ || Object.getPrototypeOf(SceneGraphMixin.prototype), 'dispatchEvent', this).call(this, { type: 'addedToParent', parent: this.parent });
          scope.parent = this.parent;
          return;
        }
        // Add `from` property to the event
        if (event.type === 'removed' && !event.from) {
          var _scope = internal(this);
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
        return internal(this).scene;
      }
    }]);
    return SceneGraphMixin;
  }(S);
});

// The MIT License

var Group$1 = function (_mix$with) {
  inherits(Group$$1, _mix$with);

  function Group$$1() {
    classCallCheck(this, Group$$1);
    return possibleConstructorReturn(this, (Group$$1.__proto__ || Object.getPrototypeOf(Group$$1)).apply(this, arguments));
  }

  return Group$$1;
}(mix(Group).with(EventDispatcherMixin, EventTargetMixin, SceneGraphMixin));

// The MIT License

var Line$1 = function (_mix$with) {
  inherits(Line$$1, _mix$with);

  function Line$$1(geometry, material) {
    classCallCheck(this, Line$$1);

    var _this = possibleConstructorReturn(this, (Line$$1.__proto__ || Object.getPrototypeOf(Line$$1)).call(this, geometry, material || new LineBasicMaterial()));

    if (_this.material) {
      _this.customDepthMaterial = _this.material.customDepthMaterial;
      _this.customDistanceMaterial = _this.material.customDistanceMaterial;
      _this.customPickingMaterial = _this.material.customPickingMaterial;
    }
    return _this;
  }

  return Line$$1;
}(mix(Line).with(EventDispatcherMixin, EventTargetMixin, SceneGraphMixin));

// The MIT License

var LineLoop$1 = function (_mix$with) {
  inherits(LineLoop$$1, _mix$with);

  function LineLoop$$1(geometry, material) {
    classCallCheck(this, LineLoop$$1);

    var _this = possibleConstructorReturn(this, (LineLoop$$1.__proto__ || Object.getPrototypeOf(LineLoop$$1)).call(this, geometry, material || new LineBasicMaterial()));

    if (_this.material) {
      _this.customDepthMaterial = _this.material.customDepthMaterial;
      _this.customDistanceMaterial = _this.material.customDistanceMaterial;
      _this.customPickingMaterial = _this.material.customPickingMaterial;
    }
    return _this;
  }

  return LineLoop$$1;
}(mix(LineLoop).with(EventDispatcherMixin, EventTargetMixin, SceneGraphMixin));

// The MIT License

var LineSegments$1 = function (_mix$with) {
  inherits(LineSegments$$1, _mix$with);

  function LineSegments$$1(geometry, material) {
    classCallCheck(this, LineSegments$$1);

    var _this = possibleConstructorReturn(this, (LineSegments$$1.__proto__ || Object.getPrototypeOf(LineSegments$$1)).call(this, geometry, material || new LineBasicMaterial()));

    if (_this.material) {
      _this.customDepthMaterial = _this.material.customDepthMaterial;
      _this.customDistanceMaterial = _this.material.customDistanceMaterial;
      _this.customPickingMaterial = _this.material.customPickingMaterial;
    }
    return _this;
  }

  return LineSegments$$1;
}(mix(LineSegments).with(EventDispatcherMixin, EventTargetMixin, SceneGraphMixin));

// The MIT License

var Mesh$1 = function (_mix$with) {
  inherits(Mesh$$1, _mix$with);

  function Mesh$$1(geometry, material) {
    classCallCheck(this, Mesh$$1);

    var _this = possibleConstructorReturn(this, (Mesh$$1.__proto__ || Object.getPrototypeOf(Mesh$$1)).call(this, geometry, material || new MeshLambertMaterial()));

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
}(mix(Mesh).with(EventDispatcherMixin, EventTargetMixin, SceneGraphMixin));

// The MIT License

var Object3D$1 = function (_mix$with) {
  inherits(Object3D$$1, _mix$with);

  function Object3D$$1() {
    classCallCheck(this, Object3D$$1);
    return possibleConstructorReturn(this, (Object3D$$1.__proto__ || Object.getPrototypeOf(Object3D$$1)).apply(this, arguments));
  }

  return Object3D$$1;
}(mix(Object3D).with(EventDispatcherMixin, EventTargetMixin, SceneGraphMixin));

// The MIT License

var Points$1 = function (_mix$with) {
  inherits(Points$$1, _mix$with);

  function Points$$1(geometry, material) {
    classCallCheck(this, Points$$1);

    var _this = possibleConstructorReturn(this, (Points$$1.__proto__ || Object.getPrototypeOf(Points$$1)).call(this, geometry, material || new PointsMaterial()));

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
}(mix(Points).with(EventDispatcherMixin, EventTargetMixin, SceneGraphMixin));

// The MIT License

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
    _this.size = new Vector2();
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
}(mix(Sprite).with(EventDispatcherMixin, EventTargetMixin, SceneGraphMixin));

// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

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

// The MIT License

var Text = function (_Sprite) {
  inherits(Text, _Sprite);

  function Text() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        text = _ref.text,
        style = _ref.style,
        pixelRatio = _ref.pixelRatio;

    classCallCheck(this, Text);

    var _this = possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this, new SpriteMaterial()));

    _this.text = text || '';
    _this.style = new TextStyle(style);
    _this.pixelRatio = pixelRatio || window.devicePixelRatio;
    _this.canvas = document.createElement('canvas');

    // Use nearest filtering because canvas always dumps colors of
    // transparent pixels as black, texture filtering that looks up
    // neighboring pixels will produce artifact on edge.
    _this.material.transparent = true;
    _this.material.map = new CanvasTexture(_this.canvas, undefined, undefined, undefined, NearestFilter, NearestFilter);
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

      this.canvas.width = Math.ceilPowerOfTwo(width + 2 * pixelRatio);
      this.canvas.height = Math.ceilPowerOfTwo(height + 2 * pixelRatio);
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

// The MIT License

var main = {
  Group: Group$1,
  Line: Line$1,
  LineLoop: LineLoop$1,
  LineSegments: LineSegments$1,
  Mesh: Mesh$1,
  Object3D: Object3D$1,
  Points: Points$1,
  SceneGraphMixin: SceneGraphMixin,
  Sprite: Sprite$1,
  Text: Text,
  TextStyle: TextStyle
};

export default main;
export { Group$1 as Group, Line$1 as Line, LineLoop$1 as LineLoop, LineSegments$1 as LineSegments, Mesh$1 as Mesh, Object3D$1 as Object3D, Points$1 as Points, SceneGraphMixin, Sprite$1 as Sprite, Text, TextStyle };
//# sourceMappingURL=planck-object.module.js.map
