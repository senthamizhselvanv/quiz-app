import React, { useEffect, useState } from "react";
import { quiz } from "./constants/questionBank";
import { Container, Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import PieChart from "react-js-pie-chart";

const data = [
  { value: "", name: "Correct answer" },
  { value: "", name: "Wrong answer" },
];

function Quiz() {
  const [questionBank, setQuistionBank] = useState(1);
  const [check, setCheck] = useState();
  const [seconds, setSeconds] = useState(60);
  const [answer, setAnswer] = useState([]);
  const [result, setResult] = useState(0);
  const [checkBoxValue, setCheckBoxValue] = useState("");
  const [disable, setDisable] = useState(false);
  const [enable, setEnable] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (seconds === 0) {
        nextQuestion();
        setSeconds(60);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  useEffect(() => {
    const ans = quiz.map((answ) => {
      return answ.answer;
    });
    setAnswer(ans);
  }, []);

  const firstQuestion = () => {
    setQuistionBank(1);
  };

  const previousQuestion = () => {
    if (questionBank > 1) {
      setQuistionBank((prevState) => prevState - 1);
    }
  };

  const nextQuestion = () => {
    if (questionBank < 10) {
      setQuistionBank((prevState) => prevState + 1);
      setCheck("");
      setSeconds(60);
      if (answer.includes(checkBoxValue)) {
        setResult((prevState) => prevState + 1);
      } else {
        setResult((prevState) => prevState);
      }
      if (checkBoxValue !== "") {
        setDisable(true);
      }
    } else if (questionBank === 10) {
      if (answer.includes(checkBoxValue)) {
        setResult((prevState) => prevState + 1);
        setQuistionBank((prevState) => prevState + 1);
        setEnable(false);
        data[0].value = result + 1;
        data[1].value = 9 - result;
      } else {
        setResult((prevState) => prevState);
        setQuistionBank((prevState) => prevState + 1);
        setEnable(false);
        data[0].value = result;
        data[1].value = 10 - result;
      }
    }
  };

  const lastQuestion = () => {
    setQuistionBank(10);
    setCheck("");
  };

  const handleClick = (e, indx) => {
    setCheckBoxValue(e.target.value);
    setCheck(indx);
  };

  return (
    <Container>
      {enable ? (
        <>
          <Row className="align-items-center min-vh-100">
            <Col className="d-flex justify-content-center">
              <div className="card">
                <div
                  className="card-body"
                  style={{ height: "290px", width: "620px" }}
                >
                  <div className="d-flex">
                    <label
                      style={{
                        fontSize: "16px",
                      }}
                    >
                      <b>
                        Question {questionBank} of {quiz.length}
                      </b>
                    </label>
                    <label
                      className="ms-auto"
                      style={{
                        fontSize: "18px",
                        color: "red",
                      }}
                    >
                      <b>
                        {seconds > 0 ? (
                          <p>
                            {seconds < 10 ? (
                              <label style={{ color: "red" }}>0{seconds}</label>
                            ) : (
                              <label style={{ color: "green" }}>
                                {seconds}
                              </label>
                            )}
                          </p>
                        ) : (
                          <p>00</p>
                        )}
                      </b>
                    </label>
                  </div>
                  <hr className="m-0" />
                  <div>
                    {quiz.map((questions, index) => (
                      <div key={index}>
                        {questionBank - 1 === index && (
                          <>
                            <div className="mb-3 mt-3">
                              <h5>
                                {index + 1}. {questions.question}
                              </h5>
                            </div>
                            {questions.option.map((opt, indx) => (
                              <p style={{ fontSize: "18px" }} key={indx}>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <label style={{ cursor: "pointer" }}>
                                  <input
                                    type={"checkbox"}
                                    onChange={(e) =>
                                      handleClick(e, indx, index)
                                    }
                                    value={opt}
                                    name={opt}
                                    checked={check === indx}
                                  />{" "}
                                  {opt}
                                </label>
                              </p>
                            ))}
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <hr className="m-0" />
                <div className="d-flex justify-content-center mt-1 mb-1">
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    type="button"
                    onClick={firstQuestion}
                    disabled={disable}
                  >
                    First
                  </button>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    type="button"
                    onClick={previousQuestion}
                    disabled={disable}
                  >
                    Prev
                  </button>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    type="button"
                    onClick={nextQuestion}
                  >
                    Next
                  </button>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    type="button"
                    onClick={lastQuestion}
                    disabled={disable}
                  >
                    Last
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </>
      ) : (
        <>
          <div
            className="d-flex justify-content-center"
            style={{ marginTop: "20%" }}
          >
            <div style={{ width: "400px" }}>
              <PieChart
                data={data}
                width={300}
                height={300}
                thickness={70}
                colors={[
                  "#248ec2",
                  "#1b67d3",
                  "#1d35e2",
                  "rgb(0, 0, 100)",
                  "#000000",
                ]}
                legendPosition="left"
                animation
              />
            </div>
          </div>
        </>
      )}
    </Container>
  );
}

export default Quiz;
