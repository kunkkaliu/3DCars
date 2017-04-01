import React, {PropTypes} from 'react';
import { Slider, WhiteSpace, WingBlank } from 'antd-mobile';
import Loading from '../../../src/components/Loading';
import './index.less';

class Home extends React.Component {
    constructor (props) {
        super(props);
        this.log = this.log.bind(this);
        this.state = {
            imgIndex: 0
        };
    }
    
    log(name) {
        return (value) => {
            this.setState({
                imgIndex: value
            });
        };
    }

    componentWillMount () {
    }

    componentDidMount() {
    }

    render () {
        const {imgIndex} = this.state;
        return (
            <div className="am-slider-example">
                <img className="car" src={window.imgUrlData.length > 0 ? window.imgUrlData[imgIndex] : ''}></img>
                <WingBlank size="lg">
                    <Slider value={imgIndex} min={0} max={window.imgUrlData.length - 1} onChange={this.log('change')} />
                </WingBlank>
                <Loading ></Loading>
            </div>
        )
    }
}

Home.contextTypes = {
};

export default Home