export class User {
  id: number | null;
  name: string;
  age: number;

  constructor(id: number | null, name: string, age: number) {
    this.id = id;
    this.name = name;
    this.age = age;
  }
}
