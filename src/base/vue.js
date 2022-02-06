import { getCurrentInstance, computed } from "vue";

export const useRouter = () => {
  const vm = getCurrentInstance()?.proxy;

  if (!vm) {
    throw new ReferenceError("Not found vue instance.");
  }

  const route = computed(() => vm.$route);

  return {
    route,
    router: vm.$router,
  };
};
