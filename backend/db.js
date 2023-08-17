const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI
 
const connectToMongo = async() => {
    try{
        const con = await mongoose.connect( MONGODB_URI )
        console.log(`Connected to Mongo Database: ${con.connection.host}`)
    } catch(error) {
        console.error(error)
    }
}


module.exports = connectToMongo;