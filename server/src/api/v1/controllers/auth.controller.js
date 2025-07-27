const User = require("../models/User.model");
const { validateUser } = require("../../../utils/validation");
const { hashPassword, comparePassword } = require("../../../utils/password");
const { generateToken } = require("../../../utils/jwt");

// accept email and password
// check if user exists
// check if password is correct
// generate a token
// send the token and user details in the response

// 1. findById -> takes ObjectId -> To fetch a document using its objectID -> returns the document
// 2. findOne -> takes a query -> To fetch a document using a query -> returns the document
// 3. find -> takes a query -> To fetch multiple documents using a query -> returns an array of documents
// 4. save -> takes a document -> To save a document -> returns the saved document
// 5. updateOne -> takes a query and update -> To update a document using a query -> returns the updated document
// 6. deleteOne -> takes a query -> To delete a document using a query -> returns the deleted document
// 7. deleteMany -> takes a query -> To delete multiple documents using a query -> returns the number of deleted documents
// 8. findByIdAndUpdate -> takes ObjectId and updates -> returns the updated document if new: true is passed -> returns the original document if new: false is passed
// 9. findOneAndUpdate -> takes a query and updates -> returns the updated document if new: true is passed -> returns the original document if new: false is passed
// 10. findOneAndDelete -> takes a query -> returns the deleted document
// 11. findOneAndReplace -> takes a query and replacement -> returns the replaced document

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: RegExp(email, "i") });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const isPasswordCorrect = comparePassword(password, user.passwordHash);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }
    const token = generateToken(user._id);
    res.status(200).json({
      message: "Login successful",
      user: user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}

async function register(req, res) {
  try {
    const { name, email, password, dob } = req.body;
    const error = validateUser({ name, email, password, dob });
    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
    const hashedPassword = hashPassword(password);
    const user = new User({
      name,
      email,
      passwordHash: hashedPassword,
      dob,
    });
    const userValidation = user.validateSync();
    if (userValidation) {
      return res.status(400).json({
        message: userValidation.message,
      });
    }
    const savedUser = await user.save();
    const token = generateToken(savedUser._id);

    res.status(201).json({
      message: "User created successfully",
      user: savedUser,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}

module.exports = {
  login,
  register,
};
