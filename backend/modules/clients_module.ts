// src/modules/clients/clients.module.ts
import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService],
  exports: [ClientsService],
})
export class ClientsModule {}

// src/modules/clients/clients.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { QueryClientsDto } from './dto/query-clients.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Clients')
@Controller('clients')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new client' })
  @ApiResponse({ status: 201, description: 'Client created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all clients' })
  @ApiResponse({ status: 200, description: 'Clients retrieved successfully' })
  findAll(@Query() queryDto: QueryClientsDto) {
    return this.clientsService.findAll(queryDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get client by ID' })
  @ApiResponse({ status: 200, description: 'Client retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Client not found' })
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(id);
  }

  @Get(':id/detailed')
  @ApiOperation({ summary: 'Get client with all related information' })
  @ApiResponse({ status: 200, description: 'Detailed client information retrieved' })
  @ApiResponse({ status: 404, description: 'Client not found' })
  findDetailed(@Param('id') id: string) {
    return this.clientsService.findDetailed(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update client' })
  @ApiResponse({ status: 200, description: 'Client updated successfully' })
  @ApiResponse({ status: 404, description: 'Client not found' })
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(id, updateClientDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete client' })
  @ApiResponse({ status: 200, description: 'Client deleted successfully' })
  @ApiResponse({ status: 404, description: 'Client not found' })
  remove(@Param('id') id: string) {
    return this.clientsService.remove(id);
  }

  @Post(':id/contacts')
  @ApiOperation({ summary: 'Add contact information to client' })
  @ApiResponse({ status: 201, description: 'Contact added successfully' })
  addContact(@Param('id') id: string, @Body() contactData: any) {
    return this.clientsService.addContact(id, contactData);
  }

  @Post(':id/emergency-contacts')
  @ApiOperation({ summary: 'Add emergency contact to client' })
  @ApiResponse({ status: 201, description: 'Emergency contact added successfully' })
  addEmergencyContact(@Param('id') id: string, @Body() emergencyContactData: any) {
    return this.clientsService.addEmergencyContact(id, emergencyContactData);
  }

  @Post(':id/family-members')
  @ApiOperation({ summary: 'Add family member to client' })
  @ApiResponse({ status: 201, description: 'Family member added successfully' })
  addFamilyMember(@Param('id') id: string, @Body() familyMemberData: any) {
    return this.clientsService.addFamilyMember(id, familyMemberData);
  }
}

// src/modules/clients/clients.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { QueryClientsDto } from './dto/query-clients.dto';

@Injectable()
export class ClientsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createClientDto: CreateClientDto) {
    const client = await this.prisma.client.create({
      data: createClientDto,
      include: {
        contacts: true,
        cases: {
          select: {
            id: true,
            caseNumber: true,
            title: true,
            status: true,
            dateOfLoss: true,
          },
        },
      },
    });

    return client;
  }

  async findAll(queryDto: QueryClientsDto) {
    const { page = 1, limit = 10, search, status, caseType } = queryDto;
    const skip = (page - 1) * limit;

    const where: any = {
      active: true,
    };

    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { contacts: { some: { value: { contains: search, mode: 'insensitive' } } } },
      ];
    }

    if (status || caseType) {
      where.cases = {
        some: {
          ...(status && { status }),
          ...(caseType && { caseType }),
        },
      };
    }

    const [clients, total] = await Promise.all([
      this.prisma.client.findMany({
        where,
        skip,
        take: limit,
        include: {
          contacts: {
            where: { primary: true },
            take: 2,
          },
          cases: {
            select: {
              id: true,
              caseNumber: true,
              title: true,
              status: true,
              caseType: true,
              dateOfLoss: true,
              createdAt: true,
            },
            orderBy: { createdAt: 'desc' },
            take: 1,
          },
          _count: {
            select: {
              cases: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.client.count({ where }),
    ]);

    return {
      data: clients,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const client = await this.prisma.client.findUnique({
      where: { id },
      include: {
        contacts: true,
        cases: {
          select: {
            id: true,
            caseNumber: true,
            title: true,
            status: true,
            caseType: true,
            dateOfLoss: true,
          },
        },
        emergencyContacts: true,
        familyMembers: true,
        employment: true,
        communicationPrefs: true,
      },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    return client;
  }

  async findDetailed(id: string) {
    const client = await this.prisma.client.findUnique({
      where: { id },
      include: {
        contacts: true,
        cases: {
          include: {
            assignments: {
              include: {
                user: {
                  select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    role: true,
                  },
                },
              },
            },
            tasks: {
              where: {
                status: { in: ['PENDING', 'IN_PROGRESS'] },
              },
              orderBy: { dueDate: 'asc' },
              take: 5,
            },
            medicalProviders: {
              select: {
                id: true,
                name: true,
                type: true,
                totalBills: true,
                status: true,
              },
            },
            insurancePolicies: {
              select: {
                id: true,
                type: true,
                company: true,
                status: true,
              },
            },
            incident: {
              select: {
                id: true,
                dateOfLoss: true,
                incidentType: true,
                severity: true,
              },
            },
          },
        },
        emergencyContacts: true,
        familyMembers: true,
        employment: true,
        communicationPrefs: true,
      },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    const client = await this.findOne(id);

    const updatedClient = await this.prisma.client.update({
      where: { id },
      data: updateClientDto,
      include: {
        contacts: true,
        cases: {
          select: {
            id: true,
            caseNumber: true,
            title: true,
            status: true,
            caseType: true,
            dateOfLoss: true,
          },
        },
      },
    });

    return updatedClient;
  }

  async remove(id: string) {
    const client = await this.findOne(id);

    await this.prisma.client.update({
      where: { id },
      data: { active: false },
    });

    return { message: 'Client deactivated successfully' };
  }

  async addContact(clientId: string, contactData: any) {
    await this.findOne(clientId); // Verify client exists

    const contact = await this.prisma.contactInfo.create({
      data: {
        ...contactData,
        clientId,
      },
    });

    return contact;
  }

  async addEmergencyContact(clientId: string, emergencyContactData: any) {
    await this.findOne(clientId); // Verify client exists

    const emergencyContact = await this.prisma.emergencyContact.create({
      data: {
        ...emergencyContactData,
        clientId,
      },
    });

    return emergencyContact;
  }

  async addFamilyMember(clientId: string, familyMemberData: any) {
    await this.findOne(clientId); // Verify client exists

    const familyMember = await this.prisma.familyMember.create({
      data: {
        ...familyMemberData,
        clientId,
      },
    });

    return familyMember;
  }
}

// src/modules/clients/dto/create-client.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEnum,
  IsDateString,
  IsArray,
} from 'class-validator';
import { Gender, MaritalStatus } from '@prisma/client';

export class CreateClientDto {
  @ApiProperty({ example: 'Patricia' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Thowerd' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiPropertyOptional({ example: 'Anne' })
  @IsOptional()
  @IsString()
  middleName?: string;

  @ApiPropertyOptional({ example: '1974-03-05' })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @ApiPropertyOptional({ example: '123-45-8723' })
  @IsOptional()
  @IsString()
  ssn?: string;

  @ApiPropertyOptional({ enum: Gender, example: Gender.FEMALE })
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @ApiPropertyOptional({ enum: MaritalStatus, example: MaritalStatus.MARRIED })
  @IsOptional()
  @IsEnum(MaritalStatus)
  maritalStatus?: MaritalStatus;

  @ApiPropertyOptional({ example: 'US Citizen' })
  @IsOptional()
  @IsString()
  citizenship?: string;

  @ApiPropertyOptional({
    example: ['English', 'Spanish (Conversational)'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  languages?: string[];

  @ApiPropertyOptional({ example: 'https://example.com/photo.jpg' })
  @IsOptional()
  @IsString()
  photo?: string;
}

// src/modules/clients/dto/update-client.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateClientDto } from './create-client.dto';

export class UpdateClientDto extends PartialType(CreateClientDto) {}

// src/modules/clients/dto/query-clients.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEnum, IsInt, Min, Max, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { CaseStatus, CaseType } from '@prisma/client';

export class QueryClientsDto {
  @ApiPropertyOptional({ example: 1, minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ example: 10, minimum: 1, maximum: 100 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @ApiPropertyOptional({ example: 'Patricia' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ enum: CaseStatus })
  @IsOptional()
  @IsEnum(CaseStatus)
  status?: CaseStatus;

  @ApiPropertyOptional({ enum: CaseType })
  @IsOptional()
  @IsEnum(CaseType)
  caseType?: CaseType;
}