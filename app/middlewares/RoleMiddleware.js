export const isAdmin = (req, res, next) => {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({
            status: "fail",
            message: "Access denied. Admin only."
        });
    }
    next();
};

export const isCustomer = (req, res, next) => {
    if (req.user?.role !== 'customer') {
        return res.status(403).json({
            status: "fail",
            message: "Access denied. Customer only."
        });
    }
    next();
};

