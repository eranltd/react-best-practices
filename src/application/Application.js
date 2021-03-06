/**
 * Created by HieuVP on 1/7/17.
 * @flow
 */
import React from 'react';
import Helmet from 'react-helmet';
import Radium from 'radium';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import type { BaseProps } from './BaseContainer';
import BaseContainer from './BaseContainer';
import type { State } from './Action';
import type { ApplicationAction } from './ApplicationAction';
import type { ApplicationState } from './ApplicationReducer';
import { applicationReducerName } from './ApplicationReducer';

export type ApplicationProps = {
  action: ApplicationAction,
};

class Application extends BaseContainer<BaseProps & ApplicationProps & ApplicationState> {

  props: (BaseProps & ApplicationProps & ApplicationState);

  constructor(props: any) {
    super(props);
  }

  /**
   * @override
   */
  componentWillMount() {
    super.componentWillMount();
    this.props.action.addLoggedUserListener();
  }

  /**
   * @override
   */
  componentWillUnmount() {
    super.componentWillUnmount();
    this.props.action.terminateDisposables();
  }

  render() {
    return (
      <div>
        <Helmet title={this.props.document.title} />
        {this.props.children}
      </div>
    );
  }

}

const mapStateToProps = (state: State) => ({
  ...state[applicationReducerName],
});

const mapDispatchToProps = (dispatch) => ({
  action: bindActionCreators({
    ...require('./ApplicationAction'),
  }, dispatch),
});

// $FlowFixMe
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Radium(Application));
