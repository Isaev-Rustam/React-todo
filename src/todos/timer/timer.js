import './timer.css';
import { Component } from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';

class Timer extends Component {
  state = { work: false, min: 0, sec: 0 };

  SECOND = 1000;

  MINUTE = this.SECOND * 60;

  deadline = null;

  updateInterval = 1000;

  componentDidMount() {
    const { min, sec, work, deadline } = this.props;
    this.setState(() => ({ min, sec, work }));
    if (work) {
      this.deadline = deadline;
      this.timeTick();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { min, sec, work } = this.state;
    const { onUpdateTime } = this.props;
    if (prevState.sec !== sec || prevState.min !== min || prevState.work !== work) {
      onUpdateTime({ min, sec, work, deadline: this.deadline });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timerId);
  }

  timeTick = () => {
    const time = this.deadline - Date.now();
    if (time <= 0) {
      this.setState(() => ({ min: 0, sec: 0, work: false }));
      this.deadline = null;
      return;
    }
    this.setState({ min: Math.floor(time / this.MINUTE), sec: Math.floor(time / this.SECOND) % 60 });

    this.timerId = setTimeout(this.timeTick, this.updateInterval);
  };

  handlerPlay = () => {
    const { min, sec } = this.state;
    if (min <= 0 && sec <= 0) {
      this.deadline = Date.now() + 60 * this.MINUTE;
    } else {
      this.deadline = Date.now() + min * this.MINUTE + sec * this.SECOND;
    }
    this.setState(() => ({ work: true }));
    this.timeTick();
  };

  handlerPause = () => {
    this.deadline = null;
    this.setState(() => ({ work: false }));
    clearTimeout(this.timerId);
  };

  render() {
    const { work, min, sec } = this.state;
    return (
      <span className="description">
        <button
          onClick={this.handlerPlay}
          aria-label="start timer"
          type="button"
          className={className('icon icon-play', { 'icon--active': !work })}
          disabled={work}
        />
        <button
          onClick={this.handlerPause}
          aria-label="pause timer"
          type="button"
          className={className('icon icon-pause', { 'icon--active': work })}
          disabled={!work}
        />

        <time aria-label="time">
          <span aria-label="min">{min.toString().padStart(2, '0')}</span>&nbsp;:&nbsp;
          <span aria-label="sec">{sec.toString().padStart(2, '0')}</span>
        </time>
      </span>
    );
  }
}

Timer.defaultProps = {
  sec: 0,
  min: 0,
  onUpdateTime: () => {},
};

Timer.propTypes = {
  sec: PropTypes.number,
  min: PropTypes.number,
  onUpdateTime: PropTypes.func,
};

export default Timer;
