require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  try {
    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Message de ${name}`,
      text: `Téléphone : ${phone}\n\nMessage : ${message}`
    });

    console.log("Message reçu :", req.body);
    res.status(200).send({ message: 'Message envoyé !' });
  } catch (error) {
    console.error("Erreur lors de l'envoi :", error);
    res.status(500).send({ message: 'Erreur serveur' });
  }
});

app.listen(3000, () => {
  console.log('Serveur en ligne sur le port 3000');
  

});

