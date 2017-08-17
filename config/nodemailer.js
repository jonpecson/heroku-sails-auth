module.exports.nodemailer = {
    usessl: true,
    port: 465,
    from: 'support@cooptavanza.net',
    prepend_subject: false,
    host: 'smtp.mailgun.org',
    user: process.env.MAILGUN_USER,
    password: process.env.MAILGUN_PASS
}