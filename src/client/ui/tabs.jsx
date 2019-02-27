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

    componentWillReceiveProps(newProps) {
        let flag = 0;
        for (let i = newProps.children.length - 1; i >= 0; i-=1) {
            if (this.state.activeTab === newProps.children[i].props.label) {
                flag = 1;
            }
        }
        if (flag === 0) {
            this.setState({
                activeTab: newProps.children[0].props.label
            });
        }
    }

    componentDidUpdate() {
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
            <div className="ptabs float-left auto-scroll">
                <ol className="ptab-list">
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
                <div className="ptab-content cell">
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
