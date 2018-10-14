module.exports = function(req, res, next){

    // status code:- 403 Forbidden 
    if(!req.user.isAdmin) return res.status(403).send('Access denied BITCH!!!');
    next();
}