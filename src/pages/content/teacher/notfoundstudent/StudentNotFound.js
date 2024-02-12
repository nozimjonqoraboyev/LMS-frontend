import {Component} from "react";
import "./css/font-awesome.min.css"
import "./css/style.css"
import {Button} from "antd";
import Teacher from "../Teacher";

class StudentNotFound extends Component {
    render() {
        let goBack = () => {

        }
        return (
            <div>
                <body>


                <div id="notfound">
                    <div className="notfound-bg"></div>
                    <div className="notfound">
                        <div className="notfound-404">
                            <h2>There is no student in this group</h2>
                        </div>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>


                        <p>
                            <Button style={{
                                width: 100,
                                height: 60
                            }}
                                    onClick={() => this.props.setKey(1,1)}
                            ><p style={{
                                width: '95%',
                                height: '95%'
                            }}>To back</p></Button>
                        </p>

                    </div>
                </div>
                </body>
            </div>

        );
    }
}

export default StudentNotFound