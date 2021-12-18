import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgxLoadersCssModule } from 'ngx-loaders-css';

import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { EditorModule } from 'primeng/editor';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MessageModule } from 'primeng/message';
import { MultiSelectModule } from 'primeng/multiselect';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { CardModule } from 'primeng/card';

import { CardComponent } from './components/card/card.component';
import { FormControlComponent } from './components/form-control/form-control.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { OverlayComponent } from './overlay/overlay.component';

const PROVIDERS = [
  DialogService
];

const MODULES = [
  ReactiveFormsModule,
  FormsModule,
  
  NgxLoadersCssModule,
  AngularSvgIconModule,

  // Prime ng components;
  InputTextModule,
  InputMaskModule,
  CheckboxModule,
  ButtonModule,
  DropdownModule,
  DynamicDialogModule,
  InputSwitchModule,
  ToastModule,
  TabMenuModule,
  TableModule,
  InputTextareaModule,
  RadioButtonModule,
  TabViewModule,
  CalendarModule,
  EditorModule,
  BreadcrumbModule,
  OverlayPanelModule,
  BreadcrumbModule,
  AutoCompleteModule,
  ConfirmDialogModule,
  KeyFilterModule,
  PaginatorModule,
  TooltipModule,
  ProgressBarModule,
  MultiSelectModule,
  ChartModule,
  DialogModule,
  MessageModule,
  AccordionModule,
  CardModule
];

const COMPONENTS = [
  FormControlComponent,
  OverlayComponent,
  SidebarComponent,
  HeaderComponent,
  CardComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    ...MODULES
  ],
  exports: [
    ToastModule,
    ...MODULES,
    ...COMPONENTS
  ],
  providers: [
    ...PROVIDERS
  ]
})
export class SharedModule { }
