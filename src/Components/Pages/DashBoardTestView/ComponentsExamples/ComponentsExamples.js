import React from 'react';

import DoughnutExample from './doughnut';
import DynamicDoughnutExample from './dynamic-doughnut';
import PieExample from './pie';
import LineExample from './line';

import HorizontalBarExample from './horizontalBar';
import RadarExample from './radar';
import PolarExample from './polar';
import BubbleExample from './bubble';
import ScatterExample from './scatter';

import RandomizedDataLineExample from './randomizedLine';
import CrazyDataLineExample from './crazyLine';

import LegendHandlersExample from './legend-handlers';
import {
	Button,
	ButtonGroup,
	Card,
	CardHeader,
	CardBody,
	CardTitle,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	UncontrolledDropdown,
	Label,
	FormGroup,
	Input,
	Table, 
	Row,
	Col,
	UncontrolledTooltip
  } from "reactstrap";
export default class ComponentsExamples extends React.Component {
	render() {
		return (
			<Row>
				 <Col lg="4">
				<DoughnutExample /> </Col>
				 <Col lg="4">
				<DynamicDoughnutExample /> </Col>
				 <Col lg="4">
				<PieExample /> </Col>
				 <Col lg="4">
				<LineExample /> </Col>
				 <Col lg="4">
				<HorizontalBarExample /> </Col>
				 <Col lg="4">
				<RadarExample /> </Col>
				 <Col lg="4">
				<PolarExample /> </Col>
				 <Col lg="4">
				<BubbleExample /> </Col>
				 <Col lg="4">
				<ScatterExample /> </Col>
				 <Col lg="4">
				<RandomizedDataLineExample /> </Col>
				 <Col lg="4">
				<CrazyDataLineExample /> </Col>
				 
				 <Col lg="4">
				<LegendHandlersExample /> </Col>
			</Row>
		);
	}
}

