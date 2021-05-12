import React, { Component } from 'react'

export default class Todo extends Component {

    state = {
        isEditing: false,
        task: this.props.todo
    }

    // ***********************************************************************************
    editTodo = () => {
        this.setState({ isEditing: true })
    }
    // ***********************************************************************************

    // ***********************************************************************************
    handleChange = (e) => {
        this.setState({ task: e.target.value })
    }
    // ***********************************************************************************

    // ***********************************************************************************
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.updateTodos(this.props.id, this.state.task)
        this.setState({ isEditing: false })
    }
    // ***********************************************************************************


    render() {

        // jsx content when click on edit button
        if (this.state.isEditing) {
            return <div className='formTodo'>
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange} type="text" value={this.state.task} className='inputEdit' />
                    <button className='saveEdit'>Save Edit</button>
                </form>
            </div>
        }

        return (
            <div className='todo'>
                <p>{this.props.todo}</p>
                <div className='btns'>
                    <button onClick={() => this.props.removeTodo(this.props.id)} className='removeBtn'>Remove</button>
                    <button onClick={this.editTodo} className='editBtn'>Edit</button>
                </div>
            </div>
        )
    }
}
