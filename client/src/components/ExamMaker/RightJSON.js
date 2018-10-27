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

  onDelete = e => {
    console.log(e)
    return false
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
        onDelete={this.onDelete}
        // theme={{
        //   base00: 'white',
        //   base01: '#ddd',
        //   base02: '#ddd',
        //   base03: '#444',
        //   base04: 'rgb(224, 31, 144)',
        //   base05: '#444',
        //   base06: '#444',
        //   base07: '#444',
        //   base08: '#444',
        //   base09: 'rgb(36, 132, 235)',
        //   base0A: 'rgb(36, 132, 235)',
        //   base0B: 'rgb(36, 132, 235)',
        //   base0C: 'rgb(36, 132, 235)',
        //   base0D: 'rgb(36, 132, 235)',
        //   base0E: 'rgb(36, 132, 235)',
        //   base0F: 'rgb(36, 132, 235)'
        // }}
      />
    )
  }
}

export default RightJSON
