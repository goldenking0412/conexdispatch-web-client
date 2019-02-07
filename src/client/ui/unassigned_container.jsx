import React from 'react';
import classnames from "classnames";
import PropTypes from 'prop-types';

import DraggableContainer from './draggable_container';

import {
    get_full_calendar_view,
} from "../actions/ui";

export default class UnassignedContainer extends React.Component {

    componentDidMount() {
        console.log(get_full_calendar_view());
    }

    render() {
        const display_flex = "display-flex";
        const day_dispatch_container_classes = classnames("box-container", "unassigned-task-wrapper");
        const dispatch_row_container_classes = classnames("unassigned-tasks");
        console.log(get_full_calendar_view());
        return (
            <div className={dispatch_row_container_classes}>
                <table>
                    <thead>
                        <tr className={display_flex}>
                            <th className={day_dispatch_container_classes}>
                                <DraggableContainer 
                                  type={0} 
                                  dispatches={this.props.data[0].daily_dispatches} 
                                />
                            </th>
                            <th className={day_dispatch_container_classes}>
                                <DraggableContainer 
                                  type={0} 
                                  dispatches={this.props.data[1].daily_dispatches} 
                                />
                            </th>
                            <th className={day_dispatch_container_classes}>
                                <DraggableContainer 
                                  type={0} 
                                  dispatches={this.props.data[2].daily_dispatches} 
                                />
                            </th>
                            <th className={day_dispatch_container_classes}>
                                <DraggableContainer 
                                  type={0} 
                                  dispatches={this.props.data[3].daily_dispatches} 
                                />
                            </th>
                            <th className={day_dispatch_container_classes}>
                                <DraggableContainer 
                                  type={0} 
                                  dispatches={this.props.data[4].daily_dispatches} 
                                />
                            </th>
                            <th className={day_dispatch_container_classes}>
                                <DraggableContainer 
                                  type={0} 
                                  dispatches={this.props.data[5].daily_dispatches} 
                                />
                            </th>
                            <th className={day_dispatch_container_classes}>
                                <DraggableContainer 
                                  type={0} 
                                  dispatches={this.props.data[6].daily_dispatches} 
                                />
                            </th>
                        </tr>
                    </thead>
                </table>
            </div>
        );    
    }
}

UnassignedContainer.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            date: PropTypes.string,
            daily_dispatches: PropTypes.arrayOf(
                PropTypes.shape({
                    title: PropTypes.string,
                    invoice_no: PropTypes.string,
                    line_item: PropTypes.string,
                    payment_gateway: PropTypes.string,
                    payment_type: PropTypes.string,
                    delivery_address: PropTypes.string
                })
            )
        })
    )
}
