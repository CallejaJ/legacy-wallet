import fs from 'fs';
import path from 'path';

async function testOracle() {
    const userCertPath = path.join(__dirname, '../certs/user.pem');
    if (!fs.existsSync(userCertPath)) {
        console.error('❌ Please run "npm run certs" first to generate test certificates.');
        return;
    }

    const certificatePem = fs.readFileSync(userCertPath, 'utf8');

    console.log('Sending certificate to Oracle for validation...');
    try {
        const response = await fetch('http://localhost:3001/oracle/validate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ certificatePem })
        });

        const data = await response.json() as any;
        console.log('\nResponse Status:', response.status);
        console.log('Response Body:', JSON.stringify(data, null, 2));

        if (response.ok && data.isValid) {
            console.log('\n✅ PKI Validation Successful! Subject:', data.subject);
        } else {
            console.log('\n❌ PKI Validation Failed:', data.error);
        }
    } catch (err: any) {
        console.error('❌ Request failed. Make sure the server is running on http://localhost:3001.', err.message);
    }
}

testOracle();
