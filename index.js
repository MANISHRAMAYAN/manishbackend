require("dotenv").config();

const server=require("./APP")

const hostname = process.env.HOST;
const port = process.env.PORT;

// # MONGODB_URL=mongodb://127.0.0.1:27017/manishkumar

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
