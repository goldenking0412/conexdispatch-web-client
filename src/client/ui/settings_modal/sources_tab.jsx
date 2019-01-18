import PropTypes from "prop-types";
/*!
 * kin
 * Copyright(c) 2016-2017 Benoit Person
 * Apache 2.0 Licensed
 */

import React from "react";
import { flow, isNil } from "lodash";
import { filter, join, map, orderBy } from "lodash/fp";

import { source_prop_type } from "../../prop_types";
import { split_source_id, providers } from "../../utils";
import SettingsModalSourceRow from "./source_row";

const mapUncaped = map.convert({ cap: false });

const _get_sub_title = flow(
    source => [source.display_name, source.email],
    filter(val => !isNil(val)),
    join(" - ")
);

const _render_connected_sources_row = (dispatch, sources) =>
    flow(
        orderBy("id", "asc"),
        map(source => {
            const { provider_name } = split_source_id(source.id);
            return (
                <SettingsModalSourceRow
                  key={source.id}
                  id={source.id}
                  status={source.status}
                  name={provider_name}
                  sub_title={_get_sub_title(source)}
                  dispatch={dispatch}
                />
            );
        })
    )(sources);

const _render_available_sources_row = mapUncaped((provider, name) => (
    <SettingsModalSourceRow key={name} name={name} sub_title={provider.settings_sub_title} />
));

const SettingsModalSourcesTab = ({ dispatch, sources }) => {
    return (
        <div className="tabs-panel" id="settings-accounts">
            <header>
                <h4>Add Account</h4>
            </header>
            <table className="hover available-sources">
                <tbody>
                    {_render_available_sources_row(providers)}
                </tbody>
            </table>

            <header>
                <h4>Connected Accounts</h4>
            </header>
            <table className="hover connected-sources">
                <tbody>
                    {_render_connected_sources_row(dispatch, sources)}
                </tbody>
            </table>
        </div>
    );
};

SettingsModalSourcesTab.propTypes = {
    sources: PropTypes.objectOf(source_prop_type),
    dispatch: PropTypes.func
};

export default SettingsModalSourcesTab;
