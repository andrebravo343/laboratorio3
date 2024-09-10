const { config } = require('dotenv');
const nodemailer = require('nodemailer');


require('dotenv'),config();
// Configurar o serviço de email
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, 
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

// Função para enviar confirmação
const sendEmailConfirmation = (to, subject) => {
  const mailOptions = {
      from: `"Laboratório Softhard" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text: `Olá! ${subject}. Entraremos em contato em breve.`
  };

  return transporter.sendMail(mailOptions);
};


module.exports = { sendEmailConfirmation };
