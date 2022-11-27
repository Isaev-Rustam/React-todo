import './timer.css';
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';

function Timer({ deadline: dl, onUpdateTime, isCounting: work }) {
  const [time, setTime] = useState(dl);
  const [isCounting, setIsCounting] = useState(false);

  const MINUTE = Timer.getPadTime(Math.floor(time / 60));
  const SECOND = Timer.getPadTime(time - MINUTE * 60);
  const UPDATE_INTERVAL = 1000;
  const savedTime = useRef();

  useEffect(() => {
    savedTime.current = time;
  });

  useEffect(() => {
    if (dl <= 0) setTime(3600);
    onUpdateTime(savedTime.current, isCounting);
    if (isCounting && savedTime.current >= 0) {
      const id = setInterval(() => {
        if (savedTime.current <= 0) {
          setIsCounting(() => false);
        }
        setTime((tm) => (tm >= 1 ? tm - 1 : 0));
      }, UPDATE_INTERVAL);
      return () => clearInterval(id);
    }
    return () => {};
  }, [isCounting, dl]);

  useEffect(() => {
    if (work) setIsCounting(() => true);
    onUpdateTime(savedTime.current, isCounting);
  }, [work]);

  const handlerPlay = () => {
    if (time <= 0) setTime(3600);
    setIsCounting(true);
  };

  const handlerPause = () => {
    setIsCounting(false);
  };

  return (
    <span className="description">
      <button
        onClick={handlerPlay}
        aria-label="start timer"
        type="button"
        className={className('icon icon-play', { 'icon--active': !isCounting })}
        disabled={isCounting}
      />
      <button
        onClick={handlerPause}
        aria-label="pause timer"
        type="button"
        className={className('icon icon-pause', { 'icon--active': isCounting })}
        disabled={!isCounting}
      />

      <time aria-label="time">
        <span aria-label="sec">{MINUTE}</span>&nbsp;:&nbsp;
        <span aria-label="min">{SECOND}</span>
      </time>
    </span>
  );
}

Timer.getPadTime = (time) => time.toString().padStart(2, '0');

Timer.defaultProps = {
  deadline: 60,
};

Timer.propTypes = {
  deadline: PropTypes.number,
};

export default Timer;