import React from 'react';
import PropTypes from 'prop-types';
import LandingCarouselItem from './LandingCarouselItem';

/**
 * Landing page carousel, displaying an infinitely scrolling wall of items.
 *
 * @param {{ itemProps: { contentType: 'image' | 'text', data: string }[], reverse: bool }} props
 */
const LandingCarousel = ({ itemProps, reverse }) => {
  const offsets = Array.from({ length: itemProps.length }, () => Math.floor(Math.random() * 100));
  const items = reverse ? itemProps.reverse() : itemProps;

  return (
    <div id="landing-carousel">
      <div className="landing-carousel-track" style={{ animationDirection: reverse ? 'reverse' : 'normal' }}>
        {items.slice().map(({ contentType, data }, i) => (
          <LandingCarouselItem key={i} contentType={contentType} data={data} offset={offsets[i]} />
        ))}
      </div>
      <div className="landing-carousel-track" style={{ animationDirection: reverse ? 'reverse' : 'normal' }}>
        {items.slice().map(({ contentType, data }, i) => (
          <LandingCarouselItem key={i} contentType={contentType} data={data} offset={offsets[i]} />
        ))}
      </div>
    </div>
  );
};

LandingCarousel.propTypes = {
  itemProps: PropTypes.arrayOf(
    PropTypes.shape({
      contentType: PropTypes.oneOf(['image', 'text']),
      data: PropTypes.string,
    }),
  ),
  reverse: PropTypes.bool,
};

LandingCarousel.defaultProps = {
  itemProps: [
    {
      contentType: 'text',
      data: 'Manoa Link',
    },
    {
      contentType: 'text',
      data: 'Item 2',
    },
    {
      contentType: 'image',
      data: '/images/sample-image-landscape.png',
    },
    {
      contentType: 'image',
      data: '/images/sample-image-landscape.png',
    },
    {
      contentType: 'image',
      data: '/images/sample-image-landscape.png',
    },
    {
      contentType: 'image',
      data: '/images/sample-image-landscape.png',
    },
  ],
  reverse: false,
};

export default LandingCarousel;
