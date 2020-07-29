# 每周总结可以写在这里
移动端touch事件不需要在个别元素上监听, 它在哪个元素上起始，就会在这个元素上触发

四种手势
 tap
 pan - panstart panmove panend
 flick
 press - pressstart pressend
手势的基本架构：监听-》识别-》分发

pointerEvent兼容性不好，用mouseEvent和touchEvent