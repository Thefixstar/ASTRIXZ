// events/messageCreate.js
module.exports = {
    name: 'messageCreate',
    execute(message) {
      // Asegúrate de que el mensaje no sea del bot
      if (message.author.bot) return;
  
      // Responder al comando !hello
      if (message.content === '!hello') {
        message.channel.send('¡Hola! ¿Cómo estás?');
      }
    },
  };