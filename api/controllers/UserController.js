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
var generator = require('generate-password');



module.exports = {
    create: function(req, res) {
        if (req.body.password !== req.body.confirmPassword) {
            return ResponseService.json(401, res, "Password doesn't match")
        }

        var allowedParameters = [
            "email", "password"
        ]
        var password = generator.generate({
            length: 8,
            numbers: true
        });

        console.log(req.body, password)

        var payload = {
            email: req.body.email,
            password: password
        }

        User.create(payload).then(function(user) {
            var responseData = {
                user: user,
                token: JwtService.issue({ id: user.id })
            }
            var url = "http://localhost:1337/accounts/activate" + "?id=" + user.id + "&token=" + JwtService.issue({ id: user.id });



            var message = ' <table bgcolor="#f0f0f0" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%"> <tbody> <tr> <td align="center" bgcolor="#f0f0f0" style="background-color:#f0f0f0" valign="top"> <table bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" class="m_-3148058551993619661container" width="600"> <tbody> <tr> <td style="background: #92140C;"> <div>&nbsp;</div> </td> </tr> <tr> <td><span class="m_-3148058551993619661sg-image"><img height="48px" src="http://res.cloudinary.com/jonpecson/image/upload/c_scale,w_250/v1503478238/cooptavanza-logo-2_yjouls.png" style="margin:11px 26px;width: 250px;height: 60px;" width="250" class="CToWUd"></span></td> </tr> <tr> <td bgcolor="#ffffff" class="m_-3148058551993619661container-padding" style="background-color:#ffffff;padding-left:30px;padding-right:30px"> <div class="m_-3148058551993619661row m_-3148058551993619661top-padding20, m_-3148058551993619661vero-editable"> <div class="m_-3148058551993619661col-sm-12 m_-3148058551993619661col-md-6"> <p> </p> <p>Welcome to <span class="il">Cooptavanza</span><span class="il"></span>! Before you get started, please confirm your account by clicking the link below.</p>&nbsp; <center> <p><b>Account Details</b></p> <p>email: <b>' + user.email + '</b></p> <p>password: <b>' + password + '</b></p> </center> <br> <center> <p><a href="' + url + '" rel="nofollow" style="margin: 0px;background-color: #CA1800;border-radius:5px;text-align:center;color:#ffffff;font-size: 17px;font-weight:bold;min-height:20px;padding:9px 15px;text-decoration:none;display:block;width:80%;" text="Confirm account" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=' + url + '&amp;source=gmail&amp;ust=1503563464888000&amp;usg=AFQjCNHYsTKL50hPBFnawcdRSwkOpQMbnQ">Confirm my account </a></p> </center>&nbsp; <!-- <p>or copy and paste your verification code to verify your account:</p> <center style="font-size:22px">Your Verification Code</center> <center style="font-size:32px;letter-spacing:4px;margin-top:10px"><strong>120604</strong></center> --> <p>&nbsp;</p> <p style="background-color:rgb(255,255,255)">If you believe an unauthorized person accessed your account,<br>please contact <a href="mailto:support@cooptavanza.net" target="_blank">support@<span class="il">cooptavanza</span>.<span class="il">net</span></a>.</p> </div> <div class="m_-3148058551993619661col-sm-12 m_-3148058551993619661col-md-6"> <p>Regards,<br><br>The <span class="il">Cooptavanza</span><span class="il"></span> Team<br><br><a href="http://twitter.com/Cooptavanza" style="word-wrap:break-word;color:#37b9e5;font-weight:normal;text-decoration:underline" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=http://twitter.com/Cooptavanza&amp;source=gmail&amp;ust=1503563464888000&amp;usg=AFQjCNEONOdZO1pZh3Xw0CUQT5u2R555Yg"><span class="m_-3148058551993619661sg-image"><img alt="Twitter" height="30px;" src="https://ci3.googleusercontent.com/proxy/S3C20xaD3FdqZ5AIIf7u6ZbSfDCxPOlwPhaqMTfhRvHyPYJmgGYBrUB780qDvkqhj5qMUS-oh94=s0-d-e1-ft#http://i61.tinypic.com/29vxthj.png" style="border:none;outline:none;text-decoration:none;height:auto!important" width="30px;" class="CToWUd"></span></a> <a href="http://facebook.com/Cooptavanza-148060245780082" style="word-wrap:break-word;color:#37b9e5;font-weight:normal;text-decoration:underline" target="_blank" data-saferedirecturl="https://www.google.comurl?hl=en&amp;q=http://facebook.com/Cooptavanza-148060245780082&amp;source=gmail&amp;ust=1503563464888000&amp;usg=AFQjCNGGv5SLuh3Mi4CnrA4S_5zoPXChHQ"><span class="m_-3148058551993619661sg-image"><img alt="Facebook" height="30px;" src="https://ci6.googleusercontent.com/proxy/flIB6YbxwoPwtCSWefXl_HHECghkooiVyfuQTGU76YWjS5jduHbo4oULH9Qkf_524mpcAmOsDXQ=s0-d-e1-ft#http://i61.tinypic.com/2s9t11x.png" style="border:none;outline:none;text-decoration:none;height:auto!important" width="30px;" class="CToWUd"></span></a> </p> </div> </div> </td> </tr> <tr> <td></td> </tr> </tbody> </table> <center> <p style="font-size:10px;color:#a3a3a3">© 2017, All rights reserved. Calle Quinta y Manuel Gonzalez, Del Edificio Aitza,Local 1, Santiago Veraguas, Republic of Panama</p> </center> </td> </tr> </tbody> </table>'


            // Send Email
            var data = {
                from: 'Cooptavanza<support@cooptavanza.net>',
                to: user.email,
                subject: 'Please verify your account',
                html: message
            };

            mailgun.messages().send(data, function(error, body) {
                console.log("Email Response:", body);
            });
            return ResponseService.json(200, res, "User created successfully", responseData, url)

        }).catch(function(error) {
            if (error.invalidAttributes) {
                return ResponseService.json(400, res, "User could not be created", error.Errors)
            }
        })

    }
};