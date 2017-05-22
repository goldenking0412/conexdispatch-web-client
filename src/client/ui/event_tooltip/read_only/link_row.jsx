/*!
 * kin
 * Copyright(c) 2016-2017 Benoit Person
 * Apache 2.0 Licensed
 */

import classnames from "classnames";
import PropTypes from 'prop-types';
import React from "react";
import _ from "lodash";

import { split_merged_id, split_source_id } from "../../../utils";

export default function LinkRow({id, link}) {
    if (!_.isEmpty(link)) {
        const [source_id, ,] = split_merged_id(id); // eslint-disable-line array-bracket-spacing
        const { provider_name } = split_source_id(source_id);

        const classes = classnames(
            "provider-button",
            "tiny",
            `${provider_name}-style`,
            "float-left"
        );
        return (
            <div className="row">
                <div className="small-12 columns">
                    <a
                      href={link}
                      className={classes}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                        see on {provider_name}
                    </a>
                </div>
            </div>
        );
    }
    return null;
}

LinkRow.propTypes = {
    id: PropTypes.string,
    link: PropTypes.string
};
