

export const devolverCitas = async ( req , res ) => {
    console.log(req.user)
    return res.json({
        message:'Llegaste al final',
    })
}