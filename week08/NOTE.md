# 每周总结可以写在这里
css 
语法选择器
 ·简单选择器 
 ·符合选择器 
   简单选择器无缝写在一起，同时满足
   *或者div 得写在最前面 伪类写在最后面
  ·复杂
   空格 代表子孙
   > 只能选择子一级   无回溯
   ～                无回溯
   +               无回溯
   || 双树线不推荐  很多浏览器也不支持
    不推荐bem写法 
    *不改变specificity


伪类
 链接/行为 
  最开始为了超链接
  
 树结构
 浏览器有一个原则： 回溯  :nth-last-child   :last-child  :only-child

 逻辑行伪类
  :not
  :where :has

伪元素



排版
   盒（box）
   盒模型
   content-box  border-box（计算内编剧跟边框）
   为什么会有盒模型：需要留白
   
   正常流

   基线对齐
   linebox 没有任何内容基线在底部   需要配合vertical-bottom（或者top） 行模型 最高元素对齐方式
   getclientrects 取出盒的位置
   一个element 可能会出现多个盒
   float 与 clear




