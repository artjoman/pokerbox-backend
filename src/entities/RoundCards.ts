import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("round_cards", { schema: "pb" })
export class RoundCards {
  @PrimaryColumn("int", { name: "user_id" })
  userId: number;

  @PrimaryColumn("int", { name: "round_id" })
  roundId: number;

  @Column("varchar", { name: "card_value", length: 3 })
  cardValue: string;

  @Column("timestamp", {
    name: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  timestamp?: Date;
}
