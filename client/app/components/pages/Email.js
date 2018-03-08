import React, { Component } from 'react';

import AllNav from './../navs/All_Nav'

export default class Email extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailValid: false,
            nameValid: false,
            messageValid: false,
            emailError: false,
            nameError: false,
            messageError: false,
            emailSuccess: null
        };
    }
    submitMessage(e){
        e.preventDefault();
        const inputs = {
            name: this.refs.nameInput.value,
            email: this.refs.emailInput.value,
            message: this.refs.messageInput.value
        }
        fetch('/api/email', {
            method: 'post',
            body: JSON.stringify(inputs),
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            },
        }).then((response) => response.json())
        .then((results) => {
        	if(results.success){
                this.setState({
                    emailSuccess: true
                })
            } else {
                this.setState({
                    emailSuccess: false
                })
            }
            setTimeout(() => {
                this.setState({
                    emailSuccess: null
                })
            }, 5000)
        });

    	this.refs.nameInput.value = ""
    	this.refs.emailInput.value = ""
    	this.refs.messageInput.value = ""
    }
    onEmailChange(){
        const emailInput = this.refs.emailInput.value;
        if(emailInput.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
            this.setState({
                emailValid: true,
                emailError: false
            })
        } else {
            this.setState({
                emailValid: false,
                emailError: true
            })
        }
    }
    onNameChange(){
        const nameInput = this.refs.nameInput.value;
        if(nameInput !== "" && nameInput.match(/^[^0-9]+$/)){
            this.setState({
                nameValid: true,
                nameError: false
            })
        } else {
            this.setState({
                nameValid: false,
                nameError: true
            })
        }
    }
    onMessageChange(){
        const messageInput = this.refs.messageInput.value;
        if(messageInput.length > 5){
            this.setState({
                messageValid: true,
                messageError: false
            })
        } else {
            this.setState({
                messageValid: false,
                messageError: true
            })
        }
    }
  	render() {
	    return (
	    	<div>
                <AllNav/>
                <h2 style={{color: 'cadetblue'}} className="text-center">Contact Me</h2>
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <form onSubmit={this.submitMessage.bind(this)}>
                            <label style={{fontSize: '18px'}}>Name</label><br></br>
                            <input style={{color: 'Aquamarine'}} type="text" ref="nameInput" onChange={this.onNameChange.bind(this)}/><br></br>
                            {this.state.nameError ? <div><span style={{position: 'absolute', marginTop: '-20px', color: 'red'}}>Please Enter Name/No numbers allowed</span></div> : <div></div>}
                            <label style={{fontSize: '18px'}}>Email</label><br></br>
                            <input onChange={this.onEmailChange.bind(this)} style={{color: 'Aquamarine'}} type="text" ref="emailInput"/><br></br>
                            {this.state.emailError ? <div><span style={{position: 'absolute', marginTop: '-20px', color: 'red'}}>Please enter valid email</span></div> : <div></div>}
                            <label style={{fontSize: '18px'}}>Message</label><br></br>
                            <textarea style={{height: '100px', color: 'Aquamarine'}} ref="messageInput" onChange={this.onMessageChange.bind(this)}></textarea><br></br><br></br>
                            {this.state.messageError ? <div><span style={{position: 'absolute', marginTop: '-20px', color: 'red'}}>Message must be more than 5 characters</span></div> : <div></div>}
                            {
                                this.state.emailValid && this.state.nameValid && this.state.messageValid ?
                                    <input className="btn btn-info" type="submit"/> :
                                    <input className="btn btn-info" type="submit" disabled={true}/>
                            }
                        </form>
                        <br></br>
                        {
                            this.state.emailSuccess != null && this.state.emailSuccess ?
                                <div className="text-center">
                                    <div style={{width: '150px'}} className="alert alert-success">
                                        <strong>Email Successful</strong>
                                    </div>
                                </div> : 
                            this.state.emailSuccess != null && !this.state.emailSuccess ?
                                <div className="text-center">
                                    <div style={{width: '150px'}} className="alert alert-danger">
                                        <strong>Email Not Successful</strong>
                                    </div>
                                </div> :
                                <div></div>
                        }
                    </div>
                </div>
                <br></br>
			</div>
	    );
  	}
};