import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Oval from '../../images/Oval.png';
import Oval2 from '../../images/Oval2.png';
import './_RequestsModal.scss';

class RequestDetailsModal extends Component {
  state = {
    approveColor: '',
    rejectColor: '',
    approveTextColor: '',
    rejectTextColor: '',
    dataInput: ''
  };

  handleApprove = () => {
    this.setState({
      approveColor: '#49AAAF',
      rejectColor: '',
      approveTextColor: 'white',
      rejectTextColor: ''
    });
  };

  handleReject = () => {
    this.setState({
      approveColor: '',
      rejectColor: '#FF5359',
      approveTextColor: '',
      rejectTextColor: 'white'
    });
  };

  handleEditorChange = e => {
    e.preventDefault();
    this.setState({
      dataInput: console.log('Content was updated:', e.target.getContent())
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      dataInput: event.target.value
    });
    console.log(this.dataInput);
  };

  renderUserInfo() {
    return (
      <div>
        <div className="modal__modal_dialog">
          <img src={Oval} alt="avatar" className="modal__oval" />
          <span className="modal__text-size">
Silm Momoh
          </span>
          <div className="modal__modal3">
Product Designer, Apprenticeship
          </div>
        </div>
      </div>
    );
  }

  renderRequestInfo() {
    return (
      <div>
        <div className="modal__travel-place">
          <span className="modal__dialog1">
Request to travel to: Nairobi
          </span>
          <span className="modal__dialog-from">
From: Lagos
          </span>
        </div>
        <div className="modal__modal1">
          <span className="modal__date-submitted">
Date submitted
          </span>
          <span className="modal__departure-date">
Target departure date
          </span>
          <span className="modal__target-return-date">
Target return date
          </span>
        </div>
      </div>
    );
  }

  renderRequestDate() {
    return (
      <div>
        <div className="modal__modal1">
          <span className="modal__date-date">
02 Aug 2018
          </span>
          <span className="modal__date-date">
11 Aug 2018
          </span>
          <span className="modal__date-date2">
05 Sept 2018
          </span>
        </div>
      </div>
    );
  }

  renderButtons() {
    const {
      approveColor,
      rejectColor,
      approveTextColor,
      rejectTextColor
    } = this.state;
    return (
      <div>
        <div className="modal__button-below">
          <span className="modal__dialog-btn">
            <button
              style={{
                backgroundColor: `${approveColor}`,
                color: `${approveTextColor}`
              }}
              onClick={this.handleApprove}
              type="button"
              className="modal__button-submitted-text bg"
            >
              Approve
            </button>
          </span>
          <span className="modal__dialog-btn">
            <button
              style={{
                backgroundColor: `${rejectColor}`,
                color: `${rejectTextColor}`
              }}
              onClick={this.handleReject}
              type="button"
              className="modal__button-rejected-text bgg"
            >
              Reject
            </button>
          </span>
        </div>
        <div className="modal__modal1">
          <span className="modal__mdl-icons">
            <img src={Oval2} alt="avatar" className="modal__oval-copy" />
            <span className="modal__add-comment">
Add a comment
            </span>
          </span>
        </div>
      </div>
    );
  }

  renderCommentBox() {
    const { dataInput } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="modal__editor">
        <Editor
          id="my-id"
          initialValue="<p style='color:#999999; font-size: 15px;	font-family: DIN Pro;	line-height: 20px; text-align: left; margin:20px 8px;'>Write a comment</p>"
          init={{
            body_class:
              'mce-notification.mce-in mce-tinymce mce-container mce-panel mce-ico',
            body_id: '#mceu_0 #mceu_1 #mceu_2',
            statusbar: false,
            selector: 'textarea',
            plugins: 'lists',
            skin: 'lightgray',
            menubar: false,
            branding: false,
            toolbar: 'bold italic underline   numlist bullist   outdent indent'
          }}
          onChange={this.handleEditorChange}
          value={this.dataInput}
        />
        <div className="modal__modal1">
          <span className="modal__dialog">
            <button type="submit" className="modal__post-btn post-btn-text">
              Post
            </button>
          </span>
        </div>
      </form>
    );
  }

  renderRequestAprroval() {
    return (
      <div className="modal__modal1">
        <span className="modal__mdl-icons">
          <img src={Oval2} alt="avatar" className="modal__oval-copy" />
          <span className="modal__user-name">
Jolomi Otumara
          </span>
          <span className="modal__approval-status">
approved your travel request.
          </span>
          <span className="modal__hours-status">
5 hours ago
          </span>
        </span>
      </div>
    );
  }

  renderUserComments() {
    return (
      <div>
        <hr />
        <div className="modal__modal1">
          <span className="modal__mdl-icons">
            <img src={Oval2} alt="avatar" className="modal__oval-copy" />
            <span className="modal__user-name">
Jolomi Otumara.
            </span>
            <span className="modal__hours-status">
5 hours ago
            </span>
            <span className="modal__dialog">
              <button type="button" className="modal__delete-btn">
                Delete
              </button>
            </span>
          </span>
        </div>
        <div className="modal__modal2">
          <div className="modal__status-update">
            I thought we agreed you would be travelling Next Month?
          </div>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div>
        {this.renderUserInfo()}
        {this.renderRequestInfo()}
        {this.renderRequestDate()}
        {this.renderButtons()}
        {this.renderCommentBox()}
        {this.renderRequestAprroval()}
        {this.renderUserComments()}
      </div>
    );
  }
}

export default RequestDetailsModal;
