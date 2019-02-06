import * as React from "react";
import PropTypes from 'prop-types';

export default function DraggableDispatch(props) {
    const style = { 
        backgroundColor: props.dispatch.color
    };

    if (props.type === 0) {
        return (<div className='draggable-item' style={style}>
            <div>{props.dispatch.title}</div>
        </div>);
    }
    return (<div className='draggable-item' style={style}>
        <div>{props.dispatch.title}aaa</div>
    </div>);
}

DraggableDispatch.propTypes = {
    type: PropTypes.number, // 0: Unassigned, 1: Assigned
    dispatch: PropTypes.oneOfType([
        PropTypes.shape({
            title: PropTypes.string,
            invoice_no: PropTypes.string,
            line_item: PropTypes.string,
            expected_delivery_time: PropTypes.string,
            expected_ext_time: PropTypes.string,
            delivery_address: PropTypes.string,
            color: PropTypes.string
        }),
        PropTypes.shape({
            title: PropTypes.string,
            invoice_no: PropTypes.string,
            line_item: PropTypes.string,
            payment_gateway: PropTypes.string,
            payment_type: PropTypes.string,
            delivery_address: PropTypes.string
        })
    ])
}
