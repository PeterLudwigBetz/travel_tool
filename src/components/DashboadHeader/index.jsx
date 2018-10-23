import React, { PureComponent,  Fragment } from 'react';
import './_header.scss';
import { Input } from '../Forms/FormsAPI';
import activeLocation from '../../images/icons/location_active.svg';
import activeCalendar from '../../images/icons/calendar_active.svg';
import download from '../../images/icons/download.svg';

class DashboardHeader extends PureComponent {
  renderButton = (src, text) => (
    <button type="button" className="action-btn">
      <Fragment>
        {text}
        <img src={src} alt={text} />
      </Fragment>
    </button>
  );

  render() {
    return (
      <div className="DashboardHeader">
        <h2 className="title">Dashboard</h2>
        <div className="actions">
          {this.renderButton(activeLocation, 'Lagos')}
          {this.renderButton(activeCalendar, 'This Week')}
          {this.renderButton(download)}
        </div>
      </div>
    );
  }
}

export default DashboardHeader;
