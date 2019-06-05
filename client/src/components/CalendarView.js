import React, { Component } from 'react';
import Calendar from 'react-calendar/dist/entry.nostyle'
import { Route, Switch } from 'react-router-dom'
import DailyExpenses from './DailyExpenses'
import MonthlyExpenses from './MonthlyExpenses'

class CalendarView extends Component {

  render() {
      const { onDateChange, date, onFormChange, token, userId } = this.props
    return (
    <div>
        <div className="calendar">
        <Calendar
          onChange={onDateChange}
          value={date}
        //   showNavigation={true}
        />
        
        </div>
        <div className="switch">
            <Switch>
                <Route path="/calendar/daily" render={() => 
                <DailyExpenses 
                date={date} 
                onFormChange={onFormChange}
                token={token}
                userId={userId}
                />}/>
                <Route path="/calendar/monthly" render={()=> <MonthlyExpenses />}/>
            </Switch>
        </div>
    </div>
    );
  }
}

export default CalendarView