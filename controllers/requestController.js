var db = require("./../models");

module.exports = function (app) {
    // READ: This gets all the pickup request info for the user by id 
    app.get("/requestEdit/:id", function (req, res) {
        db.ProfilePickupRequest.findOne({
            where: {
                id: req.params.id
            }
        }).then(function (data) {
            // console.log(data);
            // res.json(data);
            res.render("requestEdit", { request: data });
        });
    });

    // UPDATE: This allows users to edit their pickup request
    // Problem right now: radios aren't showing up with new formatting
    app.put("/api/requestEdit/:id", function (req, res) {

        // console.log(req.params.id);

        db.ProfilePickupRequest.update({
            // name: req.body.name,
            phone: req.body.phone,
            // address: req.body.address,
            type: req.body.type,
            quantity_in_lbs: req.body.quantity_in_lbs,
            pickupStart: req.body.pickupStart,
            pickupEnd: req.body.pickupEnd
        },
            {
                where: {
                    id: req.params.id
                }
            }).then(function (data) {
                res.json(data);
            });
    });

    // DELETE: This allows the user to delete their request to confirm our drivers have been by to pick up their recyclables
    // Sugget renaming the button to: "Pickup complete" or something along those lines
    app.delete("/api/requestEdit/:id", function (req, res) {
        db.ProfilePickupRequest.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (data) {
            res.json(data);
        });
    });

};