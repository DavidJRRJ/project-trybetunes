import React from 'react';
import AlbumCard from '../components/AlbumCard';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      isButtonDisabled: true,
      valuePesq: '',
      artistaPesq: '',
      searchResult: [],
      loading: false,
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

  searchA = () => {
    const { valuePesq } = this.state;
    this.setState({
      loading: true,
      isButtonDisabled: true,
      artistaPesq: valuePesq,

    }, async () => {
      this.setState({
        loading: false,
        searchResult: await searchAlbumsAPI(valuePesq),
        valuePesq: '',
      });
    });
  }

  render() {
    const {
      valuePesq,
      isButtonDisabled,
      loading,
      searchResult,
      artistaPesq,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {loading ? <Loading /> : (
          <section>
            <input
              type="text"
              data-testid="search-artist-input"
              placeholder="Cantor ou Banda"
              value={ valuePesq }
              onChange={ this.handleChange }
            />
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ isButtonDisabled }
              onClick={ this.searchA }
            >
              Pesquisar
            </button>
          </section>
        )}
        {artistaPesq && (
          <section>
            <p>{`Resultado de álbuns de: ${artistaPesq}`}</p>
            {searchResult.length === 0 ? <h1>Nenhum álbum foi encontrado</h1> : (
              searchResult.map((info) => (
                <div key={ info.collectionId }>
                  <AlbumCard
                    collectionName={ info.collectionName }
                    img={ info.artworkUrl100 }
                    artistName={ info.artistName }
                    id={ info.collectionId }
                  />
                </div>
              ))
            )}
          </section>
        )}
      </div>
    );
  }
}

export default Search;
