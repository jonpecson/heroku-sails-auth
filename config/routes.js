module.exports.routes = {
    'post /login': 'AuthController.login',
    'post /accounts/activate': 'AuthController.activate',
    'post /signup': 'UserController.create',
};