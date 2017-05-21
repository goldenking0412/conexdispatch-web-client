/*!
 * kin
 * Copyright(c) 2016-2017 Benoit Person
 * Apache 2.0 Licensed
 */

import moment from "moment-timezone";
import PropTypes from 'prop-types';
import _ from "lodash";

export const moment_prop_types = {
    momentObject: (props, prop_name, component_name) => {
        const prop_value = props[prop_name];
        if (_.isEmpty(prop_value)) {
            // accept empty
            return null;
        }

        if (!moment.isMoment(prop_value)) {
            return new Error(
                `Invalid prop \`${prop_name}\` supplied to \`${component_name}\`: \`${prop_value}\`. Validation failed`
            );
        }

        return null;
    }
};

export const attendee_prop_type = PropTypes.shape({
    email: PropTypes.string,
    response_status: PropTypes.oneOf(["needs_action", "declined", "tentative", "accepted"]),
    self: PropTypes.bool
});

export const reminder_prop_type = PropTypes.shape({
    minutes: PropTypes.number
});

const event_id_prop_type = PropTypes.string;
export const event_prop_type = PropTypes.shape({
    id: event_id_prop_type,
    title: PropTypes.string,
    status: PropTypes.oneOf(["confirmed"]),
    description: PropTypes.string,
    location: PropTypes.string,
    all_day: PropTypes.bool,
    start: moment_prop_types.momentObject,
    end: moment_prop_types.momentObject,
    attendees: PropTypes.arrayOf(attendee_prop_type),
    reminders: PropTypes.arrayOf(reminder_prop_type),
    kind: PropTypes.oneOf(["event#basic", "event#invitation"])
});

const layer_id_prop_type = PropTypes.string;
export const layer_prop_type = PropTypes.shape({
    id: layer_id_prop_type,
    events: PropTypes.arrayOf(layer_id_prop_type),
    title: PropTypes.string,
    acl: PropTypes.shape({
        create: PropTypes.bool,
        edit: PropTypes.bool,
        delete: PropTypes.bool
    }),
    color: PropTypes.string,
    text_color: PropTypes.string,
    selected: PropTypes.bool,
    loaded: PropTypes.bool,
    sync_token: PropTypes.string
});

const base_source_shape = {
    // id: React.PropTypes.string,
    id: PropTypes.string,
    layers: PropTypes.arrayOf(layer_id_prop_type),
    display_name: PropTypes.string,
    email: PropTypes.string,
    status: PropTypes.oneOf(["connected", "refreshing", "disconnected"]),
    colors: PropTypes.object,
    loaded: PropTypes.bool
};
export const source_prop_type = PropTypes.shape(base_source_shape);

export const expanded_source_prop_type = PropTypes.shape(
    _.merge({}, base_source_shape, {
        layers: PropTypes.objectOf(layer_prop_type)
    })
);

export const color_prop_type = PropTypes.shape({
    background: PropTypes.string,
    foreground: PropTypes.string
});
