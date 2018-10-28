import React, { Component } from 'react';
import './App.css';
import { Layout, Table, Checkbox, Button, Icon, Popconfirm } from 'antd';
import "antd/dist/antd.css";
import { fetchTodo, updateTodo, deleteTodo } from "./controller";
import Modal from "./modalTodo";
import ModalTodo from './modalTodo';

const { Header, Footer, Content } = Layout;

class App extends Component {
  constructor (props) {
    super(props);
    this.state = { lista: [], showModalTodo: false, todo: {} };


  }

  componentDidMount = () => {
    this.inicializar();
  }

  inicializar = () => {
    fetchTodo().done(response => {
      let lista = [];
      JSON.parse(response.entity).map(usuario => {
        lista.push(usuario.usuario);
      });
      this.setState({ lista: lista });
    });
  }

  onChange = (i) => {
    i.status = i.status === 1 ? 0 : 1;
    updateTodo({ usuario: i }).done(() => this.inicializar());
  }

  deleteTodo = (id)=> {
    deleteTodo(id).done(() => this.inicializar());
  }

  render() {
    const columns = [{
      title: 'Título',
      dataIndex: 'titulo'
    }, {
      title: 'Descrição',
      dataIndex: 'descricao',
    },
    {
      title: "Status",
      render: (i) => {
        return (<Checkbox checked={ i.status } onChange={ () => this.onChange(i) } />)
      }
    },
    {
      title: <Icon type="edit" />,
      render: (i) => {
        return <Button
          onClick={ () => {
            this.setState({ todo: i, showModalTodo: true })
          } } icon="edit" />
      }
    },
    {
      title: <Icon type="delete" />,
      render: (i) => {
        return (

          <Popconfirm title={`Remover ${i.titulo}?`} onConfirm={ () => this.deleteTodo(i.id) }>
            <Button
              icon="delete" />
          </Popconfirm>
        );
      }
    }
    ];
    const { lista } = this.state;
    return (
      <Layout >
        <ModalTodo
          todo={ this.state.todo }
          visible={ this.state.showModalTodo }
          handleCancel={ () => { this.setState({ showModalTodo: false, todo: {} }); } }
          handleOk={ () => {
            this.setState({ showModalTodo: false, todo: {} });
            this.inicializar();
          } }
        />
        <Header style={ { color: "white", fontSize: 40 } }>TODO APP</Header>
        <Content style={ { padding: "30px" } }>

          <Button
            onClick={ () => {
              this.setState({ showModalTodo: true })
            } } icon="plus">Adicionar
            </Button>
          <Table
            style={ { marginTop: "10px" } }
            columns={ columns }
            dataSource={ lista }
            rowkKey={ record => record.id }
          />
        </Content>
        <Footer>By Francisco</Footer>
      </Layout>
    );
  }
}

export default App;
