<template>
  <div>
    <div class="flex items-center md:text-xl">
      <span> خانه </span>
      <span>
        <ChevronLeftIcon />
      </span>
      <span class="text-green"> بلاگ </span>
    </div>
    <h1 class="mt-16 mb-11 text-3xl md:text-4xl font-extrabold text-center">
      بلاگ
    </h1>

    <div
      class="mb-16 md:mb-20 max-w-3xl mx-auto rounded-2xl shadow-search p-4 border-solid flex items-center gap-3"
      :class="{ 'shadow-search-avtive': activeInput }"
    >
      <span><SearchIcon class="text-xl text-[#7B7B7B]" /></span>
      <input
        type="text"
        name="search"
        @focus="activeInput = true"
        @blur="activeInput = false"
        v-model="searchQuery"
        placeholder="جستجو کنید..."
        class="caret-green flex-grow border-none outline-none max-w-lg md:max-w-3xl"
      />
    </div>
    <div class="flex flex-col xl:flex-row justify-between xl:gap-8 2xl:gap-16 items-start">
      <div
        class="flex flex-col mx-auto px-5 py-8 rounded-2xl gap-5 mb-32 shadow-category-box w-full max-w-xs"
      >
        <h3 class="font-bold text-lg md:text-[22px]">دسته‌بندی</h3>
        <label
          class="justify-between md:text-lg flex items-center text-[#7B7B7B]"
          v-for="category in postCategories"
          :key="category.id"
        >
          <span class="cursor-pointer"> {{ category.name }} </span>
          <input
            v-model="categoriesFilters"
            class="checkbox appearance-none w-0 h-0"
            type="checkbox"
            :value="category.name"
          />
          <div
            class="w-7 flex justify-center items-center aspect-square border-2 border-solid border-[#7B7B7B] rounded-md"
          >
            <CheckIcon class="opacity-0 cursor-pointer text-green" />
          </div>
        </label>
      </div>

      <div class="flex flex-col gap-14 items-center mx-auto lg:mx-0">
        <BlogCard
          v-for="post in filteredPosts"
          class="max-w-md lg:max-w-5xl"
          :key="post.id"
          :title="post.title"
          :img-url="post.introImageUrl.host + post.introImageUrl.path"
          :author="post.author"
          :created-at="post.createdAt"
          :comment-count="post.commentCount"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import BlogCard from '@/components/BlogCard.vue'
import ChevronLeftIcon from '~icons/mdi/chevron-left'
import CheckIcon from '~icons/mdi/check'
import SearchIcon from '~icons/mdi/search'

const getPostsQuery = gql`
  query {
    getPosts {
      _id
      title
      author
      commentCount
      category {
        name
      }
      body
      createdAt
      introImageUrl {
        path
        host
      }
    }
  }
`

const getPostCategoriesQuery = gql`
  query {
    getPostCategories {
      _id
      name
    }
  }
`
const activeInput = ref(false)
const searchQuery = ref('')
const categoriesFilters = ref([])

const posts = ref([])
const postCategories = ref([])

const postsData = await useAsyncQuery(getPostsQuery)
posts.value = postsData.data.value.getPosts
const postCategoriesData = await useAsyncQuery(getPostCategoriesQuery)
postCategories.value = postCategoriesData.data.value.getPostCategories.slice(
  0,
  8
)

const filteredPosts = computed(() => {
  let filteredPosts = []
  let filteredPostsBySearch = []
  let filteredPostsByCategory = []

  // CHANGE TO TITLE
  filteredPostsBySearch = posts.value.filter((post) =>
    post.author.includes(searchQuery.value)
  )

  filteredPosts = [...filteredPostsBySearch]

  if (categoriesFilters.value.length > 0) {
    categoriesFilters.value.forEach((cat) => {
      filteredPostsByCategory.push(
        ...filteredPosts.filter((p) => p.category.name == cat)
      )
    })
  } else {
    filteredPostsByCategory = filteredPosts
  }

  // Intersection
  filteredPosts = filteredPostsBySearch.filter((p) =>
    filteredPostsByCategory.includes(p)
  )

  return filteredPosts
})
</script>

<style scoped>
.checkbox:checked + div {
  border-color: #00c853;
}

.checkbox:checked + div > * {
  opacity: 1;
}
</style>
