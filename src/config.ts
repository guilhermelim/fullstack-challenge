import dotenv from "dotenv";

dotenv.config();

export const APOLLO_SERVER_PORT = process.env.APOLLO_SERVER_PORT || 4000;

const defaultConfig = {
  APOLLO_SERVER_PORT,
};

export default defaultConfig;
