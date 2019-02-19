/*!
 * kin
 * Copyright(c) 2016-2017 Benoit Person
 * Apache 2.0 Licensed
 */

import update from "react/lib/update";
import _ from "lodash";

const reducer = (drivers = [], action) => {
    switch (action.type) {
    case "ADD_DRIVERS":
        return update(drivers, {
            $merge: _.keyBy(action.drivers, "id")
        });
    default:
        return drivers;
    }
};

export default reducer;
