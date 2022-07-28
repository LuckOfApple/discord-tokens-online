const fs = require("fs");
const { Client } = require("discord.js-selfbot-v13");

const config = require("./config.js")
const tokensData = fs.readFileSync("./tokens.txt", "UTF-8");
const tokens = tokensData.split(/\r?\n/);

tokens.forEach(async token => {
    const client = new Client({ checkUpdate: false });
    client.once("ready", async () => {
        console.log(`Logged in with ${client.user.tag} with token ${token}`);
        await i(client.user);
        setInterval(async () => {
            await i(client.user);
        }, 1000 * 60 * 5);
    })
    client.login(token);
});

async function i(user) {
    let status = config.status;
    if (status === "random" || !["dnd", "idle", "online", "random"].includes(status)) status = ["dnd", "idle", "online"][Math.floor(Math.random() * 3)];
    await user.setPresence({ status: status, activities: [{ name: require('./gameslist.json')[Math.floor(Math.random() * 1845)] }] });
}
process.on("uncaughtException", e => { console.log(e) });
process.on("unhandledRejection", e => { console.log(e) });