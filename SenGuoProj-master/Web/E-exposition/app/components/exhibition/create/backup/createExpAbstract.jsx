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

class SubjectSelection extends React.Component {

    constructor(props){
        super(props);

        this.dropDownContent = [
            "毕业设计展","摄影作品","旅行博主","美食博主","插画作品","独立设计师作品",
            "艺术家作品","模特展示","服装设计","首饰设计","皮具设计","陶瓷设计",
            "香味设计","产品设计","电子音乐"
        ];

        this.state = {
            showDropDown : false,
            selectedText : this.dropDownContent[0]
        };
    }

    dropDownBtnClick(event ){
        let newState = {};
        newState.showDropDown = !this.state.showDropDown;
        this.setState(newState);
    }

    dropDownItemClick(event){
        let newState = {};
        newState.selectedText = event.target.textContent;
        newState.showDropDown = false;
        this.setState(newState);

        this.props.setExpSubject(event.target.textContent);
    }

    renderDropDownList(){

        if(!this.state.showDropDown){
            return null;
        }else{
            let self = this;
            return(
                <div style={subjectSelectionStyle.dropDownList}>
                    {this.dropDownContent.map(
                        function(content, index){
                            return (
                                <div key={"subjectInfoDropDownItem_"+index} style={subjectSelectionStyle.dropDownItem}
                                     onClick={(event) => self.dropDownItemClick(event)}>
                                    {content}
                                </div>
                            );
                        }
                    )}
                </div>
            )
        }
    }

    render () {
        return(
            <div style={subjectSelectionStyle.base}>
                <div style={subjectSelectionStyle.title}>
                    {"please choose exhibition mainMotto"}
                </div>
                <div style={subjectSelectionStyle.selector}>
                    <div style={subjectSelectionStyle.dropDownItem}>
                        {this.state.selectedText}
                    </div>
                    <div style={subjectSelectionStyle.dropDownBtn} onClick={(event)=>this.dropDownBtnClick(event)}/>
                    {this.renderDropDownList()}
                </div>
            </div>
        );
    }
}

SubjectSelection.propTypes = {
    setExpSubject:PropTypes.func
};

let subjectSelectionStyle = {
    base:{
        width:"570px",
        height:"110px",
        marginLeft:"auto",
        marginRight:"auto"
    },
    title:{
        height:"50px",
        lineHeight:"50px",
        textAlign:"center",
        color:"#000000"
    },
    selector:{
        height:"60px",
        backgroundColor:"#ffffff",
        borderRadius:"3px",
    },
    dropDownBtn:{
        position:"absolute",
        width:"40px",
        height:"20px",
        marginLeft:"500px",
        marginTop:"-40px",
        backgroundColor:"#ff0000",
        cursor:"pointer"
    },
    dropDownItem:{
        height:"60px",
        lineHeight:"60px",
        textAlign:"center",
        color:"#000000",
        cursor:"pointer"
    },
    dropDownList:{
        position:"absolute",
        width:"570px",
        height:"180px",
        marginLeft:"0px",
        marginTop:"10px",
        borderRadius:"3px",
        backgroundColor:"#00ff00",
        overflow:"auto"
    }
};

SubjectSelection = Radium(SubjectSelection);

class TagEditor  extends React.Component {

    render () {
        return(
            <div style={tagEditorStyle.base}>
                <div style={tagEditorStyle.title}>
                    {"please input exhibition tag"}
                </div>
                <div style={tagEditorStyle.inputWrapper}>
                    <input style={tagEditorStyle.tagInput} type="text" placeholder={"Please enter exhibition tag"}
                           //onChange={(event)=>{this.props.setExpTag(event.target.value)}}
                           onBlur={(event)=>{this.props.setExpTag(event.target.value)}}
                    />
                </div>
            </div>
        )
    }
}


TagEditor.propTypes = {
    setExpTag:PropTypes.func
};

let tagEditorStyle = {
    base: {
        width: "570px",
        height: "110px",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "10px"
    },
    title:{
        height:"50px",
        lineHeight:"50px",
        textAlign:"center",
        color:"#000000"
    },
    inputWrapper:{
        height:"60px",
        backgroundColor:"#ff0000"
    },
    tagInput:{
        height:"55px",
        width:"570px",
        lineHeight:"55px",
        borderRadius:"5px"
    }

};

TagEditor = Radium(TagEditor);

class AbstractEditor  extends React.Component {

    render () {
        return(
            <div style={abstractEditorStyle.base}>
                <div style={abstractEditorStyle.title}>
                    {"exhibition abstract"}
                </div>
                <div style={abstractEditorStyle.inputWrapper}>
                    <textarea style={abstractEditorStyle.abstractInput}
                              //onChange={(event)=>{this.props.setExpAbstract(event.target.value)}}
                              onBlur={(event)=>{this.props.setExpAbstract(event.target.value)}}
                    />
                </div>
            </div>
        )
    }
}
AbstractEditor.propTypes = {
    setExpAbstract:PropTypes.func
};

let abstractEditorStyle = {
    base: {
        width: "570px",
        height: "160px",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "10px"
    },
    title:{
        height:"50px",
        lineHeight:"50px",
        textAlign:"center",
        color:"#000000"
    },
    inputWrapper:{
        height:"110px",
        backgroundColor:"#ff0000"
    },
    abstractInput:{
        height:"105px",
        width:"570px",
        lineHeight:"30px",
        borderRadius:"5px"
    }
};

AbstractEditor = Radium(AbstractEditor);

class CreateExpAbstract extends React.Component {

    nextStep(){
        this.props.componentToGo(this.props.componentIndex, this.props.componentIndex + 1);
    }

    previousStep(){
        this.props.componentToGo(this.props.componentIndex, this.props.componentIndex - 1);
    }

    render () {

        if(this.props.componentIndex === this.props.contentToShow){
            return (
                <div style={createExpAbstractStyle.base} onClick={(event) => {event.stopPropagation(); history.back()}}>
                    <div style={createExpAbstractStyle.modal} onClick={(event)=>{event.stopPropagation()}}>
                        <Title goBack={this.previousStep.bind(this)}/>
                        <SubjectSelection setExpSubject={this.props.setExpSubject}/>
                        <TagEditor setExpTag={this.props.setExpTag}/>
                        <AbstractEditor setExpAbstract={this.props.setExpAbstract}/>
                        <div style={createExpAbstractStyle.nextStep}>
                            <div style={createExpAbstractStyle.nextStepBtn} onClick={(event)=>{this.nextStep()}}/>
                            <label style={createExpAbstractStyle.nextStepText} onClick={(event)=>{this.nextStep()}}>
                                {"next"}
                            </label>
                        </div>
                    </div>
                </div>
            );
        } else{
            return null;
        }
    }
}

CreateExpAbstract.propTypes = {
    componentIndex:PropTypes.number,
    contentToShow:PropTypes.number,
    componentToGo:PropTypes.func,
    setExpTag:PropTypes.func,
    setExpTitle:PropTypes.func,
    setExpSubject:PropTypes.func,
    setExpAbstract:PropTypes.func
};

let createExpAbstractStyle = {
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
        width:"850px",
        height:"600px",
        position:"absolute",
        left:"50%",
        top:"50%",
        marginTop:"-300px",
        marginLeft:"-425px",
        borderRadius:"10px",
        backgroundColor: "rgba(255,255,255,0.5)",
        transition : "all 300ms cubic-bezier(0.215, 0.61, 0.355, 1) 0s"
    },
    nextStep:{
        width:"130px",
        height:"60px",
        marginLeft:"auto",
        marginRight:"auto",
        marginTop:"20px",
    },
    nextStepBtn:{
        float:"left",
        width:"60px",
        height:"60px",
        backgroundColor:"#ff0000",
        borderRadius:"50%",
        cursor:"pointer"
    },
    nextStepText:{
        float:"left",
        width:"60px",
        height:"30px",
        lineHeight:"30px",
        marginTop:"15px",
        marginLeft:"10px",
        color:"#000000",
        cursor:"pointer"
    }
};

CreateExpAbstract = Radium(CreateExpAbstract);

export default CreateExpAbstract;
