import React from "react";
import { View } from "react-native";
import { Path, Svg, Rect, G } from "react-native-svg";
import AbstractChart from "./abstract-chart";

const barWidth = 32;

class BarChart extends AbstractChart {
  getBarPercentage = () => {
    const { barPercentage = 1 } = this.props.chartConfig;
    return barPercentage;
  };

  renderBars = config => {
    const { data, width, height, paddingTop, paddingRight } = config;
    const baseHeight = this.calcBaseHeight(data, height);
    return data.map((x, i) => {
      const barHeight = this.calcHeight(x, data, height);
      const barWidth = 32 * this.getBarPercentage();
      const barX = paddingRight + (i * (width - paddingRight)) / data.length + barWidth / 2
      const barY = ((barHeight > 0 ? baseHeight - barHeight : baseHeight) / 4) * 3 + paddingTop
      const barTopRadius = this.props.chartConfig.topRadius
      const barBottomRadius = this.props.chartConfig.bottomRadius
      console.log(`bar ${i} x: `, barX )
      console.log(`bar ${i} y: `, barY )
      console.log(`bar ${i} height: `, barHeight )
      console.log("MATH: ", (Math.abs(barHeight - barTopRadius - barBottomRadius) / 4) * 3)
      if(barHeight > 0){
      return (
        <Path
          key={Math.random()}
          fill={this.props.chartConfig.color(1)}
          d={`
          M${barX + 32 - ((barBottomRadius - barTopRadius)/2) },${barY}
          h${barWidth - barTopRadius - barBottomRadius}
          q${barTopRadius},0 ${barTopRadius},${barTopRadius}
          v${(Math.abs(barHeight - barTopRadius - barBottomRadius) / 4) * 3}
          q0,${barBottomRadius} -${barBottomRadius},${barBottomRadius}
          h${(barWidth - barTopRadius - barBottomRadius) * -1}
          q-${barBottomRadius},0 -${barBottomRadius}, -${barBottomRadius}
          v${(Math.abs(barHeight - barTopRadius - barBottomRadius) / 4) * -3}
          q0,-${barTopRadius} ${barTopRadius},-${barTopRadius}
          z`}
        />
      )
      }else{
        return (
          <Rect
            key={Math.random()}
            x={
              paddingRight +
              (i * (width - paddingRight)) / data.length +
              barWidth / 2
            }
            y={((baseHeight - barHeight) / 4) * 3 + paddingTop}
            width={barWidth}
            height={2}
            fill={this.props.chartConfig.color(0.6)}
          />
        );
      }
    });
  };

  // renderBarTops = config => {
  //   const { data, width, height, paddingTop, paddingRight } = config;
  //   const baseHeight = this.calcBaseHeight(data, height);
  //   return data.map((x, i) => {
  //     const barHeight = this.calcHeight(x, data, height);
  //     const barWidth = 32 * this.getBarPercentage();
  //     return (
  //       <Rect
  //         key={Math.random()}
  //         x={
  //           paddingRight +
  //           (i * (width - paddingRight)) / data.length +
  //           barWidth / 2
  //         }
  //         y={((baseHeight - barHeight) / 4) * 3 + paddingTop}
  //         width={barWidth}
  //         height={2}
  //         fill={this.props.chartConfig.color(0.6)}
  //       />
  //     );
  //   });
  // };

  render() {
    const {
      width,
      height,
      data,
      style = {},
      withHorizontalLabels = true,
      withVerticalLabels = true,
      verticalLabelRotation = 0,
      horizontalLabelRotation = 0,
      withInnerLines = true
    } = this.props;
    const { borderRadius = 0, paddingTop = 16, paddingRight = this.props.chartPaddingLeft } = style;
    const config = {
      width,
      height,
      verticalLabelRotation,
      horizontalLabelRotation
    };
    return (
      <View style={style}>
        <Svg height={height} width={width}>
          {this.renderDefs({
            ...config,
            ...this.props.chartConfig
          })}
          <Rect
            width="100%"
            height={height}
            rx={borderRadius}
            ry={borderRadius}
            fill="url(#backgroundGradient)"
          />
          <G>
            {withInnerLines
              ? this.renderHorizontalLines({
                  ...config,
                  count: 4,
                  paddingTop
                })
              : null}
          </G>
          <G>
            {withHorizontalLabels
              ? this.renderHorizontalLabels({
                  ...config,
                  count: 4,
                  data: data.datasets[0].data,
                  paddingTop,
                  paddingRight
                })
              : null}
          </G>
          <G>
            {withVerticalLabels
              ? this.renderVerticalLabels({
                  ...config,
                  labels: data.labels,
                  paddingRight,
                  paddingTop,
                  horizontalOffset: barWidth * this.getBarPercentage()
                })
              : null}
          </G>
          <G>
            {this.renderBars({
              ...config,
              data: data.datasets[0].data,
              paddingTop,
              paddingRight
            })}
          </G>
          {/* <G>
            {this.renderBarTops({
              ...config,
              data: data.datasets[0].data,
              paddingTop,
              paddingRight
            })}
          </G> */}
        </Svg>
      </View>
    );
  }
}

export default BarChart;
