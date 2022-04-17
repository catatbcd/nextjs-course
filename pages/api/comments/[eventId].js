function handler(req, res) {
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
      id: new Date().toISOString(),
      email,
      name,
      text,
    };
    console.log(newComment);
    res.status(201).json({ message: "Comentario agregado.", comment: newComment });
  }

  if (req.method === "GET") {
    const dummyList = [
      { id: "c1", name: "Max", text: "Primer comentario" },
      { id: "c2", name: "Manuel", text: "Segundo comentario!" },
    ];
    res.status(200).json({ comments: dummyList });
  }
}

export default handler;
