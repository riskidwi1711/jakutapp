import Swal from "sweetalert2";

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
  })

  export default Toast;