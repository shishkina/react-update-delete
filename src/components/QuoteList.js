import React, { Component } from 'react';
import Quote from './Quote.js';

class QuoteList extends Component {
  render() {
    return (
      <ul className="quote-list">
        {/**
         * In this component we simply take the quotes array and map over it.
         * For each quote we return a Quote component. The key has to be unique
         * so we can just use the quote's id, which is its primary key in the
         * db. We also pass it the quote data and the delete and edit methods.
         * The map itself returns an array of Quote components which React then
         * renders.
         */}
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
