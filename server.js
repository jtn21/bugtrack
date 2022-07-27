//import dependencies
const express = require("express")
const cors = require('cors')
const app = express()
const cookieParser = require('cookie-parser'); // this allows server to understand cookie info coming in from client

require ('dotenv').config();// this reads info form secret key that is stored in .env



app.use(cookieParser());
// Changes the app.use(cors()) to the one below ----> app.use(cors()); will now become the line below
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

//mongoose config
require(`./server/config/mongoose.config`)

// express config
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// get the routes

require('./server/routes/user.routes')(app);


// listen to port
app.listen(8000, ()=> console.log("Listening to the port 8000"))



