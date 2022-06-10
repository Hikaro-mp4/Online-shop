const jwt=require('jsonwebtoken')

module.exports=function(req,res,next){
  
  if(req.method==='OPTIONS'){
   
    next()

  }
  try{
    const token=req.headers.authorization.split(' ')[1]
    console.log(token,token.length==4)
    if(token.length==4){
      
        console.log(req.headers.authorization)
        return res.status(401).json({message:'Not auth'})
    }
    const decoded=jwt.verify(token,process.env.SECRET_KEY)
    req.user=decoded
    next()
  }catch(e){
      res.status(403,json({message:'Not auth'}))
  }
}