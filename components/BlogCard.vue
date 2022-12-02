<template>
  <div class="flex flex-col lg:flex-row lg:items-center gap-5 shadow-blog-card">
    <div>
      <img
        class="lg:max-w-[300px] rounded-tl-xl lg:rounded-tl-none rounded-tr-xl lg:rounded-tr-2xl lg:rounded-br-2xl"
        :src="imgUrl"
      />
    </div>
    <div>
      <h2 class="text-lg text-[#373737] font-medium mb-4 md:mb-9">
        {{ title }}
      </h2>
      <p
        class="line-clamp-2 xl:line-clamp-3 font-light text-[#373737] mb-3 md:mb-5"
      >
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده
        از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و
        سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده
        از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و
        سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای
      </p>
      <div class="flex flex-col 2xl:flex-row 2xl:items-center">
        <div class="flex gap-5 2xl:gap-14 mb-7 2xl:mb-0 items-center">
          <div class="flex items-center gap-1">
            <span><CalendarIcon /></span>
            <span class="text-sm font-light">{{
              `${createdDay} ${createdMonth} ${createdYear}`
            }}</span>
          </div>
          <div class="flex items-center gap-1">
            <span><ChatBubbleIcon /></span>
            <span class="text-sm font-light"
              >{{ commentCountPersian }} نظر</span
            >
          </div>
          <div class="flex items-center gap-1">
            <span><PersonIcon /></span>
            <span class="text-sm font-light">{{ author }}</span>
          </div>
        </div>
        <AppBtn color="green" class="py-2 lg:w-[160px] lg:self-end 2xl:mr-auto">بیشتر</AppBtn>
      </div>
    </div>
  </div>
</template>

<script setup>
import jalaliDate from '@/utils/dataConvertor'
import toPersianNumber from '@/utils/numberConvertor'
import CalendarIcon from '~icons/mdi/calendar-today'
import ChatBubbleIcon from '~icons/mdi/chat-bubble'
import PersonIcon from '~icons/mdi/person'
import AppBtn from '@/components/AppBtn.vue'

const props = defineProps({
  imgUrl: String,
  title: String,
  author: String,
  createdAt: String,
  commentCount: Number,
})

const [createdYear, createdMonth, createdDay] = jalaliDate(props.createdAt)
const commentCountPersian = computed(() =>
  toPersianNumber(String(props.commentCount))
)
</script>
