import PropTypes from 'prop-types';
import React from "react";
import { connect } from "react-redux";

import DispatchRow from "./dispatch_row";
import DriverArea from "./driver_area";

class DriverContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view_type: 0 // 0: standard view, 1: meaning view
        }
        this.changeViewType = this.changeViewType.bind(this);
    }
    componentDidUpdate() {
    }
    changeViewType(view_type) {
        console.log(view_type);
        this.setState({ view_type });
        this.render();
    }

    render() {
        return (
            <div>
                <DriverArea 
                  name={this.props.driver.name} 
                  phone={this.props.driver.phone_number}
                  changeViewType={this.changeViewType}
                />
                <DispatchRow 
                  height={100} 
                  data={this.props.driver.dispatches} 
                  view_type={this.state.view_type} 
                  update_draggable_container_list={this.props.update_draggable_container_list}
                />
            </div>
        )
    }
}

DriverContainer.propTypes = {
    full_calendar: PropTypes.shape({
        status: PropTypes.string,
        view: PropTypes.shape({
            name: PropTypes.string,
            params: PropTypes.object
        })
    }),
    driver: PropTypes.shape({
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
    }),
    update_draggable_container_list: PropTypes.func
}

function map_state_props(state) {
    return {
        full_calendar: state.ui.full_calendar
    };
}

const DriverWrapperContainer = connect(map_state_props)(DriverContainer);
export default DriverWrapperContainer;
