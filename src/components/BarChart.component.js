import React, { Component } from 'react'
import { select } from 'd3-selection';
import { max } from 'd3-array';
import { scaleLinear } from 'd3-scale';

export default class BarChart extends Component {
  constructor(props){
     super(props)
     this.state = { size: [200, 200] }
     this.createBarChart = this.createBarChart.bind(this)
  }
  componentDidMount() {
     this.createBarChart();
  }
  componentDidUpdate() {
     this.createBarChart();
  }
  
  createBarChart() {
    const node = this.node;
    const dataMax = max(this.props.data);
    const yScale = scaleLinear().domain([0, dataMax]).range([0, this.state.size[1]]);
    
    select(node)
      .selectAll('rect')
      .data(this.props.data)
      .enter()
      .append('rect');

    select(node).selectAll('rect').data(this.props.data)
      .style('fill', '#1fa8d1')
      .attr('x', (d,i) => i * 75)
      .attr('y', d => (this.state.size[1] - (yScale(d) - 15)))
      .attr('height', d => (yScale(d) - 15 ) )
      .attr('width', 50)

    select(node).selectAll('text')
      .data(this.props.data)
      .enter()
      .append('text')
      .style('fill', 'grey')
      .attr('x', (d, i) => i * 75)
      .attr('y', d => (this.state.size[1] - yScale(d) + 10))
      .text(d => d)
  }
  
  render() {
    return (
    <svg ref={node => this.node = node} width={200} height={200}></svg>
    );
  }
}