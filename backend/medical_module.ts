// src/modules/medical/medical.module.ts
import { Module } from '@nestjs/common';
import { MedicalController } from './medical.controller';
import { MedicalService } from './medical.service';

@Module({
  controllers: [MedicalController],
  providers: [MedicalService],
  exports: [MedicalService],
})
export class MedicalModule {}

// src/modules/medical/medical.controller.ts
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
import { MedicalService } from './medical.service';
import { CreateMedicalProviderDto } from './dto/create-medical-provider.dto';
import { UpdateMedicalProviderDto } from './dto/update-medical-provider.dto';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { CreateInjuryDto } from './dto/create-injury.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Medical')
@Controller('medical')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class MedicalController {
  constructor(private readonly medicalService: MedicalService) {}

  // Medical Providers
  @Get('cases/:caseId/providers')
  @ApiOperation({ summary: 'Get medical providers for a case' })
  @ApiResponse({ status: 200, description: 'Medical providers retrieved successfully' })
  getProviders(@Param('caseId') caseId: string) {
    return this.medicalService.getProviders(caseId);
  }

  @Post('cases/:caseId/providers')
  @ApiOperation({ summary: 'Add medical provider to case' })
  @ApiResponse({ status: 201, description: 'Medical provider created successfully' })
  createProvider(
    @Param('caseId') caseId: string,
    @Body() createProviderDto: CreateMedicalProviderDto,
  ) {
    return this.medicalService.createProvider(caseId, createProviderDto);
  }

  @Patch('providers/:id')
  @ApiOperation({ summary: 'Update medical provider' })
  @ApiResponse({ status: 200, description: 'Medical provider updated successfully' })
  updateProvider(
    @Param('id') id: string,
    @Body() updateProviderDto: UpdateMedicalProviderDto,
  ) {
    return this.medicalService.updateProvider(id, updateProviderDto);
  }

  @Delete('providers/:id')
  @ApiOperation({ summary: 'Delete medical provider' })
  @ApiResponse({ status: 200, description: 'Medical provider deleted successfully' })
  deleteProvider(@Param('id') id: string) {
    return this.medicalService.deleteProvider(id);
  }

  // Medical Records
  @Get('cases/:caseId/records')
  @ApiOperation({ summary: 'Get medical records for a case' })
  @ApiResponse({ status: 200, description: 'Medical records retrieved successfully' })
  getRecords(@Param('caseId') caseId: string, @Query() query: any) {
    return this.medicalService.getRecords(caseId, query);
  }

  @Post('cases/:caseId/records')
  @ApiOperation({ summary: 'Add medical record to case' })
  @ApiResponse({ status: 201, description: 'Medical record created successfully' })
  createRecord(
    @Param('caseId') caseId: string,
    @Body() createRecordDto: CreateMedicalRecordDto,
  ) {
    return this.medicalService.createRecord(caseId, createRecordDto);
  }

  @Patch('records/:id')
  @ApiOperation({ summary: 'Update medical record' })
  @ApiResponse({ status: 200, description: 'Medical record updated successfully' })
  updateRecord(@Param('id') id: string, @Body() updateData: any) {
    return this.medicalService.updateRecord(id, updateData);
  }

  // Injuries
  @Get('cases/:caseId/injuries')
  @ApiOperation({ summary: 'Get injuries for a case' })
  @ApiResponse({ status: 200, description: 'Injuries retrieved successfully' })
  getInjuries(@Param('caseId') caseId: string) {
    return this.medicalService.getInjuries(caseId);
  }

  @Post('cases/:caseId/injuries')
  @ApiOperation({ summary: 'Add injury to case' })
  @ApiResponse({ status: 201, description: 'Injury created successfully' })
  createInjury(
    @Param('caseId') caseId: string,
    @Body() createInjuryDto: CreateInjuryDto,
  ) {
    return this.medicalService.createInjury(caseId, createInjuryDto);
  }

  @Patch('injuries/:id')
  @ApiOperation({ summary: 'Update injury' })
  @ApiResponse({ status: 200, description: 'Injury updated successfully' })
  updateInjury(@Param('id') id: string, @Body() updateData: any) {
    return this.medicalService.updateInjury(id, updateData);
  }

  // Medical Summary
  @Get('cases/:caseId/summary')
  @ApiOperation({ summary: 'Get medical summary for a case' })
  @ApiResponse({ status: 200, description: 'Medical summary retrieved successfully' })
  getMedicalSummary(@Param('caseId') caseId: string) {
    return this.medicalService.getMedicalSummary(caseId);
  }
}

// src/modules/medical/medical.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMedicalProviderDto } from './dto/create-medical-provider.dto';
import { UpdateMedicalProviderDto } from './dto/update-medical-provider.dto';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { CreateInjuryDto } from './dto/create-injury.dto';

@Injectable()
export class MedicalService {
  constructor(private readonly prisma: PrismaService) {}

  // Medical Providers
  async getProviders(caseId: string) {
    const providers = await this.prisma.medicalProvider.findMany({
      where: { caseId },
      include: {
        medicalRecords: {
          select: {
            id: true,
            date: true,
            type: true,
            cost: true,
            billReceived: true,
            recordsReceived: true,
          },
        },
        _count: {
          select: {
            medicalRecords: true,
          },
        },
      },
      orderBy: { dateFirstSeen: 'asc' },
    });

    return providers;
  }

  async createProvider(caseId: string, createProviderDto: CreateMedicalProviderDto) {
    const provider = await this.prisma.medicalProvider.create({
      data: {
        ...createProviderDto,
        caseId,
      },
      include: {
        medicalRecords: true,
      },
    });

    return provider;
  }

  async updateProvider(id: string, updateProviderDto: UpdateMedicalProviderDto) {
    const provider = await this.prisma.medicalProvider.findUnique({
      where: { id },
    });

    if (!provider) {
      throw new NotFoundException('Medical provider not found');
    }

    const updatedProvider = await this.prisma.medicalProvider.update({
      where: { id },
      data: updateProviderDto,
      include: {
        medicalRecords: true,
      },
    });

    return updatedProvider;
  }

  async deleteProvider(id: string) {
    const provider = await this.prisma.medicalProvider.findUnique({
      where: { id },
    });

    if (!provider) {
      throw new NotFoundException('Medical provider not found');
    }

    await this.prisma.medicalProvider.delete({
      where: { id },
    });

    return { message: 'Medical provider deleted successfully' };
  }

  // Medical Records
  async getRecords(caseId: string, query: any) {
    const { providerId, type, billReceived, recordsReceived } = query;

    const where: any = { caseId };
    if (providerId) where.providerId = providerId;
    if (type) where.type = type;
    if (billReceived !== undefined) where.billReceived = billReceived === 'true';
    if (recordsReceived !== undefined) where.recordsReceived = recordsReceived === 'true';

    const records = await this.prisma.medicalRecord.findMany({
      where,
      include: {
        provider: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
      },
      orderBy: { date: 'desc' },
    });

    return records;
  }

  async createRecord(caseId: string, createRecordDto: CreateMedicalRecordDto) {
    const record = await this.prisma.medicalRecord.create({
      data: {
        ...createRecordDto,
        caseId,
      },
      include: {
        provider: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
      },
    });

    // Update provider total bills if cost is provided
    if (createRecordDto.cost && createRecordDto.providerId) {
      await this.updateProviderTotalBills(createRecordDto.providerId);
    }

    return record;
  }

  async updateRecord(id: string, updateData: any) {
    const record = await this.prisma.medicalRecord.findUnique({
      where: { id },
    });

    if (!record) {
      throw new NotFoundException('Medical record not found');
    }

    const updatedRecord = await this.prisma.medicalRecord.update({
      where: { id },
      data: updateData,
      include: {
        provider: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
      },
    });

    // Update provider total bills if cost changed
    if (record.providerId && (updateData.cost !== undefined)) {
      await this.updateProviderTotalBills(record.providerId);
    }

    return updatedRecord;
  }

  // Injuries
  async getInjuries(caseId: string) {
    const injuries = await this.prisma.injury.findMany({
      where: { caseId },
      orderBy: { dateReported: 'asc' },
    });

    return injuries;
  }

  async createInjury(caseId: string, createInjuryDto: CreateInjuryDto) {
    const injury = await this.prisma.injury.create({
      data: {
        ...createInjuryDto,
        caseId,
      },
    });

    return injury;
  }

  async updateInjury(id: string, updateData: any) {
    const injury = await this.prisma.injury.findUnique({
      where: { id },
    });

    if (!injury) {
      throw new NotFoundException('Injury not found');
    }

    const updatedInjury = await this.prisma.injury.update({
      where: { id },
      data: updateData,
    });

    return updatedInjury;
  }

  // Medical Summary
  async getMedicalSummary(caseId: string) {
    const [providers, records, injuries, totalBills] = await Promise.all([
      this.prisma.medicalProvider.count({
        where: { caseId },
      }),
      this.prisma.medicalRecord.count({
        where: { caseId },
      }),
      this.prisma.injury.findMany({
        where: { caseId },
        select: {
          severity: true,
          resolved: true,
        },
      }),
      this.prisma.medicalProvider.aggregate({
        where: { caseId },
        _sum: {
          totalBills: true,
        },
      }),
    ]);

    // Group injuries by severity
    const injuriesBySeverity = injuries.reduce((acc, injury) => {
      acc[injury.severity] = (acc[injury.severity] || 0) + 1;
      return acc;
    }, {});

    const resolvedInjuries = injuries.filter(injury => injury.resolved).length;

    return {
      providers: {
        total: providers,
      },
      records: {
        total: records,
      },
      injuries: {
        total: injuries.length,
        resolved: resolvedInjuries,
        active: injuries.length - resolvedInjuries,
        bySeverity: injuriesBySeverity,
      },
      financials: {
        totalMedicalBills: totalBills._sum.totalBills || 0,
      },
    };
  }

  // Helper method to update provider total bills
  private async updateProviderTotalBills(providerId: string) {
    const totalBills = await this.prisma.medicalRecord.aggregate({
      where: { providerId },
      _sum: {
        cost: true,
      },
    });

    await this.prisma.medicalProvider.update({
      where: { id: providerId },
      data: {
        totalBills: totalBills._sum.cost || 0,
      },
    });
  }
}

// src/modules/medical/dto/create-medical-provider.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEnum,
  IsDateString,
  IsDecimal,
} from 'class-validator';
import { ProviderStatus } from '@prisma/client';

export class CreateMedicalProviderDto {
  @ApiProperty({ example: 'Newport Beach Medical Center' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Emergency Room' })
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiPropertyOptional({ example: '(714) 760-5555' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ example: 'contact@hospital.com' })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional({ example: '1100 Newport Center Dr, Newport Beach, CA 92660' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ example: '2015-09-20' })
  @IsOptional()
  @IsDateString()
  dateFirstSeen?: string;

  @ApiPropertyOptional({ example: '2015-09-20' })
  @IsOptional()
  @IsDateString()
  dateLastSeen?: string;

  @ApiPropertyOptional({ example: 15420.00 })
  @IsOptional()
  @IsDecimal()
  totalBills?: number;

  @ApiPropertyOptional({ enum: ProviderStatus, example: ProviderStatus.ACTIVE })
  @IsOptional()
  @IsEnum(ProviderStatus)
  status?: ProviderStatus = ProviderStatus.ACTIVE;
}

// src/modules/medical/dto/update-medical-provider.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateMedicalProviderDto } from './create-medical-provider.dto';

export class UpdateMedicalProviderDto extends PartialType(CreateMedicalProviderDto) {}

// src/modules/medical/dto/create-medical-record.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDateString,
  IsDecimal,
  IsBoolean,
  IsUUID,
} from 'class-validator';

export class CreateMedicalRecordDto {
  @ApiProperty({ example: '2015-09-20' })
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @ApiProperty({ example: 'Emergency Visit' })
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiProperty({ example: 'Initial trauma assessment and X-rays' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiPropertyOptional({ example: 3420.00 })
  @IsOptional()
  @IsDecimal()
  cost?: number = 0;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  billReceived?: boolean = false;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  recordsReceived?: boolean = false;

  @ApiPropertyOptional({ example: 'Investigation' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ example: 'provider-uuid-here' })
  @IsOptional()
  @IsUUID()
  providerId?: string;
}

// src/modules/medical/dto/create-injury.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEnum,
  IsDateString,
  IsBoolean,
} from 'class-validator';
import { InjurySeverity } from '@prisma/client';

export class CreateInjuryDto {
  @ApiProperty({ example: 'Right Knee' })
  @IsNotEmpty()
  @IsString()
  bodyPart: string;

  @ApiProperty({ example: 'Torn ACL and meniscus damage' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ enum: InjurySeverity, example: InjurySeverity.SEVERE })
  @IsEnum(InjurySeverity)
  severity: InjurySeverity;

  @ApiProperty({ example: '2015-09-20' })
  @IsNotEmpty()
  @IsDateString()
  dateReported: string;

  @ApiProperty({ example: 'Surgically repaired, ongoing PT' })
  @IsNotEmpty()
  @IsString()
  currentStatus: string;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  resolved?: boolean = false;
}