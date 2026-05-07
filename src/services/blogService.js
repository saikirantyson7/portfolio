import blogSeed from "../data/blogSeed.json";

const STORAGE_KEY = "preparation_blog_posts_v1";

const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

function loadPosts() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(blogSeed));
    return [...blogSeed];
  }

  try {
    return JSON.parse(stored);
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(blogSeed));
    return [...blogSeed];
  }
}

function persistPosts(posts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

export async function getBlogs() {
  await delay();
  return loadPosts().sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function getBlogById(id) {
  await delay();
  return loadPosts().find((post) => post.id === id) || null;
}

export async function createBlog(post) {
  await delay();
  const posts = loadPosts();
  posts.push(post);
  persistPosts(posts);
  return post;
}

export async function updateBlog(id, updates) {
  await delay();
  const posts = loadPosts();
  const index = posts.findIndex((post) => post.id === id);

  if (index < 0) {
    throw new Error("Post not found");
  }

  posts[index] = { ...posts[index], ...updates };
  persistPosts(posts);
  return posts[index];
}
