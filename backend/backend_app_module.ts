import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

// Core modules
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ClientsModule } from './modules/clients/clients.module';
import { CasesModule } from './modules/cases/cases.module';
import { MedicalModule } from './modules/medical/medical.module';
import { IncidentModule } from './modules/incident/incident.module';
import { InsuranceModule } from './modules/insurance/insurance.module';
import { DocumentsModule } from './modules/documents/documents.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { NotesModule } from './modules/notes/notes.module';
import { SettlementsModule } from './modules/settlements/settlements.module';
import { ReportsModule } from './modules/reports/reports.module';

// Configuration
import configuration from './config/configuration';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),

    // Rate limiting
    ThrottlerModule.forRoot([{
      ttl: 60000, // 1 minute
      limit: 100, // 100 requests per minute
    }]),

    // Static file serving for uploads
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),

    // Core modules
    PrismaModule,
    AuthModule,
    UsersModule,
    ClientsModule,
    CasesModule,
    MedicalModule,
    IncidentModule,
    InsuranceModule,
    DocumentsModule,
    TasksModule,
    NotesModule,
    SettlementsModule,
    ReportsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}