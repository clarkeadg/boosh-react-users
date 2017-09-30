
/* React */
import React from 'react';
import { connect } from 'react-redux'

/* Components */
import { Link } from 'react-router'
import { Row, Column } from 'react-foundation'

const splitTime = (time) => {
  //console.log('time', time)

  if (!time) return false;
  if (!time.split instanceof Function) return false;

  const split = time.split(' ');
  //console.log('split', split)
  if (split.length < 2) return false;

  const date = split[0];
  const dateSplit = date.split('-');
  //console.log('dateSplit', dateSplit)
  if (dateSplit.length < 3) return false;

  const year = +dateSplit[0];
  const month = +dateSplit[1];
  const day = +dateSplit[2];

  const days = split[1];
  const daySplit = days.split(':');
  //console.log('daySplit', daySplit)
  if (daySplit.length < 3) return false; 

  const hour = +daySplit[0];
  const minute = +daySplit[1];
  const second = +daySplit[2];

  return (year*31557600) + (month*2592000) + (day*86400) + (hour*3600) + (minute*60) + second;
}

const checkIfOnline = (onlineTime, currentTime) => {

  const currentDate = splitTime(currentTime);
  const lastOnlineDate = splitTime(onlineTime);
  if (!currentDate || !lastOnlineDate) return false;

  const fiveMinutesAgo = currentDate - (5 * 60);

  //console.log('howLongAge',currentDate,lastOnlineDate,fiveMinutesAgo)  

  if (lastOnlineDate > fiveMinutesAgo) {
    return true;
  }  

  return false;
}

const dob2age = (dob) => {
  if (!dob) return '';
  const date = dob.split('-');
  if (date.length < 3) return '';
  const year = date[0];
  const month = date[1];
  const day = date[2];

  const currentTime = new Date();
  const currentMonth = currentTime.getMonth() + 1;
  const currentDay = currentTime.getDate();
  const currentYear = currentTime.getFullYear();

  let age = currentYear - year;
  if (currentMonth < month) age-= 1;
  if (currentMonth === month) {
    if (currentDay < day) age-= 1;
  }

  return age;
}

class User extends React.Component {

  render() {

    let { user, meta, time } = this.props
    if (!user) return false;

    let userOptions = this.props.userOptions || {}    

    let resize = '?resize=w[200]h[200]e[true]';
    if (userOptions.width) {
      resize = "?resize=w["+userOptions.width+"]"
    }
    if (userOptions.height) {
      resize+= "h["+userOptions.height+"]e[true]"
    }

    let photoServer1 = 'http://local.uploads.boosh.io';
    let defaultPhoto1 = '/defaultAvatar.jpg';

    if (typeof window != "undefined" &&window.Config ) {
      if (window.Config.uploadsBaseUrl) {
        photoServer1 = window.Config.uploadsBaseUrl
      }
      if (window.Config.uploadsBaseUrl) {
        defaultPhoto1 = window.Config.defaultPhoto
      }
    }

    let photoServer = userOptions.photoServer || photoServer1;
    let defaultPhoto = userOptions.defaultPhoto || defaultPhoto1;

    let photo = photoServer + (user.photo || defaultPhoto) + resize;

    let isOnline = false;
    if (user.online && time) {
      isOnline = checkIfOnline(user.online, time)
    }
    let online = isOnline ? 'Online Now' : '';

    if (!meta) {
      return (
        <div className="User">
          <Link to={'/'+user.username+'/activity'} className="UserPhoto">
            <img className="UserPhoto UserPhotoMedium" src={photo} />
          </Link>
          { userOptions.showOnlineStatus ? (
            <div className="onlineStatus online">{online}</div>
          ) : '' }
          { userOptions.showUsername ? (
            <Link to={'/'+user.username+'/activity'} className="UserName">
              {user.username}
            </Link>
          ) : '' }
        </div>
      )
    }

    let userMeta = user.meta || {};
    let basics = userMeta.basics || {};
    let about = userMeta.about || {};
    let description = userMeta.description || {};

    let age = dob2age(basics.dob || "");

    return (
      <div className="User">
        <Row>
          <Column small={2} className={'User-photo'}>
            <Link to={'/'+user.username+'/activity'} className="UserPhoto">
              <img className="UserPhoto UserPhotoMedium" src={photo} />
            </Link>
          </Column>
          <Column small={10} className={'User-meta'}>
            <div className="User-meta-top">
              <span className="User-meta-headline">{description.headline}</span>
              <span className="User-meta-location">{basics.city}, {basics.state}</span>
            </div>
            <div className="User-meta-mid">
              {description.description ? description.description : description.undefined}
            </div>
            <Link to={'/'+user.username+'/activity'} className="UserName">
              {user.username}
            </Link>
            <span className="user-list-meta">{age}</span>
            <span className="user-list-meta">{basics.intent}</span>
            <span className="user-list-meta">{about.education}</span>
            <span className="onlineStatus online">{online}</span>
          </Column>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    time: state.status.time || null
  }
}

/*function preload(params, req) {
  return [
    [GetCommentsSaga, {}]
  ];
}
Comments.preload = preload;*/

//export default User

export default connect(mapStateToProps)(User)

