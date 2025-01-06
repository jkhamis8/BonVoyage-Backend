const express = require('express');
const router = express.Router();
const User = require('./models/userModel.js');
const Journey = require('./models/journeyModel.js');

router.get('/viewMyJourneys', async (req, res) => {
  const myJourneys = await User.find({ "user": req.session.user })
  const journeyObj = await Journey.findById(req.body.journeyID)

  res.json({ journeyObj });
})

router.post('/viewJourney', async (req, res) => {
  const journeyObj = await Journey.findById(req.body.journeyID)

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