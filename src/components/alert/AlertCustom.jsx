import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Alert = {
  success: (title, text) => {
    MySwal.fire({
      title: title || 'Success',
      text: text || 'Operation completed successfully!',
      icon: 'success',
      confirmButtonText: 'OK',
    });
  },

  error: (title, text) => {
    MySwal.fire({
      title: title || 'Error',
      text: text || 'Something went wrong!',
      icon: 'error',
      confirmButtonText: 'OK',
    });
  },

  confirmDelete: (callback) => {
    MySwal.fire({
      title: 'Are you sure?',
      text: 'This action will permanently delete the item.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        callback();
        Alert.success('Deleted', 'The item has been deleted.');
      }
    });
  },

  confirmEdit: (callback) => {
    MySwal.fire({
      title: 'Edit Item',
      text: 'Are you sure you want to edit this item?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, edit it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        callback();
        Alert.success('Edited', 'The item has been edited successfully.');
      }
    });
  },
};

export default Alert;
