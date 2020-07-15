# 每周总结可以写在这里

 requestAnimationFrame 需要套两层 第一层代表第一针 第二层代表第二针
transition为空代表打开
transition 不是立刻执行 需要settimeout 16毫秒 16毫秒代表一针的时间
子类中获取不到 style属性可以通过get 方法return