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

var _booshReactPagination = require('boosh-react-pagination');

var _reactFoundation = require('react-foundation');

var _booshReactComponents = require('boosh-react-components');

var _reactRouter = require('react-router');

var _UsersCollection = require('../Collections/UsersCollection');

var _UsersCollection2 = _interopRequireDefault(_UsersCollection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Components */
var UsersList = function (_React$Component) {
  (0, _inherits3.default)(UsersList, _React$Component);

  function UsersList() {
    (0, _classCallCheck3.default)(this, UsersList);
    return (0, _possibleConstructorReturn3.default)(this, (UsersList.__proto__ || (0, _getPrototypeOf2.default)(UsersList)).apply(this, arguments));
  }

  (0, _createClass3.default)(UsersList, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          pageNumber = _props.pageNumber,
          count = _props.count;

      return _react2.default.createElement(
        'div',
        { className: 'page page-error-404' },
        _react2.default.createElement(
          _reactFoundation.Row,
          { className: 'display' },
          _react2.default.createElement(
            _reactFoundation.Column,
            { small: 12 },
            _react2.default.createElement(_booshReactComponents.Portlet, { title: 'Users', items: _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_UsersCollection2.default, { pageNumber: pageNumber, count: count })
              ) })
          )
        )
      );
    }
  }]);
  return UsersList;
}(_react2.default.Component);
/* React */


UsersList.propTypes = {
  pageNumber: _react2.default.PropTypes.number,
  count: _react2.default.PropTypes.number
};

UsersList.defaultProps = {
  pageNumber: 1,
  count: 0
};

var mapStateToProps = function mapStateToProps(state, props) {
  return {
    pageNumber: (0, _booshReactPagination.getPageNumber)(state, props),
    count: (0, _booshReactPagination.getPageCount)(state, props)
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(UsersList);