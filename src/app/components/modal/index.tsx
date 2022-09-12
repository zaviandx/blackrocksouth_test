import {ReactElement, ReactNode} from "react";
import './index.scss'

interface IModalProps {
    open?: boolean,
    children?: ReactNode,
    onDismiss?: () => void
}

const Modal = ({ open, children, onDismiss = () => {} }: IModalProps): ReactElement | null => {
    return open ? (
        <div className='modal-wrapper'>
            <div className='modal'>
                <div className='modal-body'>
                    {children}
                </div>
                <button className='modal-close' onClick={onDismiss}>Close</button>
            </div>
        </div>
    ) : null
}

export default Modal
