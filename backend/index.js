const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const { Server } = require("socket.io");
var http = require('http');

const app = express();
const userRoute = require("./routes/user.js");
const authRoute = require("./routes/auth.js");
const productRoute = require("./routes/product.js");
// const cartRoute = require("./routes/cart.js");
// const orderRoute = require("./routes/order.js");
dotenv.config();
app.use(express.json());
app.use(cors());
/* MONGOOSE SETUP */
const PORT = 5001 || 9000;
mongoose
  .connect(
    "mongodb+srv://Priyanka:srcn1224@cluster0.evn3twy.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));

app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/products", productRoute);
// app.use("/api/cart", cartRoute);
// app.use("/api/order", orderRoute);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(` User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with Id: ${socket.id} has joined the room ${data}`)
  });

  socket.on("send_message", (data)=>{
    socket.to(data.room).emit("receive_message", data);
  })

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(3003, () => {
  console.log("SERVER CHALU HAI BHAI");
});
