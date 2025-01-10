const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: [3, "userName must be more than 3 Char"],
    maxlength: [10, "userName must be less than 10 char"]
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  }
},
  { timestamps: true }
);
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.hashedPassword;
  }
});
const User = mongoose.model("User", userSchema);

module.exports = User;