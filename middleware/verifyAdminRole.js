const verifyAdminRole = (req, res, next) => {
    if(req.user && req.user.role === 'admin'){
        next();
    }else {
        return res.status(403).json({
            message: "Access denied. Admins only",
            type: `User type: ${req.user.role}`
        });
    }
};

module.exports = verifyAdminRole;