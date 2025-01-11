const express = require('express');
const app = express();
const router = express.Router()
const Journey = require('../models/journeyModel.js');
const Entry = require('../models/entryModel.js')
const verifyToken = require('../middleware/verify-token');
app.use( verifyToken);

router.get('/getAllEntrys/:journeyID', async (req, res) => {
  try {
    const journeyID = req.params.journeyID
    const journey = await Journey.findById(journeyID)
    const entryObj = await Entry.find({ "_id": { $in: journey.entrys } })
    res.json({ entryObj });
  } catch (error) {
    console.log(error);
  }
})
////////////////////////////
router.get("/getEntry/:entryId", async (req, res) => {
  try {
    const entryId = req.params.entryId
    const entryObj = await Entry.findById(entryId)
    res.json({ entryObj });
  } catch (error) {
    console.log(error);
  }
})

router.post("/createEntry", async (req, res) => {
  try {    
    const createdEntry = await Entry.create(req.body[0])
    await Journey.findByIdAndUpdate( req.body[1], { $push: { entrys: createdEntry._id } })
    res.status(200).json({ 'done': 'done' });
  } catch (error) {
    console.log(error)
  }
})

router.put("/editEntry", async (req, res) => {
  try {
    const entryId = req.body._id
    await Entry.findByIdAndUpdate(entryId, req.body)
    res.status(200).json({ 'done': 'done' });
  } catch (error) {
    console.log(error)
  }
})

router.delete("/deleteEntry/:EntryID", async (req, res) => {
  try {
    const EntryID = req.params.EntryID
    await Entry.findByIdAndDelete(EntryID)
    await Journey.findByIdAndUpdate(req.body.Journey, { $pull: { entrys: EntryID } })
    res.status(200).json({ 'done': 'done' });
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
