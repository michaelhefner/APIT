const { pool } = require("./db");

const createUserTable = pool.query(`create table if not exists "APITester".users (id serial primary key, 
  username varchar(255) not null, email varchar(255) not null, unique(username, email))`)
    .then(res => console.log('create users table if it does not exist',res));

const createTestTable = pool.query(`create table if not exists "APITester".test (id serial primary key, 
  name varchar(255), description varchar(255), type varchar(255), data varchar(255), result varchar(255), 
  status varchar(255), userid integer not null REFERENCES "APITester".users(id), url varchar(255));`)
    .then(res => console.log('create test table if it does not exist', res));


const data = createUserTable;
const insert = {
  test: async (name, description, type, data, result, status, userid, url) => {
    try {
      console.log('userid', userid);
      await createUserTable;
      await createTestTable;

      const userID = await pool.query(`SELECT id FROM "APITester".users where username = ${userid}`)
        .then(res => res.rows.length > 0 ? res.rows[0].id : null);

      const res = await pool.query(`INSERT INTO "APITester".test (name, description, type, data, result, status, userid, url) 
        VALUES (${name}, ${description}, ${type}, ${data}, ${result}, ${status}, ${userID}, ${url}})`);
        
      return res;
    } catch (error) {
      return {message: error.detail, code: error.code};
    } 
  },
  user: async (username, email) => {
    try { 
      await createUserTable;
      const res = await pool.query(`INSERT INTO "APITester".users (username, email) VALUES ('${username}', '${email}')`);
      return res;
    } catch (error) {
      return {message: error.detail, code: error.code};
    } 
  }
}


return module.exports = { data, insert };