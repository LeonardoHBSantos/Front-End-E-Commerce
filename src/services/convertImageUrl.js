const convertImageUrl = (url) => {
  if (url) {
    const modifiedUrl = url.replace(/-I(\.[^.]+)$/, '-W$1');
    return modifiedUrl;
  }
};

export default convertImageUrl;
