import React, { Component } from 'react';
import { Select, Spin } from 'antd';
import events from '../constants/events';

import styles from './List.css';

const { ipcRenderer } = require('electron');
const teste = require('../backprocess');

const { Option } = Select;

// const { BrowserWindow } = remote;
// const win = new BrowserWindow();
// win.hide();
// win.on('teste', () => {
//   console.log('hi teste');
// });
// const backProcess = remote.require('../app/backend');

let timeout;
let currentValue;

type Props = {
  origem: string,
  update: () => void,
  handleSelect: () => void,
  stylesname: string
};

export default class ProjectList extends Component<Props> {
  props: Props;

  state = {
    dataCorrecao: undefined,
    dataEvolucao: undefined,
    datashow: [],
    value: undefined,
    fetching: false
  };

  componentWillMount() {
    const { origem, update } = this.props;
    console.log(teste);
    teste.teste();
    this.setState({ fetching: true });
    // backProcess.getProjects({ origem });
    update({ origem });
    ipcRenderer.on(events.UPDATED, this.updateData.bind(this));
  }

  componentDidUpdate() {
    const { dataCorrecao, dataEvolucao } = this.state;
    const { origem, update } = this.props;
    if (origem === 'interna' && !dataCorrecao) {
      update({ origem });
    } else if (origem !== 'interna' && !dataEvolucao) {
      update({ origem });
    }
  }

  componentWillUnmount() {
    ipcRenderer.removeAllListeners(events.UPDATED);
  }

  updateData(event, data) {
    const { origem } = this.props;
    if (origem === 'interna') {
      this.setState({
        dataCorrecao: data,
        fetching: false
      });
    } else {
      this.setState({
        dataEvolucao: data,
        fetching: false
      });
    }
  }

  fetch(params) {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    currentValue = params;

    function fake() {
      this.setState({ fetching: true });
      let data;
      if (currentValue.origem === 'interna') {
        // eslint-disable-next-line react/destructuring-assignment
        data = this.state.dataCorrecao;
      } else {
        // eslint-disable-next-line react/destructuring-assignment
        data = this.state.dataEvolucao;
      }
      const datashow = data.filter(
        project =>
          project.folder
            .toLowerCase()
            .indexOf(currentValue.filtro.toLowerCase()) !== -1
      );
      this.setState({ datashow });
    }

    timeout = setTimeout(fake.bind(this), 300);
  }

  handleSearch = value => {
    const { origem } = this.props;
    this.fetch({ origem, filtro: value });
  };

  handleChange = value => {
    this.setState({ value });
  };

  render() {
    const { fetching, datashow, value } = this.state;
    const { handleSelect, stylesname } = this.props;
    const options = datashow.map(d => (
      <Option key={d.folder} data={d}>
        {d.folder}
      </Option>
    ));

    return (
      <div className={stylesname}>
        <Select
          className={styles.selectbutton}
          showSearch
          autoClearSearchValue={false}
          value={value}
          placeholder="Nome da versão"
          defaultActiveFirstOption={false}
          showArrow={false}
          filterOption={false}
          onSearch={this.handleSearch.bind(this)}
          onChange={this.handleChange}
          onSelect={handleSelect}
          notFoundContent={fetching ? <Spin size="small" /> : null}
        >
          {options}
        </Select>
      </div>
    );
  }
}
