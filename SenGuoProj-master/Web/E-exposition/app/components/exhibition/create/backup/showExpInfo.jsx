/**
 * Created by zhaojunbo on 2017/7/21.
 */
import React from "react";
import Radium from "radium";
import PropTypes from 'prop-types';
import {Route, Link} from "react-router-dom";
import Intl from "../../../intl/intl.jsx";

class Title extends React.Component {

    render () {
        return (
            <div style={titleStyle.base}>
                <div style={titleStyle.goBack} onClick={this.props.goBack}>

                </div>
            </div>
        )
    }
}

Title.propTypes = {
    goBack: PropTypes.func
};

let titleStyle = {
    base:{
        width:"100%",
        height:"70px",
        backgroundColor:"#ff00ff"
    },
    goBack:{
        width:"40px",
        height:"40px",
        marginTop:"30px",
        marginLeft:"30px",
        backgroundColor:"#ff0000",
        cursor:"pointer"
    }
};

Title = Radium(Title);

class InfoText extends React.Component {

    render () {
        return (
            <div style={infoTextStyle.base}>
                <div style={infoTextStyle.infoTitle}>
                    {this.props.titleText}
                </div>
                <div style={infoTextStyle.separator}>
                    {":"}
                </div>
                <div style={infoTextStyle.infoValue}>
                    {this.props.valueText}
                </div>
            </div>
        )
    }
}

let infoTextStyle = {
    base:{
        width:"650px",
        height:"50px",
        lineHeight:"50px",
        marginLeft:"100px",
        marginTop:"5px",
        marginBottom:"5px",
        backgroundColor:"#ff0000"
    },
    infoTitle:{
        float:"left",
        width:"110px",
        backgroundColor:"#00ff00"
    },
    separator:{
        float:"left",
        width:"25px",
        textAlign:"center",
        backgroundColor:"#0000ff"
    },
    infoValue:{
        float:"left",
        width:"515px",
        backgroundColor:"#8888ff"
    }
};

InfoText.PropTypes = {
    titleText: PropTypes.string,
    valueText: PropTypes.string
};

InfoText = Radium(InfoText);

class IntroduceText extends React.Component {

    render () {
        return (
            <div style={introduceTextStyle.base}>
                <div style={introduceTextStyle.infoTitle}>
                    {this.props.titleText}
                </div>
                <div style={introduceTextStyle.separator}>
                    {":"}
                </div>
                <div style={introduceTextStyle.infoValue}>
                    {this.props.valueText}
                </div>
            </div>
        )
    }
}

let introduceTextStyle = {
    base:{
        width:"650px",
        height:"300px",
        lineHeight:"50px",
        marginLeft:"100px",
        marginTop:"5px",
        marginBottom:"5px"
    },
    infoTitle:{
        float:"left",
        height:"50px",
        width:"110px",
        backgroundColor:"#00ff00"
    },
    separator:{
        float:"left",
        height:"50px",
        width:"25px",
        textAlign:"center",
        backgroundColor:"#0000ff"
    },
    infoValue:{
        float:"left",
        height:"300px",
        lineHeight:"30px",
        width:"515px",
        overflow:"auto",
        backgroundColor:"#8888ff"
    }
};

IntroduceText.PropTypes = {
    titleText: PropTypes.string,
    valueText: PropTypes.string
};

IntroduceText = Radium(IntroduceText);

class NextStep extends React.Component {

    handleArrangeExp(){
        this.props.goForward();
        this.props.arrangeExhibition();
    }

    render () {
        return (
            <div style={nextStepStyle.base} onClick={(event)=>{this.handleArrangeExp()}}>
                {"arrange exhibition"}
            </div>
        )
    }
}

NextStep.propTypes = {
    goForward: PropTypes.func,
    arrangeExhibition: PropTypes.func
};

let nextStepStyle = {
    base:{
        width:"480px",
        height:"60px",
        lineHeight:"60px",
        marginLeft:"auto",
        marginRight:"auto",
        marginTop:"130px",
        borderRadius:"5px",
        textAlign:"center",
        backgroundColor:"#ff0000",
        cursor:"pointer"
    }
};

NextStep = Radium(NextStep);

class ShowExpInfo extends React.Component {

    goForward(){
        this.props.componentToGo(this.props.componentIndex, this.props.componentIndex + 1);
    }

    goBack(){
        this.props.componentToGo(this.props.componentIndex, this.props.componentIndex - 1);
    }

    render () {

        if(this.props.componentIndex === this.props.contentToShow){

            let costText = this.props.expCost === 0 ? "free" : this.props.expCost.toString();
            let durationText = this.props.expStartTime + " ~ " + this.props.expEndTime;
            let tagText = "";
            this.props.expTagList.map(
                function(content){
                    tagText += " / " + content;
                }
            );

            return (

                <div>
                    <div style={showExpInfoStyle.base} onClick={(event) => {event.stopPropagation(); history.back()}}/>
                    <div style={showExpInfoStyle.modal}>
                        <div style={showExpInfoStyle.content}  onClick={(event)=>{event.stopPropagation()}}>

                            <Title goBack={this.goBack.bind(this)}/>
                            <InfoText titleText={"展厅类型"} valueText={this.props.expType}/>
                            <InfoText titleText={"展览门票"} valueText={costText}/>
                            <InfoText titleText={"展览时间"} valueText={durationText}/>
                            <InfoText titleText={"展览标签"} valueText={tagText}/>
                            <InfoText titleText={"展览主题"} valueText={this.props.expSubject}/>
                            <IntroduceText titleText={"展览介绍"} valueText={this.props.expAbstract}/>

                            <NextStep goForward={this.goForward.bind(this)}
                                      arrangeExhibition={this.props.arrangeExhibition}/>

                        </div>
                    </div>
                </div>

            );
        }else{
            return null;
        }
    }
}

ShowExpInfo.propTypes = {
    componentIndex:PropTypes.number,
    contentToShow:PropTypes.number,
    componentToGo:PropTypes.func,
    expType:PropTypes.string,
    expStartTime:PropTypes.string,
    expEndTime:PropTypes.string,
    expCost:PropTypes.number,
    expTagList:PropTypes.array,
    expTitle:PropTypes.string,
    expSubject:PropTypes.string,
    expAbstract:PropTypes.string,
    arrangeExhibition: PropTypes.func
};

let showExpInfoStyle = {

    base: {
        position:"fixed",
        height:"100%",
        width:"100%",
        top: "0px",
        left:"0px",
        zIndex: "1000",
        color: "#880000",
        backgroundColor: "rgba(0,230,0,0.5)",
        userSelect : "none",
        clear:"both"
    },
    modal:{
        position:"absolute",
        zIndex: "2000",
        left:"50%",
        top:"50%"
    },
    content:{
        width:"850px",
        paddingBottom:"90px",
        position:"absolute",
        left:"50%",
        top:"50%",
        marginTop:"-300px",
        marginLeft:"-425px",
        borderRadius:"10px",
        backgroundColor: "rgba(255,255,255,0.5)",
        transition : "all 300ms cubic-bezier(0.215, 0.61, 0.355, 1) 0s"
    }
};

ShowExpInfo = Radium(ShowExpInfo);

export default ShowExpInfo;
