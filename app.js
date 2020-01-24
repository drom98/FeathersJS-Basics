const feathers = require('@feathersjs/feathers');
const app = feathers();

// A messages service that allows to create new
// and return all existing messages
class MessageService {
  constructor() {
    this.messages = [];
  }

  async find() {
    //Return all messages
    return this.messages;
  }

  async create(data) {
    //The new message is the data merged with a unique identifier
    //using the messages length since it changes whenever we add one
    const message = {
      id: this.messages.length,
      text: data.text
    }

    //Add new messages to the list
    this.messages.push(message);

    return message;
  }
}

//Register the message service on the Feathers app
app.use('messages', new MessageService());

//Log everytime a new message has been created
app.service('messages').on('created', message => {
  console.log('A new message has been created', message);
});


