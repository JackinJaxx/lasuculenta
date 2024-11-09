// Alert.js
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

  // Puedes agregar más tipos de alertas si es necesario
};

export default Alert;
