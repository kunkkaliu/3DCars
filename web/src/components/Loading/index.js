import React, {PropTypes} from 'react';
import {Progress} from 'antd-mobile';
import './index.less';

class Loading extends React.Component{
    constructor (props) {
        super(props);
        this.loadImg = this.loadImg.bind(this);
        this.state = {
            loading: true,
            percent: 0
        };
    }

    componentDidMount() {
        setTimeout(() => { this.loadImg() }, 1000);
    }

    loadImg(){
        let _self = this;
        let pics = window.imgUrlData;
        let index = 0;
        let len = pics.length;
        let img = new Image();
        let load = function(){
            img.src = pics[index];
            img.onload = function() {
                _self.setState({
                    percent: Math.floor(((index + 1) / len) * 100)
                }, function () {
                    index ++ ;
                    if (index < len) {
                        load();
                    }else{
                        _self.setState({
                            loading: false
                        });
                    }
                });
            };
            return img;
        };
        if(len > 0){
            load();
        }else{
            _self.setState({
                loading: false
            });
        }
    }

    render () {
        const {loading, percent} = this.state;
        let display = 'none';
        if(loading) {
            display = 'block';
        }
        return (
            <div className="loading-wrap" style={{display:display}}>
                <div className="show-info">
                    <div className="progress"><Progress percent={percent} position="normal" /></div>
                    <div>{percent}%</div>
                </div>
            </div>
        )
    }
}

Loading.propTypes = {
};

export default Loading;