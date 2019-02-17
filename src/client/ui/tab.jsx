import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Tab extends Component {
    static propTypes = {
        activeTab: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
    };

    onClick = () => {
        const { label, onClick } = this.props;
        onClick(label);
    }

    render() {
        const {
            onClick,
            props: {
                activeTab,
                label,
            },
        } = this;

        let className = 'ptab-list-item';

        if (activeTab === label) {
            className += ' ptab-list-active';
        }

        return (
            <div
              className={className}
              onClick={onClick}
            >
                {label}
            </div>
        );
    }
}

export default Tab;
