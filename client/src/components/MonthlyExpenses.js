import React, { Component } from 'react'
import { Switch, Link, Route, Redirect } from 'react-router-dom'
import { LineChart, PieChart } from 'react-chartkick'
import 'chart.js'

class MonthlyExpenses extends Component {
    constructor() {
        super()
        this.state = {
            income: 0,
            expense: 0,
            breakfast: 0,
            lunch: 0,
            dinner: 0,
            household: 0,
            apparel: 0,
            utilities: 0,
            rent: 0,
            subscriptions: 0,
            groceries: 0,
            travel: 0,
            transportation: 0,
            other: 0,
            freqOnce: 0,
            freqDaily: 0,
            freqMonthly: 0
        }
    }
    
    filterData = async () => {
        const arrSum = arr => arr.reduce((a,b) => a + b, 0)
        let other = await this.props.apiData.filter((month) => {
            return month.category == "Other"
        })
        let otherPrice = other.map(el => el.price)

        let transportation = await this.props.apiData.filter((month) => {
            return month.category == "Transportation"
        })
        let transportationPrice = transportation.map(el => el.price)

        let travel = await this.props.apiData.filter((month) => {
            return month.category == "Travel"
        })
        let travelPrice = travel.map(el => el.price)

        let groceries = await this.props.apiData.filter((month) => {
            return month.category == "Groceries"
        })
        let groceriesPrice = groceries.map(el => el.price)

        let subscriptions = await this.props.apiData.filter((month) => {
            return month.category == "Subscriptions"
        })
        let subPrice = subscriptions.map(el => el.price)

        let rent = await this.props.apiData.filter((month) => {
            return month.category == "Rent/Mortgage"
        })
        let rentPrice = rent.map(el => el.price)

        let utilities = await this.props.apiData.filter((month) => {
            return month.category == "Utilities"
        })
        let utilitiesPrice = utilities.map(el => el.price)

        let apparel = await this.props.apiData.filter((month) => {
            return month.category == "Apparel"
        })
        let apparelPrice = apparel.map(el => el.price)

        let household = await this.props.apiData.filter((month) => {
            return month.category == "Household"
        })
        let householdPrice = household.map(el => el.price)

        let dinner = await this.props.apiData.filter((month) => {
            return month.category == "Dinner"
        })
        let dinnerPrice = dinner.map(el => el.price)

        let lunch = await this.props.apiData.filter((month) => {
            return month.category == "Lunch"
        })
        let lunchPrice = lunch.map(el => el.price)

        let breakfast = await this.props.apiData.filter((month) => {
            return month.category == "Breakfast"
        })
        let breakfastPrice = breakfast.map(el => el.price)

        let income = await this.props.apiData.filter((month) => {
            return month.income_expense == "Income"
        })
        let incomePrice = income.map(el => el.price)

        let expense = await this.props.apiData.filter((month) => {
            return month.income_expense == "Expense"
        })
        let expensePrice = expense.map(el => el.price)

        let freqOnce = await this.props.apiData.filter((month) => {
            return month.frequency == "Once"
        })
        let freqOncePrice = freqOnce.map(el => el.price)

        let freqMonthly = await this.props.apiData.filter((month) => {
            return month.frequency == "Monthly"
        })
        let freqMonthlyPrice = freqMonthly.map(el => el.price)

        let freqDaily = await this.props.apiData.filter((month) => {
            return month.frequency == "Daily"
        })
        let freqDailyPrice = freqDaily.map(el => el.price)
        console.log(expensePrice)

        
        this.setState({
            other: arrSum(otherPrice),
            transportation: arrSum(transportationPrice),
            travel: arrSum(travelPrice),
            groceries: arrSum(groceriesPrice),
            subscriptions: arrSum(subPrice),
            rent: arrSum(rentPrice),
            utilities: arrSum(utilitiesPrice),
            apparel: arrSum(apparelPrice),
            household: arrSum(householdPrice),
            dinner: arrSum(dinnerPrice),
            lunch: arrSum(lunchPrice),
            breakfast: arrSum(breakfastPrice),
            income: arrSum(incomePrice),
            expense: arrSum(expensePrice),
            freqOnce: arrSum(freqOncePrice),
            freqDaily: arrSum(freqDailyPrice),
            freqMonthly: arrSum(freqMonthlyPrice)

        })
    }

    componentDidMount = () => {
        this.filterData()
    }


  render() {
      const { userId, token } = this.props
      const { lunch, household, dinner, apparel, utilities, rent, subscriptions, groceries, travel, transportation, other, freqOnce, freqDaily, freqMonthly } = this.state
    return (
      <div className="monthly">
        {userId && token ? null : <Redirect to="/"/>}
        <h1>Monthly Expenses</h1>
        {/* <Link onClick={this.filterData}>Get Data</Link>
        <Link to="/incomeexpenses">Daily Chart</Link> */}
        <h2>Income or Expense?</h2>
        <PieChart data={[["Income", this.state.income], ["Expenses", this.state.expense]]} />
        <h2>Category</h2>
        <PieChart data={[
            ["Breakfast", this.state.breakfast],
            ["Lunch", lunch], 
            ["Household", household], 
            ["Apparel", apparel], 
            ["Utilities", utilities], 
            ["Rent/Mortgage", rent], 
            ["Subscriptions", subscriptions],
            ["Groceries", groceries],
            ["Travel", travel],
            ["Transportation", transportation],
            ["Other", other]
         ]}/> 
         <h2>Frequency</h2>
        <PieChart data={[["Once", this.state.freqOnce], ["Daily", this.state.freqDaily], ["Monthly", this.state.freqMonthly]]} />

      </div>
    );
  }
}

export default MonthlyExpenses;
