/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var _ = require('lodash');

var nodemailer = require('nodemailer');
// var smtpTransport = nodemailer.createTransport();
var mg = require('nodemailer-mailgun-transport');

// This is your API key that you retrieve from www.mailgun.com/cp (free up to 10K monthly emails)
var auth = {
    auth: {
        api_key: 'key-59e03ff1ee4cc411b045ce02aff4c71a',
        domain: 'https://api.mailgun.net/v3/sandbox3ce6032513a14ee6957f8da3d2b935f9.mailgun.org'
    }
}

var nodemailerMailgun = nodemailer.createTransport(mg(auth));


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
            // var responseData = {
            //         user: user,
            //         token: JwtService.issue({ id: user.id })
            //     }
            //     // Todo: Send activation email to user
            // var url = "http://localhost/accounts/activate/" + "?id=" + id + "&token=" + JwtService.issue({ id: user.id });

            // ResponseService.json(200,
            //     res, "Please activate your account to start our system. We sent an activation email to " + user.email, responseData, url)

            // ResponseService.json(200,
            //     res, "Please activate your account to start our system. We sent an activation email to " + user.email, user);



            // var mailOptions = {
            //     to: user.email,
            //     from: sails.config.nodemailer.from,
            //     subject: 'Please verify your Cooptavanza account',
            //     html: url,
            //     // html: "<p>Hi,</p> <p>Thanks for opening your Cooptavanza account! Please confirm your email address by clicking on the link below. We'll communicate with you from time to time via email so it's important that we have an up-to-date email address on file. </p> <a href='http://localhost/accounts/activate/" + url + "'>http://localhost/accounts/activate/" + url + "</a><p>If you did not sign up for a Cooptavanza account please click on the link below.</p> <p>Happy banking! Cooptavanza Team</p>"
            // }

            // nodemailerMailgun.sendMail(mailOptions, function(err) {
            //     if (!err) {
            //         res.send({
            //             message: 'An email has been sent to ' + user.email + '. Please check your email to activate your account.'
            //         })
            //     } else {
            //         return res.status(400).send({
            //             message: 'Failure in sending email.'
            //         })
            //     }
            // })

            // res.send(url);



        }).catch(function(error) {
            if (error.invalidAttributes) {
                return ResponseService.json(400, res, "User could not be created", error.Errors)
            }
        })

    }
};