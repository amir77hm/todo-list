import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuid';


export default class FormTodo extends Component {

    state = {
        task: ''
    }

    // ***********************************************************************************
    handleChange = (e) => {
        const val = e.target.value
        this.setState(prevState => ({
            task: val
        }))
    }
    // ***********************************************************************************


    // ***********************************************************************************
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.getTodo({ task: this.state.task, id: uuidv4() })
        this.setState({ task: '' })
    }
    // ***********************************************************************************

    render() {
        return (
            <div className='formTodo'>
                <form onSubmit={this.handleSubmit}>
                    <label column="lg" lg={2}>
                        Your Task:
                    </label>
                    <input
                        className="mb-2"
                        type="text" value={this.state.task} onChange={this.handleChange}
                    />
                    <button>Save</button>
                </form>
            </div>
        )
    }
}
