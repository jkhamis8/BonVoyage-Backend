const express = require('express');
const router = express.Router();
const User = require('../models/userModel.js');
const Journey = require('../models/journeyModel.js');
//const Entry = require('../models/entryModel.js');
const verifyToken = require('../middleware/verify-token');

router.use(verifyToken);
router.get('/getComingJourney', async (req, res) => {
  try {
    //get one journey object if the date is equal or greater than today
    const journeyObj = await Journey.findOne({ "user": req.session.user, "date": { $gte: new Date() } })
    res.json({ journeyObj });
  } catch (error) {
    console.log(error);
  }
})

router.post('/viewMyJourneys', async (req, res) => {
  const journeyObj = await Journey.findById(req.body.journeyID)
  let entryObj = []
  journeyObj.forEach(async journey => {
    //add entry to entryObj
    entryObj.push(await Entry.findById(journey.entryID))
  })

  res.json({ journeyObj, entryObj });
})

router.post('/createJourney', async (req, res) => {
  try {
    const createdJourney = await Journey.create(req.body)
    await User.findOneAndUpdate({ "user": req.session.user }, { $push: { journys: createdJourney._id } },)
  }
  catch (error) {
    console.log(error);
  }
})

router.put('/editJourney/:JourneyID', async (req, res) => {
  try {
    const id = req.params.JourneyID
    const JourneyObj = await Journey.findById(id)
    JourneyObj.set(req.body)
    JourneyObj.save()
  }
  catch (error) {
    console.log(error);
  }
})

router.delete('/deleteJourney/:JourneyID', async (req, res) => {
  try {
    const JourneyID = req.body.JourneyID
    await User.findOneAndUpdate({ "journeys": JourneyID }, { $pull: { Journey: JourneyID } })
    await Journey.findByIdAndDelete(JourneyID);
  } catch (error) {
    console.log(error);
  }
})

module.exports = router;
