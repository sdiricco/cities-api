// In src/index.js
const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors')
const cityRouterV1 = require("./v1/routes/cityRoutes");

const { swagger } = require("./v1/swagger");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(bodyParser.json());
app.use("/api/v1/cities", cityRouterV1);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
  swagger(app, PORT);
});