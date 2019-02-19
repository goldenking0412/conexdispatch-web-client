/*!
 * kin
 * Copyright(c) 2016-2017 Benoit Person
 * Apache 2.0 Licensed
 */

import update from "react/lib/update";
import _ from "lodash";

const reducer = (locations = [], action) => {
    switch (action.type) {
    case "ADD_LOCATIONS":
        return update(locations, {
            $merge: _.keyBy(action.locations, "id")
        });
    default:
        return locations;
    }
};

export default reducer;
