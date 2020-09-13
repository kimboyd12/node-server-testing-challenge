const express = require("express")
const usersRouter = require("./users/users-router")


const server = express()


server.use(express.json())
server.use(usersRouter)



server.get("/", (req, res) => {
	res.json({
		message: "Welcome to our API",
	})
})

server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong",
	})
})

module.exports = server