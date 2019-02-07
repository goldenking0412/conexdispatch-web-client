
import PropTypes from 'prop-types';
import classnames from "classnames";
import React from "react";

import DriverContainer from "./driver_container";

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
    componentWillUnmount(){
        global.document.removeEventListener( 'click', this.handleClick, false )
    }
    handleClick(event) {
        console.log(event);
    }

    render() {
        const content = [];
        const { activeSelected } = this.state;
        for (let i = 0; i < this.props.drivers.length; i+=1) {
            const classname = classnames({
                'driver-wrapper' : true, 
                'selected' : activeSelected === this.props.drivers[i].name
            });
            content.push(
                <div 
                  className={classname}
                  key={i}
                  onClick={() => this.setState({ activeSelected : activeSelected === this.props.drivers[i].name ? '' : this.props.drivers[i].name })} 
                >
                    <DriverContainer driver={this.props.drivers[i]} />
                </div>
            )
        }
        return (<div>{content}</div>);
    }
}

TabcontentContainer.propTypes = {
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
                            color: PropTypes.string
                        })
                    )
                })
            )
        })
    )
};

export default TabcontentContainer;
