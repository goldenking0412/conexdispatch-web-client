
import React from 'react';
import classnames from "classnames";
import PropTypes from 'prop-types';


export default function DispatchRow(props) {
    const is_unassigned_task_wrapper = props.unassigned_task;
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
            day_dispatch_container_classes = classnames("box-container");
            style = {
                height: props.height - 1
            }
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
                    <tr>
                        <th className={day_dispatch_container_classes}  style={style}>
                        a
                        </th>
                        <th className={day_dispatch_container_classes}>
                        a
                        </th>
                        <th className={day_dispatch_container_classes}>
                        a
                        </th>
                        <th className={day_dispatch_container_classes}>
                        a
                        </th>
                        <th className={day_dispatch_container_classes}>
                        a
                        </th>
                        <th className={day_dispatch_container_classes}>
                        a
                        </th>
                        <th className={day_dispatch_container_classes}>
                        a
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
