module.exports = (sequelize, DataTypes) => {
    const Food = sequelize.define('food', {
        food: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false
        },
        emoji: {
            type: DataTypes.STRING,
            allowNull: true
        },
        feelings: {
            type: DataTypes.STRING,
            allowNull: true
        },
        calories: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        owner_id: {
            type: DataTypes.INTEGER
        }
    });
    return Food;
};