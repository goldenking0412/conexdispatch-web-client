import * as React from "react";
import Dragula from 'react-dragula';
import DraggableItem from './draggable_item';

export default class DraggableContainer extends React.Component {
    dragulaDecorator = (componentBackingInstance) => {
        if (componentBackingInstance) {
            const options = {
                isContainer() { return false; },
                moves() { return true; },
                accepts() { return true; },
                invalid() { return false; },
                direction: 'vertical',             // Y axis is considered when determining where an element would be dropped
                copy: false,                       // elements are moved by default, not copied
                copySortSource: false,             // elements in copy-source containers can be reordered
                revertOnSpill: false,              // spilling will put the element back where it was dragged from, if this is true
                removeOnSpill: false,              // spilling will `.remove` the element, if this is true
                mirrorContainer: document.body,    // set the element that gets mirror elements appended
                ignoreInputTextSelection: true     // allows users to select input text, see details below
            };
            Dragula([componentBackingInstance], options);
        }
    };

    render () {
        return (<div className='draggable-container' ref={this.dragulaDecorator}>
            <DraggableItem title={"Drag Me"} />
            <DraggableItem title={"Drop Me"} />
        </div>);
    }
}
