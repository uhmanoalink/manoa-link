import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Images } from '../../api/image/Image';
import ImageUpload from '../components/ImageUpload';

const TestPage = () => {
  const { images, ready } = useTracker(() => {
    const subscription = Meteor.subscribe(Images.allImagesPublication);
    const rdy = subscription.ready();
    const items = Images.collection.find({}).fetch();
    return {
      images: items,
      ready: rdy,
    };
  }, []);

  return (
    <>
      <h1>A test page</h1>
      <h2>Image Upload test</h2>
      <ImageUpload />
      <h3>All images</h3>
      {ready ? images.map(image => {
        console.log(image);
        console.log(Images.filesCollection.link(image));
        return <img alt="sample" src={Images.filesCollection.link(image)} />;
      }) : undefined}
    </>
  );
};

export default TestPage;
