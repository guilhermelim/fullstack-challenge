export const HOST_API_KEY: string =
  process.env.NEXT_PUBLIC_HOST_API_KEY ?? "http://localhost:4000/graphql";

const defaultConfig = {
  HOST_API_KEY,
};

export default defaultConfig;
