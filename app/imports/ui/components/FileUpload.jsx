import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Form, Image, OverlayTrigger, Popover } from 'react-bootstrap';
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
 *   - Default: 'Upload an image'
 *
 * - `accept` (optional):
 * The accepted types of the file input.
 *   - Default: 'image/png, image/jpeg'
 *   - For more info: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept
 *
 * - `buttonVariant` (optional):
 * The variant of the Bootstrap submit button.
 *   - Default: 'dark'
 *   - For more info: https://react-bootstrap.netlify.app/docs/components/buttons/
 *
 * - `customButton` (optional):
 * You can use a custom component to handle the submission. The custom button is passed as
 * a child to the Button component.
 *
 * - `onUpload` (optional):
 * An optional callback function that is called when the upload is successful.
 *
 * ---
 *
 * @type { React.FC<{
 *   label: string;
 *   accept: string;
 *   buttonVariant:
 *     | 'primary' | 'secondary' | 'success'
 *     | 'danger'  | 'warning'   | 'info'
 *     | 'dark'    | 'light'     | 'link'
 *     | 'outline-primary'       | 'outline-secondary'
 *     | 'outline-success'       | 'outline-danger'
 *     | 'outline-warning'       | 'outline-info'
 *     | 'outline-dark'          | 'outline-light';
 *   customButton: React.ReactNode;
 *   onUpload: (fileRef: object) => void;
 * }> }
 */
const FileUpload = ({ label, accept, buttonVariant, customButton, onUpload }) => {
  const [inputFile, setInputFile] = useState(null);
  const [alertMsg, setAlertMsg] = useState();
  const [showAlert, setShowAlert] = useState(false);

  const alert = (msg) => {
    setAlertMsg(msg);
    setShowAlert(true);
  };

  const verifyFileType = (file, acceptString) => {
    // https://stackoverflow.com/questions/20524306/check-selected-file-matches-accept-attribute-on-an-input-tag
    const acceptedTypes = acceptString.toLowerCase().split(',').map(type => type.trim());
    const fileType = file.type.toLowerCase();
    return acceptedTypes.some(type => type === fileType
      || type === `${fileType.split('/')[0]}/*`
      || type === `.${fileType.split('/')[1]}`);
  };

  /** @type {React.ChangeEventHandler<HTMLInputElement>} */
  const handleChangeFile = (e) => {
    if (e.target.files.length === 0) {
      alert();
      return;
    }
    const newFile = e.target.files[0];
    if (verifyFileType(newFile, accept)) {
      alert();
    } else {
      alert(`The file type of ${newFile.name} is not a valid type`);
    }
    setInputFile(newFile);
  };

  /** @type {React.MouseEventHandler<HTMLButtonElement>} */
  const handleUpload = async () => {
    if (!verifyFileType(inputFile, accept)) {
      throw new Error(`The file type of ${inputFile.name} is not a valid type`);
    }
    await new Promise((res, rej) => {
      const uploader = Images.filesCollection.insert({
        file: inputFile,
      });
      const handleError = (error, file) => {
        alert(`There was a problem while uploading file ${file.name}`);
        console.error(error);
        rej();
      };
      uploader.on('uploaded', (error, fileObj) => {
        if (error) handleError(error, fileObj);
        // Upload was successful
        console.log(`File ${fileObj.name} was uploaded successfully`);
        onUpload?.(fileObj);
        res();
      });
      uploader.on('error', (error, fileObj) => {
        // Upload was unsuccessful
        if (error) handleError(error, fileObj);
      });
    });
  };

  return (
    <div className="file-upload">
      <Form.Group>
        <Form.Label>
          {label}
          <OverlayTrigger
            placement="bottom"
            overlay={inputFile?.type.startsWith('image') ? (
              <Popover>
                <Popover.Body>
                  <Image
                    alt="preview"
                    src={URL.createObjectURL(inputFile)}
                    width={100}
                  />
                </Popover.Body>
              </Popover>
            ) : <div />}
          >
            <Form.Control
              type="file"
              accept={accept}
              onChange={handleChangeFile}
            />
          </OverlayTrigger>
        </Form.Label>
      </Form.Group>
      {showAlert && alertMsg && (
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          {alertMsg}
        </Alert>
      )}
      <Button variant={buttonVariant} type="submit" onClick={handleUpload}>{customButton || 'Upload'}</Button>
    </div>
  );
};

FileUpload.propTypes = {
  label: PropTypes.string,
  accept: PropTypes.string,
  buttonVariant: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'dark',
    'light',
    'link',
    'outline-primary',
    'outline-secondary',
    'outline-success',
    'outline-danger',
    'outline-warning',
    'outline-info',
    'outline-dark',
    'outline-light',
  ]),
  customButton: PropTypes.elementType,
  onUpload: PropTypes.func,
};

FileUpload.defaultProps = {
  label: 'Upload an image',
  accept: 'image/png, image/jpeg',
  buttonVariant: 'dark',
  customButton: undefined,
  onUpload: undefined,
};

export default FileUpload;
