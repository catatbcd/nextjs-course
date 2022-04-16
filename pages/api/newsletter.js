function handler(req, res){
    if(req.method === 'POST'){
        const userEmail = req.body.email;

        if(!userEmail || !userEmail.includes('@')){//validadcion de email basica
            res.status(422).json({message: 'Direccion de correo incorrecta.'});
            return;
        }
        console.log(userEmail);
        res.status(201).json({message: 'Registrado'})
    }
}

export default handler;