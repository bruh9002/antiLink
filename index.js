const Discord = require("discord.js");
const client = new Discord.Client()
const prefix = "!"; // the bots prefix. This can be anything. Here I'm using "!";
const fs = require("fs");
client.commands = new Discord.Collection()
const db = require("quick.db");
const path = require("path");
const antilink = require("./commands/antilink");
const commandFiles = fs.readdirSync(path.join(__dirname, "commands")).filter(file => file.endsWith(".js"))
for(const file of commandFiles) {
    const command = require(path.join(__dirname, "commands", `${file}`))
    client.commands.set(command.name, command)
}
client.on("error", console.error)


client.on("message", async message => {
  
    if(message.channel.type === "dm" || message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    try {
        client.commands.get(command).run(client, message, args, db);
    }catch (error) {
        console.log(`An error occured: ${error}`)
        return message.channel.send(`An error occured: ${error}`)
        
    }
})

client.on("ready", async () => {
    console.log("I am ready")
    console.log("-----------------------------------")
    console.log(`${client.commands.map(cd => `${cd.name}.js ✅`).join("\n")}`)
    console.log("-----------------------------------")
    client.user.setActivity("!help", {type: "WATCHING"})
})

client.on("message", async message => {
    let antiLink = await db.get(`antilink_${message.guild.id}`)
    if(antilink === "disabled"|| antiLink === null) return;
    if(message.content.includes("https://") || message.content.includes("http://") || message.content.includes("discord.gg/")) {
        if(message.author.id === message.guild.ownerID || message.member.hasPermission("ADMINISTRATOR") || message.author.bot || message.channel.type === "dm") return;
        message.delete()

        message.channel.send(`Hey ${message.author}, You can't send links in this guild! Only the owner and bots and  admins can send links!`);
    }
})

client.login("YOUR TOKEN")