import { Injectable } from '@nestjs/common';
import { UserRegisterRequestDto } from './dto/user-register.req.dto';
import { User } from './user.entity';
import { FindOneOptions } from 'typeorm';
import { CatsEntity } from 'src/cats/cats.entity';

@Injectable()
export class UserService {
  async doUserRegistration(
    userRegister: UserRegisterRequestDto,
  ): Promise<User> {
    const user = new User();
    user.name = userRegister.name;
    user.email = userRegister.email;
    user.password = userRegister.password;

    return await user.save();
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return User.findOne({ where: { email } });
  }

  async getUserById(id: number): Promise<User | undefined> {
    return User.findOne({ where: { id } });
  }

  async addCatToUser(userId: number, catId: number): Promise<void> {
    const userOptions: FindOneOptions<User> = {
      where: { id: userId },
      relations: ['cats'], // Include cats relation (optional, depending on your needs)
    };
  
    const user = await User.findOne(userOptions);
  
    if (!user) {
      throw new Error('User not found');
    }
  
    const cat = await CatsEntity.findOne({where: { id: catId }});
  
    if (!cat) {
      throw new Error('Cat not found');
    }
  
    // Check if the cat is already associated with the user (optional)
    const existingAssociation = user.cats.find((existingCat) => existingCat.id === catId);
    if (existingAssociation) {
      throw new Error('Cat already associated with this user');
    }
  
    // Ensure you have a valid Cat entity object
    user.cats.push(cat);
  
    // Save the updated user entity (including the updated cats collection)
    await user.save();
  }
}
