import React, { Component } from 'react'
import { compose, graphql } from 'react-apollo'
import { PUBLIC_EXAMS_PAG } from '../../apollo/queries/publicExamsPag'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Loading from '../App/Loading'

const config = {
  options: props => {
    let after = props.endCursor || ''
    return {
      variables: { first: 2, after, search: '' }
    }
  },
  force: true,
  props: ({ ownProps, data }) => {
    const { loading, publicExamsPag, fetchMore } = data
    const loadMoreRows = () => {
      return fetchMore({
        variables: {
          after: publicExamsPag.pageInfo.endCursor
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          const { totalCount, edges, pageInfo } = fetchMoreResult.publicExamsPag
          return {
            publicExamsPag: {
              totalCount,
              edges: [...prev.publicExamsPag.edges, ...edges],
              pageInfo,
              __typename: 'PagPayload'
            }
          }
        }
      })
    }
    return { loading, publicExamsPag, loadMoreRows }
  }
}

class PublicExams extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const { loading, publicExamsPag, loadMoreRows } = this.props
    if (loading) return <Loading />
    return (
      <div className="PublicExams">
        <Typography variant="overline">Public Exam Files</Typography>
        <Divider />
        <div>{JSON.stringify(publicExamsPag.edges)}</div>
      </div>
    )
  }
}

export default compose(graphql(PUBLIC_EXAMS_PAG, config))(PublicExams)
