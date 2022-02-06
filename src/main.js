import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./css/index.sass";
import VueVirtualScroller from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

createApp(App).use(router).use(VueVirtualScroller).mount("#app");
