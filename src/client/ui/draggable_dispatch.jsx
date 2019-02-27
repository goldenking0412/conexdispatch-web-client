import * as React from "react";
import PropTypes from 'prop-types';
import classnames from "classnames";
import { connect } from "react-redux";
import { event_prop_type } from "../prop_types";
import { select_event } from "../actions/events";

class DraggableDispatch extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        console.log(this.props.event);
    }

    handleClick(e){
        e.stopPropagation();
        this.props.dispatch(select_event(this.props.event.id, false));
        $("#dispatch-edit-dialog").foundation("open");
    }

    render() {
        const event = this.props.event;
        const unassigned_style = {
            backgroundColor: event.color
        };
        const assigned_style = {
            borderColor: event.color,
            background: `-webkit-linear-gradient(left, 
                ${event.color} 0%, 
                ${event.color} ${event.delivery_progress}%, 
                #ffffff ${event.delivery_progress}%, 
                #ffffff ${event.delivery_progress}%, 
                #ffffff 100%)`
        }

        const assigned_wrapper_style = {
            borderColor: event.color
        }
        let style;
        let content;
        let wrapper_div_classes;

        if (!event.assigned) {
            let paid_status_class;

            if (event.payment_status === "paid") {
                paid_status_class = "paid";
            }
            else if (event.payment_status === "partial-paid") {
                paid_status_class = "partial-paid";
            }
            else if (event.payment_status === "unpaid") {
                paid_status_class = "unpaid";
            }

            if (event.ready === 1) {
                wrapper_div_classes = classnames("draggable-item", "unassigned", "ready");
            }
            else {
                wrapper_div_classes = classnames("draggable-item", "unassigned");
            }

            content = (
                <div style={unassigned_style}>
                    <span>{event.title}, </span>
                    <span>{event.invoice_no} {event.line_item},</span>
                    <span className={paid_status_class}>
                        <span className="float-right">$</span>
                        <span className="float-right">{event.payment_gateway}&nbsp;</span>
                    </span>
                </div>);
        }
        else if (this.props.view_type === 0) {          // This means this dispatch is assigned
            wrapper_div_classes = classnames("draggable-item", { "border-color": event.color });
            style = assigned_wrapper_style;
            content = (<div style={assigned_style}>
                <div>
                    <span>{event.title},&nbsp;</span>
                    <span>{event.invoice_no}&nbsp;</span>
                    <span>{event.line_item},&nbsp;</span>
                    <span>{event.expected_delivery_time}<br /></span>
                </div>
                <div className="dispatch-details">
                    <span>{event.expected_ext_time},&nbsp;</span>
                    <span>{event.delivery_address}</span>
                </div>
            </div>);
        }
        else {
            wrapper_div_classes = classnames("draggable-item", { "border-color": event.color });
            style = assigned_wrapper_style;
            content = (<div style={assigned_style}>
                <span>{event.title},&nbsp;</span>
                <span>{event.invoice_no}&nbsp;</span>
                <span>{event.line_item},&nbsp;</span>
                <span>{event.expected_delivery_time}<br /></span>
            </div>);
        }
        return (<div className={wrapper_div_classes} style={style} onClick={this.handleClick}>
            {content}
        </div>);
    }
}

DraggableDispatch.propTypes = {
    dispatch: PropTypes.func,
    view_type: PropTypes.number,
    event: event_prop_type,
    selected_event: PropTypes.shape({
        id: PropTypes.number,
        creating: PropTypes.bool,
        dirty: PropTypes.bool,
        editing: PropTypes.bool
    })
}

const map_state_props = state => {
    return {
        selected_event: state.selected_event
    };
}

const DraggableDispatchContainer = connect(map_state_props)(DraggableDispatch);
export default DraggableDispatchContainer;
