const e = require("express");
const express = require("express");
const math = require("mathjs");
const app = express();
const port = 3000;

const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
var serviceAccount = require("./key.json");
initializeApp({
    credential: cert(serviceAccount),
});
const db = getFirestore();

app.set("view engine", "ejs");
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.send("Hello!!! Welcome to 	HOUSE OF BOOKS...");
});

app.get("/index", (req, res) => {
    res.render("index");
});

app.get("/about", (req, res) => {
    res.render("about");
});
app.get("/aboutnav", (req, res) => {
    res.render("about");
})
app.get("/aboutWebsite", (req, res) => {
    res.render("home");
})

app.get("/home", (req, res) => {
    res.render("home");
});
app.get("/homenav", (req, res) => {
    res.render("home");
})
app.get("/homesubmit", (req, res) => {
    res.render("signup");
})

app.get("/signup", (req, res) => {
    res.render("signup");
});
app.get("/signupnav", (req, res) => {
    res.render("signup");
})
app.get("/signupsubmit", (req, res) => {
    const email = req.query.email;
    const password = req.query.password;
    db.collection("Users").add({
        
        Email: email,
        Password: password,
    }).then(() => {
        res.render("submit");
    });
});

app.get("/submit", (req, res) => {
    res.render("submit");
});
app.get("/submit", (req, res) => {
    res.render("submit");
})
app.get("/login", (req, res) => {
    const login_email = req.query.login_email;
    const password = req.query.password;
    db.collection("Users")
        .where("Email", "==", login_email)
        .where("Password", "==", password)
        .get()
        .then((docs) => {
            if (docs.size > 0) {
                res.render("");
            } else {
                res.render("login");
            }
        });
});




app.listen(port, () => {
    console.log(`Server is running on Port Number: http://localhost:${port}`);
});