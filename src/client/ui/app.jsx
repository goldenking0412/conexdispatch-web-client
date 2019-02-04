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

import { EVENTS_NS } from "../config";

import { deselect_event } from "../actions/events";
import { toggle_sidebar } from "../actions/ui";
import CalendarToolbar from "./calendar_toolbar";
import EventTooltip from "./event_tooltip/base";
import SettingsModal from "./settings_modal/base";
import Tabs from "./tabs";
import DispatchRow from "./dispatch_row";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.keydown_handler = this.keydown_handler.bind(this);
        this.toggle_sidebar = this.toggle_sidebar.bind(this);
    }

    componentDidMount() {
        $(document).on(`keydown.${EVENTS_NS}`, this.keydown_handler);
    }

    componentWillUnMount() {
        $(document).off(`keydown.${EVENTS_NS}`);
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

    _render_main() {
        const main_content = [];
        for (let i =  0; i < this.props.data.length; i+=1) {
            main_content.push(
                <div label={this.props.data[i].location} key={i}>
                    {this._render_drivers(this.props.data[i].drivers)}
                </div>
            )
        }

        return main_content;
    }

    _render_drivers(drivers) {
        const content = [];
        for (let i = 0; i < drivers.length; i+=1) {
            content.push(
                <div className="driver-wrapper" key={i}>
                    <div className="driver cell">
                        {drivers[i]}
                    </div>
                    <DispatchRow height={100} />
                </div>
            )
        }
        return content;
    }

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
                        <DispatchRow 
                          unassigned_task
                        />
                    </div>
                </div>

                <Tabs >
                    {this._render_main()}
                </Tabs>

                <div className={content_classes}>
                    <EventTooltip />
                    <SettingsModal />
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
    data: PropTypes.arrayOf(
        PropTypes.shape({
            location: PropTypes.string,
            drivers: PropTypes.arrayOf(
                PropTypes.string
            )
        })
    )
};

function map_state_props(state) {
    return {
        sidebar: state.ui.sidebar
    };
}

const AppContainer = connect(map_state_props)(App);
export default AppContainer;
