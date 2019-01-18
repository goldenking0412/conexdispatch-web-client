/*!
 * kin
 * Copyright(c) 2016-2017 Benoit Person
 * Apache 2.0 Licensed
 */

import classnames from "classnames";
import PropTypes from 'prop-types';
import React from "react";
import { connect } from "react-redux";

import { EVENTS_NS } from "../config";

import { deselect_event } from "../actions/events";
import { toggle_sidebar } from "../actions/ui";
import CalendarToolbar from "./calendar_toolbar";
import EventTooltip from "./event_tooltip/base";
import SettingsModal from "./settings_modal/base";
import SourcesList from "./sources_list";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.keydown_handler = this.keydown_handler.bind(this);
        this.open_settings_modal = this.open_settings_modal.bind(this);
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

    open_settings_modal(event) {
        event.preventDefault();
        $("#settings-modal").foundation("open");
    }

    toggle_sidebar(event) {
        event.preventDefault();
        this.props.dispatch(toggle_sidebar(!this.props.sidebar.show));
    }

    render() {
        const content_classes = classnames("content", { margin: this.props.sidebar.show });
        const aside_classes = classnames({ show: this.props.sidebar.show });

        return (
            <div>
                <div className="logo" onClick={this.toggle_sidebar} />
                <aside className={aside_classes}>
                    <div>
                        <a
                          href="#settings-modal"
                          className="float-right settings-button"
                          onClick={this.open_settings_modal}
                        >
                            <span className="fa fa-cog" />
                        </a>
                    </div>
                    <div className="clearfix" />
                    <SourcesList />
                </aside>

                <div className={content_classes}>
                    <EventTooltip />
                    <SettingsModal />
                    <CalendarToolbar />
                    <div id="calendar" />
                </div>
            </div>
        );
    }
}

App.propTypes = {
    dispatch: PropTypes.func,
    sidebar: PropTypes.shape({
        show: PropTypes.bool
    })
};

function map_state_props(state) {
    return {
        sidebar: state.ui.sidebar
    };
}

const AppContainer = connect(map_state_props)(App);
export default AppContainer;
