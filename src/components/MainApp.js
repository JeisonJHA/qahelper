import React, { Component } from 'react';
import { Radio, Tree, Icon, Card, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';

import List from './List';
import Cards from './Cards';

import styles from './MainApp.css';

const { TreeNode } = Tree;

type Props = {
  projectList: []
};

export default class MainApp extends Component {
  state = { origem: 'interna', cards: [], update: null };

  componentWillMount() {
    const { update } = this.props;
    this.setState({ update });
  }

  onChange(e) {
    this.setState({ origem: e.target.value });
  }

  handleSelect = (key, data) => {
    const { cards } = this.state;
    cards.push(data.props.data);
    this.setState({ cards });
  };

  render() {
    const { cards, origem, update } = this.state;
    console.log(this.state);
    return (
      <div className={styles.container}>
        <div className={styles.projects}>
          <Radio.Group
            className={styles.radiogroup}
            onChange={this.onChange.bind(this)}
            name="radiogroup"
            defaultValue={origem}
          >
            <Radio.Button className={styles.radioItem} value="interna">
              Correção
            </Radio.Button>
            <Radio.Button className={styles.radioItem} value="feature">
              Evolução
            </Radio.Button>
          </Radio.Group>
          <List
            stylesname={styles.listcontainer}
            origem={origem}
            update={update}
            handleSelect={this.handleSelect}
          />
          <Tree
            className={styles.treeView}
            showIcon
            defaultExpandAll
            defaultSelectedKeys={['0-0-0']}
            switcherIcon={<Icon type="down" />}
          >
            <TreeNode icon={<Icon type="smile-o" />} title="Atalhos" key="0-0">
              <TreeNode icon={<Icon type="meh-o" />} title="leaf" key="0-0-0" />
              <TreeNode
                icon={({ selected }) => (
                  <Icon type={selected ? 'frown' : 'frown-o'} />
                )}
                title="leaf"
                key="0-0-1"
              />
            </TreeNode>
            <TreeNode icon={<Icon type="smile-o" />} title="INI" key="0-1">
              <TreeNode
                icon={({ selected }) => (
                  <Icon type={selected ? 'frown' : 'frown-o'} />
                )}
                title="leaf"
                key="0-1-1"
              />
            </TreeNode>
          </Tree>
        </div>
        <div className={styles.projectitem}>
          <div className={styles.backButton} data-tid="backButton">
            <Link to={routes.HOME}>
              <i className="fa fa-arrow-left fa-3x" />
            </Link>
          </div>
          <Cards cards={cards} />
        </div>
      </div>
    );
  }
}
