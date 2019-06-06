import React, { Component } from 'react';
import Calendar from 'react-calendar/dist/entry.nostyle'
import { Route, Switch, Redirect } from 'react-router-dom'
import DailyExpenses from './DailyExpenses'
import MonthlyExpenses from './MonthlyExpenses'

class CalendarView extends Component {
    constructor() {
        super() 
        this.state = {
            dailyExpense: 0,
            monthlyExpense: 0,
            income: 0,
            other: 0
        }
    }

    submittedf= () => {
        this.setState({
            submitted: true
        })
    }

  render() {
      const { onDateChange, date, onFormChange, token, userId, apiData, todaysDate, isLoggedIn, firstName, filteredData, dailyExpense, setSum, onDataChange, fetchRecords } = this.props
    return (
    <div>
        {userId && token ? null : <Redirect to="/"/>}
        <div className="calendar">
        <h1>Welcome, {firstName}</h1>
        <Calendar
          onChange={onDateChange}
          value={date}
        //   showNavigation={true}
        />
        
        </div>
        <h3>You spent ${dailyExpense.toFixed(2)} on {`${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`}.</h3>
        <div className="switch">
            <Switch>
                <Route path="/calendar/daily" render={() => 
                <DailyExpenses 
                date={date} 
                onFormChange={onFormChange}
                token={token}
                userId={userId}
                apiData={apiData}
                isLoggedIn={isLoggedIn}
                todaysDate={todaysDate}
                filteredData={filteredData}
                dailyExpense={dailyExpense}
                setSum={setSum}
                onDataChange={onDataChange}
                fetchRecords={fetchRecords}
                />}/>
                <Route path="/calendar/monthly" render={()=> <MonthlyExpenses />}/>
            </Switch>
        </div>
    </div>
    );
  }
}

export default CalendarView