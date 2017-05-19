import React, { Component } from 'react';

class AddQuoteForm extends Component {
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
          name='genre_id'
          placeholder='Add Genre Here'
          onChange={this.props.handleInputGenreChange}
        /><br/>
        <button>Add Quote!</button>
      </form>
    );
  }
}

export default AddQuoteForm;
