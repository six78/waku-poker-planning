const LOCAL_STORAGE_KEY = 'CURRENT_USER_NAME';

export class CurrentUserService {
  public readonly name = localStorage.getItem(LOCAL_STORAGE_KEY)!;
  public readonly host = localStorage.getItem('CURRENT_USER_HOST')!;

  public validate(): void {
    if (!this.name) {
      throw new Error(`Запусти в консоли команду localStorage.setItem("${LOCAL_STORAGE_KEY}", "тут_напиши_имя")`);
    }
  }
}