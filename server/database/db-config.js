const dotenv = require('dotenv');
dotenv.config();

let dbConfig = {
    DB_HOST: String,
    DB_PORT: Number,
    DB_DATABASE: String,
    DB_USER: String,
    DB_PASSWORD: String
}

if (process.env.NODE_ENV === 'test') {
    dbConfig.DB_HOST        = process.env.TEST_DB_HOST;
    dbConfig.DB_PORT        = process.env.TEST_DB_PORT,
    dbConfig.DB_DATABASE    = process.env.TEST_DB_DATABASE,
    dbConfig.DB_USER        = process.env.TEST_DB_USER,
    dbConfig.DB_PASSWORD    = process.env.TEST_DB_PASSWORD
} else {
    dbConfig.DB_HOST        = process.env.DEV_DB_HOST;
    dbConfig.DB_PORT        = process.env.DEV_DB_PORT,
    dbConfig.DB_DATABASE    = process.env.DEV_DB_DATABASE,
    dbConfig.DB_USER        = process.env.DEV_DB_USER,
    dbConfig.DB_PASSWORD    = process.env.DEV_DB_PASSWORD
}

module.exports = dbConfig;