import { compose } from 'recompose';

import GalleryCardParentComponent from '../GalleryCardParentComponent';
import { fetchBookByBookIdHOC } from '../../hocs/fetchBookByBookIdHOC';


class BookmarkBookGalleryCard extends GalleryCardParentComponent {

}

export default compose(fetchBookByBookIdHOC)(BookmarkBookGalleryCard);
