/*!
 * kin
 * Copyright(c) 2016-2017 Benoit Person
 * Apache 2.0 Licensed
 */

import classnames from "classnames";
import PropTypes from 'prop-types';
import React from "react";
import { connect } from "react-redux";

import KinTooltip from "./kin_tooltip";
import TimezoneSelector from "./timezone_selector/timezone_selector";

import { fetch_error } from "../utils";
import { deselect_event } from "../actions/events";
import {
    get_full_calendar_view,
    toggle_timezone_selector_tooltip,
    update_full_calendar_view,
    toggle_sidebar
} from "../actions/ui";
import { async_patch_user } from "../actions/user";

const left_chevron = require("../../public/imgs/icons/left_chevron.png");
const right_chevron = require("../../public/imgs/icons/right_chevron.png");
const calendar_icon = require("../../public/imgs/icons/calendar.png");

class CalendarToolbar extends React.Component {
    constructor(props) {
        super(props);

        this._next = this._next.bind(this);
        this._prev = this._prev.bind(this);
        this._hide_timezone_tooltip = this._hide_timezone_tooltip.bind(this);
        this._show_timezone_tooltip = this._show_timezone_tooltip.bind(this);
        this._today = this._today.bind(this);
        this._update_full_calendar_view = this._update_full_calendar_view.bind(this);
        this._view_switch = this._view_switch.bind(this);
        this.toggle_sidebar = this.toggle_sidebar.bind(this);
        this.open_settings_modal = this.open_settings_modal.bind(this);
    }

    get _$calendar() {
        return $("#calendar");
    }

    open_settings_modal(event) {
        event.preventDefault();
        $("#settings-modal").foundation("open");
    }

    toggle_sidebar(event) {
        event.preventDefault();
        this.props.dispatch(toggle_sidebar(!this.props.sidebar.show));
    }

    _update_full_calendar_view() {
        this.props.dispatch(update_full_calendar_view(get_full_calendar_view()));
    }

    _next() {
        this.props.dispatch(deselect_event());
        this._$calendar.fullCalendar("next");
        this._update_full_calendar_view();
    }

    _prev() {
        this.props.dispatch(deselect_event());
        this._$calendar.fullCalendar("prev");
        this._update_full_calendar_view();
    }

    _hide_timezone_tooltip() {
        this.props.dispatch(toggle_timezone_selector_tooltip(false));
    }

    _show_timezone_tooltip() {
        this.props.dispatch(toggle_timezone_selector_tooltip(true));
    }

    _today() {
        this._$calendar.fullCalendar("today");
        this._update_full_calendar_view();
    }

    _view_switch() {
        if (this.props.dispatch(deselect_event())) {
            const next_view = this.props.full_calendar.view.name === "month"
                ? "basicWeek"
                : "month";
            const $fc_view_container = this._$calendar.find(".fc-view-container");
            const $prev_fc_view = this._$calendar.find(".fc-view");
            const $fc_view_dup = $prev_fc_view.clone().appendTo($fc_view_container);

            $fc_view_dup
                .find(".fc-scroller")
                .scrollTop($prev_fc_view.find(".fc-scroller").scrollTop());

            // TODO: move this in the action?
            this._$calendar.fullCalendar("changeView", next_view);
            this._update_full_calendar_view();

            // TODO: move this to update_full_calendar_view?
            this.props
                .dispatch(
                    async_patch_user(
                        {
                            default_view: next_view
                        },
                        false
                    )
                )
                .catch(fetch_error);

            const $fc_view = this._$calendar.find(".fc-view").addClass("show-animation");
            $fc_view_dup.addClass("hide-animation");
            setTimeout(() => {
                $fc_view.addClass("show-animation-active active");
                $fc_view_dup.addClass("hide-animation-active active");
            }, 1);

            setTimeout(() => {
                $fc_view_dup.remove();
                $fc_view.removeClass("show-animation show-animation-active");
            }, 200);
        }
    }

    _render_view_title() {
        switch (this.props.full_calendar.view.name) {
        case "basicWeek": {
            // const start = this.props.full_calendar.view.params.start;
            const today = new Date();
            return (
                <span>
                    {today.toLocaleString('en-us', { month: 'long' })} {today.getFullYear()}
                </span>
            );
        }
        default:
            return null;
        }
    }

    render() {
        const target = this.props.timezone_tooltip_show ? this._timezone_tooltip_target : null;

        const toolbar_classes = classnames("calendar-toolbar", {
            margin: 0
        });

        return (
            <div className={toolbar_classes}>
                <div className="toolbar-left-pad float-left toolbar-group">
                    <button className="button" onClick={this.toggle_sidebar}>
                        <span className="fa fa-bars" />
                    </button>
                    <img className="calendar-icon" src={calendar_icon} alt="Calendar icon" />
                    <span className="font-template1 transparent-option1">Calendar</span>
                </div>
                <div className="toolbar-center-pad toolbar-group float-left">
                    <button className="button bordered-button" onClick={this._today}>
                        Today
                    </button>
                    <button className="button arrow-button" onClick={this._prev}>
                        <img className="chevron-icon" src={left_chevron} alt="Left chevron icon" />
                    </button>
                    <button className="button arrow-button" onClick={this._next}>
                        <img
                          className="chevron-icon"
                          src={right_chevron}
                          alt="Right chevron icon"
                        />
                    </button>

                    <div className="calendar-toolbar__title font-template2">
                        {this._render_view_title()}
                    </div>

                    <button className="button">
                        <span className="fa fa-search toolbar-icon" />
                    </button>
                    <button className="button">
                        <a
                          href="#settings-modal"
                          className="float-right settings-button"
                          onClick={this.open_settings_modal}
                        >
                            <span className="fa fa-cog" />
                        </a>
                    </button>
                </div>
                <div className="toolbar-right-pad toolbar-group float-right">
                    <button className="button">
                        <span className="fa fa-th" />
                    </button>
                    <button className="button">
                        <span className="fa fa-bell" />
                    </button>
                    <button className="button bordered-button account-area">
                        <span className="user-title float-left">Conexwest</span>
                        <div className="user-image float-left">
                            <img alt="prop" />
                        </div>
                    </button>
                </div>
                <KinTooltip
                  on_close={this._hide_timezone_tooltip}
                  root_classes={["timezone-selector-tooltip"]}
                  target={target}
                >
                    <TimezoneSelector dispatch={this.props.dispatch} />
                </KinTooltip>
            </div>
        );
    }
}

CalendarToolbar.propTypes = {
    dispatch: PropTypes.func,
    full_calendar: PropTypes.shape({
        status: PropTypes.string,
        view: PropTypes.shape({
            name: PropTypes.string,
            params: PropTypes.object
        })
    }),
    timezone_tooltip_show: PropTypes.bool,
    sidebar: PropTypes.shape({
        show: PropTypes.bool
    })
};

function map_state_props(state) {
    return {
        full_calendar: state.ui.full_calendar,
        timezone_tooltip_show: state.ui.timezone_selector_tooltip.show,
        sidebar: state.ui.sidebar
    };
}

const CalendarToolbarContainer = connect(map_state_props)(CalendarToolbar);
export default CalendarToolbarContainer;
