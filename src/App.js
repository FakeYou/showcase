import React, { PureComponent } from 'react';
import styled from 'styled-components';

import TextAlignment from './TextAlignment';

const Screen = styled.View`
	flex: 1;
	background-color: #f0f0f0;
	justify-content: center;
	align-items: center;
	padding: 24px;
`;

export default class App extends PureComponent { 
	render() {
		return (
			<Screen>
				<TextAlignment />
			</Screen>
		)
	}
}