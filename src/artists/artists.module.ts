import { Module } from '@nestjs/common';
import { PrismaModule } from '../database/prisma.module';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';

@Module({
  imports: [PrismaModule],
  controllers: [ArtistsController],
  providers: [ArtistsService],
  exports: [ArtistsService],
})
export class ArtistsModule {}
