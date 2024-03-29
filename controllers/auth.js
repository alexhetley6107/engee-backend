import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { addDefaultLists } from '../utils/addDefaultLists.js';

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const isUsed = await User.findOne({ username });

    if (isUsed) {
      return res.json({
        message: 'Such username is already exist.',
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const user = new User({
      username,
      password: hash,
      lists: [],
    });

    await user.save();
    addDefaultLists(user._id);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    return res.json({
      user,
      token,
    });
  } catch (error) {
    console.log('### Error', error);
    res.json({
      message: 'Something went wrong.',
    });
  }
};

//Login
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({
        message: 'No such user.',
      });
    }

    const isCorrectPass = await bcrypt.compare(password, user.password);
    if (!isCorrectPass) {
      return res.json({
        message: 'Wrong password.',
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({
      token,
      user,
    });
  } catch (error) {
    console.log('### Error', error);
    res.json({
      message: 'Something went wrong.',
    });
  }
};

//Get me
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.json({
        message: 'No such user.',
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log('### Error', error);
    return res.json({
      message: 'No access',
    });
  }
};
