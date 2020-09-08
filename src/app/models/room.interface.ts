export interface IRoom {
  id_room: number;
  name_room: string;
  description: string;
  room_images: Array<any>;
  active_room: boolean;
}

export class Room implements IRoom {
  id_room: number;
  name_room: string;
  description: string;
  room_images: Array<any>;
  active_room: boolean;
}
