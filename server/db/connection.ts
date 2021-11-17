import { Sequelize } from 'sequelize';
import SERVER from '../config/config';

const host = SERVER.host;
const db_name = SERVER.db.name;
const db_username = SERVER.db.username;
const db_password = SERVER.db.password;

const db = new Sequelize(db_name, 'root', 'MYSQL_ROOT_PASSWORD', {
  host: 'mysql_db',
  dialect: 'mysql',
  logging: false,
});

export default db;
