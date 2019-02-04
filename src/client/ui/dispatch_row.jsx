
import React from 'react';
import classnames from "classnames";
import PropTypes from 'prop-types';

import DraggableContainer from './draggable_container';


export default function DispatchRow(props) {
    const is_unassigned_task_wrapper = props.unassigned_task;
    const display_flex = "display-flex";
    let day_dispatch_container_classes;
    let dispatch_row_container_classes;
    let table_class="";
    let style = {};
    if (is_unassigned_task_wrapper) {
        day_dispatch_container_classes = classnames("box-container", "unassigned-task-wrapper");
        dispatch_row_container_classes = classnames("unassigned-tasks");
    }
    else {
        const height = props.height;
        if (height) {
            day_dispatch_container_classes = classnames("box-container", { height: props.height });
            style = {
                height: props.height
            };
        } else {
            day_dispatch_container_classes = classnames("box-container");
            table_class = classnames("cell");
        }
        dispatch_row_container_classes = classnames("driver-task-wrapper");
    }
    // console.log(style)
    return (
        <div className={dispatch_row_container_classes}>
            <table className={table_class}>
                <thead>
                    <tr className={display_flex}>
                        <th className={day_dispatch_container_classes} style={style}>
                            <DraggableContainer />
                        </th>
                        <th className={day_dispatch_container_classes}>
                            <DraggableContainer />
                        </th>
                        <th className={day_dispatch_container_classes}>
                            <DraggableContainer />
                        </th>
                        <th className={day_dispatch_container_classes}>
                            <DraggableContainer />
                        </th>
                        <th className={day_dispatch_container_classes}>
                            <DraggableContainer />
                        </th>
                        <th className={day_dispatch_container_classes}>
                            <DraggableContainer />
                        </th>
                        <th className={day_dispatch_container_classes}>
                            <DraggableContainer />
                        </th>
                    </tr>
                </thead>
            </table>
        </div>
    );
}

DispatchRow.propTypes = {
    unassigned_task: PropTypes.bool,
    height: PropTypes.number,
    // data: PropTypes.arrayOf(PropTypes.string),
    // view_type: PropTypes.string
}
