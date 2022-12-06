import { NgModule, Injectable } from '@angular/core';
import {SkeletonModule} from 'primeng/skeleton';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { MessageModule } from 'primeng/message';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CheckboxModule } from 'primeng/checkbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenubarModule } from 'primeng/menubar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { MessagesModule } from 'primeng/messages';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { SplitterModule } from 'primeng/splitter';
import { CommonModule, DatePipe } from '@angular/common';
import { ListboxModule } from 'primeng/listbox';
import { TreeModule } from 'primeng/tree';
import { DividerModule } from 'primeng/divider';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { CaptchaModule } from 'primeng/captcha';
import { AccordionModule } from 'primeng/accordion';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TagModule } from 'primeng/tag';
import { PaginatorModule } from 'primeng/paginator';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SliderModule } from 'primeng/slider';
import { BlockUIModule } from 'primeng/blockui';
import { ChipModule } from 'primeng/chip';
import { BadgeModule } from 'primeng/badge';
import { TimelineModule } from 'primeng/timeline';
import { GalleriaModule } from 'primeng/galleria';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuModule } from 'primeng/menu';
import { SidebarModule } from 'primeng/sidebar';
import { ChartModule } from 'primeng/chart';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import {StepsModule} from 'primeng/steps';
@NgModule({
  exports: [
    InputTextModule,
    PasswordModule,
    ButtonModule,
    MessageModule,
    RatingModule,
    ToastModule,
    DropdownModule,
    CalendarModule,
    RadioButtonModule,
    CheckboxModule,
    MultiSelectModule,
    InputMaskModule,
    InputTextareaModule,
    AutoCompleteModule,
    InputNumberModule,
    MegaMenuModule,
    MenubarModule,
    PanelModule,
    CardModule,
    TabViewModule,
    ConfirmDialogModule,
    MessagesModule,
    TooltipModule,
    TableModule,
    DialogModule,
    InputSwitchModule,
    DynamicDialogModule,
    SplitterModule,
    CommonModule,
    ListboxModule,
    ToolbarModule,
    TreeModule,
    DividerModule,
    FileUploadModule,
    HttpClientModule,
    CaptchaModule,
    AccordionModule,
    PanelModule,
    OverlayPanelModule,
    TagModule,
    PaginatorModule,
    SelectButtonModule,
    SliderModule,
    BlockUIModule,
    ChipModule,
    BadgeModule,
    TimelineModule,
    GalleriaModule,
    ToggleButtonModule,
    SplitButtonModule,
    MenuModule,
    SidebarModule,
    ChartModule,
    SkeletonModule,
    AvatarModule,
    AvatarGroupModule,
    StepsModule
  ],
  providers: [DatePipe, CommonModule],
})
@Injectable({
  providedIn: 'any',
})
export class PrimengModule {}
