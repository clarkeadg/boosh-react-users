
/* React */
import React from 'react';
import { connect } from 'react-redux'

/* Actions */
import Actions from '../Actions/Creators'

/* Selectors */
import { getUsersCollection } from '../Selectors/UserSelector'

import UsersCollection from './UsersCollection'

class GetUsersCollection extends React.Component {

  getData(pageNumber) {
    let Meta = {
      query: {
        page: pageNumber,
        per_page: this.props.per_page || 10
      },
      path: this.props.path || "/quickusers/"
    }
    this.props.dispatch(Actions.getUsersAttempt(Meta));
  }

  componentDidMount() {
    //if(!this.props.users) {
      this.getData(this.props.pageNumber)
    //}
  }

  componentWillReceiveProps (newProps) {
    if (newProps.pageNumber !== this.props.pageNumber) {
      this.getData(newProps.pageNumber)
    }
  }

  render() {

    let { users, path, size, userOptions, pager, pageNumber, per_page } = this.props;
    if (!users) return false;      

    return (
      <UsersCollection 
        loading={false} 
        users={users}
        path={path}
        size={size} 
        userOptions={userOptions} 
        pager={pager} 
        pageNumber={pageNumber} 
        per_page={per_page} />
    )
  }

}

GetUsersCollection.propTypes = {
  loading: React.PropTypes.bool,
  users: React.PropTypes.object,
  pageNumber: React.PropTypes.number
}

GetUsersCollection.defaultProps = {
  viewType: 'grid',
  loading: true,
  users: {},
  pageNumber: 1
}

const mapStateToProps = (state, props) => {
  return {
    loading: state.users.attempting,
    users: getUsersCollection(state, props)
  }
}

export default connect(mapStateToProps)(GetUsersCollection)

