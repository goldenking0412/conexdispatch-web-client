import * as React from "react";
import PropTypes from 'prop-types';

export default class DriverArea extends React.Component {
    constructor(props) {
        super(props);
        this.switchViewType = this.switchViewType.bind(this);
        this.viewType = 0; // 0: standard view, 1: meaning view
        this.buttonText = "standard view";
    }

    switchViewType(event) {
        event.stopPropagation();
        this.viewType = 1 - this.viewType;
        this.props.changeViewType(this.viewType);
        if (this.viewType === 1) {
            this.buttonText = "expanded view";
        }
        else
            this.buttonText = "standard view";
    }

    render() {
        return (<div className='driver cell'>
            <span className='name'>{this.props.name}</span>
            <div className="driver-phone-area">
                {this.props.phone}
            </div>
            <input 
              type="button" 
              className="switch-view-type" 
              onClick={this.switchViewType} 
              value={this.buttonText} 
            />
        </div>);
    }
}

DriverArea.propTypes = {
    changeViewType: PropTypes.func,
    name: PropTypes.string,
    phone: PropTypes.string
}
