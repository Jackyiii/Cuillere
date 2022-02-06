import React from "react";
import Intl from "../intl/intl.jsx";
import Radium from "radium";

export default Radium((props) => {
  let comments = props.comments;
  let loggedin = false;   // TODO

  return <div style={style.commentsWrapper} onClick={(e)=> {e.stopPropagation()}}>
    <div style={style.comments.base}>
      <div style={style.comments.title}>Comments ({comments.length})</div>
      <div style={style.comments.edit.base}>
        <img style={style.comments.avatar} src={require("../defaultAvatar.png")}/>

        <div style={style.comments.edit.form}>
          <div style={style.comments.edit.textWrapper}>
            <div style={style.comments.edit.textWrapperInner}>
              <textarea style={style.comments.edit.text} form="comment-form"
                        id="comment-input" name="comment" wrap="soft"/>
            </div>
          </div>
          <form id="comment-form" onSubmit={(event) => { this.handleSubmit(event) }}>
            <input style={style.comments.edit.submit} type="submit" key="submit"
                         value={Intl.get("Post a Comment", "Post a Comment")}/>
          </form>
        </div>
        <div style={{clear: "both"}}/>
      </div>

      <div style={style.comments.base}>
        {comments.map((comment, i) => {
          return <div key={"comment/" + i}>
            <div style={{borderBottom: "3px solid #D8D8D8"}}/>
            <div style={style.comments.comment.base}>
              <img style={style.comments.comment.avatar} src={comment.authorAvatar}/>
              <div>
                <div style={style.comments.comment.title.base}>
                  <span style={style.comments.comment.title.name}>{comment.author}</span>
                  <span style={style.comments.comment.title.time}>{} - {comment.time}</span>
                </div>
                <div style={style.comments.comment.content}>
                  {comment.content}
                  <div style={style.option.base}>
                    <img style={style.option.icon} src={require('./likeGray.png')}/>
                    <div style={style.option.info}>
                      {comment.likeCount} 赞
                    </div>
                    <img style={style.option.icon} src={require('./comment.png')}/>
                    <div style={style.option.info}>
                      回复
                    </div>
                  </div>
                  <div style={{clear: "both"}}/>
                  <div style={style.comments.subCommentWrapper}>
                    {comment.comments.map((subComment, j) => {
                      return <div key={"comment/" + i + "/subComment/" + j}>
                        <div style={style.comments.subComment.base}>
                          <img style={style.comments.subComment.avatar} src={subComment.authorAvatar}/>
                          <div style={style.comments.subComment.content}>
                            {subComment.content}
                            <div style={style.option.base}>
                              <img style={style.option.icon} src={require('./likeGray.png')}/>
                              <div style={style.option.info}>
                                {subComment.likeCount} 赞
                              </div>
                              <img style={style.option.icon} src={require('./comment.png')}/>
                              <div style={style.option.info}>
                                回复
                              </div>
                            </div>
                          </div>
                        </div>
                        <div style={{clear: "both"}}/>
                      </div>
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        })}
      </div>
    </div>
  </div>
})

let style = {
  option: {
    base: {
      float: "right",
      textAlign: "right",
      lineHeight: "22px",
      fontFamily: "PingFangSC-Semibold",
      fontSize: "14px",
      color: "#A3ADBA",
      userSelect: "none",
      height: "22px",
      padding: "10px",
      cursor: "pointer",
    },
    icon: {
      float: "left",
      height: "22px",
      userSelect: "none",
      paddingRight: "3px"
    },
    info: {
      float: "left",
      height: "22px",
      width: "48px",
      textAlign: "left",
      paddingRight: "15px"
    },
  },
  commentsWrapper: {
    background: "#D8D8D8",
    padding: "74px 99px 80px 105px"
  },
  comments: {
    base: {
      position: "relative",
      background: "#ffffff",
    },
    title: {
      paddingLeft: "46px",
      paddingTop: "44px",
      height: "36px",
      fontSize: "32px",
      lineHeight: "36px",
      textAlign: "left"
    },
    avatar: {
      position: "absolute",
      borderRadius: "100px",
      left: "61px",
      height: "75px",
      width: "75px",
    },
    comment: {
      base: {
        padding: "25px 48px 25px 146px"
      },
      avatar: {
        position: "absolute",
        borderRadius: "100px",
        left: "47px",
        height: "75px",
        width: "75px",
      },
      title: {
        base: {
          fontFamily: "'San Francisco',Helvetica,Arial,serif",
          color: "#000000",
          textAlign: "left",
        },
        name: {
          fontSize: "22px",
        },
        time: {
          fontSize: "16px",
        }
      },
      content: {
        marginTop: "10px",
        fontSize: "22px",
        textAlign: "left"
      }
    },
    subCommentWrapper: {
      position: "relative",
      marginLeft: "250px",
      borderLeft: "5px solid #D8D8D8"
    },
    subComment: {
      base: {
        marginTop: "10px",
        padding: "25px 28px 25px 80px"
      },
      avatar: {
        position: "absolute",
        left: "27px",
        borderRadius: "100px",
        height: "38px",
        width: "38px",
      },
      content: {
        fontSize: "18px",
        textAlign: "left"
      }
    },
    edit: {
      base: {
        padding: "24px 56px 48px 0px"
      },
      form: {
        textAlign: "right",
        paddingLeft: "179px"
      },
      submit: {
        opacity: "0.52",
        borderRadius: "100px",
        backgroundColor: "#6281A8",

        height: "43px",
        userSelect: "none",
        marginTop: "21px",
        cursor: "pointer",

        fontFamily: "Arial",
        fontSize: "20px",
        padding: "0 20px 0 20px",
        color: "#FFFFFF",

        transition: "all 300ms cubic-bezier(0.215, 0.61, 0.355, 1) 0s",

        ":hover": {
          backgroundColor: "#8895A5",
          color: "#ffffff"
        },
        ":active": {
          backgroundColor: "#404040",
          color: "#ffffff"
        }
      },
      textWrapper: {
        display: "inline-block",
        width: "100%"
      },
      textWrapperInner: {
        display: "block",
      },
      text: {
        resize: "none",
        height: "181px",
        width: "100%",
        borderRadius: "4px",
        borderBottomColor: "#D9D9D9"
      }
    }
  },
}
