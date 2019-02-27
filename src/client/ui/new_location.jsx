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
    async_add_location
} from "../actions/locations";

class NewLocationDialog extends React.Component {
    constructor(props) {
        super(props);
        this.onApplyClick = this.onApplyClick.bind(this);
        this.onCloseClick = this.onCloseClick.bind(this);
        this.onChangeName = this.onChangeName.bind(this);

        this.state = {
            name: ""
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
        this.props.dispatch(async_add_location(this.state.name));
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

    render() {
        
        const container_classes = classnames("reveal");
        return (
            <div 
              ref={ref => {
                  this.modal = ref;
              }}
              id="NewLocationDialog"
              className={container_classes}
              data-reveal
            >
                <div className="row">
                    <div className="left-description">
                        <span>Location Name</span>
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


NewLocationDialog.propTypes = {
    dispatch: PropTypes.func
};

const NewLocationDialogContainer = connect(null)(NewLocationDialog);
// export default DispatchDialogContainer;

export default NewLocationDialogContainer;