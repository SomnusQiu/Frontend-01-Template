import {
  cubicBezier
} from './cubicBezier';

export class TimeLine {
  constructor(config = {
    loop: false
  }) {
    this.animations = [];
    this.requestID = null;
    this.state = 'inited';

    this.config = config;
    this.tick = () => {
      let t = Date.now() - this.startTime;

      let animations = this.animations.filter(
        (animation) => !animation.finished,
      );


      if (!animations.length) {
        this.config.onAllStop && this.config.onAllStop();

        if (this.config.loop) {
          this.restart();
        }
      }
      for (const animation of animations) {
        let {
          object,
          property,
          template,
          duration,
          delay,
          timingFunction,
          addTime,
          key,
        } = animation;

        let time = (t - delay - addTime) / duration;
        let progression = timingFunction(time < 0 ? 0 : time); // 0-1之间的数字

        if (t > duration + delay + addTime) {
          progression = 1;
          animation.finished = true;

          this.config.onStop && this.config.onStop(key);
        }

        if (time >= 0) {
          let value = animation.valueFromProgression(progression);
          object[property] = template(value, time);
        }
      }

      if (animations.length) {
        this.requestID = requestAnimationFrame(this.tick);
      }
    };
  }

  pause() {
    if (this.state !== 'playing') {
      return;
    }
    this.state = 'pause';
    this.pauseTime = Date.now();
    if (this.requestID !== null) {
      cancelAnimationFrame(this.requestID);
      // 触发暂停事件
      this.config.onPause && this.config.onPause();
    }
  }

  resume() {
    if (this.state !== 'pause') {
      return;
    }
    this.state = 'playing';
    this.startTime += Date.now() - this.pauseTime;
    this.tick();
    // 触发恢复播放事件
    this.config.onResume && this.config.onResume();
  }

  start() {
    if (this.state !== 'inited') {
      return;
    }
    this.state = 'playing';
    this.startTime = Date.now();
    this.tick();
    // 触发开始播放事件
    this.config.onStart && this.config.onStart();
  }

  restart() {
    if (this.state === 'playing') {
      this.pause();
    }
    this.animations.forEach((animation) => {
      animation.finished = false;
    });
    this.requestID = null;
    this.state = 'playing';
    this.startTime = Date.now();
    this.pauseTime = null;
    this.tick();
    this.config.onRestart && this.config.onRestart();
  }

  add(animation, addTime) {
    this.animations.push(animation);
    animation.finished = false;
    if (this.state === 'playing') {
      animation.addTime =
        addTime !== void 0 ? addTime : Date.now() - this.startTime;
    } else {
      animation.addTime = addTime !== void 0 ? addTime : 0;
    }
  }
}

export class Animation {
  constructor(
    object,
    property,
    start,
    end,
    duration,
    delay,
    timingFunction,
    template,
    key, // 传入一个唯一的标识key，用来标识此段动画，可以用于调试或者事件判断等。
  ) {
    this.key = key;
    this.object = object;
    this.template = template;
    this.property = property;
    this.start = start;
    this.end = end;
    this.duration = duration;
    this.delay = delay || 0;
    this.timingFunction = timingFunction;
  }

  valueFromProgression(progression) {
    return this.start + progression * (this.end - this.start);
  }
}

export class ColorAnimation {
  constructor(
    object,
    property,
    start,
    end,
    duration,
    delay,
    timingFunction,
    template,
    key,
  ) {
    this.key = key;
    this.object = object;
    this.template =
      template ||
      ((v) => {
        return `rgba(${v.r}, ${v.g}, ${v.b}, ${v.a})`;
      });
    this.property = property;
    this.start = start;
    this.end = end;
    this.duration = duration;
    this.delay = delay || 0;
    this.timingFunction = timingFunction;
  }

  valueFromProgression(progression) {
    return {
      r: this.start.r + progression * (this.end.r - this.start.r),
      g: this.start.g + progression * (this.end.g - this.start.g),
      b: this.start.b + progression * (this.end.b - this.start.b),
      a: this.start.a + progression * (this.end.a - this.start.a),
    };
  }
}

export let linear = (t) => t;

export let ease = cubicBezier(0.24, 0.1, 0.25, 1);

