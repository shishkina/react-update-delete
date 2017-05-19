import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AddQuoteForm from './components/AddQuoteForm';
import QuoteList from './components/QuoteList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: [],
      inputContentValue: '',
      inputAuthorValue: '',
      inputGenreValue: '',
    }

    this.handleInputGenreChange = this.handleInputGenreChange.bind(this);
    this.handleInputContentChange = this.handleInputContentChange.bind(this);
    this.handleInputAuthorChange = this.handleInputAuthorChange.bind(this);
    this.handleQuoteSubmit = this.handleQuoteSubmit.bind(this);
    this.handleQuoteEdit = this.handleQuoteEdit.bind(this);
    this.handleDeleteQuote = this.handleDeleteQuote.bind(this);
  }

  componentDidMount() {
    /**
     * The fetching we do here in componentDidMount will
     * only fetch when the component initially loads.
     */
    this.fetchAllQuotes()
  }

  fetchAllQuotes() {
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

  handleInputContentChange(event) {
    this.setState({inputContentValue: event.target.value});
  }

  handleInputAuthorChange(event) {
    this.setState({inputAuthorValue: event.target.value});
  }

  handleInputGenreChange(event) {
    this.setState({inputGenreValue: event.target.value});
  }

  handleQuoteSubmit(event) {
    event.preventDefault();

    fetch('https://ada-api.herokuapp.com/api/quotes', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        content: event.target.content.value,
        author: event.target.author.value,
        genre_id: event.target.genre_id.value
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
          }
        })
      } else {
        console.log('error');
      }
    })
  }

  handleQuoteEdit(event) {
    console.log('hello');
    event.preventDefault();

    fetch(`https://ada-api.herokuapp.com/api/quotes/${event.target.id.value}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        content: event.target.content.value,
        author: event.target.author.value,
        genre_id: event.target.genre_id.value
      }),
    })
    .then((response) => {
      if (response.status === 200) {
        this.fetchAllQuotes();
      }
    })
  }

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
        <AddQuoteForm
          handleQuoteSubmit={this.handleQuoteSubmit}
          handleInputContentChange={this.handleInputContentChange}
          handleInputAuthorChange={this.handleInputAuthorChange}
          handleInputGenreChange={this.handleInputGenreChange}
          inputContentValue={this.state.inputContentValue}
          inputAuthorValue={this.state.inputAuthorValue}
          inputGenreValue={this.state.inputGenreValue}
        />
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
