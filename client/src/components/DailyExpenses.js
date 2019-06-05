import React, { Component } from 'react';
import { makeRecord } from '../services/api'
let categories = ["Breakfast", "Lunch", "Dinner", "Household Items", "Apparel", "Utilities", "Rent/Mortgage", "Subscriptions", "Groceries", "Travel", "Transportation"]
let frequencies = ["Daily", "Monthly"]


class DailyExpenses extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            name: "",
            price: "",
            category: "Other",
            frequency: "Once",
            incomeExpense: "Expense",
            date: "",
            isAdded: false
        }
    }

    indexToMonth = (i) => {
        switch(i) {
            case 0:
                return "January"
            case 1:
                return "February"
            case 2:
                return "March"
            case 3:
                return "April"
            case 4:
                return "May"
            case 5:
                return "June"
            case 6:
                return "July"
            case 7:
                return "August"
            case 8:
                return "September"
            case 9:
                return "October"
            case 10:
                return "November"
            case 11:
                return "December"
            default:
                return "No Month Selected"
        }
    }

    indexToWeekday = (i) => {
        switch(i) {
            case 0:
                return "Sunday"
            case 1:
                return "Monday"
            case 2:
                return "Tuesday"
            case 3:
                return "Wednesday"
            case 4:
                return "Thursday"
            case 5:
                return "Friday"
            case 6:
                return "Saturday"
            default:   
                return "No day selected" 
        }
    }

    submitRecord = async (e) => {
        e.preventDefault()
        try {
            const setRecord = {
                "name": this.state.name,
                "price": this.state.price,
                "category": this.state.category,
                "date": `${this.props.date.getFullYear()}-${this.props.date.getMonth()}-${this.props.date.getDate()}`,
                "frequency": this.state.frequency,
                "income_expense": this.state.incomeExpense,
                "user_id": this.props.userId
            }
            let record = await makeRecord(this.props.userId, setRecord, this.props.token)
            console.log(setRecord)
            console.log(record)
            if (record === undefined) {
                alert("Please Log In")
            } else {
                this.setState({
                    isAdded: true
                })
                alert("Success!")
            }

        } catch (e) {
          console.log(e)
        }
      }
      onFormChange = (event) => {
        const { name, value } = event.target;
        this.setState({[name]: value})
    }

  render() {
      const { onFormChange } = this
      const { name, price, category, frequency, incomeExpense, date } = this.state
      let allCategories = categories.map((c) => (<option>{c}</option>))
      let allFrequencies = frequencies.map((f) => (<option>{f}</option>))
    return (
      <div className="daily">
        <h1>Daily Expenses</h1>
        <form onSubmit={this.submitRecord}>
            <input type="text" placeholder="Name" name="name" value={name} onChange={onFormChange}/>
            <input type="text" placeholder="Price" name="price" value={price} onChange={onFormChange}/>
            <select onChange={onFormChange} name="category" value={category}>
                <option selected="selected">Other</option>
                {allCategories}
            </select>
            <select onChange={onFormChange} name="frequency" value={frequency}>
                <option selected="selected">Once</option>
                {allFrequencies}
            </select>
            <select onChange={onFormChange} name="incomeExpense" value={incomeExpense}>
                <option selected="selected">Expense</option>
                <option>Income</option>
            </select>
            {/* <input type="text" name="date" value={date} onChange={onFormChange} placeholder={this.props.date} disabled/> */}
            <input type="submit" />
            <p>You selected {this.indexToWeekday(this.props.date.getDay())} {this.indexToMonth(this.props.date.getMonth())} {this.props.date.getDate()} {this.props.date.getFullYear()}</p>
        </form>
      </div>
    );
  }
}

export default DailyExpenses;
