export const editTitle = (todoItems, itemToEdit, title) => {
  const index = todoItems.indexOf(itemToEdit);

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
  return todoItems.filter((item) => item._id !== itemToDelete._id);
};

export const toggleCompleted = (todoItems,item) => {
    const isCompleted = item.isCompleted;

    return todoItems.map(i => i._id === item._id ? {...i, isCompleted: !isCompleted} : i);
}

export const toggleCompletedAll = (todoItems, completedAll) => {
  let todoItems_temp = [];

  for(let item of todoItems){
    todoItems_temp.push({
      title: item.title,
      isCompleted: completedAll ? false : true,
      _id: item._id
    })
  }

  return todoItems_temp;
}

export const clearCompleted = (todoItems) => {
  return todoItems.filter(item => !item.isCompleted);
}