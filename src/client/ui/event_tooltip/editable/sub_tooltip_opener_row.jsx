import PropTypes from "prop-types";
/*!
 * kin
 * Copyright(c) 2016-2017 Benoit Person
 * Apache 2.0 Licensed
 */

import React from "react";

export default class SubtooltipOpenerRow extends React.Component {
    constructor() {
        super();
        this._on_key_up = this._on_key_up.bind(this);
    }

    // This is a utility function to ease keyboard navigation:
    // If the element is focused and you press enter, it will open the
    // relevant subtooltip
    _on_key_up(js_event) {
        if (js_event.which === 13 || js_event.which === 32) {
            this.props.open();
        }
    }

    render() {
        return (
            <section className="sub-tooltip-opener-row">
                <a onClick={this.props.open} onKeyUp={this._on_key_up} role="button" tabIndex={0}>
                    {this.props.children}
                </a>
            </section>
        );
    }
}

SubtooltipOpenerRow.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    open: PropTypes.func
};
