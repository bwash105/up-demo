var db = require("./../models");

module.exports = function (app) {

    // READ: this just renders the homepage
    app.get("/", function (req, res) {
        res.render("index");
    });

    // READ: this renders the pickup request page for the user (what kinds of recyclables they want picked up, address, time, etc...)
    // We should definitely RENAME this LATER once everything is up and running, suggest naming it /pickupRequest
    app.get("/addUser", function (req, res) {
        db.User.findAll({}).then(function (data) {
            // res.json(data);
            res.render("addUser", { users: data });
        });
    });

    // READ: This renders a "create new account" page for brand new users to create login email and password (THIS IS NEW, I JUST ADDED IT!)
    app.get("/newUser", function (req, res) {
        res.render("newUser");
    });

    // READ:  This renders the public page
    app.get("/public", function (req, res) {
        db.ProfilePickupRequest.findAll({}).then(function(data){
            res.render("public", {allRequests: data});
        })
    });

    // READ: This renders a login page that later checks to make sure their email matches the password and later gives them permission to see only their own private information like address and phone number (THIS IS NEW, I JUST ADDED IT!)
    app.get("/login", function (req, res) {
        res.render("login");
    });

    // READ: This renders a profile page (THIS IS NEW, I JUST ADDED IT!)
    app.get("/profile/:id", function (req, res) {
        db.newUser.findOne({
            where: {
                id: req.params.id
            }
        }).then(function (data) {

            db.ProfilePickupRequest.findAll({
                where: {
                    newUserId: data.id
                }
            }).then(function (findRequests) {
                // res.json(data);
                res.render("profile", { users: data, requests: findRequests });
            })

        });
    });
    // app.get("/profile/:id", function (req, res) {
    //     db.ProfilePickupRequest.findOne({
    //         where: {
    //             newUserId: req.params.id
    //         }
    //     }).then(function (data) {

    //         db.newUser.findAll({
    //             where: {
    //                 id: data.newUserId
    //             }
    //         }).then(function(findRequests){
    //             // res.json(data);
    //             res.render("profile", { users: data, requests: findRequests});
    //         })

    //     });
    // });



    // CREATE: This saves the information from the "create new account" page above for brand new users (THIS IS NEW, I JUST ADDED IT!)
    app.post("/api/newUser", function (req, res) {
        db.newUser.create({
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            password: req.body.password
        }).then(function (data) {
            // res.json(data);
            res.json("/login");
        });
    });

    // CREATE: This saves the information from the pickup request page (name, address, type recylcable, time, etc...)
    // Suggest we RENAME this LATER once everything is up and running, suggested name: /api/pickupRequests
    app.post("/api/users", function (req, res) {
        db.User.create({
            name: req.body.name,
            phone: req.body.phone,
            address: req.body.address,
            type: req.body.type,
            quantity_in_lbs: req.body.quantity_in_lbs,
            pickupStart: req.body.pickupStart,
            pickupEnd: req.body.pickupEnd
        }).then(function (data) {
            res.json(data);
        });
    });

    // This is for the pickup request form in the profile
    app.post("/api/profilePickupRequest", function (req, res) {
    
        db.ProfilePickupRequest.create({
            // name: req.body.name,
            phone: req.body.phone,
            // address: req.body.address,
            type: req.body.type,
            quantity_in_lbs: req.body.quantity_in_lbs,
            pickupStart: req.body.pickupStart,
            pickupEnd: req.body.pickupEnd,
            newUserId: req.body.newUserId
        }).then(function (data) {
            res.json(data);
        });
    });




    // VERIFY: This checks to  make sure user login email matches user password (THIS IS NEW, I JUST ADDED IT!)
    // Travis said we use post when checking passwords instead of get bc of sensitive info
    app.post("/api/login", function (req, res) {
        // get the user from database by their email 
        db.newUser.findOne({
            where: {
                email: req.body.email
            }
        }).then(function (data) {
            // check if the user password user has typed in login page matches password from database
            if (req.body.password === data.password) {
                // res.json(data);
                // let the user continue to the next page (need to add this step below this comment)
                // window.location.replace(data);
                res.json("/profile/" + data.id);
            }
            else {
                // some kind of "wrong password" message
                res.status(400).send("Wrong Password");
            }

        });


    });

}