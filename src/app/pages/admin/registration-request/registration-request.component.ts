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
  filterData: any[] = [];
  isdata = false;
  closeResult: string;
  viewData: any;
  status: { text: string, value: string }[];
  page = 1;
  statusString: string;

  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    private ref: ChangeDetectorRef,
    private spinner: SpinnerService
  ) { }

  ngOnInit(): void {
    this.status = [
      { text: 'Approved', value: 'approved' },
      { text: 'Pending', value: 'pending' },
      { text: 'Rejected', value: 'reject' }
    ];

    this.userData();
  }

  approve(id) {
    this.spinner.openSpinner();
    this.userService.approveReject(id, 'approved');
  }

  reject(id) {
    this.spinner.openSpinner();
    this.userService.approveReject(id, 'reject');
  }

  userData() {
    this.userService.getrequests().subscribe(d => {
      this.data = d.data.filter(m => {
        if (m.register_status === 'finish') {
          return m;
        }
      });
      if (this.data.length > 0) {
        this.filterSupplier('approved');
        this.isdata = true;
        this.ref.detectChanges();
      }
    });
  }
  open(content, d) {

    this.viewData = d;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {

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
      return `with: ${reason}`;
    }
  }

  public filterSupplier(statusType: string): void {
    this.statusString = statusType;
    this.filterData = this.data.filter(res => res.status === statusType);
    this.page = 1;
  }

}
