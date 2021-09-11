import { Sequelize } from 'sequelize';

//TODO: Replace with .env variables
const db_name = 'medclip_dev';
const db_username = 'root';
const db_password = '';

const db = new Sequelize(db_name, db_username, db_password, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

export default db;
