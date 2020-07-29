function createElement(Cls, attributes, ...children) {

    let element;

    if (typeof Cls === 'string') {
        element = new Wrapper(Cls, {
            config: 'wrapperConfig',
        });
    } else {
        element = new Cls({
            config: 'elementConfig',
        });
    }

    // 将attributes转移到obj上
    for (const name in attributes) {
        element.setAttribute(name, attributes[name]);
    }

    // console.log(children);
    // 将children挂载到obj
    for (const child of children) {
        if (typeof child === 'string') {
            child = new Text(child);
        }
        element.appendChild(child);
    }

    return element;
}

// 普通组件
class Div {
    constructor(config) {
        this.children = [];
        this.root = document.createElement('div');
    }

    set class(value) {
        // console.log('Div set class', value);
    }

    set id(value) {
        // console.log('Div set id', value);
    }

    setAttribute(name, value) {
        // attribute
        if (name === 'style' && typeof value === 'object') {
            for (const prop in value) {
                this.root.style[prop] = value[prop];
            }
        } else {
            this.root.setAttribute(name, value);
        }
    }

    appendChild(child) {
        this.children.push(child);
    }

    render() {
        return (
            <article>
                <header>I'm a header</header>
                {this.slot}
                <footer>I'm a footer</footer>
            </article>
        );
    }


    mountTo(parent) {
        this.slot = <div></div>;

        for (const child of this.children) {
            this.slot.appendChild(child);
        }

        this.render().mountTo(parent);
    }
}

class Wrapper {
    constructor(type, config) {
        this.children = [];
        this.root = document.createElement(type);
    }


    set class(value) {
        // property
    }

    set id(value) {
        // console.log('Div set id', value);
    }

    setAttribute(name, value) {
        // attribute
        if (name === 'style' && typeof value === 'object') {
            for (const prop in value) {
                this.root.style[prop] = value[prop];
            }
        } else {
            this.root.setAttribute(name, value);
        }
    }

    appendChild(child) {

        this.children.push(child);
    }


    mountTo(parent) {
        parent.appendChild(this.root);
        for (const child of this.children) {
            child.mountTo(this.root);
        }
    }
}


class Text {
    constructor(text) {
        this.root = document.createTextNode(text);
    }

    mountTo(parent) {
        parent.appendChild(this.root);
    }
}


let component = (
    <Div>
        <p
            id='a'
            class='b'
            style={{ width: '300px', height: '300px', backgroundColor: 'lightgreen' }}
        >
            Text in p{new Wrapper('em')}
        </p>
    </Div>
);

component.class = 'c'; 


component.mountTo(document.querySelector('#root'));
