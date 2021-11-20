import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Rounds } from "./Rounds";

@Entity("round_stakes", { schema: "pb" })
export class RoundStakes {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "round_id" })
  roundId: number;

  @Column("int", { name: "user_id" })
  userId: number;

  @Column("double", { name: "amount", precision: 2 })
  amount: number;

  @Column("varchar", { name: "ccy", length: 3 })
  ccy: string;

  @Column("timestamp", {
    name: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  timestamp: Date;

  @OneToMany(() => Rounds, (rounds) => rounds.id)
  @JoinColumn({name: "id"})
  public round?: Rounds;

}
