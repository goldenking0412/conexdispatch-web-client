import React from 'react';
import classnames from "classnames";
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import DraggableContainer from './draggable_container';

import {
    get_full_calendar_view,
} from "../actions/ui";

class UnassignedContainer extends React.Component {
    componentDidUpdate() {
        this.props.update_draggable_container_list();
    }
    get _$calendar() {
        return $("#calendar");
    }

    render() {
        const current_week = get_full_calendar_view();
        if (current_week.name === undefined) {
            return (<div />);
        }

        const display_flex_class = "display-flex";
        const day_dispatch_container_classes = classnames("box-container", "unassigned-task-wrapper");
        const dispatch_row_container_classes = classnames("unassigned-tasks");
        const data = this.props.data;
        const content = [];
        const start_day = current_week.params.start.clone();
        const end_day = current_week.params.end.add(1, "days");
        const end_day_string = end_day.format("MM/DD/YYYY");

        for (; start_day.format("MM/DD/YYYY") !== end_day_string; start_day.add(1, "days")) {
            let i;
            for (i = 0; i < data.length; i+=1) {
                if (data[i].date === start_day.format("MM/DD/YYYY")) {
                    content.push(<th className={day_dispatch_container_classes} key={start_day.format("MM/DD/YYYY")}>
                        <DraggableContainer 
                          unassigned
                          dispatches={this.props.data[i].daily_dispatches} 
                        />
                    </th>);
                    break;
                }
            }
            if (i === data.length) {
                content.push(<th className={day_dispatch_container_classes} key={start_day.format("MM/DD/YYYY")}>
                    <DraggableContainer 
                      unassigned
                    />
                </th>);
            }
        }
        return (
            <div className={dispatch_row_container_classes}>
                <table>
                    <thead>
                        <tr className={display_flex_class}>
                            {content}
                        </tr>
                    </thead>
                </table>
            </div>
        );
    }
}

UnassignedContainer.propTypes = {
    full_calendar: PropTypes.shape({
        status: PropTypes.string,
        view: PropTypes.shape({
            name: PropTypes.string,
            params: PropTypes.object
        })
    }),
    data: PropTypes.arrayOf(
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
    update_draggable_container_list: PropTypes.func

}

function map_state_props(state) {
    return {
        full_calendar: state.ui.full_calendar
    };
}

const UnassignedDispatchesContainer = connect(map_state_props)(UnassignedContainer);
export default UnassignedDispatchesContainer;
