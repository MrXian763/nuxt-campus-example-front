<template>
  <div class="chat-container" style="max-width: 800px;">
    <div class="chat-messages" ref="chatMessages" style="max-height: 70vh; overflow-y: auto;">
      <div class="message" v-for="(message, index) in messages" :key="index" :class="{ 'user-message': message.isUser, 'ai-message': !message.isUser }">
        <svg v-if="!message.isUser" t="1711177579535" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="201502" width="32" height="32"><path d="M501.824 32C303.552 32 141.504 176.992 141.504 357.76c0 23.712 2.816 47.104 8.32 69.856l-51.008 114.208a32 32 0 0 0 24.704 44.736c54.272 7.744 76.672 31.168 76.672 77.312v111.552a64 64 0 0 0 64 64h20.704a64 64 0 0 1 64 64V960a32 32 0 0 0 32 32h345.6a32 32 0 0 0 0-64h-313.6v-24.608a128 128 0 0 0-128-128h-20.736v-111.552c0-65.664-32.192-110.688-91.2-131.136l39.872-89.28a31.968 31.968 0 0 0 1.568-21.792 233.088 233.088 0 0 1-8.896-63.904c0-143.712 131.936-261.76 296.32-261.76s296.32 118.016 296.32 261.76a32 32 0 0 0 64 0C862.144 176.992 700.064 32 501.824 32zM904 448a32 32 0 0 0-32 32v360a32 32 0 0 0 64 0V480a32 32 0 0 0-32-32z" p-id="201503"></path><path d="M673.888 466.656c-11.744-25.568-48.416-24.64-58.816 1.536l-132.8 333.76a32 32 0 0 0 59.488 23.68l32.608-81.92c0.576 0.032 1.088 0.32 1.664 0.32h154.848l38.176 83.104a31.968 31.968 0 1 0 58.144-26.72l-153.312-333.76zM599.68 680l47.264-118.72 54.528 118.72H599.68z" p-id="201504"></path></svg>
        <p>{{ message.text }}</p>
      </div>
    </div>
    <!-- 用户提问输入框 -->
    <div class="chat-input">
      <input v-model="inputText" @keydown.enter.prevent="sendMessage" placeholder="请输入您的问题" />
      <button @click="sendMessage" :disabled="disabled" type="button">发送</button>
    </div>
  </div>
</template>

<script>
// 导入 request 模块
import request from '@/utils/request';

export default {
  data() {
    return {
      disabled: false, // 发送按钮是否禁用，避免用户连续提问
      inputText: '', // 用户问的内容
      messages: [] // 存放用户问的消息列表
    };
  },
  methods: {
    // 发送信息
    async sendMessage() {
      if (this.inputText.trim() === '') return; // 输入文本为空则返回
      this.$set(this.messages, this.messages.length, { text: this.inputText, isUser: true }); // 将用户输入的文本添加到消息列表中，并标记为用户消息
      console.log(this.messages[this.messages.length-1].text)
      this.inputText = ''; // 清空输入框中的文本
      // 等待下一个DOM更新周期
      this.$nextTick(() => {
        this.scrollToBottom(); // 滚动到聊天消息底部
        this.getAIResponse(); // 调用getAIResponse()方法，以获取AI的回复
      });
    },
    // 获取AI的回复
    async getAIResponse() {
      this.disabled = true
      try {
        // 在获取到ai回复的信息之前输出提示语
        this.$set(this.messages, this.messages.length, { text: '正在认真思考您的问题，请耐心等待。。。', isUser: false });
        // 发送请求
        const {answer} = await request({
          url: 'http://8.134.251.111:8160/askAI',
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          data: { question: this.messages[this.messages.length - 2].text },
          timeout: 60000 // 设置超时时间为60秒
        });

        // 将 AI 回复添加到消息列表中 this.messages: 要更新的目标对象或数组 this.messages.length: 要设置的属性或索引 { text: answer, isUser: false }: 新值
        this.$set(this.messages, this.messages.length - 1, { text: answer, isUser: false });
        this.disabled = false

        // 等待下一个DOM更新周期，然后滚动到聊天消息的底部
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      } catch (error) {
        console.error('Error getting AI response:', error);
      }
    },
    // 滚动到聊天消息底部
    scrollToBottom() {
      this.$refs.chatMessages.scrollTop = this.$refs.chatMessages.scrollHeight;
    }
  }
};
</script>

<style scoped>
.chat-container {
  margin: 0 auto;
  height: 80vh;
  display: flex;
  flex-direction: column;
}

.chat-messages {
  flex: 1;
  padding: 20px;
}

.message {
  max-width: 70%;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 8px;
}

.user-message {
  background-color: #91c3f8;
  color: #fff;
  align-self: flex-end;
  margin-left: auto;
}

.ai-message {
  background-color: #f0f0f0;
  color: #333;
  align-self: flex-start;
}

.chat-input {
  display: flex;
  align-items: center;
  padding: 20px;
}

.chat-input input {
  flex: 1;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.chat-input button {
  margin-left: 10px;
  padding: 10px 20px;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}
</style>
