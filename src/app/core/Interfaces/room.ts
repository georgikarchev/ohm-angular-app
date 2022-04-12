export interface Room {
    id: string;
    name: string;
    photo?: string | undefined;
    singleBeds?: number;
    doubleBeds?: number;
    babyCots?: number;
    basePrice: number,
    pricePerExtraAdult: number,
    pricePerExtraChild: number,
    disabilityFriendly?: boolean;
    available?: boolean;
  }

  // private rooms: Array<Room> = [
  //   {
  //     id: 'ohm-h1-r1',
  //     name: "1",
  //     photo: undefined,
  //     singleBeds: 1,
  //     doubleBeds: 0,
  //     babyCots: 0,
  //     disabilityFriendly: true,
  //     available: true
  //   },
  //   {
  //     id: 'ohm-h1-r2',
  //     name: "2",
  //     photo: "../assets/febrian-zakaria-gwV9eklemSg-unsplash.jpg",
  //     singleBeds: 0,
  //     doubleBeds: 0,
  //     babyCots: 0,
  //     disabilityFriendly: true,
  //     available: true
  //   },
  //   {
  //     id: 'ohm-h1-r3',
  //     name: "3",
  //     photo: "../assets/edelle-bruton-PJNO2sLlbB8-unsplash.jpg",
  //     singleBeds: 2,
  //     doubleBeds: 0,
  //     babyCots: 1,
  //     disabilityFriendly: true,
  //     available: true
  //   },
  // ];