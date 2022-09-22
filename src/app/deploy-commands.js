const fs = require('fs')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')

const commands = []
const commandFiles = fs.readdirSync(require('path').resolve(__dirname, '../commands')).filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
	const command = require(`../commands/${file}`)
	commands.push(command.data.toJSON())
}

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);
const chalk = require('chalk');

(async () => {
	try {
		console.log('Started refreshing application commands...')
		await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands })
		console.log(chalk.green('Successfully reloaded application commands.'))
	} catch (error) {
		console.error(chalk.red(error))
	}
})()