module.exports.routes = {
    'post /login': 'AuthController.login',
    'get /accounts/activate': 'AuthController.activate',
    'post /signup': 'UserController.create',
};