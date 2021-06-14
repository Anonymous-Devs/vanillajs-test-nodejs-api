const path = require("path");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const Model = require("./model");

class User {
    async createOne(req, res) {

        const schema = Joi.object({
            name: Joi.string().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            phone: Joi.number().min(9).required(),
            email: Joi.string().email()
        });

        try {
            await schema.validateAsync(req.body);
            try {
                let { name, email, phone, password } = req.body;
                const hashedPassword = await bcrypt.hashSync(req.body.password, 10 /*add random strings/characters to original password 10 times*/ );
                password = hashedPassword;
                const model = new Model({ name, email, phone, password });
                const data = await model.create();
                delete data.password;
                if (data) res.status(201).json({ okay: true, message: "Account created successfully." });
            } catch (e) {
                res.json({ okay: false, message: "Account already exist" });
            }
        } catch (e) {
            res.json({ okay: false, mssage: e.details[0].message })
        }
    }

    async login(req, res) {

        const { email, password } = req.body;

        try {
            const model = new Model({});
            console.log(email)
            const user = await model.getOne(email);
            console.log(user)
            if (user) {
                const correctPassword = await bcrypt.compareSync(password, user.password);
                if (correctPassword) res.json({ okay: true, message: user })
                else res.json({ okay: false, message: "Incorrect password" })
            } else res.json({ okay: false, message: "Account does not exist" })
        } catch (e) {
            console.log(e);
            res.send(e)
        }
    }

    async getOne(req, res) {
        try {
            console.log(req.query);
            const { email } = req.query;
            console.log(email)
            const model = new Model({});
            const user = await model.getOne(email);
            if (user) {
                console.log(user);
                res.json({ okay: true, message: user })
            } else res.json({ okay: true, message: "User not found" })
        } catch (err) {
            console.log(err);
            res.json({ okay: false, message: err.message })
        }
    }
}

module.exports = new User();