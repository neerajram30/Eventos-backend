module.exports = (req,res,next)=>{
    if(req.session.loggedIn){
        next()
    }
    else{
        res.json({ message: "Not logged in" });
    }
}

