const express = require('express');
const router = express.Router();
const { db } = require('../services/firebaseService');
const { sendEmailConfirmation } = require('../services/emailService');

router.post('/', async (req, res) => {
    const {
        nome, email, telefone, areaAtuacao, disponibilidade, anosExperiencia, habilidadesTecnicas,
        github, pretensaoSalarial, disponibilidadeInicio
    } = req.body;

    try {

        const existingApplication = await db.collection('jobApplications')
            .where('email', '==', email)
            .get();

        if (!existingApplication.empty) {
            return res.status(400).json({ error: 'Você já enviou uma candidatura anteriormente.  Nota: Não pode enviar candidaturas com o mesmo email ou numero de telefone!' });
        }

        const jobRef = db.collection('jobApplications').doc();
        await jobRef.set({
            nome,
            email,
            telefone,
            areaAtuacao,
            disponibilidade,
            anosExperiencia,
            habilidadesTecnicas,
            github,
            pretensaoSalarial,
            disponibilidadeInicio,
            createdAt: new Date()
        });        

        await sendEmailConfirmation(email, 'Recebemos sua candidatura!');

        res.status(200).json({ message: 'Candidatura enviada com sucesso' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao enviar a candidatura' });
    }
});

module.exports = router;
