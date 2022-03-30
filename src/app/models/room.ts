export interface Room {
    id: string;
    name: string;
    photo?: string | undefined;
    singleBeds?: number;
    doubleBeds?: number;
    babyCots?: number;
    disabilityFriendly?: boolean;
    available?: boolean;
  }