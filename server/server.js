require('dotenv/config')
const express =require('express')
const cors = require('cors')
const path = require('path')

const serverless = require('serverless-http')

const contactRoute = require('./route/contactRoute');


const app = express();

app.use(express.json())
app.use(cors())
app.use('/.netlify/functions/server', contactRoute);

module.exports.handler = serverless(app)