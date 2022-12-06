import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
  model: any[] = [];

  constructor(public layoutService: LayoutService) {}

  ngOnInit() {
    let role = localStorage.getItem('role');
    if (role == 'admin') {
      this.model = [
        {
          label: 'Home',
          items: [
            {
              label: 'Dashboard',
              icon: 'pi pi-fw pi-home',
              routerLink: ['/admin/dashboard'],
            },
          ],
        },
        {
          label: 'User',
          items: [
            {
              label: 'User Management',
              icon: 'pi pi-user-edit',
              items: [
                {
                  label: 'Student',
                  icon: 'pi pi-user',
                  routerLink: ['/admin/student-management'],
                },
                {
                  label: 'Teacher',
                  icon: 'pi pi-user',
                  routerLink: ['/admin/teacher-management'],
                },
                {
                  label: 'Admin',
                  icon: 'pi pi-user',
                  routerLink: ['/admin/admin-management'],
                },
              ],
            },
          ],
        },
        {
          label: 'Class Room',
          items: [
            {
              label: 'Class Room Management',
              icon: 'bi bi-award',
              routerLink: ['/admin/class-management'],
            },
          ],
        },
      ];
    } else if (role == 'teacher') {
      this.model = [
        {
          label: 'Home',
          items: [
            {
              label: 'Dashboard',
              icon: 'pi pi-fw pi-home',
              routerLink: ['/teacher/dashboard'],
            },
          ],
        },
        {
          label:'Exams',
          items:[
            {
              label:'Exam generator',
              icon:'bi bi-file-earmark-medical',
              items:[
                {
                  label:'Exam',
                  icon:'bi bi-file-earmark-text',
                  routerLink:['/teacher/exam/exam-creation']
                },
                {
                  label:'Question generator',
                  icon:'pi pi-file-edit',
                  routerLink:'/teacher/exam/question-generator'
                }
              ]
            }
          ]
        },
      ];
    }
    else if(role=='student'){
      this.model = [
        {
          label: 'Home',
          items: [
            {
              label: 'Dashboard',
              icon: 'pi pi-fw pi-home',
              routerLink: ['/student/dashboard'],
            },
          ],
        },
      ]
    }
  }
}
