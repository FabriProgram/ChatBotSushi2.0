import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Chat from "./models/chat.js";
import UserChats from "./models/userChats.js";
import path from "path";
import url, { fileURLToPath } from "url";
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node'


const port = process.env.PORT || 3000;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Conexion a la base de datos
const connect = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDB");
    }catch(error){
        console.log(error);
    }
};
// Fin de conexion a base de datos

// Middlewares
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

app.use(express.json());

    // Rutas de metodos y endpoints
    // metodo post para datos obtenidos del user    
app.post("/api/chats", async (req, res) => {
    const userId = req.auth.userId;
    const {text} = req.body;
    try{
        // Crear un nuevo chat
        const newChat = new Chat({
            userId: userId,
            history: [
                {
                    role: "user",
                    parts: [{text}]
                }
            ]
        });
        // Fin Crear un nuevo chat

        // Guardar el chat y chequear si el user no existe para agregarlo a DB
        const savedChat = await newChat.save();    
        const userChats = await UserChats.findOne({ userId: userId });
        if (!userChats.length) {
            const newUserChats = new UserChats({
                userId: userId,
                chats: [
                    {_id: savedChat._id,
                    title: text.substring(0, 20),
                    },
                ],
            });
            await newUserChats.save();
        // Fin Guardar el chat y chequear si el user no existe para agregarlo a DB
        } else {
            // Si el user existe se agrega a DB el chat existente
            await UserChats.updateOne(
                { userId: userId },
                {
                    $push: {
                        chats: {
                            _id: savedChat._id,
                            title: text.substring(0, 20),
                        },
                    },
                }
            );
            res.status(201).send(newChat._id);
        };// Fin Si el user existe se agrega a DB el chat existente
    
            //Manejo de error al crear un chat
    }catch(error){
        console.log(error)
        res.status(500).send("Error al crear el chat");
    }       //Fin Manejo de error al crear un chat
});
    // Fin metodo post para datos obtenidos del user
    
    // Obtener datos de user
app.get("/api/chats", ClerkExpressRequireAuth(), async (req, res) => {
    const userId = req.auth.userId;
    try{
        const userChats = await userChats.find({userId});

        res.status(200).send(userChats[0].chats);
    }catch(error){
        //Manejo de error al no obtener el id del user
        console.log(error);
        res.status(500).send("Error, no se encuentra el usario");
        //Fin Manejo de error al no obtener el id del user
    }
});
//fin de obtener datos de user

// Obtener el chat del user
app.get("/api/chats/:id", ClerkExpressRequireAuth(), async (req, res) => {
    const userId = req.auth.userId;
    try{
        const chat = await Chat.findOne({ _id: req.params.id, userId });

        res.status(200).send(chat);
    }catch(error){
        //Manejo de error al obtener los chats
        console.log(error);
        res.status(500).send("Error al obtener los chats");
        //Fin Manejo de error al obtener los chats
    }
});//fin de obtener el chat del user

// Actualizar el chat con POST
app.put("/api/chats/:id", ClerkExpressRequireAuth(), async (req, res) => {
    const userId = req.auth.userId;
    const { question, answer } = req.body;
    const newItem = [
        ...(question
        ? [{ role: "user", parts: [{ text: question }]}]
        : []), 
        { role: "model", parts: [{ text: answer }] },
    ];
    try {
        const updateChat = await Chat.findOne(
            { _id: req.params.id, userId },
            {
                $push: {
                    history: {
                        $each: newItem,
                    },
                },
            }
        );
        res.status(200).send(updateChat);
    } catch (error) {//Manejo de error al actualizar el chat
        console.log(error);
        res.status(500).send("Error al actualizar el chat");
    }   //Fin Manejo de error al actualizar el chat
});
// Fin de Actualizar el chat con POST

    //Manejo de Error en la autenticacion
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(401).send('No se puede comprobar tus credenciales!')
  });
    // Fin Manejo de Error en la autenticacion

    // Ruteo de la aplicacion
app.use(express.static(path.join(__dirname, "../client")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "index.html"))
}); //Fin Ruteo de la aplicacion
//Fin de rutas y endpoints

// Prueba de servidor
app.listen(port, () => {
    connect();
    console.log(`Listening on port ${port}`);
});
// Fin pruea de servidor