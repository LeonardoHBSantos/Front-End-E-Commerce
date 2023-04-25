export function changeIptSearch({ target }) {
  const { value } = target;
  this.setState({
    searchInput: value,
  });
}

export function changeIptsFormAvaliation(event) {
  const { target } = event;
  const { name, value } = target;
  this.setState({
    [name]: value,
  });
}
