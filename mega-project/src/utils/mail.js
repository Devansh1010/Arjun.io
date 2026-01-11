import Mailgen from 'mailgen'
import nodemailer from 'nodemailer'

export const sendMail = async (options) => {
    const mailGenerator = new Mailgen({
        theme: 'default',
        product: {
            // Appears in header & footer of e-mails
            name: 'Arjun.io',
            link: 'https://mailgen.js/'
            // Optional product logo
            // logo: 'https://mailgen.js/img/logo.png'
        }
    });

    // Generate an HTML email with the provided contents
    var emailBody = mailGenerator.generate(options.mailGenContent);

    // Generate the plaintext version of the e-mail (for clients that do not support HTML)
    var emailText = mailGenerator.generatePlaintext(options.mailGenContent);

    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_TRAP_HOST,
        port: process.env.MAIL_TRAP_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.MAIL_TRAP_USER,
            pass: process.env.MAIL_TRAP_PASSWORD,
        },
    });

    const mail = {
        from: 'taskmanager@gmail.com',
        to: options.email,
        subject: options.subject,
        text: emailText, // plain‑text body
        html: emailBody,    
    }

    try {
        const result = await transporter.sendMail(mail)
        console.log("Mail Sent Successfully", result)
    } catch (error) {
        console.log("Error Sending Mail", error)
    }
}

export const emailVerificationMailGenContent = (username, verifiactionUrl) => {
    return {
        body: {
            name: username,
            intro: 'Welcome to Arjun.io! We\'re very excited to have you on board.',
            action: {
                instructions: 'To get started with Arjun.io, please verify your account:',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Confirm your account',
                    link: verifiactionUrl
                }
            },
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    }
}

export const forgotPasswordMailGenContent = (username, resetUrl) => {
    return {
        body: {
            name: username,
            intro: 'You have requested to reset your password. Please click the button below to reset your password.',
            action: {
                instructions: 'To reset your password, please click the button below:',
                button: {
                    color: '#FF0000', 
                    text: 'Reset your password',
                    link: resetUrl
                }
            },
            
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    }
}