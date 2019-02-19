/*!
 * kin
 * Copyright(c) 2016-2017 Benoit Person
 * Apache 2.0 Licensed
 */

import "whatwg-fetch";
import _ from "lodash";

import {
    api_url,
    fetch_check,
    fetch_check_simple_status,
    fetch_check_advanced_status,
    fetch_options
} from "../utils";

/**
 * Others Action creators
 */
export const add_drivers = drivers => {
    return {
        type: "ADD_DRIVERS",
        drivers
    };
};

/**
 * Async actions creators
 */
export const async_load_drivers = () => {
    return (dispatch) => {
        return fetch(api_url("/dispatches/users/drivers"), fetch_options())
            .then(fetch_check)
            .catch(fetch_check_simple_status)
            .catch(_.partial(fetch_check_advanced_status, dispatch))
            .then(json_res => {
                dispatch(add_drivers(json_res));
            });
    };
};
