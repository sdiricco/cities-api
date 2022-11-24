const City = require("../database/City");

const getCities = async (queryParams) => {
  try {
    return await City.getCities(queryParams);
  } catch (error) {
    throw error;
  }
};

const getCity = async(_id) => {
  try {
    return await City.getCity(_id);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getCities,
  getCity
};
