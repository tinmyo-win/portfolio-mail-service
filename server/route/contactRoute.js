require('dotenv/config');
const router = require('express').Router();
const nodemailer = require('nodemailer');

const myMail = process.env.MY_MAIL;
const mailPassword = process.env.MAIL_PASSWORD;
console.log(myMail, mailPassword)

router.post('/contact', async (req, res) => {
    let data = req.body
    if(data.name.length === 0 || data.email.length === 0 || data.message.length === 0) {
        return res.json({msg: 'please fill all the fields'})
    }
    let stmpTransporter = nodemailer.createTransport({
        service: 'Gmail',
        port: 465,
        auth: {
            user: myMail,
            pass: mailPassword
        }
    })
    let mailOptions ={
        from: `${data.email}`,
        to: myMail,
        subject: `message from ${data.name}`,
        html: `
        
            <h3>Informations</h3>
            <ul>
                <li>Name: ${data.name}</li>
                <li>Email: ${data.email}</li>
            </ul>
            <h3>Message</h3>
            <p>${data.message}</p>   
        `
    }

    await stmpTransporter.sendMail({
        from: myMail, // sender address
        to: data.email, // list of receivers
        subject: "Thank you for contacting me ✔", // Subject line
        text: "I will reply to you as soon as possible", // plain text body
        html: `<b>  Thank you for contacting me.
                    I will reply to you as soon as possible
                    <br />
                     Yours sincerely,<br />
                        Tin Myo Win
                </b>`, // html body
    });

    stmpTransporter.sendMail(mailOptions, (error) => {
        try {
            if(error) return res.status(400).json(error);
            res.status(200).json({msg: 'Thank you for contacting Tin Myo Win'})

        } catch(error) {
            if(error) {
                if(error) return res.status(500).json({msg: 'there is server error'})
            }
        }
    })

})

module.exports= router;
