import Portal from 'preact-portal';

const Modal = ({ open, children, close }) => (
  <Portal into="body">
    {open && [
      <div className="modal is-active">
        <div className="modal-background" onClick={close}></div>
        <div className="modal-content">
          {children}
        </div>
      </div>,
    ]}
  </Portal>
);

export default Modal;
