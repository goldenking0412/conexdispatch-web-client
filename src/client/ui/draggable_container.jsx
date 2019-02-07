import * as React from "react";
import PropTypes from 'prop-types';
import DraggableDispatch from './draggable_dispatch';

export default class DraggableContainer extends React.Component {
    constructor(props) {
        super(props);
        this.unassigned = (props.type === 0);
        this.dispatches = [];
        this.showMore = this.showMore.bind(this);
        for (let i = 0; i < this.props.dispatches.length; i+=1) {
            this.dispatches.push(this.props.dispatches[i]);
        }
    }

    showMore(e) {
        console.log(e);
    }

    render() {
        const content = [];
        let additional_content;
        const length = this.dispatches.length > 6 ? 6 : this.dispatches.length;
        for (let i = 0; i < length; i+=1) {
            content.push(
                <DraggableDispatch 
                  key={i}
                  type={this.props.type}
                  dispatch={this.dispatches[i]}
                  view_type={this.props.view_type}
                />
            )
        }
        if (this.dispatches.length > 6) {
            console.log("XXXXXX");
            additional_content = (<div className="view-more">
                <span className="float-left">{this.dispatches.length - 6} more</span>
                <input 
                  type="button"
                  className="float-right"
                  onClick={this.showMore}
                  value="view more"
                />
            </div>);
        }

        if (this.unassigned) {
            return (<div className='draggable-container'>
                {content}
                {additional_content}
            </div>);
        }
        return (<div className='draggable-container'>
            {content}
        </div>);
    }
}

DraggableContainer.propTypes = {
    type: PropTypes.number, // 0: Unassigned, 1: Assigned
    dispatches: PropTypes.oneOfType([
        PropTypes.arrayOf(
            PropTypes.shape({
                title: PropTypes.string,
                invoice_no: PropTypes.string,
                line_item: PropTypes.string,
                expected_delivery_time: PropTypes.string,
                expected_ext_time: PropTypes.string,
                delivery_address: PropTypes.string,
                color: PropTypes.string
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
