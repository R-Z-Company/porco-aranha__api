import { ThumbnailInterface } from '../marvel-client/interfaces/thumbnail.interface';

export const buildThumbnailUrl = ({ path, extension }: ThumbnailInterface) => {
  if (!path || !extension) return '';

  return path + '.' + extension;
};
