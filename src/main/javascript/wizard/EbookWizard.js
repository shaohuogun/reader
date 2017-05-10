import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {Step, Stepper, StepLabel} from 'material-ui/Stepper';
import ArrowForwardIcon from 'material-ui/svg-icons/navigation/arrow-forward';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import ChannelForm from '../channel/ChannelForm';
import ChannelInfo from '../channel/ChannelInfo';
import MessageList from '../message/MessageList';
import EbookInfo from '../ebook/EbookInfo';

const pageStyle = {
  width: 800,
  marginTop: 20,
  marginLeft: 20,
  marginBottom: 20,
  float: 'left',
  display: 'inline-block',
};

const toolbarStyle = {
  textAlign: 'center',
};

export default class EbookWizard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      finished: false,
      stepIndex: 0,
      channelId: '',
      ebookId: '',
    };
  }

  handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
      return (<ChannelForm />);
      case 1:
      return (
        <div>
        <MessageList channelId={this.state.channelId} />
        <div style={toolbarStyle}>
        <FlatButton
        label="Back"
        disabled={stepIndex === 0}
        onTouchTap={this.handlePrev}
        style={{marginRight: 12}}
        />
        <RaisedButton
        label={stepIndex === 2 ? 'Finish' : 'Next'}
        primary={true}
        onTouchTap={this.handleNext}
        />
        </div>
        </div>
      );
      case 2:
      return (
        <div>
        <EbookInfo ebookId={this.state.ebookId} />
        <div style={toolbarStyle}>
        <FlatButton
        label="上一步"
        disabled={stepIndex === 0}
        onTouchTap={this.handlePrev}
        style={{marginRight: 12}}
        />
        <RaisedButton
        label={stepIndex === 2 ? '完成' : '下一步'}
        primary={true}
        onTouchTap={this.handleNext}
        />
        </div>
        </div>
      );
      default:
      return '';
    }
  }

  render() {
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <div style={pageStyle}>
      <Stepper activeStep={stepIndex} connector={<ArrowForwardIcon />}>
      <Step>
      <StepLabel>输入目标频道信息</StepLabel>
      </Step>
      <Step>
      <StepLabel>采集频道下的消息</StepLabel>
      </Step>
      <Step>
      <StepLabel>导出消息到电子书</StepLabel>
      </Step>
      </Stepper>
      <div style={contentStyle}>
      {finished ? (
        <p>
        <a
        href="#"
        onClick={(event) => {
          event.preventDefault();
          this.setState({stepIndex: 0, finished: false});
        }}
        >
        Click here
        </a> to reset the example.
        </p>
      ) : (<div>{this.getStepContent(stepIndex)}</div>)}
      </div>
      </div>
      </MuiThemeProvider>
    );
  }
};

EbookWizard.propTypes = {
};
