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
          <Modal.Title className="text-uppercase">{headingText}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{bodyText}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            className="text-uppercase fw-semibold text-white px-4"
            onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="dark"
            className="text-uppercase fw-semibold px-4"
            onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
