import PropTypes from 'prop-types';
import React from "react";

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
                  driver_id={this.props.driver.user_id}
                  location_id={this.props.location_id}
                  view_type={this.state.view_type} 
                  update_draggable_container_list={this.props.update_draggable_container_list}
                />
            </div>
        )
    }
}

DriverContainer.propTypes = {
    driver: driver_prop_type,
    location_id: PropTypes.number,
    update_draggable_container_list: PropTypes.func
}

export default DriverContainer;
