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
  isdata: boolean = false;
  closeResult: string;
  viewData: any;

  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    private ref: ChangeDetectorRef,
    private spinner: SpinnerService
  ) { }

  ngOnInit(): void {
    this.userData();
  }

  approve(id){
    console.log('approved '+ id);
    this.userService.approveReject(id,'approved').subscribe(d => { });
    this.userData();
  }

  reject(id){
    console.log('rejected '+ id);
    this.userService.approveReject(id,'reject').subscribe(d => { });
    this.userData();
  }

  userData(){
    this.data = [];
    this.userService.getrequests().subscribe(d => {
      d.data.filter( m => {
        if(m.register_status == 'finish'){
        this.data.push(m);
        this.ref.detectChanges();
        }
      });
    })
    if(this.data != []){
      this.isdata = true;
    } else {
      this.isdata = false;
    }
  }
  open(content, d) {

    this.viewData = d;
    console.log(this.viewData);

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
