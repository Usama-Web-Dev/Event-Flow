import React from 'react';
import { Calendar } from 'antd';

const App = ({ selectedDates }) => {
    const onPanelChange = (value, mode) => {
        console.log(value.format('DD-MM-YYYY'), mode);
    };

    const dateFullCellRender = (value) => {
        const isSelected = selectedDates.includes(value.format('YYYY-MM-DD'));
        return (
            <div className={`custom-date-cell ${isSelected ? 'highlighted' : ''}`}>
                {value.date()}
            </div>
        );
    };

    return (
        <div>
            <Calendar fullscreen={false} onPanelChange={onPanelChange}
            // fullCellRender={dateFullCellRender}
            />
        </div>
    );
};

export default App;