import { FC } from 'react';

const TabPanel: FC<{ value: number, index: number }> = ({ children, value, index }) => (
    <div
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
    >
        {value === index && (
            <div>{children}</div>
        )}
    </div>
);

export default TabPanel