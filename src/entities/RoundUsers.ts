import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("round_users", { schema: "pb" })
export class RoundUsers {
  @PrimaryColumn("int", { name: "round_id" })
  roundId: number;

  @PrimaryColumn("int", { name: "user_id" })
  userId: number;

}
