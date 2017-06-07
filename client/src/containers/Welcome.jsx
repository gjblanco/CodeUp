/* global window */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Section from 'grommet/components/Section';
import Heading from 'grommet/components/Heading';
import Spinning from 'grommet/components/icons/Spinning';
import loginActions from '../../redux/actions/loginActions';
import Login from '../components/Login';

class Welcome extends Component {
  componentWillMount() {
    if (window.location.search) {
      const code = window.location.search.split('=')[1];
      this.props.loginUserAsync(code);
    }
  }
  render() {
    let page;
    if (this.props.status === '') {
      page = (
        <Section>
          <Login />
        </Section>
      );
    } else if (this.props.status === 'LOADING') {
      page = (
        <Section
          align="center"
        >
          <Heading tag="h2">Loading Page...<br />Thank you for your patience</Heading>
          <br />
          <Spinning size="xlarge" />
        </Section>
      );
    } else if (this.props.status === 'READY') {
      window.location.href = '/explore';
    }
    return (
      <Section>
        {page}
      </Section>
    );
  }
}

Welcome.propTypes = {
  status: PropTypes.string.isRequired,
  loginUserAsync: PropTypes.func.isRequired,
};

Welcome.defaultProps = {
  isAuthenticated: PropTypes.string,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  status: state.auth.status,
});

const mapDispatchToProps = dispatch => ({
  loginUserAsync: (code) => {
    dispatch(loginActions.loginUserAsync(code));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Welcome);
