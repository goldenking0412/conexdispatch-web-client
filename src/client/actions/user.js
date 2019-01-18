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
    fetch_options,
    location_reload,
    user_config
} from "../utils";

export const async_load_user = () => {
    return dispatch => {
        return fetch(api_url("/user"), fetch_options())
            .then(fetch_check)
            .catch(fetch_check_simple_status)
            .catch(_.partial(fetch_check_advanced_status, dispatch))
            .then(json_res => {
                return user_config.load_config(json_res);
            });
    };
};

export const async_patch_user = (user_patch, reload = true) => {
    return dispatch => {
        return fetch(
            api_url("/user"),
            fetch_options({
                method: "PATCH",
                body: JSON.stringify(user_patch)
            })
        )
            .then(fetch_check)
            .catch(fetch_check_simple_status)
            .catch(_.partial(fetch_check_advanced_status, dispatch))
            .then(json_res => {
                const config = user_config.load_config(json_res);
                if (reload) {
                    location_reload();
                }
                return config;
            });
    };
};

export const async_logout_user = () => {
    return dispatch => {
        return fetch(api_url("/authentication/logout"), fetch_options())
            .then(fetch_check)
            .catch(fetch_check_simple_status)
            .catch(_.partial(fetch_check_advanced_status, dispatch))
            .then(() => {
                // TODO; double-check url and reload redirect url?
                location_reload();
            });
    };
};
