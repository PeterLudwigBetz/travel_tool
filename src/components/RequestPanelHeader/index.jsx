import React, { PureComponent } from 'react';
import Header from '../Header';
import ButtonGroup from '../ButtonGroup';
import HeaderPagination from '../Pagination/HeaderPagination';
import './Request.scss';

class RequestPanelHeader extends PureComponent {
  render() {
    return (
      <div className="request-panel-header">
        <Header />
        <div className="open-requests">
          <ButtonGroup />
          <HeaderPagination />
        </div>
      </div>
    );
  }
}

export default RequestPanelHeader;
