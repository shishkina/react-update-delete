# React, delete and update

## Objectives

1. Explain create and read functionality in a React app
2. Implement delete functionality
3. Implement update functionality

## Delete

- The route for deleting quotes is: `https://ada-api.herokuapp.com/api/quotes/${id}`
- In the quote component itself there should be a button or link that has an `onClick` event handler.
- The `onClick` should execute a function that sends a fetch request, with the method set to delete, to the proper URL.
- You can't just do something like this:
```javascript
onClick={this.props.deleteQuote(quote.id)}
```
**David, why not?**
- If you have to pass an argument to a function in an event handler, you have to wrap it in an arrow function so the function isn't executed immediately, like so:
```javascript
onClick={() => { this.props.deleteQuote(quote.id) }}
```
- This method should get passed down from `App.js`
- After the quote is deleted, you can then either re-fetch all of the quotes and reset the state, or you can remove the deleted quote from the array and then reset the state. You can try either way. If you attempt the latter, try to return a new array and set the state that way rather than just removing the item from the array itself.

## Update

- In the `Quote` component you can add a piece of state that keeps track of whether or not the specific quote is being edited. Something like a boolean `isBeingEdited`.
- Add an edit button in the component that will set that piece of state to true or false, depending on what it currently is.
- The component, if `isBeingEdited` is false should just display some `<p>` tags. If it's true, it should turn into text boxes so you can edit the text.
- Also include a button that will do the actual fetch for the `PUT`.
- Pass down an `editQuote` method from `App.js` to the Quote component.
- After the edit is successful, re-fetch the quotes and reset the state.
