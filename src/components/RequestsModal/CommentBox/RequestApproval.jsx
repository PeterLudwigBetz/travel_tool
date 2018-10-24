
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ImageLink from '../../image-link/ImageLink';

class RequestApproval extends Component {
  render() {
    const { requestData } = this.props;
    const { status } = requestData;
    return (
      <div className="modal__modal1">
        <span className="modal__mdl-icons">
          <ImageLink
            imageSrc={requestData && requestData.approverImage}
            altText="avatar"
            imageClass="modal__oval-copy" />
          <span className="modal__user-name">
            {requestData && requestData.approver}
          </span>
          <span className="modal__approval-status">
            {`${status && status.toLowerCase()} your travel request.`}
          </span>
          <span className="modal__hours-status">
            {requestData &&
              moment(requestData.approvedTime, 'YYYYMMDD').fromNow()}
          </span>
        </span>
      </div>
    );
  }
}

RequestApproval.propTypes = {
  requestData: PropTypes.object
};

RequestApproval.defaultProps = {
  requestData: {}
};

export default RequestApproval;
