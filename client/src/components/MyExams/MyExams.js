import React, { Component } from 'react'
import { compose, graphql } from 'react-apollo'
import { MY_EXAMS } from '../../apollo/queries/myExams'
import { PUBLIC_EXAMS_PAG } from '../../apollo/queries/publicExamsPag'
import { DELETE_EXAM } from '../../apollo/mutations/deleteExam'
import { MAKE_PUBLIC } from '../../apollo/mutations/makePublic'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Divider from '@material-ui/core/Divider'
import Actions from './Actions'
import CoverItem from './CoverItem'
import DefaultCover from './DefaultCover'
import Loading from '../App/Loading'
import Confirm from '../App/Confirm'
import Notification from '../App/Notification'
import removeTypename from '../../utils/removeTypename'
import copyToClipboard from '../../utils/copyToClipboard'
import downloadExam from '../../utils/downloadExam'

class ExamList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      examId: null,
      confirmDE: false,
      notify: false,
      variant: '',
      message: ''
    }
  }

  editExam = exam => {
    this.props.loadExam(removeTypename(exam))
    this.props.history.push('/create')
  }

  downloadExam = exam => {
    downloadExam(exam)
  }

  copyLink = examId => {
    let link = `https://exam-maker.herokuapp.com/api/json?examId=${examId}`
    copyToClipboard(link)
    this.setState(
      {
        notify: true,
        variant: 'info',
        message: 'Link Copied to Clipboard'
      },
      () => this.closeNotify()
    )
  }

  makePublic = async (examId, bool) => {
    let response = await this.props.makePublic({
      variables: { examId, bool },
      refetchQueries: [
        { query: MY_EXAMS },
        { query: PUBLIC_EXAMS_PAG, variables: { first: 5, after: '' } }
      ]
    })
    let { success, message } = response.data.makePublic
    this.setState(
      {
        notify: true,
        variant: success ? 'success' : 'error',
        message
      },
      () => this.closeNotify()
    )
  }

  deleteExam = async () => {
    const { examId } = this.state
    let response = await this.props.deleteExam({
      variables: { examId },
      refetchQueries: [{ query: MY_EXAMS }]
    })
    let { success, message } = response.data.deleteExam
    this.setState(
      {
        confirmDE: false,
        notify: true,
        variant: success ? 'success' : 'error',
        message
      },
      () => this.closeNotify()
    )
  }

  openConfirmDE = examId => this.setState({ confirmDE: true, examId })

  closeConfirmDE = () => this.setState({ confirmDE: false })

  closeNotify = () => this.setState({ notify: false, examId: null })

  render() {
    const {
      data: { loading, myExams }
    } = this.props
    const { confirmDE, notify, variant, message } = this.state
    if (loading) return <Loading />
    return [
      <div key="exam-list" className="MyExams">
        <Typography variant="overline">Saved Exams</Typography>
        <Divider className="divider" />
        <div className="cards">
          {myExams ? (
            myExams.map((e, i) => (
              <Card key={`exam-${i}`} square elevation={1} className="card">
                <CardContent>
                  <div className="cover">
                    {e.cover.length ? (
                      e.cover.map((c, j) => <CoverItem key={j} node={c} />)
                    ) : (
                      <DefaultCover title={e.title} />
                    )}
                  </div>
                </CardContent>
                <Actions
                  exam={e}
                  editExam={this.editExam}
                  downloadExam={this.downloadExam}
                  copyLink={this.copyLink}
                  makePublic={this.makePublic}
                  openConfirmDE={this.openConfirmDE}
                />
              </Card>
            ))
          ) : (
            <div className="no-exams">
              <Typography variant="h6">No Saved Exams</Typography>
            </div>
          )}
        </div>
      </div>,
      <Confirm
        key="delete-exam"
        alert={false}
        open={confirmDE}
        title="Delete Exam"
        detail="Are you sure you want to permenantly delete selected exam?"
        onClose={this.closeConfirmDE}
        onOkay={this.deleteExam}
      />,
      <Notification key="exam-notify" open={notify} variant={variant} message={message} />
    ]
  }
}

export default compose(
  graphql(MY_EXAMS),
  graphql(DELETE_EXAM, { name: 'deleteExam' }),
  graphql(MAKE_PUBLIC, { name: 'makePublic' })
)(ExamList)
