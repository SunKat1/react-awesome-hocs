import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce, omit } from 'lodash';

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

var makeDebounced = function makeDebounced(WrappedComponent) {
  var Wrapper = function (_Component) {
    inherits(Wrapper, _Component);

    function Wrapper(props) {
      classCallCheck(this, Wrapper);

      var _this = possibleConstructorReturn(this, (Wrapper.__proto__ || Object.getPrototypeOf(Wrapper)).call(this, props));

      _this.state = {
        value: null,
        debouncedProps: omit(props, ['onChange', 'value'])
      };
      _this.sendExternalChange = debounce(props.onChange, props.delay);
      return _this;
    }

    createClass(Wrapper, [{
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        if (prevProps.value !== this.props.value) {
          this.sendExternalChange.cancel();
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var _state = this.state,
            value = _state.value,
            debouncedProps = _state.debouncedProps;

        return React.createElement(WrappedComponent, _extends({}, debouncedProps, {
          value: value,
          onChange: function onChange(e, _ref) {
            var value = _ref.value;
            return _this2.setState({ value: value }, function () {
              return _this2.sendExternalChange(e, value);
            });
          }
        }));
      }
    }]);
    return Wrapper;
  }(Component);

  Wrapper.propTypes = {
    delay: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
  };
  Wrapper.defaultProps = {
    delay: 1500
  };

  Wrapper.getDerivedStateFromProps = function (_ref2) {
    var delay = _ref2.delay,
        value = _ref2.value,
        props = objectWithoutProperties(_ref2, ['delay', 'value']);
    return {
      value: value,
      debouncedProps: omit(props, ['onChange', 'value'])
    };
  };

  return Wrapper;
};

export { makeDebounced };
