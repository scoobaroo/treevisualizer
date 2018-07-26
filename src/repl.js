class TreeStruct {
    constructor(data) {
        let node = new Node(data);
        this.root = node;
        this.allNodes = {};
        this.allNodes[node.name] = node
    }
    add(attributes, name) {
        let node = new Node(attributes);
        let parent = this.allNodes[name];
        node.parent = parent;
        parent.children.push(node);
        this.allNodes[node.name] = node
    }
}

function* idMaker() {
    var index = 0;
    while (true)
        yield index++;
}

var gen = idMaker();

class Node {
    constructor(attributes) {
        this.name = gen.next().value;
        this.attributes = attributes;
        this.parent = null;
        this.children = [];
    }
}

let tree = new TreeStruct({ "aaa": "abaaac" });
tree.add({ "bbb": "bbb" }, 0)
tree.add({ "decccf": "abcccc" }, 0)
tree.add({ "ddddef": "dddd" }, 0)
tree.add({ "drrrrref": "arrrbc" }, 0)

// console.log(tree)
let n = new Node({ "hey": "you" });
({ name, attributes, parent, children } = n)
console.log(name);
console.log(attributes);
console.log(parent);
console.log(children);