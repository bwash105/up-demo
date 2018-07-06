// This model is used to create a new table for all user pickup requests (name, address, phone, type of recyclable, time, etc...)
// LATER we should RENAME this model pickupRequest

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        name: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        },
        type: {
            type: DataTypes.STRING
        },
        quantity_in_lbs: {
            type: DataTypes.STRING
        },
        pickupStart: {
            type: DataTypes.STRING
        },
        pickupEnd: {
            type: DataTypes.STRING
        }
    });

    // Removed this relationship because we are going to have the pickup request form in the profile instead, see profilePickupRequests.js
    // I added the relationship between the pickup requests table and the newUser table, but I think we need to delete name and address from above model
    // User.associate = function(models) {
    //     User.belongsTo(models.newUser, {
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     });
    // };

    return User;
};