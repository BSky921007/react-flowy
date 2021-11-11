import { ArrowProps } from '../types';

const Arrow = (props: ArrowProps) => {
    const {line, triangle} = props.data;
    return (
        <div className="arrowblock" style={{opacity: `${props.isSelected? 0.5:1}`}}>
            <input type="hidden" className="arrowid" value="10" />
            <svg preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d={line} stroke="#C5CCD0" strokeWidth="2px"/>
            <path d={triangle} fill="#C5CCD0"/>
            </svg>
        </div>
    );
};

export default Arrow;
