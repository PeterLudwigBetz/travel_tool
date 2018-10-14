import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import PageHeader from '../PageHeader';
import '../RolePanelHeader/RolePanelHeader.scss';

class ChecklistPanelHeader extends PureComponent {
  render() {
    const { openModal } = this.props;
    return (
      <div className="role-panel-header">
        <PageHeader
          title="TRAVEL CHECKLIST"
          actionBtn="Add Item"
          openModal={openModal}
        />
      </div>
    );
  }
}

ChecklistPanelHeader.propTypes = {
  openModal: PropTypes.func.isRequired
};

export default ChecklistPanelHeader;
