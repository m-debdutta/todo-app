overall view:-

# how todo works for a user?

- user writes something in the input box.
- add button is clicked.
- a todo gets add to the display section.
- strikes the todo out when the todo is clicked.
- it gets un-struck when the todo is clicked again.

# how do I want my todo to work?

## when the todo is first created.

- whenever the add button is clicked, takes everything from the input box.
- stores the text taken from the input box somewhere.
- makes a html element using that text.
- add events to that element.
- sticks the element to dom.

## when the todo is clicked.

- whenever the todo is clicked.
- toggles the marked status.
- creates a html element using the updated values.
- add events to that element.
- stick the element to dom.

### common works :

- create a html element using the updated values.
- add events to that element.
- stick the element to dom.

```js
page = {
  todoategory : {
    fitness: {
      categoryName: fitness,
      categoryDetails: {

      }
    }
  }
}
```
