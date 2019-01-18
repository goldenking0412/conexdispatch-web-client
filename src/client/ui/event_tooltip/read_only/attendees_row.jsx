import PropTypes from 'prop-types';
/*!
 * kin
 * Copyright(c) 2016-2017 Benoit Person
 * Apache 2.0 Licensed
 */

import React from "react";
import _ from "lodash";

import { attendee_prop_type } from "../../../prop_types";
import { ATTENDEE_BG_COLORS, hash_code, rsvp_icons } from "../../../utils";

function AttendeeCell({attendee}) {
    const email_hash = hash_code(attendee.email);
    const color = ATTENDEE_BG_COLORS[email_hash % ATTENDEE_BG_COLORS.length];
    return (
        <div key={attendee.email} className="avatar">
            <a
              target="_blank"
              href={`mailto:${attendee.email}`}
              title={attendee.email}
              rel="noopener noreferrer"
            >
                <img
                  className="avatar-rsvp"
                  src={rsvp_icons[attendee.response_status]}
                  alt={`Attendee RSVP: ${attendee.response_status}`}
                />
                <div className="avatar-bg" style={{ background: color }}>
                    {attendee.email.charAt(0).toUpperCase()}
                </div>
            </a>
        </div>
    );
};
AttendeeCell.propTypes = {
    attendee: attendee_prop_type
};

export default function AttendeesRow({attendees}) {
    if (!_.isEmpty(attendees)) {
        return (
            <div className="attendees-row row small-up-8 constrained">
                {_.map(attendees, attendee => {
                    return (
                        <div className="columns" key={attendee.email}>
                            <AttendeeCell attendee={attendee} />
                        </div>
                    );
                })}
            </div>
        );
    }
    return null;
}

AttendeesRow.propTypes = {
    attendees: PropTypes.arrayOf(attendee_prop_type)
};
