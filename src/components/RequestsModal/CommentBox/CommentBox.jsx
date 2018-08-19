import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Editor } from '@tinymce/tinymce-react';
import './_CommentBox.scss';

class CommentBox extends Component {
  state = {
    dataInput: '',
    submitReady: false
  };

  handleEditorChange = event => {
    event.preventDefault();
    this.setState({
      dataInput: event.target.getContent({ format: 'text' }).trim(),
      submitReady: true
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { handleCreateComment } = this.props;
    const { dataInput } = this.state;
    handleCreateComment(dataInput);
  };

  handleFocus = event => {
    event.target.editorContainer.style.border = '1px solid blue';
  };

  handleBlur = event => {
    event.target.editorContainer.style.border = '1px solid #E4E4E4';
  };
 

  render() {
    const { dataInput, submitReady } = this.state;
    let status = submitReady && dataInput ? '--active' : '';
    return (
      <form onSubmit={this.handleSubmit} className="editor__editor-form" id="form-id">
        <Editor
          initialValue="<p style='color:#999999; font-size: 15px;	font-family: DIN Pro;	line-height: 20px; text-align: left; margin:20px 8px;'>Write a comment</p>"
          init={{
            statusbar: false,
            plugins: 'lists',
            skin: 'lightgray',
            menubar: false, branding: false,
            toolbar: 'bold italic underline   numlist bullist   outdent indent' }}
          onChange={this.handleEditorChange}
          value={this.dataInput}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur} />
        <div className="editor__btn-size">
          <span className="editor__btn-wrap">
            <button className={`editor__post-btn editor__post-btn${status} post-btn-text`} type="submit">
              Post
            </button>
          </span>
        </div>
      </form>
    );
  }
}

CommentBox.propTypes = {
  handleCreateComment: PropTypes.func.isRequired
};

export default CommentBox;
