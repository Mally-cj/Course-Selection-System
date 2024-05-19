import React, { PureComponent } from 'react';

import {
  Modal,
  Form,
  Radio,
  Spin,
  Popover,
  DatePicker,
} from 'antd';
import moment from 'moment'
import './index.css';

function parseTime(time: string | Date , cFormat: string = '{y}-{m}-{d} {h}:{i}:{s}') {
    if (arguments.length === 0) {
      return null;
    }
    const format = cFormat;
    let date: Date;
    if (typeof time === 'object') {
      date = time;
    } else {
        const time_str = time;
      if ((`${time_str}`).length === 10) {
          date = new Date(parseInt(time_str) * 1000);
      } else {
          date = new Date(time);
      }

    }
    const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay(),
    };
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
      let value = formatObj[key];
      // Note: getDay() returns 0 on Sunday
      if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value]; }
      if (result.length > 0 && value < 10) {
        value = `0${value}`;
      }
      return value || 0;
    });
    return time_str;
}


const RadioGroup = Radio.Group;


const defaultCourseType = [
  {
    time: '1',
    index: 0,
  },
  {
    time: '2',
    index: 1
  },
  {
    time: '3',
    index: 2
  },
  {
    time: '4',
    index: 3
  },
  {
    time: '5',
    index: 4
  },
  {
    time: '6',
    index: 5
  },
  {
    time: '7',
    index: 6
  },
  {
    time: '8',
    index: 7
  },
  {
    time: '9',
    index: 8
  },
  {
    time: '10',
    index: 9
  },
];

class CourseTables extends PureComponent{
  constructor(props) {
    super(props);
    this.state = {
      currentEl: undefined,
      currentDay: new Date().getTime(),
      timeLineWidth: undefined,
      courseContentWidth: undefined,
      contentItemWidth: undefined,
      movedPos: undefined,
      nearTime: undefined,
      curWeek: 1,
      visible: false,
    }
  }

  componentDidMount() {
    this.setState({
      courseContentWidth: this.coursesContent.offsetWidth,
      contentItemWidth: parseInt((this.coursesContent.offsetWidth - this.timeLineWidth.offsetWidth) / 7, 10),
      timeLineWidth: this.timeLineWidth.offsetWidth,
    })
  }

  renderWeek = () => {
    const { currentDay: xDay } = this.state;
    const data = xDay ? new Date(xDay) : new Date();
    let week = data.getDay();
    if (week === 0) {
      week = 6
    } else {
      week -= 1
    }
    const currentDay = week !== 0 ? data.getTime() - (24 * week) * 60 * 60 * 1000 : data.getTime();
    const content = [];
    for (let i = 0; i < 7; i += 1) {
      content.push({
        date: currentDay + (24 * i) * 60 * 60 * 1000
      })
    }
    return content;
  };

  renderBorderList = () => {
    const list = [];
    const { courseContentWidth, timeLineWidth } = this.state;
    const { courseType } = this.props;
    const MAX = (courseType || defaultCourseType).length * 4;
    for (let i = 0; i < MAX; i += 1) {
      if ((i+1) % 4 === 0 && i !== 0) {
        // 这里的 15 为当前需要边框的元素的高度，28 为星期的高度
        list.push(
            <div
                style={{ position: 'absolute', width: '100%', height: 15, top: 15 * i + 28, left: 0, borderBottom: '1px solid rgb(238, 238, 238)' }}
                key={`${i}`}
            />
        )
      }else {
        list.push(
            <div
                style={{ position: 'absolute', width: courseContentWidth - timeLineWidth, height: 15, top: 15 * i + 28, left: timeLineWidth, borderBottom: '1px dashed  rgb(238, 238, 238)' }}
                key={`${i}`}
            />
        )
      }
    }
    return list;
  };

  renderRectEl = (courseTables) => {
    let arr = [];
    const list = Object.keys(courseTables);
    if (!list.length || !Object.keys(this.weekPos).length) return;
    const { courseType } = this.props;
    const timeType = {};
    courseType || defaultCourseType.forEach((item, index) => {
      const num = item.time;
      timeType[num] = item.index
    });
    arr = list.map(item => {
      const data = courseTables[item];
      const filter_data = data.filter((value, index, array) => {
        if (value.weeks.indexOf(this.state.curWeek) != -1) {
            return  true
        }
        });
      return filter_data.map(items => {
        // const date = new Date(items.weeks);
        // const TOP = date.getHours();
        // this.state.curWeek
        // if (timeType[TOP] !== 0 && !timeType[TOP]) return [];
        const course_indexs = items.course_indexs;
        const index = course_indexs[0] - 1;
        // const top = `${this.timePos[course_indexs[0]].top}px`;
        // const left = `${this.weekPos[parseInt(item, 10) - 1].left}px`;
        // const height = `${(items.endTime - items.startTime) / 1000 / 60}px`;
        // const top = `${this.state.contentItemWidth * index + this.state.timeLineWidth}px`;
        console.log("this.state.contentItemWidth: ", this.state.contentItemWidth);
        console.log("this.state.timeLineWidth: ", this.state.timeLineWidth);
        const day = Math.floor((index + 9) / 10);
        const hour = index % 10;
        const top = 28 + (hour) * 60 + "px";
        const left = (this.state.contentItemWidth * (day - 1) + this.state.timeLineWidth ) + "px";
        const height = 60 * course_indexs.length + `px`;
        const content = (
            <div>
              <ul className="rectList">
                <li>
                  教师姓名：{items.teaName}
                </li>
                <li>
                  学生姓名：{items.stuNameList.join('，')}
                </li>
              </ul>
            </div>
        );
        return (
            <Popover key={items.startTime} placement="bottom" content={content} title={items.teaName}>
              <div
                  className="courseRect"
                  style={{
                    top,
                    left,
                    width: 122,
                    height,
                    backgroundColor: '#def3fc',
                  }}
                //   onMouseDown={this.mouseDown}
                //   onContextMenu={this.ContextMenu}
              >
                <p>
                  课程：{items.courseName}
                </p>
                <p>
                  老师：{items.teaName}
                </p>
              </div>
            </Popover>
        )
      })
    });
    return arr;
  };

  mouseDown = (e) => {
    this.disX = 0;
    this.disY = 0;
    this.top = 0;
    this.left = 0;
    if (e.button === 0) {
      let el = e.currentTarget;
      let cEl;
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      this.scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
      this.disX = e.clientX + this.scrollLeft - el.offsetLeft;
      this.disY = e.clientY + this.scrollTop - el.offsetTop;
      cEl = el.cloneNode(true);
      el.style.opacity = 0.5;
      if (cEl) {
        cEl.id = 'cEl';
        cEl.style.zIndex = 4;
        this.courseWrapper.appendChild(cEl);
      }
      this.movedcElPos = { top: parseFloat(el.style.top), left: parseFloat(el.style.left) };
      document.onmousemove = e => this.mouseMove(e, el);
      document.onmouseup = e => this.mouseUp(e, el);
      this.props.mouseDown && this.props.mouseDown()
    }
    e.preventDefault();
  };

  mouseMove = (e) => {
    const height = this.coursesContent.offsetHeight;
    const width = this.coursesContent.offsetWidth;
    const cEl = document.getElementById('cEl');
    const left = Math.min(Math.max(e.clientX + this.scrollLeft - this.disX, 66), width - 120);
    const Top = Math.min(Math.max(e.clientY + this.scrollTop - this.disY, 28), height - 2);
    this.top = Top;
    this.left = left;
    this.props.mouseMove && this.props.mouseMove();
    if (cEl) {
      cEl.style.left = `${left}px`;
      cEl.style.top = `${Top}px`;
    }
  };

  mouseUp = (e, el) => {
    const cEl = document.getElementById('cEl');
    if (cEl) {
      const top = this.top || parseFloat(cEl.style.top);
      const left = this.left || parseFloat(cEl.style.left);
      const movedPos = this.checkPos({ top, left }, this.timePos, this.weekPos);
      this.courseWrapper.removeChild(cEl);
      el.style.top = `${top}px`;
      el.style.left = `${left}px`;
      const { top: oldTop, left: oldLeft } = this.movedcElPos;
      this.props.mouseUp && this.props.mouseUp();
      if (oldLeft) {
        if (!(oldLeft === left) || !(oldTop === top)) {
          this.handleMoveConfirm(el, movedPos, { top, left });
        }
      }
    }
    el.style.opacity = 1;
    document.onmouseup = document.onmousemove = null;
  };

  checkPos = (nowPos, timePos, weekPos) => {
    const { left, top } = nowPos;
    const length1 = Object.keys(timePos).length;
    const length = Object.keys(weekPos).length;
    let T = 0;
    let L = 0;
    for (let i = 0; i < length1; i += 1 ) {
      if (i >= length1 - 1) {
        T = length1 -1;
        break;
      }
      if (timePos[i].top === top) {
        T = i;
        break;
      }
      if (timePos[i].top < top && timePos[i + 1].top > top) {
        T = i;
        break;
      }
    }
    for (let j = 0; j < length; j += 1 ) {
      if (j >= length - 1) {
        L = length -1;
        break;
      }
      if (weekPos[j].left === left) {
        L = j;
        break;
      }
      if (weekPos[j].left < left + 60 && weekPos[j + 1].left > left + 60) {
        L = j;
        break;
      }
    }
    return { top: T, left: L }
  };

  handleMoveConfirm = (el, movedPos, newPos) => {
    const { top } = movedPos;
    const { top: newTop } = newPos;
    const oldTime = this.timePos[top].top;
    const currentTime = this.timePos[top].time;
    const nearTime = Math.min( Math.round((newTop - oldTime)/5)*5, 55);
    this.setState({
      visible: true,
      currentEl: el,
      currentTime,
      nearTime,
      movedPos,
    });
  };

  handleOk = () => {
    const { form, handleConfirm } = this.props;
    const { resetFields } = form;
    const { currentEl, movedPos } = this.state;
    const { validateFieldsAndScroll } = form;
    validateFieldsAndScroll((error, values) => {
      if (error) return;
      const { startTime, timeDate } = values;
      const Day = timeDate.toDate();
      const Hours = this.timePos[movedPos.top].time.split(':')[0];
      Day.setHours(Hours);
      Day.setMinutes(parseInt(startTime, 10));
      Day.setSeconds(0);
      const getTime = Day.getTime(); // 获取移动后的开始时间
      const top = `${this.timePos[movedPos.top].top + startTime}px`;
      const left = `${this.weekPos[movedPos.left].left}px`;
      currentEl.style.top = top;
      currentEl.style.left = left;
      if (handleConfirm) {
        handleConfirm(
            {
              startTime: getTime,
            },
            () => {
              resetFields();
              this.setState({
                visible: false
              });
            }
        )
      } else {
        this.setState({
          visible: false
        });
        resetFields()
      }
    });
  };

  handleCancel = () => {
    const { currentEl } = this.state;
    const { top, left } = this.movedcElPos;
    currentEl.style.top = `${top}px`;
    currentEl.style.left = `${left}px`;
    this.props.form.resetFields();
    this.setState({
      visible: false
    });
  };

  renderRadioList = () => {
    const RadioList = [];
    const { currentTime } = this.state;
    if (!currentTime) return;
    const HOURS = currentTime.split(':')[0];
    for (let i = 0; i < 60; i += 5) {
      let MIN = i;
      if (MIN < 10) {
        MIN = `0${  MIN}`;
      }
      RadioList.push(
          <Radio key={i} value={i}>{`${HOURS}:${MIN}`}</Radio>
      )
    }
    return RadioList;
  };

  render() {
    const {
      contentItemWidth,
      timeLineWidth,
      visible,
      nearTime,
      movedPos,
    } = this.state;
    const { renderWeek, renderBorderList, renderRectEl, handleOk, handleCancel } = this;
    const { courseType: TYPE, courseTables, loading, form } = this.props;
    this.timePos = {};
    this.weekPos = {};
    const courseType = TYPE && TYPE.length ? TYPE : defaultCourseType;
    const defaultHeight = 28; // 默认星期上的高度为 28，可以修改 coursesHead 的样式来调整高度，谨慎修改 QAQ，
    const courseHeight = courseType.length * 60 + defaultHeight;
    const courseWidth = 920;

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 8 },
    };
    return (
        <section style={{ height: courseHeight, width: courseWidth }} className="coursesTable" onContextMenu={e => e.preventDefault()}>
          <div className="week-navigation">
            <a href="#" onClick={ () => {
                this.setState({
                    curWeek: this.state.curWeek - 1
                })
            }
            }>上一周</a>
            <div>第{this.state.curWeek}周</div>
            <a href="#" onClick={
                () => {
                    this.setState({
                        curWeek: this.state.curWeek + 1
                    })
                }
            }>下一周</a>
          </div>
          <div ref={e => { this.courseWrapper = e }} className="courseWrapper" style={{ height: '100%', width: '100%' }}>
            <div className="coursesHead" style={{ height: defaultHeight }}>
              {contentItemWidth ? (
                  renderWeek().map((item, index) => (
                      <div key={item.date} style={{ width: contentItemWidth, left: contentItemWidth * index + timeLineWidth}}>
                        {
                          <div className={(new Date().getDate() === new Date(item.date).getDate() && new Date().getMonth() === new Date(item.date).getMonth()) ? "heightLightWeek" : ''} style={{ textAlign: 'center', width: '100%'}}>
                            <span>{`周${parseTime(item.date, '{a}')}`}</span>
                            {/* <span>{`${parseTime(item.date, '{m}-{d}')}`}</span> */}
                          </div>
                        }
                      </div>
                  ))
              ) : 'loading'}
            </div>

            <div className="rgird">
              <div style={{ height: defaultHeight, borderBottom: '1px dashed #cbc5c7' }}>
              </div>
              {contentItemWidth ? renderBorderList() : 'loading'}
            </div>

            <div ref={(e) => { this.coursesContent = e }} className="coursesContent" style={{ width: courseWidth }}>
              {contentItemWidth ? (
                  renderWeek().map((item, index) => {
                    const left = contentItemWidth * index + timeLineWidth;
                    this.weekPos[index] = { left, top: 0, time: item.date };
                    return (
                        <div
                            key={item.date}
                            style={{ width: contentItemWidth, left, height: '100%', borderRight: '1px solid  rgb(238, 238, 238)' }}
                            index={index}
                        />
                    )
                  })
              ) : 'loading'}
            </div>

            <div ref={(e) => { this.timeLineWidth = e }} style={{ width: 66 }} className="coursesLeftHand">
              {
                courseType ? courseType.map((item, num) => {
                  const { time, index } = item;
                  const top = 60 * num + defaultHeight;
                  this.timePos[num] = { left: 0, top, time, index };
                  return (
                      <div
                          key={index}
                          className="timeList"
                          style={{ width: 66, height: 60, lineHeight: '60px', top, }}
                      >
                    <span>
                      {time}
                    </span>
                      </div>
                  )
                }) : 'loading'
              }
            </div>

            <div>
              {renderRectEl(courseTables)}
            </div>
          </div>
        </section>
    )
  }
}

export default CourseTables