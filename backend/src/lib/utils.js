import jwt from "jsonwebtoken"

export const generateToken = (userId,res) => {
    //create a token
    const token = jwt.sign({ userId }, process.env.JWR_SECRET, {
        expiresIn: "7d",
    });

    res.cookie("jwt", token, {
        maxAge: 7*24*60*60*1000, //7 days
        httpOnly: true, //prevent xss attacks
        sameSites: "strict", 
        secure: process.env.NODE_ENV === "development" ? false : true,
    });

    return token;
};


//http://localhost - Local 
//https://dsmalml.com - Production