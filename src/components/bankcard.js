import React, {Component} from 'react';
import {Card, CardBody, CardTitle, CardText, CardSubtitle} from 'reactstrap';

class BankCard extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.state.ifsc = props.ifsc;
        this.state.address = props.address;
        this.state.city = props.city;
        this.state.state = props.state;
        this.state.bank_name = props.bank_name;
        this.state.branch = props.branch;

    }

    render() {
        return (
            <div className={"search-card"}>
                <Card style={{backgroundColor: "#74b9ff"}}>
                    <CardBody align={"left"}>
                        <CardTitle>{this.state.branch}</CardTitle>
                        <CardSubtitle><span style={{color: "#272523"}}>{this.state.bank_name}</span></CardSubtitle>
                        <CardText>
                            <b>IFSC:</b> {this.state.ifsc}<br />
                            <b>Address:</b> {this.state.address}<br />
                            <b>City:</b> {this.state.city}<br />
                            <b>State:</b> {this.state.state}<br />
                        </CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default BankCard