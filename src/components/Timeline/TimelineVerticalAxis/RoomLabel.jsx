import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import MaintainceForm from '../../Forms/MaintainanceForm';
import tick from '../../../images/Tick/tick.svg';



class RoomLabel extends PureComponent {
  state = {
    showMarkUnavailable: false
  };

  toggleMarkUnavailable = () => {
    this.setState(prevState => ({
      showMarkUnavailable: !prevState.showMarkUnavailable
    }));
  }


  showId = (id, status) =>{
    const {updateRoomState, timelineDateRange, guestHouseId, handleMaintainence} = this.props;
    // const [startDateString, endDateString] = timelineDateRange;
    // let data;
    // if (status == true){
    //   data = { fault: false };
    //   updateRoomState(data, id, startDateString, endDateString, guestHouseId);
    // }
    // else{
    //   data = { fault: true };
    //   updateRoomState(data, id, startDateString, endDateString, guestHouseId);
    // }
  }

  renderMainteinanceForm(){
    return(
      <MaintainceForm />
    );
  }

  render() {
    const {showMarkUnavailable} = this.state;
    const {name, id, status, handleMaintainence} = this.props;
    const visibility = showMarkUnavailable ? 'is-visible' : 'is-hidden';
    return (
      <div className="room-name item-row">
        <div>{name}</div>
        <div
          className="ellipsis"
          tabIndex="0"
          role="button"
          onFocus={this.toggleMarkUnavailable}
          onBlur={this.toggleMarkUnavailable}
        >
          &hellip;
          <div className={`mark-unavailable ${visibility}`}>

            {status ? (
              <div
                role="button"
                tabIndex="0"
                className="container_room_fault"
                onClick={()=>{this.showId(id, status);}}
                onKeyDown={() => {this.showId(id, status);}}
              />
            ): (
              <div
                className="container_room_fine"
                role="button"
                tabIndex="0"
                onClick={()=>{this.showId(id, status);}}
                onKeyDown={() => {this.showId(id, status);}}
              />
            )}
            <span>Unavailable</span>
          </div>
        </div>
      </div>
    );
  }
}

RoomLabel.propTypes = {
  updateRoomState: PropTypes.func.isRequired,
  timelineDateRange: PropTypes.array.isRequired,
  guestHouseId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default RoomLabel;
