import React, {Component} from 'react';
import {getAllTreatments} from './../service/treatments';
import {Grid, Col, Row} from 'react-flexbox-grid';
import DataTable from 'react-data-table-component';
import './treatmentTable.css';

const ExpanableComponent = ({ data }) => 
<div>
    <ul>
        <li><strong>Treatment:</strong> {data.name}</li>
        <li><strong>Price:</strong> {data.pvp}</li>
        <li><strong>SubService:</strong> {data.subservice.name}</li>   
        <li><strong>Service:</strong> {data.subservice.service.name}</li> 
    </ul>
</div>;

class TreatmentsTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            columns:[
                {
                    name: 'Name',
                    selector: 'name',
                    sortable: true,
                },
                {
                    name: 'Service',
                    selector: 'subservice.name',
                    sortable: true,
                },
                {
                    name: 'Subservice',
                    selector: 'subservice.service.name',
                    sortable: true,
                },
                {
                    name: 'Price',
                    selector: 'pvp',
                    sortable: false,
                    cell: row => <span>$ {row.pvp}</span>
                },
            ],
            dataFiltered: []
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        console.log(getAllTreatments);
        fetch(getAllTreatments).then( (resolve) => {
            return resolve.json();
        }).then( data => {
            const treatments = data;
            this.setState({
                data: treatments,
                dataFiltered: treatments
            });
        });
    }

    handleChange(event){
        let value = event.target.value;
        let all = this.state.data;
        let elems = all.filter(o => o.name.indexOf(value) !== -1 || o.subservice.name.indexOf(value) !== -1 || o.subservice.service.name.indexOf(value) !== -1);
        this.setState({
            dataFiltered: elems
        });
    }

    render(){
        return (
            <Grid>
                <Row>
                    <Col xsOffset={8} xs={4}>
                        <div>
                            <input type="text" id="search" onChange={this.handleChange}/>
                            <label htmlFor="search"><span>Search:</span></label>
                        </div>       
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <DataTable
                            title=""
                            columns={this.state.columns}
                            data={this.state.dataFiltered}
                            highlightOnHover={true}
                            expandableRows
                            expandableRowsComponent={<ExpanableComponent  />}
                        />
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default TreatmentsTable;
