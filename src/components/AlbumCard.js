import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

class AlbumCard extends React.Component {
  render() {
    const { collectionName, img, artistName, id } = this.props;
    return (
      <>
        <img src={ img } alt={ collectionName } />
        <h3>{collectionName}</h3>
        <p>{artistName}</p>
        <Link to={ `/album/${id}` } data-testid={ `link-to-album-${id}` }>ouvir</Link>
      </>
    );
  }
}

AlbumCard.propTypes = {
  collectionName: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default AlbumCard;
