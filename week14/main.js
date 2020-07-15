import { createElement, Text, Wrapper } from './createElement'

/*
class Mycomponent {
    constructor(config) {
        this.children = []
    }
    // set class(v){//property
    //     console.log("Parent::class",v)
    // }
    // set id(v){//property
    //     console.log("Parent::id",v)
    // }
    setAttribute(name, value) {//attribute
        this.root.setAttribute(name, value)
    }
    appendChild(child) {
        this.children.push(child)
    }
    render() {
        return <article>
            <header>i'm a header</header>
            {this.slot}
            <footer>i'm a footer</footer>
        </article>
    }
    moutTo(parent) {
        this.slot = <div></div>
        for (let child of this.children) {
            this.slot.appendChild(child)
        }
        this.render().moutTo(parent)

      
    }
    // appendChild(child){//children
    //     console.log("Parent::appendChild",child)
    // }
}
*/

class Carousel {
    constructor(config) {
        this.children = []
        this.attributes = new Map();
        this.properties = new Map();
    }

    setAttribute(name, value) {//attribute
        this[name] = value
    }
    render() {
        let children = this.data.map(url => {
            let element = <img src={url} />;
            element.addEventListener("dragstart", event => event.preventDefault())
            console.log('element::',element)
            return element
        })
        let root = <div class="carousel">{children}</div>
        let position = 0
        let nextPic = () => {
            let nextPosition = (position + 1) % this.data.length
            let current = children[position];
            let next = children[nextPosition];

            //起始位置
            current.style.transition = "ease 0s"
            next.style.transition = "ease 0s"

            current.style.transform = `translateX(${-100 * position}%)`
            next.style.transform = `translateX(${100 - 100 * nextPosition}%)`
            setTimeout(function () {
                current.style.transition = "" // =""means use css rule
                next.style.transition = ""

                current.style.transform = `translateX(${-100 - 100 * position}%)`
                next.style.transform = `translateX(${-100 * nextPosition}%)`
                position = nextPosition
            }, 16)
            setTimeout(nextPic, 3000)
        }
       // setTimeout(nextPic, 3000)  //三秒切换图片
       console.log('root::',root)
       root.children.map(value=>{
        value.addEventListener("mousedown", event => {
            let startX = event.clientX, startY = event.clientY;
    
            let lastPosition = (position - 1 + this.data.length) % this.data.length
            let nextPosition = (position + 1) % this.data.length
    
            let current = children[position]
            let last = children[lastPosition]
            let next = children[nextPosition]
    
            current.style.transition = "ease 0s"
            last.style.transition = "ease 0s"
            next.style.transition = "ease 0s"
    
            current.style.transform = `translateX(${- 500 * position}px)`
            last.style.transform = `translateX(${-500 - 500 * lastPosition}px)`
            next.style.transform = `translateX(${500 - 500 * nextPosition}px)`
    
            let move = event => {
    
                current.style.transform = `translateX(${event.clientX - startX - 500 * position}px)`
                last.style.transform = `translateX(${event.clientX - startX - 500 - 500 * lastPosition}px)`
                next.style.transform = `translateX(${event.clientX - startX + 500 - 500 * nextPosition}px)`
            };
            let up = event => {
                let offset = 0;
                if (event.clientX - startX > 250) {
                    offset = 1;
                } else if (event.clientX - startX < -250) {
                    offset = -1
                }
    
                current.style.transition = ""
                last.style.transition = ""
                next.style.transition = ""
                //transition为空代表打开
    
    
                current.style.transform = `translateX(${offset * 500 - 500 * position}px)`
                last.style.transform = `translateX(${offset * 500 - 500 - 500 * lastPosition}px)`
                next.style.transform = `translateX(${offset * 500 + 500 - 500 * nextPosition}px)`
                position =  (position -offset + this.data.length) % this.data.length
                document.removeEventListener("mousemove", move);
                document.removeEventListener("mouseup", up);
            };
            document.addEventListener("mousemove", move);
            document.addEventListener("mouseup", up);
        })
       })

        return root
        /* <div class="carousel">
            { this.data.map(url=>{
            let element = <img src={url} />;
            element.addEventListener("dragstart", event => event.preventDefault())
            return element
            }) }
        </div> */
    }
    moutTo(parent) {
        this.render().moutTo(parent)
    }
    // appendChild(child){//children
    //     console.log("Parent::appendChild",child)
    // }
}

// let component = <div id="a" class="b" style="width:100px;height:100px;background-color:lightgreen">
//     <div></div>
//     <p></p>
//     <div></div>
//     <div></div>
// </div>

// let component =<Mycomponent>
//  <div>text text text</div>
//  </Mycomponent>
let component = <Carousel data={[
    "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
    "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
    "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
    "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
]} />

component.moutTo(document.body)

console.log(component)


 //component.setAttribute("id","a")