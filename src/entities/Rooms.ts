import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("rooms", { schema: "pb" })
export class Rooms {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id?: number;

  @Column("varchar", { name: "code", length: 10 })
  code: string;

  @Column("int", { name: "user_id" })
  userId: number;

  @Column("varchar", { name: "name", nullable: true, length: 30 })
  name: string | null;

  @Column("tinyint", { name: "public", width: 1, default: () => "'1'" })
  public: boolean;

  @Column("tinyint", { name: "active", width: 1, default: () => "'1'" })
  active?: boolean;
}
