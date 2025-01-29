import React from 'react';

const Tabs = ({ tabs, selectedTab, onTabChange }) => {
    return (
        <div className="">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => onTabChange(tab)}
                    className={`px-8 py-3 ${
                        selectedTab === tab
                            ? 'bg-buttonColor text-white'
                            : 'bg-nonActiveColor text-black'
                    } transition duration-200`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};

export default Tabs;
