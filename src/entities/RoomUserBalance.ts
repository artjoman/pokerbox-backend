import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("room_user_balance", { schema: "pb" })
export class RoomUserBalance {
  @PrimaryColumn("int", { name: "room_id" })
  roomId: number;

  @PrimaryColumn("int", { name: "user_id" })
  userId: number;

  @Column("double", { name: "amount", precision: 22 })
  amount: number;

  @Column("varchar", { name: "ccy", length: 30 })
  ccy: string;
}
