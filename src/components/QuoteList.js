import React, { Component } from 'react';
import Quote from './Quote.js';

class QuoteList extends Component {
  render() {
    return (
      <ul className="quote-list">
        {this.props.quotes.map((quote) => {
          return (
            <Quote key={quote.id} quote={quote} />
          )
        })}
      </ul>
    );
  }
}

export default QuoteList;
