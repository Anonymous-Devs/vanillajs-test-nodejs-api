const query = require("./query");
class User {
  constructor(data){
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.password = data.password
  }
  getInfo() {
    return {
      name: this.name,
      email: this.email,
      phone: this.phone,
      password: this.password
    }
  }
  async create() {
      const data = await query.createUser(this.getInfo());
      return data;
  }
  async getOne(email){
    const data = await query.getUser(email);
    return data;
  }
}

module.exports = User;
