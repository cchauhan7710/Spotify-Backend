import jwt  from "jsonwebtoken";


async function authArtist(req,res,next)
{
    const token  = req.cookies.token;
    
    if(!token) {res.status(401).json({ message:"token required !"})}

  
    

    try {
          const decoded = await jwt.verify(token,process.env.JWT_SECRET)
          if(decoded.role !== "admin"){res.status(403).json({message:"you are forbidden to create Music or album"})}

          req.user = decoded
          next()

        
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            message:"internal server error while getting authArtist"
        })
        
    }
}

async function authUser(req,res,next){

    const token = req.cookies.token;

    if(!token){res.status(401).json({message:"Unaithorized"})}

    try {
        const decoded = await jwt.verify(token,process.env.JWT_SECRET)

        if(decoded.role !== "user" && decoded.role !== "admin" ){

            res.status(403).json({
                message:"you are not allowed access make account first."

            })           
        }
         req.user = decoded;
            next();
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            message:"internal server error in middleware while authenticating to the user"
        })
        
    }
}

export  {authArtist,authUser};