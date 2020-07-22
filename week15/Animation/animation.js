export class Timeline {
    constructor() {
        this.animation = []
        this.requestID =null
        this.state = "inited"
        this.tick=() =>{
            let t =Date.now()-this.startTime
            let  animation = this.animation.filter(animation =>!animation.finished)
            for (let animation of this.animation) {
               
                let { object, property,template, start, end,duration,timingFunciton,delay,addTime } = animation
                let progression = timingFunciton((t-delay-addTime)/duration) //0-1 之前的数 代表百分比
             
                if(t > duration + delay + addTime){
                    progression = 1;
                    animation.finished = true
                }
          
    
                let value = animation.valueFromProgression(progression) //value就是根据progression计算出的当前值
    
                object[property] = template(value);
            }
         if(animation.length)
         this.requestID =  requestAnimationFrame(this.tick)
        }
    
        }
        pause(){
            if(this.state !=="playing")
            return;
            this.state = "pause"
            this.pauseTime = Date.now()
            if(this.requestID !==null)
            cancelAnimationFrame(this.requestID)
        }
        resume(){
            if(this.state !=="pause")
            return;
            this.state = "playing"
            this.startTime +=Date.now() -this.pauseTime 
            this.tick()
        }
        start() {
            if(this.state !=="inited")
            return;
            this.state = "playing"
            this.startTime = Date.now()
            this.tick()
        }
        restart(){
            if(this.state ==="playing")
            this.pause()
            this.animation = []
            this.requestID =null
            this.state = "inited"
            this.startTime = Date.now()
            this.pauseTime = null;
            this.tick()
        }
        add(animation,addTime) {
            this.animation.push(animation)
            animation.finished = false
            if(this.state ==="playing")
            animation.addTime = addTime!==void 0?addTime: Date.now()-this.startTime
            else
            animation.addTime = addTime !==void 0?addTime: 0
        }
        
   
}


export class Animation {
    constructor(object, property, start, end, duration, delay, timingFunciton,template) {
        this.object = object
        this.template =  template
        this.property = property
        this.start = start
        this.end = end
        this.duration = duration
        this.delay = delay
        this.timingFunciton = timingFunciton || ((start, end) => {
            return (t) => start + (t /duration)* (end - start)
        })
        // timingfunction 对应 ease linear easin easeout
    }
    valueFromProgression(progression){
      return  this.start+progression *(this.end-this.start)
    }

}

export class ColorAnimation {
    constructor(object, property, start, end, duration, delay, timingFunciton,template) {
        this.object = object
        this.template =  template || (v=>`rgba(${v.r},${v.g},${v.b},${v.a})`)
        this.property = property
        this.start = start
        this.end = end
        this.duration = duration
        this.delay = delay
        this.timingFunciton = timingFunciton || ((start, end) => {
            return (t) => start + (t /duration)* (end - start)
        })
        // timingfunction 对应 ease linear easin easeout
    }
    valueFromProgression(progression){
      return  {
          r:this.start.r+progression *(this.end.r-this.start.r),
          g:this.start.g+progression *(this.end.g-this.start.g),
          b:this.start.b+progression *(this.end.b-this.start.b),
          a:this.start.a+progression *(this.end.a-this.start.a),
      }
    }

}

/*
属性动画 从开始到结束 时长 和timingFunciton // delay 是js 专属的延迟开始 duration和delay 是以毫秒为单位
let animation = new Animation(object,property,start,end,duration,delay,timingFunciton);
let animation2 = new Animation(object,property,start,end,duration,delay,timingFunciton);



let timeline = new Timeline;//解决性能问题
timeline.add(animation);
timeline.add(animation2)

timeline.start()
timeline.start()

timeline.pause()
timeline.resume()
timeline.stop()

setTimeout
setInterval
requsetAnimationFrame
*/