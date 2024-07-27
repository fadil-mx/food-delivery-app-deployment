import jwt from "jsonwebtoken"


const authenticateToken = async(req, res, next) => {
    //to find token from header
    const {token}=req.headers 
    //to find token from cookie
    // const token = req.cookies.token;
  
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }
  try {
    const tokenVerify=jwt.verify(token,process.env.JWT_SECRET)
    req.body.userId=tokenVerify.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"error occured"})
  }


    // jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    //   if (err) {
    //     return res.status(403).json({ success: false, message: 'Invalid token' });
    //   }
    //   req.user = user;
    //   next();
    // });
  };

  export default authenticateToken;
  