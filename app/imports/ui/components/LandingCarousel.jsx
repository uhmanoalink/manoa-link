import React from 'react';
import PropTypes from 'prop-types';
import LandingCarouselItem from './LandingCarouselItem';

/**
 * Landing page carousel, displaying an infinitely scrolling wall of items.
 *
 * @param {{ itemProps: { contentType: 'image' | 'text', data: string }[] }} props
 */
const LandingCarousel = ({ itemProps }) => {
  const sampleData = itemProps ?? [
    {
      contentType: 'text',
      data: 'test',
    },
    {
      contentType: 'text',
      data: 'test2',
    },
    {
      contentType: 'text',
      data: 'test3',
    },
  ];

  return (
    <div id="landing-carousel">
      {sampleData.map(({ contentType, data }, index) => (
        <LandingCarouselItem key={index} contentType={contentType} data={data} />
      ))}
    </div>
  );
};

LandingCarousel.propTypes = {
  itemProps: PropTypes.arrayOf(
    PropTypes.shape({
      contentType: PropTypes.oneOf(['image', 'text']),
      data: PropTypes.string,
    }),
  ).isRequired,
};

export default LandingCarousel;
