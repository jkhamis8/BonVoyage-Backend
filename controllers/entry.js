const express = require("express")
const router = express.Router()
const User = require("../models/userModel.js")
const Journey = require("../models/journeyModel.js")
const Entry = require("../models/entryModel.js")

const verifyToken = require("../middleware/verify-token")

router.use(verifyToken)
router.get("/viewEntry", async (req, res) => {
  try {
    //get the user Entry object
    console.log(req.session.user)

    const entryObj = await Entry.findById({ user: req.session.user })
    res.json({ entryObj })
  } catch (error) {
    console.log(error)
  }
})
////////////////////////////
router.post("/viewJourney", async (req, res) => {
  const journeyObj = await Journey.findById(req.body.journeyID)
  let entryObj = []
  journeyObj.forEach(async (journey) => {
    //add entry to entryObj
    entryObj.push(await Entry.findById(journey.entryID))
  })

  res.json({ journeyObj, entryObj })
})

router.post("/createEntry", async (req, res) => {
  try {
    const createdEntry = await Entry.create(req.body)
    await User.findOneAndUpdate(
      { user: req.session.user },
      { $push: { entries: createdEntry._id } }
    )
  } catch (error) {
    console.log(error)
  }
})

router.put("/editEntry/:EntryID", async (req, res) => {
  try {
    const id = req.params.EntryID
    const EntryObj = await Entry.findById(id)
    EntryObj.set(req.body)
    EntryObj.save()
  } catch (error) {
    console.log(error)
  }
})

router.delete("/deleteEntry/:EntryID", async (req, res) => {
  try {
    const EntryID = req.body.EntryID
    await User.findOneAndUpdate(
      { entries: EntryID },
      { $pull: { Entry: EntryID } }
    )
    await Entry.findByIdAndDelete(EntryID)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
