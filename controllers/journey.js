const express = require('express');
const app = express();
const router = express.Router();
const User = require('../models/userModel.js');
const Journey = require('../models/journeyModel.js');
//const Entry = require('../models/entryModel.js');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/verify-token');
app.use( verifyToken);

router.get('/getComingJourney/:userID', async (req, res) => {
  try {
    //get user one journey object if the date is equal or greater than today date
    const userID = req.params.userID
    const user  = await User.findById(userID)
    const today = new Date()
    const journeyObj = await Journey.find({ "_id": { $in: user.journeys},
                                            "startDate":{ $gte: today.toISOString(), $lt:today.setMonth(today.getMonth() + 3)} })
    console.log(journeyObj);
    res.json({ journeyObj });
  } catch (error) {
    console.log(error);
  }
})

//rotue to get user all jorneys by get jorneys id from user object
router.get('/getAllJourneys/:userID', async (req, res) => {
  try {
    const userID = req.params.userID
    const user = await User.findById(userID)
    const journeyObj = await Journey.find({ "_id": { $in: user.journeys } })
    res.json({ journeyObj });
  } catch (error) {
    console.log(error);
  }
})


router.post('/createJourney', async (req, res) => {
  try {
    console.log(req.body[0]);
    
    const createdJourney = await Journey.create(req.body[0])
    await User.findByIdAndUpdate( req.body[1], { $push: { journeys: createdJourney._id } },)
    res.status(200).json({ 'done': 'done' });
  }
  catch (error) {
    console.log(error);
  }
})

router.get('/getJourney/:JourneyID', async (req, res) => {
  try {
    const JourneyID = req.params.JourneyID
    const JourneyObj = await Journey.findById(JourneyID)
    res.json({ JourneyObj });
  } catch (error) {
    console.log(error);
  }
})

router.post('/editJourney', async (req, res) => {
  try {    
    const JourneyID = req.body._id
    await Journey.findByIdAndUpdate(JourneyID, req.body)
    res.status(200).json({ 'done': 'done' });
  } catch (error) {
    console.log(error);
  }
});

//delete journey and remove it from user object
router.delete('/deleteJourney/:JourneyID', async (req, res) => {
  try {
    const JourneyID = req.params.JourneyID
    console.log(JourneyID);
    
    await Journey.findByIdAndDelete(JourneyID)
    await User.findByIdAndUpdate(req.body.user, { $pull: { journeys: JourneyID } })
    res.status(200).json({ 'done': 'done' });
  } catch (error) {
    console.log(error);
  }
})
module.exports = router;
