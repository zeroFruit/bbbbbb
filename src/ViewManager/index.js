export default class ViewManager {
  constructor(
    _headerType,
    _titleType,
    _getHeaderPropsMtd = (() => {}),
    _getTitlePropsMtd = (() => {})
  ) {
    this._headerType = _headerType;
    this._titleType = _titleType;
    this._getHeaderPropsMtd = _getHeaderPropsMtd;
    this._getTitlePropsMtd = _getTitlePropsMtd;
  }

  getHeaderProps(props) {
    return this._getHeaderPropsMtd(props);
  }

  getTitleProps(props) {
    return this._getTitlePropsMtd(props);
  }

  getHeaderType() {
    return this._headerType;
  }
  
  getTitleType() {
    return this._titleType;
  }
}
