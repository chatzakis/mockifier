import { NgClass } from '@angular/common';
import { Component, ElementRef, input } from '@angular/core';

type AlertType = 'success' | 'info' | 'warning' | 'danger' | 'primary' | 'secondary' | 'custom';

interface AlertSettings{
  type?: AlertType,
  positionX?: 'left' | 'center' | 'right',
  positionY?: 'top' | 'center' | 'bottom',
  duration?: number
}

// Usage:
// <app-alert #notification [options]="{type: 'success', positionX: 'center', positionY: 'top', duration: 2}">
//    This is a very very important message!!!
// </app-alert>

@Component({
  selector: 'app-alert',
  imports: [NgClass],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {
    DEFAULT_DURATION = 5;
    options: AlertSettings;
    show = false;
    hide = false;
    closeTimeout:any;
    text = '';

    showNotification(text: string, options?: AlertSettings){
      this.text = text;
      this.options = {
        type: options?.type || 'primary',
        positionX: this.options?.positionX || 'right',
        positionY: this.options?.positionY || 'top' ,
        duration: options?.duration
      }

      this.hide = false;
      this.show = true;
      this.closeTimeout = setTimeout(()=>{
        this.onClose();        
      }, (this.options?.duration || this.DEFAULT_DURATION) * 1000)
      return 0;
    }

    onClose(){
      this.hide = true;
      setTimeout(()=>{
        this.show = false;
      }, 300)
      clearTimeout(this.closeTimeout);
    }

    getAlertType(){
      return {
        'show': this.show,
        'hide': this.hide,
        'alert-primary': this.options?.type === 'primary' || this.options?.type === undefined,
        'alert-secondary': this.options?.type === 'secondary',
        'alert-success': this.options?.type === 'success',
        'alert-info': this.options?.type === 'info',
        'alert-warning': this.options?.type === 'warning',
        'alert-danger': this.options?.type === 'danger',
        'alert-custom': this.options?.type === 'custom',
        'left': this.options?.positionX === 'left',
        'centerX': this.options?.positionX === 'center',
        'right': this.options?.positionX === 'right',
        'top': this.options?.positionY === 'top',
        'centerY': this.options?.positionY === 'center',
        'bottom': this.options?.positionY === 'bottom'
      }
    }

  getIcon(){
    return {
      'fa-circle-info': this.options?.type === 'primary' 
        || this.options?.type === 'secondary' 
        || this.options?.type === 'info' 
        || this.options?.type === undefined,
      'fa-circle-check': this.options?.type === 'success',
      'fa-circle-exclamation': this.options?.type === 'warning',
      'fa-circle-xmark': this.options?.type === 'danger',
    }
  }
}
