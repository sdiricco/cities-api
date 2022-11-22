const City = require("../database/City");

const getCities = async (filterParams) => {
  try {
    const data = await City.getCities(filterParams);
    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getCities
};
