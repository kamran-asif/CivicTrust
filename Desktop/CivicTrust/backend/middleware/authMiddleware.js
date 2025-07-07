import jwt from 'jsonwebtoken';

export const protect = (roles = []) => {
  return (req, res, next) => {
    try {
      // Extract token from Authorization header
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) return res.status(401).json({ message: 'Not authorized' });

      // Verify and decode the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user info to request
      req.user = {
        id: decoded.id,
        name: decoded.name || decoded.user?.name, // Ensure name is included
        phone: decoded.phone || decoded.user?.phone, // Ensure phone is included
        role: decoded.role
      };

      // Check if user role is allowed
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Forbidden: You do not have access' });
      }

      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  };
};
