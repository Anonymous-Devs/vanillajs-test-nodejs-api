const path = require("path"),
    db = require(path.resolve("db"));

    class Query {
    async createUser (data){
      const {name, email, phone, password} = data;
      const text = "INSERT INTO users(name, email, phone, password) VALUES($1, $2, $3, $4) RETURNING *";
      const value = [name, email, phone, password];
      const query = await db.query(text, value);

      return query.rows[0];
    }

    async getUser (email) {
      const text = "SELECT * FROM users WHERE email = $1";
      const value = [email];
      const query = await db.query(text, value);
      return query.rows[0];
    }

  }

  module.exports = new Query();
