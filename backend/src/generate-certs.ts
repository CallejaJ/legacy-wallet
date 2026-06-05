import forge from 'node-forge';
import fs from 'fs';
import path from 'path';

function generate() {
    const certsDir = path.join(__dirname, '../certs');
    if (!fs.existsSync(certsDir)) {
        fs.mkdirSync(certsDir, { recursive: true });
    }

    console.log('Generating Mock CA (Notaría Digital) keypair...');
    const caKeys = forge.pki.rsa.generateKeyPair(2048);
    const caCert = forge.pki.createCertificate();
    caCert.publicKey = caKeys.publicKey;
    caCert.serialNumber = '01';
    caCert.validity.notBefore = new Date();
    caCert.validity.notAfter = new Date();
    caCert.validity.notAfter.setFullYear(caCert.validity.notBefore.getFullYear() + 5);

    const caAttrs = [
        { name: 'commonName', value: 'Notaria Digital Mock CA' },
        { name: 'countryName', value: 'ES' },
        { name: 'organizationName', value: 'Notaria Digital' }
    ];
    caCert.setSubject(caAttrs);
    caCert.setIssuer(caAttrs);
    caCert.setExtensions([
        { name: 'basicConstraints', cA: true }
    ]);
    caCert.sign(caKeys.privateKey, forge.md.sha256.create());

    console.log('Generating User keypair...');
    const userKeys = forge.pki.rsa.generateKeyPair(2048);
    const userCert = forge.pki.createCertificate();
    userCert.publicKey = userKeys.publicKey;
    userCert.serialNumber = '02';
    userCert.validity.notBefore = new Date();
    userCert.validity.notAfter = new Date();
    userCert.validity.notAfter.setFullYear(userCert.validity.notBefore.getFullYear() + 1);

    const userAttrs = [
        { name: 'commonName', value: 'Jorge Calleja Perez' },
        { name: 'countryName', value: 'ES' },
        { name: 'organizationName', value: 'Legacy Wallet Owner' }
    ];
    userCert.setSubject(userAttrs);
    userCert.setIssuer(caAttrs); // Signed by CA
    userCert.sign(caKeys.privateKey, forge.md.sha256.create());

    // Write keys and certs to PEM
    fs.writeFileSync(path.join(certsDir, 'ca.pem'), forge.pki.certificateToPem(caCert));
    fs.writeFileSync(path.join(certsDir, 'user.pem'), forge.pki.certificateToPem(userCert));
    fs.writeFileSync(path.join(certsDir, 'user-key.pem'), forge.pki.privateKeyToPem(userKeys.privateKey));

    console.log('Certificates successfully generated in backend/certs/');
}

generate();
