
import PropTypes from 'prop-types';
import classnames from "classnames";
import React from "react";

import DispatchRow from "./dispatch_row";

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
        const drivers = this.props.drivers;
        const content = [];
        const { activeSelected } = this.state;
        for (let i = 0; i < drivers.length; i+=1) {
            const classname = classnames({
                'driver-wrapper' : true, 
                'selected' : activeSelected === this.props.drivers[i]
            });
            content.push(
                <div 
                  className={classname}
                  key={i}
                  onClick={() => this.setState({ activeSelected : activeSelected === drivers[i] ? '' : drivers[i] })} 
                >
                    <div className="driver cell">
                        {drivers[i]}
                    </div>
                    <DispatchRow height={100} />
                </div>
            )
        }
        return (<div>{content}</div>);
    }
}

TabcontentContainer.propTypes = {
    drivers: PropTypes.arrayOf(
        PropTypes.string
    )
};

export default TabcontentContainer;
