import React from 'react'
import Layout from '../components/Layout'
import Axios from 'axios'
import { url } from '../global'
import { Redirect } from 'react-router-dom'

class Home extends React.Component {

    state = {
        data: [],
        title: '',
        id: ''
    }

    getData = () => {

        Axios.get(`${url}/todo`,{
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            this.setState({
                ...this.state,
                data: res.data.data
            })
        }).catch(error => {
            if (error.response.status === 401) {
                this.props.history.push('/login')
            }
        })

    }

    componentDidMount = () => {
        this.getData()
    }

    handleChange = name => e => {
        this.setState({
            ...this.state,
            [name]: e.target.value
        })
    }

    handleSubmit = e => {
        if (this.state.title) {
            if (e.key === 'Enter') {
                if (this.state.id) {
                    this.handleUpdate()
                } else {
                    this.handleSave()
                }
            }
        }
    }

    handleUpdate = () => {
        const { title, id } = this.state

        Axios.post(`${url}/todo/${id}`, { title }, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            
            this.setState({
                ...this.state,
                title: '',
                id: ''
            });

            this.getData()

            }).catch(err => {
                console.log(err)
            })
    }

    handleSave = () => {
        const { title } = this.state

        Axios.post(`${url}/todo`, { title }, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            
            this.setState({
                ...this.state,
                title: ''
            });

            this.getData()

        }).catch(err => {
            console.log(err)
        })

    }

    handleDelete =  id => {
        Axios.delete(`${url}/todo/${id}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            this.getData()
        }).catch(err => {
            console.log(err)
        })
    }

    handleToggle =  id => {
        Axios.get(`${url}/todo/toggle/${id}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            this.getData()
        }).catch(err => {
            console.log(err)
        })
    }

    handleGetData = (id) => {
        Axios.get(`${url}/todo/${id}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {

            this.setState({
                ...this.state,
                title: res.data.data.title,
                id: res.data.data._id
            })

        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        const { data, title, edit } = this.state
        if (!sessionStorage.getItem('token')) {
            return <Redirect to="/login" />
        }
        return (
            <Layout>
                <div className="container">
                    <h1>Todo</h1>

                    <div className="form-group">
                        <label className="control-label">What you gonna do?</label>
                        <input type="text" value={title} onKeyPress={this.handleSubmit} onChange={this.handleChange('title')} placeholder="Press enter to submit" className="form-control form-control-lg"/>
                    </div>

                    {
                        data ? (

                            <ul className="list-group">
                                {
                                    data.map(todo => {
                                        return (<li key={todo._id} className="list-group-item">
                                                    <div className="d-flex justify-content-between" onDoubleClick={() => this.handleGetData(todo._id)}>
                                                       
                                                         {   todo.done ? (
                                                                <div><s>{ todo.title }</s></div>
                                                            ) : (
                                                                <div>{ todo.title } </div>
                                                            )
                                                        }
                                                        
                                                        
                                                        <div>
                                                            <input onChange={() => this.handleToggle(todo._id)} type="checkbox" checked={todo.done} className="mr-4" />
                                                            <button onClick={() => this.handleDelete(todo._id)} className="btn btn-danger btn-sm">&times;</button>
                                                        </div>
                                                    </div>
                                                </li>)
                                    })
                                }
                                
                            </ul>

                        ) : (
                            <p className="text-error">Loading data ...</p>
                        )
                    }
                </div>
            </Layout>
        )
    }
}

export default Home;