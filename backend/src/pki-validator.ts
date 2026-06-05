import forge from 'node-forge';
import fs from 'fs';
import path from 'path';

const CA_PATH = path.join(__dirname, '../certs/ca.pem');

export interface ValidationResult {
    isValid: boolean;
    error?: string;
    subject?: string;
    publicKeyPem?: string;
}

export function validateCertificate(certPem: string): ValidationResult {
    try {
        if (!fs.existsSync(CA_PATH)) {
            return { isValid: false, error: 'Trust store CA certificate not found' };
        }

        const caCertPem = fs.readFileSync(CA_PATH, 'utf8');
        const caCert = forge.pki.certificateFromPem(caCertPem);
        const userCert = forge.pki.certificateFromPem(certPem);

        // 1. Verify date validity
        const now = new Date();
        if (now < userCert.validity.notBefore || now > userCert.validity.notAfter) {
            return { isValid: false, error: 'Certificate is expired or not yet valid' };
        }

        // 2. Verify signature using CA's certificate
        const verified = caCert.verify(userCert);

        if (!verified) {
            return { isValid: false, error: 'Invalid certificate signature' };
        }

        // Extract Common Name from subject
        const cnAttr = userCert.subject.attributes.find(attr => attr.name === 'commonName');
        const subject = cnAttr ? String(cnAttr.value) : 'Unknown';
        const publicKeyPem = forge.pki.publicKeyToPem(userCert.publicKey);

        return {
            isValid: true,
            subject,
            publicKeyPem
        };
    } catch (err: any) {
        return { isValid: false, error: `Parsing error: ${err.message}` };
    }
}
