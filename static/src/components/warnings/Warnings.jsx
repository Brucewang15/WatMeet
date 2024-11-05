import React from 'react';
import './Warnings.css';

const Warnings = ({ warningType, warningMessage }) => {
    // Define the mapping between warning types and their corresponding styles
    const warningData = {
        success: {
            className: 'alert alert-success',
            iconClassName: 'alert-icon',
            title: 'Success',
        },
        info: {
            className: 'alert alert-info',
            iconClassName: 'alert-icon',
            title: 'Info',
        },
        warning: {
            className: 'alert alert-warning',
            iconClassName: 'alert-icon',
            title: 'Warning',
        },
        error: {
            className: 'alert alert-error',
            iconClassName: 'alert-icon',
            title: 'Error',
        },
    };

    // Use the provided warningType or default to 'info'
    const data = warningData[warningType.toLowerCase()]

    return (
        <div className="container">
            <div role="alert" className={data.className}>
                <svg
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    fill="none"
                    className={data.iconClassName}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                    ></path>
                </svg>
                <p className="alert-text">
                    {data.title} - {warningMessage}
                </p>
            </div>
        </div>
    );
};

export default Warnings;
