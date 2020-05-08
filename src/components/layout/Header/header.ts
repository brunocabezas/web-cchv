import HeaderNav from '@/components/layout/Header/HeaderNav.vue';
import Logo from '@/components/Logo.vue';
import { defineComponent } from "@vue/composition-api";

const Header = defineComponent({
  name: "Header",
  components: { Logo, HeaderNav }
});

export default Header