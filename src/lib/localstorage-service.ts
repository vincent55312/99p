class LocalStorageService {
  static setItem(key: string, value: any): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`Error setting item ${key} in localStorage`, error);
    }
  }

  static getItem(key: string): any {
    try {
      const serializedValue = localStorage.getItem(key);
      if (serializedValue === null) {
        return null;
      }
      return JSON.parse(serializedValue);
    } catch (error) {
      console.error(`Error getting item ${key} from localStorage`, error);
      return null;
    }
  }

  static removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item ${key} from localStorage`, error);
    }
  }

  static clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage', error);
    }
  }
}

class LoginStorage {
  static isLoggedIn(): boolean {
    const user = LocalStorageService.getItem('user');
    if (user && user.username === 'admin' && user.password === 'admin') {
      return true;
    }
    return false;
  }

  static setLogin(username: string, password: string): void {
    LocalStorageService.setItem('user', { username, password });
  }

  static logout(): void {
    LocalStorageService.removeItem('user');
  }
}

export { LoginStorage, LocalStorageService };
