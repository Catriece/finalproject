import mysql from "mysql2";
import config from "../config";

const connection = mysql.createPool(config.mysql);

export default connection;
