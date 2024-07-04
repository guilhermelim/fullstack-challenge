import dotenv from "dotenv";

dotenv.config();

export const APOLLO_SERVER_PORT = process.env.APOLLO_SERVER_PORT || 4000;
export const MONGODB_URI: string =
  process.env.MONGODB_URI ||
  "mongodb://root:secret@localhost:27017/cotabox?authSource=admin";

const defaultConfig = {
  APOLLO_SERVER_PORT,
};

export default defaultConfig;
