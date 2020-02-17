import React from 'react';
import {Grid, Col, Row} from 'react-flexbox-grid';
import TreatmentsTable from './components/TreatmentsTable';
import './App.css';

function App() {
  return (
    <Grid>
      <Row>
        <Col sm={12}>
          <h1>Treatments</h1>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <TreatmentsTable></TreatmentsTable>
        </Col>
      </Row>
    </Grid>
  );
}

export default App;
