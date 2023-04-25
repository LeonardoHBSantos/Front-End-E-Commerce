export function changeInputs({ target: { name, value } }) {
  this.setState({
    [name]: value,
  });
}
