import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidateService } from 'src/app/services/candidate.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { OrgadminDashboardService } from 'src/app/services/orgadmin-dashboard.service';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { formatDate } from '@angular/common';
import { number, string } from '@amcharts/amcharts4/core';

@Component({
  selector: 'app-admin-c-report-approval',
  templateUrl: './admin-c-report-approval.component.html',
  styleUrls: ['./admin-c-report-approval.component.scss'],
})
export class AdminCReportApprovalComponent implements OnInit {
  pageTitle = 'Pending Approval';
  candidateCode: any;
  candidateName: any;
  candidateId: any;
  candidateAddressData: any = [];
  candidateEduData: any = [];
  candidateEXPData: any = [];
  cApplicationFormDetails: any = [];
  getColors: any = [];
  panNumber: any;
  candidateUan: any;
  qualification: any;
  getEducationqualificationName: any;
  getAddressRemarkType: any = [];
  getEmploymentRemarkType: any = [];
  getEducationRemarkType: any = [];
  getEducationDegree: any = [];
  QualificationList: any = [];
  closeModal: string | undefined;
  education: any;
  employment: any;
  address: any;
  candidateResume: any;
  isFresher: any;
  transactionid: any;
  degree: any;
  uanVal: any;
  casedetails: any;
  global: any;
  employ: any = [];
  Dateofjoin: any;
  Dateofexit: any;
  pickerToDate: any;
  getMinDate: any;
  getToday: NgbDate;
  viewLogo: any;
  public CaseDetailsDoc: any = File;
  public globalCaseDoc: any = File;
  getServiceConfigCodes: any = [];
  vendorChecks: any;
  comment: any;

  public stat_NEWUPLOAD = true;

  epfoSkipped: boolean = false;
  candidateEXPData_stat: any;
  candidateITRData: any = [];

  orgScopeData: any = {};
  editClickedFor: any;

  formEditEdu = new FormGroup({
    colorId: new FormControl('', Validators.required),
    remarkId: new FormControl(''),
    customRemark: new FormControl('', Validators.required),
    // qualificationName: new FormControl('', Validators.required),
    qualificationId: new FormControl('', Validators.required),
    schoolOrCollegeName: new FormControl('', Validators.required),
    boardOrUniversityName: new FormControl('', Validators.required),
    yearOfPassing: new FormControl('', Validators.required),
    percentage: new FormControl('', Validators.required),
    id: new FormControl(''),
    candidateCode: new FormControl(''),
  });

  formAddcomment = new FormGroup({
    addComments: new FormControl('', Validators.required),
    id: new FormControl(''),
    candidateCode: new FormControl(''),
  });

  formEditEmp = new FormGroup({
    colorId: new FormControl('', Validators.required),
    remarkId: new FormControl('', Validators.required),
    id: new FormControl(''),
    // candidateCode: new FormControl(''),
  });

  formEditEXP = new FormGroup({
    organizationid: new FormControl(''),
    colorId: new FormControl('', Validators.required),
    remarkId: new FormControl(''),
    customRemark: new FormControl('', Validators.required),
    candidateEmployerName: new FormControl('', Validators.required),
    inputDateOfJoining: new FormControl(''),
    inputDateOfExit: new FormControl(''),
    candidateCode: new FormControl(''),
    id: new FormControl(''),
  });

  formEditDOC = new FormGroup({
    colorId: new FormControl(''),
    customRemark: new FormControl(''),
  });

  formEditScope = new FormGroup({
    colorId: new FormControl(''),
    customRemark: new FormControl(''),
  });

  formEditADRS = new FormGroup({
    colorId: new FormControl('', Validators.required),
    remarkId: new FormControl(''),
    customRemark: new FormControl(''),
    isAssetDeliveryAddress: new FormControl('', Validators.required),
    isPermanentAddress: new FormControl('', Validators.required),
    isPresentAddress: new FormControl('', Validators.required),
    id: new FormControl(''),
  });

  formReportApproval = new FormGroup({
    criminalVerificationColorId: new FormControl(''),
    globalDatabseCaseDetailsColorId: new FormControl(''),
  });
  orgid: string | null;
  isCommentAdded: boolean = true;
  suspectEmpCheckResponse: any;
  getAllColor: any;

  constructor(
    private candidateService: CandidateService,
    private router: ActivatedRoute,
    private modalService: NgbModal,
    private navRouter: Router,
    calendar: NgbCalendar
  ) {
    this.orgid = localStorage.getItem('orgID');
    this.candidateId = this.router.snapshot.paramMap.get('candidateId');
    this.getToday = calendar.getToday();
    this.candidateCode = this.router.snapshot.paramMap.get('candidateCode');
    // this.candidateCode='47CF5AF631QI';
    this.candidateService
      .getCandidateFormData_admin(this.candidateCode)
      .subscribe((data: any) => {
        this.cApplicationFormDetails = data.data;
        if (this.cApplicationFormDetails.organisationScope)
          this.orgScopeData = this.cApplicationFormDetails.organisationScope;
        console.log(
          this.cApplicationFormDetails,
          '------------candidate-----------'
        );
        this.candidateName =
          this.cApplicationFormDetails.candidate.candidateName;
        this.candidateId = this.cApplicationFormDetails.candidate.candidateId;
        this.degree = this.cApplicationFormDetails.candidate.degree;
        // console.log(this.candidate,"-----------------------------------------------");
        this.panNumber = this.cApplicationFormDetails.candidate.panNumber;
        this.candidateUan = this.cApplicationFormDetails.candidateUan;
        console.log(this.candidateUan, '*********************');
        this.candidateAddressData =
          this.cApplicationFormDetails.candidateCafAddressDto;
        this.candidateEduData =
          this.cApplicationFormDetails.candidateCafEducationDto;
        console.log(
          this.candidateEduData,
          '__________candidateEduData__________________'
        );
        this.candidateEXPData =
          this.cApplicationFormDetails.candidateCafExperienceDto;
        console.log(
          this.candidateEXPData,
          '.......................candidateEXPData.........................'
        );
        this.isFresher = this.cApplicationFormDetails.candidate.isFresher;
        this.candidateITRData = this.cApplicationFormDetails.itrdataFromApiDto;
        this.casedetails = this.cApplicationFormDetails.caseDetails;
        this.global = this.cApplicationFormDetails.globalDatabaseCaseDetails;
        this.employ = this.cApplicationFormDetails.vendorProofDetails;
        this.comment = this.cApplicationFormDetails.candidateAddComments;
        console.log(this.comment);
        if (this.cApplicationFormDetails.candidateResume) {
          this.candidateResume =
            'data:application/pdf;base64,' +
            this.cApplicationFormDetails.candidateResume.document;
        }

        console.log('candidateEXPData', this.candidateEXPData);

        if (this.candidateEXPData) {
          var colorArray = [];
          for (let index = 0; index < this.candidateEXPData.length; index++) {
            colorArray.push(this.candidateEXPData[index].colorColorName);
          }
          if (colorArray.includes('Red')) {
            this.candidateEXPData_stat = 'Red';
          } else if (colorArray.includes('Amber')) {
            this.candidateEXPData_stat = 'Amber';
          } else {
            this.candidateEXPData_stat = 'Green';
          }
        }

        if (this.cApplicationFormDetails.candidate.isUanSkipped == true) {
          this.epfoSkipped = true;
        } else {
          this.epfoSkipped = false;
        }

        if (this.cApplicationFormDetails.candidateAddComments?.comments) {
          this.isCommentAdded = false;
        }
      });

    this.candidateService.getColors().subscribe((data: any) => {
      if(data.data) {
        this.getAllColor = data.data;
        this.getColors = this.getAllColor.filter((temp: any) => {
          if(temp.colorName != 'Moonlighting' && temp.colorName != 'Out of Scope') {
            return temp;
          }
        });
        console.log(this.getColors, this.getAllColor);
      }
    });
    this.qualification = 'qualification';
    this.candidateService.getQualificationList().subscribe((data: any) => {
      this.QualificationList = data.data;
      // this.candidateService.getqualificationName(this.qualification).subscribe((data: any)=>{
      //   this.getEducationqualificationName=data.data;
      console.log(
        this.getEducationqualificationName,
        '*******************EducationqualificationName'
      );
    });
    this.education = 'education';
    this.candidateService
      .getremarkType(this.education)
      .subscribe((data: any) => {
        this.getEducationRemarkType = data.data;
        console.log(
          this.getEducationRemarkType,
          '*******************Education'
        );
      });
    this.employment = 'employment';
    this.candidateService
      .getremarkType(this.employment)
      .subscribe((data: any) => {
        this.getEmploymentRemarkType = data.data;
      });
    this.address = 'address';
    this.candidateService.getremarkType(this.address).subscribe((data: any) => {
      this.getAddressRemarkType = data.data;
    });
    this.candidateService
      .getServiceConfigCodes(this.candidateCode)
      .subscribe((result: any) => {
        this.getServiceConfigCodes = result.data;
        console.log(this.getServiceConfigCodes);
      });
  }

  patchAddeduValues() {
    this.formEditEdu.patchValue({
      candidateCode: this.candidateCode,
    });
  }
  fetchjoinDateSelected() {
    console.log('=================', this.getMinDate);
  }
  fetchexitDateSelected() {
    console.log('=================', this.Dateofexit);
  }

  ngOnInit(): void {}

  openOrgScopeModal(content: any, type: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (res) => {
          this.closeModal = `Closed with: ${res}`;
        },
        (res) => {
          this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
        }
      );
    console.log(content, type, this.orgScopeData);
    this.editClickedFor = type;
    if (this.orgScopeData) this.patchScopeValues();
    else this.formEditScope.reset();
  }

  openAddEducationModal(content: any) {
    this.formEditEdu.reset();
    this.patchAddeduValues();
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (res) => {
          this.closeModal = `Closed with: ${res}`;
        },
        (res) => {
          this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
        }
      );
  }

  suspectEmpCheck(){
    this.candidateService.suspectEmpCheck(this.formEditEXP.get('candidateEmployerName')?.value, this.orgid)
    .subscribe((result: any) => {
      if (result.outcome === true) {
        this.suspectEmpCheckResponse = result.data;
      }
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
  //Edit_Education_Modal///
  openEducationModal(
    modalEducation: any,
    candidateCafEducationId: any,
    qualificationId: any,
    qualificationName: any,
    schoolOrCollegeName: any,
    boardOrUniversityName: any,
    yearOfPassing: any,
    percentage: any,
    colorName: any,
    customRemark: any
  ) {
    this.modalService.open(modalEducation, {
      centered: true,
      backdrop: 'static',
    });

    let colorObj = this.getColors.find(
      (temp: any) => temp.colorCode == colorName
    );

    this.formEditEdu.patchValue({
      id: candidateCafEducationId,
      qualificationId: qualificationId,
      qualificationName: qualificationName,
      schoolOrCollegeName: schoolOrCollegeName,
      boardOrUniversityName: boardOrUniversityName,
      yearOfPassing: yearOfPassing,
      percentage: percentage,
      colorId: colorObj != null ? colorObj.colorId : null,
      customRemark: customRemark,
    });
  }

  submitEditEdu(formEditEdu: FormGroup) {
    console.log('......formedu..........', this.formEditEdu.value);
    if (this.formEditEdu.valid) {
      this.candidateService
        .updateCandidateEducationStatusAndRemark(this.formEditEdu.value)
        .subscribe((result: any) => {
          if (result.outcome === true) {
            Swal.fire({
              title: result.message,
              icon: 'success',
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          } else {
            Swal.fire({
              title: result.message,
              icon: 'warning',
            });
          }
        });
    } else {
      Swal.fire({
        title: 'Please enter the required details.',
        icon: 'warning',
      });
    }
  }

  inactiveCustEducation(id: any) {
    $(this).hide();

    Swal.fire({
      title: 'Are You Sure to Delete Education Details?',
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        this.candidateService
          .deletecandidateEducationById(id)
          .subscribe((data: any) => {
            if (data.outcome === true) {
              Swal.fire({
                title: data.message,
                icon: 'success',
              }).then((data) => {
                if (data.isConfirmed) {
                  window.location.reload();
                }
              });
            } else {
              Swal.fire({
                title: data.message,
                icon: 'warning',
              });
            }
          });
      }
    });
  }

  //Edit_Experience_Modal///

  patchAddexpValues() {
    this.formEditEXP.patchValue({
      candidateCode: this.candidateCode,
      organizationid: this.orgid,
    });
  }

  patchAdddocValues() {
    this.formEditDOC.patchValue({
      vendorChecks: this.vendorChecks,
    });
  }

  openExperienceModal(
    modalExperience: any,
    candidateCafExperienceId: any,
    candidateEmployerName: any,
    inputDateOfJoining: any,
    inputDateOfExit: any,
    colorName: any,
    customRemark: any
  ) {
    this.modalService.open(modalExperience, {
      centered: true,
      backdrop: 'static',
    });

    if (inputDateOfJoining) {
      var partsDoj = inputDateOfJoining.split('/');
      var dojDate = new Date(partsDoj[2], partsDoj[1] - 1, partsDoj[0]);
      let doj = formatDate(dojDate, 'yyyy-MM-dd', 'en-US');
      this.formEditEXP
        .get('inputDateOfJoining')
        ?.setValue(this.formatDate(doj));
    }

    if (inputDateOfExit) {
      var partsDoe = inputDateOfExit.split('/');
      var doeDate = new Date(partsDoe[2], partsDoe[1] - 1, partsDoe[0]);
      let doe = formatDate(doeDate, 'yyyy-MM-dd', 'en-US');
      this.formEditEXP.get('inputDateOfExit')?.setValue(this.formatDate(doe));
    }

    let colorObj = this.getColors.find(
      (temp: any) => temp.colorCode == colorName
    );
    this.formEditEXP.patchValue({
      id: candidateCafExperienceId,
      candidateEmployerName: candidateEmployerName,
      colorId: colorObj.colorId != null ? colorObj.colorId : false,
      customRemark: customRemark,
    });
  }

  private formatDate(date: any) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  openVendorModal(modalExperience: any, vendorChecks: any) {
    console.log(vendorChecks);
    this.modalService.open(modalExperience, {
      centered: true,
      backdrop: 'static',
    });
    this.vendorChecks = vendorChecks;
  }

  openAddExperienceModal(content: any) {
    this.formEditEXP.reset();
    this.patchAddexpValues();
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (res) => {
          this.closeModal = `Closed with: ${res}`;
        },
        (res) => {
          this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
        }
      );
  }

  submitEditEXP() {
    if (this.formEditEXP.valid) {
      console.log(
        '..........................employeeeeee..........',
        this.formEditEXP.value
      );
      this.candidateService
        .updateCandidateExperienceStatusAndRemark(this.formEditEXP.value)
        .subscribe((result: any) => {
          if (result.outcome === true) {
            Swal.fire({
              title: result.message,
              icon: 'success',
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          } else {
            Swal.fire({
              title: result.message,
              icon: 'warning',
            });
          }
        });
    } else {
      Swal.fire({
        title: 'Please enter the required details.',
        icon: 'warning',
      });
    }
  }

  submitEditDOC() {
    this.patchAdddocValues();
    if (this.formEditDOC.valid) {
      console.log(
        '..........................employeeeeee..........',
        this.formEditDOC.value
      );
      this.candidateService
        .updateCandidateVendorProofColor(this.formEditDOC.value)
        .subscribe((result: any) => {
          if (result.outcome === true) {
            Swal.fire({
              title: result.message,
              icon: 'success',
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          } else {
            Swal.fire({
              title: result.message,
              icon: 'warning',
            });
          }
        });
    } else {
      Swal.fire({
        title: 'Please enter the required details.',
        icon: 'warning',
      });
    }
  }
  patchScopeValues() {
    this.formEditScope.reset();
    switch (this.editClickedFor) {
      case 'Dual Employment': {
        this.formEditScope
          .get('customRemark')
          ?.setValue(this.orgScopeData.dualEmployment);
        this.formEditScope
          .get('colorId')
          ?.setValue(this.orgScopeData.dualEmploymentColorId);
        break;
      }
      case 'Undisclosed': {
        this.formEditScope
          .get('customRemark')
          ?.setValue(this.orgScopeData.undisclosed);
        this.formEditScope
          .get('colorId')
          ?.setValue(this.orgScopeData.undisclosedColorId);
        break;
      }
      case 'Data Not Found': {
        this.formEditScope
          .get('customRemark')
          ?.setValue(this.orgScopeData.dataNotFound);
        this.formEditScope
          .get('colorId')
          ?.setValue(this.orgScopeData.dataNotFoundColorId);
        break;
      }
      case 'DNH DB': {
        this.formEditScope
          .get('customRemark')
          ?.setValue(this.orgScopeData.dnhdb);
        this.formEditScope
          .get('colorId')
          ?.setValue(this.orgScopeData.dnhdbcolorId);
        break;
      }
      case 'Tenure Mismatch': {
        this.formEditScope
          .get('customRemark')
          ?.setValue(this.orgScopeData.tenureMismatch);
        this.formEditScope
          .get('colorId')
          ?.setValue(this.orgScopeData.tenureMismatchColorId);
        break;
      }
      case 'Overseas Employment': {
        this.formEditScope
          .get('customRemark')
          ?.setValue(this.orgScopeData.overseasEmployment);
        this.formEditScope
          .get('colorId')
          ?.setValue(this.orgScopeData.overseasEmploymentColorId);
        break;
      }
      case 'Others': {
        this.formEditScope
          .get('customRemark')
          ?.setValue(this.orgScopeData.others);
        this.formEditScope
          .get('colorId')
          ?.setValue(this.orgScopeData.othersColorId);
        break;
      }
      default: {
        //statements;
        break;
      }
    }
  }
  submitEditScope() {
    if (this.formEditScope.valid) {
      console.log(this.candidateId, this.orgScopeData);
      if (this.candidateId) this.orgScopeData.candidateId = this.candidateId;
      switch (this.editClickedFor) {
        case 'Dual Employment': {
          this.orgScopeData.dualEmployment =
            this.formEditScope.get('customRemark')?.value;
          this.orgScopeData.dualEmploymentColorId =
            this.formEditScope.get('colorId')?.value;
          break;
        }
        case 'Undisclosed': {
          this.orgScopeData.undisclosed =
            this.formEditScope.get('customRemark')?.value;
          this.orgScopeData.undisclosedColorId =
            this.formEditScope.get('colorId')?.value;
          break;
        }
        case 'Data Not Found': {
          this.orgScopeData.dataNotFound =
            this.formEditScope.get('customRemark')?.value;
          this.orgScopeData.dataNotFoundColorId =
            this.formEditScope.get('colorId')?.value;
          break;
        }
        case 'DNH DB': {
          this.orgScopeData.dnhdb =
            this.formEditScope.get('customRemark')?.value;
          this.orgScopeData.dnhdbcolorId =
            this.formEditScope.get('colorId')?.value;
          break;
        }
        case 'Tenure Mismatch': {
          this.orgScopeData.tenureMismatch =
            this.formEditScope.get('customRemark')?.value;
          this.orgScopeData.tenureMismatchColorId =
            this.formEditScope.get('colorId')?.value;
          break;
        }
        case 'Overseas Employment': {
          this.orgScopeData.overseasEmployment =
            this.formEditScope.get('customRemark')?.value;
          this.orgScopeData.overseasEmploymentColorId =
            this.formEditScope.get('colorId')?.value;
          break;
        }
        case 'Others': {
          this.orgScopeData.others =
            this.formEditScope.get('customRemark')?.value;
          this.orgScopeData.othersColorId =
            this.formEditScope.get('colorId')?.value;
          break;
        }
        default: {
          //statements;
          break;
        }
      }

      this.candidateService
        .updateOrgScopeColor(this.orgScopeData)
        .subscribe((result: any) => {
          if (result.outcome === true) {
            Swal.fire({
              title: result.message,
              icon: 'success',
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          } else {
            Swal.fire({
              title: result.message,
              icon: 'warning',
            });
          }
        });
    } else {
      Swal.fire({
        title: 'Please enter the required details.',
        icon: 'warning',
      });
    }
  }

  inactiveCust(id: any) {
    $(this).hide();
    Swal.fire({
      title: 'Are You Sure to Delete Experience Details?',
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        this.candidateService
          .deletecandidateExpById(id)
          .subscribe((data: any) => {
            if (data.outcome === true) {
              Swal.fire({
                title: data.message,
                icon: 'success',
              }).then((data) => {
                if (data.isConfirmed) {
                  window.location.reload();
                }
              });
            } else {
              Swal.fire({
                title: data.message,
                icon: 'warning',
              });
            }
          });
      }
    });
  }

  //Edit_Address_Modal///

  tmp: any = [];
  roleCboxes(e: any) {
    var sid = e.target.id;
    console.log('checked======================', sid);
    if (e.target.checked) {
      // console.log("value************",value)
      this.tmp.push(sid);
    } else {
      this.tmp.splice($.inArray(sid, this.tmp), 1);
    }
    console.log('checked==============================', this.tmp);
  }

  openModalAddress(
    modalAddress: any,
    candidateCafAddressId: any,
    isAssetDeliveryAddress: any,
    isPermanentAddress: any,
    isPresentAddress: any,
    colorName: any,
    customRemark: any
  ) {
    this.modalService.open(modalAddress, {
      centered: true,
      backdrop: 'static',
    });
    let colorObj = this.getColors.find(
      (temp: any) => temp.colorCode == colorName
    );
    console.log(colorObj);
    this.formEditADRS.patchValue({
      id: candidateCafAddressId,
      isAssetDeliveryAddress:
        isAssetDeliveryAddress != null ? isAssetDeliveryAddress : false,
      isPermanentAddress:
        isPermanentAddress != null ? isPermanentAddress : false,
      isPresentAddress: isPresentAddress != null ? isPresentAddress : false,
      colorId: colorObj != null ? colorObj.colorId : null,
      customRemark: customRemark,
    });
  }
  submitEditADRS() {
    // this.patchAddressValues();
    if (this.formEditADRS.valid) {
      console.log(
        '.......................%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%.formEditADRS.',
        this.formEditADRS.value
      );
      this.candidateService
        .updateCandidateAddressStatusAndRemark(this.formEditADRS.value)
        .subscribe((result: any) => {
          if (result.outcome === true) {
            Swal.fire({
              title: result.message,
              icon: 'success',
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          } else {
            Swal.fire({
              title: result.message,
              icon: 'warning',
            });
          }
        });
    } else {
      Swal.fire({
        title: 'Please enter the required details.',
        icon: 'warning',
      });
    }
  }

  //Report_Approval_Form
  uploadCaseDetails(event: any) {
    const file = event.target.files[0];
    const fileType = event.target.files[0].name.split('.').pop();
    if (fileType == 'pdf' || fileType == 'PDF') {
      this.CaseDetailsDoc = file;
    } else {
      event.target.value = null;
      Swal.fire({
        title: 'Please select .pdf file type only.',
        icon: 'warning',
      });
    }
  }
  uploadGlobalCaseDetails(event: any) {
    const globalfile = event.target.files[0];
    const fileType = event.target.files[0].name.split('.').pop();
    if (fileType == 'pdf' || fileType == 'PDF') {
      this.globalCaseDoc = globalfile;
    } else {
      event.target.value = null;
      Swal.fire({
        title: 'Please select .pdf file type only.',
        icon: 'warning',
      });
    }
  }

  submitReportApproval(formReportApproval: FormGroup, reportType: string) {
    if (this.getServiceConfigCodes.includes('CRIMINAL')) {
      this.formReportApproval.controls[
        'criminalVerificationColorId'
      ].clearValidators();
      this.formReportApproval.controls[
        'criminalVerificationColorId'
      ].setValidators(Validators.required);
      this.formReportApproval.controls[
        'criminalVerificationColorId'
      ].updateValueAndValidity();
      if (this.CaseDetailsDoc.size == null) {
        formReportApproval.setErrors({ invalid: true });
      }
    }

    if (this.getServiceConfigCodes.includes('GLOBAL')) {
      this.formReportApproval.controls[
        'globalDatabseCaseDetailsColorId'
      ].clearValidators();
      this.formReportApproval.controls[
        'globalDatabseCaseDetailsColorId'
      ].setValidators(Validators.required);
      this.formReportApproval.controls[
        'globalDatabseCaseDetailsColorId'
      ].updateValueAndValidity();
      if (this.globalCaseDoc.size == null) {
        formReportApproval.setErrors({ invalid: true });
      }
    }

    const candidateReportApproval = formReportApproval.value;
    const formData = new FormData();
    formData.append(
      'candidateReportApproval',
      JSON.stringify(candidateReportApproval)
    );
    formData.append('criminalVerificationDocument', this.CaseDetailsDoc);
    formData.append('globalDatabseCaseDetailsDocument', this.globalCaseDoc);
    formData.append('candidateCode', this.candidateCode);
    formData.append('reportType', reportType);
    this.candidateService
      .candidateApplicationFormApproved(formData)
      .subscribe((result: any) => {
        if (result.outcome === true) {
          Swal.fire({
            title: result.message,
            icon: 'success',
          }).then((result) => {
            if (result.isConfirmed) {
              const navURL = 'admin/cFinalReport/' + this.candidateCode;
              this.navRouter.navigate([navURL]);
            }
          });
        } else {
          Swal.fire({
            title: result.message,
            icon: 'warning',
          });
        }
      });
  }

  //Document View
  openResume(modalResume: any) {
    this.modalService.open(modalResume, {
      centered: true,
      backdrop: 'static',
      size: 'lg',
    });
    if (this.candidateResume) {
      $('#viewcandidateResume').attr('src', this.candidateResume);
    }
  }

  openLandlordAgreement(modalLandlordAgreement: any, document: any) {
    this.modalService.open(modalLandlordAgreement, {
      centered: true,
      backdrop: 'static',
      size: 'lg',
    });
    if (document) {
      $('#viewLandlordAgreement').attr(
        'src',
        'data:application/pdf;base64,' + document
      );
    }
  }

  enteruan() {
    const navURL = 'candidate/epfologin/' + this.candidateCode;
    this.navRouter.navigate([navURL]);
  }

  // initiatevendor(){
  //   const navURL = 'admin/vendorinitiaste/'+this.candidateCode;
  //   this.navRouter.navigate([navURL]);
  // }

  initiatevendor() {
    console.log(
      this.candidateId,
      '-----------------------------------------------'
    );
    const navURL = 'admin/vendorinitiaste/' + this.candidateId;
    this.navRouter.navigate([navURL]);
  }
  openCertificate(modalCertificate: any, certificate: any) {
    this.modalService.open(modalCertificate, {
      centered: true,
      backdrop: 'static',
      size: 'lg',
    });
    if (certificate) {
      $('#viewcandidateCertificate').attr(
        'src',
        'data:application/pdf;base64,' + certificate
      );
    }
  }

  patchAddcomentValues() {
    this.formAddcomment.patchValue({
      candidateCode: this.candidateCode,
    });
  }

  openAddcommentModal(content: any) {
    this.formAddcomment.reset();
    this.patchAddcomentValues();
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (res) => {
          this.closeModal = `Closed with: ${res}`;
        },
        (res) => {
          this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
        }
      );
  }

  submitAddcomment(formAddcomment: FormGroup) {
    console.log(
      '================================ ***** formAddcomment',
      this.formAddcomment.value
    );
    if (this.formAddcomment.valid) {
      this.candidateService
        .AddCommentsReports(this.formAddcomment.value)
        .subscribe((result: any) => {
          if (result.outcome === true) {
            Swal.fire({
              title: result.message,
              icon: 'success',
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });

            this.isCommentAdded = false;
          } else {
            Swal.fire({
              title: result.message,
              icon: 'warning',
            });
          }
        });
    } else {
      Swal.fire({
        title: 'Please enter the required details.',
        icon: 'warning',
      });
    }
  }
}
