//This model sets up the table which holds information for each of our users
//It is used to create a brand new user 
//We store their email and password to give them correct permissions later 
//They can only see their own private info like phone and address, this information is hidden from other users

module.exports = function(sequelize, DataTypes) {
    var newUser = sequelize.define("newUser", {
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        }
    });

    newUser.associate = function(models) {
        newUser.hasMany(models.ProfilePickupRequest, {
            onDelete:"cascade"
        });
    }

    return newUser;
};