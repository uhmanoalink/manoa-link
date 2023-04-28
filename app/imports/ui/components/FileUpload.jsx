import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Images } from '../../api/image/Image';

/**
 * ## FileUpload component
 *
 * A component that uploads a file to MongoDB.
 *
 * ### Props
 *
 * - `label` (optional):
 * The label of the file input.
 *   - Default value: 'Upload an image'
 *
 * - `accept` (optional):
 * The accepted types of the file input.
 *   - Default value: 'image/png, image/jpeg'
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
  const [inputFile, setInputFile] = useState(null);
  const [warning, setWarning] = useState();

  const verifyFileType = (file, acceptString) => {
    // https://stackoverflow.com/questions/20524306/check-selected-file-matches-accept-attribute-on-an-input-tag
    const acceptedTypes = acceptString.toLowerCase().split(',').map(type => type.trim());
    console.log(acceptedTypes);
    const fileType = file.type.toLowerCase();
    console.log(fileType);
    return acceptedTypes.some(type => type === fileType || type === `${fileType.split('/')[0]}/*`);
  };

  /** @type {React.ChangeEventHandler<HTMLInputElement>} */
  const handleChangeFile = (e) => {
    const newFile = e.target.files[0];
    if (verifyFileType(newFile, accept)) {
      setWarning();
    } else {
      setWarning('The file type does not match');
    }
    setInputFile(newFile);
  };

  /** @type {React.MouseEventHandler<HTMLButtonElement>} */
  const handleUpload = async () => {
    if (!verifyFileType(inputFile, accept)) {
      throw new Error('The file type does not match');
    }
    await new Promise((res, rej) => {
      const uploader = Images.filesCollection.insert({
        file: inputFile,
      });
      uploader.on('uploaded', () => {
        // Upload was successful
        console.log('Upload was successful');
        onUpload?.();
        res();
      });
      uploader.on('error', () => {
        // Upload was unsuccessful
        console.log('Upload was unsuccessful');
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
        <input
          type="file"
          id="file-upload"
          accept={accept}
          onChange={handleChangeFile}
        />
        <div className="warning">{warning}</div>
        {variant === 'bottom' ? label : undefined}
      </label>
      {variant === 'bottom' ? (
        <>
          <br />
          {customButton ? <customButton onClick={handleUpload} /> : <button type="submit" onClick={handleUpload}>Upload</button>}
        </>
      ) : undefined}
    </div>
  );
};

FileUpload.propTypes = {
  label: PropTypes.string,
  accept: PropTypes.string,
  variant: PropTypes.oneOf(['top', 'bottom']),
  customButton: PropTypes.elementType,
  onUpload: PropTypes.func,
};

FileUpload.defaultProps = {
  label: 'Upload an image',
  accept: 'image/png, image/jpeg',
  variant: 'bottom',
  customButton: undefined,
  onUpload: undefined,
};

export default FileUpload;
