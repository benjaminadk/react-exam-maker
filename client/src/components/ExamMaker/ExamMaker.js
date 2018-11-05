import React, { Component } from 'react'
import { compose, graphql } from 'react-apollo'
import { SAVE_EXAM } from '../../apollo/mutations/saveExam'
import { MY_EXAMS } from '../../apollo/queries/myExams'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import labelHelper from '../../utils/labelHelper'
import LeftColumn from './LeftColumn'
import CenterColumn from './CenterColumn'
import RightTop from './RightTop'
import RightQuestion from './RightQuestion'
import RightChoices from './RightChoices'
import RightExplanation from './RightExplanation'
import RightCover from './RightCover'
import RightJSON from './RightJSON'
import Confirm from '../App/Confirm'
import Notification from '../App/Notification'

class ExamMaker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      examId: null,
      mode: 0,
      title: '',
      code: '',
      pass: '',
      time: '',
      cover: [],
      index: null,
      test: [],
      confirmRQ: false,
      notifySE: false,
      variantSE: '',
      messageSE: ''
    }

    this.questionTile = React.createRef()
  }

  componentDidMount() {
    const { exam } = this.props
    if (exam) {
      this.setState(
        {
          examId: exam.id,
          title: exam.title,
          code: exam.code,
          pass: exam.pass,
          time: exam.time,
          cover: exam.cover,
          test: exam.test,
          index: exam.test.length ? 0 : null,
          notifySE: true,
          variantSE: 'success',
          messageSE: 'Exam Loaded Successfully'
        },
        () => this.closeNotification()
      )
    }
  }

  componentWillUnmount() {
    this.props.unloadExam()
  }

  setMode = mode => this.setState({ mode })

  saveExam = async () => {
    const { examId, title, code, pass, time, cover, test } = this.state
    const {
      user: { id }
    } = this.props
    let response = await this.props.saveExam({
      variables: {
        input: {
          examId,
          author: id,
          title,
          code,
          pass: parseInt(pass, 10),
          time: parseInt(time, 10),
          cover,
          test
        }
      },
      refetchQueries: [{ query: MY_EXAMS }]
    })
    let { success, message, exam } = response.data.saveExam
    this.setState(
      {
        examId: exam.id,
        notifySE: true,
        variantSE: success ? 'success' : 'error',
        messageSE: message
      },
      () => this.closeNotification()
    )
  }

  downloadExam = () => {
    const { title, code, pass, time, cover, test } = this.state
    const {
      user: { username }
    } = this.props
    let exam = {
      author: username,
      title,
      code,
      pass: parseInt(pass, 10),
      time: parseInt(time, 10),
      cover,
      test
    }
    let filename =
      title
        .toLowerCase()
        .trim()
        .replace(/\s/g, '-') + '.json'
    let str = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(exam))}`
    let node = document.createElement('a')
    node.setAttribute('href', str)
    node.setAttribute('download', filename)
    document.body.appendChild(node)
    node.click()
    node.remove()
  }

  addQuestion = () => {
    let { test } = this.state
    let item = {
      variant: 0,
      question: [],
      choices: [],
      answer: [],
      explanation: []
    }
    test.push(item)
    this.resetEditor()
    this.setState({ index: test.length - 1, test }, () => {
      setTimeout(() => {
        this.questionTile.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'end'
        })
      }, 250)
    })
  }

  removeQuestion = () => {
    const { test, index } = this.state
    if (!Number.isInteger(index)) return
    let newTest = test.slice(0)
    newTest.splice(index, 1)
    let newIndex = newTest.length > 0 ? index - 1 : null
    this.setState({ test: newTest, index: newIndex, confirmRQ: false })
  }

  addNode = node => {
    const { test, index, cover } = this.state
    if (!Number.isInteger(index) && node !== 'cover') return
    if (node === 'choices') {
      let label = labelHelper(test[index].choices.length)
      test[index].choices.push({ label, text: '' })
      if (test[index].variant === 2) {
        test[index].answer.push(true)
      } else {
        test[index].answer.push(false)
      }
    } else if (node === 'cover') {
      cover.push({ variant: 1, text: '' })
    } else {
      test[index][node].push({ variant: 1, text: '' })
    }
    this.setState({ test, cover })
  }

  removeNode = (i, node) => {
    const { test, index, cover } = this.state
    let newTest = test.slice(0)
    let newCover = cover.slice(0)
    if (node === 'choices') {
      newTest[index].choices.splice(i, 1)
      newTest[index].answer.splice(i, 1)
    } else if (node === 'cover') {
      newCover.splice(i, 1)
    } else {
      newTest[index][node].splice(i, 1)
    }
    this.setState({ test: newTest, cover: newCover })
  }

  setIndex = index => this.setState({ index })

  resetEditor = () => {
    this.setState({ variant: 'none' })
  }

  onChange = e => {
    const { name, value } = e.target
    let newValue
    if (name === 'title') {
      if (value.length > 20) {
        newValue = value.slice(0, 20)
      } else {
        newValue = value.slice(0)
      }
    } else if (name === 'code') {
      if (value.length > 7) {
        newValue = value.slice(0, 7)
      } else {
        newValue = value.slice(0)
      }
    } else {
      const re = /\D/g
      if (re.test(value)) {
        newValue = value
          .slice(0)
          .split('')
          .filter(v => Number.isInteger(Number(v)))
          .join('')
      } else if (value.length > 3) {
        newValue = value.slice(0, 3)
      } else {
        newValue = value.slice(0)
      }
    }
    this.setState({ [name]: newValue })
  }

  onTypeChange = e => {
    const { test, index } = this.state
    test[index].variant = e.target.value
    test[index].choices = []
    test[index].answer = []
    this.setState({ test })
  }

  onToggleCover = (e, value, i) => {
    if (!Number.isInteger(value)) return
    const { cover } = this.state
    cover[i].variant = value
    this.setState({ cover })
  }

  onCoverChange = (e, i) => {
    const { cover } = this.state
    cover[i].text = e.target.value
    this.setState({ cover })
  }

  onToggleQuestion = (e, value, i) => {
    if (!Number.isInteger(value)) return
    const { test, index } = this.state
    test[index].question[i].variant = value
    this.setState({ test })
  }

  onQuestionChange = (e, i) => {
    const { test, index } = this.state
    test[index].question[i].text = e.target.value
    this.setState({ test })
  }

  onChoiceChange = (e, i) => {
    const { test, index } = this.state
    test[index].choices[i].text = e.target.value
    this.setState({ test })
  }

  onAnswerChange = (e, checked, i) => {
    const { test, index } = this.state
    if (test[index].variant === 2) return
    test[index].answer[i] = checked
    this.setState({ test })
  }

  onToggleExplanation = (e, value, i) => {
    if (!Number.isInteger(value)) return
    const { test, index } = this.state
    test[index].explanation[i].variant = value
    this.setState({ test })
  }

  onExplanationChange = (e, i) => {
    const { test, index } = this.state
    test[index].explanation[i].text = e.target.value
    this.setState({ test })
  }

  updateJSON = (n, ns, v) => {
    const { test, cover } = this.state
    let l = ns.length
    if (l === 0) {
      return this.setState({ [n]: v })
    } else if (l === 2) {
      let i = parseInt(ns[1], 10)
      if (ns[0] === 'cover') {
        cover[i][n] = n === 'variant' ? parseInt(v, 10) : v
        this.setState({ cover })
      } else if (ns[0] === 'test') {
        test[i][n] = n === 'variant' ? parseInt(v, 10) : v
        this.setState({ test })
      }
    } else if (l === 3) {
      let j = parseInt(ns[1], 10)
      let k = parseInt(n, 10)
      test[j].answer[k] = Boolean(v)
      this.setState({ test })
    } else if (l === 4) {
      let l = parseInt(ns[1], 10)
      let m = parseInt(ns[3], 10)
      test[l][ns[2]][m][n] = n === 'variant' ? parseInt(v, 10) : v
      this.setState({ test })
    }
  }

  openConfirmRQ = () => this.setState({ confirmRQ: true })

  closeConfirmRQ = () => this.setState({ confirmRQ: false })

  closeNotification = () => this.setState({ notifySE: false })

  render() {
    const { mode, title, code, pass, time, cover, test, index } = this.state
    const { confirmRQ, notifySE, variantSE, messageSE } = this.state
    return [
      <div key="exam-maker" className="ExamMaker">
        <LeftColumn
          mode={mode}
          index={index}
          title={title}
          code={code}
          pass={pass}
          time={time}
          onChange={this.onChange}
          setMode={this.setMode}
          saveExam={this.saveExam}
          downloadExam={this.downloadExam}
        />
        <CenterColumn
          questionTile={this.questionTile}
          test={test}
          index={index}
          setIndex={this.setIndex}
          addQuestion={this.addQuestion}
          openConfirmRQ={this.openConfirmRQ}
        />
        <div className="right">
          {mode === 0 ? (
            <React.Fragment>
              <Typography variant="overline" align="center">
                Question Editor
              </Typography>
              <RightTop index={index} test={test} onTypeChange={this.onTypeChange} />
              <Divider className="divider" />
              <RightQuestion
                test={test}
                index={index}
                addQuestionNode={() => this.addNode('question')}
                onToggleQuestion={this.onToggleQuestion}
                onQuestionChange={this.onQuestionChange}
                removeQuestionNode={this.removeNode}
              />
              <Divider className="divider" />
              <RightChoices
                test={test}
                index={index}
                addChoiceNode={() => this.addNode('choices')}
                onAnswerChange={this.onAnswerChange}
                onChoiceChange={this.onChoiceChange}
                removeChoiceNode={this.removeNode}
              />
              <Divider className="divider" />
              <RightExplanation
                test={test}
                index={index}
                addExplanationNode={() => this.addNode('explanation')}
                onToggleExplanation={this.onToggleExplanation}
                onExplanationChange={this.onExplanationChange}
                removeExplanationNode={this.removeNode}
              />
            </React.Fragment>
          ) : mode === 1 ? (
            <React.Fragment>
              <Typography variant="overline" align="center">
                Cover Editor
              </Typography>
              <Divider className="divider" />
              <RightCover
                cover={cover}
                addCoverNode={() => this.addNode('cover')}
                onToggleCover={this.onToggleCover}
                onCoverChange={this.onCoverChange}
                removeCoverNode={this.removeNode}
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography variant="overline" align="center">
                JSON View
              </Typography>
              <Divider className="divider" />
              <RightJSON
                addQuestion={this.addQuestion}
                updateJSON={this.updateJSON}
                addNode={this.addNode}
                exam={{
                  title,
                  code,
                  pass: parseInt(pass, 10),
                  time: parseInt(time, 10),
                  cover,
                  test
                }}
              />
            </React.Fragment>
          )}
          <Divider />
        </div>
      </div>,
      <Confirm
        key="remove-question"
        alert={false}
        open={confirmRQ}
        title="Remove Question"
        detail="Are you sure you want to permenantly remove selected question?"
        onClose={this.closeConfirmRQ}
        onOkay={this.removeQuestion}
      />,
      <Notification key="save-exam" open={notifySE} variant={variantSE} message={messageSE} />
    ]
  }
}

export default compose(graphql(SAVE_EXAM, { name: 'saveExam' }))(ExamMaker)
