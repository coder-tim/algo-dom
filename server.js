/*
Reference

I used the following article to learn how to deploy a website on Heroku using Express.js
https://www.freecodecamp.org/news/how-to-deploy-your-site-using-express-and-heroku/
*/

// create an express app
const express = require("express")
const app = express()

// use the express-static middleware
app.use(express.static("pub"))

// define the first route
app.get("/", function (req, res) {
  res.send("<h1>Hello World!</h1>")
})

// start the server listening for requests
app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));