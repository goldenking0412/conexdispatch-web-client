
import React from 'react';
import classnames from "classnames";
import PropTypes from 'prop-types';

import DraggableContainer from './draggable_container';


export default function DispatchRow(props) {
    const display_flex = "display-flex";
    const dispatch_row_container_classes = classnames("driver-task-wrapper");
    const height = props.height;
    let day_dispatch_container_classes;
    let table_class="";
    let style = {};
    if (height) {
        day_dispatch_container_classes = classnames("box-container", { height: props.height });
        style = {
            height: props.height
        };
    } else {
        day_dispatch_container_classes = classnames("box-container");
        table_class = classnames("cell");
    }
    return (
        <div className={dispatch_row_container_classes}>
            <table className={table_class}>
                <thead>
                    <tr className={display_flex}>
                        <th className={day_dispatch_container_classes} style={style}>
                            <DraggableContainer 
                              type={1} 
                              dispatches={props.data[0].daily_dispatches} 
                              view_type={props.view_type}
                            />
                        </th>
                        <th className={day_dispatch_container_classes}>
                            <DraggableContainer 
                              type={1} 
                              dispatches={props.data[1].daily_dispatches} 
                              view_type={props.view_type}
                            />
                        </th>
                        <th className={day_dispatch_container_classes}>
                            <DraggableContainer 
                              type={1} 
                              dispatches={props.data[2].daily_dispatches} 
                              view_type={props.view_type}
                            />
                        </th>
                        <th className={day_dispatch_container_classes}>
                            <DraggableContainer 
                              type={1} 
                              dispatches={props.data[3].daily_dispatches} 
                              view_type={props.view_type}
                            />
                        </th>
                        <th className={day_dispatch_container_classes}>
                            <DraggableContainer 
                              type={1} 
                              dispatches={props.data[4].daily_dispatches} 
                              view_type={props.view_type}
                            />
                        </th>
                        <th className={day_dispatch_container_classes}>
                            <DraggableContainer 
                              type={1} 
                              dispatches={props.data[5].daily_dispatches} 
                              view_type={props.view_type}
                            />
                        </th>
                        <th className={day_dispatch_container_classes}>
                            <DraggableContainer 
                              type={1} 
                              dispatches={props.data[6].daily_dispatches} 
                              view_type={props.view_type}
                            />
                        </th>
                    </tr>
                </thead>
            </table>
        </div>
    );
}

DispatchRow.propTypes = {
    height: PropTypes.number,
    data: PropTypes.arrayOf(
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
                    color: PropTypes.string
                })
            )
        })
    ),
    view_type: PropTypes.number
}
