import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      lista: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.extractMusic();
  }

  extractMusic = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const data = await getMusics(id);
    this.setState({
      lista: data,
      loading: false,
    });
  }

  render() {
    const { lista, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {loading ? <Loading /> : (
          lista && (
            <div>
              <h2 data-testid="artist-name">{ lista[0].artistName }</h2>
              <h2 data-testid="album-name">{ lista[0].collectionName }</h2>
              <section>
                { lista.slice(1).map((music, index) => (
                  <MusicCard key={ index } music={ music } />
                ))}
              </section>
            </div>
          )
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
