import React, { Component } from 'react'
import { InfiniteLoader, List } from 'react-virtualized'
import Typography from '@material-ui/core/Typography'
import ListItem from './ListItem'
import sortExams from '../../utils/sortExams'

let virtualizedList = []

class ExamList extends Component {
  isRowLoaded = ({ index }) => !!virtualizedList[index]

  noRowsRenderer = () => <Typography variant="h6">No Exams returned from Graphql Server</Typography>

  rowRenderer = ({ key, index, style }) => {
    let exam
    if (index < virtualizedList.length) {
      exam = virtualizedList[index].node
      if (!exam) {
        return null
      }
    } else {
      return (
        <Typography key={key} style={style} variant="caption">
          Loading...
        </Typography>
      )
    }
    return (
      <ListItem
        key={key}
        style={style}
        title={exam.title}
        code={exam.code}
        length={exam.test.length}
        previewExam={() => this.props.previewExam(exam)}
        copyLink={() => this.props.copyLink(exam.id)}
        downloadExam={() => this.props.downloadExam(exam)}
      />
    )
  }

  render() {
    const { loadMoreRows, exams, totalCount } = this.props
    virtualizedList = exams.sort(sortExams)
    return (
      <div>
        <InfiniteLoader
          isRowLoaded={this.isRowLoaded}
          loadMoreRows={loadMoreRows}
          rowCount={totalCount}
        >
          {({ onRowsRendered, registerChild }) => (
            <List
              ref={registerChild}
              width={600}
              height={400}
              rowHeight={50}
              rowCount={totalCount}
              rowRenderer={this.rowRenderer}
              onRowsRendered={onRowsRendered}
              noRowsRenderer={this.noRowsRenderer}
              className="v-list"
            />
          )}
        </InfiniteLoader>
      </div>
    )
  }
}

export default ExamList
