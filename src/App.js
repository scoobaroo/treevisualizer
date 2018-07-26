/* global location */
/* eslint no-restricted-globals: ["off", "location"] */

import React, { Component } from 'react';
import { Tree } from 'react-d3-tree';

class TreeStructure {
  constructor() {
      this.root = null;
      this.allNodes = {};
  }
  add(attributes, name) {
      let node = new Node(attributes);
      if(!this.root){
        this.root = node;
        this.allNodes[name] = node;
      } else if (this.root.name==name){
        this.root.children.push(node);
        this.allNodes[node.name] = node;
      } else{
        let parent = this.allNodes[name];
        parent.children.push(node);
        node.parent = parent;
        this.allNodes[node.name] = node;
      }
  }
  remove(name){
    let nodeToRemove = this.allNodes[name];
    console.log(nodeToRemove);
    let nodeToRemoveParent = nodeToRemove.parent;
    console.log(nodeToRemoveParent);
    for(var i=0; i< nodeToRemoveParent.children.length; i++){
      let n = nodeToRemoveParent.children[i];
      if(n==nodeToRemove){
        nodeToRemoveParent.children.splice(i,1);
      }
    }
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
    this.state = {
        data: [],
        tree: new TreeStructure(),
        forms : [],
        count : 1
    }
  }

  getInitialState() {
    return {data: []};
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { tree } = this.state;
    let object = {};
    object[this.state.attribute] = this.state.value;
    tree.add(object, this.state.name);
    this.setState({data:[{ name:tree.root.name, attributes:tree.root.attributes, parent:tree.root.parent, children:tree.root.children }]});
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

  onRemoveInputChange(event){
    this.setState({nameToRemove: event.target.value});
  }

  onRemove(event){
    event.preventDefault();
    const {tree} = this.state;
    tree.remove(this.state.nameToRemove);
    this.setState({data:[{ name:tree.root.name, attributes:tree.root.attributes, parent:tree.root.parent, children:tree.root.children }]});
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

  renderTree(){
    if(this.state.data.length>0){
      return (
        <div>
          <Tree data={this.state.data} />
        </div>
      )
    } else return null;
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Tree Visualizer</h1>
        </header>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>ID of node (this is the bold number on top of the node) you would like to add to: </label>
          <input type = "text" label="Name" placeholder="Name" onChange = {this.onNameInputChange.bind(this)} />
          {this.displayForm()}
          <button onClick={this.addMore.bind(this)}>Add a Node attribute and value </button>
          <button type="submit">Submit</button>
        </form>
        <input type = "text" label="Name" placeholder="Name" onChange = {this.onRemoveInputChange.bind(this)} />
        <button type="submit" onClick={this.onRemove.bind(this)}>Remove a Node by ID</button>
        <div id="treeWrapper" style={{width: '2500', height: '2000'}}>
          {this.renderTree()}
        </div>
      </div>
    );
  }
} 

export default App;
