css3动画没有时间轴，animation-delay 最常见的是用于将动画与其他动画的执行时机错开，将动画落到不同的时间点，形成动画时间轴
Gpu 利用率越高 性能越好
减少 dom 操作
使用 transform 而非 left right 属性移动元素

每一个SGML 都有DTD ，由元素，属性，实体，注释组成
合法元素
   Element
   Text
   Comment
   DcumentType
   ProcessingInstruction
   CDATA
字符引用
   ¡ &#161;
   & &amp;
   < &lt;
   " &quot;  


导航类操作
   parentNode
   childNode
   firstNode
   lastNode
   nextSibling
   previousSibling
修改操作（会实时修改通过childNode获取到的数组数据）
   appendChild（对一个已存在的元素进行操作时会进行位置的挪移）
   insertBefore
   removeChild
   replaceChild
高级操作
   compareDocumentPosition 是一个用于比较两个节点中关系的函数
   contains 检查一个节点是否包含另一个节点的函数
   isEqualNode 检查两个节点是否完全相同
   isSameNOde 检查两个节点是否是同一个节点，实际上在JavaScript中可以用“===”
   cloneNode复制一个节点，如果传入参数true，则会连同子元素做深拷贝
