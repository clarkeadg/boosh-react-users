'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _Creators = require('../../Actions/Creators');

var _Creators2 = _interopRequireDefault(_Creators);

var _UserSelector = require('../../Selectors/UserSelector');

var _booshReactComponents = require('boosh-react-components');

var _User = require('./User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Actions */

/* React */
var GetUser = function (_React$Component) {
  (0, _inherits3.default)(GetUser, _React$Component);

  function GetUser() {
    (0, _classCallCheck3.default)(this, GetUser);
    return (0, _possibleConstructorReturn3.default)(this, (GetUser.__proto__ || (0, _getPrototypeOf2.default)(GetUser)).apply(this, arguments));
  }

  (0, _createClass3.default)(GetUser, [{
    key: 'getData',
    value: function getData(user_id) {
      //console.log('GET USER',user_id)
      var Meta = {
        id: user_id
      };
      this.props.dispatch(_Creators2.default.getUsersAttempt(Meta));
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (!this.props.user_id) return;
      this.getData(this.props.user_id);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (newProps.user_id !== this.props.user_id) {
        this.getData(newProps.user_id);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var user = this.props.user;

      if (!user.id) {
        return false;
        return _react2.default.createElement(_booshReactComponents.Loading, null);
      }

      var meta = this.props.meta || false;

      var userOptions = this.props.userOptions || {};

      return _react2.default.createElement(_User2.default, { user: user, meta: meta, userOptions: userOptions });
    }
  }]);
  return GetUser;
}(_react2.default.Component);

/* Components */


GetUser.propTypes = {
  user: _react2.default.PropTypes.object
};

GetUser.defaultProps = {
  user: {}
};

var mapStateToProps = function mapStateToProps(state, props) {
  return {
    user: (0, _UserSelector.getUserById)(state, props)
  };
};

/*function preload(params, req) {
  return [
    [GetCommentsSaga, {}]
  ];
}
Comments.preload = preload;*/

exports.default = (0, _reactRedux.connect)(mapStateToProps)(GetUser);