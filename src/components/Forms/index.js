// a registry of the applications forms

import NewRequestForm from './NewRequestForm/NewRequestForm';
import NewUserRoleForm from './NewUserRoleForm/NewUserRoleForm';
import NewAccommodationForm from './NewAccommodationForm/NewAccommodation';
import ProfileForm from './ProfileForm/index';
import NewChecklistForm from './NewChecklistForm';

import './index.scss';


export { NewRequestForm, NewUserRoleForm, ProfileForm, NewAccommodationForm, NewChecklistForm };


export default null; // FIX: Remove this once another form is available to export in named exports as above
