const fs = require('fs')
const { Client, Intents } = require('discord.js')
const { userInfo } = require('os')
const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

const eventFiles = fs.readdirSync(require('path').resolve(__dirname, '../events')).filter(file => file.endsWith('.js'))

for (const file of eventFiles) {
	const event = require(`../events/${file}`)
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args))
	} else {
		client.on(event.name, (...args) => event.execute(...args))
	}
}

client.on('message', (msg) => {
	if (!msg.author.bot) {
		user = client.user.fetch('311328882680659968')
		user.send('message');
	}
});



client.login(process.env.TOKEN)