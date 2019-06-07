import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class Register extends Component {
    render() {
        const { username, password, passwordConfirm, firstName, lastName, onFormChange, isCreated, onRegisterSubmit } = this.props
        const afterRegister = isCreated ? <Redirect to="/"/> : null
        return (
            <div className="register">
                {afterRegister}
                <h2 className="registerheader">Register</h2>
                <form className="registerform" onSubmit={onRegisterSubmit}>
                    <input className="registerinput" type="text" placeholder="First Name" name="firstName" value={firstName} onChange={onFormChange} required/>
                    <input className="registerinput" type="text" placeholder="Last Name" name="lastName" value={lastName} onChange={onFormChange} required/>
                    <input className="registerinput" type="text" placeholder="Username" name="username" value={username} onChange={onFormChange} required/>
                    <input className="registerinput" type="password" placeholder="Password" name="password" value={password} onChange={onFormChange} required/>
                    <input className="registerinput" type="password" placeholder="Confirm Password" name="passwordConfirm" value={passwordConfirm} onChange={onFormChange} required/>
                    <input className="registersubmit" type="submit"/>
                </form>
            </div>
        )
    }
}
export default Register