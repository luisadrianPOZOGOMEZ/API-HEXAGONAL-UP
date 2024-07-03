export class Publicity {
  id: number | null;
  description: string;
  image: string;
  image_s3: string;

  constructor(
    id: number | null,
    description: string,
    image: string,
    image_s3: string
  ) {
    this.id = id;
    this.description = description;
    this.image = image;
    this.image_s3 = image_s3;
  }
}
