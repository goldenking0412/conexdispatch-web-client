/*!
 * kin
 * Copyright(c) 2016-2017 Benoit Person
 * Apache 2.0 Licensed
 */

import PropTypes from 'prop-types';
import React from "react";
import classnames from "classnames";
import { connect } from "react-redux";

import {
    async_add_driver
} from "../actions/drivers";

class NewDriverDialog extends React.Component {
    constructor(props) {
        super(props);
        this.onApplyClick = this.onApplyClick.bind(this);
        this.onCloseClick = this.onCloseClick.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);

        this.state = {
            name: "",
            phone_number: ""
        };
    }

    componentDidMount() {
        new Foundation.Reveal($(this.modal)); // eslint-disable-line no-new, no-undef
    }

    componentWillReceiveProps() {
    }

    componentWillUpdate() {
    }

    componentDidUpdate() {
    }

    onApplyClick() {
        // this.props.dispatch(patch_events([]));
        this.props.dispatch(
            async_add_driver({
                name: this.state.name,
                phone_number: this.state.phone_number
            })
        );
        $(this.modal).foundation("close");
    }

    onCloseClick() {
        $(this.modal).foundation("close");
    }

    onChangeName(event) {
        this.setState({
            name: event.target.value
        });
    }

    onChangePhoneNumber(event) {
        this.setState({
            phone_number: event.target.value
        });
    }

    render() {
        
        const container_classes = classnames("reveal");
        return (
            <div 
              ref={ref => {
                  this.modal = ref;
              }}
              id="NewDriverDialog"
              className={container_classes}
              data-reveal
            >
                <div className="row">
                    <div className="left-description">
                        <span>Driver Name</span>
                    </div>
                    <div className="right-content">
                        <input 
                          type="text" 
                          value={this.state.name} 
                          onChange={this.onChangeName} 
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="left-description">
                        <span>Phone Number</span>
                    </div>
                    <div className="right-content">
                        <input 
                          type="text" 
                          value={this.state.phone_number} 
                          onChange={this.onChangePhoneNumber} 
                        />
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


NewDriverDialog.propTypes = {
    dispatch: PropTypes.func
};

const NewDriverDialogContainer = connect(null)(NewDriverDialog);
// export default DispatchDialogContainer;

export default NewDriverDialogContainer;