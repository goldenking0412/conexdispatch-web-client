/*!
 * kin
 * Copyright(c) 2016-2017 Benoit Person
 * Apache 2.0 Licensed
 */

import { connect } from "react-redux";
import PropTypes from "prop-types";
import React from "react";
import _ from "lodash";

import { color_prop_type, event_prop_type, layer_prop_type } from "../../prop_types";
import { merge_ids, split_merged_id } from "../../utils";

import { deselect_event, toggle_edit_selected_event } from "../../actions/events";

import KinTooltip from "../kin_tooltip";
import AttendeeNotificationModal from "./attendee_notification_modal";
import EditableEventTooltip from "./editable/base";
import EventDeletionModal from "./event_deletion_modal";
import LeaveEditModeModal from "./leave_edit_mode_modal";
import ReadOnlyEventTooltip from "./read_only/base";

class EventTooltip extends React.Component {
    deselect_event = () => {
        this.props.dispatch(deselect_event());
    };

    toggle_edit_mode = () => {
        if (this.props.selected_event.creating) {
            this.deselect_event();
        } else {
            this.props.dispatch(toggle_edit_selected_event());
        }
    };

    render_tooltip() {
        return this.props.selected_event.editing
            ? <EditableEventTooltip event={this.props.event} {...this.props.selected_event} />
            : <ReadOnlyEventTooltip
              colors={this.props.colors}
              toggle_edit_mode={this.toggle_edit_mode}
              event={this.props.event}
              layer={this.props.layer}
              {...this.props.selected_event}
            />;
    }

    render() {
        const target = document.querySelector(
            `.fc-event[data-id="${this.props.selected_event.id}"]`
        );

        const tooltip_options = {
            placement: "right"
        };

        return (
            <KinTooltip
              on_close={this.deselect_event}
              overlay_classes={["event-tooltip-overlay"]}
              root_classes={["callout", "event-tooltip"]}
              target={target}
              tooltip_options={tooltip_options}
            >
                {this.render_tooltip()}
                <LeaveEditModeModal dispatch={this.props.dispatch} />
                <AttendeeNotificationModal />
                <EventDeletionModal />
            </KinTooltip>
        );
    }
}

EventTooltip.propTypes = {
    event: event_prop_type,
    layer: layer_prop_type,
    selected_event: PropTypes.shape({
        id: PropTypes.string,
        creating: PropTypes.bool,
        dirty: PropTypes.bool,
        editing: PropTypes.bool
    }),
    dispatch: PropTypes.func,
    colors: PropTypes.objectOf(color_prop_type)
};

const map_state_props = state => {
    const output = {
        selected_event: state.selected_event,
        layer: null,
        event: null,
        colors: {}
    };
    const event_id = state.selected_event.id;
    if (!_.isNull(event_id)) {
        // TODO: how can we come here if we have a null event_id?
        const [source_id, short_layer_id] = split_merged_id(event_id); // eslint-disable-line array-bracket-spacing
        const layer_id = merge_ids(source_id, short_layer_id);
        output.layer = state.layers[layer_id];
        output.event = state.events[event_id];
        output.colors = _.get(state, ["sources", source_id, "colors"], {});
    }
    return output;
};

const EventTooltipContainer = connect(map_state_props)(EventTooltip);
export default EventTooltipContainer;
