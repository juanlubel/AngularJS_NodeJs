const app = require('express').Router();
const nodeMailer = require('nodemailer');
const sgTrasnport = require('nodemailer-sendgrid-transport');
require('dotenv').config();

function template(body) {
    let email = {
        to : body.to,
        from : body.from,
        subject : 'Page Name'
    }
    switch (body.option) {
        case 'contact':
            email.html = `
            <div>
                <h3>Request from ${body.subject}</h3>
                <p>Thank you ${body.subject} for contact us!</p>
                <p></p>
            </div>
            `
            return email
            break
        case 'recover':

            return email
            break
    }
}

app.post(
    '/',
    (req, res) => {
        let email = template(req.body)
        let options = {
            auth: {
                api_key: process.env.SENDGRID_API_KEY
            }
        };
        let mailer = nodeMailer.createTransport(sgTrasnport(options));
        mailer.sendMail(
            email
            , (error, info) => {
                if (error) {
                    res.status('401').json({message: 'error', text: 'Falta algun parametro'})
                } else {
                    let ret = {
                        ...info,
                        text: 'el mensaje se envio correctamente'
                }
                console.log(ret)
                    res.status('200').json(ret)
                }
            }
        )
    }
);

module.exports = app;
