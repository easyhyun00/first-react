import React, { Component } from 'react';

class CreateContent extends Component {
    render(){
      return(
        <article>
          <h2>Create</h2>
          <form action="/create_process" method="post"
            onSubmit={function(e){ // 제출했을 때, App 컴포넌트의 contents 객체에 그 내용이 추가
                e.preventDefault();
                this.props.onSubmit(
                    e.target.title.value,
                    e.target.desc.value
                );
            }.bind(this)}
          >
            <p>
                <input type="text" name="title" placeholder="title"></input>
            </p>
            <p>
                <textarea name="desc" placeholder="description"></textarea>
            </p>
            <p>
                <input type="submit"></input>
            </p>
          </form>
        </article>
      );
    }
  }

export default CreateContent;

