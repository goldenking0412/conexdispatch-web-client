import * as React from "react";
import PropTypes from 'prop-types';

export default function DraggableDispatch(props) {

    return (<div className='draggable-item' >
        <div>{props.title}</div>
    </div>);
}

DraggableDispatch.propTypes = {
    title: PropTypes.string
}
