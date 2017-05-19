import React, { Component } from 'react';

class Quote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isBeingEdited: false,
      inputContentValue: this.props.quote.content,
      inputAuthorValue: this.props.quote.author,
      inputGenreValue: '',
    }

    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleInputGenreChange = this.handleInputGenreChange.bind(this);
    this.handleInputContentChange = this.handleInputContentChange.bind(this);
    this.handleInputAuthorChange = this.handleInputAuthorChange.bind(this);
  }

  toggleEdit() {
    this.setState((prevState) => {
      return {
        isBeingEdited: true,
      }
    })
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

  renderEditForm() {
    console.log(this.props.quote)
    return (
      <li>
        <form
          className="add-quote-form"
          onSubmit={this.props.handleQuoteEdit}
        >
          <input
            type="text"
            value={this.state.inputContentValue}
            name='content'
            onChange={this.handleInputContentChange}
          /><br/>
          <input
            type="text"
            value={this.state.inputAuthorValue}
            name='author'
            onChange={this.handleInputAuthorChange}
          /><br/>
          <input
            type="text"
            value={this.state.inputGenreValue}
            name='genre_type'
            placeholder='Enter genre ID here'
            onChange={this.handleInputGenreChange}
          /><br/>
          <input
            style={{visibility: 'hidden'}}
            readOnly
            name="id"
            value={this.props.quote.id}
          />
          <input type="submit" value="Submit Quote Edit!" />
        </form>
      </li>
    );
  }

  renderQuote() {
    return (
      <li className="quote">
        <h2>{this.props.quote.author}</h2>
        <p>Content: {this.props.quote.content}</p>
        <p>Genre: {this.props.quote.genre_type}</p>
        <button onClick={() => { this.props.handleDeleteQuote(this.props.quote.id) }}>
          Delete quote
        </button>
        <button onClick={this.toggleEdit}>
          Edit quote
        </button>
      </li>
    );
  }

  render() {
    if (this.state.isBeingEdited === false) {
      return this.renderQuote();
    } else {
      return this.renderEditForm();
    }
  }
}

export default Quote;
