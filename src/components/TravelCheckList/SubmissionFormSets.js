import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import uploadIcon from '../../images/uploadIcon.svg';
import check from '../../images/check.svg';
import saveIcon from '../../images/saveIcon.svg';
import { fetchSubmission, downloadSubmission } from '../../redux/actionCreator/checkListSubmissionActions';

class SubmissionFormSets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadSuccess: null,
      uploadPresent: false,
    };}

  componentWillReceiveProps(someProps){
    const { submissionInfo, item } = someProps;
    const { postSuccess } = submissionInfo;
    if(submissionInfo.submissions.length > 0){
      const submission = this.findSubmission(submissionInfo.submissions, item);
      if(submission){
        this.setState({uploadPresent:true});
      }
    }
    if(postSuccess !== ''){
      setTimeout(()=>{this.setState({uploadSuccess: null});}, 2000);
    }
  }

  handleChange = (e) => {
    e.preventDefault();
    const { handleSubmit, item, submissionInfo, } = this.props;
    const tripId = submissionInfo.submissions[0].tripId;
    this.setState({[e.target.name]: e.target.value});
    const listOf = ['airline', 'arrivalTime', 'ticket' ];
    let objState = this.state;
    let newL = Object.keys(objState);
    let count=0;
    listOf.forEach(
      item=>{
        if(newL.includes(item)){
          count++;
        }
      }
    );
    if(count===3){
      const { airline, ticket, arrivalTime } = this.state;
      const data = {
        'airline': airline,
        'flightNumber': ticket,
        'arrivalTime': arrivalTime
      };
      const formData = {
        file: null,
        submissionId:null,
        tripId,
        isUpload: false,
        data,
        label: 'AirTicket'
      };
      const finalData = {
        formData,
        checklistId: item.id
      };
      setTimeout(()=>{ handleSubmit(finalData);}, 10000);
    }else{count=0;}
    
  }

  handleDownLoad = (e) =>{
    const { submissionInfo, item } = this.props;
    const submission = this.findSubmission(submissionInfo.submissions, item);
    const value = JSON.parse(submission.value);
    //   pick secure url from values and send get request
    downloadSubmission(value);
  }

  handleUpload=(e)=>{
    e.preventDefault();
    const { handleSubmit, item, submissionInfo } = this.props;
    const tripId = submissionInfo.submissions[0].tripId;
    const fileName = e.target.files[0].name;
    const file = new FileReader();
    this.setState({uploadSuccess:'start'});
    file.readAsDataURL(e.target.files[0]);
    file.onload = function (e) {
      const formData = {
        file: e.target.result,
        submissionId:null,
        tripId,
        isUpload: true,
        data:null,
        fileName,
        label: 'AirTicket'
      };
      const data = {
        formData,
        checklistId: item.id
      };
      handleSubmit(data);
    };
  }

  findSubmission = (submissions, item) => {
    let finalSubmission;
    if(submissions!==''){
      submissions.forEach(
        submission=>{
          const itemId=item.id;
          const checklistId=submission.checklistItemId;
          if(itemId===checklistId){
            finalSubmission=submission;
          }
        }
      );}
    return finalSubmission;
  }

  renderTicketFieldset = () => {
    const { item, } = this.props;
    const { id } = item;
    return (
      <form className="ticket-submission" onSubmit={this.handleSubmit}>
        <div className="travel-details">
          <div className="airline-name">
            <label htmlFor={id}>
              <span id="label">Airline</span>
              <input id="airline-name" type="text" onChange={this.handleChange} name="airline" placeholder="  e.g Kenya Airways" />
            </label>
          </div>
          <div className="airline-name">
            <label htmlFor={id}>
              <span id="label">Ticket Number</span>
              <input id="airline-name" type="text" onChange={this.handleChange} name="ticket" placeholder="  e.g KG 435K" />
            </label>
          </div>
          <div className="airline-name">
            <label htmlFor={id}>
              <span id="label">Arrival Time</span>
              <input id="airline-name" type="time" onChange={this.handleChange} name="arrivalTime" />
            </label>
          </div>
        </div>
      </form>
    );
  }
  renderUploadField = () => {
    const { uploadSuccess } = this.state;
    return(
      <div>
        <div className="travelCheckList--input__input-field">
          <div role="presentation" className="travelCheckList--input__btn">
            <img src={uploadIcon} alt="upload_icon" className="travelCheckList--input__image" />
            <span id="file-upload" role="presentation">Upload file</span>
          </div>
          <input type="file" name="file" onChange={this.handleUpload} />
          { uploadSuccess==='done'? (<div id="progress-bar__success">Done</div>):
            uploadSuccess==='start'?(<div id="progress-bar">Uploading file...</div>):null}
        </div>
      </div>
    );
  }
  renderDownloadField = () => {
    const { submissionInfo, item } = this.props;
    const submission = this.findSubmission(submissionInfo.submissions, item);
    const value = JSON.parse(submission.value);
    const fileName = value.fileName;
    return(
      <div className="travelCheckList--input__download-field">
        <div role="presentation" className="travelCheckList--input__upload">
          <span id="file-name" role="presentation">{fileName||'ticket information submitted'}</span>
          <img src={saveIcon} alt="save_icon" className="travelCheckList--input__image" />
          <img src={check} alt="check_icon" className="travelCheckList--input__check-image" />
          <input id="download-file" type="button" name="button" onClick={this.handleDownLoad} />
        </div>
      </div>                 
    );
  }

  renderField = () => {
    const { item } = this.props;
    const { uploadPresent } = this.state;
    return (
      uploadPresent?this.renderDownloadField():
        !item.requiresFiles && this.renderTicketFieldset()||this.renderUploadField());

  }
  render(){
    const { item } = this.props;
    const { resources, name } = item;
    let { label } = resources[0];
    label = label?`(${label})`:'';
    return (
      <div key={item.id}>
        <div className="travelCheckList--item__item">
          <div className="travelCheckList--item__input-label">
            <label htmlFor={name}>
              <span className="travelCheckList--item__visa-application">{name}</span>
              {
                resources.length > 0 && resources.map(resource => (
                  <a
                    key={item.id}
                    href={resource.link}
                    className="travelCheckList--item__visa-application-gu"
                  >
                    {resource.label?`(${resource.label})`:''}
                  </a>
                ))
              }
            </label>
          </div>
          <br />
          {this.renderField()}
        </div>
      </div>
    );
  }
}

SubmissionFormSets.propTypes = {
  item: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submissionInfo: PropTypes.object.isRequired,
};

const mapStateToProps = ({ submissions, successStatus })=> ({
  submissionInfo: submissions,
  successStatus
});

export default connect(mapStateToProps, { fetchSubmission })(SubmissionFormSets);
