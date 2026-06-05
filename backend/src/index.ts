import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { validateCertificate } from './pki-validator';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Basic status check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'Legacy Wallet Oracle' });
});

// Cert validation endpoint
app.post('/oracle/validate', (req, res) => {
    const { certificatePem } = req.body;

    if (!certificatePem) {
        res.status(400).json({ isValid: false, error: 'Missing certificatePem parameter' });
        return;
    }

    const result = validateCertificate(certificatePem);
    if (!result.isValid) {
        res.status(400).json(result);
        return;
    }

    res.json(result);
});

app.listen(PORT, () => {
    console.log(`🚀 Legacy Wallet Oracle running at http://localhost:${PORT}`);
});
