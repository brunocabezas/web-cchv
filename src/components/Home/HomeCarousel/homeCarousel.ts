import { defineComponent, ref, computed } from "@vue/composition-api"
import { Carousel as VueCarousel, Slide } from "vue-carousel"
import Icon from "vue-awesome/components/Icon.vue"
import Loader from "@/components/Loader.vue"
import ProgressiveImage from "@/components/ProgressiveImage.vue"
import useCarouselImages from "@/factories/useCarouselImages"
import { getIdFromUrl as getYoutubeIdFromUrl } from "vue-youtube"
import useCarousel from "@/utils/useCarousel"

const HomeCarousel = defineComponent({
  name: "HomeCarousel",
  components: { Loader, VueCarousel, ProgressiveImage, Slide, "v-icon": Icon },
  setup() {
    const { carousel, fetchCarouselImages, isLoading } = useCarouselImages()
    const carouselLength = computed<number>(() => carousel.value.length)

    fetchCarouselImages()

    const {
      goToNextSlide,
      activeSlide: activeImg,
      goToPrevSlide,
    } = useCarousel(carouselLength)

    return {
      isLoading,
      carousel,
      activeImg,
      getYoutubeIdFromUrl,
      goToNextImg: goToNextSlide,
      goToPrevImg: goToPrevSlide,
    }
  },
})
export default HomeCarousel
