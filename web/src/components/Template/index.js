import React from 'react';

import SideMenu from '../SideMenu' ;

import './template.css';

export default function Template(props) {

    const mainClasses = props.className ? ' ' + props.className : "";

    return (
        <div id="template">
            <SideMenu />
            <main id={props.id} className={'content' +  mainClasses}>
                { props.children }
            </main>
        </div>
    );
}