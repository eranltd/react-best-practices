/**
 * Created by HieuVP on 12/29/16.
 * @flow
 */
import React from 'react';
import { AppBar } from 'material-ui';
import BaseView from './BaseView';

export default class Header extends BaseView {

  constructor(props: any) {
    super(props);
  }

  render() {
    return <AppBar title="Awesome Chat App" />;
  }

}