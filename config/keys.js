import dotenv from 'dotenv';

dotenv.config();

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
module.exports = {
  mongoURI: `mongodb://${user}:${password}@ds117145.mlab.com:17145/sms-manager`,
};
