// const express = require("express")
import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

import transactionsRoute from "./routes/transactionsRoute.js"

dotenv.config();

const app = express();

// mdiddleware 
app.use(express.json()); // need to know why we use this thing 
app.use(rateLimiter);


// our custom simple middleware 
app.use((req,res,next) =>{
    console.log("hey we hit a req, the method is",req.method);
    next();
});

const  port = process.env.PORT || 5001;


app.get("/health",(req,res)=>{
    res.send("its working ");
})

app.use("/api/transactions",transactionsRoute)


initDB().then(() => {
  app.listen(port, () => {
    console.log(`port is running ${port}`);
  });
});

// for testing we have used https://hoppscotch.io/ for this thing

