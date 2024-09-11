const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const contactRoutes = require('./src/controllers/contactController.js');
const jobRoutes = require('./src/controllers/jobController.js');
const challengeRoutes = require('./src/controllers/challengeController.js');

require('dotenv').config();

const app = express();

const corsOptions = {
  origin: [process.env.MyDominio || 'laboratorio.softhard.it.ao'],
  optionsSuccessStatus: 200
};

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors(corsOptions));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 


app.set('trust proxy', 1); 

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

app.use('/api/contact', contactRoutes);
app.use('/api/job', jobRoutes);
app.use('/api/challenge', challengeRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta http://localhost:${PORT}`));
