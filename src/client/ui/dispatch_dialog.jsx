/*!
 * kin
 * Copyright(c) 2016-2017 Benoit Person
 * Apache 2.0 Licensed
 */

import classnames from "classnames";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import React from "react";

class DispatchDialog extends React.Component {
    constructor() {
        super();
        this.onApplyClick = this.onApplyClick.bind(this);
        this.onCloseClick = this.onCloseClick.bind(this);
    }

    componentDidMount() {
        new Foundation.Reveal($(this.modal)); // eslint-disable-line no-new, no-undef
    }

    onApplyClick(event) {
        console.log(event);
        $(this.modal).foundation("close");
    }

    onCloseClick(event) {
        console.log(event);
        $(this.modal).foundation("close");
    }

    render() {
        const container_classes = classnames("reveal");
        const btn_apply_value = this.props.is_new ? "create" : "save";
        const btn_close_value = "close";
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
                        <input type="text" />
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>payment_status</span>
                    </div>
                    <div className="right-content">
                        <input type="text" />
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>payment_gateway</span>
                    </div>
                    <div className="right-content">
                        <input type="text" />
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>title</span>
                    </div>
                    <div className="right-content">
                        <input type="text" />
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>description</span>
                    </div>
                    <div className="right-content">
                        <input type="text" />
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>line_item</span>
                    </div>
                    <div className="right-content">
                        <input type="text" />
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>expected_delivery_time</span>
                    </div>
                    <div className="right-content">
                        <input type="text" />
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>expected_ext_time</span>
                    </div>
                    <div className="right-content">
                        <input type="text" />
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>delivery_address</span>
                    </div>
                    <div className="right-content">
                        <input type="text" />
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>color</span>
                    </div>
                    <div className="right-content">
                        <input type="text" />
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>delivery_progress</span>
                    </div>
                    <div className="right-content">
                        <input type="text" />
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>on_site_contact</span>
                    </div>
                    <div className="right-content">
                        <input type="text" />
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>total_order</span>
                    </div>
                    <div className="right-content">
                        <input type="text" />
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>customer_info</span>
                    </div>
                    <div className="right-content">
                        <input type="text" />
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>sales_rep</span>
                    </div>
                    <div className="right-content">
                        <input type="text" />
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>notes</span>
                    </div>
                    <div className="right-content">
                        <input type="text" />
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>quote_url</span>
                    </div>
                    <div className="right-content">
                        <input type="text" />
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>latest_invoice_url</span>
                    </div>
                    <div className="right-content">
                        <input type="text" />
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>po_number</span>
                    </div>
                    <div className="right-content">
                        <input type="text" />
                    </div>
                </div>
                <div className="row">
                    <input 
                      className="float-right"
                      type="button" 
                      value={btn_apply_value} 
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
    selected_invoice: PropTypes.shape({
        assigned: PropTypes.bool,
        ready: PropTypes.bool,
        location: PropTypes.number,
        driver: PropTypes.number,
        invoice_creator: PropTypes.number,
        date: PropTypes.date,
        invoice_no: PropTypes.string,
        payment_status: PropTypes.string,
        payment_gateway: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        line_item: PropTypes.string,
        expected_delivery_time: PropTypes.string,
        expected_ext_time: PropTypes.string,
        delivery_address: PropTypes.string,
        color: PropTypes.string,
        delivery_progress: PropTypes.number,
        on_site_contact: PropTypes.string,
        total_order: PropTypes.string,
        customer_info: PropTypes.string,
        sales_rep: PropTypes.number,
        notes: PropTypes.string,
        quote_url: PropTypes.string,
        latest_invoice_url: PropTypes.string,
        po_number: PropTypes.string
    }),
    is_new: PropTypes.bool
};

function map_state_props(state) {
    return {
        selected_invoice: state.selected_invoice,
        is_new: state.selected_invoice_status
    };
}

const DispatchDialogContainer = connect(map_state_props)(DispatchDialog);
export default DispatchDialogContainer;
