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
  console.log('El bot está listo y en línea!');
  
  // Verificar si client.user está disponible
  if (client.user) {
    // Establecer el estado solo si client.user está disponible
    client.user.setPresence({
      status: 'online', // Puede ser 'idle', 'dnd' (No molestar), 'invisible'
      activities: [
        {
          name: 'Tu comando favorito', // El texto que aparece (por ejemplo, "Jugando a...")
          type: ActivityType.Playing, // El tipo de actividad (Playing, Listening, Watching, etc.)
        },
      ],
    }).catch(console.error); // Captura cualquier error y lo imprime en consola
  } else {
    console.log('El bot no está conectado correctamente.');
  }
});