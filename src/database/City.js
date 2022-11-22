// In src/database/Workout.js
const IT = require("./IT.json");
const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://sdiricco:8vYaVvlDn2WjOl8K@cluster0.7ooa4te.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function createDB(){
  for (let i = 0; i<IT.length; i++) {
    await client
      .db('cities')
      .collection('IT')
      .insertOne(IT[i])
    console.clear();
    console.log(`Inserted: ${IT[i].city}`)
    console.log(`Region: ${IT[i].region}`)
    console.log(`Completed: ${i}/${IT.length}`)
  }
}

client.connect().then(async ()=> {
  console.log('DB connected.')
});

const getCities = async (filterParams) => {
  const limit = filterParams.limit ? parseInt(filterParams.limit) : 10;
  const page = filterParams.page ? parseInt(filterParams.page) : 1;
  const city = filterParams.city ? filterParams.city : "" 
  const regex = `^${city}`
  try {
    const skipIndex = (page - 1) * limit
    const cities = await client
      .db('cities')
      .collection('IT')
      .find({ "city": { $regex: regex, $options: "i" } })
      .skip(skipIndex)
      .limit(limit)
      .toArray();
    
    const total = await client
      .db('cities')
      .collection('IT')
      .countDocuments()

    const pages = Math.ceil(total/limit)

  return {
    cities, 
    paging: {
      total,
      page,
      pages
    }
  }
  } catch (error) {
    throw{status: error?.status || 500, message: error?.message || error}
  }

};



module.exports = {
  getCities,
};
