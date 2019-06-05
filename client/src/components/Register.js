import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class Register extends Component {
    render() {
        const { username, password, passwordConfirm, firstName, lastName, onFormChange, isCreated, onRegisterSubmit } = this.props
        const afterRegister = isCreated ? <Redirect to="/"/> : null//<h5>An error occured.</h5>

        return (
            <div>
                {afterRegister}
                <h2>Register</h2>
                <form className="register" onSubmit={onRegisterSubmit}>
                    <input type="text" placeholder="First Name" name="firstName" value={firstName} onChange={onFormChange} required/>
                    <input type="text" placeholder="Last Name" name="lastName" value={lastName} onChange={onFormChange} required/>
                    <input type="text" placeholder="Username" name="username" value={username} onChange={onFormChange} required/>
                    <input type="text" placeholder="Password" name="password" value={password} onChange={onFormChange} required/>
                    <input type="text" placeholder="Confirm Password" name="passwordConfirm" value={passwordConfirm} onChange={onFormChange} required/>
                    <input type="submit"/>
                </form>
            </div>
        )
    }
}
export default Register