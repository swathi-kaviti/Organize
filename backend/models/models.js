const mongoose = require('mongoose')

const Schema = mongoose.Schema

const dailyTask = new Schema({
  title: {
    type: String,
    required: true
  },
  state: {
    type: Boolean,
    required: true
  },
}, { timestamps: true })


const monthlyTask=new Schema({
    title:{
        type:String,
        required:true
    },
    state:{
        type:Boolean,
        required:true
    },
},{timestamps: true})


const weeklyTask=new Schema({
    title:{
        type:String,
        required:true
    },
    state:{
        type:Boolean,
        required:true
    },
},{timestamps: true})


const notes = new Schema({
    title: {
         type: String, 
         required: true 
    },
    content: {
         type: String, 
         required: true 
    }  // Changed 'notes' to 'content'
}, { timestamps: true });


const dates = new Schema({
    date: {
        type: String,  // Storing date as a string (YYYY-MM-DD) for easier handling
        required: true,
        unique: true  // Ensure each date is unique
    },
    info: {
        type: String,
        required: false  // Not all dates will have notes
    }
}, { timestamps: true });


module.exports = {
    DailyTask: mongoose.model('DailyTask', dailyTask),
    MonthlyTask: mongoose.model('MonthlyTask', monthlyTask),
    WeeklyTask:mongoose.model('WeeklyTask',weeklyTask),
    Notes: mongoose.model('Notes', notes),
    Dates:mongoose.model('Dates',dates)
  }