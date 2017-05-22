import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {Step, Stepper, StepLabel} from 'material-ui/Stepper';
import ArrowForwardIcon from 'material-ui/svg-icons/navigation/arrow-forward';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import ChannelForm from '../channel/ChannelForm';
import RemoteSubmitButton from '../channel/RemoteSubmitButton'
import ChannelInfo from '../channel/ChannelInfo';
import MessageList from '../message/MessageList';
import EbookInfo from '../ebook/EbookInfo';

import {connect} from 'react-redux';
import {createChannel} from '../../actions'

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

class EbookWizard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      finished: false,
      stepIndex: 0,
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
      return (
        <ChannelForm />
      );
      case 1:
      const {channel} = this.props
      return (
        <MessageList channelId={channel.id} />
      );
      case 2:
      return (
        <EbookInfo ebookId={this.state.ebookId} />
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
      ) : (
        <div>
        {this.getStepContent(stepIndex)}
        <div style={toolbarStyle}>
        <FlatButton
        label={stepIndex === 0 ? '重置' : '上一步'}
        onTouchTap={this.handlePrev}
        style={{marginRight: 12}}
        />
        {stepIndex === 0 ? (
          <RemoteSubmitButton />
        ) : (
          <RaisedButton
          label={stepIndex === 2 ? '完成' : '下一步'}
          primary={true}
          onTouchTap={this.handleNext}
          />
        )}
        </div>
        </div>
      )}
      </div>
      </div>
      </MuiThemeProvider>
    );
  }
};

EbookWizard.propTypes = {
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(EbookWizard)
