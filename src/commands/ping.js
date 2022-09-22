const { SlashCommandBuilder } = require('@discordjs/builders')
const { ping } = require('../config/config.json')

module.exports = {
	data: new SlashCommandBuilder()
		.setName(ping.name)
		.setDescription(ping.description),
	async execute(interaction) {
        console.log(`Pong! ${interaction.client.ws.ping}ms.`)
		interaction.reply(ping.reply)
	}
}