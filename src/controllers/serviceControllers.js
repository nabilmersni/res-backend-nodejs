const Service = require('./../models/serviceModel');

exports.createService = async (req, res) => {
  try {
    req.body.owner_Id = req.user._id;
    const service = await Service.create(req.body);

    res.status(200).json({
      status: 'success',
      data: {
        service,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find().populate('owner_Id');

    res.status(200).json({
      status: 'success',
      result: services.length,
      data: {
        services,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
    });
  }
};

exports.updateService = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const service = await Service.findByIdAndUpdate(serviceId, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        service,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getOneService = async (req, res) => {
  try {
    const serviceID = req.params.id;
    const service = await Service.findById(serviceID);

    if (!service) {
      return res.status(404).json({
        status: 'fail',
        message: 'service not found',
      });
    }

    res.status(200).json({
      status: 'success',
      service,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};
