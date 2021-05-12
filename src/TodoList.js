import React, { Component } from 'react'
import Swal from 'sweetalert2';


import FormTodo from "./FormTodo";
import Todo from "./Todo";

export default class TodoList extends Component {


    state = {
        tasks: []
    }


    // ***********************************************************************************
    // set tasks to local storage
    setToLS = (tasks) => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }
    // ***********************************************************************************



    // ***********************************************************************************
    // get todo from form input and save to state
    getTodo = async (todo) => {

        // return error if input is empty using Swal
        if (!todo.task) {
            Swal.fire({
                icon: 'error',
                title: 'Wrong input',
                showConfirmButton: false,
                timer: 1500
            })
            return false;
        }

        // uodate state with new task
        await this.setState(prevState => ({
            tasks: [
                ...prevState.tasks, todo
            ]
        }))

        // set new state to local storage
        this.setToLS(this.state.tasks)
    }
    // ***********************************************************************************



    // ***********************************************************************************
    // remove todo from state and Local storage
    removeTodo = async (id) => {
        const oList = this.state.tasks
        const nList = oList.filter(todo => todo.id !== id)
        await this.setState({ tasks: nList })
        this.setToLS(this.state.tasks)
    }
    // ***********************************************************************************


    // ***********************************************************************************
    // get eddited todo from child and update state
    updateTodos = async (id, task) => {

        // return error if input is empty using Swal
        if (!task) {
            Swal.fire({
                icon: 'error',
                title: 'Wrong input',
                showConfirmButton: false,
                timer: 1500
            })
            return false;
        }

        // create new tasks for save in state
        const nList = this.state.tasks.map(todo => {
            if (todo.id === id) {
                return { ...todo, task: task }
            }
            return todo
        })

        // update state
        await this.setState({ tasks: nList })

        // set new state to Local storage
        this.setToLS(this.state.tasks)
    }
    // ***********************************************************************************


    // ***********************************************************************************
    // get tasks from local storage
    getFromLS = () => {
        const taskLs = JSON.parse(localStorage.getItem('tasks'))

        // if tasks dont null set to state
        if (taskLs) {
            this.setState({ tasks: taskLs })
        }
    }
    // ***********************************************************************************


    // ***********************************************************************************
    componentDidMount() {
        this.getFromLS()
    }
    // ***********************************************************************************


    render() {

        // create todo tag from state
        const todos = this.state.tasks.map(todo => {
            return <Todo todo={todo.task} key={todo.id}
                id={todo.id} removeTodo={this.removeTodo} updateTodos={this.updateTodos} />
        })

        return (
            <div className='todoList'>
                <FormTodo getTodo={this.getTodo} />
                <h1>  Your Tasks:</h1>
                {todos}
            </div >
        )
    }
}
