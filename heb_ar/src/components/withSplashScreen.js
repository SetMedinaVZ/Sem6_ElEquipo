import React, {Component, useRef} from 'react';
// import auth0Client from '../Auth';
import './splash-screen.css';
import Logo from "../assets/imgs/logo.svg";
// import {useSpring, animated} from "react-spring";

function LoadingMessage() {

    // const imgRef = useRef();

    // const imgStyle = useSpring({
    //     to: {
    //         opacity: 1
    //     },
    //     from: {
    //         opacity: 0
    //     },
    //     ref: imgRef
    // });

    return (
        <div className="splash-screen">
            <img 
                src={Logo} 
                alt="" 
                // style={imgStyle}
            />
        </div>
    );
}

function withSplashScreen(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: true,
      };
    }

    async componentDidMount() {
      try {
        // await auth0Client.loadSession();
        setTimeout(() => {
          this.setState({
            loading: false,
          });
        }, 1500)
      } catch (err) {
        console.log(err);
        this.setState({
          loading: false,
        });
      }
    }

    render() {
      // while checking user session, show "loading" message
      if (this.state.loading) return LoadingMessage();

      // otherwise, show the desired route
      return <WrappedComponent {...this.props} />;
    }
  };
}

export default withSplashScreen;