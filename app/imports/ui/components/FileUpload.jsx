import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Images } from '../../api/image/Image';

/**
 * ## ImageUpload component
 *
 * Adds an image input that adds an image to MongoDB.
 *
 * ### Props
 *
 * - `label` (optional):
 * The label of the file input.
 *   - Default value: 'Upload an image'
 *
 * - `accept` (optional):
 * The accepted types of the file input.
 *   - Default value: 'image/*'
 *   - For more info: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept
 *
 * - `variant` (optional):
 * The style of the FileUpload component. The value places the label and button.
 *   - Accepted values: 'top' | 'bottom'
 *   - Default value: 'bottom'
 *
 * - `customButton` (optional):
 * You can use a custom component to handle the submission. The custom button should not
 * have an `onClick` already defined.
 *
 * - `onUpload` (optional):
 * An optional callback function that is called when the upload is successful.
 *
 * ---
 *
 * @type { React.FC<{
 *   label: string;
 *   accept: string;
 *   variant: 'top'|'bottom';
 *   customButton: React.ReactNode;
 *   onUpload: VoidFunction;
 * }> }
 */
const FileUpload = ({ label, accept, variant, customButton, onUpload }) => {
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
    <div className="file-upload">
      {variant === 'top' ? (
        <>
          {customButton ? <customButton onClick={handleUpload} /> : <button type="submit" onClick={handleUpload}>Upload</button>}
          <br />
        </>
      ) : undefined}
      <label htmlFor="pfp-upload">
        {variant === 'top' ? label : undefined}
        <br />
        <input
          type="file"
          id="file-upload"
          accept={accept}
          onChange={onFileChange}
        />
        {variant === 'bottom' ? undefined : label}
      </label>
      {variant === 'bottom' ? undefined : (
        <>
          <br />
          {customButton ? <customButton onClick={handleUpload} /> : <button type="submit" onClick={handleUpload}>Upload</button>}
        </>
      )}
      { file ? <p>File Name: {file.name}</p> : undefined }
    </div>
  );
};

FileUpload.propTypes = {
  label: PropTypes.string,
  accept: PropTypes.string,
  variant: PropTypes.oneOf('top', 'bottom'),
  customButton: PropTypes.elementType,
  onUpload: PropTypes.func,
};

FileUpload.defaultProps = {
  label: 'Upload an image',
  accept: 'image/*',
  variant: 'bottom',
  customButton: undefined,
  onUpload: undefined,
};

export default FileUpload;
