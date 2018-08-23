import React, { Component, Fragment } from 'react';
import Oval from '../../images/Oval.png';
import Oval2 from '../../images/Oval2.png';
import CommentBox from './CommentBox/CommentBox';
import ImageLink from '../image-link/ImageLink';
import UserAvatar from './UserAvatar';
import TravelLink from './TravelLink';
import './RequestsModal.scss';

class RequestDetailsModal extends Component {
  state = {
    approveColor: '',
    rejectColor: '',
    approveTextColor: '',
    rejectTextColor: ''
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

  renderUserInfo() {
    return (
      <div>
        <div className="modal__user-info">
          <ImageLink
            imageSrc={Oval}
            altText="avatar"
            imageClass="modal__oval"
          />
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

  renderTravelInfo() {
    return (
      <div className="modal__travel-place">
        <span className="modal__dialog1">
          Request to travel to:
          <span className="modal__city-name">
          Nairobi
          </span>
        </span>
        <span className="modal__dialog-from">
          From:
          <span className="modal__city-name">
          Lagos
          </span>
        </span>
      </div>
    );
  }

  renderRequestInfo() {
    return (
      <div className="modal__modal-date">
        <TravelLink 
          divClass="modal__travel-date" innerClass="modal__travel-dates" 
          dynamicText="Date submitted" nextClass="modal__date-text" dynamicDate="02 Aug 2018" />
        <TravelLink 
          divClass="modal__travel-date" innerClass="modal__travel-dates" 
          dynamicText="Date submitted" nextClass="modal__date-text" dynamicDate="02 Aug 2018" />

        <TravelLink 
          divClass="modal__travel-date" innerClass="modal__travel-dates" 
          dynamicText="Date submitted" nextClass="modal__date-text" dynamicDate="02 Aug 2018" />
      </div>
    );
  }

  renderButtons() {
    const { approveColor, rejectColor, approveTextColor, rejectTextColor } = this.state;
    return (
      <div>
        <div className="modal__button-below">
          <span className="modal__dialog-btn">
            <button
              style={{backgroundColor: `${approveColor}`,color: `${approveTextColor}`}}
              onClick={this.handleApprove} className="modal__button-submitted-text bg" id="buttonId" type="button">
              Approve
            </button>
          </span>
          <span className="modal__dialog-btn">
            <button
              style={{backgroundColor: `${rejectColor}`, color: `${rejectTextColor}`}}
              onClick={this.handleReject} className="modal__button-rejected-text bgg" id="buttonIdd" type="button">
              Reject
            </button>
          </span>
        </div>
      </div>
    );
  }

  renderAddComment() {
    return (
      <div>
        <div className="modal__modal1">
          <UserAvatar 
            imageSrc={Oval2} altText="avatar" imageClass="modal__oval-copy" 
            spanClass="modal__mdl-icons" spanTextClass="modal__add-comment" dynamicText="Add a comment" />
        </div>
      </div>
    );
  }

  renderRequestAprroval() {
    return (
      <div className="modal__modal1">
        <span className="modal__mdl-icons">
          <ImageLink
            imageSrc={Oval2}
            altText="avatar"
            imageClass="modal__oval-copy" />
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
      <div className="modal__modal1">
        <hr />
        <div className="modal__mdl-icons">
          <ImageLink imageSrc={Oval2} altText="avatar" imageClass="modal__oval-copy" />
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
          <div className="modal__modal2">
            <div className="modal__status-update">
              I thought we agreed you would be travelling Next Month?
            </div>
          </div>
        </div>
      </div>
    );
  }
  render() {
    return (
      <Fragment>
        {this.renderUserInfo()}
        {this.renderTravelInfo()}
        {this.renderRequestInfo()}
        {this.renderButtons()}
        {this.renderAddComment()}
        <CommentBox />
        {this.renderRequestAprroval()}
        {this.renderUserComments()}
      </Fragment>
    );
  }
}

export default RequestDetailsModal;
