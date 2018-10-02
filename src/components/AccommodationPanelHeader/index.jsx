import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import PageHeader from '../PageHeader';
import './AccommodationPanelHeader.scss';

class AccommodationPanelHeader extends PureComponent {
  render() {
    const { openModal } = this.props;
    return (
      <div className="role-panel-header">
        <PageHeader
          title="ACCOMMODATION"
          actionBtn="Add Guest House"
          openModal={openModal}
        />
      </div>
    );
  }
}

AccommodationPanelHeader.propTypes = {
  openModal: PropTypes.func.isRequired
};

export default AccommodationPanelHeader;
