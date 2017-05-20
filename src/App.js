import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AddQuoteForm from './components/AddQuoteForm';
import QuoteList from './components/QuoteList';

class App extends Component {
  /**
   * We pass props to constructor and super in case we have to reference
   * props inside the constructor. We're not doing that here but it's good
   * practice to pass them anyway.
   */
  constructor(props) {
    super(props);
    this.state = {
      quotes: [],
      inputContentValue: '',
      inputAuthorValue: '',
      inputGenreValue: '',
    }

    /**
     * We have to bind all of the methods in our class that both reference
     * this and will also be called from the DOM. If you're not sure
     * whether or not to bind a method, you can just do it and it won't affect
     * anything. If you don't bind something that you're supposed to bind then
     * you'll get some nasty errors. What we're saying when we do the bind is
     * that the value of this should always be the particular instances of the
     * component that we render.
     */
    this.handleInputGenreChange = this.handleInputGenreChange.bind(this);
    this.handleInputContentChange = this.handleInputContentChange.bind(this);
    this.handleInputAuthorChange = this.handleInputAuthorChange.bind(this);
    this.handleQuoteSubmit = this.handleQuoteSubmit.bind(this);
    this.handleQuoteEdit = this.handleQuoteEdit.bind(this);
    this.handleDeleteQuote = this.handleDeleteQuote.bind(this);
  }

  componentDidMount() {
    /**
     * The fetching we do here in componentDidMount will only fetch when the
     * component initially loads.
     */
    this.fetchAllQuotes()
  }

  fetchAllQuotes() {
    /**
     * First we fetch the url that will respond to us with a json object of all
     * the quotes. Then we have to parse the json, which returns another promise
     * that we can call another .then() on. Then after the json is parsed we
     * set the state of our component so that the quotes array equals the quotes
     * that the server sent us. Notice that we're using the function version of
     * setState(). You only really have to do that IF you reference the current
     * state in setting the new state. We're not doing that here but it's a good
     * practice to use the function version in case you ever change it and
     * reference current state.
     */
    fetch('https://ada-api.herokuapp.com/api/quotes')
    .then((response) => {
      return response.json()
    })
    .then((responseJson) => {
      this.setState((prevState) => {
        return {
          quotes: responseJson.quotesData,
        }
      });
    });
  }

  /**
   * The following three methods will handle our form inputs. We are using
   * what's called 'controlled inputs' in React lingo. React has complete
   * control over the state of the inputs. So, every time you enter a character
   * in an input, React will set the corresponding piece of the state that keeps
   * track of that input. Later on we'll see that the values of the inputs are
   * then set to the corresponding pieces of state.
   * Reference: https://facebook.github.io/react/docs/forms.html
   */
  handleInputContentChange(event) {
    this.setState({inputContentValue: event.target.value});
  }

  handleInputAuthorChange(event) {
    this.setState({inputAuthorValue: event.target.value});
  }

  handleInputGenreChange(event) {
    this.setState({inputGenreValue: event.target.value});
  }

  /**
   * This method will take our input boxes and submit a new quote to be added
   * to our database. First we prevent the default form submission behavior,
   * which would have caused a refresh of our webpage. We don't want that,
   * we're building single page apps (SPAs). The fetch now takes a second
   * argument, an object in which we specify the method (POST), header, and
   * body. The body is an object that we stringify into a blob of data to be
   * sent over the wire. The properties in the object are the things we add
   * to the database. We're getting these values by referring to the input box
   * names (content, author, etc.) that you'll find in AddQuoteForm. Then we get
   * the response and parse it into json. The response should be the quote we
   * just added. We check to make sure it has an id (this lets us know the
   * database submission was successful), and then we create a new quote object.
   * Finally, We setState(). We set the quotes array to a NEW array by using
   * .concat instead of .push, and we set the state of the input boxes to be
   * empty. The reason we want a new array instead of just pushing to our
   * array in state is so that we can do awesome performance enhancements
   * later on.
   */
  handleQuoteSubmit(event) {
    event.preventDefault();

    fetch('https://ada-api.herokuapp.com/api/quotes', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        content: event.target.content.value,
        author: event.target.author.value,
        genre_id: event.target.genre_type.value
      }),
    })
    .then((response) => {
      return response.json()
    })
    .then((responseJson) => {
      if (responseJson.quote.id !== undefined) {
        const newQuote = {
          content: responseJson.quote.content,
          author: responseJson.quote.author,
          genre_type: responseJson.quote.genre_type,
          id: responseJson.quote.id,
        }
        this.setState((prevState) => {
          return {
            quotes: prevState.quotes.concat(newQuote),
            inputContentValue: '',
            inputAuthorValue: '',
            inputGenreValue: '',
          }
        })
      } else {
        console.log('error');
      }
    })
  }

  /**
   * This is similar to adding a new quote. But, instead of creating a new array
   * we simply re-fetch all the quotes. Either way is okay, but this way of
   * doing things does require an extra fetch.
   */
  handleQuoteEdit(event) {
    event.preventDefault();

    fetch(`https://ada-api.herokuapp.com/api/quotes/${event.target.id.value}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        content: event.target.content.value,
        author: event.target.author.value,
        genre_id: event.target.genre_type.value
      }),
    })
    .then((response) => {
      if (response.status === 200) {
        this.fetchAllQuotes();
      }
    })
  }

  /**
   * Delete quote, fetch all quotes.
   */
  handleDeleteQuote(quoteId) {
    fetch(`https://ada-api.herokuapp.com/api/quotes/${quoteId}`, {
      method: 'DELETE',
    })
    .then((response) => {
      if (response.status === 200) {
        this.fetchAllQuotes();
      }
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {/**
         * We have to pass all of our input change handlers and our input values
         * down to the AddQuoteForm. We also pass the submit method. The
         * AddQuoteForm will have access to all of these things in its props.
         */}
        <AddQuoteForm
          handleQuoteSubmit={this.handleQuoteSubmit}
          handleInputContentChange={this.handleInputContentChange}
          handleInputAuthorChange={this.handleInputAuthorChange}
          handleInputGenreChange={this.handleInputGenreChange}
          inputContentValue={this.state.inputContentValue}
          inputAuthorValue={this.state.inputAuthorValue}
          inputGenreValue={this.state.inputGenreValue}
        />
        {/**
         * The QuoteList component needs to access the quotes in its props.
         * It also needs the delete and edit methods, but it's going to pass
         * them along to the individual Quote component as props. Essentially
         * those methods are passing through the QuoteList component.
         */}
        <QuoteList
          quotes={this.state.quotes}
          handleDeleteQuote={this.handleDeleteQuote}
          handleQuoteEdit={this.handleQuoteEdit}
        />
      </div>
    );
  }
}

export default App;
