import * as React from "react";
import PropTypes from 'prop-types';
import DraggableDispatch from './draggable_dispatch';

export default function DraggableContainer(props) {
    const content = [];
    const dispatches = props.dispatches;
    for (let i = 0; i < dispatches.length; i+=1) {
        content.push(
            <DraggableDispatch 
              key={i}
              type={props.type}
              dispatch={dispatches[i]}
            />
        )
    }

    if (props.type === 0) {
        return (<div className='draggable-container'>
            {content}
        </div>);
    }
    return (<div className='draggable-container'>
        {content}
    </div>);
}

DraggableContainer.propTypes = {
    type: PropTypes.number, // 0: Unassigned, 1: Assigned
    dispatches: PropTypes.oneOfType([
        PropTypes.arrayOf(
            PropTypes.shape({
                title: PropTypes.string,
                invoice_no: PropTypes.string,
                line_item: PropTypes.string,
                expected_delivery_time: PropTypes.string,
                expected_ext_time: PropTypes.string,
                delivery_address: PropTypes.string,
                color: PropTypes.string
            })
        ),
        PropTypes.arrayOf(
            PropTypes.shape({
                title: PropTypes.string,
                invoice_no: PropTypes.string,
                line_item: PropTypes.string,
                payment_gateway: PropTypes.string,
                payment_type: PropTypes.string,
                delivery_address: PropTypes.string
            })
        )
    ])
}
