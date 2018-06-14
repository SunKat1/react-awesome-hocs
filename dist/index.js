'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var lodash = require('lodash');

var makeDebounced = function makeDebounced(WrappedComponent) {
  var Wrapper = function (_Component) {
    babelHelpers.inherits(Wrapper, _Component);

    function Wrapper(props) {
      babelHelpers.classCallCheck(this, Wrapper);

      var _this = babelHelpers.possibleConstructorReturn(this, (Wrapper.__proto__ || Object.getPrototypeOf(Wrapper)).call(this, props));

      _this.state = {
        value: null,
        debouncedProps: lodash.omit(props, ['onChange', 'value'])
      };
      _this.sendExternalChange = lodash.debounce(props.onChange, props.delay);
      return _this;
    }

    babelHelpers.createClass(Wrapper, [{
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

        return React__default.createElement(WrappedComponent, babelHelpers.extends({}, debouncedProps, {
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
  }(React.Component);

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
        props = babelHelpers.objectWithoutProperties(_ref2, ['delay', 'value']);
    return {
      value: value,
      debouncedProps: lodash.omit(props, ['onChange', 'value'])
    };
  };

  return Wrapper;
};

exports.makeDebounced = makeDebounced;
