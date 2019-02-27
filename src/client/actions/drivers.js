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

export const async_add_driver = driver => {
    return (dispatch) => {
        return fetch(
            api_url("/dispatches/users/driver/add"), 
            fetch_options({
                method: "POST",
                body: JSON.stringify(driver)
            })
        )
            .then(fetch_check)
            .catch(fetch_check_simple_status)
            .catch(_.partial(fetch_check_advanced_status, dispatch))
            .then(json_res => {
                console.log("response from server", json_res);
                const newDriver = { 
                    id: json_res.insertId, 
                    name: driver.name,
                    phone_number: driver.phone_number,
                    role: 4
                };
                console.log("adding driver", newDriver);
                dispatch(add_drivers([newDriver]));
            });
    };
};
