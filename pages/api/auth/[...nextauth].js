import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

export default NextAuth({
  session: {
    //jwt: true,
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectToDatabase();

        const usersCollection = client.db().collection("users");

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          client.close();
          throw new Error("¡Usuario no encontrado!");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("¡No se pudo iniciar sesión!");
          ƒ;
        }
        client.close();
        return { email: user.email };
      },
    }),
  ],
});
