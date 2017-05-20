import React, { Component } from 'react';

class AddQuoteForm extends Component {
  /**
   * When the form is submitted, we call the handleQuoteSubmit method passed
   * down from App. The input boxes get their values from the props we passed
   * down from App and every time we add a character to the inputs, we call
   * a method that will set the corresponding state in App.
   */
  render() {
    return (
      <form
        className="add-quote-form"
        onSubmit={this.props.handleQuoteSubmit}
      >
        <input
          type="text"
          value={this.props.inputContentValue}
          name='content'
          placeholder='Add Quote Here'
          onChange={this.props.handleInputContentChange}
        /><br/>
        <input
          type="text"
          value={this.props.inputAuthorValue}
          name='author'
          placeholder='Add Author Here'
          onChange={this.props.handleInputAuthorChange}
        /><br/>
        <input
          type="text"
          value={this.props.inputGenreValue}
          name='genre_type'
          placeholder='Add Genre Here'
          onChange={this.props.handleInputGenreChange}
        /><br/>
        <input type="submit" value="Add Quote!" />
      </form>
    );
  }
}

export default AddQuoteForm;
