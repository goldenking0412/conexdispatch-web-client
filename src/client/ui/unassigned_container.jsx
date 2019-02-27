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
        const content = [];
        const start_day = current_week.params.start.clone();
        const end_day = current_week.params.end.add(1, "days");
        const end_day_string = end_day.format("YYYY-MM-DD");

        for (; start_day.format("YYYY-MM-DD") !== end_day_string; start_day.add(1, "days")) {
            content.push(
                <th 
                  className={day_dispatch_container_classes} 
                  key={start_day.format("YYYY-MM-DD")}
                >
                    <DraggableContainer 
                      unassigned
                      date={start_day.format("YYYY-MM-DD")}
                    />
                </th>);
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
    update_draggable_container_list: PropTypes.func

}

function map_state_props(state) {
    return {
        full_calendar: state.ui.full_calendar,
        events: state.events
    };
}

const UnassignedDispatchesContainer = connect(map_state_props)(UnassignedContainer);
export default UnassignedDispatchesContainer;
