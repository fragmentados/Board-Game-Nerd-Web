import { Injectable } from '@angular/core';
import { BACKEND_URL, BACKEND_MOCKED } from './models/service';
import { Game } from './models/games/game.model';

@Injectable()
export class ImageService {

  public getGameImageUrl(imageUrl: string) {
    if (BACKEND_MOCKED) {
      const imageUrlSplited = imageUrl.split('/');
      return 'assets/images/' + imageUrlSplited[imageUrlSplited.length - 1];
    } else {
      return imageUrl;
    }
  }

  public getImageUrl(name: string, extension: string) {
    if (BACKEND_MOCKED) {
      return 'assets/images/' + name.split(' ').join('') + '.' + extension;
    } else {
      return BACKEND_URL + 'images/' + name.split(' ').join('') + '.' + extension;
    }
  }
}
