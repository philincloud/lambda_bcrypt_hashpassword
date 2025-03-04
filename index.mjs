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

    let result;

    if(action == 'hash') result = await hashPass(pass)
    if(action == 'check') result = await comparePass(pass, hash)



let response = {
    statusCode: 200,
    Headers: {
        'Content-Type': 'application/json'
    },
    body:result
}

return response
}

