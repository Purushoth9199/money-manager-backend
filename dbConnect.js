const mongoose = require ('mongoose')

mongoose.connect(`mongodb+srv://Purushothaman:Iwtky%4001@cluster0.tmjevxp.mongodb.net/MoneyManager` , {useNewUrlParser : true , useUnifiedTopology : true})

const connection = mongoose.connection

connection.on('error',err => console.log(err))

connection.on('connected',() =>console.log("Mongo db connection is successfull"))