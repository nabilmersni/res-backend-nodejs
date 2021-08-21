const User = require('./../models/userModel');

//just a function to filter the req.body: we dont allow the users to change all their properties
const filterObj = (obj, ...allowedField) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedField.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

exports.getAllUser = async (req, res) => {
  try {
    const users = await User.find(req.query);

    res.status(200).json({
      status: 'success',
      result: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getOneUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    res.status(200).json({
      status: 'success',
      user,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.signUp = async (req, res) => {
  try {
    // if (!req.query.role) {
    //   return res.status(401).json({
    //     status: 'fail',
    //     message: 'Please set the role on the query',
    //   });
    // }

    // req.body.role = req.query.role;
    const user = await User.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const filtredBody = filterObj(
      req.body,
      'fullname',
      'email',
      'phone',
      'imageUrl'
    );

    const user = await User.findByIdAndUpdate(userId, filtredBody, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};
