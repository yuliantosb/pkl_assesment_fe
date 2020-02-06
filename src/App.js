import React from 'react'
import { Switch, BrowserRouter, Route } from 'react-router-dom'
import Home from './views/Home'
import About from './views/About'
import Register from './views/Register'
import Login from './views/Login'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact={true} />
          <Route path="/about" component={About} exact={true} />
          <Route path="/register" component={Register} exact={true} />
          <Route path="/login" component={Login} exact={true} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App