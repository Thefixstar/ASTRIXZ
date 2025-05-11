const { Client, Collection, GatewayIntentBits, ActivityType } = require('discord.js');
const fs = require('fs');
const prefix = process.env.PREFIX; 
const token = process.env.TOKEN;   

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.commands = new Collection();

// Cargar comandos
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

// Cargar eventos
const eventFiles = fs.readdirSync('./events/').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  client.on(event.name, (...args) => event.execute(...args, client));
}


client.once('ready', () => {
  console.log('El bot está conectado y listo!');
  
  // Establecer el estado del bot (por ejemplo, "Jugando a algo")
  if (client.user) {
    client.user.setPresence({
      status: 'dnd',  // Puede ser 'online', 'idle', 'dnd', 'invisible'
      activities: [
        {
          name: 'Telsi y Mins',  // Personaliza el texto de la actividad
          type: ActivityType.Playing,  // Tipo de actividad
        },
      ],
    }).catch(console.error);
  }
});

// Inicia sesión con el token del bot
client.login(process.env.BOT_TOKEN)  // Asegúrate de tener tu token en variables de entorno
  .then(() => console.log('Bot autenticado correctamente'))
  .catch(console.error);

// Mantener la aplicación viva en Railway usando un servidor HTTP

const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('¡Bot en línea y funcionando!'));
app.listen(process.env.PORT || 3000, () => {
  console.log('Servidor HTTP de Railway corriendo...');
});