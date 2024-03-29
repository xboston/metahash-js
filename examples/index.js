const MetaHash = require('./../src/'); // const MetaHash = require('metahash-js');

const Wallet = MetaHash.Wallet;
const API = MetaHash.API;

const wallet = new Wallet();
console.log('wallet', {
    address: wallet.address,
    publicKey: wallet.publicKey,
    privateKey: wallet.privateKey,
    pem: wallet.toPEM(),
    pemEncrypted: wallet.toEncryptedPEM('passw0rd!')
})

const api = new API('https://proxy.metahash.dev', 'https://tor.metahash.dev');

api.fetchBalance({ address: '0x00fa2a5279f8f0fd2f0f9d3280ad70403f01f9d62f52373833' }).then((result) => {
    console.log('fetchBalance', result);
});

api.fetchHistory({ address: '0x00fa2a5279f8f0fd2f0f9d3280ad70403f01f9d62f52373833', countTxs: 5 }).then((result) => {
    console.log('fetchHistory', result);
});

api.getTx({ hash: '7f75fdfba4bc2fe674b37d4730533edf9cb047f1f93b4f6687f4cab819eb88b6' }).then((result) => {
    console.log('getTx', result);
});

api.getNonce({
    address: wallet.address
}).then((nonce) => {
    const to = '0x00e327ebc4691ae115a7146384732308d8bc11280e3922aa44';
    const value = 0.000001; // '4294967297';
    const fee = '0';
    const data = '';

    const tx = wallet.createTx({
        to,
        value,
        fee,
        nonce,
        data
    });

    console.log('tx => ', tx);

    api.sendTx(tx).then((result) => {
        console.log('result => ', result)
    });
});