<template>
    <div>
      <div v-for="message in messages" :key="message.id">
        <p v-if="message.type === 'user'">{{ message.text }}</p>
        <p v-else-if="message.type === 'bot'">{{ message.text }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        messages: [
          { id: 1, text: 'Hello, how can I help you?', type: 'bot' },
          { id: 2, text: 'I have a question.', type: 'user' },
          { id: 3, text: 'Sure, go ahead.', type: 'bot' },
          { id: 4, text: 'What is your question?', type: 'bot' },
          { id: 5, text: 'How to implement AI chatbot?', type: 'user' },
          { id: 6, text: 'You can start by creating a Vue component like this.', type: 'bot' },
        ]
      };
    }
  };
  </script>