// In src/controllers/workoutController.js
const cityService = require("../services/cityService");

const getCities = async (req, res) => {
  const { page, limit, city, sort } = req.query;
  try {
    const data = await cityService.getCities({ page, limit, city, sort });
    res.send({
      status: "OK",
      data: data.cities,
      paging: data.paging
    });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getCity = async (req, res) => {
  const { _id } = req.params;
  console.log(_id)
  try {
    const data = await cityService.getCity(_id);
    res.send({
      status: "OK",
      data: data.city,
    });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getCities,
  getCity
};
