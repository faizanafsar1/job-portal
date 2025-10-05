const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Employer = require("../models/Employer");
const { generateAccessToken, generateRefreshToken } = require("../utils/Token");

exports.signup = async (req, res) => {
  const { role, firstName, lastName, email, contact, password, confirmPassword } = req.body;

  if (role === "employer") {
    const employerExist = await Employer.findOne({
      email: email,
    });
    if (employerExist) {
      return res.status(409).send({
        message: "Employer account with this email already exists",
      });
    }
    if (password !== confirmPassword) {
      return res.status(409).send({ message: "passwords didn't match" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newEmployer = new Employer({
      role,
      firstName,
      lastName,
      email,
      contact,
      password: hashedPassword,
    });
    const accessToken = generateAccessToken(newEmployer._id, role);
    const refreshToken = generateRefreshToken(newEmployer._id, role);
    newEmployer.refreshToken = refreshToken;
    await newEmployer.save();
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });
    res.status(200).send({ message: "signed up successfully", accessToken });
  } else {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(409).send({ message: "user with this email already exists" });
    }

    if (password !== confirmPassword) {
      return res.status(409).send({ message: "passwords don't match" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      role,
      firstName,
      lastName,
      email,
      contact,
      password: hashedPassword,
    });
    const accessToken = generateAccessToken(newUser._id, role);
    const refreshToken = generateRefreshToken(newUser._id, role);
    newUser.refreshToken = refreshToken;
    await newUser.save();
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });
    res.status(200).send({ message: "signed up successfully", accessToken });
  }
};

exports.login = async (req, res) => {
  const { email, password, role } = req.body;
  if (role === "employer") {
    const employerExist = await Employer.findOne({ email });
    if (!employerExist) {
      return res.status(404).send({ message: "we didn't find any employer with this email" });
    }

    const passMatch = await bcrypt.compare(password, employerExist.password);
    if (!passMatch) return res.status(401).json({ message: "Invalid credentials" });

    if (role !== employerExist.role) {
      res.status(401).json({
        message: "Permission denied: Your account does not hae access rights to this resource.",
      });
      return;
    }
    const accessToken = generateAccessToken(employerExist._id, role);
    const refreshToken = generateRefreshToken(employerExist._id, role);
    employerExist.refreshToken = refreshToken;
    await employerExist.save();
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      path: "/",
      sameSite: "none",
    });
    res.json({ message: "user logged in", accessToken });
  } else {
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(404).send({ message: "we didn't find any user with this email" });
    }

    const passMatch = await bcrypt.compare(password, userExist.password);
    if (!passMatch) return res.status(401).json({ message: "Invalid credentials" });

    if (role !== userExist.role) {
      res.status(401).json({
        message: "Permission denied: Your account does not hae access rights to this resource.",
      });
      return;
    }
    const accessToken = generateAccessToken(userExist._id, role);
    const refreshToken = generateRefreshToken(userExist._id, role);
    userExist.refreshToken = refreshToken;
    await userExist.save();
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      path: "/",
      sameSite: "none",
    });
    res.json({ message: "user logged in", accessToken });
  }
};

exports.refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).send({ message: "refresh token not found" });
  }
  const payload = jwt.verify(refreshToken, process.env.JWT_SECRET);
  if (payload.role === "jobseeker") {
    const user = await User.findOne({ refreshToken: refreshToken });

    if (!user) {
      return res.status(401).send({ message: "refresh token not found" });
    }
    const newAccessToken = generateAccessToken(user._id, payload.role);
    res.status(200).send({ accessToken: newAccessToken });
  } else {
    const employer = await Employer.findOne({ refreshToken: refreshToken });
    if (!employer) {
      return res.status(401).send({ message: "refresh token not found" });
    }
    const newAccessToken = generateAccessToken(employer._id, payload.role);
    res.status(200).send({ accessToken: newAccessToken });
  }
};

exports.signOut = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).send({ message: "refresh token not found" });
    }
    const decoded = jwt.decode(refreshToken);
    const user = User.findById(decoded._id);
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      path: "/",
      sameSite: "none",
    });
    if (user) {
      user.refreshToken = null;
    }
  } catch (err) {
    console.log("error in try catch", err);
  }
  res.status(200).send({ message: "signout successfully" });
};
