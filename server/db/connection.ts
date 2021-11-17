import { Sequelize } from 'sequelize';
import mysql from 'mysql2';

import SERVER from '../config/config';

const db_host = SERVER.db.host;
const db_name = SERVER.db.name;
const db_username = SERVER.db.username;
const db_password = SERVER.db.password;

const connection = mysql.createConnection({
  host: db_host,
  user: db_username,
  password: db_password,
});
connection.query(`CREATE DATABASE IF NOT EXISTS \`${db_name}\`;`);

const db = new Sequelize(db_name, db_username, db_password, {
  host: db_host,
  dialect: 'mysql',
  logging: false,
});

export default db;
