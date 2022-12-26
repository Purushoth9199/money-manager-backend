const express = require('express')
const dbConnect = require('./dbConnect')
const app = express()
app.use(express.json())
const path = require('path')
const userRoute = require('./routes/usersRoutes')
const transactionRoutes = require('./routes/transactionRoutes')
app.use('/api/users/',userRoute)
app.use('/api/transactions/',transactionRoutes)

const port =process.env.PORT || 5000

if (process.env.NODE_ENV === 'production')
{
app.use('/' , express.static('hackathon/build'))
app.get('*' , (req , res)=>{
res.sendFile(path.resolve(__dirname , 'hackathon/build/index.html'))
})
}

app.listen(port,()=>console.log(`Node JS Server started at port ${port}!`))
