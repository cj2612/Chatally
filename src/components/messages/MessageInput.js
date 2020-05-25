import React, { Component } from 'react';
import 'emoji-mart/css/emoji-mart.css'
import 'antd/dist/antd.css';
import { Picker } from 'emoji-mart'
import { Modal, Button } from 'antd';


export default class MessageInput extends Component {
	
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	message:"",
		isTyping:false,
		visible:false
	  };

	}
	
	showModal = () => {
		this.setState({
		  visible: true,
		});
	  };
	
	  handleOk = e => {
		console.log(e);
		this.setState({
		  visible: false,
		});
	  };
	
	  handleCancel = e => {
		console.log(e);
		this.setState({
		  visible: false,
		});
	  };
	
	handleSubmit = (e)=>{
		e.preventDefault()
		this.sendMessage()
		this.setState({message:""})
	}

	sendMessage = ()=>{
		this.props.sendMessage(this.state.message)

	}

	componentWillUnmount() {
	  this.stopCheckingTyping()
	}

	sendTyping = ()=>{
		this.lastUpdateTime = Date.now()
		if(!this.state.isTyping){
			this.setState({isTyping:true})
			this.props.sendTyping(true)
			this.startCheckingTyping()
		}
	}

	/*
	*	startCheckingTyping
	*	Start an interval that checks if the user is typing.
	*/
	startCheckingTyping = ()=>{
		console.log("Typing");
		this.typingInterval = setInterval(()=>{
			if((Date.now() - this.lastUpdateTime) > 300){
				this.setState({isTyping:false})
				this.stopCheckingTyping()
			}
		}, 300)
	}
	
	/*
	*	stopCheckingTyping
	*	Start the interval from checking if the user is typing.
	*/
	stopCheckingTyping = ()=>{
		console.log("Stop Typing");
		if(this.typingInterval){
			clearInterval(this.typingInterval)
			this.props.sendTyping(false)
		}
	}

	


	render() {
		const { message } = this.state
		return (
			
			
			<div className="message-input">
				
				<form 
					onSubmit={ this.handleSubmit }
					className="message-form">

					<input 
						id = "message"
						ref = {"messageinput"}
						type = "text"
						className = "form-control"
						value = { message }
						autoComplete = {'off'}
						placeholder = "Type something interesting"
						onKeyUp = { e => { e.keyCode !== 13 && this.sendTyping() } }
						onChange = {
							({target})=>{
								this.setState({message:target.value})
							}
						}
						/>
					
					 <Button type="primary"  style={{height:'100%'}} onClick={this.showModal}>
					 😊
        </Button>
		
        <Modal
          title="Select an emoji!"
          visible={this.state.visible}
          onOk={this.handleOk}
		  onCancel={this.handleCancel}
        >
          <Button  size="large" type="primary" onClick={this.showModal}>
          Open Modal
        </Button>
        <Modal
          title="Select an emoji!"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Picker onSelect={(emoji)=> {const mess= (this.state.message+ emoji.native);
			this.setState({message:mess}); console.log(this.state.message)}} />
        </Modal>
        </Modal>
		
					<button
						disabled = { message.length < 1 }
						type = "submit"
						className = "send"

					> Send </button>
				</form>

			</div>
		
		);
	}
}
