import { SpinnerService } from 'src/app/services/spinner.service';
import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit, AfterViewInit {
  @Output() submitOtp = new EventEmitter<boolean>();
  otp: string;
  showOtpComponent = true;
  loading = false;
  @ViewChild('ngOtpInput') ngOtpInput: any;
  config = {
    allowNumbersOnly: true,
    length: 5,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '50px',
      'height': '50px'
    }
  };
  isVerifyBtnDisable = true;

  ngOnInit() {
    this.isVerifyBtnDisable = false;
  }
  constructor(private spinnerService: SpinnerService) { }
  ngAfterViewInit() {
    this.setVal('12345');
  }

  onOtpChange(otp) {
    this.otp = otp;
    this.isVerifyBtnDisable = this.otp.length === 5 ? false : true;
  }

  setVal(val) {
    this.ngOtpInput.setValue(val);
    this.isVerifyBtnDisable = val.length === 5 ? false : true;
  }

  toggleDisable() {
    if (this.ngOtpInput.otpForm) {
      if (this.ngOtpInput.otpForm.disabled) {
        this.ngOtpInput.otpForm.enable();
      } else {
        this.ngOtpInput.otpForm.disable();
      }
    }
  }

  onConfigChange() {
    this.showOtpComponent = false;
    this.otp = null;
    setTimeout(() => {
      this.showOtpComponent = true;
    }, 0);
  }

  onVerify() {
    if (this.otp.length === 5) {
      this.loading = true;
      setTimeout(() => {
        this.submitOtp.emit(true);
        this.loading = false;
      }, 2000);
    }
  }

}
