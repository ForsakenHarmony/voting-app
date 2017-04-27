import Portal from 'preact-portal';
import cx from 'classnames';

const Modal = ({ open, children, close }) => (
  <Portal into="body">
    <div class={cx('modal', open && 'is-active')}>
      <div class="modal-background" onClick={close}></div>
      <div class="modal-content">
        {children}
      </div>
    </div>
  </Portal>
);

export default Modal;
