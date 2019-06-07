import React, { Component } from 'react';
import { makeRecord, getRecords, deleteRecord, updateRecord } from '../services/api'
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
            recordData: [],
            isEdited: false,
            editName: "",
            editPrice: "",
            editCategory: "",
            editFrequency: "",
            idBeingEdited: ""
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

      deletePost = async (e, id) => {
          e.preventDefault()
          await deleteRecord(this.props.userId, id, this.props.token)
          this.props.fetchRecords()
          this.props.onDataChange()
          console.log("Deleted post with id", id)
      }

      
    onFormChange = (event) => {
        const { name, value } = event.target;
        this.setState({[name]: value})
    }

    updateEntry = async (e, index, id) => {
        e.preventDefault()
        let {filteredData,closeEntrySubmit} = this.props

        let updatedEntry = {...filteredData[index]
        }
        await updateRecord(this.props.userId, id, updatedEntry, this.props.token)
        closeEntrySubmit(index)
        this.props.onDataChange()

    }



  render() {
      const { onFormChange } = this
      const { name, price, category, frequency, incomeExpense, date, recordData } = this.state
      let { filteredData, dailyExpense, onCalendarChange, token, todaysDate, changeEntry, closeEntry, onFormItemChange } = this.props
      let allCategories = categories.map((c) => (<option>{c}</option>))
      let allFrequencies = frequencies.map((f) => (<option>{f}</option>))
      let data = filteredData.map((item, index) => (
            <div>
          {item.isEdit 
          ? <form onSubmit={(e) => this.updateEntry(e, index, item.id)}>
                <input type="text" placeholder="Name" name="name" value={item.name} onChange={(e) => onFormItemChange(e, index)}/> 
                <input type="number" placeholder="Price" name="price" value={item.price} onChange={(e) => onFormItemChange(e, index)} required/>  
                <select onChange={(e) => onFormItemChange(e, index)} name="category" value={item.category}>
                    <option selected="selected">{item.category}</option>
                    {allCategories}
                </select>   
                <select onChange={(e) => onFormItemChange(e, index)} name="frequency" value={item.frequency}>
                    <option selected="selected">{item.frequency}</option>
                    {allFrequencies}
                </select>   
                <input type="submit" /> 
                <button onClick={e => closeEntry(e, index, item.id)}>Close</button>
            </form> 
          : <tr className="itemrow">
                <td className="itemname">{item.name}</td>
                <td className="itemcategory">{item.category}</td>
                <td className="itemfrequency">{item.frequency}</td>
                <td className="itemprice">{parseFloat(item.price).toFixed(2)}</td>
                <div className="itembuttons">
                    <button onClick={(e) => changeEntry(e, index, item.id)}>Change</button>
                    <button onClick={e => this.deletePost(e, item.id, token)}>Delete</button>
                </div>
            </tr>}
            </div>
          
      ))
    return (
      <div className="daily">
          <h2>Today is {this.indexToWeekday(todaysDate.getDay())}, {this.indexToMonth(todaysDate.getMonth())} {todaysDate.getDate()} {todaysDate.getFullYear()}</h2>
          {onCalendarChange && <h3>You have spent {dailyExpense} today.</h3>}
        <h1>Daily Expenses</h1>
        <form onSubmit={this.submitRecord}>
            <input type="text" placeholder="Name" name="name" value={name} onChange={onFormChange}/>
            <input type="number" placeholder="Price" name="price" value={price} onChange={onFormChange} required/>
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
            <input type="submit" />
        </form>
        <p>You selected {this.indexToWeekday(this.props.date.getDay())} {this.indexToMonth(this.props.date.getMonth())} {this.props.date.getDate()} {this.props.date.getFullYear()}</p>

        <table>
            {data}
        </table>
      </div>
    );
  }
}

export default DailyExpenses;
