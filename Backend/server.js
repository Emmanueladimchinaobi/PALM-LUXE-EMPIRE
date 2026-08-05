const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/db");

const orderRoutes = require("./routes/orderRoutes");
const messageRoutes = require("./routes/messageRoutes");

const Message = require("./models/Message");

dotenv.config();

connectDB();

const app = express();

// Create HTTP Server
const server = http.createServer(app);

// Socket.IO
const io = new Server(server, {

    cors: {

        origin: [

            "http://localhost:5500",
            "http://127.0.0.1:5500",
            "https://palm-luxe-empire.vercel.app"

        ],

        methods: ["GET", "POST"]

    }

});

// Middlewares
app.use(cors({

    origin: [

        "http://localhost:5500",
        "http://127.0.0.1:5500",
        "https://palm-luxe-empire.vercel.app"

    ],

    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],

    credentials: true

}));

app.use(express.json());

// Routes
app.use("/api/orders", orderRoutes);

app.use("/api/messages", messageRoutes);

// Home Route
app.get("/", (req, res) => {

    res.send("Palm Luxe Empire Backend Running...");

});

// Socket.IO
io.on("connection", async (socket) => {

    console.log("User Connected:", socket.id);

    try {

        // Send previous messages
        const history = await Message.find().sort({

            createdAt: 1

        });

        socket.emit("load_messages", history);

    } catch (err) {

        console.error(err);

    }

    // Receive Message
    socket.on("send_message", async (data) => {
console.log(data);
        try {

            const savedMessage = await Message.create({

    visitorId: data.visitorId,

    sender: data.sender,

    message: data.message,

    room: "general"

});

            io.emit("receive_message", savedMessage);

        } catch (err) {

            console.error(err);

        }

    });

    socket.on("disconnect", () => {

        console.log("User Disconnected:", socket.id);

    });

});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);

});