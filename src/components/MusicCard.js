import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { music } = this.props;

    return (
      <div>
        <h2 data-testid="track-name">
          { music.trackName }
        </h2>
        <audio
          data-testid="audio-component"
          src={ `previewUrl ${music.previewUrl}` }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.string.isRequired,
};

export default MusicCard;
