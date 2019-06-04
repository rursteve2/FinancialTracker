import React, { Component } from 'react';
import Calendar from 'react-calendar/dist/entry.nostyle'

class CalendarView extends Component {

  render() {
    return (
      <div className="calendar">
        <Calendar
          onDateChange={this.props.onDateChange}
          value={this.props.date}
        />
      </div>
    );
  }
}

export default CalendarView