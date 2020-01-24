const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');

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

const app = express(feathers());

//Register the message service on the Feathers app
app.use('messages', new MessageService());

//Log everytime a new message has been created
app.service('messages').on('created', message => {
  console.log('A new message has been created', message);
});

//A function that creates new messages and then logs all existing messages
const main = async() => {
  //Create a new message on our message service
  await app.service('messages').create({
    text: 'Hello Feathers'
  });

  await app.service('messages').create({
    text: 'Hello again!'
  });

  //Find all existing messages
  const messages = await app.service('messages').find();

  console.log('All messages', messages);
};

main();
