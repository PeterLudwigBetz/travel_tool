import toast from 'toastr';

toast.options = {
  progressBar: false,
  closeButton: true,
  preventDuplicates: true,
  positionClass: 'toast-top-center'
};

export const successMessage = message =>  toast.success(message);
export const errorMessage = message =>  toast.success(message);


