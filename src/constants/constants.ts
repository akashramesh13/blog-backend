const PORT = process.env.PORT || "8080";
const SESSION_SECRET = process.env.SESSION_SECRET || "some_secret";
const MONGOOSE_URL =
  process.env.MONGOOSE_URL || "mongodb://localhost:27017/blog";
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000/";

export { PORT, SESSION_SECRET, MONGOOSE_URL, CLIENT_URL };
