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
            variant="dark"
            className="text-uppercase"
            onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="light"
            className="text-uppercase"
            onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
