module.exports = () => {
  return {
    env: 'prod',
    mongoURL: process.env.MONGO_URL,
    jwtSecret: process.env.JWT_SECRET,
    port: process.env.PORT || 80
  };
};
