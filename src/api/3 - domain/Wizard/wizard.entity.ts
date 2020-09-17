import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, MaxLength, MinLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WizardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Name of the Wizard',
    minimum: 5,
    maximum: 30,
  })
  @Column()
  @IsNotEmpty()
  @Length(5, 30)
  name: string;

  @ApiProperty({
    description: 'Name of the School where the Wizard studies / studied',
    minimum: 10,
    maximum: 50,
  })
  @Column()
  @IsNotEmpty()
  @Length(10, 50)
  school: string;

  @ApiProperty({
    description:
      'Id of the House of the School where the Wizard is / was a member (accordingly to PotterAPI)',
    minimum: 24,
    maximum: 24,
  })
  @Column()
  @IsNotEmpty()
  @MaxLength(24)
  @MinLength(24)
  house: string;

  @ApiProperty({
    description: 'Patronus of the Wizard',
    minimum: 3,
    maximum: 15,
  })
  @Column()
  @IsNotEmpty()
  @Length(3, 15)
  patronus: string;
}
