import './Card.css';
import { ReactElement } from 'react';

type CardProps = {
    label: string
    subLabel?: string
    children?: ReactElement
    actions?: ReactElement
    highlight?: boolean
    opaque?: boolean
}

export default function Card({ label, subLabel, children, actions, highlight = false, opaque = false }: CardProps) {
    return (
        <div className={`Card${highlight ? ' Highlight' : ''}${opaque ? ' Opaque' : ''}`}>
            <div className='PrimaryLabel'>{ label }</div>
            <div className='SecondaryLabel'>{ subLabel }</div>
            <div className='Body'>
                { children }
            </div>
            <div className='Actions'>
                { actions }
            </div>
        </div>
    );
}