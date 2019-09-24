module.exports = () => {
  return {
    env: 'dev',
    mongoURL: process.env.MONGO_DEV_URL,
    jwtSecret: process.env.JWT_SECRET,
    port: process.env.PORT || 80
  };
};
