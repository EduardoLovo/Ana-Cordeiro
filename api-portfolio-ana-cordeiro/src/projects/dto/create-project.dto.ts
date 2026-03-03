import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty({ message: 'O título é obrigatório.' })
  title!: string; // <-- Note o "!" aqui

  @IsString()
  @IsNotEmpty({ message: 'A descrição é obrigatória.' })
  description!: string; // <-- E aqui

  @IsString()
  @IsNotEmpty({ message: 'A imagem principal é obrigatória.' })
  mainImage!: string; // <-- E aqui

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[]; // Opcional já usa o "?" então não precisa do "!"

  @IsBoolean()
  @IsOptional()
  isVisible?: boolean; // Opcional também
}
