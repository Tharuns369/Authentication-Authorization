

export class UserDataServiceProvider {
    async createUser(userObject){
     await userModel.create(userObject)
    }
}