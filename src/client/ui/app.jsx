/*!
 * kin
 * Copyright(c) 2016-2017 Benoit Person
 * Apache 2.0 Licensed
 */

import classnames from "classnames";
import PropTypes from 'prop-types';
import React from "react";
import { connect } from "react-redux";
import Calendar from "react-calendar";
import Dragula from 'react-dragula';

import { EVENTS_NS } from "../config";

import { deselect_event } from "../actions/events";
import { toggle_sidebar } from "../actions/ui";
import CalendarToolbar from "./calendar_toolbar";
import EventTooltip from "./event_tooltip/base";
import SettingsModal from "./settings_modal/base";
import Tabs from "./tabs";
import TabcontentContainer from "./tabcontent_container";
import UnassignedContainer from "./unassigned_container";
import DispatchDialog from "./dispatch_dialog";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.keydown_handler = this.keydown_handler.bind(this);
        this.toggle_sidebar = this.toggle_sidebar.bind(this);
    }

    componentDidMount() {
        this.dragulaDecorator();
        $(document).on(`keydown.${EVENTS_NS}`, this.keydown_handler);
    }

    onDrop(el) {
        console.log(el);
    }

    componentWillUnMount() {
        $(document).off(`keydown.${EVENTS_NS}`);
    }

    keydown_handler(event) {
        if (event.which === 27) {
            this.props.dispatch(deselect_event());
        }
    }

    toggle_sidebar(event) {
        event.preventDefault();
        this.props.dispatch(toggle_sidebar(!this.props.sidebar.show));
    }

    _render_main() {
        console.log("Location Loaded", this.props.locations.length);
        const main_content = [];
        if (this.props.matches.length === 0) {
            for (let i =  0; i < this.props.data.assigned_data.length; i+=1) {
                main_content.push(
                    <div label={this.props.data.assigned_data[i].location} key={i}>
                        <TabcontentContainer 
                          drivers={this.props.data.assigned_data[i].drivers} 
                          update_draggable_container_list={this.dragulaDecorator}
                        />
                    </div>
                )
            }
        }
        else {
            console.log("match_length",this.props.matches);
            for (let i =  1; i < this.props.matches.length; i+=1) {
                console.log("match_location_name", this.props.matches[i].location_name);
                main_content.push(
                    <div label={this.props.matches[i].location_name} key={i}>
                        <TabcontentContainer 
                          drivers={this.props.matches[i].drivers} 
                          update_draggable_container_list={this.dragulaDecorator}
                        />
                    </div>
                )
            }
        }

        return main_content;
    }

    dragulaDecorator = () => {
        const options = {
            isContainer(el) { return el.classList.contains('dragula-container'); },
            moves() { return true; },
            accepts() { return true; },
            invalid() { return false; },
            direction: 'vertical',             // Y axis is considered when determining where an element would be dropped
            copy: false,                       // elements are moved by default, not copied
            copySortSource: false,             // elements in copy-source containers can be reordered
            revertOnSpill: false,              // spilling will put the element back where it was dragged from, if this is true
            removeOnSpill: false,              // spilling will `.remove` the element, if this is true
            mirrorContainer: document.querySelector('.draggable-container'),    // set the element that gets mirror elements appended
            ignoreInputTextSelection: true     // allows users to select input text, see details below
        };
        Dragula([...document.querySelectorAll('.draggable-container')], options)
            .on('drop', this.onDrop);
    };

    render() {
        const content_classes = classnames("content", { margin: this.props.sidebar.show }, "float-left");
        const aside_classes = classnames({ show: this.props.sidebar.show }, "float-left");

        return (
            <div>
                <CalendarToolbar />
                <div className="main-content">
                    <aside className={aside_classes}>
                        <div className="navigation-calendar">
                            <Calendar />
                        </div>
                        <div className="clearfix" />
                    </aside>
                    <div className="upper-content">
                        <div id="calendar" />
                        <UnassignedContainer 
                          data={this.props.data.unassigned_data} 
                          update_draggable_container_list={this.dragulaDecorator} 
                        />
                    </div>
                </div>

                <Tabs>
                    {this._render_main()}
                </Tabs>

                <div className={content_classes}>
                    <EventTooltip />
                    <SettingsModal />
                    <DispatchDialog />
                </div>
            </div>
        );
    }
}

App.propTypes = {
    dispatch: PropTypes.func,
    sidebar: PropTypes.shape({
        show: PropTypes.bool
    }),
    locations: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string
        })
    ),
    drivers: PropTypes.arrayOf(
        PropTypes.shape({
            user_id: PropTypes.number,
            name: PropTypes.string,
            phone_number: PropTypes.string
        })
    ),
    matches: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            location_name: PropTypes.string,
            drivers: PropTypes.arrayOf(
                PropTypes.shape({
                    name: PropTypes.string,
                    phone_number: PropTypes.string
                })
            )
        })
    ),
    // invoices: PropTypes.arrayOf(
    //     PropTypes.shape({
    //         assigned: PropTypes.bool, 
    //         ready: PropTypes.bool,  
    //         location_id: PropTypes.number, 
    //         driver: PropTypes.number, 
    //         invoice_creator: PropTypes.number,
    //         date: PropTypes.string,
    //         invoice_no: PropTypes.string,
    //         payment_status: PropTypes.string, 
    //         payment_gateway: PropTypes.string,
    //         title: PropTypes.string,
    //         description: PropTypes.string,
    //         line_item: PropTypes.string,
    //         expected_delivery_time: PropTypes.string,
    //         expected_ext_time: PropTypes.string,
    //         delivery_address: PropTypes.string,
    //         color: PropTypes.string,
    //         delivery_progress: PropTypes.number,
    //         on_site_contact: PropTypes.string,
    //         total_order: PropTypes.string,
    //         customer_info: PropTypes.string,
    //         sales_rep: PropTypes.number, 
    //         notes: PropTypes.string ,
    //         quote_url: PropTypes.string,
    //         total_order: PropTypes.string,
    //         latest_invoice_url: PropTypes.string,
    //         po_number: PropTypes.string
    //     })
    // ),
    data: PropTypes.shape({
        unassigned_data: PropTypes.arrayOf(
            PropTypes.shape({
                date: PropTypes.string,
                daily_dispatches: PropTypes.arrayOf(
                    PropTypes.shape({
                        ready: PropTypes.string,
                        payment_status: PropTypes.string,
                        payment_gateway: PropTypes.string,
                        title: PropTypes.string,
                        invoice_no: PropTypes.string,
                        line_item: PropTypes.string,
                        color: PropTypes.string
                    })
                )
            })
        ),
        assigned_data: PropTypes.arrayOf(
            PropTypes.shape({
                location: PropTypes.string,
                drivers: PropTypes.arrayOf(
                    PropTypes.shape({
                        name: PropTypes.string,
                        default_color: PropTypes.string,
                        phone_number: PropTypes.string,
                        dispatches: PropTypes.arrayOf(
                            PropTypes.shape({
                                date: PropTypes.string,
                                daily_dispatches: PropTypes.arrayOf(
                                    PropTypes.shape({
                                        title: PropTypes.string,
                                        invoice_no: PropTypes.string,
                                        line_item: PropTypes.string,
                                        expected_delivery_time: PropTypes.string,
                                        expected_ext_time: PropTypes.string,
                                        delivery_address: PropTypes.string,
                                        color: PropTypes.string,
                                        delivery_progress: PropTypes.string
                                    })
                                )
                            })
                        )
                    })
                )
            })
        )
    })
};

function map_state_props(state) {
    return {
        sidebar: state.ui.sidebar,
        locations: state.locations,
        drivers: state.drivers,
        matches: state.matches
    };
}

const AppContainer = connect(map_state_props)(App);
export default AppContainer;
