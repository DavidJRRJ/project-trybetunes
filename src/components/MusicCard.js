import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      inputFav: false,
      loading: true,
    };
  }

  componentDidMount() {
    this.setFavorites();
  }

  addFavorites = async () => {
    const { music } = this.props;
    await addSong(music.trackId);
    this.setState({ loading: false });
  }

  removeFavorites = async () => {
    const { music } = this.props;
    await removeSong(music.trackId);
    this.setState({ loading: false });
  }

  setFavorites = async () => {
    const { music } = this.props;
    const data = await getFavoriteSongs();
    this.setState({
      loading: true,
    }, () => {
      this.setState({
        inputFav: data.some((trackId) => trackId === music.trackId),
        loading: false,
      });
    });
  }

  onChange = ({ target }) => {
    this.setState({
      loading: true,
      inputFav: target.checked,
    }, () => {
      if (target.checked === true) {
        this.addFavorites();
      } else if (target.checked === false) {
        this.removeFavorites();
      }
    });
  }

  render() {
    const { inputFav, loading } = this.state;
    const { music } = this.props;
    return (
      <div>
        {loading ? <Loading /> : (
          <div>
            <p>{music.trackName}</p>
            <audio data-testid="audio-component" src={ music.previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>Audio</code>
            </audio>
            <label
              htmlFor={ music.trackId }
              data-testid={ `checkbox-music-${music.trackId}` }
            >
              Favorita
              <input
                id={ music.trackId }
                type="checkbox"
                onChange={ this.onChange }
                checked={ inputFav }
              />
            </label>
          </div>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.string.isRequired,
};

export default MusicCard;
