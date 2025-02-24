import { IsString, IsEmail, IsOptional, Length, Matches } from 'class-validator';

export class CreateContactDto {
    @IsString()
    @Length(2, 255, { message: 'Name must be between 2 and 255 characters' })
    @Matches(/^[a-zA-Z\s]*$/, { message: 'Name can only contain letters and spaces' })
    name: string;

    @IsEmail({}, { message: 'Please provide a valid email address' })
    email: string;

    @IsOptional()
    @Matches(/^\+?1?\d{9,15}$|^\d{3}-\d{3}-\d{4}$/, {
        message: 'Please provide a valid phone number. Example formats: 555-123-4567 or +1555123456'
    })
    phone?: string;
} 