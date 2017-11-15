import React from 'react';
import { View } from 'react-native';
import { renderComponent, branch } from 'recompose';

const defaultViewWhileNoParams = isParamUndefined => branch(
  isParamUndefined,
  renderComponent(() => <View />)
);

export const enhancer = defaultViewWhileNoParams(params => params === undefined);
