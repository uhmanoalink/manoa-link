import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FilesCollection } from 'meteor/ostrio:files';
import { Alert, Button, Form, Image, OverlayTrigger, Popover } from 'react-bootstrap';
import { Images } from '../../api/image/Image';
import { insertFileToFilesCollection, verifyFileType } from '../../../lib/files';

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
 *   fc: FilesCollection
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
const FileUpload = ({ fc, label, accept, buttonVariant, customButton, onUpload }) => {
  const [inputFile, setInputFile] = useState(null);
  const [alertMsg, setAlertMsg] = useState();
  const [showAlert, setShowAlert] = useState(false);

  const alert = (msg) => {
    setAlertMsg(msg);
    setShowAlert(true);
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
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!verifyFileType(inputFile, accept)) {
      throw new Error(`The file type of ${inputFile.name} is not a valid type`);
    }
    try {
      const fileObj = await insertFileToFilesCollection(fc, inputFile);
      onUpload?.(fileObj);
    } catch (err) {
      alert(`There was a problem while uploading file ${inputFile.name}`);
    }
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
  fc: PropTypes.instanceOf(FilesCollection),
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
  fc: Images.filesCollection,
  label: 'Upload an image',
  accept: 'image/png, image/jpeg',
  buttonVariant: 'dark',
  customButton: undefined,
  onUpload: undefined,
};

export default FileUpload;
