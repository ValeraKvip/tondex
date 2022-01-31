import React from "react";
import Lottie from 'lottie-web'
import { AnimationItem } from 'lottie-web';

interface Props {
    enable: boolean,
    path: string,
    loop?: boolean
}

export default class LottieView extends React.Component<Props, any> {
    ref: any;
    lottie?: AnimationItem;

    constructor(props: any) {
        super(props);

        this.ref = React.createRef();
    }

    componentDidMount() {
        const lottie = Lottie.loadAnimation({
            container: this.ref.current,
            renderer: 'svg',
            loop: this.props.loop === undefined ? true : this.props.loop,
            autoplay: false,
            path: this.props.path,
            
        });

        if (!this.props.enable) {
            lottie.stop();
        }
       

        this.lottie = lottie;
    }

    componentDidUpdate(prevProps: Props, prevState: any) {
        if (this.lottie) {
            if (this.props.enable) {
                this.lottie.play();
            } else {
                this.lottie.stop();
            }
        }
    }

    render() {
        return (
            <div className={this.props.enable ? 'lottie' : 'hide lottie'} ref={this.ref}></div>
        )
    }
}