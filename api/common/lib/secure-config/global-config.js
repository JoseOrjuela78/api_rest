const Secureconf = require('./secure-conf');
const secureConf = new Secureconf();
secureConf.encrypted = process.env.CONFIGPATHBOSIS;
const content = secureConf.decryptedFunc();

if (content == undefined) {
    console.log("Error al desencriptar archivo configuracion");
    return
} else {
    global.environment = content.production;
    global.poolConfiguration = JSON.parse(process.env.POOLCONFIG);
    return
};