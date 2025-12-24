<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { graphqlClient } from "@/graphql/client";
import { GET_BLOG, ADD_recomment } from "@/graphql/operations";

interface recomment {
  id: string;
  content: string;
  author: {
    name: string;
    email: string;
  };
}

interface Blog {
  id: string;
  title: string;
  content: string;
  recomments: recomment[];
}

const route = useRoute();
const blogId = route.params.id as string;

const blog = ref<Blog | null>(null);
const newrecomment = ref("");
const loading = ref(false);

const fetchBlog = async () => {
  loading.value = true;
  const result = await graphqlClient.request(GET_BLOG, {
    id: blogId,
  });
  blog.value = result.blog;
  loading.value = false;
};

const addrecomment = async () => {
  if (!newrecomment.value) return;

  await graphqlClient.request(ADD_recomment, {
    id: blogId,
    content: newrecomment.value,
  });

  newrecomment.value = "";
  fetchBlog(); // refresh data
};

onMounted(fetchBlog);
</script>
<template>
  <div class="page">
    <div v-if="loading" class="loading">Loading blog...</div>

    <article v-else-if="blog" class="card">
      <!-- Title -->
      <h1 class="title">{{ blog.title }}</h1>

      <!-- Content -->
      <p class="content">{{ blog.content }}</p>

      <!-- Divider -->
      <hr />

      <!-- recomments -->
      <section class="recomments">
        <h3>💬 Recomments ({{ blog.recomments.length }})</h3>

        <ul v-if="blog.recomments.length">
          <li v-for="r in blog.recomments" :key="r.id">
            <div class="recomment-author">
              {{ r.author.name }}
            </div>
            {{ r.content }}
          </li>
        </ul>

        <p v-else class="empty">No recomments yet. Be the first!</p>

        <!-- Add recomment -->
        <div class="add-recomment">
          <input v-model="newrecomment" placeholder="Write a recomment..." />
          <button @click="addrecomment">Post</button>
        </div>
      </section>
    </article>
  </div>
</template>

<style scoped>
/* Page background */
.page {
  width: 100%;
  padding: 2.5rem 1rem;
}

/* Loading */
.loading {
  text-align: center;
  color: #64748b;
}

/* Card */
.card {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 14px;
  padding: 2.5rem 2rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
}

/* Title */
.title {
  font-size: 2rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 1rem;
}

/* Content */
.content {
  font-size: 1.05rem;
  line-height: 1.7;
  color: #334155;
}

/* Divider */
hr {
  margin: 2.5rem 0;
  border: none;
  border-top: 1px solid #e5e7eb;
}

/* recomments */
.recomments h3 {
  margin-bottom: 1rem;
  color: #2563eb;
}

.recomments ul {
  list-style: none;
  padding: 0;
  margin-bottom: 1.5rem;
}

.recomments li {
  background: #f1f5f9;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  color: #1e293b;
}

/* Empty state */
.empty {
  color: #94a3b8;
  margin-bottom: 1.5rem;
}

/* Add recomment */
.add-recomment {
  display: flex;
  gap: 0.5rem;
}

.add-recomment input {
  flex: 1;
  padding: 0.6rem 0.75rem;
  border-radius: 8px;
  border: 1px solid #cbd5f5;
}

.add-recomment input:focus {
  outline: none;
  border-color: #2563eb;
}

.add-recomment button {
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background: #2563eb;
  color: white;
  font-weight: 500;
}
.recomment-author {
  font-size: large;
  font-family: cursive;
  padding: 7px;
  color: #6d4859;
}
.add-recomment button:hover {
  opacity: 0.9;
}
</style>
