import { useState } from "react";
import Topbar from "./Topbar";
import Form from "./BusinessForm";
import api from "../config/api";
import BalanceSheet from "./BalanceSheet";
import { Button } from "react-bootstrap";
import Message from "./Message";

function App() {
  const [showForm, setShowForm] = useState(true);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    taxId: "",
    accountingProvider: "Xero",
    amount: "",
    yearOfEstablishment: "",
  });
  const [balanceSheet, setBalanceSheet] = useState([]);
  const setStateFromField = (label, value) => {
    setFormData({
      ...formData,
      [label]: value,
    });
  };
  const handleSubmit = () => {
    const {
      name,
      email,
      taxId,
      accountingProvider,
      amount,
      yearOfEstablishment,
    } = formData;
    let errorObj = [];
    if (!name) {
      errorObj.push("Business Name is required");
    }
    if (!email) {
      errorObj.push("Business Email is required");
    }
    if (!taxId) {
      errorObj.push("TIN is required");
    }
    if (!accountingProvider) {
      errorObj.push("Accounting Provider is required");
    }
    if (!amount) {
      errorObj.push("Loan Amount is required");
    }
    if (!yearOfEstablishment) {
      errorObj.push("YOE is required");
    }
    if (errorObj.length > 0) {
      setErrors(errorObj);
      return;
    }

    api
      .post("/fetch-balance-sheet", formData)
      .then((res) => {
        console.log(res);
        if (res.status === 200 && res.data && res.data.balanceSheet) {
          setBalanceSheet(res.data.balanceSheet);
          setShowForm(false);
        }
      })
      .catch((err) => {
        if (err && err.response && err.response.data) {
          setErrors(Object.values(err.response.data.error));
        }
      });
  };
  function applyLoan() {
    api
      .post("/apply-loan", {
        taxId: formData.taxId,
        loanAmount: formData.amount,
      })
      .then((res) => {
        if (res && res.data) {
          if (res.data.isLoanApproved) {
            setMessage("Congrats! Your loan is approved.");
          } else {
            setMessage("Sorry! Your loan is not approved.");
          }
        }
      })
      .catch((err) => {
        setMessage("Oops! Something went wrong.")
      });
  }
  return (
    <div className="container">
      <Topbar />
      {message ? <Message data={message} variant="success" /> : <></>}
      {showForm ? (
        <Form
          formData={formData}
          setStateFromField={setStateFromField}
          handleSubmit={handleSubmit}
        />
      ) : (
        <>
          <BalanceSheet data={balanceSheet} />
          <div className="btn-div">
            <Button variant="light" onClick={() => {setMessage(""); setShowForm(true);}}>
              Back
            </Button>
            <Button variant="primary" onClick={applyLoan}>
              Apply Loan
            </Button>
          </div>
        </>
      )}
      {errors.length > 0 ? <Message data={errors} variant="danger" /> : <></>}
    </div>
  );
}

export default App;
