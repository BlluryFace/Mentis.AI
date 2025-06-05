import React, { useState, useEffect } from 'react';
import { startOfWeek, endOfWeek, format } from 'date-fns';
function Week() {
    const [range, setRange] = useState({ start: '', end: '' });

    useEffect(() => {
        const now = new Date();
        const start = startOfWeek(now, { weekStartsOn: 1 });
        const end = endOfWeek(now, { weekStartsOn: 1 });

        setRange({
            start: format(start, 'MM/dd/yyyy'),
            end: format(end, 'MM/dd/yyyy'),
        });
    }, []);

    return (
        <h2>
            {range.start} - {range.end}
        </h2>
    );
}
export default Week;
