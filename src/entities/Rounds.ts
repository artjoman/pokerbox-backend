import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RoundStakes } from "./RoundStakes";

@Entity("rounds", { schema: "pb" })
export class Rounds {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "room_id" })
  roomId: number;

  @Column("int", { name: "root_user_id" })
  rootUserId: number;

  @Column("tinyint", { name: "active", width: 1, default: () => "'1'" })
  active: boolean;

  @ManyToOne(() => RoundStakes, (stakes) => stakes.roundId)
  @JoinColumn({name: "round_id"})
  public stakes?: RoundStakes[];

}
