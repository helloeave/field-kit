'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _delimited_text_formatter = require('./delimited_text_formatter');

var _delimited_text_formatter2 = _interopRequireDefault(_delimited_text_formatter);

/**
 * @const
 * @private
 */
var DIGITS_PATTERN = /^\d*$/;

/**
 * @extends DelimitedTextFormatter
 */

var SocialSecurityNumberFormatter = (function (_DelimitedTextFormatter) {
  _inherits(SocialSecurityNumberFormatter, _DelimitedTextFormatter);

  function SocialSecurityNumberFormatter() {
    _classCallCheck(this, SocialSecurityNumberFormatter);

    _get(Object.getPrototypeOf(SocialSecurityNumberFormatter.prototype), 'constructor', this).call(this, '-');
    this.maximumLength = 9 + 2;
  }

  /**
   * @param {number} index
   * @returns {boolean}
   */

  _createClass(SocialSecurityNumberFormatter, [{
    key: 'hasDelimiterAtIndex',
    value: function hasDelimiterAtIndex(index) {
      return index === 3 || index === 6;
    }

    /**
     * Determines whether the given change should be allowed and, if so, whether
     * it should be altered.
     *
     * @param {TextFieldStateChange} change
     * @param {function(string)} error
     * @returns {boolean}
     */
  }, {
    key: 'isChangeValid',
    value: function isChangeValid(change, error) {
      if (DIGITS_PATTERN.test(change.inserted.text)) {
        return _get(Object.getPrototypeOf(SocialSecurityNumberFormatter.prototype), 'isChangeValid', this).call(this, change, error);
      } else {
        return false;
      }
    }
  }]);

  return SocialSecurityNumberFormatter;
})(_delimited_text_formatter2['default']);

exports['default'] = SocialSecurityNumberFormatter;
module.exports = exports['default'];