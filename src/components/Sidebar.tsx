import * as React from 'react';
import '../styles/Sidebar.scss';

interface Props {
    isVisible: boolean;
}

const divStyle = (props: Props): React.CSSProperties => ({
    visibility: props.isVisible ? "visible" : "hidden"
});

export const SidebarComponent: React.StatelessComponent<Props> = props => (
    <div className="sidenav" style={divStyle(props)}>
        {props.children}
    </div>
);