const userService = require('../../src/services/userService');

function authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Token inválido' });
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ error: 'Token inválido' });
    const token = parts[1];
    const userData = userService.verifyToken(token);
    if (!userData) return res.status(401).json({ error: 'Token inválido' });
    // attach user info to request for downstream handlers
    req.user = userData;
    next();
}

module.exports = authenticateJWT;
