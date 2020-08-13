import { defineComponent, computed } from "@vue/composition-api"
import Loader from "@/components/Loader.vue"
import ProgressiveImage from "@/components/ProgressiveImage.vue"
import Media from "@/components/Media/Media.vue"
import NewsPostMobileThumbnail from "@/components/News/NewsPostMobileThumbnail.vue"
import ActivitySchedule from "@/components/Activities/ActivitySchedule.vue"
import { INITIAL_NEWS_BY_PAGE } from "../NewsPage/newsPage"
import useNews from "@/models/useNews"
import useMediaQueries from "@/hooks/useMediaQueries"

export default defineComponent({
  name: "NewsPostPage",
  props: {
    postSlug: {
      type: String,
      required: true,
    },
  },
  components: {
    Loader,
    Media,
    NewsPostMobileThumbnail,
    ProgressiveImage,
    ActivitySchedule,
  },
  setup(props) {
    const {
      fetchSingleNewsPost,
      fetchNews,
      isLoadingSingleNewsPost: isLoading,
      getNewsPostUrlBySlug,
      getLatestNews,
      singleNewsPost: post,
    } = useNews()
    const { onBigScreen } = useMediaQueries()
    fetchSingleNewsPost({ per_page: 1, slug: props.postSlug })
    fetchNews({ per_page: INITIAL_NEWS_BY_PAGE, page: 1 })

    const filteredLatestNews = computed(() => getLatestNews(post))

    return {
      getNewsPostUrlBySlug,
      latestNews: filteredLatestNews,
      post,
      isLoading,
      onBigScreen,
    }
  },
})
