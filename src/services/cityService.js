const City = require("../database/City");

const getCities = async (queryParams) => {
  try {
    const data = await City.getCities(queryParams);
    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getCities
};
