import Alert from "react-bootstrap/Alert";

function Message(props) {
  const renderList = () => {
    return props.data.map((error, idx) => {
      return <li key={idx}>{error}</li>;
    });
  };
  if (Array.isArray(props.data)) {
    return (
      <Alert variant={props.variant} className="error-alert">
        <Alert.Heading>Oh snap! You got some errors!</Alert.Heading>
        <ol>{renderList()}</ol>
      </Alert>
    );
  }
  return (
    <Alert variant={props.variant} className="error-alert">
      <Alert.Heading>{props.data}</Alert.Heading>
    </Alert>
  );
}

export default Message;
