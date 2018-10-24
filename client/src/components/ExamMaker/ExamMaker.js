import React, { Component } from 'react'
import { compose, graphql } from 'react-apollo'
import { CREATE_EXAM } from '../../apollo/mutations/createExam'
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

class ExamMaker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mode: 0,
      title: '',
      code: '',
      pass: '',
      time: '',
      cover: [],
      index: null,
      test: [],
      confirmRQ: false
    }

    this.questionTile = React.createRef()
  }

  setMode = mode => this.setState({ mode })

  createExam = async () => {
    const { title, code, pass, time, cover, test } = this.state
    const {
      user: { username }
    } = this.props
    let response = await this.props.createExam({
      variables: {
        input: {
          author: username,
          title,
          code,
          pass: parseInt(pass, 10),
          time: parseInt(time, 10),
          cover,
          test
        }
      }
    })
    let { success, message, exam } = response.data.createExam
    if (success) {
      // exam saved do something
    }
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
        .replace(' ', '-') + '.json'
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
      variant: 'none',
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
    this.setState({ test: newTest, index: newIndex })
  }

  addNode = node => {
    const { test, index, cover } = this.state
    if (!Number.isInteger(index) && node !== 'cover') return
    if (node === 'choices') {
      let label = labelHelper(test[index].choices.length)
      test[index].choices.push({ label, text: '' })
      test[index].answer.push(false)
    } else if (node === 'cover') {
      cover.push({ variant: '', text: '' })
    } else {
      test[index][node].push({ variant: '', text: '' })
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

  onChange = e => this.setState({ [e.target.name]: e.target.value })

  onTypeChange = e => {
    const { test, index } = this.state
    test[index].variant = e.target.value
    this.setState({ test })
  }

  onToggleCover = (e, value, i) => {
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
    test[index].answer[i] = checked
    this.setState({ test })
  }

  onToggleExplanation = (e, value, i) => {
    const { test, index } = this.state
    test[index].explanation[i].variant = value
    this.setState({ test })
  }

  onExplanationChange = (e, i) => {
    const { test, index } = this.state
    test[index].explanation[i].text = e.target.value
    this.setState({ test })
  }

  openConfirmRQ = () => this.setState({ confirmRQ: true })

  closeConfirmRQ = () => this.setState({ confirmRQ: false })

  render() {
    const { mode, title, code, pass, time, cover, test, index, confirmRQ } = this.state
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
          createExam={this.createExam}
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
      />
    ]
  }
}

export default compose(graphql(CREATE_EXAM, { name: 'createExam' }))(ExamMaker)
