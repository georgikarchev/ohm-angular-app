import { RouterModule } from "@angular/router";

import { BookingsComponent } from "./bookings/bookings.component";
import { BookingAddComponent } from "src/app/shared/booking-add/booking-add.component";
import { BookingEditComponent } from "./booking-edit/booking-edit.component";


export const BookingsRoutingModule = RouterModule.forChild([
    {
        path: '',
        // pathMatch: 'full', // <-- This Line interferes with the children definition - if this line is uncommented trying to load the children would lead to 404
        component: BookingsComponent,
        // children: [
        //     {
        //         path: 'new',
        //         component: BookingAddComponent,
        //     },


            // {
            //     path: '/edit/:id',
            //     pathMatch: 'full',
            //     component: RoomEditComponent,
            // },
        // ]
    },
    {
        path: 'new',
        component: BookingAddComponent,
    },
    {
        path: 'edit/:id',
        pathMatch: 'full',
        component: BookingEditComponent,
    },
])