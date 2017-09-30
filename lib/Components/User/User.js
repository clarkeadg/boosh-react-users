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

var _reactRouter = require('react-router');

var _reactFoundation = require('react-foundation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Components */

/* React */
var splitTime = function splitTime(time) {
  //console.log('time', time)

  if (!time) return false;
  if (!time.split instanceof Function) return false;

  var split = time.split(' ');
  //console.log('split', split)
  if (split.length < 2) return false;

  var date = split[0];
  var dateSplit = date.split('-');
  //console.log('dateSplit', dateSplit)
  if (dateSplit.length < 3) return false;

  var year = +dateSplit[0];
  var month = +dateSplit[1];
  var day = +dateSplit[2];

  var days = split[1];
  var daySplit = days.split(':');
  //console.log('daySplit', daySplit)
  if (daySplit.length < 3) return false;

  var hour = +daySplit[0];
  var minute = +daySplit[1];
  var second = +daySplit[2];

  return year * 31557600 + month * 2592000 + day * 86400 + hour * 3600 + minute * 60 + second;
};

var checkIfOnline = function checkIfOnline(onlineTime, currentTime) {

  var currentDate = splitTime(currentTime);
  var lastOnlineDate = splitTime(onlineTime);
  if (!currentDate || !lastOnlineDate) return false;

  var fiveMinutesAgo = currentDate - 5 * 60;

  //console.log('howLongAge',currentDate,lastOnlineDate,fiveMinutesAgo)  

  if (lastOnlineDate > fiveMinutesAgo) {
    return true;
  }

  return false;
};

var dob2age = function dob2age(dob) {
  if (!dob) return '';
  var date = dob.split('-');
  if (date.length < 3) return '';
  var year = date[0];
  var month = date[1];
  var day = date[2];

  var currentTime = new Date();
  var currentMonth = currentTime.getMonth() + 1;
  var currentDay = currentTime.getDate();
  var currentYear = currentTime.getFullYear();

  var age = currentYear - year;
  if (currentMonth < month) age -= 1;
  if (currentMonth === month) {
    if (currentDay < day) age -= 1;
  }

  return age;
};

var User = function (_React$Component) {
  (0, _inherits3.default)(User, _React$Component);

  function User() {
    (0, _classCallCheck3.default)(this, User);
    return (0, _possibleConstructorReturn3.default)(this, (User.__proto__ || (0, _getPrototypeOf2.default)(User)).apply(this, arguments));
  }

  (0, _createClass3.default)(User, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          user = _props.user,
          meta = _props.meta,
          time = _props.time;

      if (!user) return false;

      var userOptions = this.props.userOptions || {};

      var resize = '?resize=w[200]h[200]e[true]';
      if (userOptions.width) {
        resize = "?resize=w[" + userOptions.width + "]";
      }
      if (userOptions.height) {
        resize += "h[" + userOptions.height + "]e[true]";
      }

      var photoServer1 = 'http://local.uploads.boosh.io';
      var defaultPhoto1 = '/defaultAvatar.jpg';

      if (typeof window != "undefined" && window.Config) {
        if (window.Config.uploadsBaseUrl) {
          photoServer1 = window.Config.uploadsBaseUrl;
        }
        if (window.Config.uploadsBaseUrl) {
          defaultPhoto1 = window.Config.defaultPhoto;
        }
      }

      var photoServer = userOptions.photoServer || photoServer1;
      var defaultPhoto = userOptions.defaultPhoto || defaultPhoto1;

      var photo = photoServer + (user.photo || defaultPhoto) + resize;

      var isOnline = false;
      if (user.online && time) {
        isOnline = checkIfOnline(user.online, time);
      }
      var online = isOnline ? 'Online Now' : '';

      if (!meta) {
        return _react2.default.createElement(
          'div',
          { className: 'User' },
          _react2.default.createElement(
            _reactRouter.Link,
            { to: '/' + user.username + '/activity', className: 'UserPhoto' },
            _react2.default.createElement('img', { className: 'UserPhoto UserPhotoMedium', src: photo })
          ),
          userOptions.showOnlineStatus ? _react2.default.createElement(
            'div',
            { className: 'onlineStatus online' },
            online
          ) : '',
          userOptions.showUsername ? _react2.default.createElement(
            _reactRouter.Link,
            { to: '/' + user.username + '/activity', className: 'UserName' },
            user.username
          ) : ''
        );
      }

      var userMeta = user.meta || {};
      var basics = userMeta.basics || {};
      var about = userMeta.about || {};
      var description = userMeta.description || {};

      var age = dob2age(basics.dob || "");

      return _react2.default.createElement(
        'div',
        { className: 'User' },
        _react2.default.createElement(
          _reactFoundation.Row,
          null,
          _react2.default.createElement(
            _reactFoundation.Column,
            { small: 2, className: 'User-photo' },
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/' + user.username + '/activity', className: 'UserPhoto' },
              _react2.default.createElement('img', { className: 'UserPhoto UserPhotoMedium', src: photo })
            )
          ),
          _react2.default.createElement(
            _reactFoundation.Column,
            { small: 10, className: 'User-meta' },
            _react2.default.createElement(
              'div',
              { className: 'User-meta-top' },
              _react2.default.createElement(
                'span',
                { className: 'User-meta-headline' },
                description.headline
              ),
              _react2.default.createElement(
                'span',
                { className: 'User-meta-location' },
                basics.city,
                ', ',
                basics.state
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'User-meta-mid' },
              description.description ? description.description : description.undefined
            ),
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/' + user.username + '/activity', className: 'UserName' },
              user.username
            ),
            _react2.default.createElement(
              'span',
              { className: 'user-list-meta' },
              age
            ),
            _react2.default.createElement(
              'span',
              { className: 'user-list-meta' },
              basics.intent
            ),
            _react2.default.createElement(
              'span',
              { className: 'user-list-meta' },
              about.education
            ),
            _react2.default.createElement(
              'span',
              { className: 'onlineStatus online' },
              online
            )
          )
        )
      );
    }
  }]);
  return User;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state, props) {
  return {
    time: state.status.time || null
  };
};

/*function preload(params, req) {
  return [
    [GetCommentsSaga, {}]
  ];
}
Comments.preload = preload;*/

//export default User

exports.default = (0, _reactRedux.connect)(mapStateToProps)(User);