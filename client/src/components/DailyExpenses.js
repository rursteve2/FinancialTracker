import React, { Component } from 'react';
import { makeRecord, deleteRecord, updateRecord } from '../services/api'
let categories = ["Other", "Breakfast", "Lunch", "Dinner", "Household Items", "Apparel", "Utilities", "Rent/Mortgage", "Subscriptions", "Groceries", "Travel", "Transportation"]
let frequencies = ["Once", "Daily", "Monthly"]
let incomeExpenseArr = ["Expense", "Income"]
let categories2 = ["Breakfast", "Lunch", "Dinner", "Household Items", "Apparel", "Utilities", "Rent/Mortgage", "Subscriptions", "Groceries", "Travel", "Transportation"]
let frequencies2 = ["Daily", "Monthly"]
let incomeExpenseArr2 = ["Income"]



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
            this.props.fetchRecords()
            if (record === undefined) {
                alert("Please Log In")
            } else {
                this.setState({
                    isAdded: true
                })
                alert("Success!")
                this.setState({
                    name: "",
                    price: "",
                    category: "Other",
                    frequency: "Once",
                    incomeExpense: "Expense"
                })
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
      let allCategories = categories.map((c, i) => (<option key={i}>{c}</option>))
      let allFrequencies = frequencies.map((f, i) => (<option key={i}>{f}</option>))
      let allIncomeExpense = incomeExpenseArr.map((j, i) => (<option key={i}>{j}</option>))
      let allCategories2 = categories2.map((c, i) => (<option value={c} key={i}>{c}</option>))
      let allFrequencies2 = frequencies2.map((f, i) => (<option value={f} key={i}>{f}</option>))
      let allIncomeExpense2 = incomeExpenseArr2.map((j, i) => (<option value={j} key={i}>{j}</option>))
      let data = filteredData.map((item, index) => (
            <div key={index} className="editform">
          {
              item.isEdit 
          ? <form className="itemrow" onSubmit={(e) => this.updateEntry(e, index, item.id)}>
                <input className="itemname" type="text" placeholder="Name" name="name" value={item.name} onChange={(e) => onFormItemChange(e, index)}/> 
                <select className="itemcategory" onChange={(e) => onFormItemChange(e, index)} name="category" value={item.category}>
                    {/* <option key={index} value="selected">{item.category}</option> */}
                    {allCategories}
                </select>   
                <select className="itemfrequency" onChange={(e) => onFormItemChange(e, index)} name="frequency" value={item.frequency}>
                    {/* <option key={index} value="selected">{item.frequency}</option> */}
                    {allFrequencies}
                </select>   
                <select className="itemincomeexpense" onChange={(e) => onFormItemChange(e, index)} name="income_expense" value={item.income_expense}>
                    {/* <option key={index} value="selected">{item.income_expense}</option>
                    <option key={index+1}>Income</option> */}
                    {allIncomeExpense}
                </select>
                <input className="itemprice" type="number" placeholder="Price" name="price" value={item.price} onChange={(e) => onFormItemChange(e, index)} required/>  
                <div id="submitclose" className="itembuttons">
                    <button type="submit">Submit</button>
                    <button onClick={e => closeEntry(e, index, item.id)}>Close</button>
                </div>
            </form> 
          : 
          <tr className="itemrow">
                <td className="itemname">{item.name}</td>
                <td className="itemcategory">{item.category}</td>
                <td className="itemfrequency">{item.frequency}</td>
                <td className="itemincomeexpense">{item.income_expense}</td>
                <td className="itemprice">{parseFloat(item.price).toFixed(2)}</td>
                <td className="itembuttons">
                    <button onClick={e => changeEntry(e, index, item.id)}>Change</button>
                    <button onClick={e => this.deletePost(e, item.id, token)}>Delete</button>
                </td>
            </tr>
        }
            </div>
          
      ))
    return (
      <div className="daily">
          <h2>Today is {this.indexToWeekday(todaysDate.getDay())}, {this.indexToMonth(todaysDate.getMonth())} {todaysDate.getDate()} {todaysDate.getFullYear()}</h2>
          {onCalendarChange && <h3>You have spent {dailyExpense} today.</h3>}
        <h1>Daily Expenses</h1>
        <form className="dailyinput"onSubmit={this.submitRecord}>
            <input type="text" placeholder="Name" name="name" value={name} onChange={onFormChange}/>
            <select onChange={onFormChange} name="category" value={category}>
                <option value="Other" selected>Other</option>
                {allCategories2}
            </select>
            <select onChange={onFormChange} name="frequency" value={frequency}>
                <option value="Once" selected>Once</option>
                {allFrequencies2}
            </select>
            <select onChange={onFormChange} name="incomeExpense" value={incomeExpense}>
                <option value="Expense" selected>Expense</option>
                {allIncomeExpense2}
            </select>
            <input type="number" placeholder="Price" name="price" value={price} onChange={onFormChange} required/>

            <input type="submit" />
        </form>
        <p>You selected {this.indexToWeekday(this.props.date.getDay())} {this.indexToMonth(this.props.date.getMonth())} {this.props.date.getDate()} {this.props.date.getFullYear()}</p>

        <table>
            <tr className="itemrow">
                <th className="itemname">Name</th>
                <th className="itemcategory">Category</th>
                <th className="itemfrequency">Frequency</th>
                <th className="itemincomeexpense">Income/Expense</th>
                <th className="itemprice">Amount</th>
                <th className="itembuttons"></th>
            </tr>
            {data}
        </table>
      </div>
    );
  }
}

export default DailyExpenses;
