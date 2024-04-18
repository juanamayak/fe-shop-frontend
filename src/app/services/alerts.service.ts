import {Injectable} from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class AlertsService {
    constructor() {
    }

    successAlert(message: any) {
        Swal.fire({
            title: '¡Proceso exitoso!',
            text: message,
            icon: 'success',
            confirmButtonText: 'Finalizar',
            allowOutsideClick: false,
            customClass: {
                confirmButton: 'text-white bg-green-600 rounded-lg px-3 py-2 text-center mr-2',
            },
            buttonsStyling: false,
            timer: 2500,
            heightAuto: false
        });
    }

    errorAlert(messages: any) {
        let msg;
        messages.forEach((m: any) => {
            msg = m.message;
        });

        Swal.fire({
            title: 'Ups, algo salio mal',
            text: msg,
            icon: 'error',
            confirmButtonText: 'Ok',
            allowOutsideClick: false,
            customClass: {
                confirmButton: 'text-white bg-red-500 rounded-lg px-3 py-2 text-center',
            },
            buttonsStyling: false,
            heightAuto: false
        });
    }

    confirmRequest() {
        Swal.fire({
            title: 'Are you sure to continue with the process?',
            text: "This action cannot be reversed",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Continue',
            cancelButtonText: 'Cancel',
            allowOutsideClick: false,
            customClass: {
                confirmButton: 'text-white bg-green-600 rounded-lg px-3 py-2 text-center mr-2',
                cancelButton: 'text-white bg-red-500 rounded-lg px-3 py-2 text-center'
            },
            buttonsStyling: false
        });
    }

    confirmDelete(message: any) {
        const confirmation = Swal.fire({
            title: message,
            text: "Esta acción no se puede revertir",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancel',
            allowOutsideClick: false,
            customClass: {
                confirmButton: 'text-white bg-red-700 rounded-lg px-3 py-2 text-center mr-2',
                cancelButton: 'text-white bg-slate-400 rounded-lg px-3 py-2 text-center'
            },
            buttonsStyling: false,
            heightAuto: false
        });

        return confirmation;
    }
}
