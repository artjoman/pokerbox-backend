import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("payments", { schema: "pb" })
export class Payments {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "user_id" })
  userId: number;

  @Column("varchar", { name: "wallet", length: 100 })
  wallet: string;

  @Column("varchar", { name: "provider", length: 300 })
  provider: string;
}
