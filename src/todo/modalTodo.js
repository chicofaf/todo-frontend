import { Modal, Button, Input, Row, Col, Form } from 'antd';
import React from 'react';

import { createTodo, updateTodo } from "./controller";

const FormItem = Form.Item;

class ModalTodo extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      titulo: "",
      descricao: ""
    };
  }


  handleCancel = (e) => {
    this.props.handleCancel && this.props.handleCancel();
  }

  salvar = () => {
    const todo = this.props.todo;
    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }
      if (todo && todo.id) {
        values.status = todo.status;
        values.id = todo.id;

        updateTodo({
          usuario: values
        }).done(() => {
          this.setState({ titulo: "", descricao: "" });
          this.props.form.resetFields();
          this.props.handleOk && this.props.handleOk();
        });
      } else {
        createTodo({
          usuario: values
        }).done(() => {
          this.setState({ titulo: "", descricao: "" });
          this.props.form.resetFields();
          this.props.handleOk && this.props.handleOk();
        });
      }
    });
    
  }

  render() {
    const { todo } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <Modal
        width={ 300 }
        title="Todo"
        visible={ this.props.visible }
        onOk={ () => this.salvar() }
        onCancel={ () => this.handleCancel() }
      >
        <Form layout="inline" onSubmit={ this.handleSubmit }>
          <FormItem>
            { getFieldDecorator('titulo', {
              rules: [{ required: true, message: 'Por favor digite o título!' }],
              initialValue: todo.titulo || ""
            })(
              <Input placeholder="título" />
            ) }
          </FormItem>
          <FormItem>
            { getFieldDecorator('descricao', {
              initialValue: todo.descricao || ""
            })(
              <Input placeholder="descricao" />
            ) }
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(ModalTodo);