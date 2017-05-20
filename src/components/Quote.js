import React, { Component } from 'react';

class Quote extends Component {
  constructor(props) {
    super(props);

    /**
     * The isBeingEdited boolean will determine whether we render the quote
     * or a form to let us edit the quote. We set that to true when we click
     * the edit quote button. We're using controlled inputs again, refer to
     * App for an explanation.
     */
    this.state = {
      isBeingEdited: false,
      inputContentValue: this.props.quote.content,
      inputAuthorValue: this.props.quote.author,
      inputGenreValue: '',
    }

    this.handleInputGenreChange = this.handleInputGenreChange.bind(this);
    this.handleInputContentChange = this.handleInputContentChange.bind(this);
    this.handleInputAuthorChange = this.handleInputAuthorChange.bind(this);
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

  /**
   * This method will render the edit form. Then in our regular render method,
   * we'll call this method if isBeingEdited is true.
   */
  renderEditForm() {
    return (
      <li>
        {/**
         * The onSubmit for this form looks a little different. We have to call
         * a method being passed down to Quote as a prop and we have to set some
         * state, so I wrapped those two things in an arrow function. The edit
         * method needs access to the event object so we pass that into the
         * arrow function and then into the edit function. React gives us the
         * event object in any event handler, like onClick, that we use.
         */}
        <form
          className="add-quote-form"
          onSubmit={(event) => {
            this.props.handleQuoteEdit(event);
            this.setState({isBeingEdited: false});
          }}
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

  /**
   * This render method will be called only if isBeingEdited is set to false.
   */
  renderQuote() {
    return (
      <li className="quote">
        <h2>{this.props.quote.author}</h2>
        <p>Content: {this.props.quote.content}</p>
        <p>Genre: {this.props.quote.genre_type}</p>
        {/**
         * The delete and edit event handlers need to have arguments. If we just
         * call the method and pass it an argument it will be invoked
         * immediately. So, we wrap them into arrow functions.
         */}
        <button onClick={() => { this.props.handleDeleteQuote(this.props.quote.id) }}>
          Delete quote
        </button>
        <button onClick={() => {
          this.setState({isBeingEdited: true})
        }}>
          Edit quote
        </button>
      </li>
    );
  }

  /**
   * Finally, the actual render method will render the form or the quote
   * depending on the value of isBeingEdited.
   */
  render() {
    if (this.state.isBeingEdited === false) {
      return this.renderQuote();
    } else {
      return this.renderEditForm();
    }
  }
}

export default Quote;
