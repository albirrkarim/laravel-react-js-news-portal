import React from "react";

import "viewerjs/dist/viewer.css";
import Viewer from "viewerjs";

import SpinnerCenter from "./SpinnerCenter";

class ImageViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: true };
        this.myRef = React.createRef();
    }

    componentDidMount() {
        let el = this.myRef.current;
        let self = this;

        el.onload = function() {
            self.setState({
                isLoading: false
            });

            let w = this.width;
            let h = this.height;

            let windowWidth = window.innerWidth;

            if (windowWidth > 400) {
                windowWidth = 400;
            } else {
                windowWidth -= 150;
            }

            let imgZoom = windowWidth / (w > h ? w : h);

            let opt = { show: true, size: "large" };
            const viewer = new Viewer(el, {
                title: false,
                navbar: false,
                inline: true,
                viewed() {
                    viewer.zoomTo(imgZoom);
                },
                hidden: function() {
                    viewer.destroy();
                },
                toolbar: {
                    zoomIn: opt,
                    zoomOut: opt,
                    rotateLeft: opt,
                    rotateRight: opt
                },

                show: true
            });
        };
    }
    render() {
        let h = window.innerWidth;
        if (h > 450) {
            h = 450;
        }
        return (
            <div className="container" style={{ height: h + "px" }}>
                {this.state.isLoading && <SpinnerCenter />}
                <img
                    ref={this.myRef}
                    style={{
                        display: "none"
                    }}
                    src={this.props.src}
                />
            </div>
        );
    }
}

export default ImageViewer;
