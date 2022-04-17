import { MongoClient } from "mongodb";

async function handler(req, res) {
  const client = await MongoClient.connect(
    "mongodb+srv://catat:vbq0U3LBYHi3iAr5@cluster0.nhdmh.mongodb.net/events?retryWrites=true&w=majority"
  );
  const eventId = req.query.eventId;

  if (req.method === "POST") {
    //agregar validaciones del lado del servidor
    const { email, name, text } = req.body;

    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Entrada invalida." });
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };
    const db = client.db();
    const result = await db.collection("comments").insertOne({ newComment });

    console.log(result);

    newComment.id = result.insertedId;
    res
      .status(201)
      .json({ message: "Comentario agregado.", comment: newComment });
  }

  if (req.method === "GET") {
    const dummyList = [
      { id: "c1", name: "Max", text: "Primer comentario" },
      { id: "c2", name: "Manuel", text: "Segundo comentario!" },
    ];
    res.status(200).json({ comments: dummyList });
  }
  client.close();
}

export default handler;
