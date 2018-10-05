import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import PageHeader from '../PageHeader';
import './AccommodationPanelHeader.scss';

class GuestHouseHeader extends PureComponent {
  render() {
    const { openModal } = this.props;
    return (
      <div className="role-panel-header">
        <PageHeader
          actionBtn="Edit Guest House"
          openModal={openModal}
        />
      </div>
    );
  }
}

GuestHouseHeader.propTypes = {
  openModal: PropTypes.func.isRequired
};

export default GuestHouseHeader;
