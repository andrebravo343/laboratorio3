const express = require('express');
const router = express.Router();
const { db } = require('../services/firebaseService');
const { sendEmailConfirmation } = require('../services/emailService');

// Rota para envio de desafios
router.post('/', async (req, res) => {
    const { nome, contacto, desafio } = req.body;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(contacto)) { 
        try {
            const challengeRef = db.collection('challenges').doc();
            await challengeRef.set({
                nome,
                contacto,
                desafio,
                createdAt: new Date()
            });
    
            // Enviar email de confirmação ao usuário
            await sendEmailConfirmation(contacto, 'Desafio recebido. Iremos informar a partir daqui o progresso do projeto!');
    
            res.status(200).json({ message: 'Desafio enviado com sucesso' });
        } catch (err) {
            res.status(500).json({ error: 'Erro ao enviar o desafio' });
        }

      } else {
        try {
            const challengeRef = db.collection('challenges').doc();
            await challengeRef.set({
                nome,
                contacto,
                desafio,
                createdAt: new Date()
            });
            res.status(200).json({ message: 'Desafio enviado com sucesso' });
        } catch (err) {
            res.status(500).json({ error: 'Erro ao enviar o desafio' });
        }
      }

});

module.exports = router;
