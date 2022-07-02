import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      isButtonDisabled: true,
      valuePesq: '',
    };
  }

  nameCondition = () => {
    const { valuePesq } = this.state;
    const letrasMin = 2;
    this.setState({ isButtonDisabled: valuePesq.length < letrasMin });
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({ valuePesq: value }, this.nameCondition);
  }

  render() {
    const { valuePesq, isButtonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <input
          data-testid="search-artist-input"
          type="text"
          value={ valuePesq }
          onChange={ this.handleChange }
        />
        <button
          data-testid="search-artist-button"
          type="button"
          disabled={ isButtonDisabled }
        >
          Procurar
        </button>
      </div>
    );
  }
}

export default Search;
