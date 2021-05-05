const sequelize = require('../config/db.js');
const Sequelize = require('sequelize');

const User = sequelize.define('user_', {
    id_user: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    user_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    mobile_phone: Sequelize.BIGINT,
    password: Sequelize.STRING,
    image_user: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    active_user: Sequelize.BOOLEAN,
    id_role: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    provider: Sequelize.STRING,
    provider_id: Sequelize.STRING,
    provider_token: Sequelize.STRING,
    created_at: {
        type: Sequelize.DATE,
        allowNull: false,
    },
});
User.prototype.generateHash = (password) => {
    return bcrypt.hash(password, bcrypt.genSaltSync(8));
};
User.prototype.validPassword = (password) => {
    return bcrypt.compare(password, this.password);
};
User.prototype.validProvider = function(provider, providerId, authToken) {
    console.log('provider es igual?', provider === this.provider);

    console.log('providerId', providerId);
    console.log('this.provider_id', this.provider_id);
    console.log('provider id es igual?', providerId === this.provider_id);

    console.log('authToken', authToken);
    console.log('provider_token', this.provider_token);
    console.log('provider_token id es igual?', authToken === this.provider_token);


    console.log('final', provider === this.provider && authToken === this.provider_token && providerId === this.provider_id);
    return provider === this.provider && authToken === this.provider_token && providerId === this.provider_id;
};

module.exports = User;