import React, { Component } from 'react';
import Subject from './components/Subject'
import TOC from './components/TOC'
import Control from './components/Control'
import ReadContent from './components/ReadContent'
import CreateContent from './components/CreateContent'
import UpdateContent from './components/UpdateContent'

class App extends Component {
  constructor(props){ 
    super(props);
    this.max_content_id = 3; // contents 객체의 id값 중 가장 큰 것
    this.state={ // App 컴포넌트의 State 초기화
      subject:{title:'WEB', sub:'World Wide Web!'},

      mode:'welcome',
      welcome:{title:'Welcome', desc:'Hello, React!!'},
      selected_content_id:2,
      contents:[
        {id:1, title:'HTML', desc:'HTML is ...'},
        {id:2, title:'CSS', desc:'CSS is ...'},
        {id:3, title:'Javascript', desc:'Javascript is ...'}
      ]
    }
  }
  render(){
    var _id, _title, _desc, _article = null;
    if(this.state.mode === 'welcome'){ // welcome mode
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if(this.state.mode === 'read'){ // read mode
      var i = 0;
      while(i < this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id){
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i = i + 1;
      }   
      _article = <ReadContent title={_title} desc={_desc}></ReadContent> 
    } else if(this.state.mode === 'create'){ // create mode
      _article = <CreateContent onSubmit={function(_title,_desc){
        this.max_content_id = this.max_content_id + 1;
        var _contents = this.state.contents.concat(
          {id:this.max_content_id, title: _title, desc: _desc}
        )
        this.setState({
          contents: _contents,
          mode: 'read',
          selected_content_id: this.max_content_id
        })
      }.bind(this)}></CreateContent>
    } else if(this.state.mode === 'update'){ // update mode
      i = 0;
      while(i < this.state.contents.length){
        data = this.state.contents[i];
        if(data.id === this.state.selected_content_id){
          _id = data.id;
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i = i + 1;
      }   
      _article = <UpdateContent id = {_id} title = {_title} desc = {_desc}
        onSubmit={function(_id, _title, _desc){
          var _contents = Array.from(this.state.contents); // _contents로 복제(새로운 배열 만들어줌)
          var i = 0;
          while(i < _contents.length){
            if(_contents[i].id === _id){
              _contents[i] = {id: _id, title: _title, desc: _desc};
              break;
            }
            i = i + 1;
          }
          this.setState({
            contents: _contents,
            mode: 'read'
          })
      }.bind(this)}></UpdateContent>
    }
    return(
      <div className="App">
        {/* 상위 컴포넌트의 상태를 하위 컴포넌트에 전달 = 상위 state값을 하위의 props로 전달  */}
        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}
          onChangePage = {function(){
            this.setState({ // bind를 사용해 현재 App컴포넌트가 this라는 것을 주입해줌
              mode:'welcome'// 이벤트에서 state의 상태를 바꿀때는 setState를 사용
            })
          }.bind(this)} // onChangePage라는 이벤트에 함수 만듦
                        // 이벤트가 발생되었을 때(링크클릭) subject.js에 Props로 전달된 onChangePage를 호출
        >
        </Subject>
        <TOC 
          onChangePage = {function(id){
            this.setState({ // bind를 사용해 현재 App컴포넌트가 this라는 것을 주입해줌
              mode:'read', // 이벤트에서 state의 상태를 바꿀때는 setState를 사용
              selected_content_id:Number(id)
            })
          }.bind(this)}
          data={this.state.contents}></TOC>
        <Control
          onChangeMode = {function(_mode){
            if(_mode === 'delete'){
              if(window.confirm('글을 삭제하겠습니까?')){
                var _contents = Array.from(this.state.contents)
                var i = 0;
                while(i < _contents.length){
                  if(_contents[i].id === this.state.selected_content_id){
                    _contents.splice(i,1); // 어디부터 어디까지 지워줌
                    break; 
                  }
                  i = i + 1;
                }
                this.setState({
                  mode:'welcome',
                  contents: _contents
                });
                alert('삭제되었습니다.')
              }
            } else {
              this.setState({
                mode: _mode
              })
            }
          }.bind(this)}></Control>
        {_article} {/* 모드에 따라 article의 내용 바뀜 */}
      </div>
    );
  }
}

export default App;
