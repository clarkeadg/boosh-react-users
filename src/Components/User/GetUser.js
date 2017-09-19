
/* React */
import React from 'react';
import { connect } from 'react-redux'

/* Actions */
import Actions from '../../Actions/Creators'

import { getUserById } from '../../Selectors/UserSelector'
import { Loading } from 'boosh-react-components'

/* Components */
import User from './User'

class GetUser extends React.Component {

  getData(user_id) {
    //console.log('GET USER',user_id)
    let Meta = {
      id: user_id
    }
    this.props.dispatch(Actions.getUsersAttempt(Meta));
  }

  componentDidMount() {
    if (!this.props.user_id) return;
    this.getData(this.props.user_id)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.user_id !== this.props.user_id) {
      this.getData(newProps.user_id)
    }
  }

  render() {

    let { user } = this.props
    if (!user.id) {
      return false;
      return (
        <Loading/>
      )
    }

    let meta = this.props.meta || false;

    let userOptions = this.props.userOptions || {}

    return (
      <User user={user} meta={meta} userOptions={userOptions} />
    )
  }
}

GetUser.propTypes = {
  user: React.PropTypes.object,
}

GetUser.defaultProps = {
  user: {}
}

const mapStateToProps = (state, props) => {
  return {
    user: getUserById(state, props)
  }
}

/*function preload(params, req) {
  return [
    [GetCommentsSaga, {}]
  ];
}
Comments.preload = preload;*/

export default connect(mapStateToProps)(GetUser)



