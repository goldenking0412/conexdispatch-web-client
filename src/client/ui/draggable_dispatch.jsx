import * as React from "react";
import PropTypes from 'prop-types';

export default class DraggableDispatch extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        e.stopPropagation();
        console.log("Please open modify dialog", e);
    }

    render() {
        const unassigned_style = { 
            borderColor: this.props.dispatch.color,
            backgroundColor: this.props.dispatch.color
        };
        const assigned_style = {
            borderColor: this.props.dispatch.color,
            background: `-webkit-linear-gradient(left, 
                ${this.props.dispatch.color} 0%, 
                ${this.props.dispatch.color} ${this.props.dispatch.delivery_progress}, 
                #ffffff ${this.props.dispatch.delivery_progress}, 
                #ffffff ${this.props.dispatch.delivery_progress}, 
                #ffffff 100%)`
        }
        let content;
        let style;

        if (this.props.unassigned) {
            style = unassigned_style;
            let paid_status_class;
            if (this.props.dispatch.payment_status === "paid") {
                paid_status_class = "paid";
            }
            else if (this.props.dispatch.payment_status === "partial-paid") {
                paid_status_class = "partial-paid";
            }
            else if (this.props.dispatch.payment_status === "unpaid") {
                paid_status_class = "unpaid";
            }
            content = (
                <div>
                    <span>{this.props.dispatch.title}, </span>
                    <span>{this.props.dispatch.invoice_no} {this.props.dispatch.line_item}</span>
                    <span className={paid_status_class}>
                        <span className="float-right">$</span>
                        <span className="float-right">{this.props.dispatch.payment_gateway}&nbsp;</span>
                    </span>
                </div>);
        }
        else {

            // This means this dispatch is assigned
            style = assigned_style;
            if (this.props.view_type === 0) {
                content = (<div>
                    <div>
                        <span>{this.props.dispatch.title},&nbsp;</span>
                        <span>{this.props.dispatch.invoice_no}&nbsp;</span>
                        <span>{this.props.dispatch.line_item},&nbsp;</span>
                        <span>{this.props.dispatch.expected_delivery_time}<br /></span>
                    </div>
                    <div className="dispatch-details">
                        <span>{this.props.dispatch.expected_ext_time},&nbsp;</span>
                        <span>{this.props.dispatch.delivery_address}</span>
                    </div>
                </div>);
            }
            else {
                content = (<div>
                    <span>{this.props.dispatch.title},&nbsp;</span>
                    <span>{this.props.dispatch.invoice_no}&nbsp;</span>
                    <span>{this.props.dispatch.line_item},&nbsp;</span>
                    <span>{this.props.dispatch.expected_delivery_time}<br /></span>
                </div>);
            }
        }
        return (<div className='draggable-item' style={style} onClick={this.handleClick}>
            {content}
        </div>);
    }
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
