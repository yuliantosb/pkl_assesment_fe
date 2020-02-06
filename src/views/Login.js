import React, { Component } from 'react'
import Layout from '../components/Layout'
import Axios from 'axios'
import { url } from '../global'
import { Redirect, withRouter } from 'react-router-dom'

export class Login extends Component {

    state = {
        email: '',
        password: '',
        errors: null
    }

    handleChange = (name) => (e) => {
        
        this.setState({
            ...this.state,
            [name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = this.state

        Axios.post(`${url}/login`, {
            email,
            password,
        }).then(res => {

            sessionStorage.setItem('token', res.data.token)

            this.setState({
                ...this.state,
                email: '',
                password: '',
                errors: null
            })

            this.props.history.push('/')

        }).catch(err => {
            
            console.log(err)
        
            this.setState({
                ...this.state,
                errors: err.response.data.errors
            })
            
        })

    }

    render() {
     
        const { email, password, errors } = this.state
        if (sessionStorage.getItem('token')) {
            return <Redirect to="/" />
        }
        return (
            <Layout>
                <div className="container">
                    <form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="control-label">Email</label>
                                    <input value={email} onChange={this.handleChange('email')} type="text" className={`form-control ${ errors && errors.email && 'is-invalid' }`} />
                                    {
                                        errors && errors.email && (
                                        <div className="invalid-feedback">{errors.email[0]}</div>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="control-label">Password</label>
                                    <input value={password} onChange={this.handleChange('password')} type="password" className={`form-control ${ errors && errors.password && 'is-invalid' }`} />
                                    {
                                        errors && errors.password && (
                                        <div className="invalid-feedback">{errors.password[0]}</div>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="col-md-12 text-right">
                                <button type="submit" className="btn btn-primary mr-2">Login</button>
                                <button type="button" className="btn btn-secondary">Reset</button>
                            </div>
                        </div>
                    </form>
                </div>
            </Layout>
        )
    }
}

export default Login
