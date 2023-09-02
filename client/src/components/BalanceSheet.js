import Table from "react-bootstrap/Table";
import { months } from "../config/constants";

function BalanceSheet(props) {
    function renderData(){
        return props.data.map((el, idx) => {
            return <tr key={idx}>
                <td>{el.year}</td>
                <td>{months[el.month - 1]}</td>
                <td>{el.assetsValue}</td>
                <td>{el.profitOrLoss}</td>
            </tr>
        });
    }
  return (
    <>
    <h6 className="topbar">Please review your balance sheet before applying</h6>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Year</th>
          <th>Month</th>
          <th>Assets</th>
          <th>Net Profit</th>
        </tr>
        {renderData()}
      </thead>
    </Table>
    </> 
  );
}

export default BalanceSheet;
