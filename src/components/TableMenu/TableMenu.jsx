import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import editIcon from '../../images/edit.svg';
import cancelIcon from '../../images/cancel.svg';

class TableMenu extends PureComponent {
  state = {
    menuOpen: false,
  };

  toggleMenu = () => {
    const { menuOpen } = this.state;
    this.setState({
      menuOpen: !menuOpen
    });
  }

  render() {
    const { menuOpen } = this.state;
    const { editRequest, request  } = this.props;
    return (
      <div className="menu__container">
        <div>
          <i
            className="fa fa-ellipsis-v"
            role="presentation"
            onClick={() => this.toggleMenu()}
          />
          <div className={`table__menu-container ${menuOpen? 'open' : ''}`}>
            <ul className="table__menu-list">
              <li
                className="table__menu-list-item"
                onClick={() => editRequest(request)}
                role="presentation"
              >
                <img src={editIcon} alt="edit-icon" className="menu-icon" />
                Edit
              </li>
              <li
                className="table__menu-list-item"
                onClick={() => this.toggleMenu()}
                role="presentation"
              >
                <img src={cancelIcon} alt="cancel-icon" className="menu-icon" />
                Cancel
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default TableMenu;
