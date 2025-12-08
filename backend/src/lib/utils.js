import jwt from "jsonwebtoken"

export const generateToken = (userId,res) => {
    const { JWT_SECRET, NODE_ENV } = process.env;
        if (!JWT_SECRET) {
            throw new Error("JWT_SECRET is not configured")
        }

    //create a token
    const token = jwt.sign({ userId }, JWR_SECRET, {
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