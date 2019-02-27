/*!
 * kin
 * Copyright(c) 2016-2017 Benoit Person
 * Apache 2.0 Licensed
 */

import "whatwg-fetch";
import bluebird from "bluebird";
import _ from "lodash";

import {
    api_url,
    fetch_check,
    fetch_check_simple_status,
    fetch_check_advanced_status,
    fetch_options
} from "../utils";
import { toggle_color_picker_tooltip } from "./ui";

/**
 * Private helpers functions
 */
const _event_to_redux = event => {
    /* eslint-disable no-param-reassign */

    return event;
    /* eslint-disable no-param-reassign */
};

/**
 * Others Action creators
 */
export const add_events = (events, creating = false) => {
    return {
        type: "ADD_EVENTS",
        creating,
        events
    };
};

export const patch_events = events => {
    return {
        type: "PATCH_EVENTS",
        events
    };
};

export const delete_events = ids => {
    return {
        type: "DELETE_EVENTS",
        ids
    };
};

export const deselect_event = () => {
    return (dispatch, get_state) => {
        const state = get_state();
        if (!_.isNull(state.selected_event.id)) {
            if (state.selected_event.dirty) {
                $("#leave-edit-mode-modal").foundation("open");
                return false;
            }

            dispatch({
                type: "DESELECT_EVENT"
            });

            // Make sure that the color picker is hidden
            if (state.ui.color_picker_tooltip.show) {
                dispatch(toggle_color_picker_tooltip(false));
            }
        }
        return true;
    };
};

export const select_event = (event_id, creating = false, force = false) => {
    return (dispatch, get_state) => {
        const state = get_state();
        if (event_id !== state.selected_event.id || force) {
            const did_deselect = dispatch(deselect_event());
            if (did_deselect) {
                dispatch({
                    type: "SELECT_EVENT",
                    id: event_id,
                    force,
                    creating
                });
            }
        }
    };
};

export const create_event = event => {
    return dispatch => {
        const redux_event = _event_to_redux(event);
        dispatch(add_events([redux_event], true));
        dispatch(select_event(redux_event.id, true));
    };
};

export const toggle_edit_selected_event = () => {
    return {
        type: "TOGGLE_EDIT_SELECTED_EVENT"
    };
};

export const set_dirty_selected_event = dirty => {
    return {
        type: "SET_DIRTY_SELECTED_EVENT",
        dirty
    };
};

/**
 * Async actions creators
 */
export const async_load_events = () => {
    return (dispatch) => {

        return fetch(api_url(`/dispatches/events`), fetch_options())
            .then(fetch_check)
            .catch(fetch_check_simple_status)
            .catch(_.partial(fetch_check_advanced_status, dispatch))
            .then(json_res => {
                // const redux_events = _(json_res)
                //     .map(_.partial(_event_to_redux, user_config.timezone))
                //     .value();
                dispatch(add_events(json_res));
            });
    };
};

export const async_create_event = (event) => {
    return (dispatch, get_state) => {
        return fetch(
            api_url(`/dispatches/event/add`),
            fetch_options({
                method: "POST",
                body: JSON.stringify(event)
            })
        )
            .then(fetch_check)
            .catch(fetch_check_simple_status)
            .catch(_.partial(fetch_check_advanced_status, dispatch))
            .then(json_res => {
                // TODO: handle error smoothly
                const state = get_state();
                dispatch(delete_events([state.selected_event.id])); // still contains the "creation" id

                // const redux_event = _event_to_redux(user_config.timezone, json_res.event);
                event.id = json_res.insertId;
                dispatch(add_events(event));
                dispatch(deselect_event());

            });
    };
};

export const async_save_event = (event_id, event_patch) => {
    return (dispatch) => {

        return fetch(
            api_url(`/dispatches/event/update`),
            fetch_options({
                method: "POST",
                body: JSON.stringify(event_patch)
            })
        )
            .then(fetch_check)
            .catch(fetch_check_simple_status)
            .catch(_.partial(fetch_check_advanced_status, dispatch))
            .then(json_res => {
                if (json_res.insertId !== undefined) {
                    dispatch(delete_events(event_id));
                    dispatch(add_events([event_patch]));
                    dispatch(deselect_event());
                }
            })
            .catch(err => {
                dispatch(
                    patch_events([
                        {
                            id: event_id,
                            syncing: false
                        }
                    ])
                );
                throw err;
            });
    };
};

export const async_delete_event = event_id => {
    return (dispatch, get_state) => {
        const state = get_state();
        const event = state.events[event_id];
        if (!_.isNil(event)) {
            return fetch(
                api_url(`/dispatches/event/delete`),
                fetch_options({
                    method: "POST",
                    body: JSON.stringify({ event_id })
                })
            )
                .then(fetch_check)
                .catch(fetch_check_simple_status)
                .catch(_.partial(fetch_check_advanced_status, dispatch))
                .then(json_res => {
                    console.log("response from server delete", json_res);
                    dispatch(deselect_event());
                    dispatch(delete_events([event_id]));
                });
        }
        return bluebird.reject(new Error("event is already deleted"));
    };
};
