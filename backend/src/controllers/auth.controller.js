import { generateToken } from "../lib/utils.js";
import User from "../models/user.modal.js";
import bcrypt from "bcryptjs";
import cloudinary from "./../lib/cloudinary.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password)
      return res
        .status(400)
        .json({ message: "saari feild bharni padegi Bhai!" });
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "kam se kam 6 letter ka toh rakh" });
    }

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "ye email Phle se hai" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      /// genrate jwt token

      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signUp controller ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials saaf saaf tu hai kon m nhi jaAnta",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid credentials, saaf saaf tu hai kon m nhi jaAnta",
      });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("error in login Controller ", error.message);
    res.status(500).json({ message: "server me loi dikkat hai" });
  }
};
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "LogOut successfull-- byee!🤞" });
  } catch (error) {
    console.log("error in login Controller ", error.message);
    res.status(500).json({ message: "server me loi dikkat hai" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
    return  res.status(400).json({ message: "Profile pic is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Erro in upload profile pic", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const checkAuth =  (req,res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("erro in the checking checkAuth controler", error.message);
    res.status(400).json({ message: "Internal server error" });
  }
};
