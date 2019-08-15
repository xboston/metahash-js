# MetaHash JS API

## Usage

### Node.js (not published for now)
```javascript
const MetaHash = require('metahash-client');
```

### Browser
```html
<script src="dist/MetaHash.js"></script>
```

### Create new wallet
```javascript
const Wallet = MetaHash.Wallet;

const wallet = new Wallet();
console.log(wallet.publicKey);
console.log(wallet.privateKey);
console.log(wallet.address);
```

### Restore wallet from private key
```javascript
const Wallet = MetaHash.Wallet;

const wallet = Wallet.fromPrivateKey('08d6d3c75c2cfd52ca94fd7db4d4fc9c3b47dc8f948e71a96566a698501e9831');
console.log(wallet.publicKey);
console.log(wallet.privateKey);
console.log(wallet.address);
```

### Restore wallet from PEM
```javascript
const Wallet = MetaHash.Wallet;

const wallet = Wallet.fromPEM(`-----BEGIN EC PRIVATE KEY-----
MHcCAQEEIHPzHxC6MPg+7d4+5fovHhO9/pB5+J9YauouHq4rrhBBoAoGCCqGSM49
AwEHoUQDQgAEWPHBuckjyxxS41w1tkf4BRjnOOtp/gbLKvd9fC8KsozQuMq0IxrD
saph7C0MTti9lxT6yDUToXDF/ovT2XDbfA==
-----END EC PRIVATE KEY-----`);
console.log(wallet.publicKey);
console.log(wallet.privateKey);
console.log(wallet.address);
```

### Restore wallet from encrypted PEM
```javascript
const Wallet = MetaHash.Wallet;

const wallet = Wallet.fromEncryptedPEM(`-----BEGIN EC PRIVATE KEY-----
Proc-Type: 4,ENCRYPTED
DEK-Info: AES-128-CBC,5ABA37C774A68C6A679058396588A42F

SYFXv6FJMj/1/uv58t1zPgC4vDojHQS8jidQMVf16CpfgPisJjBz0hB8+PeZx9cZ
8gGoBQc70s7S9cLpWK+gLtwC6sPY6iqamuU4cj/FTsN0Q4CcJj9T3YZtOBd0eaya
soHkZCNPNGVcvme0B9uBsysUxc03qgOfuo/8ez5CbZM=
-----END EC PRIVATE KEY-----`, 'Test1');
console.log(wallet.publicKey);
console.log(wallet.privateKey);
console.log(wallet.address);
```

### Save wallet to PEM
```javascript
const Wallet = MetaHash.Wallet;

const wallet = new Wallet();
const encryptedPEM = wallet.toPEM();
console.log(encryptedPEM);
```

### Save wallet to encrypted PEM
```javascript
const Wallet = MetaHash.Wallet;

const wallet = new Wallet();
const encryptedPEM = wallet.toEncryptedPEM('Test1');
console.log(encryptedPEM);
```

## Promise API

### Create and send transaction
```javascript
const Wallet = MetaHash.Wallet;
const API = MetaHash.API;

const wallet = Wallet.fromPrivateKey('08d6d3c75c2cfd52ca94fd7db4d4fc9c3b47dc8f948e71a96566a698501e9831');
const api = new API();

api.getNonce({address: wallet.address}).then((nonce) => {
    const to = '0x009806da73b1589f38630649bdee48467946d118059efd6aab';
    const value = 0;
    const fee = 0;
    const data = '';
    
    const tx = wallet.createTx({to, value, fee, nonce, data});
    
    api.sendTx(tx).then((result) => {
        console.log(result);
    });
});
```

### Other API methods
```javascript
const Wallet = MetaHash.Wallet;
const API = MetaHash.API;

// Static method
API.getNodes('main').then((nodes) => {
    console.log(nodes);
});

const wallet = Wallet.fromPrivateKey('08d6d3c75c2cfd52ca94fd7db4d4fc9c3b47dc8f948e71a96566a698501e9831');
const api = new API();

api.fetchBalance({address: wallet.address}).then((result) => {
    console.log(result);
});

api.fetchHistory({address: wallet.address}).then((result) => {
    console.log(result);
});

api.getTx({hash: '7f75fdfba4bc2fe674b37d4730533edf9cb047f1f93b4f6687f4cab819eb88b6'}).then((result) => {
    console.log(result);
});
```

## Async/Await API

### Create and send transaction
```javascript
const Wallet = MetaHash.Wallet;
const API = MetaHash.API;

const wallet = Wallet.fromPrivateKey('08d6d3c75c2cfd52ca94fd7db4d4fc9c3b47dc8f948e71a96566a698501e9831');
const api = new API();

const nonce = await api.getNonce({address: wallet.address});
const to = '0x009806da73b1589f38630649bdee48467946d118059efd6aab';
const value = 0;
const fee = 0;
const data = '';
    
const tx = wallet.createTx({to, value, fee, nonce, data});
    
const result = await api.sendTx(tx);
console.log(result);
```

### Other API methods
```javascript
const Wallet = MetaHash.Wallet;
const API = MetaHash.API;

// Static method
const nodes = await API.getNodes('main');
console.log(nodes);

const wallet = Wallet.fromPrivateKey('08d6d3c75c2cfd52ca94fd7db4d4fc9c3b47dc8f948e71a96566a698501e9831');
const api = new API();

const balanceResult = await api.fetchBalance({address: wallet.address});
console.log(balanceResult);

const historyResult = await api.fetchHistory({address: wallet.address});
console.log(historyResult);

const txResult = await api.getTx({hash: '7f75fdfba4bc2fe674b37d4730533edf9cb047f1f93b4f6687f4cab819eb88b6'});
console.log(txResult);
```
