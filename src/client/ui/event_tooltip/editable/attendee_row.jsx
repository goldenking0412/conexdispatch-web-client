import PropTypes from 'prop-types';
/*!
 * kin
 * Copyright(c) 2016-2017 Benoit Person
 * Apache 2.0 Licensed
 */

import React from "react";
import _ from "lodash";

import SubtooltipOpenerRow from "./sub_tooltip_opener_row";
import { attendee_prop_type } from "../../../prop_types";

export default function AttendeeRow(props) {
    return (
        <SubtooltipOpenerRow open={props.open}>
            <h6>People</h6>
            <p className="constrained">
                {_.isEmpty(props.attendees)
                    ? "Add email address"
                    : _(props.attendees).slice(0, 3).map("email").join(", ")}
            </p>
        </SubtooltipOpenerRow>
    );
}

AttendeeRow.propTypes = {
    attendees: PropTypes.arrayOf(attendee_prop_type),
    open: PropTypes.func
};
