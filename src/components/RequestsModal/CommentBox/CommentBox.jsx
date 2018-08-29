import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './_CommentBox.scss';

class CommentBox extends Component {
  state = {
    dataInput: '',
    submitReady: false
  };

  handleOnChange = content => {
    this.setState({
      dataInput: content,
      submitReady: true,
      border: false
    });
  };

  handleFocus = () => {
    const { border } = this.state;
    this.setState({
      border: !border
    });
  };

  handleBlur = () => {
    const { dataInput } = this.state;
    this.setState({
      dataInput: '',
      submitReady: dataInput ? true : false,
      border: false
    });
  };

  render() {
    const { dataInput, submitReady, border } = this.state;
    let status = submitReady && dataInput ? '--active' : '';
    let border_id = border || dataInput ? 'focus-class' : '';
    return (
      <form className="editor__editor-form" id="form-id">
        <ReactQuill
          id={border_id}
          theme="snow"
          placeholder="Write a comment"
          modules={CommentBox.modules}
          onChange={this.handleOnChange}
          value={dataInput}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        <div className="editor__btn-size">
          <span className="editor__btn-wrap">
            <button
              className={`editor__post-btn editor__post-btn${status} post-btn-text`}
              type="submit"
            >
              Post
            </button>
          </span>
        </div>
      </form>
    );
  }
}

CommentBox.modules = {
  toolbar: {
    container: [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }]
    ]
  }
};

export default CommentBox;
