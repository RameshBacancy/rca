import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registration-request',
  templateUrl: './registration-request.component.html',
  styleUrls: ['./registration-request.component.scss']
})
export class RegistrationRequestComponent implements OnInit {

  data: any[] = [];
  isdata: boolean = true;
  closeResult: string;
  viewData: any;

  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    private ref: ChangeDetectorRef,
    private spinner: SpinnerService
  ) { }

  ngOnInit(): void {
    // this.spinner.openSpinner();
    this.userData();
  }

  approve(id){
    this.spinner.openSpinner();
    this.userService.approveReject(id,'approved')
  }

  reject(id){
    this.spinner.openSpinner();
    this.userService.approveReject(id,'reject')
  }

  userData(){
    this.data = [];
    this.data = this.userService.getrequests();
    // issue here
    // this.ref.detectChanges();

  }
  open(content, d) {

    this.viewData = d;
    // console.log(this.viewData);

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

      this.closeResult = `Closed with: ${result}`;

    }, (reason) => {

      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
