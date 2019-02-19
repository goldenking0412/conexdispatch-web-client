/*!
 * kin
 * Copyright(c) 2016-2017 Benoit Person
 * Apache 2.0 Licensed
 */

import update from "react/lib/update";
import _ from "lodash";

const reducer = (matches = [], action) => {
    switch (action.type) {
    case "ADD_MATCHES":
        return update(matches, {
            $merge: _.keyBy(action.matches, "id")
        });
    default:
        return matches;
    }
};

export default reducer;
