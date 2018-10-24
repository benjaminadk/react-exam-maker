import React, { Component } from 'react'
import { compose, graphql } from 'react-apollo'
import { MY_EXAMS } from '../../apollo/queries/myExams'

class ExamList extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const {
      data: { loading, myExams }
    } = this.props
    if (loading) return <div>Loading...</div>
    return (
      <div>
        Examlist
        <div>{JSON.stringify(myExams)}</div>
      </div>
    )
  }
}

export default compose(graphql(MY_EXAMS))(ExamList)
