import { NgxUiLoaderService } from "ngx-ui-loader";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { DialogsComponent } from "src/app/dialogs/dialogs.component";
import { AppCustomDialog } from "src/app/enums/common/AppCustomDialog";
import { ErrorDialogTypeEnums } from "./common.enum";

export class BaseComponent{
  public dialogRef?:DynamicDialogRef;
  public isAlertActive:boolean=false;
  public progressCount: number = 0;
  public showLoader: boolean = false;
  constructor(public dialogService:DialogService,public loaderService: NgxUiLoaderService,){
  }
  showDialog(Message: any, ErrorType: ErrorDialogTypeEnums) {
    this.isAlertActive = true;
    var headerText = 'Attention Needed!';
    if (ErrorType == ErrorDialogTypeEnums.Information) {
      headerText = 'Information!';
    } else if (ErrorType == ErrorDialogTypeEnums.Success) {
      headerText = 'Success!';
    } else if (ErrorType == ErrorDialogTypeEnums.Warning) {
      headerText = 'Warning!';
    } else if (ErrorType == ErrorDialogTypeEnums.Error) {
      headerText = 'Error!';
    } else {
      ErrorType = ErrorDialogTypeEnums.AttentionNeeded;
      headerText = 'Attention Needed!';
    }
    this.dialogRef = this.dialogService.open( DialogsComponent, {
      showHeader: false,
      header: headerText,
      width: 'auto',
      styleClass: 'app-dialog',
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      baseZIndex: 10000,
      closeOnEscape: false,
      closable: false,
      data: {
        Title: headerText,
        Content: Message,
        Type: ErrorType,
      } as AppCustomDialog,
    });

    this.dialogRef.onClose.subscribe((isConfirm: boolean) => {
      this.isAlertActive = false;
    });
  }
  handleErrors(error: any) {
    if (error.StatusCode == 401) {
      //this.appCoreService.logout(true, error.Message);
    } else {
      this.showDialog(error.Message, ErrorDialogTypeEnums.Error);
    }
  }

  openConfirmationDialog(title: string, message: string): DynamicDialogRef {
    this.isAlertActive = true;
    return this.dialogService.open(DialogsComponent, {
      showHeader: false,
      styleClass: 'app-dialog',
      contentStyle: { 'max-height': '350px', overflow: 'auto' },
      baseZIndex: 10000,
      closeOnEscape: false,
      closable: false,
      data: {
        Title: title,
        Content: message,
        IsConfirmationModal: true,
      } as AppCustomDialog,
    });
  }

  showDialogWithAction(
    Message: any,
    ErrorType: ErrorDialogTypeEnums
  ): DynamicDialogRef {
    this.isAlertActive = true;
    var headerText = 'Attention Needed!';
    if (ErrorType == ErrorDialogTypeEnums.Information) {
      headerText = 'Information!';
    } else if (ErrorType == ErrorDialogTypeEnums.Success) {
      headerText = 'Success!';
    } else if (ErrorType == ErrorDialogTypeEnums.Warning) {
      headerText = 'Warning!';
    } else if (ErrorType == ErrorDialogTypeEnums.Error) {
      headerText = 'Error!';
    } else {
      ErrorType = ErrorDialogTypeEnums.AttentionNeeded;
      headerText = 'Attention Needed!';
    }
    return this.dialogService.open(DialogsComponent, {
      showHeader: false,
      header: headerText,
      width: 'auto',
      styleClass: 'app-dialog',
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      baseZIndex: 10000,
      closeOnEscape: false,
      closable: false,
      data: {
        Title: headerText,
        Content: Message,
        Type: ErrorType,
      } as AppCustomDialog,
    });
  }
  managerLoader(progressIncrease: boolean, loaderId: string): void {
    if (progressIncrease) this.progressCount++;
    else this.progressCount--;

    if (this.progressCount > 0 && this.showLoader == false) {
      this.loaderService.startLoader(loaderId);
      this.showLoader = true;
    }

    if (this.progressCount <= 0 && this.showLoader == true) {
      this.loaderService.stopLoader(loaderId);
      this.showLoader = false;
    }
  }
}
