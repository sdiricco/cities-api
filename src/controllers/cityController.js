// In src/controllers/workoutController.js
const cityService = require("../services/cityService");

const getCities = async (req, res) => {
  const { page, limit, city } = req.query;
  try {
    const data = await cityService.getCities({ page, limit, city });
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

module.exports = {
  getCities
};
