import PropTypes from 'prop-types';
import React from "react";
import _ from "lodash";
import { connect } from "react-redux";

import DispatchRow from "./dispatch_row";
import DriverArea from "./driver_area";

import { driver_prop_type } from "../prop_types";

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

    getDriverData(){
        return _.find(this.props.drivers, {'id': this.props.driver_id});
    }

    changeViewType(view_type) {
        console.log(view_type);
        this.setState({ view_type });
        this.render();
    }

    render() {
        const driver = this.getDriverData();
        return (
            <div>
                <DriverArea 
                  name={driver.name} 
                  phone={driver.phone_number}
                  changeViewType={this.changeViewType}
                />
                <DispatchRow 
                  height={100} 
                  driver_id={this.props.driver_id}
                  location_id={this.props.location_id}
                  view_type={this.state.view_type} 
                  update_draggable_container_list={this.props.update_draggable_container_list}
                />
            </div>
        )
    }
}

DriverContainer.propTypes = {
    driver_id: PropTypes.number,
    location_id: PropTypes.number,
    update_draggable_container_list: PropTypes.func,
    drivers: PropTypes.arrayOf(driver_prop_type)
}

function map_state_props(state) {
    return {
        drivers: state.drivers
    };
}

const DriverContainerWrapper = connect(map_state_props)(DriverContainer);

export default DriverContainerWrapper;
