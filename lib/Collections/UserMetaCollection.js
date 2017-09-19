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

var _UserMetaSelector = require('../Selectors/UserMetaSelector');

var _reactFoundation = require('react-foundation');

var _booshReactComponents = require('boosh-react-components');

var _GetUser = require('../Components/User/GetUser');

var _GetUser2 = _interopRequireDefault(_GetUser);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Sagas */
//import GetCommentsSaga from '../../Sagas/Preloaders/GetCommentsSaga'

/* Components */


/* Actions */

/* React */
var UserMetaCollection = function (_React$Component) {
  (0, _inherits3.default)(UserMetaCollection, _React$Component);

  function UserMetaCollection() {
    (0, _classCallCheck3.default)(this, UserMetaCollection);
    return (0, _possibleConstructorReturn3.default)(this, (UserMetaCollection.__proto__ || (0, _getPrototypeOf2.default)(UserMetaCollection)).apply(this, arguments));
  }

  (0, _createClass3.default)(UserMetaCollection, [{
    key: 'getData',
    value: function getData(pageNumber) {
      var Meta = {
        query: {
          page: pageNumber,
          per_page: this.props.per_page || 10
        },
        path: this.props.path || "/users/"
      };
      this.props.dispatch(_Creators2.default.getUsersAttempt(Meta));
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      //this.getData(this.props.pageNumber)
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (newProps.pageNumber !== this.props.pageNumber) {
        //this.getData(newProps.pageNumber)
      }
    }

    /*loadMore() {
      pageId++;
      console.log('load More', pageId)
      this.getData(pageId)
    }*/

  }, {
    key: 'renderUsers',
    value: function renderUsers(loading, users) {
      if (loading) {
        return _react2.default.createElement(_booshReactComponents.Loading, null);
      }
      if (this.props.viewType && this.props.viewType == 'list') {
        return _react2.default.createElement(
          _reactFoundation.Row,
          { upOnSmall: 1 },
          users.map(function (item, id) {
            return _react2.default.createElement(
              _reactFoundation.Column,
              { key: id },
              _react2.default.createElement(_GetUser2.default, { user_id: item.user_id, meta: true })
            );
          })
        );
      }
      return _react2.default.createElement(
        _reactFoundation.Row,
        { upOnSmall: 1, upOnMedium: 2, upOnLarge: 5 },
        users.map(function (item, id) {
          return _react2.default.createElement(
            _reactFoundation.Column,
            { key: id },
            _react2.default.createElement(_GetUser2.default, { user_id: item.user_id })
          );
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          usermeta = _props.usermeta,
          pageNumber = _props.pageNumber,
          path = _props.path,
          loading = _props.loading,
          viewType = _props.viewType;


      console.log('RENDER USER META COLLECTION', usermeta);

      return _react2.default.createElement(
        'div',
        { className: "users users-" + viewType },
        this.renderUsers(loading, usermeta.items),
        _react2.default.createElement(_booshReactComponents.Pagination, { path: path, pageNumber: pageNumber, count: usermeta.count })
      );
    }
  }]);
  return UserMetaCollection;
}(_react2.default.Component);

/* Selectors */


UserMetaCollection.propTypes = {
  loading: _react2.default.PropTypes.bool,
  usermeta: _react2.default.PropTypes.object,
  pageNumber: _react2.default.PropTypes.number
};

UserMetaCollection.defaultProps = {
  viewType: 'grid',
  loading: false,
  usermeta: {},
  pageNumber: 1
};

var mapStateToProps = function mapStateToProps(state, props) {
  return {
    loading: state.user_meta.attempting,
    usermeta: (0, _UserMetaSelector.getUserMetaCollection)(state, props)
  };
};

/*function preload(params, req) {
  return [
    [GetCommentsSaga, {}]
  ];
}
Comments.preload = preload;*/

exports.default = (0, _reactRedux.connect)(mapStateToProps)(UserMetaCollection);