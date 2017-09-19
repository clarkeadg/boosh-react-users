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

var _reactFoundation = require('react-foundation');

var _booshReactComponents = require('boosh-react-components');

var _User = require('../Components/User/User');

var _User2 = _interopRequireDefault(_User);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Sagas */
//import GetUsersSaga from '../Sagas/Preloaders/GetUsersSaga'

/* Components */


/* Actions */

/* React */
var UsersCollection = function (_React$Component) {
  (0, _inherits3.default)(UsersCollection, _React$Component);

  function UsersCollection() {
    (0, _classCallCheck3.default)(this, UsersCollection);
    return (0, _possibleConstructorReturn3.default)(this, (UsersCollection.__proto__ || (0, _getPrototypeOf2.default)(UsersCollection)).apply(this, arguments));
  }

  (0, _createClass3.default)(UsersCollection, [{
    key: 'renderUsers',


    /*getData(pageNumber) {
      let Meta = {
        query: {
          page: pageNumber,
          per_page: this.props.per_page || 10
        },
        path: this.props.path || "/users/"
      }
      this.props.dispatch(Actions.getUsersAttempt(Meta));
    }
     componentDidMount() {
      if(!this.props.users) {
        this.getData(this.props.pageNumber)
      }
    }
     componentWillReceiveProps (newProps) {
      if (newProps.pageNumber !== this.props.pageNumber) {
        this.getData(newProps.pageNumber)
      }
    }*/

    /*loadMore() {
      pageId++;
      console.log('load More', pageId)
      this.getData(pageId)
    }*/

    value: function renderUsers(loading, users) {
      if (!users) return false;
      //console.log('RENDER USERS', loading, users)
      if (loading) {
        return _react2.default.createElement(_booshReactComponents.Loading, null);
      }

      var userOptions = this.props.userOptions || {};
      //console.log('USER OPTIONS', userOptions)

      if (this.props.viewType && this.props.viewType == 'list') {
        return _react2.default.createElement(
          _reactFoundation.Row,
          { upOnSmall: 1 },
          users.map(function (item, id) {
            return _react2.default.createElement(
              _reactFoundation.Column,
              { key: id },
              _react2.default.createElement(_User2.default, { user: item, meta: true, userOptions: userOptions })
            );
          })
        );
      }

      if (this.props.viewType && this.props.viewType == 'list3') {
        return _react2.default.createElement(
          _reactFoundation.Row,
          { upOnSmall: 3 },
          users.map(function (item, id) {
            return _react2.default.createElement(
              _reactFoundation.Column,
              { key: id },
              _react2.default.createElement(_User2.default, { user: item, meta: true, userOptions: userOptions })
            );
          })
        );
      }

      var size = this.props.size || 4;

      return _react2.default.createElement(
        _reactFoundation.Row,
        { upOnSmall: 2, upOnMedium: 4, upOnLarge: size },
        users.map(function (item, id) {
          return _react2.default.createElement(
            _reactFoundation.Column,
            { key: id },
            _react2.default.createElement(_User2.default, { user: item, userOptions: userOptions })
          );
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          users = _props.users,
          pageNumber = _props.pageNumber,
          loading = _props.loading,
          viewType = _props.viewType;


      var path = this.props.path || "/users/";
      var per_page = this.props.per_page || 10;
      var pager = this.props.pager || "numbers";

      return _react2.default.createElement(
        'div',
        { className: "users users-" + viewType },
        this.renderUsers(loading, users.items),
        _react2.default.createElement(_booshReactComponents.Pagination, { path: path, pager: pager, per_page: per_page, pageNumber: pageNumber, count: users.count })
      );
    }
  }]);
  return UsersCollection;
}(_react2.default.Component);

/* Selectors */


UsersCollection.propTypes = {
  loading: _react2.default.PropTypes.bool,
  users: _react2.default.PropTypes.object,
  pageNumber: _react2.default.PropTypes.number
};

UsersCollection.defaultProps = {
  viewType: 'grid',
  loading: true,
  users: {},
  pageNumber: 1

  /*const mapStateToProps = (state, props) => {
    return {
      loading: state.users.attempting
      //users: getUsersCollection(state, props)
    }
  }*/

  //export default connect(mapStateToProps)(UsersCollection)

};exports.default = UsersCollection;