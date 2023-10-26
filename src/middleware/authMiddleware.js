const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
  
    if (!authHeader) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }
  
    const [bearer, token] = authHeader.split(' ');
  
    if (bearer !== 'Bearer' || !token) {
      return res.status(401).json({ error: 'Token inválido' });
    }
  
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Token inválido' });
      }
  
      req.clienteId = decoded.id;
      next();
    });
};