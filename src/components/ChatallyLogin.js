import React, { Component } from 'react';
import { VERIFY_USER } from '../Events'
import 'antd/dist/antd.css';
import { Button } from 'antd';
import logo from '../images/chattally-logo.png';

export default class ChatallyLoginForm extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	nickname:"",
	  	error:""
	  };
	}

	setUser = ({user, isUser})=>{

		if(isUser){
			this.setError("User name taken")
		}else{
			this.setError("")
			this.props.setUser(user)
		}
	}

	handleSubmit = (e)=>{
		e.preventDefault()
		const { socket } = this.props
		const { nickname } = this.state
		socket.emit(VERIFY_USER, nickname, this.setUser)
	}

	handleChange = (e)=>{
		this.setState({nickname:e.target.value})
	}

	setError = (error)=>{
		this.setState({error})
	}

	render() {	
		const { nickname, error } = this.state
		return (
			<div className="log">
			<div className="login-image">
			<img src={logo}/>
			</div>
			<div className="login">
				<form onSubmit={this.handleSubmit} className="login-form" >
					<input
						ref={(input)=>{ this.textInput = input }} 
						type="text"
						id="nickname"
						value={nickname}
						onChange={this.handleChange}
						placeholder={'Choose a nickname'}
						required
						/>
						<div className="error">{error ? error:null}</div>

					<Button htmlType="submit" type="primary">Log in</Button>
				</form>
			</div>
			</div>
		);
	}
}
