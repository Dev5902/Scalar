const Pool = require('pg').Pool;

const pool = new Pool({
    user:"postgres",
    host:"Localhost",
    database:"Scalar",
    password:"devsharma",
    port: 5432,
}); 

module.exports = {
    pool
};