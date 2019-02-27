import * as React from "react";
import $ from "jquery";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import _ from "lodash";


import DraggableDispatch from './draggable_dispatch';
import { 
    // async_create_event, 
    create_event, 
    select_event 
} from "../actions/events";
import { event_prop_type } from "../prop_types";

class DraggableContainer extends React.Component {
    constructor(props) {
        super(props);
        this.more_cont_id = this.guidGenerator();
        this.showMore = this.showMore.bind(this);
        this.hideMore = this.hideMore.bind(this);
        this.addNewEvent = this.addNewEvent.bind(this);
    }

    componentDidUpdate() {
        console.log("Changed State Event Triggered!");
    }

    getFilteredEvents() {
        let filters;
        if (this.props.unassigned) {
            filters = {
                'date': this.props.date,
                'assigned': 0
            };
        }
        else {
            filters = {
                'date': this.props.date,
                'driver_id': this.props.driver_id, 
                'location_id': this.props.location_id,
                'assigned': 1
            };
        }
        return _.filter(this.props.events, filters);
    }

    guidGenerator() {
        return `${this.S4()}${this.S4()}-${this.S4()}-${this.S4()}-${this.S4()}-${this.S4()}${this.S4()}${this.S4()}`;
    }

    S4() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }

    showMore(e) {
        e.stopPropagation();

        $(`#${this.more_cont_id}`).css("display", "block");
        const parent_width = $(`#${this.more_cont_id}`).parent().width();
        $(`#${this.more_cont_id}`).width(parent_width);
        console.log(`#${this.more_cont_id}`);
    }

    hideMore(e) {
        e.stopPropagation();
        $(`#${this.more_cont_id}`).css("display", "none");
    }

    addNewEvent(e) {
        e.stopPropagation();
        this.props.selected_event.creating = true;
        $("#dispatch-edit-dialog").foundation("open");

        const assigned_value = this.props.unassigned ? 0 : 1;

        const event = {
            id: this.props.events.length,
            assigned: assigned_value,
            ready: 0,
            location_id: this.props.location_id === undefined ? -1 : this.props.location_id,
            driver_id: this.props.driver_id === undefined ? -1 : this.props.driver_id,
            event_creator: 0,
            date: this.props.date,
            invoice_no: "",
            payment_status: "",
            payment_gateway: "",
            title: "",
            description: "",
            line_item: "",
            expected_delivery_time: "",
            expected_ext_time: "",
            delivery_address: "",
            color: "#00B430",
            delivery_progress: 0,
            on_site_contact: "",
            total_order: "",
            customer_info: "",
            sales_rep: -1,
            notes: "",
            quote_url: "",
            latest_invoice_url: "",
            po_number: ""
        };
        // FC feeds us a moment in local tz, we "format" it to loose
        // any timezone information it has and re-parse it with the
        // user's current tz.
        this.props.dispatch(create_event(event));
        this.props.dispatch(select_event(event.id, true));
    }

    _render_showMoreDialog(more_content) {
        return (
            <div 
              className="show-more-container" 
              id={this.more_cont_id}
            >
                <div className="draggable-container">
                    {more_content}
                </div>

                <div 
                  className="float-right" 
                  key={this.more_cont_id}
                >
                    <input 
                      type="button" 
                      value="cancel" 
                      onClick={this.hideMore}
                    />
                </div>
            </div>);
    }

    render() {
        const events = this.getFilteredEvents();
        
        if (events.length === 0) {
            return (
                <div className="daily-container">
                    <div className="draggable-container" onClick={this.addNewEvent} />
                </div>);
        }

        const content = [];

        for (let i = 0; i < events.length; i+=1) {
            content.push(
                <DraggableDispatch 
                  key={i}
                  unassigned={this.props.unassigned}
                  dispatch={events[i]}
                  event={events[i]}
                  view_type={this.props.view_type}
                />
            )
        }
        return (
            <div className='daily-container'>
                <div 
                  className='draggable-container' 
                  onClick={this.addNewEvent}
                >
                    {content}
                </div>
            </div>);


        // if (this.props.dispatches === undefined) {
        //     return (
        //         <div className="daily-container">
        //             <div className="draggable-container" onClick={this.addNewEvent} />
        //         </div>);
        // }
        // const dispatches = [];
        // const content = [];
        // const more_content = [];
        // let additional_content;
        // for (let i = 0; i < this.props.dispatches.length; i+=1) {
        //     dispatches.push(this.props.dispatches[i]);
        // }

        // if (this.props.unassigned) {
        //     const length = dispatches.length > 6 ? 6 : dispatches.length;
        //     for (let i = 0; i < length; i+=1) {
        //         content.push(
        //             <DraggableDispatch 
        //               key={i}
        //               unassigned={this.props.unassigned}
        //               dispatch={dispatches[i]}
        //               view_type={this.props.view_type}
        //             />
        //         )
        //     }
        //     if (dispatches.length > 6) {
        //         additional_content = (<div className="view-more">
        //             <span className="float-left">{dispatches.length - 6} more</span>
        //             <input 
        //               type="button"
        //               className="float-right"
        //               onClick={this.showMore}
        //               value="view more"
        //             />
        //         </div>);

        //         for (let i = 6; i < dispatches.length; i+=1) {
        //             more_content.push(
        //                 <DraggableDispatch 
        //                   key={i}
        //                   unassigned={this.props.unassigned}
        //                   dispatch={dispatches[i]}
        //                   view_type={this.props.view_type}
        //                 />
        //             )
        //         }
                
        //     }
        //     return (
        //         <div className='daily-container'>
        //             <div 
        //               className='draggable-container' 
        //               onClick={this.addNewEvent}
        //             >
        //                 {content}
        //             </div>
        //             {additional_content}
        //             {this._render_showMoreDialog(more_content)}
        //         </div>);
        // }
        
        // // Assigned Dispatch Container        
        // for (let i = 0; i < dispatches.length; i+=1) {
        //     content.push(
        //         <DraggableDispatch 
        //           key={i}
        //           unassigned={this.props.unassigned}
        //           dispatch={dispatches[i]}
        //           view_type={this.props.view_type}
        //         />
        //     )
        // }
        // return (
        //     <div className='daily-container'>
        //         <div 
        //           className='draggable-container' 
        //           onClick={this.addNewEvent}
        //         >
        //             {content}
        //         </div>
        //     </div>);

    }
}

DraggableContainer.propTypes = {
    dispatch: PropTypes.func,
    unassigned: PropTypes.bool,
    view_type: PropTypes.number,
    location_id: PropTypes.number,
    driver_id: PropTypes.number,    
    selected_event: PropTypes.shape({
        id: PropTypes.number,
        creating: PropTypes.bool,
        dirty: PropTypes.bool,
        editing: PropTypes.bool
    }),
    date: PropTypes.string,
    events: PropTypes.arrayOf(event_prop_type)
}

const map_state_props = state => {
    return {
        selected_event: state.selected_event,
        events: state.events
    };
}

const DraggableContainerWrapper = connect(map_state_props)(DraggableContainer);
export default DraggableContainerWrapper;
