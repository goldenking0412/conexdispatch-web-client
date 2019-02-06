import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Tab from './tab';

class Tabs extends Component {
    static propTypes = {
        children: PropTypes.instanceOf(Array).isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            activeTab: this.props.children[0].props.label,
        };  
    }

    onClickTabItem = (tab) => {
        this.setState({ activeTab: tab });
    }

    render() {
        const {
            onClickTabItem,
            props: {
                children,
            },
            state: {
                activeTab,
            }
        } = this;
        let counter = 0;

        return (
            <div className="tabs float-left auto-scroll">
                <ol className="tab-list cell">
                    {children.map((child) => {
                        const { label } = child.props;

                        return (
                            <Tab
                              activeTab={activeTab}
                              key={label}
                              label={label}
                              onClick={onClickTabItem}
                            />
                        );
                    })}
                </ol>
                <div className="tab-content cell">
                    {children.map((child) => {
                        let style={ display: "block" };
                        counter += 1;
                        if (child.props.label !== activeTab) 
                            style={ display: "none" };
                        return (
                            <div style={style} key={counter}>
                                {child.props.children}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default Tabs;
