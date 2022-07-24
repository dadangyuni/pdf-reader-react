import React, { Component } from 'react';
import $ from "jquery";
import "./turnjs";

export class ReactTurnJs extends Component {
    static defaultProps = {
        style: {},
        className: "",
        options: {}
    };

    componentDidMount(){
        if(this.el){
            $(this.el).turn(Object.assign({}, this.props.options));
        }

        document.addEventListener("keydown", this.handleKeydown, false);
    }

    componentWillUnmount(){
        if(this.el){
            $(this.el)
            .turn("destroy")
            .remove();
        }
        document.removeEventListener("keydown", this.handleKeyDown, false);
    }

    handleKeyDown = event => {
        if (event.keyCode === 37) {
          $(this.el).turn("previous");
        }
        if (event.keyCode === 39) {
          $(this.el).turn("next");
        }
    };

    render() {
        return (
            <div className={this.props.className}
                style={Object.assign({}, this.props.style)}
                ref={el => (this.el = el)}
            >
                {this.props.children}
            </div>
        )
    }
}

export default ReactTurnJs