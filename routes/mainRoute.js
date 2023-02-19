const express = require('express');
const { clockIn, clockOut } = require('../controllers/attendanceController');
const { getAllJobs, login,getAllTechnicians,getAllEmployers,postJob,
    createTechnician,
    createEmployer,

    updateTechnicianPhoto

} = require('../controllers/mainController')
const {  getAllOffers, getOfferById, getOfferByJobId, createOffer, acceptoffer, getEmployment} = require('../controllers/offerController')

const {uploadTechPhoto} = require('./multer/multer-utils');
// const multer = require('multer');
// const path = require('path');

const router = express.Router();


router.route('/login').get(login);

router.route('/jobs').get(getAllJobs).post(postJob);
router.route('/jobs/:id').get(getAllJobs);

router.route('/employment').get(getEmployment)

router.route('/technicians').get(getAllTechnicians).post(createTechnician).patch(updateTechnicianPhoto,uploadTechPhoto);
router.route('/technicians/:id').get().patch(uploadTechPhoto,updateTechnicianPhoto);

router.route('/employers').get(getAllEmployers).post(createEmployer);

router.route('/offers').get(getAllOffers).post(createOffer);
router.route('/offers/:id').get(getOfferById);
router.route('/jobs/:id/offers').get(getOfferByJobId);
router.route('/offers/:id/accept').post(acceptoffer)
//CHAT
// router.route('/message').post(chat);

router.route('/jobs/:id/clockin').post(clockIn)
router.route('/jobs/:id/clockout').post(clockOut)


module.exports = router;
