const express = require("express");
const cors = require("cors");
const businessRouter = require("./routes/business");
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());
app.use("/", businessRouter);

app.listen(PORT, () => {
  console.log(`Server Listening on Port: ${PORT}`);
});
