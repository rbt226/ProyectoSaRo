export interface IRoom {
  id_room: number;
  name_room: string;
  description: string;
  images: Array<string>;
  active_room: boolean;
}

export class Room implements IRoom {
  id_room: number;
  name_room: string;
  description: string;
  images: Array<string>;
  active_room: boolean;
}
