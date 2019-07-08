import * as React from 'react';
import '../AppStyle.scss';

interface Props {
    isVisible: boolean;
}

const divStyle = (props: Props): React.CSSProperties => ({
    marginLeft: props.isVisible ? "240px" : "0px"
});

export const AppContainer: React.StatelessComponent<Props> = props => (
    <div className="App-container" style={divStyle(props)}>
        {props.children}
    </div>
);