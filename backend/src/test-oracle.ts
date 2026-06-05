import fs from 'fs';
import path from 'path';

async function testOracle() {
    const userCertPath = path.join(__dirname, '../certs/user.pem');
    if (!fs.existsSync(userCertPath)) {
        console.error('❌ Please run "npm run certs" first to generate test certificates.');
        return;
    }

    const certificatePem = fs.readFileSync(userCertPath, 'utf8');

    // 1. Test basic certificate validation
    console.log('--- Test 1: POST /oracle/validate ---');
    console.log('Sending certificate to Oracle for validation...');
    try {
        const response = await fetch('http://localhost:3001/oracle/validate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ certificatePem })
        });

        const data = await response.json() as any;
        console.log('Response Status:', response.status);
        console.log('Response Body:', JSON.stringify(data, null, 2));

        if (response.ok && data.isValid) {
            console.log('✅ PKI Validation Successful! Subject:', data.subject);
        } else {
            console.log('❌ PKI Validation Failed:', data.error);
            return;
        }
    } catch (err: any) {
        console.error('❌ Request failed. Make sure the server is running on http://localhost:3001.', err.message);
        return;
    }

    console.log('\n----------------------------------------\n');

    // 2. Test configure inheritance endpoint
    console.log('--- Test 2: POST /oracle/configure ---');
    console.log('Sending configuration details to Oracle...');
    
    const heirs = [
        '0x0000000000000000000000000000000000000002',
        '0x0000000000000000000000000000000000000003'
    ];
    const weights = [6000, 4000]; // 60% and 40%
    const inactivityThreshold = 15552000; // 6 months in seconds
    const quorum = 2;

    const payload = {
        certificatePem,
        safeAddress: '0x0000000000000000000000000000000000000123', // Dummy Safe address
        moduleAddress: '0x0000000000000000000000000000000000000456', // Dummy Module address
        heirs,
        weights,
        inactivityThreshold,
        quorum
    };

    try {
        const response = await fetch('http://localhost:3001/oracle/configure', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json() as any;
        console.log('Response Status:', response.status);
        console.log('Response Body:', JSON.stringify(data, null, 2));

        if (response.ok && data.isValid) {
            console.log('✅ Configuration/Installation Flow Successful!');
            if (data.dryRun) {
                console.log('ℹ️ Completed in Dry-Run mode successfully.');
            }
        } else {
            console.log('❌ Configuration/Installation Flow Failed:', data.error);
        }
    } catch (err: any) {
        console.error('❌ Request failed.', err.message);
    }
}

testOracle();
