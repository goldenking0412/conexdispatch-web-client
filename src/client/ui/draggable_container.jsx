import * as React from "react";
import PropTypes from 'prop-types';
import DraggableDispatch from './draggable_dispatch';

export default class DraggableContainer extends React.Component {
    constructor(props) {
        super(props);
        this.showMore = this.showMore.bind(this);
        this.addNewDispatch = this.addNewDispatch.bind(this);
    }

    showMore(e) {
        console.log(e);
    }

    addNewDispatch(e) {
        console.log("Add New Dispatch?");
        e.stopPropagation();
    }

    render() {
        if (this.props.dispatches === undefined) {
            return (
                <div className="daily-container">
                    <div className="draggable-container" onClick={this.addNewDispatch} />
                </div>);
        }
        const dispatches = [];
        const content = [];
        let additional_content;
        for (let i = 0; i < this.props.dispatches.length; i+=1) {
            dispatches.push(this.props.dispatches[i]);
        }

        if (this.props.unassigned) {
            const length = dispatches.length > 6 ? 6 : dispatches.length;
            for (let i = 0; i < length; i+=1) {
                content.push(
                    <DraggableDispatch 
                      key={i}
                      unassigned={this.props.unassigned}
                      dispatch={dispatches[i]}
                      view_type={this.props.view_type}
                    />
                )
            }
            if (dispatches.length > 6) {
                additional_content = (<div className="view-more">
                    <span className="float-left">{dispatches.length - 6} more</span>
                    <input 
                      type="button"
                      className="float-right"
                      onClick={this.showMore}
                      value="view more"
                    />
                </div>);
            }
            return (
                <div className='daily-container'>
                    <div 
                      className='draggable-container' 
                      onClick={this.addNewDispatch}
                    >
                        {content}
                    </div>
                    {additional_content}
                </div>);
        }
        
        // Assigned Dispatch Container        
        for (let i = 0; i < dispatches.length; i+=1) {
            content.push(
                <DraggableDispatch 
                  key={i}
                  unassigned={this.props.unassigned}
                  dispatch={dispatches[i]}
                  view_type={this.props.view_type}
                />
            )
        }
        return (
            <div className='daily-container'>
                <div 
                  className='draggable-container' 
                  onClick={this.addNewDispatch}
                >
                    {content}
                </div>
            </div>);

    }
}

DraggableContainer.propTypes = {
    unassigned: PropTypes.bool,
    dispatches: PropTypes.oneOfType([
        PropTypes.arrayOf(
            PropTypes.shape({
                title: PropTypes.string,
                invoice_no: PropTypes.string,
                line_item: PropTypes.string,
                expected_delivery_time: PropTypes.string,
                expected_ext_time: PropTypes.string,
                delivery_address: PropTypes.string,
                color: PropTypes.string,
                delivery_progress: PropTypes.string
            })
        ),
        PropTypes.arrayOf(
            PropTypes.shape({
                title: PropTypes.string,
                invoice_no: PropTypes.string,
                line_item: PropTypes.string,
                payment_gateway: PropTypes.string,
                payment_type: PropTypes.string,
                delivery_address: PropTypes.string
            })
        )
    ]),
    view_type: PropTypes.number
}
