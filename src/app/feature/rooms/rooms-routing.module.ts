import { RouterModule } from "@angular/router";
import { RoomAddComponent } from "./room-add/room-add.component";
import { RoomEditComponent } from "./room-edit/room-edit.component";
import { RoomsComponent } from "./rooms/rooms.component";

export const RoomsRoutingModule = RouterModule.forChild([
    {
        path: '',
        pathMatch: 'full',
        component: RoomsComponent,
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
    {
        //  '/new' is wrong - the route shoud be specified without a forward dash!!!
        path: 'new',
        component: RoomAddComponent,
    },
    
    // {
    //     path: '/add-new-room',
    //     pathMatch: 'full',
    //     component: RoomAddComponent,
    // },
])