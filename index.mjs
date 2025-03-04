import bcrypt from 'bcryptjs';

const hashPass = async (pass) => {
    let salt = await bcrypt.genSaltSync();                              // with default salt rounds (10) or more, lambda's timeout increasing could be necessary.
    let hash = await bcrypt.hashSync(pass, salt);
    return hash
}

const checkPass = async (pass, hash) => {
    return await bcrypt.compareSync(pass, hash);
}

export const handler = async (event) => {
    
    let data = JSON.parse(Buffer.from(event.body, 'base64').toString('utf-8'))  // data object {"action":"hash" || "check", hash: "hashed password", pass:"stringToCheck"} 
    let pass = data.pass
    let hash = data.hash
    let action = data.action

   let response;

   if(action ==='hash') {response = {
    statusCode: 200,
    body: await hashPass(pass)}
   }

   if(action ==='check') {response = {
    statusCode: 200,
    body: await checkPass(pass, hash)}
   }
    if(action !== 'hash' && action !== 'check') {response = {
        statusCode: 200,
        body: 'Illegal request'}
    }

 return response
}
