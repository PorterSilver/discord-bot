const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!')
  }
})

client.login('NjAzMzA4ODE0MjE2ODU1NTky.XWWMcA.lX5nOcrJxl9KThKf2NDu6K0Ng8U')