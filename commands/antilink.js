module.exports = {
    name:"antilink",
    async run (client, message, args, db) {
        if(!message.member.hasPermission("MANAGE_GUILD")) {
            return message.channel.send(`You do not have the permission to use this command.`);
        }

        var option = args.join(" ")
        if(!option) {
            return message.channel.send(`Please provide an option! (\`on - off\`)`)
        }
        if(
            option.toLowerCase() !== "on" &&
            option.toLowerCase() !== "off"
        ) {
            return message.channel.send(`ERROR: Invalid second argument!`)
        }
        if(option.toLowerCase() == "on") {
            let antiLink = await db.get(`antilink_${message.guild.id}`)
            if(antiLink === "enabled") {
                return message.channel.send(`Hey! antiLink is already enabled on this server! \nWanna disable it? Type \`!antilink off\` to do so.`)
            }
            
            db.set(`antilink_${message.guild.id}`, "enabled")
            message.channel.send(`Succesfully enabled antiLink!`)
        }else {
            if(option.toLowerCase() == "off") {
                let antiLink = await db.get(`antilink_${message.guild.id}`)
                if(antiLink === "disabled") {
                    return message.channel.send(`Hey! antiLink is already disabled on this server! \nWanna enable it? Type \`!antilink on\` to do so.`)
                }
                db.set(`antilink_${message.guild.id}`, "disabled")
                message.channel.send(`Succesfully disabled antiLink!`)
            }
        }
    }
}