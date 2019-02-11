import * as React from "react";
import PropTypes from 'prop-types';
import classnames from "classnames";

export default class DraggableDispatch extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        e.stopPropagation();
        alert("Please open modify dialog");
        console.log("Please open modify dialog", e);
    }

    render() {
        const unassigned_style = {
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

        const assigned_wrapper_style = {
            borderColor: this.props.dispatch.color
        }
        let style;
        let content;
        let wrapper_div_classes;

        if (this.props.unassigned) {
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

            if (this.props.dispatch.ready === "true") {
                wrapper_div_classes = classnames("draggable-item", "unassigned", "ready");
            }
            else {
                wrapper_div_classes = classnames("draggable-item", "unassigned");
            }

            content = (
                <div style={unassigned_style}>
                    <span>{this.props.dispatch.title}, </span>
                    <span>{this.props.dispatch.invoice_no} {this.props.dispatch.line_item},</span>
                    <span className={paid_status_class}>
                        <span className="float-right">$</span>
                        <span className="float-right">{this.props.dispatch.payment_gateway}&nbsp;</span>
                    </span>
                </div>);
        }
        else if (this.props.view_type === 0) {          // This means this dispatch is assigned
            wrapper_div_classes = classnames("draggable-item", { "border-color": this.props.dispatch.color });
            style = assigned_wrapper_style;
            content = (<div style={assigned_style}>
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
            wrapper_div_classes = classnames("draggable-item", { "border-color": this.props.dispatch.color });
            style = assigned_wrapper_style;
            content = (<div style={assigned_style}>
                <span>{this.props.dispatch.title},&nbsp;</span>
                <span>{this.props.dispatch.invoice_no}&nbsp;</span>
                <span>{this.props.dispatch.line_item},&nbsp;</span>
                <span>{this.props.dispatch.expected_delivery_time}<br /></span>
            </div>);
        }
        return (<div className={wrapper_div_classes} style={style} onClick={this.handleClick}>
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
            ready: PropTypes.string,
            payment_status: PropTypes.string,
            payment_gateway: PropTypes.string,
            title: PropTypes.string,
            invoice_no: PropTypes.string,
            line_item: PropTypes.string,
            color: PropTypes.string
        })
    ]),
    view_type: PropTypes.number
}
