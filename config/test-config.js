module.exports = () => {
  return {
    env: 'test',
    mongoURL: process.env.TEST_MONGO_URL,
    jwtSecret: process.env.JWT_SECRET,
    port: process.env.PORT || 80
  };
};
