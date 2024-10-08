import dotenv from "dotenv";
dotenv.config();
// console.log(process.env);
import { server } from "./server.js";
import bot from "./configs/telegramBot.config.js";

// Start the server
server.listen(4000, () => {
    console.log('Server is running');
    bot.launch();
    // console.log(bot);
  });