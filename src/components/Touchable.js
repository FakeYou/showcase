import React from 'react';
import PropTypes from 'prop-types';
import { omit } from 'lodash';

import {
	TouchableNativeFeedback,
	TouchableOpacity,
	View,
	ViewPropTypes,
	Platform,
} from 'react-native';

const Touchable = (props) => {
	if (Platform.OS === 'android') {
		const rippleColor = props.rippleColor || color.ripple;
		const borderless = props.borderless || false;

		let background;
		if (Platform.Version >= 21) {
			background = TouchableNativeFeedback.Ripple(rippleColor, borderless);
		}
		else {
			background = TouchableNativeFeedback.SelectableBackground(rippleColor);
		}

		return (
			<TouchableNativeFeedback
				background={background}
				{...omit(props, ['children', 'style', 'ref'])}
			>
				<View pointerEvents="box-only" style={props.style}>
					{props.children}
				</View>
			</TouchableNativeFeedback>
		);
	}

	return <TouchableOpacity {...omit(props, ['ref'])} />;
};

Touchable.propTypes = {
	rippleColor: PropTypes.string,
	borderless: PropTypes.bool,
	style: ViewPropTypes.style,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
};

Touchable.defaultProps = {
	rippleColor: '#eee',
	borderless: false,
	style: null,
	children: null,
};

export default Touchable;
