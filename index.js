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

 // Establecer el estado personalizado
 client.user.setPresence({
  status: 'online', // También puede ser 'idle', 'dnd' (No molestar), 'invisible'
  activities: [
    {
      name: 'Telsi y Mins', // El texto que aparece (por ejemplo, "Jugando a...")
      type: ActivityType.Watching, // El tipo de actividad (Playing, Listening, Watching, etc.)
    },
  ],
});


client.login(token);
client.once('ready', () => {
    console.log(`✅ Bot conectado como ${client.user.tag}`);
  });