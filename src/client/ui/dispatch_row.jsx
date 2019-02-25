
import React from 'react';
import classnames from "classnames";
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import DraggableContainer from './draggable_container';

import {
    get_full_calendar_view
} from "../actions/ui";

class DispatchRow extends React.Component {

    componentDidUpdate() {
        this.props.update_draggable_container_list();
    }

    render() {
        const current_week = get_full_calendar_view();
        if (current_week.name === undefined || current_week.params.start === undefined) {
            return (<div />);
        }
        const display_flex = "display-flex";
        const dispatch_row_container_classes = classnames("driver-task-wrapper");
        const height = this.props.height;
        let day_dispatch_container_classes;
        let table_class="";
        let style = {};
        if (height) {
            day_dispatch_container_classes = classnames("box-container", { height: this.props.height });
            style = {
                height: this.props.height
            };
        } else {
            day_dispatch_container_classes = classnames("box-container");
            table_class = classnames("cell");
        }

        // const data = this.props.data;
        // console.log(data);
        const content = [];
        const start_day = current_week.params.start.clone();
        const end_day = current_week.params.end.add(1, "days");
        const end_day_string = end_day.format("YYYY-MM-DD");
        for (; start_day.format("YYYY-MM-DD") !== end_day_string; start_day.add(1, "days")) {
            // let i;
            const compare_string = start_day.format("YYYY-MM-DD");
            // if (data === undefined) {
            //     content.push(
            //         <th 
            //           className={day_dispatch_container_classes} 
            //           key={compare_string}
            //           style={style}
            //         >
            //             <DraggableContainer 
            //               view_type={this.props.view_type}
            //               location_id={this.props.location_id}
            //               driver_id={this.props.driver_id}
            //             />
            //         </th>);
            // }
            // else {
            //     for (i = 0; i < data.length; i+=1) {
            //         if (data[i].date === compare_string) {
            //             content.push(
            //                 <th 
            //                   className={day_dispatch_container_classes} 
            //                   key={compare_string}
            //                   style={style}
            //                 >
            //                     <DraggableContainer 
            //                       dispatches={this.props.data[i].daily_dispatches} 
            //                       view_type={this.props.view_type}
            //                       location_id={this.props.location_id}
            //                       driver_id={this.props.driver_id}
            //                     />
            //                 </th>);
            //             break;
            //         }
            //     }
            //     if (i === data.length) {
            //         content.push(
            //             <th 
            //               className={day_dispatch_container_classes} 
            //               key={compare_string}
            //               style={style}
            //             >
            //                 <DraggableContainer 
            //                   view_type={this.props.view_type}
            //                   location_id={this.props.location_id}
            //                   driver_id={this.props.driver_id}
            //                 />
            //             </th>);
            //     }
            // }
            content.push(
                <th 
                  className={day_dispatch_container_classes} 
                  key={compare_string}
                  style={style}
                >
                    <DraggableContainer 
                      view_type={this.props.view_type}
                      location_id={this.props.location_id}
                      driver_id={this.props.driver_id}
                      date={compare_string}
                    />
                </th>);
        }
        return (
            <div className={dispatch_row_container_classes}>
                <table className={table_class}>
                    <thead>
                        <tr className={display_flex}>
                            {content}
                        </tr>
                    </thead>
                </table>
            </div>
        );
    }

}

DispatchRow.propTypes = {
    full_calendar: PropTypes.shape({
        status: PropTypes.string,
        view: PropTypes.shape({
            name: PropTypes.string,
            params: PropTypes.object
        })
    }),
    update_draggable_container_list: PropTypes.func,
    height: PropTypes.number,
    // data: PropTypes.arrayOf(
    //     PropTypes.shape({
    //         date: PropTypes.string,
    //         daily_dispatches: PropTypes.arrayOf(
    //             PropTypes.shape({
    //                 title: PropTypes.string,
    //                 invoice_no: PropTypes.string,
    //                 line_item: PropTypes.string,
    //                 expected_delivery_time: PropTypes.string,
    //                 expected_ext_time: PropTypes.string,
    //                 delivery_address: PropTypes.string,
    //                 color: PropTypes.string,
    //                 delivery_progress: PropTypes.string
    //             })
    //         )
    //     })
    // ),
    view_type: PropTypes.number,
    driver_id: PropTypes.number,
    location_id: PropTypes.number
}

function map_state_props(state) {
    return {
        full_calendar: state.ui.full_calendar
    };
}

const DispatchRowContainer = connect(map_state_props)(DispatchRow);
export default DispatchRowContainer;
