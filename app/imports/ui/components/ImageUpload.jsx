import React, { useState } from 'react';
import { Images } from '../../api/image/Image';

const ImageUpload = () => {
  const [file, setFile] = useState(null);

  /** @type {React.ChangeEventHandler<HTMLInputElement>} */
  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  /** @type {React.MouseEventHandler<HTMLButtonElement>} */
  const handleUpload = () => {
    const formData = new FormData();
    formData.append(
      'file',
      file,
      file.name,
    );
    Images.filesCollection.insert({
      file: file,
    });
    console.log('uploading');
  };

  return (
    <>
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
      {
        file ? (
          <div>
            <h2>File Details:</h2>
            <p>File Name: {file.name}</p>
            <p>File Type: {file.type}</p>
            <p>
              Last Modified: {file.lastModifiedDate.toDateString()}
            </p>
          </div>
        ) : (
          <div>
            <h4>Upload something to see it</h4>
          </div>
        )
      }

    </>
  );
};

export default ImageUpload;
