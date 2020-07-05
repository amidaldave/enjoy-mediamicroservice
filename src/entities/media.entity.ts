import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from 'typeorm';

//import { ApiProperty } from '@nestjs/swagger;

@Entity('enjoy_media')
export class MediaEntity{

    @PrimaryGeneratedColumn({name:'photo_id', type:'int'})
   // @ApiProperty()
    photoId: number;

    @Column({name:'photo', type:'text'})
    //@ApiProperty()
    photo: string; 

    @Column({name:'photo_detail'})
    //@ApiProperty()
    photoDetails: string; 

   // @Column({name:'artist_id'})
    //@ApiProperty()
   // artistId?: number;

    @CreateDateColumn({name:'create_date'})
    //@ApiProperty()
    createDate: Date;

    @Column({name:'create_by', length:20})
   // @ApiProperty()
    createBy: string;

    @UpdateDateColumn({name:'update_date'})
    //@ApiProperty()
    updateDate: Date;

    @Column({name:'update_by', length:20})
   // @ApiProperty()
    updateBy: string;

    //@OneToMany(type => ArtisteMediaEntity, artistemedia => artistemedia.photo)
    //artistemedias: ArtisteMediaEntity[];

}