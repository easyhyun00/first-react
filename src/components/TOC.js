import React, { Component } from 'react';

class TOC extends Component {
    shouldComponentUpdate(newProps,newState){ // 값이 변화가 없으면 render 안함
        if(this.props.data === newProps.data){
            return false;
        }
        return true;
    }
    render(){
      var lists = [];
      var data = this.props.data; // App 컴포넌트의 State를 Props로 받음
      var i = 0;
      while(i < data.length){
        lists.push(
            <li key={data[i].id}>
                <a 
                   href={"/content/"+data[i].id}
                      onClick={function(id, e){
                         e.preventDefault();
                         this.props.onChangePage(id);
                   }.bind(this, data[i].id)}>
                   {data[i].title}
                </a>
            </li>)
        i = i + 1;
      }
      return(
        <nav>
          <ul>
            {lists}
          </ul>
        </nav>
      );
    }
  }

export default TOC;