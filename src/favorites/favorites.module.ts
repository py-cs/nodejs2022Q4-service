import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, PrismaService],
  exports: [FavoritesService],
})
export class FavoritesModule {}
