# objective:
VERY IMPORTANT: CHANGE NAMES AND FOLLOW A PROPER CONVENTION

What will be the components present in the todo app.
- Model will be in the server side.
- Router will be on the server side.
- controller will be on the server side.

- View will be on the client side.








keep the data in the local storage.
So that the data doesn't lost when page is refreshed.

> when to store the data?
- Store the data every time the state of the model is changing.

> when to retrieve the data
- whenever the page is getting reloaded.


---
# DATA MODEL:

```js
todoList : {
  todoId: {
    title: todoTitle,
    todo: [todoItems],
  }

  todoId: {
    title: todoTitle,
    todo: [todoItems],
  }

  todoId: {
    title: todoTitle,
    todo: [todoItems],
  }
}
```
---

# Done
<!-- - remove the functions from main to controller. -->
<!-- - put the html elements one inside another. -->
Render the whole page instead of a single todo.[Done]
