import React, { Component } from 'react'
import { compose, graphql } from 'react-apollo'
import { PUBLIC_EXAMS_PAG } from '../../apollo/queries/publicExamsPag'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Loading from '../App/Loading'
import ExamList from './ExamList'
import ListHeader from './ListHeader'
import Preview from './Preview'

const config = {
  options: props => {
    let after = props.endCursor || ''
    return {
      variables: { first: 5, after }
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
          let totalCount = fetchMoreResult.publicExamsPag.totalCount
          let newEdges = fetchMoreResult.publicExamsPag.edges
          let pageInfo = fetchMoreResult.publicExamsPag.pageInfo
          return {
            publicExamsPag: {
              totalCount,
              edges: [...prev.publicExamsPag.edges, ...newEdges],
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

    this.state = {
      exam: null
    }
  }

  previewExam = exam => this.setState({ exam })

  render() {
    const { loading, publicExamsPag, loadMoreRows } = this.props
    const { exam } = this.state
    let renderChild
    if (loading) {
      renderChild = <Loading />
    } else {
      renderChild = (
        <ExamList
          loadMoreRows={loadMoreRows}
          exams={publicExamsPag.edges}
          totalCount={publicExamsPag.totalCount}
          previewExam={this.previewExam}
        />
      )
    }
    return (
      <div className="PublicExams">
        <Typography variant="overline">Public Exam Files</Typography>
        <Divider />
        <ListHeader />
        <div className="container">
          {renderChild}
          <Preview exam={exam} />
        </div>
      </div>
    )
  }
}

export default compose(graphql(PUBLIC_EXAMS_PAG, config))(PublicExams)
