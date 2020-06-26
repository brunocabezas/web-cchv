import Vue from "vue"
import VueCompositionApi, { computed } from "@vue/composition-api"
import apiRoutes from "../../api/apiRoutes"
import useAsyncData from "../utils/useAsyncData"
import { WpResponseData } from "@/types/wordpressTypes"
import { getCustomField, getWPTitle } from "@/utils/api"
import { CarouselImageKeys } from "@/types/customFieldsKeysTypes"
import { CarouselImage } from "@/types/viewTypes"
import { DEFAULT_ORDER } from "@/utils/static"
import { sortByOrder } from "@/utils/arrays"

Vue.use(VueCompositionApi)

const { data, fetch: fetchCarouselImages, isLoading } = useAsyncData<
  WpResponseData
>(apiRoutes.CarouselImages)

export default function useCarouselImages() {
  const carousel = computed<CarouselImage[]>(() => {
    return data.value
      .map(
        (carouselImagePost): CarouselImage => ({
          id: carouselImagePost.id,
          name: getWPTitle(carouselImagePost),
          image: getCustomField(carouselImagePost, CarouselImageKeys.image),
          video_url: getCustomField(
            carouselImagePost,
            CarouselImageKeys.video_url
          ),
          order:
            getCustomField<number>(
              carouselImagePost,
              CarouselImageKeys.order
            ) || DEFAULT_ORDER,
          url: getCustomField(carouselImagePost, CarouselImageKeys.url),
        })
      )
      .sort(sortByOrder)
  })
  return { fetchCarouselImages, carousel, isLoading }
}
