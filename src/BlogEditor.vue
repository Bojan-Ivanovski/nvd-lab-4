<template>
    <div class="editor">
      <input v-model="title" placeholder="Title" />
      <input v-model="author" placeholder="Author" />
      <input v-model="id" placeholder="Blog ID" />
      <textarea v-model="content" placeholder="Blog Content"></textarea>
      <button @click="submitBlog">Add Blog</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const title = ref('');
  const author = ref('');
  const id = ref('');
  const content = ref('');
  const emit = defineEmits(['addNewItem']);
  
  const submitBlog = () => {
    emit('addNewItem', {
      id: id.value,
      title: title.value,
      description: content.value,
      author: author.value
    });
  
    title.value = '';
    author.value = '';
    id.value = '';
    content.value = '';
  };
  </script>
  
  <style scoped>
  .editor {
    padding: 5px;
    display: flex;
    flex-direction: column;
  }
  input, textarea {
    margin: 5px 0;
    padding: 8px;
  }
  </style>