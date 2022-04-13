import { RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";



export const DashboardRoutingModule = RouterModule.forChild([
    {
        path: '',
        pathMatch: 'full',
        component: DashboardComponent,
        // children: [
        //     {
        //         path: '/new',
        //         component: RoomAddComponent,
        //     },
        //     {
        //         path: '/edit/:id',
        //         pathMatch: 'full',
        //         component: RoomEditComponent,
        //     },
        // ]
    },
])