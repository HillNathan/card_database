import React from 'react';

function Autocomplete(props) {
    return (
        <div>
            <input
                className={props.theClass}
                type={props.theType}
                name={props.theName}
                id={props.theID}
                placeholder={props.thePlaceholder}
                value=""
                onChange=""
                onKeyDown=""
                options={[
                    "Option 1",
                    "Option 2",
                    "Option 3"
                ]}
            />
        </div>
    )
};

export default Autocomplete;
