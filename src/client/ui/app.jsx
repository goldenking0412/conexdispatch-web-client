/*!
 * kin
 * Copyright(c) 2016-2017 Benoit Person
 * Apache 2.0 Licensed
 */

import classnames from "classnames";
import PropTypes from 'prop-types';
import React from "react";
import { connect } from "react-redux";
import Calendar from "react-calendar";
import Dragula from 'react-dragula';

import { EVENTS_NS } from "../config";

import { deselect_event } from "../actions/events";
import { toggle_sidebar } from "../actions/ui";
import CalendarToolbar from "./calendar_toolbar";
// import EventTooltip from "./event_tooltip/base";
import SettingsModal from "./settings_modal/base";
import Tabs from "./tabs";
import TabcontentContainer from "./tabcontent_container";
import UnassignedContainer from "./unassigned_container";
import DispatchDialog from "./dispatch_dialog";
import NewLocationDialog from "./new_location";
import NewDriverDialog from "./new_driver";

import { 
    match_prop_type, 
    driver_prop_type,
    location_prop_type
} from "../prop_types";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.keydown_handler = this.keydown_handler.bind(this);
        this.toggle_sidebar = this.toggle_sidebar.bind(this);
        this.onClickNewLocation = this.onClickNewLocation.bind(this);
        this.onClickNewDriver = this.onClickNewDriver.bind(this);
        this._render_main = this._render_main.bind(this);
    }

    componentDidMount() {
        this.dragulaDecorator();
        $(document).on(`keydown.${EVENTS_NS}`, this.keydown_handler);
    }

    onDrop(el) {
        console.log(el);
    }
    onClickNewLocation() {
        $("#NewLocationDialog").foundation("open");
    }
    onClickNewDriver() {
        $("#NewDriverDialog").foundation("open");
    }

    keydown_handler(event) {
        if (event.which === 27) {
            this.props.dispatch(deselect_event());
        }
    }

    toggle_sidebar(event) {
        event.preventDefault();
        this.props.dispatch(toggle_sidebar(!this.props.sidebar.show));
    }

    componentWillUnMount() {
        $(document).off(`keydown.${EVENTS_NS}`);
    }

    _render_main() {
        const main_content = [];
        if (this.props.locations.length !== 0 && 
            this.props.matches.length !== 0 &&
            this.props.drivers.length !== 0) {
            for (let i =  0; i < this.props.locations.length; i+=1) {
                if (this.props.locations[i] !== undefined) {
                    main_content.push(
                        <div label={this.props.locations[i].name} key={i}>
                            <TabcontentContainer 
                              location_id={this.props.locations[i].id}
                              update_draggable_container_list={this.dragulaDecorator}
                            />
                        </div>
                    )
                }
            }
        }
        else {
            main_content.push(<div label="TTT" key="1"><div /></div>);
            main_content.push(<div label="AAA" key="2"><div /></div>);
        }

        return main_content;
    }

    dragulaDecorator = () => {
        const options = {
            isContainer(el) { return el.classList.contains('dragula-container'); },
            moves() { return true; },
            accepts() { return true; },
            invalid() { return false; },
            direction: 'vertical',             // Y axis is considered when determining where an element would be dropped
            copy: false,                       // elements are moved by default, not copied
            copySortSource: false,             // elements in copy-source containers can be reordered
            revertOnSpill: false,              // spilling will put the element back where it was dragged from, if this is true
            removeOnSpill: false,              // spilling will `.remove` the element, if this is true
            mirrorContainer: document.querySelector('.draggable-container'),    // set the element that gets mirror elements appended
            ignoreInputTextSelection: true     // allows users to select input text, see details below
        };
        Dragula([...document.querySelectorAll('.draggable-container')], options)
            .on('drop', this.onDrop);
    };

    render() {
        const content_classes = classnames("content", { margin: this.props.sidebar.show }, "float-left");
        const aside_classes = classnames({ show: this.props.sidebar.show }, "float-left");

        return (
            <div>
                <CalendarToolbar />
                <div className="main-content">
                    <aside className={aside_classes}>
                        <div className="navigation-calendar">
                            <Calendar />
                        </div>
                        <div className="clearfix" />
                    </aside>
                    <div className="upper-content">
                        <div id="calendar" />
                        <UnassignedContainer 
                          update_draggable_container_list={this.dragulaDecorator} 
                        />
                    </div>
                </div>

                <Tabs>
                    {this._render_main()}
                </Tabs>
                <input 
                  type="button" 
                  value="New Location" 
                  id="newLocationBtn" 
                  onClick={this.onClickNewLocation}
                />
                <input 
                  type="button" 
                  value="New Driver" 
                  id="newDriverBtn" 
                  onClick={this.onClickNewDriver}
                />

                <div className={content_classes}>
                    <NewDriverDialog />
                    <NewLocationDialog />
                    <SettingsModal />
                    <DispatchDialog />
                </div>
            </div>
        );
    }
}

App.propTypes = {
    dispatch: PropTypes.func,
    sidebar: PropTypes.shape({
        show: PropTypes.bool
    }),
    drivers: PropTypes.arrayOf(driver_prop_type),
    matches: PropTypes.arrayOf(match_prop_type),
    locations: PropTypes.arrayOf(location_prop_type)
};

function map_state_props(state) {
    return {
        sidebar: state.ui.sidebar,
        drivers: state.drivers,
        matches: state.matches,
        locations: state.locations
    };
}

const AppContainer = connect(map_state_props)(App);
export default AppContainer;
