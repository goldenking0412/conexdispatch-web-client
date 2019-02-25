/*!
 * kin
 * Copyright(c) 2016-2017 Benoit Person
 * Apache 2.0 Licensed
 */

import update from "react/lib/update";
import _ from "lodash";

const reducer = (events = [], action) => {
    switch (action.type) {
    case "ADD_EVENTS":
        console.log("current events", events);
        return update(events, {
            $merge: _.keyBy(action.events, "id")
        });
    case "PATCH_EVENTS":
        return update(events, {
            $merge: _.keyBy(action.events, "id")
        });
    case "DELETE_EVENTS":
        return _.omit(events, action.ids);
    default:
        return events;
    }
};

// const _add_events = () => {
//     if (action.creating) {
//         const fc_events = _.map(
//             action.events,
//             _.partial(_event_to_fc_event, user_config.timezone)
//         );

//         const event_source = _layer_to_fc_event_source({
//             id: META_LAYER_CREATE_EVENT,
//             acl: {
//                 create: false,
//                 edit: false,
//                 delete: false
//             },
//             color: "#EC4956",
//             text_color: "#FFFFFF",
//             events: [],
//             selected: true,
//             loaded: true
//         });
//         event_source.events = fc_events;
//         this.add_layer(event_source);
//     } else {
//         const layers_update = {};
//         _.forEach(action.events, event => {
//             const [source_id, short_layer_id] = split_merged_id(event.id); // eslint-disable-line array-bracket-spacing
//             const layer_id = merge_ids(source_id, short_layer_id);
//             if (_.get(state, ["layers", layer_id, "loaded"], false)) {
//                 const fc_event = _event_to_fc_event(user_config.timezone, event);
//                 if (!(layer_id in layers_update)) {
//                     layers_update[layer_id] = [];
//                 }
//                 layers_update[layer_id].push(fc_event);
//             }
//         });

//         _.forEach(layers_update, (events, layer_id) => {
//             this.add_events(layer_id, events);
//         });
//     }
// }

export default reducer;
