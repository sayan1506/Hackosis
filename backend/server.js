
const app = require("./src/app");
const connectDB = require("./src/db/db");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
});
