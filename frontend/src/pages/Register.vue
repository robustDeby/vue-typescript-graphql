<template>
  <div class="auth-page">
    <div class="auth-card">
      <h1>Create account</h1>
      <p class="subtitle">Start sharing your thoughts</p>

      <form @submit.prevent="handleRegister">
        <div class="field">
          <label>Name</label>
          <input v-model="form.name" placeholder="Your name" required />
        </div>
        <div class="field">
          <label>Birthday</label>
          <input v-model="form.birthday" type="date" required />
        </div>
        <div class="field">
          <label>Email</label>
          <input v-model="form.email" type="email" required />
        </div>
        <div class="field avatar-row">
          <label>Avatar</label>
          <input type="file" accept="image/*" @change="onAvatarChange" />
          <img
            v-if="avatarPreview"
            :src="avatarPreview"
            class="avatar-preview"
          />
        </div>

        <div class="field">
          <label>Password</label>
          <input v-model="form.password" type="password" required />
        </div>

        <div class="field">
          <label>Confirm password</label>
          <input v-model="form.confirmPassword" type="password" required />
        </div>

        <p v-if="error" class="error">{{ error }}</p>

        <button :disabled="loading">
          {{ loading ? "Creating…" : "Create account" }}
        </button>
      </form>

      <p class="footer">
        Already have an account?
        <router-link to="/login">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const loading = ref(false);
const error = ref("");
const avatarPreview = ref<string | null>(null);

function onAvatarChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  avatarPreview.value = URL.createObjectURL(file);

  // for now, just store preview as avatar
  form.avatar = avatarPreview.value;
}

const form = reactive({
  name: "",
  birthday: "",
  avatar: "",
  email: "",
  password: "",
  confirmPassword: "",
});

async function handleRegister() {
  error.value = "";

  if (form.password !== form.confirmPassword) {
    error.value = "Passwords do not match";
    return;
  }

  loading.value = true;

  try {
    const res = await fetch("http://localhost:5000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          mutation Register($input: RegisterInput!) {
            register(input: $input) {
              token
            }
          }
        `,
        variables: {
          input: {
            name: form.name,
            birthday: form.birthday,
            email: form.email,
            password: form.password,
            avatar: form.avatar || null,
          },
        },
      }),
    });

    const json = await res.json();
    if (json.errors) throw new Error(json.errors[0].message);

    localStorage.setItem("token", json.data.register.token);
    router.push("/blogs");
  } catch (e: any) {
    error.value = e.message || "Registration failed";
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
/* Page */
.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: antiquewhite;
  font-family: system-ui, -apple-system, BlinkMacSystemFont;
}

/* Card */
.auth-card {
  width: 420px;
  background: #fffaf3;
  padding: 36px;
  border-radius: 12px;
  border: 1px solid #e7dccb;
}

/* Headings */
h1 {
  margin: 0;
  font-size: 26px;
  color: #3f3a32;
}

.subtitle {
  margin-bottom: 24px;
  color: #6b6359;
}

/* Form */
.field {
  margin-bottom: 18px;
}

label {
  display: block;
  font-size: 14px;
  margin-bottom: 6px;
  color: #5a544a;
}

input {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #d6c9b7;
  background: #ffffff;
  color: #2f2a24;
}

input:focus {
  outline: none;
  border-color: #7a9cc6;
}

/* Button */
button {
  width: 100%;
  margin-top: 10px;
  padding: 12px;
  background: #7a9cc6;
  border: none;
  border-radius: 6px;
  color: white;
  font-weight: 500;
  cursor: pointer;
}

button:hover {
  background: #6b8db8;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Error */
.error {
  margin-top: 8px;
  color: #b45309;
  font-size: 14px;
}

/* Footer */
.footer {
  margin-top: 24px;
  text-align: center;
  color: #6b6359;
}

.footer a {
  color: #7a9cc6;
  text-decoration: none;
}
.avatar-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.avatar-preview {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #d6c9b7;
}
</style>
