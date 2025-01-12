import mongoose from "mongoose";

// Esquema de chat para la base de datos 
const chatSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    history:[
        {
            role: {
                type: String,
                enum: ["user", "bot"],
                required: true,
            },
            parts: [
                {
                    text: {
                        type: String,
                        required: true,
                    },
                },
            ],
        },
    ],
},
{ timestamps: true },
);

export default mongoose.models.chat || mongoose.model("chat", chatSchema);