import { connectDatabase, insertDocument } from "../../helpers/db-util";

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      //validadcion de email basica
      res.status(422).json({ message: "Direccion de correo incorrecta." });
      return;
    }
    let client;
    try{
        client = await connectDatabase();
    } catch (error) {
        res.status(500).json({message:'conexion a la base de datos fallida.'});
        return;
    }
    
    try {
         await insertDocument(client, 'newsletter' ,{email:userEmail});
         client.close();
    } catch(error){
        res.status(500).json({message:'Inserción de datos fallida.'});
        return;
    }
   
   
    console.log(userEmail);
    res.status(201).json({ message: "Registrado" });
  }
}

export default handler;
