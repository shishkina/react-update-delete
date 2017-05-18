import React, { Component } from 'react';

class Quote extends Component {
  render() {
    return (
      <li className="quote">
        <h2>{this.props.quote.author}</h2>
        <p>Content: {this.props.quote.content}</p>
        <p>Genre: {this.props.quote.genre_type}</p>
      </li>
    );
  }
}

export default Quote;
