/*!
 * kin
 * Copyright(c) 2016-2017 Benoit Person
 * Apache 2.0 Licensed
 */

import classnames from "classnames";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import React from "react";
import { deselect_event } from "../actions/events";
import { event_prop_type } from "../prop_types";

class DispatchDialog extends React.Component {
    constructor(props) {
        super(props);
        this.onApplyClick = this.onApplyClick.bind(this);
        this.onCloseClick = this.onCloseClick.bind(this);

        this.state = {

        };
    }

    componentDidMount() {
        new Foundation.Reveal($(this.modal)); // eslint-disable-line no-new, no-undef
    }

    componentDidUpdate() {
    }

    onApplyClick(event) {
        // this.props.dispatch(patch_events([]));
        console.log("On Apply click", event);
        $(this.modal).foundation("close");
        this.props.dispatch(deselect_event());
    }

    onCloseClick(event) {
        console.log("On Close click", event);
        $(this.modal).foundation("close");
        this.props.dispatch(deselect_event());
    }

    render() {
        const creating = this.props.selected_event.creating;
        const event = this.props.selected_event_data;
        const container_classes = classnames("reveal");
        // const btn_apply_value = event.creating ? "create" : "save";
        const btn_close_value = "close";

        let invoice_no = "";
        if (event !== undefined) {
            invoice_no = event.invoice_no;
        }
        return (
            <div 
              ref={ref => {
                  this.modal = ref;
              }}
              id="dispatch-edit-dialog"
              className={container_classes}
              data-reveal
            >
                <div className="row">
                    <div className="left-description">
                        <span>Ready</span>
                    </div>
                    <div className="right-content">
                        <input type="text" />
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>location</span>
                    </div>
                    <div className="right-content">
                        <input type="text" />
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>driver</span>
                    </div>
                    <div className="right-content">
                        <input type="text" />
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>invoice_no</span>
                    </div>
                    <div className="right-content">
                        <input type="text" value={invoice_no} />
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>payment_status</span>
                    </div>
                    <div className="right-content">
                        <input type="text" value={event ? event.payment_status : ''} />
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>payment_gateway</span>
                    </div>
                    <div className="right-content">
                        <input type="text" value={event ? event.payment_gateway : ''} />
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>title</span>
                    </div>
                    <div className="right-content">
                        <input type="text" value={event ? event.title : ''} />
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>description</span>
                    </div>
                    <div className="right-content">
                        <input type="text" value={event ? event.description : ''} />
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>line_item</span>
                    </div>
                    <div className="right-content">
                        <input type="text" value={event ? event.line_item : ''} />
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>expected_delivery_time</span>
                    </div>
                    <div className="right-content">
                        <input type="text" value={event ? event.expected_delivery_time : ''} />
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>expected_ext_time</span>
                    </div>
                    <div className="right-content">
                        <input type="text" value={event ? event.expected_ext_time : ''} />
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>delivery_address</span>
                    </div>
                    <div className="right-content">
                        <input type="text" value={event ? event.delivery_address : ''} />
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>color</span>
                    </div>
                    <div className="right-content">
                        <input type="text" value={event ? event.color : ''} />
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>delivery_progress</span>
                    </div>
                    <div className="right-content">
                        <input type="text" value={event ? event.delivery_progress : ''} />
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>on_site_contact</span>
                    </div>
                    <div className="right-content">
                        <input type="text" value={event ? event.on_site_contact : ''} />
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>total_order</span>
                    </div>
                    <div className="right-content">
                        <input type="text" value={event ? event.total_order : ''} />
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>customer_info</span>
                    </div>
                    <div className="right-content">
                        <input type="text" value={event ? event.customer_info : ''} />
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>sales_rep</span>
                    </div>
                    <div className="right-content">
                        <input type="text" value={event ? event.sales_rep : ''} />
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>notes</span>
                    </div>
                    <div className="right-content">
                        <input type="text" value={event ? event.notes : ''} />
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>quote_url</span>
                    </div>
                    <div className="right-content">
                        <input type="text" value={event ? event.quote_url : ''} />
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>latest_invoice_url</span>
                    </div>
                    <div className="right-content">
                        <input type="text" value={event ? event.latest_invoice_url : ''} />
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>po_number</span>
                    </div>
                    <div className="right-content">
                        <input type="text" value={event ? event.po_number : ''} />
                    </div>
                </div>
                <div className="row">
                    <input 
                      className="float-right"
                      type="button" 
                      value={creating ? "create" : "save"} 
                      onClick={this.onApplyClick}
                    />
                    <input 
                      className="float-right"
                      type="button" 
                      value={btn_close_value} 
                      onClick={this.onCloseClick}
                    />
                </div>
            </div>
        );
    }
}


DispatchDialog.propTypes = {
    dispatch: PropTypes.func,
    selected_event: PropTypes.shape({
        id: PropTypes.number,
        creating: PropTypes.bool,
        dirty: PropTypes.bool,
        editing: PropTypes.bool
    }),
    selected_event_data: event_prop_type
};

const map_state_props = state => {
    return {
        selected_event: state.selected_event,
        selected_event_data: state.events[state.selected_event.id]
    };
}

const DispatchDialogContainer = connect(map_state_props)(DispatchDialog);
export default DispatchDialogContainer;
