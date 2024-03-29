const mongoose = require('mongoose')
const employerModel = require('./employerModel').employerModel
const employerSchema = require('./employerModel').employerSchema
const Schema = mongoose.Schema

const jobSchema = new mongoose.Schema({
   // firebase_uid: String,
   title: {
      type: String,
      
   },
   posted_date: {
    type: Date,
   required: true,
    default: Date.now
   },
   description: {
      type: String,
   },
   max_cost:{
      type:Number,
      required:true,
      default:0
   },
   status:{
      type: String,
     required:true,
      default: "new job"
   },
   images: {
      type: [String],
      default: ["https://dummyimage.com/600x400/666666/c4c4c4&text=No+Image+found"]
   },
   skills_required: {
      type: [String]
   },
   location: {
      type: String,
   //   required: true
   },
   employer: {
      type: Schema.Types.ObjectId,
      ref: "employer",
      required: true

   },
   // technician:{
   //    type: [Schema.Types.ObjectId],
   //    ref: "technician",
   //    default: null
   // },
   prefer_start_date:{
      type:Date,
       default: Date.now
      // required:true
   },
   address: {
      type: String,
   },
   phone: {
      type: String,
   },
   countOffer:{
      type:Number,
      default:0

   },
   start_date:{
      type:Date,
      default:null
   }
   
})
// studentSchema.index({ 'email' : 1 }, { unique: true });


module.exports = {
    jobSchema,
   jobModel: mongoose.model('job', jobSchema, 'job'),
}