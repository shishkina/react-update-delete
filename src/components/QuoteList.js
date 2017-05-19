import React, { Component } from 'react';
import Quote from './Quote.js';

class QuoteList extends Component {
  render() {
    return (
      <ul className="quote-list">
        {this.props.quotes.map((quote) => {
          return (
            <Quote
              key={quote.id}
              quote={quote}
              handleDeleteQuote={this.props.handleDeleteQuote}
              handleQuoteEdit={this.props.handleQuoteEdit}
            />
          )
        })}
      </ul>
    );
  }
}

export default QuoteList;
