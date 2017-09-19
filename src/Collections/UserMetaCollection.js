
/* React */
import React from 'react';
import { connect } from 'react-redux'

/* Actions */
import Actions from '../Actions/Creators'

/* Selectors */
import { getUserMetaCollection } from '../Selectors/UserMetaSelector'

/* Sagas */
//import GetCommentsSaga from '../../Sagas/Preloaders/GetCommentsSaga'

/* Components */
import { Row, Column, Button } from 'react-foundation';
import { Pagination, Portlet, Loading } from 'boosh-react-components'
import GetUser from '../Components/User/GetUser'
import { Link } from 'react-router'

class UserMetaCollection extends React.Component {

  getData(pageNumber) {
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
    //this.getData(this.props.pageNumber)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.pageNumber !== this.props.pageNumber) {
      //this.getData(newProps.pageNumber)
    }
  }

  /*loadMore() {
    pageId++;
    console.log('load More', pageId)
    this.getData(pageId)
  }*/

  renderUsers(loading, users) {
    if (loading) {
      return (
        <Loading/>
      )
    }
    if(this.props.viewType && this.props.viewType == 'list') {
      return (
        <Row upOnSmall={1}>
          {users.map((item, id) => {
          return (
            <Column key={id}>
              <GetUser user_id={item.user_id} meta={true}/>
            </Column>
          )
        })}
        </Row>
      )
    }
    return (
      <Row upOnSmall={1} upOnMedium={2} upOnLarge={5}>
        {users.map((item, id) => {
          return (
            <Column key={id}>
              <GetUser user_id={item.user_id}/>
            </Column>
          )
        })}
      </Row>
    )
  }

  render() {

    let { usermeta, pageNumber, path, loading, viewType } = this.props;

    console.log('RENDER USER META COLLECTION', usermeta)

    return (
      <div className={"users users-"+viewType}>
        { this.renderUsers(loading, usermeta.items) }
        <Pagination path={path} pageNumber={pageNumber} count={usermeta.count}/>
      </div>
    )
  }

}

UserMetaCollection.propTypes = {
  loading: React.PropTypes.bool,
  usermeta: React.PropTypes.object,
  pageNumber: React.PropTypes.number
}

UserMetaCollection.defaultProps = {
  viewType: 'grid',
  loading: false,
  usermeta: {},
  pageNumber: 1
}

const mapStateToProps = (state, props) => {
  return {
    loading: state.user_meta.attempting,
    usermeta: getUserMetaCollection(state, props)
  }
}

/*function preload(params, req) {
  return [
    [GetCommentsSaga, {}]
  ];
}
Comments.preload = preload;*/

export default connect(mapStateToProps)(UserMetaCollection)

