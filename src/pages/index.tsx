import React from 'react';
import styled from '@emotion/styled';
import { Backdrop, HeadingFrame } from '../components/Layout';
import CharacterSelector from '../components/CharacterSelector';

const Heading = styled.h1`
	font-size: 2.8em;
	font-weight: 300;
	margin-bottom: 0.3em;
	text-align: center;
	color: white;
`;
const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	width: 100%;
	margin: 0 auto;
	max-width: 1440px;

	padding: 2em 2.2em;

	@media screen and (max-width: 480px) {
		padding: 0 1.2em 4em 1.2em;
	}
`;
const Landing = () => (
	<Backdrop>
		<Container>
			<HeadingFrame>
				<Heading>เลือกสาขา</Heading>
			</HeadingFrame>
			<CharacterSelector />
		</Container>
	</Backdrop>
);

export default Landing;
