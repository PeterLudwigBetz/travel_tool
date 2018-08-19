import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';
import './RequestsModal.scss';
import '../nav-bar/NavBar.scss';

class UserAvatar extends PureComponent {
  render() {
    const { imageSrc, altText, imageClass, spanClass, spanTextClass, dynamicText } = this.props;
    return (
      <span className={spanClass}>
        <img src={imageSrc} alt={altText} className={imageClass} />
        <span className={spanTextClass}>
          {dynamicText}
        </span>
      </span>
    );
  }
}

UserAvatar.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
  imageClass: PropTypes.string.isRequired,
  spanClass: PropTypes.string.isRequired,
  spanTextClass:PropTypes.string.isRequired,
  dynamicText:PropTypes.string.isRequired
};

export default UserAvatar;
