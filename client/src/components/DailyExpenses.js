import React, { Component } from 'react';
import { makeRecord, getRecords } from '../services/api'
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
            date: `${this.props.date.getFullYear()}-${this.props.date.getMonth()+1}-${this.props.date.getDate()}`,
            isAdded: false,
            allData: [],
            recordData: []
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
                "date": Date.parse(`${this.props.date.getFullYear()}-${this.props.date.getMonth()}-${this.props.date.getDate()}`),
                "frequency": this.state.frequency,
                "income_expense": this.state.incomeExpense,
                "user_id": this.props.userId
            }
            let record = await makeRecord(this.props.userId, setRecord, this.props.token)
            console.log(Date.parse(this.props.date))
            console.log(setRecord)
            this.props.fetchRecords()
            // let allRecords = await getRecords(this.props.userId, this.props.token)
            // this.setState({allData: allRecords})
            // let newData = await this.state.allData.filter((result) => 
            // result.date == Date.parse(`${this.props.date.getFullYear()}-${this.props.date.getMonth()}-${this.props.date.getDate()}`))
            // console.log(newData)
            // this.setState({
            //     recordData: newData
            // })
            // let getPrice = this.state.recordData.map((item)=> item.price)
            // let sumPrice = getPrice.reduce((num, a) => num += a,0); 


            // this.props.setSum(sumPrice)
            if (record === undefined) {
                alert("Please Log In")
            } else {
                this.setState({
                    isAdded: true
                })
                alert("Success!")
                this.props.onDataChange()

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
      const { name, price, category, frequency, incomeExpense, date, recordData } = this.state
      let { filteredData, dailyExpense, onCalendarChange } = this.props
      let allCategories = categories.map((c) => (<option>{c}</option>))
      let allFrequencies = frequencies.map((f) => (<option>{f}</option>))
      let data = filteredData.map((item) => (
      <div>
            <tr>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.price}</td>
                <td>{item.frequency}</td>
            </tr>
      </div>))
      console.log(recordData)
    return (
      <div className="daily">
          {onCalendarChange && <h3>You have spent {dailyExpense} today.</h3>}
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
        <table>
            {data}
        </table>
      </div>
    );
  }
}

export default DailyExpenses;
