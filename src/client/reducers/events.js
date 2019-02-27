/*!
 * kin
 * Copyright(c) 2016-2017 Benoit Person
 * Apache 2.0 Licensed
 */

import update from "react/lib/update";
import _ from "lodash";

const reducer = (events = [], action) => {
    let temp_events;
    let ind;
    switch (action.type) {
    case "ADD_EVENTS":
        console.log("current events", events);
        return update(events, {
            $merge: _.keyBy(action.events, "id")
        });
    case "PATCH_EVENTS":
        temp_events = events;
        ind = _.findIndex(temp_events, {id: action.events.id});
        temp_events[ind] = action.events;

        return temp_events;

    case "DELETE_EVENTS":
        return _.remove(events, event => { 
            if (event === undefined)
                return false;
            return event.id !== action.ids; 
        });
    default:
        return events;
    }
};

export default reducer;
