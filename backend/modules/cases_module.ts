// src/modules/cases/cases.module.ts
import { Module } from '@nestjs/common';
import { CasesController } from './cases.controller';
import { CasesService } from './cases.service';

@Module({
  controllers: [CasesController],
  providers: [CasesService],
  exports: [CasesService],
})
export class CasesModule {}

// src/modules/cases/cases.controller.ts
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
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CasesService } from './cases.service';
import { CreateCaseDto } from './dto/create-case.dto';
import { UpdateCaseDto } from './dto/update-case.dto';
import { QueryCasesDto } from './dto/query-cases.dto';
import { AssignUserToCaseDto } from './dto/assign-user-to-case.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Cases')
@Controller('cases')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class CasesController {
  constructor(private readonly casesService: CasesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new case' })
  @ApiResponse({ status: 201, description: 'Case created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createCaseDto: CreateCaseDto, @Request() req) {
    return this.casesService.create(createCaseDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all cases' })
  @ApiResponse({ status: 200, description: 'Cases retrieved successfully' })
  findAll(@Query() queryDto: QueryCasesDto) {
    return this.casesService.findAll(queryDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get case by ID' })
  @ApiResponse({ status: 200, description: 'Case retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Case not found' })
  findOne(@Param('id') id: string) {
    return this.casesService.findOne(id);
  }

  @Get(':id/overview')
  @ApiOperation({ summary: 'Get case overview with summary statistics' })
  @ApiResponse({ status: 200, description: 'Case overview retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Case not found' })
  getOverview(@Param('id') id: string) {
    return this.casesService.getCaseOverview(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update case' })
  @ApiResponse({ status: 200, description: 'Case updated successfully' })
  @ApiResponse({ status: 404, description: 'Case not found' })
  update(@Param('id') id: string, @Body() updateCaseDto: UpdateCaseDto) {
    return this.casesService.update(id, updateCaseDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete case' })
  @ApiResponse({ status: 200, description: 'Case deleted successfully' })
  @ApiResponse({ status: 404, description: 'Case not found' })
  remove(@Param('id') id: string) {
    return this.casesService.remove(id);
  }

  @Post(':id/assignments')
  @ApiOperation({ summary: 'Assign user to case' })
  @ApiResponse({ status: 201, description: 'User assigned to case successfully' })
  assignUser(@Param('id') id: string, @Body() assignDto: AssignUserToCaseDto) {
    return this.casesService.assignUser(id, assignDto);
  }

  @Delete(':id/assignments/:userId')
  @ApiOperation({ summary: 'Remove user assignment from case' })
  @ApiResponse({ status: 200, description: 'User assignment removed successfully' })
  removeAssignment(@Param('id') id: string, @Param('userId') userId: string) {
    return this.casesService.removeAssignment(id, userId);
  }

  @Get(':id/tasks')
  @ApiOperation({ summary: 'Get case tasks' })
  @ApiResponse({ status: 200, description: 'Case tasks retrieved successfully' })
  getTasks(@Param('id') id: string, @Query() query: any) {
    return this.casesService.getCaseTasks(id, query);
  }

  @Get(':id/documents')
  @ApiOperation({ summary: 'Get case documents' })
  @ApiResponse({ status: 200, description: 'Case documents retrieved successfully' })
  getDocuments(@Param('id') id: string, @Query() query: any) {
    return this.casesService.getCaseDocuments(id, query);
  }

  @Get(':id/timeline')
  @ApiOperation({ summary: 'Get case timeline/activity feed' })
  @ApiResponse({ status: 200, description: 'Case timeline retrieved successfully' })
  getTimeline(@Param('id') id: string) {
    return this.casesService.getCaseTimeline(id);
  }
}

// src/modules/cases/cases.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCaseDto } from './dto/create-case.dto';
import { UpdateCaseDto } from './dto/update-case.dto';
import { QueryCasesDto } from './dto/query-cases.dto';
import { AssignUserToCaseDto } from './dto/assign-user-to-case.dto';

@Injectable()
export class CasesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCaseDto: CreateCaseDto, createdById: string) {
    // Generate case number if not provided
    const caseNumber = createCaseDto.caseNumber || await this.generateCaseNumber();

    const caseRecord = await this.prisma.case.create({
      data: {
        ...createCaseDto,
        caseNumber,
        createdById,
      },
      include: {
        client: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        createdBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
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
      },
    });

    // Automatically assign the creator as primary attorney
    await this.assignUser(caseRecord.id, {
      userId: createdById,
      role: 'Primary Attorney',
    });

    return caseRecord;
  }

  async findAll(queryDto: QueryCasesDto) {
    const { page = 1, limit = 10, search, status, caseType, clientId, assignedTo } = queryDto;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.OR = [
        { caseNumber: { contains: search, mode: 'insensitive' } },
        { title: { contains: search, mode: 'insensitive' } },
        { client: {
          OR: [
            { firstName: { contains: search, mode: 'insensitive' } },
            { lastName: { contains: search, mode: 'insensitive' } },
          ],
        }},
      ];
    }

    if (status) where.status = status;
    if (caseType) where.caseType = caseType;
    if (clientId) where.clientId = clientId;
    if (assignedTo) {
      where.assignments = {
        some: { userId: assignedTo },
      };
    }

    const [cases, total] = await Promise.all([
      this.prisma.case.findMany({
        where,
        skip,
        take: limit,
        include: {
          client: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
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
          _count: {
            select: {
              tasks: true,
              documents: true,
              medicalProviders: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.case.count({ where }),
    ]);

    return {
      data: cases,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const caseRecord = await this.prisma.case.findUnique({
      where: { id },
      include: {
        client: true,
        createdBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            role: true,
          },
        },
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
          include: {
            assignedTo: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
          orderBy: { dueDate: 'asc' },
          take: 10,
        },
        notes: {
          include: {
            author: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
      },
    });

    if (!caseRecord) {
      throw new NotFoundException('Case not found');
    }

    return caseRecord;
  }

  async getCaseOverview(id: string) {
    const caseRecord = await this.findOne(id);

    // Get additional statistics
    const [
      medicalBillsTotal,
      documentsCount,
      tasksStats,
      insurancePolicies,
    ] = await Promise.all([
      this.prisma.medicalProvider.aggregate({
        where: { caseId: id },
        _sum: { totalBills: true },
      }),
      this.prisma.document.count({
        where: { caseId: id },
      }),
      this.prisma.caseTask.groupBy({
        by: ['status'],
        where: { caseId: id },
        _count: true,
      }),
      this.prisma.insurancePolicy.findMany({
        where: { caseId: id },
        select: {
          id: true,
          type: true,
          company: true,
          status: true,
          premium: true,
        },
      }),
    ]);

    return {
      ...caseRecord,
      statistics: {
        totalMedicalBills: medicalBillsTotal._sum.totalBills || 0,
        documentsCount,
        tasksStats: tasksStats.reduce((acc, stat) => {
          acc[stat.status.toLowerCase()] = stat._count;
          return acc;
        }, {}),
        insurancePolicies,
        caseAge: this.calculateCaseAge(caseRecord.dateOfLoss),
      },
    };
  }

  async update(id: string, updateCaseDto: UpdateCaseDto) {
    const caseRecord = await this.findOne(id);

    const updatedCase = await this.prisma.case.update({
      where: { id },
      data: updateCaseDto,
      include: {
        client: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
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
      },
    });

    return updatedCase;
  }

  async remove(id: string) {
    const caseRecord = await this.findOne(id);

    await this.prisma.case.delete({
      where: { id },
    });

    return { message: 'Case deleted successfully' };
  }

  async assignUser(caseId: string, assignDto: AssignUserToCaseDto) {
    const caseRecord = await this.findOne(caseId);

    // Check if user exists
    const user = await this.prisma.user.findUnique({
      where: { id: assignDto.userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if assignment already exists
    const existingAssignment = await this.prisma.caseAssignment.findUnique({
      where: {
        caseId_userId_role: {
          caseId,
          userId: assignDto.userId,
          role: assignDto.role,
        },
      },
    });

    if (existingAssignment) {
      throw new BadRequestException('User already assigned to this role');
    }

    const assignment = await this.prisma.caseAssignment.create({
      data: {
        caseId,
        userId: assignDto.userId,
        role: assignDto.role,
      },
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
    });

    return assignment;
  }

  async removeAssignment(caseId: string, userId: string) {
    const assignment = await this.prisma.caseAssignment.findFirst({
      where: {
        caseId,
        userId,
      },
    });

    if (!assignment) {
      throw new NotFoundException('Assignment not found');
    }

    await this.prisma.caseAssignment.delete({
      where: { id: assignment.id },
    });

    return { message: 'Assignment removed successfully' };
  }

  async getCaseTasks(caseId: string, query: any) {
    const { status, assignedTo, limit = 20 } = query;

    const where: any = { caseId };
    if (status) where.status = status;
    if (assignedTo) where.assignedToId = assignedTo;

    const tasks = await this.prisma.caseTask.findMany({
      where,
      include: {
        assignedTo: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        createdBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: [
        { status: 'asc' },
        { dueDate: 'asc' },
      ],
      take: limit,
    });

    return tasks;
  }

  async getCaseDocuments(caseId: string, query: any) {
    const { type, category, limit = 50 } = query;

    const where: any = { caseId };
    if (type) where.type = type;
    if (category) where.category = category;

    const documents = await this.prisma.document.findMany({
      where,
      include: {
        uploadedBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: { uploadedAt: 'desc' },
      take: limit,
    });

    return documents;
  }

  async getCaseTimeline(caseId: string) {
    // This is a simplified timeline - in a real app, you'd combine multiple tables
    const [tasks, notes, documents] = await Promise.all([
      this.prisma.caseTask.findMany({
        where: { caseId },
        include: {
          assignedTo: { select: { firstName: true, lastName: true } },
          createdBy: { select: { firstName: true, lastName: true } },
        },
        orderBy: { createdAt: 'desc' },
        take: 10,
      }),
      this.prisma.caseNote.findMany({
        where: { caseId },
        include: {
          author: { select: { firstName: true, lastName: true } },
        },
        orderBy: { createdAt: 'desc' },
        take: 10,
      }),
      this.prisma.document.findMany({
        where: { caseId },
        include: {
          uploadedBy: { select: { firstName: true, lastName: true } },
        },
        orderBy: { uploadedAt: 'desc' },
        take: 5,
      }),
    ]);

    // Combine and sort all activities
    const timeline = [
      ...tasks.map(task => ({
        type: 'task',
        id: task.id,
        title: task.title,
        description: task.description,
        date: task.createdAt,
        user: task.assignedTo || task.createdBy,
        status: task.status,
      })),
      ...notes.map(note => ({
        type: 'note',
        id: note.id,
        title: note.title || 'Case Note',
        description: note.content,
        date: note.createdAt,
        user: note.author,
        status: 'created',
      })),
      ...documents.map(doc => ({
        type: 'document',
        id: doc.id,
        title: doc.name,
        description: `Document uploaded: ${doc.type}`,
        date: doc.uploadedAt,
        user: doc.uploadedBy,
        status: 'uploaded',
      })),
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return timeline;
  }

  private async generateCaseNumber(): Promise<string> {
    const year = new Date().getFullYear();
    const count = await this.prisma.case.count({
      where: {
        caseNumber: {
          startsWith: `LE-${year}-`,
        },
      },
    });

    return `LE-${year}-${String(count + 1).padStart(3, '0')}`;
  }

  private calculateCaseAge(dateOfLoss: Date | null): number {
    if (!dateOfLoss) return 0;
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - new Date(dateOfLoss).getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
}

// src/modules/cases/dto/create-case.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEnum,
  IsDateString,
  IsUUID,
} from 'class-validator';
import { CaseType, CaseStatus } from '@prisma/client';

export class CreateCaseDto {
  @ApiPropertyOptional({ example: 'LE-2024-001' })
  @IsOptional()
  @IsString()
  caseNumber?: string;

  @ApiProperty({ example: 'Thowerd v. Martinez - Auto Accident' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ enum: CaseType, example: CaseType.AUTO_ACCIDENT })
  @IsEnum(CaseType)
  caseType: CaseType;

  @ApiPropertyOptional({ example: '2015-09-20' })
  @IsOptional()
  @IsDateString()
  dateOfLoss?: string;

  @ApiPropertyOptional({ enum: CaseStatus, example: CaseStatus.ACTIVE })
  @IsOptional()
  @IsEnum(CaseStatus)
  status?: CaseStatus = CaseStatus.ACTIVE;

  @ApiPropertyOptional({
    example: 'T-bone collision at controlled intersection',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'Referral from Friend' })
  @IsOptional()
  @IsString()
  referralSource?: string;

  @ApiPropertyOptional({ example: 'John Smith' })
  @IsOptional()
  @IsString()
  referralName?: string;

  @ApiProperty({ example: 'client-uuid-here' })
  @IsNotEmpty()
  @IsUUID()
  clientId: string;
}

// src/modules/cases/dto/update-case.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateCaseDto } from './create-case.dto';

export class UpdateCaseDto extends PartialType(CreateCaseDto) {}

// src/modules/cases/dto/query-cases.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEnum, IsInt, Min, Max, IsString, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { CaseStatus, CaseType } from '@prisma/client';

export class QueryCasesDto {
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

  @ApiPropertyOptional({ example: 'Thowerd' })
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

  @ApiPropertyOptional({ example: 'client-uuid-here' })
  @IsOptional()
  @IsUUID()
  clientId?: string;

  @ApiPropertyOptional({ example: 'user-uuid-here' })
  @IsOptional()
  @IsUUID()
  assignedTo?: string;
}

// src/modules/cases/dto/assign-user-to-case.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class AssignUserToCaseDto {
  @ApiProperty({ example: 'user-uuid-here' })
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({ example: 'Primary Attorney' })
  @IsNotEmpty()
  @IsString()
  role: string;
}