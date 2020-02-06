import React, { Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom'

class Layout extends React.Component {
    handleLogout = () => {
        sessionStorage.removeItem('token')
    }
    render() {
        return (
            <Fragment>
                <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
                    <div className="container">
                        <a className="navbar-brand" href="#">Todo</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                {
                                    sessionStorage.getItem('token') ? (
                                        <Fragment>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/">Home </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/about">About</Link>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="#" onClick={this.handleLogout} >Logout</a>
                                            </li>
                                        </Fragment>
                                    ) : (
                                        <Fragment>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/login">Login </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/register">Register</Link>
                                            </li>
                                        </Fragment>
                                    )
                                }
                                
                            
                            </ul>
                        </div>
                    </div>
                </nav>
                {this.props.children}
            </Fragment>
        )
    }
}


export default Layout