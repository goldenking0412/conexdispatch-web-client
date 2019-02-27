
import PropTypes from 'prop-types';
import classnames from "classnames";
import React from "react";
import { connect } from "react-redux";

import DriverContainer from "./driver_container";
import { match_prop_type } from "../prop_types";

class TabcontentContainer extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.getDriverIDs = this.getDriverIDs.bind(this);
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

    getDriverIDs() {
        const res = [];
        if (this.props.location_id !== undefined && this.props.matches.length !== 0) {
            for (let i = 0; i < this.props.matches.length; i+=1) {
                if (this.props.matches[i] !== undefined) {
                    if (this.props.matches[i].location_id === this.props.location_id) {
                        res.push(this.props.matches[i].driver_id);
                    }
                }
            }
        }
        return res;
    }

    handleClick(event) {
        console.log(event);
    }

    render() {
        const content = [];
        const { activeSelected } = this.state;
        if (this.props.location_id !== undefined) {
            const driver_list = this.getDriverIDs();
            for (let i = 0; i < driver_list.length; i+=1) {
                const classname = classnames({
                    'driver-wrapper' : true, 
                    'selected' : activeSelected === driver_list[i]
                });
                content.push(
                    <div 
                      className={classname}
                      key={i}
                      onClick={() => this.setState({ 
                          activeSelected : activeSelected === driver_list[i] ? '' : driver_list[i] }
                      )}
                    >
                        <DriverContainer 
                          driver_id={driver_list[i]}
                          location_id={this.props.location_id}
                          update_draggable_container_list={
                            this.props.update_draggable_container_list
                          }
                        />
                    </div>
                )
            }
        }
        else {
            content.push(<div />);
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
    location_id: PropTypes.number,
    update_draggable_container_list: PropTypes.func,
    matches: PropTypes.arrayOf(match_prop_type)
};

function map_state_props(state) {
    return {
        matches: state.matches
    };
}

const TabcontentContainerWrapper = connect(map_state_props)(TabcontentContainer);

export default TabcontentContainerWrapper;
