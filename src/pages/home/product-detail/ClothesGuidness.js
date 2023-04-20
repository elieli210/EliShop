import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalOrder({ show, handleCancel }) {
  return (
    <Modal show={show} onHide={handleCancel} dir={"rtl"}>
      <Modal.Header closeButton style={{ gap: "289px" }}>
        <Modal.Title> راهنمای سایز لباس </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Table>
          <thead>
            <tr className="bg-light">
              <th> سایز</th>
              <th> دور سینه</th>
              <th>دور کمر</th>
              <th>دور باسن</th>
              <th>دور بازو</th>
            </tr>
          </thead>
          <thead>
            <tr>
              <td>34</td>
              <td>78-81</td>
              <td>61-64</td>
              <td>86-90</td>
              <td>26</td>
            </tr>
            <tr>
              <td>36</td>
              <td>82-85</td>
              <td>65-68</td>
              <td>91-94</td>
              <td>27</td>
            </tr>
            <tr>
              <td>38</td>
              <td>86-89</td>
              <td>69-72</td>
              <td>95-98</td>
              <td>28</td>
            </tr>
            <tr>
              <td>40</td>
              <td>89-93</td>
              <td>73-76</td>
              <td>99-101</td>
              <td>29</td>
            </tr>
            <tr>
              <td>42</td>
              <td>94-97</td>
              <td>77-80</td>
              <td>102-104</td>
              <td>30</td>
            </tr>
          </thead>
        </Table>
      </Modal.Body>

      <Modal.Footer className="d-flex justify-content-between">
        <Button variant="danger" onClick={(e) => handleCancel(e)}>
          بستن
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalOrder;
