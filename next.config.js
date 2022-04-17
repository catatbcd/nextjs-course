/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

const nextConfig = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: "catat",
        mongodb_password: "vbq0U3LBYHi3iAr5",
        mongodb_clustername: "cluster0",
        mongodb_database: "blog-dev",
      },
    };
  }
  return {
    env: {
      mongodb_username: "catat",
      mongodb_password: "vbq0U3LBYHi3iAr5",
      mongodb_clustername: "cluster0",
      mongodb_database: "blog",
    },
  };
};

module.exports = nextConfig;
