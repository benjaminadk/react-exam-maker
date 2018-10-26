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
    return this.props.updateJSON(e.name, e.namespace, e.new_value)
  }

  onAdd = e => {
    if (e.name === 'test') {
      return this.props.addQuestion()
    } else if (['cover', 'question', 'choices', 'explanation'].indexOf(e.name) !== -1) {
      return this.props.addNode(e.name)
    } else {
      return false
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
        onEdit={this.onEdit}
        onAdd={this.onAdd}
      />
    )
  }
}

export default RightJSON
