export interface Booking {
    id: string,
    name: string,
    email: string,
    phone: string,
    checkInDate: string,
    checkOutDate: string,
    discount: number,
    roomId: string,
    adults: number,
    children: number,
    notes?: string,
    status: string
}