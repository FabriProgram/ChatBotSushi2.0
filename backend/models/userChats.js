import mongoose from "mongoose";

// Esquema de userChats para la base de datos
const userChatsSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    chats: [
        {
            _id: {
                type: String,
                required: true,
            },
            title: {
                type: String,
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now(),
            },
        },
    ],
},
{ timestamps: true }
);

export default mongoose.models.userchats || mongoose.model("userchats", userChatsSchema);