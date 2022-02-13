import React, { Component } from 'react';

class Subject extends Component {
    render(){
      return(
        <header>
          <h1><a href="/" onClick={function(e){
                e.preventDefault(); // 기본적인 동작을 막음(페이지 reload 안 됨)
                this.props.onChangePage(); // App컴포넌트의 onChangePage 이벤트 함수 호출
           }.bind(this)}>{this.props.title}</a></h1>
          {this.props.sub}
        </header>
      );
    }
  }

export default Subject;