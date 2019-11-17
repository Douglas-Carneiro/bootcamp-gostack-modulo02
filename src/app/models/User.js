import Sequelize, { Model } from 'sequelize';
import brcypt from 'bcryptjs';
import { userInfo } from 'os';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await brcypt.hash(user.password, 8);
      }
    });

    return this;
  }
}

export default User;
