import React, {Component} from 'react';

import {BlogStyles} from './../../styles/Blog.js';
import AllNav from './../navs/All_Nav'

export default class BlogPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	messages: [],
          nameValid: false,
          messageValid: false
        };
    }
    blogForm(e){
    	e.preventDefault();

    	var newMessage = {
    		name: this.refs.nameInput.value,
    		message: this.refs.messageInput.value
    	}
      fetch('/api/message', {
          method: 'post',
          body: JSON.stringify(newMessage),
          headers: {
              'content-type': 'application/json',
              'accept': 'application/json'
          },
      }).then((response) => response.json())
      .then((results) => {
          this.setState({
              messages: results
          });
          this.refs.nameInput.value = "";
  		    this.refs.messageInput.value = "";
          this.setState({
            nameValid: false,
            messageValid: false
          })
      });
    }
    onNameChange(){
        const nameInput = this.refs.nameInput.value;
        if(nameInput !== ""){
            this.setState({
                nameValid: true,
            })
        } else {
            this.setState({
                nameValid: false,
            })
        }
    }
    onMessageChange(){
        const messageInput = this.refs.messageInput.value;
        if(messageInput !== ""){
            this.setState({
                messageValid: true,
            })
        } else {
            this.setState({
                messageValid: false,
            })
        }
    }
    componentWillMount(){
		fetch('/api/messages', {
			headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            }
		}).then((response) => response.json())
        .then((results) => {
        	this.setState({
        		messages: results
        	});
        });
    }
  	render() {
  		const {messages} = this.state;
  		const appendMessages = () => {
  			if(messages.length > 0){
				return messages.map((message, index) => {
					return (
						<div>
							<p style={{color: 'Aquamarine'}} key={index}>
								<span><strong>{message.name}: </strong>{message.message}</span>
							</p>
						</div>
					)
				})
  			} else {
  				return (
  					<p className="well text-center center-block" style={BlogStyles.noMessagesP}>No Messages</p>
  				)
  			}
  		}
	    return (
		    <div>
		    	<AllNav/>
		        <div style={BlogStyles.image_div} className="text-center center-block">
		        	<img style={BlogStyles.blog_image} src="./images/blog.png"/>
		        </div>
		        <div className="row">
		        	<div className="col-md-4 col-md-offset-4">
			        	<form onSubmit={this.blogForm.bind(this)}>
			        		<label>Name</label><br></br>
			        		<input style={{color: 'Aquamarine'}} type="text" ref="nameInput" onChange={this.onNameChange.bind(this)}/><br></br>
			        		<label>Message</label><br></br>
			        		<textarea style={{height: '100px', color: 'Aquamarine'}} ref="messageInput" onChange={this.onMessageChange.bind(this)}></textarea><br></br><br></br>
                  {
                      this.state.nameValid && this.state.messageValid ?
                        <input className="btn btn-info" type="submit"/> :
                        <input className="btn btn-info" type="submit" disabled={true}/>
                  }
			        	</form>
			        </div>
		        </div>
		        <div className="text-center">
		        	{appendMessages()}
		        </div>
		    </div>
	    );
  	}
};
