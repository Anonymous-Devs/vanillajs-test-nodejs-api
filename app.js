const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");


// Middlewares
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname + "/public")))
app.set("view engine", 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.resolve('public')));
app.use(cors());
const api = app;

const user = require(path.resolve("controller/user/routes"));
const test = require(path.resolve("controller/test/routes"));
app.use(user);
app.use(test);

api.get('/', (req, res) => {
    res.render("index")
})

api.get("/userInfo", async(req, res) => {
    const userDetails = {
        name: "John Doe",
        email: "johndoe@gmail.com",
        phone: "09023007389",
        password: "password123"
    }
    res.json({ okay: true, data: userDetails })
});

api.post("/reset-password", async(req, res) => {
    try {

        /* Instantiate our database */
        const db = new Database();
        /* Get saved user info */
        const { name, email } = await db.get("userInfo");
        const process = require("process");
        if (email === req.body.email) {
            const token = jwt.sign({ email }, '09023007389', { expiresIn: '1d' });
            async function main() {

                let transporter = nodemailer.createTransport({
                    host: "host11.registrar-servers.com",
                    port: 465,
                    secure: true,
                    auth: {
                        user: '_mainaccount@yowamusic.com.ng',
                        pass: '09023007389@fb.com'
                    },
                });

                let userMsg = await transporter.sendMail({
                    from: `"Test API" <ewmrhumr@yowamusic.com.ng>`, // sender address
                    to: `${req.body.email}`, // list of receivers
                    subject: `Password reset`, // Subject line
                    html: `
              <h2> Hey ${name}, <h2>
              <p>Use this link to reset your password <a href='/reset-password?secure=${token}'>reset password</a> </p>
             ` // html body
                });

                console.log("Message sent: %s", `${userMsg.messageId} ${req.body.email}`);
                res.status(200).json({ okay: true, message: "An email to reset your password has been sent to your email address" })
            }
            main().catch(res.status(400).json({ okay: false, message: "An error occured" }));

        } else {
            res.status(400).json({ okay: false, message: "This email address does not exist on our server" })
        }
    } catch (e) {
        console.log(e);
        res.send(e)
    }
})
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("App listening on port", port));