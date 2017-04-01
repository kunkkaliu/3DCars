import React, {PropTypes} from 'react';
import './index.less';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    componentDidMount () {
    }
  
    render() {
        return (
            <div className="xxx">
                {this.props.children}
            </div>
        )
    }
}

App.propTypes = {
    children: PropTypes.node.isRequired
};

App.contextTypes = {

};

export default App;

