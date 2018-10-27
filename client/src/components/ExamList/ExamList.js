import React, { Component } from 'react'
import { compose, graphql } from 'react-apollo'
import { withStyles } from '@material-ui/core/styles'
import { MY_EXAMS } from '../../apollo/queries/myExams'
import { DELETE_EXAM } from '../../apollo/mutations/deleteExam'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'
import EditIcon from '@material-ui/icons/EditSharp'
import DownloadIcon from '@material-ui/icons/GetAppSharp'
import DeleteIcon from '@material-ui/icons/DeleteSharp'
import LinkIcon from '@material-ui/icons/LinkSharp'
import Loading from '../App/Loading'
import Confirm from '../App/Confirm'
import Notification from '../App/Notification'
import removeTypename from '../../utils/removeTypename'
import copyToClipboard from '../../utils/copyToClipboard'

const styles = theme => ({
  caption: {
    width: 250,
    fontSize: '.65rem'
  },
  iconButton: {
    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor: 'transparent'
    }
  }
})

class ExamList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      examId: null,
      confirmDE: false,
      notifyDE: false,
      variantDE: '',
      messageDE: ''
    }
  }

  editExam = exam => {
    this.props.loadExam(removeTypename(exam))
    this.props.history.push('/create')
  }

  downloadExam = exam => {
    const { author, title, code, pass, time, cover, test } = exam
    let examDL = {
      author,
      title,
      code,
      pass,
      time,
      cover,
      test
    }
    let filename =
      title
        .toLowerCase()
        .trim()
        .replace(/\s/g, '-') + '.json'
    let str = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(examDL))}`
    let node = document.createElement('a')
    node.setAttribute('href', str)
    node.setAttribute('download', filename)
    document.body.appendChild(node)
    node.click()
    node.remove()
  }

  copyLink = examId => {
    let link = `https://exam-maker.herokuapp.com/api/json?examId=${examId}`
    copyToClipboard(link)
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
        notifyDE: true,
        variantDE: success ? 'success' : 'error',
        messageDE: message
      },
      () => this.closeNotifyDE()
    )
  }

  openConfirmDE = examId => this.setState({ confirmDE: true, examId })

  closeConfirmDE = () => this.setState({ confirmDE: false })

  closeNotifyDE = () => this.setState({ notifyDE: false, examId: null })

  render() {
    const {
      data: { loading, myExams },
      classes
    } = this.props
    const { confirmDE, notifyDE, variantDE, messageDE } = this.state
    if (loading) return <Loading />
    return [
      <div key="exam-list" className="ExamList">
        <Typography variant="overline">Saved Exams</Typography>
        <Divider className="divider" />
        <div className="cards">
          {myExams ? (
            myExams.map((e, i) => (
              <Card key={`exam-${i}`} square elevation={1} className="card">
                <CardContent>
                  <div className="cover">
                    {e.cover.length
                      ? e.cover.map((c, j) => {
                          if (c.variant === 0)
                            return (
                              <img key={c.text} src={c.text} alt="cover" className="cover-img" />
                            )
                          else if (c.variant === 1)
                            return (
                              <Typography
                                key={c.text}
                                variant="caption"
                                classes={{ caption: classes.caption }}
                                noWrap
                              >
                                {c.text}
                              </Typography>
                            )
                          else
                            return (
                              <Typography key={c.text} variant="subtitle2">
                                {c.text}
                              </Typography>
                            )
                        })
                      : [
                          <Typography key={`title-${i}`} variant="subtitle2">
                            {e.title}
                          </Typography>,
                          <img
                            key={`cover-${i}`}
                            src="https://s3.amazonaws.com/electron-exam/general/icon.png"
                            alt="default"
                            className="cover-filler"
                          />,
                          <Typography key={`code-${i}`} variant="caption">
                            Create cover for cooler display
                          </Typography>
                        ]}
                  </div>
                </CardContent>
                <CardActions className="actions">
                  <IconButton
                    onClick={() => this.editExam(e)}
                    classes={{ root: classes.iconButton }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => this.downloadExam(e)}
                    classes={{ root: classes.iconButton }}
                  >
                    <DownloadIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => this.copyLink(e.id)}
                    classes={{ root: classes.iconButton }}
                  >
                    <LinkIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => this.openConfirmDE(e.id)}
                    classes={{ root: classes.iconButton }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
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
      <Notification key="exam-deleted" open={notifyDE} variant={variantDE} message={messageDE} />
    ]
  }
}

export default compose(
  withStyles(styles),
  graphql(MY_EXAMS),
  graphql(DELETE_EXAM, { name: 'deleteExam' })
)(ExamList)
