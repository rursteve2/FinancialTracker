import React, { Component } from 'react'

class Register extends Component {
    render() {
        const { username, password, passwordConfirm, firstName, lastName, onFormChange } = this.props

        return (
            <div>
            <h2>Register</h2>
            <form className="register">
                <input type="text" placeholder="First Name" name="firstName" value={firstName} onChange={onFormChange}/>
                <input type="text" placeholder="Last Name" name="lastName" value={lastName} onChange={onFormChange}/>
                <input type="text" placeholder="Username" name="username" value={username} onChange={onFormChange}/>
                <input type="text" placeholder="Password" name="password" value={password} onChange={onFormChange}/>
                <input type="text" placeholder="Confirm Password" name="passwordConfirm" value={passwordConfirm} onChange={onFormChange}/>
                <input type="submit"/>
            </form>
        </div>
        )
    }
}
export default Register