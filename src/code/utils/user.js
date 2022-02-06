import { reverseString } from "@/base/string";

export function filterAndSortUsersList(usersList, favIdsList, filterValue) {
  if (!filterValue) {
    if (favIdsList.length) {
      return flatList(usersList).filter(
        (user) => !favIdsList.includes(user.id)
      );
    }

    return flatList(usersList);
  }

  const reversedFilterValue = reverseString(filterValue);

  const filteredArr = usersList
    // преобразуем и сортируем subitems
    .map((user) => ({
      ...user,
      items: sortUserList(
        user.items.filter(
          (item) =>
            !favIdsList.includes(item.id) &&
            item.name?.toLowerCase().includes(filterValue.toLowerCase())
        ),
        favIdsList,
        filterValue
      ),
    }))
    // фильтруем основной список
    .filter(
      (user) =>
        !favIdsList.includes(user.id) &&
        (user.name.toLowerCase().includes(filterValue.toLowerCase()) ||
          user.items.length)
    );

  // сортируем основной список
  const sortedArr = sortUserList(filteredArr, filterValue, reversedFilterValue);

  // делаем плоскую структуру для отображения в шаблоне
  return flatList(sortedArr);
}

export function flatList(usersList) {
  return usersList
    .reduce((acc, item) => {
      acc.push(item);
      if (item.items) {
        acc.push(...item.items);
      }
      return acc;
    }, [])
}

function sortUserList(userList, filterValue, reversedFilterValue) {
  if (!userList.length) {
    return [];
  }
  return userList.sort((a, b) => {
    const aMatches = countUserNameMatches(a, filterValue, reversedFilterValue);
    const bMatches = countUserNameMatches(b, filterValue, reversedFilterValue);

    if (aMatches < bMatches) {
      return 1;
    }

    if (bMatches < aMatches) {
      return -1;
    }

    return 0;
  });
}

function countUserNameMatches(user, value, reversedValue) {
  return (
    // вхождения строки
    user.name.toLowerCase().split(value).length -
      1 +
      // вхождения строки в обратном порядке
      user.name.toLowerCase().split(reversedValue).length -
      1 +
      // вхождения строки в subitems, если есть
      user.items?.reduce((acc, item) => {
        acc += item.name?.toLowerCase().includes(value.toLowerCase());
        acc += item.name?.toLowerCase().includes(reversedValue.toLowerCase());
        return acc;
      }, 0) || 0
  );
}
