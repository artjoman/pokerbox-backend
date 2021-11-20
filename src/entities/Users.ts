import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users", { schema: "pb" })
export class Users {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id?: number;

  @Column("varchar", { name: "nickname", nullable: true, length: 100 })
  nickname: string | null;
  
}
