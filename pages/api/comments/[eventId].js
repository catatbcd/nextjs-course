import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
} from "../../../helpers/db-util";

async function handler(req, res) {
  const eventId = req.query.eventId;
  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "conexion a la base de datos fallida." });
    return;
  }

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
      client.close();
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };
    let result;
    try {
      result = await insertDocument(client, "comments", newComment);
      newComment._id = result.insertedId;
      res
        .status(201)
        .json({ message: "Comentario agregado.", comment: newComment });
    } catch (error) {
      res.status(500).json({ message: "Inserción de datos fallida." });
    }

    console.log(result);
  }

  if (req.method === "GET") {
    try {
    const documents = await getAllDocuments(client, "comments", { _id: -1 });
      res.status(200).json({ comments: documents });
    } catch {
      res.status(500).json({ message: " Error al obtener comentarios." });
    }
  }
  client.close();
}

export default handler;
