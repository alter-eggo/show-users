import axios from "axios";
import { ref, onMounted, computed } from "vue";

export function useUsers() {
  const usersCount = 200;
  const url = `https://randomuser.me/api/?results=${usersCount}&inc=name,id`;
  const getUsers = async () => await axios.get(url);

  const rawUsersList = ref([]);

  onMounted(async () => {
    const result = await getUsers();
    const arr = [];

    // Преобразуем данные, чтобы было как в тз
    result.data.results
      .filter((v) => v.id.value)
      .forEach((v, index) => {
        if (index === 0) {
          arr.push(v);
          return;
        }

        if (index % 10 === 0) {
          arr.push(v);
          return;
        }

        if (Array.isArray(arr[arr.length - 1].items)) {
          arr[arr.length - 1].items.push(v);
          return;
        }

        arr[arr.length - 1].items = [v];
      });

    // rawUsersList.value = Object.freeze(
    //   arr.map((v) => ({
    //     id: v.id.value,
    //     name: v.name.first,
    //     items: v.items?.map((item) => ({
    //       id: item.id.value,
    //       name: item.name.first,
    //       isChild: true,
    //     })),
    //   }))
    // );

    rawUsersList.value = arr.map((v) => ({
      id: v.id.value,
      name: v.name.first,
      items: v.items?.map((item) => ({
        id: item.id.value,
        name: item.name.first,
        isChild: true,
      })),
    }));
  });

  return {
    users: rawUsersList,
  };
}
