/*!
 * kin
 * Copyright(c) 2016-2017 Benoit Person
 * Apache 2.0 Licensed
 */

import update from "react/lib/update";
import _ from "lodash";


const add_event = (origin_events, guest_events) => {
    const result_events = origin_events;
    const origin_events_length = origin_events.length;
    for (let i = 0; i < guest_events.length; i+=1) {
        let exist = false;
        let index = 0;
        for (let j = 0; j < origin_events_length; j+=1) {
            if (origin_events[j].id === guest_events[i].id) {
                exist = true;
                index = j;
            }
        }
        if (exist) {
            // update origin_events[index] by guest_events[i]
            result_events[index] = guest_events[i];
            // result_events.push(origin_events[i]);
        }
        else {
            result_events.push(guest_events[i]);
        }
    }
    return result_events;
}

const delete_event = (origin_events, id) => {
    let index = -1;
    for (let i = 0; i < origin_events.length; i+=1) {
        if (origin_events[i].id === id) {
            index = i;
        }
    }
    if (index > -1) {
        origin_events.splice(index, 1);
    }
    return origin_events;
}

const reducer = (events = [], action) => {
    let temp_events;
    let ind;
    switch (action.type) {
    case "ADD_EVENTS":
        temp_events = add_event(events, action.events);
        return update(temp_events, {});
        // return temp_events;
    case "PATCH_EVENTS":
        temp_events = events;
        ind = _.findIndex(temp_events, {id: action.events.id});
        temp_events[ind] = action.events;

        return temp_events;

    case "DELETE_EVENTS":
        return delete_event(events, action.ids);
    default:
        return events;
    }
};

export default reducer;