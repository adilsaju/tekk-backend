const express = require('express');
const job = require('../models/jobModel')
const employer = require('../models/employerModel')
const technician = require('../models/technicianModel');
const offer = require('../models/offerModel')
const socketServer = require('../socket2/socket-server');
const employment = require('../models/employmentModel')
const attendance = require('../models/dailyAttendanceModel')

const app = express();
const router = express.Router();



const getAttendance = async (req, res, next) => {

    console.log('getAttendance()');
    try {
      
        respone = await attendance.dailyAttendanceModel.find(); 
        res.json(respone);

    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  };


  const startJob = async (req, res, next) => {

    console.log('startJob()');
  
    console.log(req.body);
  
  
    // const particularempnt =
    //   await employment.employmentModel.findById(
    //     req.params.id
    //   );
    
   
     
    try {
  
      // const attendanceObj = {
      //  employment: particularempnt,
      //  clock_out:null
      // };
    
      const attendancejob = await job.jobModel.updateOne(
        {_id: req.body.job_id },
        { $set: { status: 'ongoing' } }
        )
        const attendanceOffer = await offer.offerModel.updateOne(
          {_id: req.body.offer_id },
            { $set: { offerStatus: 'ongoing' } }
          )
        
      
  
      res.json("Job Started,you can Clock in now");
      return
    } catch (error) {
      res.json({
        error: true,
        message: error.message
      });
      return
    }
  };



const clockIn = async (req, res, next) => {

    console.log('clockIn()');
  
    console.log(req.body);
  
  
    const particularempnt =
      await employment.employmentModel.findById(
        req.params.id
      );
    
   
     
    try {
  
      const attendanceObj = {
       employment: particularempnt,
       clock_out:null
      };
      //update in db
      const offer1 = await attendance.dailyAttendanceModel.create(
        attendanceObj
      );
      // const attendancejob = await job.jobModel.updateOne(
      //   {_id: req.body.job_id },
      //   { $set: { status: 'ongoing' } }
      //   )
      //   const attendanceOffer = await offer.offerModel.updateOne(
      //     {_id: req.body.offer_id },
      //       { $set: { offerStatus: 'ongoing' } }
      //     )
        
      
  
      res.json(offer1);
      return
    } catch (error) {
      res.json({
        error: true,
        message: error.message
      });
      return
    }
  };
  const clockOut = async (req, res, next) => {

    console.log('clockOut()');
  
    console.log(req.body);
  
  
    const particularempnt =
      await employment.employmentModel.findById(
        req.params.id
      );
    

    const pay_perhr = await offer.offerModel.findById(
        particularempnt.offer_id
      );
    console.log('seepr',pay_perhr)
      const hoursoc = await attendance.dailyAttendanceModel.findOne(
        {employment: particularempnt._id,clock_out:null }
      )
    
    try {
  
      
      //update in db
      const attendance1 = await attendance.dailyAttendanceModel.updateOne(
       //time is set in hours
       {employment: particularempnt._id,clock_out:null },
        { $set: { clock_out: new Date(),shift_duration:(((new Date())-hoursoc.clock_in)/1000), shift_pay: (pay_perhr.offerPrice)*(((new Date())-hoursoc.clock_in)/3600000)} }
      )

      const emp1 =  await employment.employmentModel.updateOne(
       { _id: req.params.id},
       { $set: {total_hours:(particularempnt.total_hours+(((new Date())-hoursoc.clock_in)/1000)),total_income:particularempnt.total_income+(pay_perhr.offerPrice)*(((new Date())-hoursoc.clock_in)/3600000)}}
      );
  
      
      res.json(`clocked out at ${new Date()} you worked well today ! `);
      return
    } catch (error) {
      res.json({
        error: true,
        message: error.message
      });
      return
    }
  };
  
  
module.exports = {
    clockIn,
    clockOut,
    getAttendance,
    startJob
}