import React, { PureComponent } from 'react';
import { Linking } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Touchable from './Touchable';

const Container = styled(Touchable)`
	position: absolute;
	bottom: 16px;
	left: 16px;
	right: 16px;
	border-radius: 8px;
	background-color: #EE5A24;
	padding: 12px 24px;
`;

const Link = styled.Text`
	text-align: center;
	color: #fff;
`

export default class Inspiration extends PureComponent {
	static propTypes = {
		label: PropTypes.string.isRequired,
		src: PropTypes.string.isRequired,
	}

	handlePress = () => {
		Linking.openURL(this.props.src);
	}

	render() {
		const { label, src } = this.props;

		return (
			<Container onPress={this.handlePress}>
				<Link>{label}</Link>
			</Container>
		)
	}
}