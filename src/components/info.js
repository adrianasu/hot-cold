import React from 'react';
import './info.css';

export default function Info( props ){
    return(
        <p
            aria-live="assertive"
            aria-atomic="true"
            className={ props.name }
            role="status">
            { props.text }    
        </p>
    );
}