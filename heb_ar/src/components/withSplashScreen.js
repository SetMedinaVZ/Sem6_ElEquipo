import React, {Component, useRef} from 'react';
import './splash-screen.css';
import Logo from "../assets/imgs/logo.svg";
import Fade from 'react-reveal/Fade';

function LoadingMessage() {
    return (
        <div className="splash-screen">
            <Fade top>
              <img 
                  src={Logo} 
                  alt="" 
              />
            </Fade>
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