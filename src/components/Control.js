import React, { Component } from 'react';

class Control extends Component {
    render(){
      return(
        <div>
            <ul>
                <li><a href="/create" onClick={function(e){ // 추가
                    e.preventDefault();
                    this.props.onChangeMode('create');
                }.bind(this)}>create</a></li>
                <li><a href="/update" onClick={function(e){ // 업데이트
                    e.preventDefault();
                    this.props.onChangeMode('update');
                }.bind(this)}>update</a></li>
                <li><input onClick={function(e){ // 삭제
                    e.preventDefault();
                    this.props.onChangeMode('delete');
                }.bind(this)} type="button" value="delete"></input></li>
            </ul>
        </div>
      );
    }
  }

export default Control;  