import React, {useState, Component} from 'react';
import FAVideo from 'react-icons/lib/fa/video-camera'
import FAUserPlus from 'react-icons/lib/fa/user-plus'
import MdEllipsisMenu from 'react-icons/lib/md/keyboard-control'
import { Drawer, Button } from 'antd';
import 'antd/dist/antd.css';
import SideBar from './SideBar'

export default class ChatHeading extends Component{

	constructor(props){
		super(props)
		this.state = {
			visible:"true"
		}
	}

		 showDrawer = () => {
			this.setState({visible:true});
			console.log(this.state.visible);
		  };
		 onClose = () => {
			this.setState({visible:false});
		  };
render(){
	const { chats, activeChat, user, setActiveChat, logout, onSendPrivateMessage } = this.props
	return (

		<div className="chat-header">
			<div className="user-info">
				<div className="user-name">{this.props.name}</div>
				<div className="status">
					<div className="indicator"></div>
					<span>{this.numberOfUsers ? this.numberOfUsers : null}</span>
				</div>
			</div>
			<div className="options">
				<FAVideo />
				<FAUserPlus />
			
	   <Button type="primary" onClick={this.showDrawer}>
		<MdEllipsisMenu />
      </Button>
      <Drawer
	    bodyStyle={{padding:0}}
	    width="30%"
		title="Chats"
        placement="right"
        closable={false}
        onClose={this.onClose}
        visible={this.state.visible}
      >
       <SideBar
					logout={logout}
					chats={chats}
					user={user}
					activeChat={activeChat}
					setActiveChat={setActiveChat}
					onSendPrivateMessage={onSendPrivateMessage}
					/>
      </Drawer>
				
			</div>
		</div>
	);
	
}}
