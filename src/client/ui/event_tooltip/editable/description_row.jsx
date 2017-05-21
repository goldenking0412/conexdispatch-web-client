import PropTypes from 'prop-types';
/*!
 * kin
 * Copyright(c) 2016-2017 Benoit Person
 * Apache 2.0 Licensed
 */

import React from "react";
import _ from "lodash";

import SubtooltipOpenerRow from "./sub_tooltip_opener_row";

export default function DescriptionRow(props) {
    return (
        <SubtooltipOpenerRow open={props.open}>
            <h6>Description</h6>
            <p className="constrained">
                {_.isEmpty(props.description) ? "Add a description" : props.description}
            </p>
        </SubtooltipOpenerRow>
    );
}

DescriptionRow.propTypes = {
    description: PropTypes.string,
    open: PropTypes.func
};
