import PropTypes from 'prop-types';
/*!
 * kin
 * Copyright(c) 2016-2017 Benoit Person
 * Apache 2.0 Licensed
 */

import React from "react";
import _ from "lodash";

export default function DescriptionRow({description}) {
    if (!_.isEmpty(description)) {
        return (
            <div className="description-row row">
                <p className="constrained">
                    {description}
                </p>
            </div>
        );
    }
    return null;
}

DescriptionRow.propTypes = {
    description: PropTypes.string
};
