import { ErrorHandler, inject, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from 'ui-kit';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    private toastService = inject(ToastService);

    handleError(error: any): void {
        console.error('Global Error Handler:');

        if (error instanceof HttpErrorResponse) {
            console.error('Backend returned status code:', error.status);
            console.error('Response body:', error.error);

            switch (error.status) {
                case 400:
                    this.toastService.emitToast("Error", "Se ha presntado un error en la solicitud!", "error", true);
                    break;
                case 404:
                    this.toastService.emitToast("Error", "No se ha encontrado el recurso!", "error", true);
                    break;
                case 500:
                    this.toastService.emitToast("Error", "Se ha producido un error en el servidor!", "error", true);
                    break;
                default:
                    this.toastService.emitToast("Error", "Ha ocurrido un error inesperado!", "error", true);
                    break;
            }

        } else {
            console.error('An unexpected error occurred:', error.message);
            this.toastService.emitToast("Error", "Ha ocurrido un error inesperado!", "error", true);
        }

    }
}