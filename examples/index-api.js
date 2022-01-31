const MetaHash = require('./../src/'); // const MetaHash = require('metahash-js');

const Wallet = MetaHash.Wallet;
const API = MetaHash.API;


const wallet = Wallet.fromPrivateKey('30740201010420f1aef4fc2ab4f329897fadabe4dc900b6aff84fc61f87f54acce6c9ae8115812a00706052b8104000aa14403420004030c579cf0ca2c1ad88f493c9618c69b907e0a57de2cefa7bb95f47a282c6f42a5949b7ccf8d327610533e124739c0f471db7ef896c4b8d420f766706b92905c');
const api = new API('https://proxy.metahash.dev', 'https://tor.metahash.dev');

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

    console.log('tx', tx);

    api.sendTx(tx).then((result) => {
        console.log('result => ', result)
    });
});