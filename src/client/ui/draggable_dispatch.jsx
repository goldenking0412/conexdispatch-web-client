import * as React from "react";
import PropTypes from 'prop-types';

export default function DraggableDispatch(props) {
    const unassigned_style = { 
        borderColor: props.dispatch.color,
        backgroundColor: props.dispatch.color
    };
    const assigned_style = {
        borderColor: props.dispatch.color,
        background: `-webkit-linear-gradient(left, 
            ${props.dispatch.color} 0%, 
            ${props.dispatch.color} ${props.dispatch.delivery_progress}, 
            #ffffff ${props.dispatch.delivery_progress}, 
            #ffffff ${props.dispatch.delivery_progress}, 
            #ffffff 100%)`
    }

    if (props.unassigned) {
        let paid_status_class;
        if (props.dispatch.payment_status === "paid") {
            paid_status_class = "paid";
        }
        else if (props.dispatch.payment_status === "partial-paid") {
            paid_status_class = "partial-paid";
        }
        else if (props.dispatch.payment_status === "unpaid") {
            paid_status_class = "unpaid";
        }
        return (<div className='draggable-item' style={unassigned_style}>
            <span>{props.dispatch.title}, </span>
            <span>{props.dispatch.invoice_no} {props.dispatch.line_item}</span>
            <span className={paid_status_class}>
                <span className="float-right">$</span>
                <span className="float-right">{props.dispatch.payment_gateway}&nbsp;</span>
            </span>
        </div>);
    }

    // This means this dispatch is assigned
    if (props.view_type === 0) {
        return (<div className='draggable-item' style={assigned_style}>
            <div>
                <span>{props.dispatch.title},&nbsp;</span>
                <span>{props.dispatch.invoice_no}&nbsp;</span>
                <span>{props.dispatch.line_item},&nbsp;</span>
                <span>{props.dispatch.expected_delivery_time}<br /></span>
            </div>
            <div className="dispatch-details">
                <span>{props.dispatch.expected_ext_time},&nbsp;</span>
                <span>{props.dispatch.delivery_address}</span>
            </div>
        </div>);
    }
    return (<div className='draggable-item' style={assigned_style}>
        <div>
            <span>{props.dispatch.title},&nbsp;</span>
            <span>{props.dispatch.invoice_no}&nbsp;</span>
            <span>{props.dispatch.line_item},&nbsp;</span>
            <span>{props.dispatch.expected_delivery_time}<br /></span>
        </div>
    </div>);
}

DraggableDispatch.propTypes = {
    unassigned: PropTypes.bool, // 0: Unassigned, 1: Assigned
    dispatch: PropTypes.oneOfType([
        PropTypes.shape({
            title: PropTypes.string,
            invoice_no: PropTypes.string,
            line_item: PropTypes.string,
            expected_delivery_time: PropTypes.string,
            expected_ext_time: PropTypes.string,
            delivery_address: PropTypes.string,
            color: PropTypes.string,
            delivery_progress: PropTypes.string
        }),
        PropTypes.shape({
            title: PropTypes.string,
            invoice_no: PropTypes.string,
            line_item: PropTypes.string,
            payment_gateway: PropTypes.string,
            payment_status: PropTypes.string,
            delivery_address: PropTypes.string
        })
    ]),
    view_type: PropTypes.number
}
