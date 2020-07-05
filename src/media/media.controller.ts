import { Controller, HttpException, HttpStatus, Logger} from '@nestjs/common';
import { MediaService } from './media.service';
import { MessagePattern} from '@nestjs/microservices';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { MediaEntity } from '../entities/media.entity';
import { MediaDto } from '../dtos/media.dto';

@Controller('media')
export class MediaController {

    constructor(
        private readonly mediaService: MediaService,
    ){}
    
    @MessagePattern({ cmd: 'getMedia' })    
    findAllMedia(){
        return this.mediaService.findAllMedia();
    }
    
    @MessagePattern({ cmd: 'addMedia' })
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: MediaEntity,
      })
    async createMedia(mediaDto: MediaDto){
        const photo = await this.mediaService.createMedia(mediaDto);
        if(photo)
            return photo;
        throw new HttpException('Media not created',HttpStatus.NOT_MODIFIED); 
    }
    
    @MessagePattern({ cmd: 'getMediaById' })
    async findOneMedia(photoId: string){
        Logger.log('Le social dont l"id est '+photoId,'MediaController');
        const photo = await this.mediaService.findOneMedia(photoId);
        if(photo)
            return photo;
        throw new HttpException('Media not found',HttpStatus.NOT_FOUND);        
    }
    
    @MessagePattern({ cmd: 'updateMedia' })
    async updateMedia(data: any[]){
        Logger.log('La photo dont l"id est '+data[0],'MediaController');
        const photo = await this.mediaService.findOneMedia(data[0]);
        if(photo)
            return await this.mediaService.updateMedia(data[0],data[1]);
        throw new HttpException('Media not modified',HttpStatus.NOT_FOUND);
    }
    
    @MessagePattern({ cmd: 'deleteMedia' })
    async removeMedia(photoId: string){
        const photo = await this.mediaService.findOneMedia(photoId);
        if(photo)
            return await this.mediaService.removeMedia(photoId);
         throw new HttpException('Media not modified',HttpStatus.NOT_FOUND);
    }

    /* @MessagePattern({ cmd: 'addArtisteMedia' })
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: ArtisteMediaEntity,
      })
    async createArtisteMedia(artistemediaDto: ArtisteMediaDto){
        Logger.log('La photo dont l"id est '+artistemediaDto.artisteId,'MediaController');
        const photo = await this.mediaService.createArtisteMedia(artistemediaDto);
        if(photo)//{
            return photo;
        //Logger.log('La photo dont l"id est '+artistemediaDto.photoId,'MediaController');}
        throw new HttpException('Artiste Media not created',HttpStatus.NOT_MODIFIED); 
    }

    @MessagePattern({ cmd: 'deleteArtisteMedia' })
    async deleteArtisteMedia(data: any[]){
        Logger.log('L"artiste dont l"id est '+data[1]+' et l"id de l"image est '+data[0],'MediaController'); 
        const artisteMedia = await this.mediaService.findOneArtisteMedia(data[0],data[1]);
        if(artisteMedia)
            return await this.mediaService.deleteArtisteMedia(data[0],data[1])
         throw new HttpException('Artiste Media not deleted',HttpStatus.NOT_FOUND);
    } */
}
