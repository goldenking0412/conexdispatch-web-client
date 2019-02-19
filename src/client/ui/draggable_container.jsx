import * as React from "react";
import $ from "jquery";
import PropTypes from 'prop-types';
import DraggableDispatch from './draggable_dispatch';

export default class DraggableContainer extends React.Component {
    constructor(props) {
        super(props);
        this.more_cont_id = this.guidGenerator();
        this.showMore = this.showMore.bind(this);
        this.hideMore = this.hideMore.bind(this);
        this.addNewDispatch = this.addNewDispatch.bind(this);
    }

    guidGenerator() {
        return `${this.S4()}${this.S4()}-${this.S4()}-${this.S4()}-${this.S4()}-${this.S4()}${this.S4()}${this.S4()}`;
    }

    S4() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }

    showMore(e) {
        e.stopPropagation();

        $(`#${this.more_cont_id}`).css("display", "block");
        const parent_width = $(`#${this.more_cont_id}`).parent().width();
        $(`#${this.more_cont_id}`).width(parent_width);
        console.log(`#${this.more_cont_id}`);
    }

    hideMore(e) {
        e.stopPropagation();
        $(`#${this.more_cont_id}`).css("display", "none");
    }

    addNewDispatch(e) {
        console.log("Add New Dispatch?");
        e.stopPropagation();
        $("#dispatch-edit-dialog").foundation("open");
    }

    _render_showMoreDialog(more_content) {
        return (
            <div 
              className="show-more-container" 
              id={this.more_cont_id}
            >
                <div className="draggable-container">
                    {more_content}
                </div>

                <div 
                  className="float-right" 
                  key={this.more_cont_id}
                >
                    <input 
                      type="button" 
                      value="cancel" 
                      onClick={this.hideMore}
                    />
                </div>
            </div>);
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
        const more_content = [];
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

                for (let i = 6; i < dispatches.length; i+=1) {
                    more_content.push(
                        <DraggableDispatch 
                          key={i}
                          unassigned={this.props.unassigned}
                          dispatch={dispatches[i]}
                          view_type={this.props.view_type}
                        />
                    )
                }
                
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
                    {this._render_showMoreDialog(more_content)}
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
                ready: PropTypes.string,
                payment_status: PropTypes.string,
                payment_gateway: PropTypes.string,
                title: PropTypes.string,
                invoice_no: PropTypes.string,
                line_item: PropTypes.string,
                color: PropTypes.string
            })
        )
    ]),
    view_type: PropTypes.number
}
