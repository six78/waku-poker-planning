import { generateGuid } from '../shared/guid';

export interface IUserModel {
  id: string;
  name: string;
  isDealer: boolean;
}

abstract class BaseUserService {
  private readonly storageKey = 'USER'

  protected saveToStorage(data: IUserModel): void {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  protected getFromStorage(): IUserModel | null {
    const item = localStorage.getItem(this.storageKey);

    try {
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  }
}

export class UserActivationService extends BaseUserService {
  public readonly isUserExists: boolean;

  constructor() {
    super();
    this.isUserExists = this.getFromStorage() !== null;
  }

  public saveUser(name: string): void {
    this.saveToStorage({
      id: generateGuid(),
      isDealer: false,
      name
    })
  }

}

export class CurrentUserService extends BaseUserService {
  public readonly id: string;
  public readonly name: string;
  public readonly host: boolean;

  constructor() {
    super();
    const data = this.getFromStorage();

    if (!data) {
      // TODO:
      throw new Error();
    }

    this.id = data.id;
    this.name = data.name;
    this.host = data.isDealer;
  }
}