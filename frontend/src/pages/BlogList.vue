<script setup lang="ts">
import { ref, onMounted } from "vue";
import { graphqlClient } from "@/graphql/client";
import BlogForm from '@/components/BlogForm.vue'
import { GET_BLOGS } from "@/graphql/operations";
import { useRouter } from 'vue-router'

const router = useRouter()

const blogs = ref<any[]>([]);

const fetchBlogs = async () => {
  const result = await graphqlClient.request(GET_BLOGS);
  blogs.value = result.blogs;
};

const goToDetail = (id: string) => {
  router.push(`/blogs/${id}`)
}

onMounted(fetchBlogs);
</script>

<template>
  <div class="page">
    <!-- Blog List -->

    <section class="list">
      <article
        v-for="blog in blogs"
        :key="blog.id"
        class="card"
        @click="goToDetail(blog.id)"
      >
        <h2 class="title">{{ blog.title }}</h2>
        <p class="content">{{ blog.content }}</p>

        <div class="meta">
          <span>⭐ {{ blog.recommends.length }} recommends</span>
          <span class="read-more">Read more →</span>
        </div>
      </article>
    </section>

    <BlogForm @created="fetchBlogs" />
  </div>
</template>

<style scoped>
/* Page layout */
.page {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem 3rem;
}

/* Header */
.header {
  margin-bottom: 2.5rem;
}

.header h1 {
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
}

.header p {
  color: #666;
  font-size: 1rem;
}

/* Blog list */
.list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Card */
.card {
  background: #cba6a6;
  border-radius: 10px;
  padding: 1.5rem 1.75rem;
  cursor: pointer;
  border: 1px solid #eee;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
}

/* Card content */
.title {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
}

.content {
  color: #555;
  line-height: 1.5;
  margin-bottom: 1rem;

  /* text clamp */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Meta */
.meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: #777;
}

.read-more {
  font-weight: 500;
  color: #333;
}
</style>
