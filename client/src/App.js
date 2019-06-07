import React, { Component } from 'react';
import './App.css';
import Header from './components/Header'
import Login from './components/Login'
import { Route, Switch } from 'react-router-dom'
import CalendarView from './components/CalendarView'
import Register from './components/Register'
import { loginUser, createUser, getRecords } from './services/api'


class App extends Component {
  constructor() {
    super()
    this.state = {
      date: new Date(),
      todaysDate: new Date(),
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      passwordConfirm: "",
      isLoggedIn: false,
      isCreated: false,
      userId:"",
      apiData: [],
      current: [],
      token: null,
      filteredData:[],
      dailyExpense: 0,
      monthlyExpense: 0,
      income: 0,
      other: 0
    }
  }

  onDateChange = async (date) => {
    await this.setState({ date })
      this.onDataChange()
      console.log(Date.parse(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`))    
  }

  changeEntry = async (e, index, id) => {
    e.preventDefault()
    console.log("updating", id)
    console.log(e.target.value)
    let {filteredData, current} = this.state
    filteredData[index].isEdit = true
    filteredData.forEach( (element,index) => {
      current[index] = {...element}
      
    });
    await this.setState({
      filteredData,
      current: [...current]
    })
}
closeEntry = async (e, index, id) => {
  console.log("updating", id)
  let {filteredData, current} = this.state
  filteredData[index] = {...current[index]}
  filteredData[index].isEdit = false
  console.log(this.state.current)
  await this.setState({
    filteredData
  })

}
closeEntrySubmit = async (index) => {
  let {filteredData, current} = this.state
  filteredData.forEach( (element, index2) => {
    if(index2 !== index){
      element = {...current[index]}
    }
    element.isEdit = false
    
  });
  console.log(this.state.current)
  await this.setState({
    filteredData
  })

}



  onDataChange = async () => {
    let newData = await this.state.apiData.filter((result) => 
    result.date == Date.parse(`${this.state.date.getFullYear()}-${this.state.date.getMonth()}-${this.state.date.getDate()}`))
    console.log(newData)
    newData.forEach(el => {
      el.isEdit = false
    });
    let getPrice = newData.map((item)=> parseFloat(item.price))
    let sumPrice = getPrice.reduce((num, a) => num += a,0); 
    this.setState({
      filteredData: newData,
      dailyExpense : sumPrice
    })
  }

  setSum = (num) => {
    this.setState({
      dailyExpense: num
    })
  }

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
          userId: user.user_id,
          token: user.token,
          firstName: user.user.first_name,
          lastName: user.user.last_name,
          password: ""
        })
        localStorage.setItem('token', user.token)
        console.log(this.state.userId, this.state.isLoggedIn, this.state.token)
        this.fetchRecords()
    } catch(e) {
      alert("Wrong username or password")
      console.log("Wrong Username or Password: ", e)
    }
  }

  fetchRecords = async () => {
    let allRecords = await getRecords(this.state.userId, this.state.token)
        console.log('all',allRecords)
        this.setState({
          apiData: allRecords,
        })
        this.onDataChange()
  }

  componentDidMount = () => {
    if (localStorage.getItem('token') != null) {
      this.setState({
        token: localStorage.getItem('token')
        // todaysDate: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
      })
    }
  }

  onFormChange = (event) => {
    const { name, value } = event.target;
    this.setState({[name]: value})
}
onFormItemChange = (event, index) => {
  const { name, value } = event.target;
  const {filteredData} = this.state
  filteredData[index][name] = value
   this.setState({filteredData})
}

  onRegisterSubmit = async (e) => {
    e.preventDefault()
    try {
      const setUser = {
        "username": this.state.username,
        "password": this.state.password,
        "password_confirmation": this.state.passwordConfirm,
        "first_name": this.state.firstName,
        "last_name": this.state.lastName
      }
      const user = await createUser(setUser)
      if (e.status == 422) {
        alert("422!!")
      } else {
        this.setState({
          isCreated: true
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

  logout = () => {
    localStorage.clear()
    this.setState({
      userId: "",
      token: null,
      apiData:[],
      isLoggedIn: false
    })
  }



  render() {
    return (
      <div className="App">
        <Header 
        logout={this.logout}
        userId={this.state.userId}
        token={this.state.token}
        />
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
          <Route path="/calendar" render={() => 
            <CalendarView 
            onDateChange={this.onDateChange} 
            date={this.state.date} 
            onFormChange={this.onFormChange}
            token={this.state.token}
            userId={this.state.userId}
            apiData={this.state.apiData}
            isLoggedIn={this.state.isLoggedIn}
            todaysDate={this.state.todaysDate}
            filteredData={this.state.filteredData}
            firstName={this.state.firstName}
            dailyExpense={this.state.dailyExpense}
            monthlyExpense={this.state.monthlyExpense}
            onCalendarChange={this.state.onCalendarChange}
            setSum={this.setSum}
            onDataChange={this.onDataChange}
            fetchRecords={this.fetchRecords}
            changeEntry={this.changeEntry}
            closeEntry={this.closeEntry}
            closeEntrySubmit={this.closeEntrySubmit}
            onFormItemChange={this.onFormItemChange}
            />}/>
            
        </Switch>
      </div>
    );
  }
}

export default App;
