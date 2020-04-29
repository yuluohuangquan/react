import React from "react";
import { connect } from "react-redux";
import { Button } from "antd";
import store from "../../store";
import { testApi } from "../../axios/api";
import axios from "axios";
import "./styles/main.modules.less";

interface MainProps {
  count: number;
  list: any;
  changeCount: Function;
  query: Function;
}
interface MainState {}

class Test extends React.Component<MainProps, MainState> {
  constructor(props: MainProps) {
    super(props);
    this.state = {};
    this.handleStoreChange = this.handleStoreChange.bind(this);
    window.console.log(store.getState());
  }

  handleStoreChange() {
    window.console.log(store.getState());
    this.setState(store.getState());
  }

  increase = () => {
    const { count } = this.props;
    this.props.changeCount(count + 1);
  };

  decrease = () => {
    const { count } = this.props;
    this.props.changeCount(count - 1);
  };

  query = () => {
    axios.get(testApi).then((res: any) => {
      this.props.query(res);
    });
  };

  render() {
    const { count, list } = this.props;
    window.console.log(list);
    return (
      <div className={'main'}>
        <p>{"测试页面"}</p>
        {count}
        <Button type="dashed" onClick={this.increase}>
          {"新增"}
        </Button>
        <Button type="primary" onClick={this.decrease}>
          {"删除"}
        </Button>
        <Button type="default" onClick={this.query}>
          {"查询"}
        </Button>
        <ul>
          {list &&
            list.bibidaoList &&
            list.bibidaoList.map((item: any) => {
              return <li key={item.id}>{item.title}</li>;
            })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    count: state.count,
    list: state.list
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    changeCount: (count: number) => {
      dispatch({
        type: "CHANGE_COUNT",
        count
      });
    },
    query: (list: any) => {
      dispatch({
        type: "CHANGE_TEST_LIST",
        list
      });
    }
  };
};

const Main = connect(
  mapStateToProps,
  mapDispatchToProps
)(Test);

export default Main;
