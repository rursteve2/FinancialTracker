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

  render() {
      const { onDateChange, date, onFormChange, token, userId, apiData, todaysDate, isLoggedIn, firstName, filteredData, dailyExpense, setSum, onDataChange, fetchRecords, changeEntry, closeEntry, onFormItemChange,closeEntrySubmit, monthlyExpense } = this.props
    return (
    <div>
        {userId && token ? null : <Redirect to="/"/>}
        <h1>Welcome, {firstName}</h1>
        <div className="calendar">
        <Calendar
          onChange={onDateChange}
          value={date}
        />
        
        </div>
        <h3>You spent ${(dailyExpense).toFixed(2)} on {`${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`}.</h3>
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
                    changeEntry={changeEntry}
                    closeEntry={closeEntry}
                    closeEntrySubmit={closeEntrySubmit}
                    onFormItemChange={onFormItemChange}
                />}/>
                <Route path="/calendar/monthly" render={()=> <MonthlyExpenses
                    monthlyExpense={monthlyExpense}
                    dailyExpense={dailyExpense}
                    apiData={apiData}
                    date={date} 
                    userId={userId}
                    token={token}
                 />}/>
            </Switch>
        </div>
    </div>
    );
  }
}

export default CalendarView