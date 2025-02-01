const express = require('express');
const cors = require('cors');
const connectDB = require('./db/connectDB');
const postRoute = require('./routes/postRoute');
const categoryRoute = require('./routes/categoryRoute');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

connectDB();
app.use(cors({origin: '*'}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({limit: '50mb', extended:true}))
app.use('/api/posts',postRoute);
app.use('/api/categories',categoryRoute);


app.get('/',(req,res)=>{
    res.send('Hello World!');
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})