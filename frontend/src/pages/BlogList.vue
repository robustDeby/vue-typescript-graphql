<script setup lang="ts">
import { ref, onMounted } from "vue";
import { graphqlClient } from "@/graphql/client";
import { GET_BLOGS } from "@/graphql/operations";
import { useRouter } from "vue-router";
import CreateBlogModal from "@/components/CreateBlogModal.vue";

const showModal = ref(false);

const openCreate = () => {
  showModal.value = true;
};

const refresh = () => {
  fetchBlogs();
};

const router = useRouter();

const blogs = ref<any[]>([]);
const loading = ref(false);

const fetchBlogs = async () => {
  loading.value = true;
  const result = await graphqlClient.request(GET_BLOGS);
  blogs.value = result.blogs;
  loading.value = false;
};

const goToDetail = (id: string) => {
  router.push(`/blogs/${id}`);
};

onMounted(fetchBlogs);
</script>

<template>
  <div class="page">
    <h1 class="page-title">Blogs</h1>

    <div v-if="loading" class="loading">Loading blogs...</div>

    <div v-else class="list">
      <article
        v-for="blog in blogs"
        :key="blog.id"
        class="card"
        @click="goToDetail(blog.id)"
      >
        <h2>{{ blog.title }}</h2>

        <p class="preview">{{ blog.content.slice(0, 100) }}...</p>

        <span class="badge"> 💬 {{ blog.recommends.length }} </span>
      </article>
    </div>

    <CreateBlogModal
      v-if="showModal"
      @close="showModal = false"
      @created="refresh"
    />

    <button class="fab" @click="openCreate">+</button>
  </div>
</template>

<style scoped>
.page {
  background: #f8fafc;
  min-height: 100vh;
  padding: 2.5rem 1rem;
}

.page-title {
  max-width: 900px;
  margin: 0 auto 1.5rem;
  font-size: 2rem;
  font-weight: 700;
  color: #0f172a;
}

.loading {
  text-align: center;
  color: #64748b;
}

.list {
  max-width: 900px;
  margin: 0 auto;
  display: grid;
  gap: 1rem;
}

/* Card */
.card {
  background: white;
  padding: 1.5rem;
  border-radius: 14px;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.04);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
}

.card h2 {
  margin-bottom: 0.5rem;
  font-size: 1.3rem;
  color: #2563eb;
}

.preview {
  color: #475569;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 0.75rem;
}

.badge {
  font-size: 0.85rem;
  color: #64748b;
}
.fab {
  position: fixed;
  bottom: 2rem;
  right: 2rem;

  width: 56px;
  height: 56px;
  border-radius: 50%;

  background: #2563eb;
  color: white;
  font-size: 2rem;

  border: none;
  cursor: pointer;

  box-shadow: 0 12px 30px rgba(37, 99, 235, 0.4);
}

</style>
