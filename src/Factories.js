const uuidv4 = require('uuid/v4')

//Creates a user.
const createUser = ({name = "", socketId = null } = {})=>(
	{
		id:uuidv4(),
		name,
		socketId
		
	}
)

//Creates a messages object.
const createMessage = ({message = "", sender = ""} = { })=>(
		{
			id:uuidv4(),
			time:getTime(new Date(Date.now())),
			message,
			sender	
		}

	)

//Creates a Chat object

const createChat = ({messages = [], name = "Community", users = []} = {})=>(
	{
		id:uuidv4(),
		name,
		messages,
		users,
		typingUsers:[]
	}
)


//Returns the time in form 20:00
const getTime = (date)=>{
	return `${date.getHours()}:${("0"+date.getMinutes()).slice(-2)}`
}

module.exports = {
	createMessage,
	createChat,
	createUser
}

