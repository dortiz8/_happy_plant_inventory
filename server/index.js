import express from 'express'; 
import bodyParser from 'body-parser'; 
import mongoose from 'mongoose'; 
import cors from 'cors'; 
// import config file
import dotenv from 'dotenv';
// import routes
import plantRoutes from './routes/plants.js'
const PORT = process.env.PORT || 5000; 
// const CONNECTION_URL = 'mongodb+srv://d-ortiz:HKSLqw7ZfRzDz9f@cluster0.yrw6v.mongodb.net/VerdeInventorySystem?retryWrites=true&w=majority'
// Start express
const app = express(); 
dotenv.config(); 
// Use middleware
app.use(express.urlencoded({limit: "300mb", extended: true})); 
app.use(express.json({limit: "30mb", extended: true})); 
app.use(cors()); 
//app.use(function (req, res, next) { setTimeout(next, 2000) });


// Specific Routes
app.use('/plants', plantRoutes); 

// Default Route
app.get('/', (req, res) => {
    res.send('Hello from Verde');
})
// mongoose.connect returns a promise --> therefore using then and catch is necessary
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{app.listen(PORT, ()=> console.log(`Server running on PORT: ${PORT}`))})
    .catch((error)=> console.log(error.message)); 

// Removes any warnings from console // This is deprecated and no longer needed. 
// mongoose.set('useFindAndModify', false); 