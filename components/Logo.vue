<template>
  <nuxt-link class="logo" :to="homeUrl" title="Inicio">
    <img v-if="onBigScreen" alt="Vue logo" src="~/assets/logo.png" />
    <img v-else alt="Vue logo" src="~/assets/white-logo.png" />
  </nuxt-link>
</template>

<script lang="ts">
import { defineComponent, computed } from "@nuxtjs/composition-api";
import Urls from "@/utils/urls";
import useMediaQueries from "@/hooks/useMediaQueries";

const Logo = defineComponent({
  name: "Logo",
  setup() {
    const { onBigScreen } = useMediaQueries();

    const logoUrl = computed<string>(() =>
      onBigScreen.value ? "@/assets/logo.png" : "@/assets/white-logo.png"
    );

    return { onBigScreen, homeUrl: Urls.Home, logoUrl };
  }
});

export default Logo;
</script>
<style lang="stylus">
@import '~/assets/variables.styl';

.logo
  display: flex;
  width: 300px;
  align-items: center;

  @media (max-width: 810px)
    width: 260px;

  img
    width: 100%;
    padding: 0 30px;

    @media (max-width: $md)
      width: auto;
      height: 40px;

    @media (max-width: 810px)
      padding: 0;
</style>
