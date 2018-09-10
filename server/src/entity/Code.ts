import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class Code {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column("date")
  date: string;

  @Column()
  isLocked: boolean;

  @Column("text")
  codeText: string;
}