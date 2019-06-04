import React, { Component } from 'react';
import './App.css';
import Header from './components/Header'
import Login from './components/Login'
import { Route, Switch, Redirect } from 'react-router-dom'
import DailyExpenses from './components/DailyExpenses'
import MonthlyExpenses from './components/MonthlyExpenses'
import CalendarView from './components/CalendarView'
import Register from './components/Register'
import { loginUser, createUser } from './services/api'


class App extends Component {
  constructor() {
    super()
    this.state = {
      date: new Date(),
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      passwordConfirm: "",
      isLoggedIn: false,
      isCreated: false,
      userId:""
    }
  }

  onDateChange = date => this.setState({ date })

  onLoginSubmit = async (e) => {
    e.preventDefault()
    try {
      const login = {
        "username": this.state.username,
        "password": this.state.password
      }
      const user = await loginUser(login)
      this.setState({
        isLoggedIn: true,
        userId: user.user_id
      })
      this.onChangeHandler(user.token)
      localStorage.setItem('token', user.token)
    } catch(e) {
      alert("Wrong username/password")
      console.log("Wrong Username or Password: ", e)
    }
  }

  onFormChange = (event) => {
    const { name, value } = event.target;
    this.setState({[name]: value})
}

  onRegisterSubmit = async () => {
    try {
      const setUser = {
        "username": this.state.username,
        "password": this.state.password,
        "password_confirmation": this.state.passwordConfirm,
        "first_name": this.state.firstName,
        "last_name": this.state.lastName
      }
      const user = await createUser(setUser)
      this.setState({
        isCreated: true
      })
    } catch (e) {
      console.log(e)
    }
  }



  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" render={() => 
              <Login 
              onFormChange={this.onFormChange}
              onLoginSubmit={this.onLoginSubmit}
              username={this.state.username}
              password={this.state.password}
              isLoggedIn={this.state.isLoggedIn}
              />}/>
          <Route path="/register" render={() => 
            <Register 
            onFormChange={this.onFormChange}
            username={this.state.username}
            password={this.state.password}
            passwordConfirm={this.state.passwordConfirm}
            firstName={this.state.firstName}
            lastName={this.state.lastName}
            isCreated={this.state.isCreated}
            onRegisterSubmit={this.onRegisterSubmit}

            />}/>
          <Route path="/daily" render={() => <DailyExpenses />}/>
          <Route path="/monthly" render={()=> <MonthlyExpenses />}/>
          <Route path="/calendar" render={() => <CalendarView onDateChange={this.onDateChange} date={this.state.date} />}/>
            
        </Switch>
      </div>
    );
  }
}

export default App;
