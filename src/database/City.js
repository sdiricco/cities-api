// In src/database/Workout.js
const IT = require("./IT.json");
const { MongoClient, ObjectId } = require("mongodb");

const uri =
  "mongodb+srv://sdiricco:8vYaVvlDn2WjOl8K@cluster0.7ooa4te.mongodb.net/?retryWrites=true&w=majority";

const DB = "cities";
const COLLECTION = "IT";

const client = new MongoClient(uri);

let connected = false

async function createDB() {
  for (let i = 0; i < IT.length; i++) {
    await client.db(DB).collection(COLLECTION).insertOne(IT[i]);
    console.clear();
    console.log(`Inserted: ${IT[i].city}`);
    console.log(`Region: ${IT[i].region}`);
    console.log(`Completed: ${i}/${IT.length}`);
  }
}

client.connect().then(async () => {
  connected = true;
  console.log("DB connected.");
});

async function checkConnection(){
  return new Promise((res, rej) => {
    if (connected) {
      res(true)
    }
    client.on("connectionReady", ()=> {
      console.log('connectionReady')
      res(true)
    })
  })
} 

const getCities = async (queryParams) => {
  try {

    await checkConnection()

    const limit = queryParams.limit ? parseInt(queryParams.limit) : 10;
    const page = queryParams.page ? parseInt(queryParams.page) : 1;
    const city = queryParams.city ? queryParams.city : "";
    const sort = queryParams.sort ? parseInt(queryParams.sort) : 1;

    const regex = `^${city}`;
    const query = { city: { $regex: regex, $options: "i" } };
    const skipIndex = (page - 1) * limit;
    const cities = await client
      .db(DB)
      .collection(COLLECTION)
      .find(query)
      .sort({ city: sort })
      .skip(skipIndex)
      .limit(limit)
      .toArray();

    const total = await client
      .db(DB)
      .collection(COLLECTION)
      .countDocuments(query);

    const pages = Math.ceil(total / limit);

    return {
      cities,
      paging: {
        total,
        page,
        pages,
      },
    };
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const getCity = async (_id) => {
  try {

    await checkConnection()

    const data = await client
      .db(DB)
      .collection(COLLECTION)
      .find(ObjectId(_id))
      .toArray();

    const city = data && data.length ? data[0] : null;

    return {
      city,
    };
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

module.exports = {
  getCities,
  getCity,
};
