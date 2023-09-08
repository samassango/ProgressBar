import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
const Container = styled.div`
  #progress {
    position: relative;
    margin-bottom: 30px;
  }
  #progress-bar {
    position: absolute;
    background: lightseagreen;
    height: 5px;
    width: ${(props) => (props.progressBarWith ? props.progressBarWith : "0%")};
    top: 50%;
    left: 0;
  }
  #progress-num {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    justify-content: space-between;
  }
  #progress-num::before {
    content: "";
    background-color: lightgray;
    position: absolute;
    top: 50%;
    left: 0;
    height: 5px;
    width: 100%;
    z-index: -1;
  }
  #progress-num .step {
    border: 3px solid lightgray;
    border-radius: 100%;
    width: 25px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    background-color: #fff;
    font-family: sans-serif;
    font-size: 14px;
    position: relative;
    z-index: 1;
  }
  #progress-num .step.active {
    border-color: lightseagreen;
    background-color: lightseagreen;
    color: #fff;
  }
`;
class ProgressBar extends React.Component {
  state = {
    active: 1,
    steps: [],
    activeClass: "active",
    progressBarWidth: ""
  };
  componentDidMount() {
    if (this.props.steps.length) {
      this.setState({
        ...this.state,
        steps: this.props.steps,
        activeStep: this.props.activeStep,
        progressBarWidth:
          (this.props.activeStep / (this.props.steps.length - 1)) * 100 + "%"
      });
    }
  }
  componentDidUpdate() {
    if (this.props.activeStep !== this.state.activeStep) {
      const stepsArr = this.props.steps;
      const step = this.props.activeStep;
      if (this.props.activeStep < this.state.activeStep) {
        stepsArr.forEach((stepData, index) => {
          if (index === this.state.activeStep && this.state.activeStep !== 0) {
            stepData.active = false;
          }
        });
      } else {
        stepsArr.forEach((stepData, index) => {
          if (index === step) {
            stepData.active = true;
          }
        });
      }

      this.setState({
        ...this.state,
        steps: stepsArr,
        activeStep: this.props.activeStep,
        progressBarWidth:
          (this.props.activeStep / (this.props.steps.length - 1)) * 100 + "%"
      });
    }
  }

  render() {
    console.log(this.props);
    return (
      <Container progressBarWith={this.state.progressBarWidth}>
        <div id="progress">
          <div id="progress-bar"></div>
          <ul id="progress-num">
            {this.state.steps.map((step) => (
              <li className={`step ${step.active ? "active" : ""}`}>
                {step.name}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    );
  }
}
// ProgressBar.propTypes = {
//   steps: PropTypes.arrayOf(
//     PropTypes.object({
//       name: PropTypes.string.isRequired,
//       active: PropTypes.bool.isRequired
//     })
//   ),
//   activeProgressBarColor: PropTypes.string,
//   activeTextColor: PropTypes.string,
//   progressBarBGColor: PropTypes.string,
//   activeBorderColor: PropTypes.string,
//   activeBGColor: PropTypes.string
// };

export default ProgressBar;
