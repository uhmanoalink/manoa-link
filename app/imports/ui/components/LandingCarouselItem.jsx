import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';

/**
 * Individual items to be displayed on the landing page carousel.
 *
 * @param {{ contentType: 'image' | 'text', data: string, offset: number }} props
 */
const LandingCarouselItem = ({ contentType, data, offset }) => {
  const itemType = contentType;

  const createImage = () => <Image src={data} width="250x" />;

  const createText = () => <h3>{data}</h3>;

  return (
    <div className="landing-carousel-item" style={{ marginLeft: offset }}>
      {itemType === 'image' && createImage()}
      {itemType === 'text' && createText()}
    </div>
  );
};

LandingCarouselItem.propTypes = {
  contentType: PropTypes.oneOf(['image', 'text']).isRequired,
  data: PropTypes.string.isRequired,
  offset: PropTypes.number.isRequired,
};

export default LandingCarouselItem;
