// TOKEN LIBRARY AND SECRETPASSWORD
const jwt = require('jsonwebtoken')
const secretPass = 'thisSecretPass'

function createToken(user_id, email)
{
    // Storage the information in an object
    const charge = {
        usuario_id: user_id,
        usuario: email
    }

    // Get jwt
    const token = jwt.sign(charge, secretPass, {expiresIn: '1h'})
    return token
}

function validateToken(req, res, next)
{
    // Get the token header for authorization
    const token = req.headers.authorization;

    // Validate and decode token
    try
    {
        const decode = jwt.verify(token.split(' ')[1], secretPass)
        req.user = decode
        next()
    }
    catch(error)
    {
        return res.status(401).send("Token de autenticacion invalido")
    }
}

function expiredToken(token)
{
    // Decode token to get useful load(playload)
    const decodedToken = jwt.decode(token);

    // Get the token expiration time (exp)
    const expirationTime = decodedToken.exp;

    // Get current time in seconds
    const currentTime = Math.floor(Date.now() / 1000);

    let expirationToken = ""

    // Validate if the expiration time is end
    if (currentTime > expirationTime) {
        expirationToken = ""
    } else {
        expirationToken = "active"
    }

    return expirationToken
}

module.exports = { createToken, validateToken, expiredToken}