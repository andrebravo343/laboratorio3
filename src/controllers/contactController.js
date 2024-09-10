const express = require('express');
const router = express.Router();
const { db } = require('../services/firebaseService');
const { sendEmailConfirmation } = require('../services/emailService');

// Rota para envio de desafios
router.post('/', async (req, res) => {
    const { nome, contacto, assunto , descricao } = req.body;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(contacto)) { 
        try {
            const contactRef = db.collection('contacts').doc();
            await contactRef.set({
                nome,
                contacto,
                assunto,
                descricao,
                createdAt: new Date()
            });
    
            // Enviar email de confirmação ao usuário
            await sendEmailConfirmation(contacto, 'Olá '+ nome + ', recebemos sua questão e teremos gosto em responder! Um membro da equipa entrará em contacto consigo.');
    
            res.status(200).json({ message: 'Pergunta enviada com sucesso' });
        } catch (err) {
            res.status(500).json({ error: 'Erro ao enviar o desafio' });
        }

      } else {
        try {
            const contactRef = db.collection('contacts').doc();
            await contactRef.set({
                nome,
                contacto,
                assunto,
                descricao,
                createdAt: new Date()
            });
            res.status(200).json({ message: 'Pergunta enviado com sucesso' });
        } catch (err) {
            res.status(500).json({ error: 'Erro ao enviar o desafio' });
        }
      }

});

module.exports = router;

