import dotenv from "dotenv";
dotenv.config();
import { Telegraf } from 'telegraf';

const bot = new Telegraf(process.env.BOT_TOKEN);

// Start command to show the inline button
bot.start(async (ctx) => {
    dotenv.config();
    console.log(`https://playtapme.netlify.app/${ctx.from.id}/${ctx.from.first_name}`);
    const webAppButton = {
        text: 'TapMe',
        web_app: {
            url: `https://playtapme.netlify.app/${ctx.from.id}/${ctx.from.first_name}`
        }
        };
    
        // Define the reply markup
        const replyMarkup = {
        inline_keyboard: [
            [webAppButton]
        ]
        };
        
        // Send the message with the web app button
        ctx.reply('Click the button below to open the web app:', {
        reply_markup: replyMarkup
        });
});


// Launch the bot
export default bot;
// console.log('Bot is running...');
