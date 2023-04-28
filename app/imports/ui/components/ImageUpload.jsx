import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Images } from '../../api/image/Image';

/** @type { React.FC<{ onUpload: VoidFunction }> } */
const ImageUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);

  /** @type {React.ChangeEventHandler<HTMLInputElement>} */
  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  /** @type {React.MouseEventHandler<HTMLButtonElement>} */
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append(
      'file',
      file,
      file.name,
    );
    if (!/image\/.*/.test(file.type)) {
      throw new Error('The given file was not an image');
    }
    await new Promise((res, rej) => {
      const uploader = Images.filesCollection.insert({
        file: file,
      });
      uploader.on('uploaded', () => {
        // Upload was successful
        onUpload();
        res();
      });
      uploader.on('error', () => {
        // Upload was unsuccessful
        rej();
      });
    });
  };

  return (
    <div className="image-upload">
      <label htmlFor="pfp-upload">Upload a profile picture
        <br />
        <input
          type="file"
          name="pfp"
          id="pfp-upload"
          accept="image/png, image/jpeg"
          onChange={onFileChange}
        />
      </label>
      <br />
      <button type="submit" onClick={handleUpload}>Upload</button>
      { file ? <p>File Name: {file.name}</p> : undefined }
    </div>
  );
};

ImageUpload.propTypes = {
  onUpload: PropTypes.func,
};

ImageUpload.defaultProps = {
  onUpload: undefined,
};

export default ImageUpload;
