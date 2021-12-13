import { v4 as uuidv4 } from "uuid";

export const addItem = (todoItems, newTitle) => {
  if (newTitle.trim().length > 0) {
    const newItem = {
      title: newTitle.trim(),
      isCompleted: false,
      id: uuidv4(),
    };
    // console.log(todoItems);
    return [...todoItems, newItem];
  }
};

export const editTitle = (todoItems, itemToEdit, title) => {
  const index = todoItems.indexOf(itemToEdit);
  console.log(todoItems)

  return [
    ...todoItems.slice(0, index),
    {
      ...itemToEdit,
      title,
    },
    ...todoItems.slice(index + 1),
  ];
};

export const deleteItem = (todoItems, itemToDelete) => {
  console.log(itemToDelete)
  return todoItems.filter((item) => item.id !== itemToDelete.id);
};

export const toggleCompleted = (todoItems,item) => {
    const isCompleted = item.isCompleted;

    return todoItems.map(i => i.id === item.id ? {...i, isCompleted: !isCompleted} : i);
}

export const toggleCompletedAll = (todoItems, completedAll) => {
  let todoItems_temp = [];

  for(let item of todoItems){
    todoItems_temp.push({
      title: item.title,
      isCompleted: completedAll ? false : true,
      id: item.id
    })
  }

  return todoItems_temp;
}

export const clearCompleted = (todoItems) => {
  return todoItems.filter(item => !item.isCompleted);
}