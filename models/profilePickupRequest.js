// This model is used to create a new table for all user pickup requests (name, address, phone, type of recyclable, time, etc...)
// LATER we should RENAME this model pickupRequest

module.exports = function(sequelize, DataTypes) {
    var ProfilePickupRequest = sequelize.define("ProfilePickupRequest", {
        // name: {
        //     type: DataTypes.STRING
        // },
        phone: {
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

    ProfilePickupRequest.associate = function(models) {
        ProfilePickupRequest.belongsTo(models.newUser, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return ProfilePickupRequest;
};