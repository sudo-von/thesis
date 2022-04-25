const environment = {
  database: {
    url: `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}:27017/${process.env.MONGO_DATABASE}?authSource=admin`,
  },
  token: {
    secret: process.env.SECRET_KEY,
  }
};

export default environment;