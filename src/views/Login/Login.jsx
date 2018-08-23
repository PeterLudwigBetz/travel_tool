import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setCurrentUser } from '../../redux/actionCreator';
import travelaLogo from '../../images/travela-logo.svg';
import cover from '../../images/cover.svg';
import symbolG from '../../images/Google-white.svg';
import videoSymbol from '../../images/video.svg';
import fileSymbol from '../../images/file.svg';
import './Login.scss';
import TextLink from '../../components/TextLink/TextLink';
import { loginStatus } from '../../helper/userDetails';
import Button from '../../components/buttons/Buttons';

export class Login extends Component {
  componentDidMount() {
    this.authenticated();
  }

  authenticated () {
    const { isAuthenticated, history, setCurrentUser } = this.props;
    if (isAuthenticated) {
      loginStatus();
      history.push('/requests');
    }
    setCurrentUser();
  }

  login() {
    const url = `${
      process.env.REACT_APP_ANDELA_AUTH_HOST
    }/login?redirect_url=${process.env.REACT_APP_AUTH_REDIRECT_URL}`;
    window.location.replace(url);
  }


  renderLandPageImage() {
    return(
      <div className="mdl-cell mdl-cell--7-col mdl-cell--hide-tablet mdl-cell--hide-phone">
        <img
          src={cover}
          alt="Road map"
          className="login-page__landing-page-map"
        />
      </div>
    );
  }

  renderLinks() {
    return (
      <Fragment>
        <TextLink
          imageSrc={videoSymbol}
          symbolClass="login-symbol__video"
          textLinkClass="login-page__link"
          textClass="login-page__link-text"
          altText="Video Symbol"
          text="How to book a trip"
        />

        <TextLink
          imageSrc={fileSymbol}
          symbolClass="login-symbol__file"
          textLinkClass="login-page__link"
          textClass="login-page__link-text"
          altText="File Symbol"
          text="Andela travel policy"
        />
      </Fragment>
    );
  }
    
  render() {
    return (
      <div className="mdl-layout mdl-js-layout login-page">
        <div className="mdl-layout__content">
          <div className="mdl-grid mdl-grid--no-spacing">
            <div className="mdl-cell mdl-cell--5-col mdl-cell--5-col-tablet">
              <img src={travelaLogo} alt="Andela Logo" className="login-page__andela-logo" />
              <p className="login-page__travel-request-text">
                Travel Requests Made Easier
              </p>
              <Button
                id="login"
                onClick={this.login} 
                textClass="login-page__login-to-get-started-text"
                text="Login to Get Started"
                imageSrc={symbolG} altText="Google Symbol" imageClass="login-page__google-white" buttonType="button"
                buttonClass="mdl-button mdl-js-button mdl-button--raised mdl-button--colored login-page__login-btn" />
              {this.renderLinks()}
            </div>
            {this.renderLandPageImage()}
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  history: PropTypes.shape({}).isRequired,
  setCurrentUser: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

export default connect(mapStateToProps,{ setCurrentUser })(Login);
