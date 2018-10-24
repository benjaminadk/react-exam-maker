import React, { Component } from 'react'
import ReactJson from 'react-json-view'

const style = {
  height: '73vh',
  overflow: 'auto',
  userSelect: 'none'
}

class RightJSON extends Component {
  shouldCollapse = field => {
    let arr = ['cover', 'question', 'answer', 'choices', 'explanation']
    if (arr.indexOf(field.name) !== -1) return true
    else return false
  }

  onEdit = e => {
    console.log(e)
    return false
  }

  onAdd = e => {
    console.log(e)
    if (e.name === 'test') {
      this.props.addQuestion()
      return true
    } else {
      return true
    }
  }

  render() {
    const { exam } = this.props
    return (
      <ReactJson
        src={exam}
        style={style}
        displayDataTypes={false}
        shouldCollapse={this.shouldCollapse}
      />
    )
  }
}

export default RightJSON
