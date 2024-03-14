const {User} = require('./model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerPost = async (req,res)=>{

    const {name,email,password} = req.body;
    
    let user = await User.findOne({email});
    if(user){
        return res.redirect("/login")
    }
    
    const hpassword = await bcrypt.hash(password,10)

    user = await User.create({name,email,password: hpassword})
    const token = jwt.sign({ _id: user._id}, "ldfknhv");

    res.cookie("token",token,{
        httpOnly:true,expires:new Date(Date.now()+60000)
    })
    res.redirect("/") 
}

const registerGet = (req,res)=>{
    res.render("register.ejs");
}  
 
const loginPost =  async (req,res)=>{
    const {email,password} = req.body;
    let user = await User.findOne({email});

    if(!user) return res.redirect("/register");

    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch) return res.render("login.ejs",{email, message:"Incorrect password"});

    const token = jwt.sign({_id:user._id},"ldfknhv")
    res.cookie("token",token,{httpOnly:true,expires: new Date(Date.now()+60000)});
    res.redirect("/");
}

const loginGet = (req,res) => {
    res.render("login.ejs")
}

const logoutGet =  (req,res)=>{
    res.cookie("token",null,{expires:new Date(Date.now() )});
    res.redirect("/");
}

const home = (req,res) => {
    res.render("logout.ejs",{name: req.user.name})
}

const isAuthenticated = async (req,res,next) => {
    const {token} = req.cookies;
    if(token) {
        const decoded = jwt.verify(token,"ldfknhv")
        
        req.user = await User.findById(decoded._id);
        next();
    }
    else res.redirect("/login");
}

module.exports = {
    registerPost, registerGet, loginPost, loginGet, logoutGet, home, isAuthenticated
};