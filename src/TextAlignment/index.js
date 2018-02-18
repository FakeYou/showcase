import React, { PureComponent } from 'react';
import { View, Animated } from 'react-native';
import styled from 'styled-components';
import styledProps from 'styled-props';

import Inspiration from '../components/Inspiration';

const BAR_WIDTH = 24;
const CONTAINER_PADDING = 16;
const CONTROL_PADDING = 8;

const Screen = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`;

const Controls = styled(Animated.View)`
	flex-direction: row;
	padding: ${CONTAINER_PADDING}px;
`;

const Background = styled(Animated.View)`
	position: absolute;
	background-color: white;
	border-radius: 12px;
	padding: ${CONTAINER_PADDING}px;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	shadow-color: #999;
	shadow-offset: 0px 3px;
	shadow-radius: 8px;
	shadow-opacity: 0.1;
`;

const Overlay = styled.View`
	position: absolute;
	top: ${CONTAINER_PADDING + CONTROL_PADDING}px;
	left: ${CONTAINER_PADDING + (CONTROL_PADDING * 2)}px;
	bottom: ${CONTAINER_PADDING + CONTROL_PADDING}px;
	justify-content: space-around;
`;

const Button = styled.TouchableWithoutFeedback``;

const Control = styled.View`
	height: 40px;
	padding: ${CONTROL_PADDING}px;
	margin-horizontal: 8px;
	justify-content: space-around;
	align-items: ${styledProps({ left: 'flex-start', center: 'center', right: 'flex-end' }, 'align')};
`;

Control.defaultProps = {
	align: 'left',
};

const Bar = styled(Animated.View)`
	width: ${props => props.short ? (BAR_WIDTH / 2) : BAR_WIDTH};
	height: 3px;
	background-color: ${styledProps({ dark: '#222', muted: '#ddd' }, 'color')};
	border-radius: 2px;
`;

Bar.defaultProps = {
	color: 'muted',
};

export default class TextAlignment extends PureComponent {
	static ALIGN_LEFT = 0;
	static ALIGN_CENTER = 1;
	static ALIGN_RIGHT = 2;
	static JUSTIFIED = 3;

	state = {
		alignment: this.props.alignment || TextAlignment.ALIGN_LEFT,
		containerWidth: 0,
		container: new Animated.Value(1),
		bars: [
			new Animated.Value(0),
			new Animated.Value(0),
			new Animated.Value(0),
		],
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.alignment !== this.state.alignment) {
			this.handleControlPress(nextProps.alignment);
		}
	}

	handleLayout = ({ nativeEvent: { layout } }) => {
		this.setState({ containerWidth: layout.width - CONTAINER_PADDING * 2 });
	}

	handleControlPress = (index) => {
		if (this.state.alignment === index) {
			return;
		}

		this.setState({ alignment: index });

		Animated.sequence([
			Animated.timing(this.state.container, { toValue: 0, duration: 200, useNativeDriver: true }),
			Animated.parallel([
				Animated.stagger(50, [
					Animated.spring(this.state.bars[0], { toValue: index, useNativeDriver: true }),
					Animated.spring(this.state.bars[1], { toValue: index, useNativeDriver: true }),
					Animated.spring(this.state.bars[2], { toValue: index }),
				]),
				Animated.timing(this.state.container, { toValue: 1, duration: 600, useNativeDriver: true }),
			])
		]).start();
	}

	render() {
		const { bars, container, containerWidth } = this.state;

		const translate = [
			bars[0].interpolate({ inputRange: [0, 4], outputRange: [0, containerWidth] }),
			bars[1].interpolate({ inputRange: [0, 4], outputRange: [0, containerWidth] }),
			bars[2].interpolate({
				inputRange: [0, 1, 2, 3, 4],
				outputRange: [
					0,
					(containerWidth / 4) + BAR_WIDTH / 4,
					(containerWidth / 4) * 2 + BAR_WIDTH / 2,
					(containerWidth / 4) * 3,
					containerWidth]
			}),
		];

		const width = bars[2].interpolate({
			inputRange: [0, 1, 2, 3],
			outputRange: [BAR_WIDTH / 2, BAR_WIDTH / 2, BAR_WIDTH / 2, BAR_WIDTH],
		});

		const scale = container.interpolate({
			inputRange: [0, 1],
			outputRange: [0.96, 1],
		});

		return (
			<Screen>
				<Controls onLayout={this.handleLayout}>
					<Background style={{ transform: [{ scale }]}} />

					<Button onPress={() => this.handleControlPress(TextAlignment.ALIGN_LEFT)}>
						<Control left>
							<Bar />
							<Bar />
							<Bar short />
						</Control>
					</Button>
					<Button onPress={() => this.handleControlPress(TextAlignment.ALIGN_CENTER)}>
						<Control center>
							<Bar />
							<Bar />
							<Bar short />
						</Control>
					</Button>
					<Button onPress={() => this.handleControlPress(TextAlignment.ALIGN_RIGHT)}>
						<Control right>
							<Bar />
							<Bar />
							<Bar short />
						</Control>
					</Button>
					<Button onPress={() => this.handleControlPress(TextAlignment.JUSTIFIED)}>
						<Control>
							<Bar />
							<Bar />
							<Bar />
						</Control>
					</Button>

					<Overlay pointerEvents="none">
						<Bar dark style={{ transform: [{ translateX: translate[0] }]}} />
						<Bar dark style={{ transform: [{ translateX: translate[1] }]}} />
						<Bar dark style={{
							width: width,
							transform: [
								{ translateX: translate[2] },
							]}}
						/>
					</Overlay>

				</Controls>

				<Inspiration
					label="Text Alignment Button"
					src="https://dribbble.com/shots/4220194-Text-Alignment-Button-FREEBIE"
				/>
			</Screen>
		)
	}
}
