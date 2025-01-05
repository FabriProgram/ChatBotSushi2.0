import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Chat from "./models/chat.js";
import UserChats from "./models/userChats.js";

const port = process.env.PORT || 3000;
const app = express();
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
    origin: process.env.CLIENT_URL
}));

app.use(express.json());
// Middlewares fin

// Rutas de metodos
app.get("/test", (req, res) => {
    res.send("Hello World!");
});

app.post("/api/chats", async (req, res) => {
    const {userId, text} = req.body;
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
        // Crear un nuevo chat fin

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
        // Guardar el chat y chequear si el user no existe para agregarlo a DB fin
        } else {
            // Si el user existe se agrega el chat a DB
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
        };// Si el user existe se agrega el chat a DB fin
        
    }catch(error){
        console.log(error)
        res.status(500).send("Error al crear el chat");
    }
});
// Fin rutas de metodos

// Prueba de servidor
app.listen(port, () => {
    connect();
    console.log(`Listening on port ${port}`);
});
// Fin pruea de servidor