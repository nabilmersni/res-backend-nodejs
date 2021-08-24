const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide an email and password',
      });
    }

    if (Object.keys(req.query).length === 0) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please set the role in the query',
      });
    }

    req.query.email = email;

    const user = await User.findOne(req.query);

    if (!user) {
      return res.status(400).json({
        status: 'fail',
        message: 'email or password incorrect',
      });
    }

    if (!(await user.passwordVerification(password, user.password))) {
      return res.status(400).json({
        status: 'fail',
        message: 'email or password incorrect',
      });
    }

    const token = jwt.sign({ id: user._id }, 'SECRITOU');

    res.status(200).json({
      status: 'success',
      token,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.stack,
    });
  }
};

exports.protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization) {
      if (req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
      }
    }

    if (!token) {
      return res.status(401).json({
        status: 'fail',
        message: 'not authenticated, please login and try again',
      });
    }

    const decodedToken = jwt.verify(token, 'SECRITOU');

    const user = await User.findById(decodedToken.id);

    if (!user) {
      return res.status(401).json({
        status: 'fail',
        message: 'this user is no longer exist',
      });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.restrectedTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(401).json({
        status: 'fail',
        message: 'You are not allowed to do this service',
      });
    }

    next();
  };
};
