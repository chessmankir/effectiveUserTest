"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminOnly = adminOnly;
function adminOnly(req, res, next) {
    console.log(req.user);
    if (req.user?.role !== 'admin') {
        return res.status(403).json({
            ok: false,
            message: 'Доступно только админам',
        });
    }
    next();
}
