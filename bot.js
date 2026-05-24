const TelegramBot = require('node-telegram-bot-api');
const express = require('express'); 

// 🌐 1. Cloud Server Dummy Web Setup (Iske bina Render bot ko band kar dega)
const app = express();
app.get('/', (req, res) => res.send('🟢 VIP Prediction Bot is Live & Running on Cloud!'));
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🚀 Web Server is running on port ${port}`));

// 🔐 2. Bot Configuration
const token = '8436452827:AAHMcI_a54cGGoGj6XIWNsQDHXsi7E8MKXg'; 
const CHANNEL_LINK = 'https://t.me/rj7383hjf';

// 🚀 3. Bot Initialization
const bot = new TelegramBot(token, {polling: true});
console.log("=========================================");
console.log("🟢 VIP 10X PREDICTION BOT IS ONLINE!");
console.log("=========================================");

// 🛠 Helper Function (Suspense / Delay ke liye)
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const bottomMenu = {
    reply_markup: {
        keyboard: [
            ["📊 How to use?", "📢 Join Channel"]
        ],
        resize_keyboard: true,
        persistent: true
    }
};

// 1️⃣ START COMMAND & MENU
bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const userName = msg.from.first_name || "VIP User";

    const welcomeMsg = `👑 **Welcome ${userName} to the VIP Algorithm System!**\n\n` +
                       `Prediction nikalne ke liye apne **Pride Number ke aakhiri 4 digits** yahan type karein.\n\n` +
                       `📌 *Example: 4587*`;
    
    const inlineButton = {
        reply_markup: {
            inline_keyboard: [
                [{ text: "🔥 Join Premium Channel First", url: CHANNEL_LINK }]
            ]
        },
        parse_mode: "Markdown"
    };

    await bot.sendMessage(chatId, welcomeMsg, inlineButton);
    await bot.sendMessage(chatId, "👇 Niche diye gaye menu ka bhi use kar sakte hain:", bottomMenu);
});

// 2️⃣ BOTTOM MENU CLICKS 
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === "📊 How to use?") {
        bot.sendMessage(chatId, "💡 **Guide:** Bas apne game ke Period/Pride number ke last 4 digit type karke send karo. Humara algorithm aapko next Size aur Colour bata dega.", { parse_mode: "Markdown" });
    } else if (text === "📢 Join Channel") {
        bot.sendMessage(chatId, `Link pe click karein: ${CHANNEL_LINK}`);
    }
});

// 3️⃣ 10X ALGORITHM ENGINE
bot.onText(/^(\d{4})$/, async (msg, match) => {
    const chatId = msg.chat.id;
    const prideNo = match[1]; 

    try {
        await bot.sendChatAction(chatId, 'typing');
        const processingMsg = await bot.sendMessage(chatId, "⚙️ *Algorithm is analyzing patterns...*", { parse_mode: "Markdown" });

        // Core Logic
        const digit1 = parseInt(prideNo[2]); 
        const digit2 = parseInt(prideNo[3]); 
        let sum = digit1 + digit2; 
        if (sum >= 10) {
            sum = Math.floor(sum / 10) + (sum % 10);
        }

        const sizeResult = (sum >= 5) ? "BIG" : "SMALL";
        const colourResult = (sum % 2 === 0) ? "RED 🔴" : "GREEN 🟢";

        await sleep(1800); // 1.8 second delay
        await bot.deleteMessage(chatId, processingMsg.message_id);

        const finalPrediction = `💎 **VIP PREDICTION SUCCESS** 💎\n` +
                                `━━━━━━━━━━━━━━━━━━\n` +
                                `🆔 **Pride No:** \`${prideNo}\`\n` +
                                `🔢 **Magic Digit:** ${sum}\n` +
                                `📊 **Target Size:** **${sizeResult}**\n` +
                                `🎨 **Target Colour:** **${colourResult}**\n` +
                                `━━━━━━━━━━━━━━━━━━\n` +
                                `⚠️ *Maintain 3-Level Funds for safety.*`;
        
        await bot.sendMessage(chatId, finalPrediction, { parse_mode: "Markdown" });

    } catch (error) {
        console.error("Error:", error);
        bot.sendMessage(chatId, "❌ System load high hai, please try again.");
    }
});
