import { Injectable } from '@nestjs/common';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { Model } from 'mongoose';
import { Dog } from './entities/dog.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class DogService {
  @InjectModel(Dog.name)
  private dogModel: Model<Dog>;
  create(createDogDto: CreateDogDto) {
    const dog = new this.dogModel(createDogDto);
    return dog.save();
  }

  findAll() {
    return this.dogModel.find();
  }

  findOne(id: number) {
    return this.dogModel.findById(id);
  }

  update(id: number, updateDogDto: UpdateDogDto) {
    return this.dogModel.findByIdAndUpdate(id, updateDogDto);
  }

  remove(id: number) {
    return this.dogModel.findByIdAndDelete(id);
  }
}
