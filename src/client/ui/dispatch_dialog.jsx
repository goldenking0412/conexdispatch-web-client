/*!
 * kin
 * Copyright(c) 2016-2017 Benoit Person
 * Apache 2.0 Licensed
 */

import classnames from "classnames";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import React from "react";
import { 
    deselect_event, 
    delete_events, 
    async_create_event,
    async_save_event,
    async_delete_event
    // add_events
} from "../actions/events";
import { 
    event_prop_type,
    location_prop_type,
    driver_prop_type 
} from "../prop_types";

class DispatchDialog extends React.Component {
    constructor(props) {
        super(props);
        this.onApplyClick = this.onApplyClick.bind(this);
        this.onCloseClick = this.onCloseClick.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.onChangeDriver = this.onChangeDriver.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeInvoiceNo = this.onChangeInvoiceNo.bind(this);
        this.onChangePaymentStatus = this.onChangePaymentStatus.bind(this);
        this.onChangePaymentGateway = this.onChangePaymentGateway.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeLineItem = this.onChangeLineItem.bind(this);
        this.onChangeExpectedDeliveryTime = this.onChangeExpectedDeliveryTime.bind(this);
        this.onChangeExpectedExtTime = this.onChangeExpectedExtTime.bind(this);
        this.onChangeDeliveryAddress = this.onChangeDeliveryAddress.bind(this);
        this.onChangeColor = this.onChangeColor.bind(this);
        this.onChangeDeliveryProgress = this.onChangeDeliveryProgress.bind(this);
        this.onChangeOnSiteContact = this.onChangeOnSiteContact.bind(this);
        this.onChangeTotalOrder = this.onChangeTotalOrder.bind(this);
        this.onChangeCustomerInfo = this.onChangeCustomerInfo.bind(this);
        this.onChangeSalesRep = this.onChangeSalesRep.bind(this);
        this.onChangeNotes = this.onChangeNotes.bind(this);
        this.onChangeQuoteURL = this.onChangeQuoteURL.bind(this);
        this.onChangeLatestInvoiceURL = this.onChangeLatestInvoiceURL.bind(this);
        this.onChangePONumber = this.onChangePONumber.bind(this);

        this.state = {
            id: -1,
            assigned: false,
            ready: false,
            location_id: 0,
            driver_id: 0,
            event_creator: 0,
            date: "0000-00-00",
            invoice_no: "",
            payment_status: "",
            payment_gateway: "",
            title: "",
            description: "",
            line_item: "",
            expected_delivery_time: "",
            expected_ext_time: "",
            delivery_address: "",
            color: "",
            delivery_progress: "",
            on_site_contact: "",
            total_order: "",
            customer_info: "",
            sales_rep: -1,
            notes: "",
            quote_url: "",
            latest_invoice_url: "",
            po_number: ""
        };
    }

    componentDidMount() {
        new Foundation.Reveal($(this.modal)); // eslint-disable-line no-new, no-undef
    }

    componentWillReceiveProps(newProps) {
        console.log("selected event data",this.props.selected_event_data);
        if (newProps.selected_event.id && newProps.selected_event_data) {
            this.setState({
                id: newProps.selected_event_data.id,
                assigned: newProps.selected_event_data.assigned,
                ready: newProps.selected_event_data.ready,
                location_id: newProps.selected_event_data.location_id,
                driver_id: newProps.selected_event_data.driver_id,
                event_creator: newProps.selected_event_data.event_creator,
                date: newProps.selected_event_data.date,
                invoice_no: newProps.selected_event_data.invoice_no,
                payment_status: newProps.selected_event_data.payment_status,
                payment_gateway: newProps.selected_event_data.payment_gateway,
                title: newProps.selected_event_data.title,
                description: newProps.selected_event_data.description,
                line_item: newProps.selected_event_data.line_item,
                expected_delivery_time: newProps.selected_event_data.expected_delivery_time,
                expected_ext_time: newProps.selected_event_data.expected_ext_time,
                delivery_address: newProps.selected_event_data.delivery_address,
                color: newProps.selected_event_data.color,
                delivery_progress: newProps.selected_event_data.delivery_progress,
                on_site_contact: newProps.selected_event_data.on_site_contact,
                total_order: newProps.selected_event_data.total_order,
                customer_info: newProps.selected_event_data.customer_info,
                sales_rep: newProps.selected_event_data.sales_rep,
                notes: newProps.selected_event_data.notes,
                quote_url: newProps.selected_event_data.quote_url,
                latest_invoice_url: newProps.selected_event_data.latest_invoice_url,
                po_number: newProps.selected_event_data.po_number
            });
        }
    }

    componentWillUpdate() {
    }

    componentDidUpdate() {
    }

    onApplyClick() {
        // this.props.dispatch(patch_events([]));
        console.log("On Apply Clicked!");
        $(this.modal).foundation("close");
        const updatedEvent = {
            id: this.state.id,
            assigned: this.state.assigned,
            ready: this.state.ready,
            location_id: this.state.location_id,
            driver_id: this.state.driver_id,
            event_creator: this.state.event_creator,
            date: this.state.date,
            invoice_no: this.state.invoice_no,
            payment_status: this.state.payment_status,
            payment_gateway: this.state.payment_gateway,
            title: this.state.title,
            description: this.state.description,
            line_item: this.state.line_item,
            expected_delivery_time: this.state.expected_delivery_time,
            expected_ext_time: this.state.expected_ext_time,
            delivery_address: this.state.delivery_address,
            color: this.state.color,
            delivery_progress: this.state.delivery_progress,
            on_site_contact: this.state.on_site_contact,
            total_order: this.state.total_order,
            customer_info: this.state.customer_info,
            sales_rep: this.state.sales_rep,
            notes: this.state.notes,
            quote_url: this.state.quote_url,
            latest_invoice_url: this.state.latest_invoice_url,
            po_number: this.state.po_number,
        }
        if (this.props.selected_event.creating) {
            this.props.dispatch(async_create_event(updatedEvent));
        }
        else
            this.props.dispatch(async_save_event(this.props.selected_event.id, updatedEvent));
    }

    onCloseClick() {
        $(this.modal).foundation("close");
        this.props.dispatch(deselect_event());
        if (this.props.selected_event.creating) {
            this.props.dispatch(delete_events(this.props.selected_event.id));
        }
    }

    onDeleteClick() {
        $(this.modal).foundation("close");
        this.props.dispatch(async_delete_event(this.props.selected_event.id));
        this.props.dispatch(deselect_event());
        this.props.dispatch(delete_events(this.props.selected_event.id));
    }

    onChangeLocation() {
    }

    onChangeDriver() {
    }

    onChangeDate(event) {
        this.setState({
            date: event.target.value
        });
        console.log("On Change Date", $("#__date").val());
    }

    onChangeInvoiceNo(event) {
        this.setState({
            invoice_no: event.target.value
        });
    }

    onChangePaymentStatus(event) {
        this.setState({
            payment_status: event.target.value
        });
    }

    onChangePaymentGateway(event) {
        this.setState({
            payment_gateway: event.target.value
        });
    }

    onChangeTitle(event) {
        this.setState({
            title: event.target.value
        });
    }

    onChangeDescription(event) {
        this.setState({
            description: event.target.value
        });
    }

    onChangeLineItem(event) {
        this.setState({
            line_item: event.target.value
        });
    }
    
    onChangeExpectedDeliveryTime(event) {
        this.setState({
            expected_delivery_time: event.target.value
        });
    }
    
    onChangeExpectedExtTime(event) {
        this.setState({
            expected_ext_time: event.target.value
        });
    }
    
    onChangeDeliveryAddress(event) {
        this.setState({
            delivery_address: event.target.value
        });
    }
    
    onChangeColor(event) {
        this.setState({
            color: event.target.value
        });
    }
    
    onChangeDeliveryProgress(event) {
        this.setState({
            delivery_progress: event.target.value
        });
    }
    
    onChangeOnSiteContact(event) {
        this.setState({
            on_site_contact: event.target.value
        });
    }
    
    onChangeTotalOrder(event) {
        this.setState({
            total_order: event.target.value
        });
    }
    
    onChangeCustomerInfo(event) {
        this.setState({
            customer_info: event.target.value
        });
    }
    
    onChangeSalesRep(event) {
        this.setState({
            sales_rep: event.target.value
        });
    }
    
    onChangeNotes(event) {
        this.setState({
            notes: event.target.value
        });
    }
    
    onChangeQuoteURL(event) {
        this.setState({
            quote_url: event.target.value
        });
    }
    
    onChangeLatestInvoiceURL(event) {
        this.setState({
            latest_invoice_url: event.target.value
        });
    }
    
    onChangePONumber(event) {
        this.setState({
            po_number: event.target.value
        });
    }
    

    _render_location_list() {
        const res = this.props.locations.map((location) => {
            return (<option value={location.id} key={location.id}>{location.name}</option>);
        });
        return (
            <select 
              id="__location_id"
              onChange={this.onChangeLocation}
            >
                {res}
            </select>);
    }

    _render_driver_list() {
        const res = this.props.drivers.map((driver) => {
            return (<option value={driver.id} key={driver.id}>{driver.name}</option>);
        });
        return (<select id="__driver_id">{res}</select>);
    }

    render() {
        const creating = this.props.selected_event.creating;
        const container_classes = classnames("reveal");
        // const btn_apply_value = event.creating ? "create" : "save";
        const btn_close_value = "close";
        const btn_delete_value = "delete";

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
                        <div id="__ready">
                            <div className="float-left">
                                <input type="radio" id="__ready_yes" name="ready" value="1" /> yes
                            </div>
                            <div className="float-left">
                                <input type="radio" id="__ready_no" name="ready" value="0" /> no
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>location</span>
                    </div>
                    <div className="right-content">
                        {this._render_location_list()}
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>driver</span>
                    </div>
                    <div className="right-content">
                        {this._render_driver_list()}
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>date</span>
                    </div>
                    <div className="right-content">
                        <input 
                          type="text" 
                          value={this.state.date} 
                          id="__date" 
                          onChange={this.onChangeDate} 
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>invoice_no</span>
                    </div>
                    <div className="right-content">
                        <input 
                          type="text" 
                          value={this.state.invoice_no} 
                          id="__invoice_no" 
                          onChange={this.onChangeInvoiceNo}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>payment_status</span>
                    </div>
                    <div className="right-content">
                        <input 
                          type="text" 
                          value={this.state.payment_status} 
                          id="__payment_status" 
                          onChange={this.onChangePaymentStatus}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>payment_gateway</span>
                    </div>
                    <div className="right-content">
                        <input 
                          type="text" 
                          value={this.state.payment_gateway} 
                          id="__payment_gateway" 
                          onChange={this.onChangePaymentGateway}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>title</span>
                    </div>
                    <div className="right-content">
                        <input 
                          type="text" 
                          value={this.state.title} 
                          id="__title" 
                          onChange={this.onChangeTitle}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>description</span>
                    </div>
                    <div className="right-content">
                        <textarea 
                          value={this.state.description} 
                          id="__description" 
                          onChange={this.onChangeDescription}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>line_item</span>
                    </div>
                    <div className="right-content">
                        <input 
                          type="text" 
                          value={this.state.line_item} 
                          id="__line_item" 
                          onChange={this.onChangeLineItem}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>expected_delivery_time</span>
                    </div>
                    <div className="right-content">
                        <input 
                          type="text" 
                          value={this.state.expected_delivery_time} 
                          id="__expected_delivery_time" 
                          onChange={this.onChangeExpectedDeliveryTime}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>expected_ext_time</span>
                    </div>
                    <div className="right-content">
                        <input 
                          type="text" 
                          value={this.state.expected_ext_time} 
                          id="__expected_ext_time" 
                          onChange={this.onChangeExpectedExtTime}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>delivery_address</span>
                    </div>
                    <div className="right-content">
                        <input 
                          type="text" 
                          value={this.state.delivery_address} 
                          id="__delivery_address" 
                          onChange={this.onChangeDeliveryAddress}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>color</span>
                    </div>
                    <div className="right-content">
                        <input 
                          type="text" 
                          value={this.state.color} 
                          id="__color" 
                          onChange={this.onChangeColor}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>delivery_progress</span>
                    </div>
                    <div className="right-content">
                        <input 
                          type="text" 
                          value={this.state.delivery_progress} 
                          id="__delivery_progress" 
                          onChange={this.onChangeDeliveryProgress}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>on_site_contact</span>
                    </div>
                    <div className="right-content">
                        <input 
                          type="text" 
                          value={this.state.on_site_contact} 
                          id="__on_site_contact" 
                          onChange={this.onChangeOnSiteContact}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>total_order</span>
                    </div>
                    <div className="right-content">
                        <input 
                          type="text" 
                          value={this.state.total_order} 
                          id="__total_order" 
                          onChange={this.onChangeTotalOrder}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>customer_info</span>
                    </div>
                    <div className="right-content">
                        <input 
                          type="text" 
                          value={this.state.customer_info} 
                          id="__customer_info" 
                          onChange={this.onChangeCustomerInfo}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>sales_rep</span>
                    </div>
                    <div className="right-content">
                        <input 
                          type="text" 
                          value={this.state.sales_rep} 
                          id="__sales_rep" 
                          onChange={this.onChangeSalesRep}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>notes</span>
                    </div>
                    <div className="right-content">
                        <input 
                          type="text" 
                          value={this.state.notes} 
                          id="__notes" 
                          onChange={this.onChangeNotes}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>quote_url</span>
                    </div>
                    <div className="right-content">
                        <input 
                          type="text" 
                          value={this.state.quote_url} 
                          id="__quote_url" 
                          onChange={this.onChangeQuoteURL}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>latest_invoice_url</span>
                    </div>
                    <div className="right-content">
                        <input 
                          type="text" 
                          value={this.state.latest_invoice_url} 
                          id="__latest_invoice_url" 
                          onChange={this.onChangeLatestInvoiceURL}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="left-description">
                        <span>po_number</span>
                    </div>
                    <div className="right-content">
                        <input 
                          type="text" 
                          value={this.state.po_number} 
                          id="__po_number" 
                          onChange={this.onChangePONumber}
                        />
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
                    <input 
                      className="float-right"
                      type="button" 
                      value={btn_delete_value} 
                      onClick={this.onDeleteClick}
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
    selected_event_data: event_prop_type,
    locations: PropTypes.arrayOf(location_prop_type),
    drivers: PropTypes.arrayOf(driver_prop_type)
};

const map_state_props = state => {
    return {
        selected_event: state.selected_event,
        selected_event_data: state.events[state.selected_event.id],
        locations: state.locations,
        drivers: state.drivers
    };
}

const DispatchDialogContainer = connect(map_state_props)(DispatchDialog);
export default DispatchDialogContainer;
