
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'pandyaritu99@gmail.com', 
    pass: 'djmq dhua rcgb dobn', 
  },
});

/**
 * Sends an activation email with an activation link.
 *
 * @param {string} to - Recipient's email address.
 * @param {string} token - Activation token to include in the activation link.
 * @returns {Promise} - A promise that resolves when the email is sent.
 */

export const sendActivationEmail = (to, token) => {
  const mailOptions = {
    from: 'pandyaritu99@gmail.com', 
    to, // Recipient's email address
    subject: 'Activate Your Account', 
    html: `
      <p>Thank you for registering with us!</p>
      <p>Please click the link below to activate your account:</p>
      <a href="http://localhost:3000/activate/${token}">Activate Your Account</a>
    `, 
  };

  return transporter.sendMail(mailOptions)
    .then(() => console.log('Activation email sent'))
    .catch(error => {
      console.error('Error sending activation email:', error);
      throw error;
    });
};
