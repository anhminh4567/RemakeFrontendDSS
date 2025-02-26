import { Media } from "./Media";

export class Gallery {
  GalleryFolder: string;
  Thumbnail?: Media;
  BaseImages: Media[];
  Certificates: Media[];
  Gallery: { [key: string]: Media[] };
  constructor() {}
  mapAllImagesToMedia(): Media[] {
    let result = [];
    Object.entries(this["Gallery"]).forEach((tuple) => {
      let [_, values] = tuple;
      result = [...result, values];
    });
    if (this.Thumbnail) {
      result = [...result, this.Thumbnail];
    }
    return result;
  }
}
