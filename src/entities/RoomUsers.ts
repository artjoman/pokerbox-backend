import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("room_users", { schema: "pb" })
export class RoomUsers {
  @PrimaryColumn("int", { name: "room_id" })
  roomId: number;

  @PrimaryColumn("int", { name: "user_id" })
  userId: number;

  @Column("bool", { name: "round" })
  round: boolean;
}
