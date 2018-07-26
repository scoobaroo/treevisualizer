import React, { Component } from 'react';
import { Tree, treeUtil } from 'react-d3-tree';

class TreeStructure {
  constructor(data) {
      let node = new Node(data);
      this.root = node;
      this.allNodes = {};
      this.allNodes[node.name] = node;
  }
  add(attributes, name) {
      let node = new Node(attributes);
      let parent = this.allNodes[name];
      parent.children.push(node);
      this.allNodes[node.name] = node;
  }
}

class Node {
  constructor(attributes) {
      this.name = gen.next().value;
      this.attributes = attributes;
      this.parent = null;
      this.children = [];
  }
}

function* idMaker() {
  var index = 0;
  while (true)
      yield index++;
}

var gen = idMaker();

class App extends Component {
  constructor(props){
    super(props);
    this.tree = new TreeStructure({"aaa":"abaaac"});
    this.state = {
        // data: this.tree.allNodes,
        forms : [],
        count : 1
    }
  }

  onSubmit(event){
    event.preventDefault();
    let object = {}
    object[this.state.attribute] = this.state.value;
    let node = new Node(object);
    let selectedNode = this.tree.allNodes[this.state.name];
    console.log(this.state.data)
    console.log(selectedNode);
    selectedNode.children.push(node);
    
  }

  
  onAttributeInputChange(event){
    this.setState({attribute:event.target.value});
  }

  onValueInputChange(event){
    this.setState({value:event.target.value});
  }

  onNameInputChange(event){
    this.setState({name:event.target.value});
  }

  addMore(event){
    event.preventDefault();
    this.setState({count: this.state.count+1})//on click add more forms
  }

  displayForm(){
     let forms = [];
     for(let i = 0; i < this.state.count; i++){
        forms.push(
          <div key={i}>
              <label>Attribute Name </label>
              <input type = "text" label="Attribute" placeholder="Attribute" onChange = {this.onAttributeInputChange.bind(this)} />
              <label>Attribute Value </label>
              <input type = "text" label="Value" placeholder="Value" onChange = {this.onValueInputChange.bind(this)} />
          </div>
        )
     }
     return forms || null;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Tree Visualizer</h1>
        </header>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Name of node you would like to add to</label>
          <input type = "text" label="Name" placeholder="Name" onChange = {this.onNameInputChange.bind(this)} />
          {this.displayForm()}
          <button onClick={this.addMore.bind(this)}>Add a Node attribute and value</button>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        <div id="treeWrapper" style={{width: '1000em', height: '500em'}}>
          <Tree data={this.state.data} />
        </div>
      </div>
    );
  }
} 

export default App;
