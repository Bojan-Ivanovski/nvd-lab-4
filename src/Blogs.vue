<template>
  <div>
    <input v-model="searchTerm" placeholder="Search blogs..." />
    <fieldset>
        <div>Filter by: </div>
        <input type="checkbox" id="title" value="title" v-model="filters" />
        <label for="title">By Title</label>
        <input type="checkbox" id="content" value="description" v-model="filters" />
        <label for="content">By Content</label>
    </fieldset>
    <ul v-if="!isLoading">
      <div>
        <li v-for="blog in filteredBlogs" :key="blog.id">
          <img v-if="blog.heroImage" class="thumbnail" :src="`${blog.heroImage.fields.file.url}?fit=scale&w=350&h=196`" />
          <div class="article-text">
          <div class="date">
              {{ new Date(blog.publishDate).toDateString() }}
          </div>
          <h4>{{ blog.title }}</h4> 
          <p>{{ blog.description }}</p>
          </div>
        </li>
      </div>
    </ul>
    <p v-else>Loading blogs...</p>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useSearch } from "./useSearch";

const props = defineProps({
  blogs: {
    type: Array,
    required: true,
  },
  isLoading: {
    type: Boolean,
    required: true,
  },
  error: {
    type: String,
    required: true,
  },
});

const emits = defineEmits(["deleteBlog"]);
const blogs = ref(props.blogs);

watch(
  () => props.blogs,
  (newBlogs) => {
    blogs.value = newBlogs;
  }
);

const {
  searchTerm,
  filters,
  filteredItems: filteredBlogs,
} = useSearch(blogs);
</script>