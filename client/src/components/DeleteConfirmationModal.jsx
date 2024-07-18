import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function DeleteConfirmationModal({
  showModal,
  setShowModal,
  headingText,
  bodyText,
  onClose,
  onDelete,
}) {
  const handleClose = () => setShowModal(false);
  const handleDelete = () => {
    onDelete();
    handleClose();
  };

  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{headingText}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{bodyText}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            className="text-white px-4"
            onClick={handleClose}>
            Close
          </Button>
          <Button variant="dark" className="px-4" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
