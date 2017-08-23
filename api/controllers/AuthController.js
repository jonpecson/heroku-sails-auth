module.exports = {

    login: function(req, res) {
        var email = req.param('email');
        var password = req.param('password');

        verifyParams(res, email, password)

        User.findOne({ email: email }).then(function(user) {
            if (!user) {
                return invalidEmailOrPassword(res);
            } else {
                // check if user is already activated

                if (user.isActivated) {
                    signInUser(req, res, password, user)
                } else {
                    //Email user
                    ResponseService.json(200, res, "Please verify your account to continue.", user)
                }
            }

        }).catch(function(err) {
            return invalidEmailOrPassword(res);
        })
    },
    activate: function(req, res) {
        var params = req.params.all();
        sails.log.debug(req.params.all());

        let token = req.param('token');
        JwtService.verify(token, function(err, decoded) {
            if (err) return ResponseService.json(401, res, "Invalid Token!");
            var id = decoded.id;
            User.findOne(id).exec(function(err, user) {
                if (err) {
                    sails.log.debug(err);
                    res.send(500, err);
                }
                if (!user) {
                    sails.log.debug(err);
                    ResponseService.json(500, res, "Could not find the specified account.")
                } else {
                    user.isActivated = true;
                    user.save(function(err) {
                        if (err) {
                            return res.serverError(err);
                        } else {
                            ResponseService.json(200, res, "User has been activated successfully")
                            sails.log.debug('User has been activated successfully');
                        }

                    }); //</user.save()>
                }

            });
        });
    }

};


function signInUser(req, res, password, user) {
    User.comparePassword(password, user).then(
        function(valid) {
            if (!valid) {
                return this.invalidEmailOrPassword();
            } else {
                var responseData = {
                    user: user,
                    token: generateToken(user.id)
                }
                return ResponseService.json(200, res, "Successfully signed in", responseData)
            }
        }
    ).catch(function(err) {
        return ResponseService.json(403, res, "Forbidden")
    })
};


function invalidEmailOrPassword(res) {
    return ResponseService.json(401, res, "Invalid email or password")
};

function verifyParams(res, email, password) {
    if (!email || !password) {
        return ResponseService.json(401, res, "Email and password required")
    }
};


function generateToken(user_id) {
    return JwtService.issue({ id: user_id })
};