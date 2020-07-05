import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MediaEntity } from '../entities/media.entity';
import { Repository } from 'typeorm';
import { MediaDto } from '../dtos/media.dto';

@Injectable()
export class MediaService {

    @InjectRepository(MediaEntity)
    private readonly mediaRepository: Repository<MediaEntity>

    
    findAllMedia(){
        return this.mediaRepository.find({});
    }

    async findOneMedia(photoId: string){
        const photo = await this.mediaRepository.findOne(+photoId);
        if(!photo)
            return null;
        return photo;
    }

    async updateMedia(photoId: string, mediaDto: MediaDto){
        let photo = await this.mediaRepository.findOne(+photoId);
        if(!photo)
            return null;
        await this.mediaRepository.update(photoId,mediaDto);
        photo = await this.mediaRepository.findOne(+photoId);
        return photo;
    }

    async removeMedia(photoId: string){
        const photo = await this.mediaRepository.findOne(+photoId);
        if(!photo)
            return null;
        await this.mediaRepository.delete(+photoId);
        return {deletedId: photoId, nbArtiste: await this.mediaRepository.findAndCount.length};
    }

    async createMedia(mediaDto: MediaDto){       
        const photo = await this.mediaRepository.save(mediaDto);
        return photo;
    }

   /*  async createArtisteMedia(artisteMediaDto: ArtisteMediaDto){       
        const photo = await this.mediaRepository.findOne(artisteMediaDto.photoId);
        if(!photo)
        return null;
        const artistephoto = await this.artisteMediaRepository.save(artisteMediaDto);
        return {updatedId: artisteMediaDto.artisteId, updatedphotoId: artisteMediaDto.artisteId, photo:artistephoto};
    }

    async findOneArtisteMedia(photoId: string, artisteId: string){
        const artisteMedia = await this.artisteMediaRepository.findOne({where: {photoId:photoId,artisteId:artisteId}});
        if(!artisteMedia)
            return null;
        return artisteMedia; 
    }

    async deleteArtisteMedia(photoId: string, artisteId: string){
        const artistMedia = await this.artisteMediaRepository.findOne({where: {photoId:photoId,artisteId:artisteId}});
        if(!artistMedia)
            return null;
       // await this.artisteMediaRepository.delete(+photoId,+artisteId);
       await this.artisteMediaRepository
       .createQueryBuilder()
       .delete()
       .from(ArtisteMediaEntity)
       .where("photoId = :photoId",{photoId: artistMedia.photoId})
       .andWhere("artisteId = :artisteId",{ artisteId: artistMedia.artisteId})
       .execute();
        return {deletedId: photoId, nbArtisteMedia: await this.artisteMediaRepository.findAndCount.length};
    } */

}
