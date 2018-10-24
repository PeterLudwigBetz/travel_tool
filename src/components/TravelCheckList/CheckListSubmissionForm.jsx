import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import countryUtils from '../../helper/countryUtils';
import './travelSubmission.scss';
import { fetchSubmission  } from '../../redux/actionCreator/checkListSubmissionActions';
import SubmissionFormSets from './SubmissionFormSets';

class CheckListSubmissionForm extends Component {

  renderCheckListITems = (checklist) => {
    const { trips, fetchSubmission, requestData } = this.props;
    const data = {
      requestId: requestData.id,
    };
    fetchSubmission(data);
    return (
      <div>
        <div className="travelCheckList--item__list-items">
          {
            checklist.length > 0 &&
            checklist.map((item) => {
              const { resources, } = item;
              let { label, } = resources[0];
              label = label?`(${label})`:'';
              return (
                <SubmissionFormSets
                  trips={trips}
                  handleSubmit={this.handleSubmit}
                  handleDownLoad={this.handleDownLoad}
                  handleUpload={this.handleUpload}
                  item={item} key={item.id} />
              );}
            )
          }
        </div>
      </div>
    );
  }
  renderDestinations (destination, index) {
    const countryFlagUrl = countryUtils.getCountryFlagUrl(destination.destination);
    return (
      <div key={index}>
        <div className="travelCheckList__destination">
          <div className="travelCheckList__destination-name">
            <div className="travelCheckList__destination-flag" alt="country flag" style={{ backgroundImage: `url(${countryFlagUrl})` }} />
            {destination.destination}
          </div>
          {this.renderCheckListITems(destination.checklist)}
        </div>
      </div>);
  }

  renderSubmissionForm = () => {
    const { checklistsData } = this.props;
    return (
      <div>{checklistsData[0].map((destination, index) => this.renderDestinations(destination, index))}</div>

    );
  }

  render() {
    return (
      <div>
        {this.renderSubmissionForm()}
      </div>
    );
  }
}

CheckListSubmissionForm.propTypes = {
  checklistsData: PropTypes.array.isRequired,
  trips: PropTypes.array.isRequired,
  fetchSubmission: PropTypes.func.isRequired,
  requestData: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, { fetchSubmission })(CheckListSubmissionForm);
