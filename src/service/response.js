export const SendSuccess = (res,messgae,data)=>{
  res.status(200).json({status: true , messgae,data})
}
export const SendError400 = (res,messgae,error)=>{
    res.status(400).json({status: false , messgae,data : {},error})
}
export const SendError401 = (res,messgae,error)=>{
    res.status(401).json({status: false , messgae,data : {},error})
}
export const SendError500 = (res,messgae,error)=>{
    res.status(500).json({status: false , messgae,data : {},error})
}
export const SendCreated = (res,messgae,data)=>{
    res.status(201).json({status: true,messgae,data})
}