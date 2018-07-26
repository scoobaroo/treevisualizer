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
    let nodeToRemoveParent = nodeToRemove.parent;
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
    }
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { tree } = this.state;
    tree.add(JSON.parse(this.state.object),this.state.name);
    this.setState({data:[{ name:tree.root.name, attributes:tree.root.attributes, parent:tree.root.parent, children:tree.root.children }]});
  }

  onNameInputChange(event){
    this.setState({name:event.target.value});
  }

  onRemoveInputChange(event){
    this.setState({nameToRemove: event.target.value});
  }
  onObjectInputChange(event){
    this.setState({object: event.target.value});
  }

  onRemove(event){
    event.preventDefault();
    const {tree} = this.state;
    tree.remove(this.state.nameToRemove);
    this.setState({data:[{ name:tree.root.name, attributes:tree.root.attributes, parent:tree.root.parent, children:tree.root.children }]});
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
          <input type = "text" label="Name" placeholder="ID" onChange = {this.onNameInputChange.bind(this)} />
          <label>Enter in a JSON literal (keys must be strings) in brackets: </label>
          <input type = "text" label="Object" placeholder="Object" onChange = {this.onObjectInputChange.bind(this)} />
          <button type="submit">Submit</button>
        </form>
        <input type = "text" label="Name" placeholder="ID" onChange = {this.onRemoveInputChange.bind(this)} />
        <button type="submit" onClick={this.onRemove.bind(this)}>Remove a Node by ID</button>
        <div id="treeWrapper" style={{width: '2500', height: '2000'}}>
          {this.renderTree()}
        </div>
      </div>
    );
  }
} 

export default App;
