

const express = require('express');

const app = express();

const dotenv = require('dotenv');
const { default: mongoose } = require('mongoose');

dotenv.config();

const cors = require('cors');
app.use(cors());

const UserRoute = require('./Routes/userRoutes');
const PostRoute = require('./Routes/postRoutes');


app.use(express.json())

app.get('/',(req,res)=>{
    res.status(200).send('Welcome to Homepage...')
});

app.use('/users', UserRoute);

app.use('/posts',PostRoute);


app.listen(process.env.PORT,()=>{
    connect();

    console.log("Listening to Port...");
})

const connect = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);

        console.log("Connected to db...");
        
    } catch (error) {
        console.log(error.message)
    }
}
