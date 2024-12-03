import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastMessage } from '../interfaces/toast-message';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
@Injectable({
    providedIn: 'root'
})
export class ToasterService {

    private toasts: BehaviorSubject<ToastMessage[]> = new BehaviorSubject<ToastMessage[]>([]);
    private counter = 0;

    horizontalPosition: MatSnackBarHorizontalPosition = 'start';
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';
    // Default configuration
    private defaultConfig = {
        success: { duration: 3000 },
        error: { duration: 5000 },
        warning: { duration: 4000 },
        info: { duration: 3000 }
    };

    constructor(private snackBar: MatSnackBar) { }

    // Success toast
    success(message: string, action: string = 'Close', duration: number = 3000) {
        this.snackBar.open(message, action, {
            duration: duration,
            panelClass: ['success-toast']
        });
    }

    // Error toast
    error(message: string, action: string = 'Close', duration: number = 5000) {
        this.snackBar.open(message, action, {
            duration: duration,
            panelClass: ['error-toast']
        });
    }

    // Warning toast
    warning(message: string, action: string = 'Close', duration: number = 4000) {
        this.snackBar.open(message, action, {
            duration: duration,
            panelClass: ['warning-toast']
        });
    }

    // Info toast
    info(message: string, action: string = 'Close', duration: number = 3000) {
        this.snackBar.open(message, action, {
            duration: duration,
            panelClass: ['info-toast']
        });
    }

    // Custom toast with more configuration options
    custom(message: string, config: {
        action?: string,
        duration?: number,
        type?: 'success' | 'error' | 'warning' | 'info'
    } = {}) {
        const {
            action = 'Close',
            duration = 3000,
            type = 'info'
        } = config;

        const panelClass = [`${type}-toast`];

        this.snackBar.open(message, action, {
            duration: duration,
            panelClass: panelClass
        });
    }
}
