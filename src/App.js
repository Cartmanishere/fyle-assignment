import React, { Component } from 'react';
import { Container, Row, Col, Card, CardTitle, Button, CardText } from 'reactstrap';
import logo from './logo.svg';
import './App.css';
import AppJumbo from './components/jumbo';
import SearchCard from './components/searchcard';
import FetchCard from './components/fetchcard';
import BankCard from './components/bankcard';
import { UncontrolledAlert } from 'reactstrap';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.state.final = <p></p>;
        this.options_ref = React.createRef();

        this.create_component = this.create_component.bind(this);
        this.search_handler = this.search_handler.bind(this);
        this.fetch_handler = this.fetch_handler.bind(this);
    }

    create_component (banks) {
        // How many in one row? => 3
        // Make an array of rows
        var rows = []
        var index = 0
        var stop_flag = false;
        while(index<banks.length) {
            var row_els = []
            for (var i=0;i<3;i++){
                if(index+i >= banks.length) {
                    stop_flag = true;
                    break;
                }
                var bank = banks[index+i];
                row_els.push(<Col sm="4">
                    <BankCard
                        branch={bank.branch}
                        ifsc={bank.ifsc}
                        address={bank.address}
                        bank_name={bank.bank_name}
                        city={bank.city}
                        state={bank.state}
                    />
                </Col>);
                index++;
            }
            if(stop_flag){
                break;
            }
            console.log("Row els: " + row_els.length + " Index: " + index);
            rows.push(<Row style={{"paddingTop": "20px"}}>
                {row_els}
            </Row>);
        }

        console.log("Rows created are..." + rows.length);
        console.log(rows);

        var final =  <div className={"results"}>
                    { rows }
                </div>

        return final;
    }

    search_handler(jobj) {
        window.scrollTo({
            top: this.options_ref.current.offsetTop,
            behaviour: "smooth"
        }, console.log('Scrolled'));
        if(jobj.status==='ok'){
            var banks = jobj.data;
            var final = this.create_component(banks);
            this.setState({final: final});
        }
        else{
            var alerts = []
            if(jobj.messages.length == 1) {
                //error
                var alert = <UncontrolledAlert color={"danger"}>
                    {jobj.messages[0]}
                </UncontrolledAlert>
                alerts.push(alert);
            }
            else{
                // warning
                for(var i=0; i<jobj.messages.length;i++){
                    alerts.push(<UncontrolledAlert color={"warning"}> {jobj.messages[i]} </UncontrolledAlert>);
                }
            }
            this.setState({final: <div>{alerts}</div>});
        }
    }

    fetch_handler(jobj) {
        if(jobj.status==='ok'){
            var bank = jobj.data[0];
            var final = <Row>
                <Col sm={"12"}>
                    <BankCard
                        branch={bank.branch}
                        ifsc={bank.ifsc}
                        address={bank.address}
                        bank_name={bank.bank_name}
                        city={bank.city}
                        state={bank.state}
                    />
                </Col>
            </Row>
            this.setState({final: final});
        }
        else{
            var alerts = []
            if(jobj.messages.length == 1) {
                //error
                var alert = <UncontrolledAlert color={"danger"}>
                    {jobj.messages[0]}
                </UncontrolledAlert>
                alerts.push(alert);
            }
            else{
                // warning
                for(var i=0; i<jobj.messages.length;i++){
                    alerts.push(<UncontrolledAlert color={"warning"}> {jobj.messages[i]} </UncontrolledAlert>);
                }
            }
            this.setState({final: <div>{alerts}</div>});
        }
    }

    render() {
        return (
            <div className="App">
                <div className={"header"}>
                    <AppJumbo/>
                </div>
                <div className={"options"} ref={this.options_ref}>
                    <Container>
                        <Row>
                            <Col sm="6">
                                <SearchCard handler={this.search_handler}/>
                            </Col>
                            <Col sm="6">
                                <FetchCard handler={this.fetch_handler}/>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <hr />
                <div className={"results"} style={{marginBottom: "30px"}}>
                    <Container>
                        {this.state.final}
                    </Container>
                </div>
            </div>

        );
    }
}

export default App;
