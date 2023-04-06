import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';

/**
 * Individual items to be displayed on the landing page carousel.
 *
 * @param {{ contentType: 'image' | 'text', data: string }} props
 */
const LandingCarouselItem = ({ contentType, data }) => {
  const itemType = contentType;

  const createImage = () => <Image src={data} />;

  const createText = () => <h3>{data}</h3>;

  return (
    <div>
      {itemType === 'image' && createImage()}
      {itemType === 'text' && createText()}
    </div>
  );
};

LandingCarouselItem.propTypes = {
  contentType: PropTypes.oneOf(['image', 'text']).isRequired,
  data: PropTypes.string.isRequired,
};

export default LandingCarouselItem;
