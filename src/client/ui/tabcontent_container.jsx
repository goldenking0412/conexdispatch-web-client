
import PropTypes from 'prop-types';
import classnames from "classnames";
import React from "react";

import DriverContainer from "./driver_container";
import { match_prop_type } from "../prop_types";

class TabcontentContainer extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            activeSelected : ''
        }
    }
    componentDidMount(){
        global.document.addEventListener( 'click', this.handleClick, false )
    }
    componentDidUpdate() {
    }
    componentWillUnmount(){
        global.document.removeEventListener( 'click', this.handleClick, false )
    }
    handleClick(event) {
        console.log(event);
    }

    render() {
        const content = [];
        const { activeSelected } = this.state;
        if (this.props.match !== undefined) {
            for (let i = 0; i < this.props.match.drivers.length; i+=1) {
                const classname = classnames({
                    'driver-wrapper' : true, 
                    'selected' : activeSelected === this.props.match.drivers[i].name
                });
                content.push(
                    <div 
                      className={classname}
                      key={i}
                      onClick={() => this.setState({ 
                          activeSelected : activeSelected === this.props.match.drivers[i].name ? '' : this.props.match.drivers[i].name }
                      )}
                    >
                        <DriverContainer 
                          driver={this.props.match.drivers[i]} 
                          update_draggable_container_list={
                            this.props.update_draggable_container_list
                          }
                          location_id={this.props.match.location_id}
                        />
                    </div>
                )
            }
        }
        else if (this.props.drivers !== undefined && this.props.drivers.length !== 0) {
            for (let i = 0; i < this.props.drivers.length; i+=1) {
                const classname = classnames({
                    'driver-wrapper' : true, 
                    'selected' : activeSelected === this.props.drivers[i].name
                });
                content.push(
                    <div 
                      className={classname}
                      key={i}
                      onClick={() => this.setState({ 
                          activeSelected : activeSelected === this.props.drivers[i].name ? '' : this.props.drivers[i].name }
                      )}
                    >
                        <DriverContainer 
                          driver={this.props.drivers[i]} 
                          update_draggable_container_list={
                            this.props.update_draggable_container_list
                          }
                        />
                    </div>
                )
            }
        }
        return (<div>{content}</div>);
    }
}

TabcontentContainer.propTypes = {
    full_calendar: PropTypes.shape({
        status: PropTypes.string,
        view: PropTypes.shape({
            name: PropTypes.string,
            params: PropTypes.object
        })
    }),
    match: match_prop_type,
    drivers: PropTypes.arrayOf(
        PropTypes.shape({
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
        })
    ),
    update_draggable_container_list: PropTypes.func
};

export default TabcontentContainer;
