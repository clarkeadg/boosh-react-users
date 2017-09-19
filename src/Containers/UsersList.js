
/* React */
import React from 'react'
import { connect } from 'react-redux'

import { getPageNumber, getPageCount } from 'boosh-react-pagination'

/* Components */
import { Row, Column } from 'react-foundation'
import { Portlet } from 'boosh-react-components'
import { Link } from 'react-router'
import UsersCollection from '../Collections/UsersCollection'

class UsersList extends React.Component {

  render() {
    let { pageNumber, count } = this.props;
    return (
      <div className="page page-error-404">
        <Row className="display">
          <Column small={12}>
            <Portlet title={'Users'} items={
              <div>
                <UsersCollection pageNumber={pageNumber} count={count}/>
              </div>
            } />
          </Column>
        </Row>
      </div>
    );
  }

}

UsersList.propTypes = {
  pageNumber: React.PropTypes.number,
  count: React.PropTypes.number
}

UsersList.defaultProps = {
  pageNumber: 1,
  count: 0
}

const mapStateToProps = (state, props) => {
  return {
    pageNumber: getPageNumber(state, props),
    count: getPageCount(state, props)
  }
}

export default connect(mapStateToProps)(UsersList)
