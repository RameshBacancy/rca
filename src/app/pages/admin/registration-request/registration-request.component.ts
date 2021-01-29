import { SortByPipe } from './../../../shared/pipe/sortBy.pipe';
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

  data: any[] = []; // list of supplier
  filterData: any[] = []; // filter list of supplier
  isdata = false; // for hide show loader and content
  closeResult: string;
  viewData: any;
  status: { text: string, value: string }[];
  page = 1; // pagination
  statusString: string;

  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    private ref: ChangeDetectorRef,
    private spinner: SpinnerService,
    private sortByPipe: SortByPipe
  ) { }

  ngOnInit(): void {
    this.status = [
      { text: 'All', value: 'all' },
      { text: 'Approved', value: 'approved' },
      { text: 'Pending', value: 'pending' },
      { text: 'Rejected', value: 'reject' }
    ];

    this.userData();
  }

  // for status approve
  approve(id) {
    this.spinner.openSpinner();
    this.userService.approveReject(id, 'approved');
  }

  // for status reject
  reject(id) {
    this.spinner.openSpinner();
    this.userService.approveReject(id, 'reject');
  }

  // call for supplier list spi
  userData() {
    this.userService.getrequests().subscribe(d => {
      this.data = d.data.filter(m => {
        if (m.register_status === 'finish') {
          return m;
        }
      }, () => {
        this.filterSupplier('all');
        this.isdata = true;
        this.ref.detectChanges();
  
      });
      this.data = this.sortByPipe.transform(this.data, 'desc', 'sort_index');
      if (this.data.length > 0) {
        this.filterSupplier('all');
        this.isdata = true;
        this.ref.detectChanges();
      }
    });
  }

  // modal popup open function
  open(content, d) {
    this.viewData = d;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  // close (cross) button in model popup
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  // Filter supplier like approved, pending etc
  public filterSupplier(statusType: string): void {
    this.statusString = statusType;
    if (statusType === 'all') {
      this.filterData = [...this.data];
    } else {
      this.filterData = this.data.filter(res => res.status === statusType);
    }
    this.page = 1;
  }

}
