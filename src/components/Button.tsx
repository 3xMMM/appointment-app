import './Button.css';
import { forwardRef, MouseEventHandler } from 'react';

type ButtonProps = {
    hierarchy?: 'Primary' | 'Secondary' | 'Tertiary'
    isDestructive?: boolean
    children: string
    type?: "button" | "reset" | "submit"
    onClick?: MouseEventHandler<HTMLButtonElement>
}

export default forwardRef<HTMLButtonElement, ButtonProps>(function Button({ hierarchy = 'Secondary', isDestructive = false, children, onClick}, ref) {
    return (
        <button
            ref={ref}
            className={`Button${hierarchy}${isDestructive ? ' ButtonDestructive' : ''}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
});