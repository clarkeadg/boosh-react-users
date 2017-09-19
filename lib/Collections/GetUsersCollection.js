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

var _Creators = require('../Actions/Creators');

var _Creators2 = _interopRequireDefault(_Creators);

var _UserSelector = require('../Selectors/UserSelector');

var _UsersCollection = require('./UsersCollection');

var _UsersCollection2 = _interopRequireDefault(_UsersCollection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Selectors */
var GetUsersCollection = function (_React$Component) {
  (0, _inherits3.default)(GetUsersCollection, _React$Component);

  function GetUsersCollection() {
    (0, _classCallCheck3.default)(this, GetUsersCollection);
    return (0, _possibleConstructorReturn3.default)(this, (GetUsersCollection.__proto__ || (0, _getPrototypeOf2.default)(GetUsersCollection)).apply(this, arguments));
  }

  (0, _createClass3.default)(GetUsersCollection, [{
    key: 'getData',
    value: function getData(pageNumber) {
      var Meta = {
        query: {
          page: pageNumber,
          per_page: this.props.per_page || 10
        },
        path: this.props.path || "/quickusers/"
      };
      this.props.dispatch(_Creators2.default.getUsersAttempt(Meta));
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      //if(!this.props.users) {
      this.getData(this.props.pageNumber);
      //}
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (newProps.pageNumber !== this.props.pageNumber) {
        this.getData(newProps.pageNumber);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          users = _props.users,
          path = _props.path,
          size = _props.size,
          userOptions = _props.userOptions,
          pager = _props.pager,
          pageNumber = _props.pageNumber,
          per_page = _props.per_page;

      if (!users) return false;

      return _react2.default.createElement(_UsersCollection2.default, {
        loading: false,
        users: users,
        path: path,
        size: size,
        userOptions: userOptions,
        pager: pager,
        pageNumber: pageNumber,
        per_page: per_page });
    }
  }]);
  return GetUsersCollection;
}(_react2.default.Component);

/* Actions */

/* React */


GetUsersCollection.propTypes = {
  loading: _react2.default.PropTypes.bool,
  users: _react2.default.PropTypes.object,
  pageNumber: _react2.default.PropTypes.number
};

GetUsersCollection.defaultProps = {
  viewType: 'grid',
  loading: true,
  users: {},
  pageNumber: 1
};

var mapStateToProps = function mapStateToProps(state, props) {
  return {
    loading: state.users.attempting,
    users: (0, _UserSelector.getUsersCollection)(state, props)
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(GetUsersCollection);