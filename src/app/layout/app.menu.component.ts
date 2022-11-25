import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/admin/dashboard'] }
                ]
            },
            {
              label:'User',
              items:[
                {
                  label:'User Management',
                  icon:'pi pi-user-edit',
                  items:[
                    {
                      label:'Student',
                      icon:'pi pi-user',
                      routerLink:['/admin/student-management']
                    },
                    {
                      label:'Teacher',
                      icon:'pi pi-user',
                      routerLink:['/admin/teacher-management']
                    },
                    {
                      label:'Admin',
                      icon:'pi pi-user',
                      routerLink:['/admin/admin-management']
                    },
                  ]
                }
              ]
            }
        ];
    }
}
