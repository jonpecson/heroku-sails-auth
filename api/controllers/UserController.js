// /**
//  * UserController
//  *
//  * @description :: Server-side logic for managing users
//  * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
//  */

// module.exports = {

// };

/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var _ = require('lodash');

// Mailgun
var api_key = 'key-59e03ff1ee4cc411b045ce02aff4c71a';
var domain = 'mg.cooptavanza.net';
var mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });



module.exports = {
    create: function(req, res) {
        if (req.body.password !== req.body.confirmPassword) {
            return ResponseService.json(401, res, "Password doesn't match")
        }

        var allowedParameters = [
            "email", "password"
        ]

        var data = _.pick(req.body, allowedParameters);

        User.create(data).then(function(user) {
            var responseData = {
                user: user,
                token: JwtService.issue({ id: user.id })
            }
            var url = "http://localhost:1337/accounts/activate" + "?id=" + user.id + "&token=" + JwtService.issue({ id: user.id });


            var message = '';
            message = 'Hello!';
            message += '<br/>';
            message += 'Please visit the verification link to complete the registration process.';
            message += '<br/><br/>';
            message += '<a href="';
            message += url;
            message += '">Verification Link</a>';
            message += '<br/><br/>';
            message = 'Regards,';
            message += '<br/>';
            message += 'Cooptavanza R.L Team';


            var data = {
                from: 'Cooptavanza<support@cooptavanza.net>',
                to: user.email,
                subject: 'Please verify your email',
                html: message
            };

            mailgun.messages().send(data, function(error, body) {
                console.log("Email Response:", body);
                console.log(message)
            });




            return ResponseService.json(200, res, "User created successfully", responseData, url)
        }).catch(function(error) {
            if (error.invalidAttributes) {
                return ResponseService.json(400, res, "User could not be created", error.Errors)
            }
        })

    }
};