import { MongoClient } from "mongodb";
async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      //validadcion de email basica
      res.status(422).json({ message: "Direccion de correo incorrecta." });
      return;
    }
    const client = await MongoClient.connect(
      "mongodb+srv://catat:vbq0U3LBYHi3iAr5@cluster0.nhdmh.mongodb.net/newsletter?retryWrites=true&w=majority"
    );
    const db = client.db();
    await db.collection('emails').insertOne({email:userEmail});
    client.close();
    console.log(userEmail);
    res.status(201).json({ message: "Registrado" });
  }
}

export default handler;
