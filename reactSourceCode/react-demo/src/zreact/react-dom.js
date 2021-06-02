//vnode 虚拟dom对象
//container  真实dom节点
function render(vnode, container) {
    console.log('vnode', vnode)
    console.log('container', container)
    const node = createNode(vnode);
    container.appendChild(node);
}

functionNode(vnode) {
    let node;
    const {
        type
    } = vnode;
    if (typeof type === 'string') {
        node = updateHostComponent(vnode);
    } else if (typeof type == 'function') {
        //函数组件
        node = updateFunctionComponent(vnode);
    } else {
        node = updateTextComponent(vnode);
    }
}

//原生标签节点
function updateHostComponent(vnode) {
    const {
        type,
        props
    } = vnode;
    const node = document.createElement(type);
    updateNode(node, props); //属性
    reconcileChildren(node, props.children); //遍历children
    return node;
}

//更新属性
function updateNode(node, nextVal) {
    Object.keys(nextVal).filter((k) => k !== 'children').forEach((k) => (node[k] = nextVal[k]));
}

//文本
function updateTextComponent(vnode) {
    const node = document.createTextNode(vnode);
    return node;
}

//函数组件
function updateFunctionComponent(vnode) {
    const {
        type,
        props
    } = vnode;
    const vvnode = type(props);
    // vvnode -> node
    const node = createNode(vvnode);
    return node;
}

//
function reconcileChildren(parentNode, children) {
    const newChildren = Array.isArray(children) ? children : [children];
    for (let i = 0; i < newChildren.length; i++) {
        let child = newChildren[i];
        //vnode
        //vnode->node,node插入到parentNode
        render(child, parentNode)
    }
}
export default {
    render
};