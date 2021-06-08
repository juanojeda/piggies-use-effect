import React from 'react';
import styled from "styled-components";
import { getLoadingStyles } from './loadingStyles';

const Spinner = styled.span`
  ${getLoadingStyles("🏠")}
`;

export const Loading = () => (
  <Spinner />
);