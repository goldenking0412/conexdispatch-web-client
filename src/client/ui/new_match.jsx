/*!
 * kin
 * Copyright(c) 2016-2017 Benoit Person
 * Apache 2.0 Licensed
 */

import PropTypes from 'prop-types';
import React from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import _ from "lodash";

import {
    location_prop_type,
    driver_prop_type,
    match_prop_type
} from "../prop_types";

import {
    async_add_match
} from "../actions/matches";

class NewMatchDialog extends React.Component {
    constructor(props) {
        super(props);
        this.onApplyClick = this.onApplyClick.bind(this);
        this.onCloseClick = this.onCloseClick.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.onChangeDriver = this.onChangeDriver.bind(this);
        this.getUnassignedDriverList = this.getUnassignedDriverList.bind(this);
        this._render_location_list = this._render_location_list.bind(this);
        this._render_driver_list = this._render_driver_list.bind(this);

        this.state = {
            location_id: 1,
            driver_id: 0,

            unassigned_driver_list: []
        };
    }

    componentDidMount() {
        new Foundation.Reveal($(this.modal)); // eslint-disable-line no-new, no-undef
    }

    componentWillReceiveProps(newProps) {
        if (newProps.locations.length !== 0 && 
            newProps.matches.length !== 0 && 
            newProps.drivers.length !== 0) {

            const driver_list = this.getUnassignedDriverList(1, newProps.drivers, newProps.matches);

            this.setState({
                location_id: 1,
                driver_id: driver_list.length > 0 ? driver_list[0].id : 0,
                unassigned_driver_list: driver_list
            });
        }
    }

    componentWillUpdate() {
    }

    componentDidUpdate() {
    }

    onApplyClick() {
        // this.props.dispatch(patch_events([]));
        this.props.dispatch(
            async_add_match({
                location_id: this.state.location_id,
                driver_id: this.state.driver_id
            })
        );
    }

    onCloseClick() {
        $(this.modal).foundation("close");
    }

    onChangeLocation() {
        const selected_location_id = Number($("#location_list").val());
        this.setState({
            location_id: selected_location_id,
            unassigned_driver_list: this
                .getUnassignedDriverList(
                    selected_location_id, 
                    this.props.drivers, 
                    this.props.matches)
        });
    }

    onChangeDriver() {
        this.setState({
            driver_id: Number($("#driver_list").val())
        });
    }

    getUnassignedDriverList(location_id, drivers, matches) {
        const res = [];
        drivers.map((driver) => {
            if (driver !== undefined) {
                const match = _.find(matches, {"location_id": location_id, "driver_id": driver.id});
                if (match === undefined) {
                    res.push(driver);
                }
                return true;
            }
            return false;
        });
        return res;
    }

    _render_location_list() {
        const res = this.props.locations.map((location) => {
            return (
                <option 
                  value={location.id} 
                  key={location.id}
                >
                    {location.name}
                </option>);
        });
        return (
            <select 
              id="location_list"
              onChange={this.onChangeLocation}
            >
                {res}
            </select>);
    }

    _render_driver_list() {
        const res = this.state.unassigned_driver_list.map((driver) => {
            return (<option value={driver.id} key={driver.id}>{driver.name}</option>);
        });
        return (
            <select 
              id="driver_list" 
              onChange={this.onChangeDriver}
            >
                {res}
            </select>);
    }

    render() {
        const style = { 
            width: `50%`,
            float: `left`
        };
        const container_classes = classnames("reveal");
        return (
            <div 
              ref={ref => {
                  this.modal = ref;
              }}
              id="NewMatchDialog"
              className={container_classes}
              data-reveal
            >
                <div style={style}>
                    <div className="left-description">
                        <span>Locations</span>
                    </div>
                    <div className="right-content">
                        {this._render_location_list()}
                    </div>
                </div>

                <div style={style}>
                    <div className="left-description">
                        <span>Drivers</span>
                    </div>
                    <div className="right-content">
                        {this._render_driver_list()}
                    </div>
                </div>

                <div className="row">
                    <input 
                      className="float-right"
                      type="button" 
                      value="close" 
                      onClick={this.onCloseClick}
                    />
                    <input 
                      className="float-right"
                      type="button"
                      value="add"
                      onClick={this.onApplyClick}
                    />
                </div>
            </div>
        );
    }
}


NewMatchDialog.propTypes = {
    dispatch: PropTypes.func,
    locations: PropTypes.arrayOf(location_prop_type),
    drivers: PropTypes.arrayOf(driver_prop_type),
    matches: PropTypes.arrayOf(match_prop_type)
};

function map_state_props(state) {
    return {
        locations: state.locations,
        drivers: state.drivers,
        matches: state.matches
    };
}

const NewMatchDialogContainer = connect(map_state_props)(NewMatchDialog);
// export default DispatchDialogContainer;

export default NewMatchDialogContainer;